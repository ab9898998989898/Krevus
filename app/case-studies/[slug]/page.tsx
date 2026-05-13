import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getCaseStudy, getCaseStudies } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { CheckCircle2, Clock, Quote, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Industry config — drives the accent color when MDX doesn't override
const INDUSTRY_ACCENT: Record<string, string> = {
  'tax-firms': '#3D5AFE',
  'fintech': '#00C896',
  'real-estate': '#F0A500',
}

const INDUSTRY_LABEL: Record<string, string> = {
  'tax-firms': 'Tax & CPA',
  'fintech': 'Fintech',
  'real-estate': 'Real Estate',
}

export async function generateStaticParams() {
  const studies = getCaseStudies()
  return studies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return { title: 'Not Found' }

  return {
    title: `${study.meta.title} | Case Study | Krevus`,
    description: study.meta.summary ?? study.meta.result,
    openGraph: {
      title: `${study.meta.title} | Case Study | Krevus`,
      description: study.meta.summary ?? study.meta.result,
      url: `https://krevus.org/case-studies/${slug}`,
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  if (!study) {
    notFound()
  }

  const { meta, content } = study
  const accent = meta.accent ?? INDUSTRY_ACCENT[meta.industry] ?? '#6C63FF'
  const industryLabel = INDUSTRY_LABEL[meta.industry] ?? meta.industry

  // MDX body components — styled to match the brand
  const mdxComponents = {
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className="text-2xl md:text-3xl font-bold mt-12 mb-5 text-[color:var(--text-primary)] font-[family-name:var(--font-heading)]"
        {...props}
      />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className="text-xl font-bold mt-8 mb-4 text-[color:var(--text-primary)] font-[family-name:var(--font-heading)]"
        {...props}
      />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className="text-lg text-[color:var(--text-body)] mb-6 leading-relaxed" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className="space-y-4 mb-8 mt-2" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
      <li className="flex items-start text-[color:var(--text-body)] text-lg gap-3">
        <span
          className="w-2 h-2 rounded-full mt-2.5 flex-shrink-0"
          style={{ background: accent }}
        />
        <span {...props} />
      </li>
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
      <strong className="font-bold text-[color:var(--text-primary)]" {...props} />
    ),
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-[72px]">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="py-24 md:py-32 hero-bg relative overflow-hidden border-b border-[color:var(--border)]">
          <div className="gradient-mesh pointer-events-none absolute inset-0">
            <div
              className="gradient-orb gradient-orb-1"
              style={{
                background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
              }}
            />
          </div>
          <div className="noise-overlay" />

          <div className="container relative z-10 max-w-5xl mx-auto px-6">
            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-[color:var(--border)] bg-[color:var(--bg-elevated)]"
                style={{ color: accent }}
              >
                {industryLabel}
              </span>
              {meta.tag && (
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                  style={{
                    color: accent,
                    background: `${accent}18`,
                    borderColor: `${accent}40`,
                  }}
                >
                  {meta.tag}
                </span>
              )}
              {meta.isDemo && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-[color:var(--border)] text-[color:var(--text-faint)]">
                  Concept Project
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-h1 text-[color:var(--text-primary)] mb-8 tracking-tight font-bold font-[family-name:var(--font-heading)] leading-[1.05] max-w-4xl">
              {meta.title}
            </h1>

            {/* Summary / lead */}
            {meta.summary && (
              <p className="text-xl text-[color:var(--text-body)] max-w-3xl leading-relaxed mb-10">
                {meta.summary}
              </p>
            )}

            {/* Key result badge */}
            <div className="inline-flex items-center gap-3 text-[color:var(--success)] font-semibold text-lg p-5 bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-xl">
              <CheckCircle2 size={24} className="flex-shrink-0" />
              <span>{meta.result}</span>
            </div>
          </div>
        </section>

        {/* ── Metrics ──────────────────────────────────────────── */}
        {meta.metrics && meta.metrics.length > 0 && (
          <section className="py-16 bg-[color:var(--bg-primary)] border-b border-[color:var(--border)]">
            <div className="container max-w-6xl mx-auto px-6">
              <div
                className={`grid gap-6 lg:gap-10 -mt-24 relative z-20`}
                style={{
                  gridTemplateColumns: `repeat(${Math.min(meta.metrics.length, 4)}, minmax(0, 1fr))`,
                }}
              >
                {meta.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-2xl p-8 shadow-xl shadow-black/20 flex flex-col items-center text-center"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-6 border text-2xl font-bold"
                      style={{
                        background: `${accent}18`,
                        borderColor: `${accent}30`,
                        color: accent,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div
                      className="text-5xl font-bold font-[family-name:var(--font-heading)] mb-2"
                      style={{ color: accent }}
                    >
                      {m.value}
                    </div>
                    <div className="text-sm font-bold uppercase tracking-widest text-[color:var(--text-muted)]">
                      {m.label}
                    </div>
                    {m.note && (
                      <div className="text-xs text-[color:var(--text-faint)] mt-2">{m.note}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── MDX Body ─────────────────────────────────────────── */}
        <section className="py-24 bg-[color:var(--bg-subtle)]">
          <div className="container max-w-3xl mx-auto px-6">
            <div className="prose prose-invert prose-lg max-w-none">
              <MDXRemote source={content} components={mdxComponents} />
            </div>
          </div>
        </section>

        {/* ── Testimonial ──────────────────────────────────────── */}
        {meta.testimonial && (
          <section className="py-24 bg-[color:var(--bg-primary)] border-t border-[color:var(--border)] relative overflow-hidden">
            <div className="absolute -left-20 top-20 text-[color:var(--border)] opacity-20">
              <Quote size={240} />
            </div>
            <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
              <Quote size={48} className="mx-auto mb-8 opacity-40" style={{ color: accent }} />
              <blockquote className="text-2xl md:text-3xl font-medium text-[color:var(--text-primary)] leading-tight mb-10 font-[family-name:var(--font-heading)]">
                &ldquo;{meta.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 border rounded-full flex items-center justify-center mb-4 text-lg font-bold bg-[color:var(--bg-elevated)]"
                  style={{ borderColor: `${accent}40`, color: accent }}
                >
                  {meta.testimonial.initials}
                </div>
                <div className="font-bold text-lg text-[color:var(--text-primary)]">
                  {meta.testimonial.author}
                </div>
                <div className="text-[color:var(--text-muted)] text-sm">{meta.testimonial.role}</div>
                {meta.testimonial.anonymous && (
                  <div className="text-xs text-[color:var(--text-faint)] mt-2 italic">
                    *Name anonymized for client privacy
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-24 bg-[color:var(--bg-subtle)] border-t border-[color:var(--border)] text-center">
          <div className="container max-w-2xl mx-auto px-6">
            <div
              className="font-bold tracking-widest uppercase text-xs mb-6"
              style={{ color: accent }}
            >
              READY TO UPGRADE?
            </div>
            <h2 className="text-h2 mb-6 text-[color:var(--text-primary)]">
              Your business deserves a case study too.
            </h2>
            <p className="text-lg text-[color:var(--text-muted)] mb-8">
              Book a 30-minute discovery call. We&apos;ll tell you exactly what we&apos;d build and
              what results to expect — before you commit to anything.
            </p>
            {meta.timeline && (
              <div className="flex items-center justify-center gap-2 text-sm text-[color:var(--text-muted)] mb-10">
                <Clock size={14} />
                <span>
                  Similar projects delivered in <strong className="text-[color:var(--text-primary)]">{meta.timeline}</strong>
                </span>
              </div>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-10 py-4 text-white text-lg transition-opacity hover:opacity-90"
              style={{
                background: accent,
                boxShadow: `0 8px 24px ${accent}33`,
              }}
            >
              Book a Discovery Call <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
