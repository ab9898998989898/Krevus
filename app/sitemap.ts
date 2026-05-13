import { MetadataRoute } from 'next'
import { getCaseStudies } from '@/lib/mdx'
import { getBlogPosts } from '@/lib/blog'

const BASE_URL = 'https://krevus.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ── Static routes ────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`,                      lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/services`,             lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/about`,                lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/industries`,           lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/industries/tax-firms`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/industries/fintech`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/industries/real-estate`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/case-studies`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/blog`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
  ]

  // ── Dynamic: case study pages ────────────────────────────────────
  const caseStudyRoutes: MetadataRoute.Sitemap = getCaseStudies().map((study) => ({
    url: `${BASE_URL}/case-studies/${study.slug}`,
    lastModified: study.date ? new Date(study.date) : now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // ── Dynamic: blog post pages ─────────────────────────────────────
  const blogRoutes: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes]
}
