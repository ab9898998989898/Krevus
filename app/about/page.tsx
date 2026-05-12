import React from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StatItem } from '@/components/ui/StatItem'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AboutClientSections } from './AboutClientSections'

export const metadata = {
  title: 'About | Krevus',
  description: 'We are an elite team of engineers building secure portals, AI automation, and digital infrastructure for highly regulated industries.',
}

const stats = [
  { value: 50, suffix: '+', label: 'Enterprise Projects' },
  { value: 100, suffix: '%', label: 'US-Based Team' },
  { value: 0, suffix: '', label: 'Missed Deadlines' },
  { value: 98, suffix: '%', label: 'Client Retention' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-[72px]">
        {/* Hero */}
        <section className="py-24 md:py-32 hero-bg relative border-b border-[color:var(--border)] overflow-hidden">
          <div className="gradient-mesh pointer-events-none absolute inset-0">
            <div className="gradient-orb gradient-orb-1" />
            <div className="gradient-orb gradient-orb-3" />
          </div>
          <div className="container relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-block text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-6 border border-[color:var(--border-accent)] px-4 py-1.5 rounded-full">
              About Krevus
            </div>
            <h1 className="text-hero text-[color:var(--text-primary)] mb-8 tracking-tight font-bold font-[family-name:var(--font-heading)] leading-[1.05]">
              Engineering Capacity<br />for Ambitious Firms
            </h1>
            <p className="text-xl text-[color:var(--text-body)] mb-12 max-w-2xl mx-auto">
              We don&apos;t just build websites. We build the digital infrastructure that allows tax, fintech, and real estate companies to scale without adding headcount.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-8 py-4 bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-hover)] transition-colors">
                Book a Discovery Call <ArrowRight size={16} />
              </Link>
              <Link href="/case-studies" className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-8 py-4 border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-[color:var(--border-accent)] transition-colors">
                Our Work
              </Link>
            </div>
          </div>
          <div className="noise-overlay" />
        </section>

        {/* Philosophy + Stats */}
        <section className="py-24 bg-[color:var(--bg-subtle)] border-y border-[color:var(--border)]">
          <div className="container max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">OUR PHILOSOPHY</div>
                <h2 className="text-h2 text-[color:var(--text-primary)] mb-6">Most agencies build brochures. We build engines.</h2>
                <div className="space-y-5 text-[color:var(--text-body)] text-base leading-relaxed">
                  <p>When a CPA firm hires us, they aren&apos;t looking for a prettier homepage — they are looking for a way to stop spending 15 hours a week chasing client documents.</p>
                  <p>When a fintech startup hires us, they need an enterprise-grade dashboard that won&apos;t crash when rendering 50,000 rows of transactional data.</p>
                  <p className="font-semibold text-[color:var(--text-primary)]">We measure our success by the hours saved and the capacity unlocked — not by awards.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, i) => (
                  <StatItem key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Client sections with animations */}
        <AboutClientSections />

        {/* CTA */}
        <section className="py-24 bg-[color:var(--bg-primary)] border-t border-[color:var(--border)] text-center">
          <div className="container max-w-2xl mx-auto">
            <h2 className="text-h2 mb-6">Ready to build something that works?</h2>
            <p className="text-lg text-[color:var(--text-muted)] mb-10">
              Start with a 30-minute discovery call. No pitch deck. Just a direct conversation about your biggest operational bottleneck.
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
