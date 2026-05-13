import fs from 'fs';
import path from 'path';

// Attempt to load .env manually if running standalone
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      process.env[key] = process.env[key] || val;
    }
  });
}

// You need to set GEMINI_API_KEY in your .env or export it in your terminal
// To run this script: npx tsx content/blog/generate-articles.ts
const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ ERROR: Please set GEMINI_API_KEY environment variable to use this generator.");
  console.error("Example: set GEMINI_API_KEY=your_api_key_here && npx tsx content/blog/generate-articles.ts");
  process.exit(1);
}

const CALENDAR_PATH = path.join(__dirname, 'calendar.md');

// Function to generate the blog post content using the Google Gemini API (via raw fetch)
async function generateArticle(title: string, keyword: string, wordCount: string, cta: string) {
  const prompt = `
    You are a B2B SEO content strategist for Krevus, a custom software agency targeting US tax/CPA firms, fintech companies, and real estate businesses.
    
    Write a complete blog article with the following requirements:
    Title: "${title}"
    Target keyword: "${keyword}"
    Target word count: ~${wordCount} words
    Tone: Direct, authoritative, written for managing partners and practice managers.
    Call to Action (CTA): ${cta}

    Structure:
    1. Hook -> Describe the pain point
    2. Problem -> Explain the risks or inefficiencies of the current/generic approach
    3. Alternatives -> Evaluate 2-3 standard alternatives (and where they fall short)
    4. Why a custom solution beats generic tools -> Highlight Krevus's approach (white-labeled, integrated, secure)
    5. CTA to Krevus -> Include a link to /services

    Format: Return ONLY the raw markdown format of the article. Do not include introductory text like "Here is the article:" or wrap it in \`\`\`markdown code blocks.
    
    IMPORTANT: You must start the file with a YAML frontmatter block containing the title, date, and keyword. 
    Example:
    ---
    title: "${title}"
    date: "${new Date().toISOString().split('T')[0]}"
    keyword: "${keyword}"
    ---
    
    Then start the article content directly with an H1 tag.
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      })
    });

    const data = await response.json();
    if (data.error) {
      console.error("API Error:", data.error.message);
      return null;
    }
    
    let content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    // Clean up potential markdown code block wrappers
    if (content.startsWith('```markdown')) {
      content = content.replace(/^```markdown\n/, '').replace(/\n```$/, '');
    }
    
    return content;
  } catch (error) {
    console.error("Failed to generate article:", error);
    return null;
  }
}

async function main() {
  if (!fs.existsSync(CALENDAR_PATH)) {
    console.error(`❌ ERROR: Could not find calendar.md at ${CALENDAR_PATH}`);
    process.exit(1);
  }

  const calendarContent = fs.readFileSync(CALENDAR_PATH, 'utf-8');
  
  // Simple markdown table parser to extract the rows
  const lines = calendarContent.split('\n');
  const tableRows = lines.filter(line => line.trim().startsWith('|') && !line.includes('---') && !line.includes('Week | Title'));
  
  console.log(`📅 Found ${tableRows.length} articles in the calendar.`);

  for (const row of tableRows) {
    const columns = row.split('|').map(col => col.trim()).filter(Boolean);
    if (columns.length < 5) continue;

    // Clean up any markdown bolding from the week column
    const week = columns[0].replace(/\*\*/g, '');
    const title = columns[1];
    const keyword = columns[2];
    const wordCount = columns[3];
    const cta = columns[4];

    // Create a URL-friendly slug from the title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const filename = path.join(__dirname, `${slug}.md`);

    // Skip if file already exists
    if (fs.existsSync(filename)) {
      console.log(`⏩ Skipping "${title}" - File already exists (${filename})`);
      continue;
    }

    console.log(`\n⏳ Generating article for ${week}: "${title}"...`);
    const content = await generateArticle(title, keyword, wordCount, cta);

    if (content) {
      fs.writeFileSync(filename, content, 'utf-8');
      console.log(`✅ Successfully created ${filename}`);
    } else {
      console.log(`❌ Failed to create ${filename}`);
    }
    
    // Add a 3-second delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  console.log("\n🎉 Finished processing the content calendar!");
}

main().catch(console.error);
