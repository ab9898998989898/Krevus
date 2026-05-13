import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content', 'case-studies')

export type CaseStudyMetric = {
  value: string
  label: string
  note?: string
}

export type CaseStudyTestimonial = {
  quote: string
  author: string
  role: string
  initials: string
  anonymous?: boolean
}

export type CaseStudyMeta = {
  slug: string
  title: string
  industry: 'tax-firms' | 'fintech' | 'real-estate' | string
  tag?: string
  result: string
  summary?: string
  isDemo?: boolean
  date: string
  timeline?: string
  accent?: string
  metrics?: CaseStudyMetric[]
  testimonial?: CaseStudyTestimonial
}

export function getCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir)

  const caseStudies = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const source = fs.readFileSync(path.join(contentDir, file), 'utf8')
      const { data } = matter(source)

      return {
        slug: file.replace(/\.mdx$/, ''),
        title: data.title,
        industry: data.industry,
        tag: data.tag,
        result: data.result,
        summary: data.summary,
        isDemo: data.isDemo,
        date: data.date,
        timeline: data.timeline,
        accent: data.accent,
        metrics: data.metrics,
        testimonial: data.testimonial,
      } as CaseStudyMeta
    })

  return caseStudies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getCaseStudy(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)

  return {
    meta: {
      slug,
      title: data.title,
      industry: data.industry,
      tag: data.tag,
      result: data.result,
      summary: data.summary,
      isDemo: data.isDemo,
      date: data.date,
      timeline: data.timeline,
      accent: data.accent,
      metrics: data.metrics,
      testimonial: data.testimonial,
    } as CaseStudyMeta,
    content,
  }
}
