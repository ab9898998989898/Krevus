import React from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { IndustriesClientSections } from './IndustriesClientSections'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Industries — Tax, Fintech & Real Estate | Krevus',
  description: 'We specialize in highly regulated, high-ticket industries where trust and precision are non-negotiable.',
}

const tags = ['Tax & CPA', 'Fintech', 'Real Estate', 'Healthcare Adjacent']

export default function IndustriesOverviewPage() {
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
              Industries
            </div>
            <h1 className="text-hero text-[color:var(--text-primary)] mb-8 tracking-tight font-bold font-[family-name:var(--font-heading)] leading-[1.05]">
              Built for High-Stakes<br />Industries
            </h1>
            <p className="text-xl text-[color:var(--text-body)] mb-12 max-w-2xl mx-auto">
              We focus exclusively on sectors that handle sensitive data, require deep compliance, and rely on robust infrastructure.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold px-4 py-2 rounded-full border border-[color:var(--border)] text-[color:var(--text-muted)]">{tag}</span>
              ))}
            </div>
          </div>
          <div className="noise-overlay" />
        </section>

        <IndustriesClientSections />

        {/* CTA */}
        <section className="py-24 bg-[color:var(--bg-primary)] border-t border-[color:var(--border)] text-center">
          <div className="container max-w-2xl mx-auto">
            <h2 className="text-h2 mb-6">Your industry. Our systems.</h2>
            <p className="text-lg text-[color:var(--text-muted)] mb-10">
              Book a 30-minute call and we&apos;ll map out exactly what needs to be built — and what it will deliver.
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
