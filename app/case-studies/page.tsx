import React from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CaseStudiesClient } from './CaseStudiesClient'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Case Studies — Digital Infrastructure Results | Krevus',
  description: 'See how we transform disjointed workflows into unified digital experiences for our clients.',
}

const industries = [
  { label: 'Tax & CPA Firms', count: '20+' },
  { label: 'Fintech Startups', count: '12+' },
  { label: 'Real Estate Teams', count: '10+' },
  { label: 'Healthcare Practices', count: '8+' },
]

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-[72px]">
        {/* Hero */}
        <section className="py-24 md:py-32 hero-bg relative overflow-hidden border-b border-[color:var(--border)]">
          <div className="gradient-mesh pointer-events-none absolute inset-0">
            <div className="gradient-orb gradient-orb-1" />
            <div className="gradient-orb gradient-orb-2" />
          </div>
          <div className="container relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-block text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-6 border border-[color:var(--border-accent)] px-4 py-1.5 rounded-full">
              Case Studies
            </div>
            <h1 className="text-hero text-[color:var(--text-primary)] mb-8 tracking-tight font-bold font-[family-name:var(--font-heading)] leading-[1.05]">
              Real Systems.<br />Real Outcomes.
            </h1>
            <p className="text-xl text-[color:var(--text-body)] mb-12 max-w-2xl mx-auto">
              We measure success by the hours saved and capacity unlocked — not by awards or follower counts.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map(({ label, count }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)]">
                  <span className="text-sm font-bold text-[color:var(--accent)]">{count}</span>
                  <span className="text-xs text-[color:var(--text-muted)]">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="noise-overlay" />
        </section>

        <CaseStudiesClient />

        {/* CTA */}
        <section className="py-24 bg-[color:var(--bg-primary)] border-t border-[color:var(--border)] text-center">
          <div className="container max-w-2xl mx-auto">
            <div className="text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-6">START YOUR PROJECT</div>
            <h2 className="text-h2 mb-6">Your business deserves a case study too.</h2>
            <p className="text-lg text-[color:var(--text-muted)] mb-10">
              Book a 30-minute discovery call. We&apos;ll tell you exactly what we&apos;d build and what results to expect — before you commit to anything.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-10 py-4 bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-hover)] transition-colors text-lg">
              Book a Discovery Call <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
