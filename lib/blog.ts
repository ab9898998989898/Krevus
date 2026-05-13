import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content', 'blog');

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  keyword?: string;
};

export function getBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(contentDir)) return [];
  
  const files = fs.readdirSync(contentDir);
  
  const posts = files
    .filter(file => file.endsWith('.md') && file !== 'calendar.md')
    .map(file => {
      const source = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const { data } = matter(source);
      
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title || file.replace(/\.md$/, '').split('-').join(' '),
        date: data.date || new Date().toISOString(),
        keyword: data.keyword,
      } as BlogPostMeta;
    });
    
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string) {
  const filePath = path.join(contentDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  
  return {
    meta: {
      slug,
      title: data.title || slug.split('-').join(' '),
      date: data.date || new Date().toISOString(),
      keyword: data.keyword,
    } as BlogPostMeta,
    content
  };
}
