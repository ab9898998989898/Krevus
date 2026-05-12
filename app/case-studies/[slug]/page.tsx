import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getCaseStudy, getCaseStudies } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { IndustryTag } from '@/components/ui/IndustryTag'
import { CheckCircle2 } from 'lucide-react'

export async function generateStaticParams() {
  const studies = getCaseStudies()
  return studies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug)
  if (!study) return { title: 'Not Found' }
  
  return {
    title: `${study.meta.title} | Case Study | Krevus`,
    description: study.meta.result,
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug)
  
  if (!study) {
    notFound()
  }

  // Custom components for MDX
  const components = {
    h2: (props: any) => <h2 className="text-h2 mt-12 mb-6 text-[color:var(--text-primary)] font-bold" {...props} />,
    h3: (props: any) => <h3 className="text-h3 mt-8 mb-4 text-[color:var(--text-primary)] font-bold" {...props} />,
    p: (props: any) => <p className="text-lg text-[color:var(--text-body)] mb-6 leading-relaxed" {...props} />,
    ul: (props: any) => <ul className="space-y-4 mb-8" {...props} />,
    li: (props: any) => (
      <li className="flex items-start text-[color:var(--text-body)] text-lg">
        <span className="w-2 h-2 rounded-full bg-[color:var(--accent)] mt-2.5 mr-4 flex-shrink-0" />
        <span {...props} />
      </li>
    ),
    strong: (props: any) => <strong className="font-bold text-[color:var(--text-primary)]" {...props} />,
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-[72px]">
        <section className="py-24 md:py-32 hero-bg relative border-b border-[color:var(--border)]">
          <div className="container relative z-10 max-w-3xl mx-auto text-left">
            <div className="flex flex-wrap gap-2 items-center mb-8">
              <IndustryTag industry={study.meta.industry} />
              {study.meta.isDemo && (
                <span className="bg-[color:var(--amber-dim)] text-[color:var(--amber)] rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wide inline-block">
                  Concept Project
                </span>
              )}
            </div>
            
            <h1 className="text-h1 text-[color:var(--text-primary)] mb-8 tracking-tight font-bold font-[family-name:var(--font-heading)] leading-[1.1]">
              {study.meta.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row items-start text-[color:var(--success)] font-semibold text-xl p-6 bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-xl sm:inline-flex">
              <CheckCircle2 size={28} className="mr-4 flex-shrink-0 mt-0.5 mb-2 sm:mb-0" />
              <span>{study.meta.result}</span>
            </div>
          </div>
          <div className="noise-overlay" />
        </section>

        <section className="py-20 bg-[color:var(--bg-primary)]">
          <div className="container max-w-3xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <MDXRemote source={study.content} components={components} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
