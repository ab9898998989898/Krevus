'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Building2, TrendingUp, Bot } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const caseStudies = [
  {
    icon: Building2,
    industry: 'Tax & CPA',
    headline: 'Onboarding went from 3 days to 20 minutes',
    body: 'A mid-sized CPA firm replaced email-based document collection with a secure client portal. Zero email attachments, HIPAA-aligned, fully automated reminders.',
    outcome: '93% faster onboarding',
    tag: 'Client Portal',
    href: '/case-studies/cpa-firm-portal',
    accent: 'var(--accent)',
  },
  {
    icon: TrendingUp,
    industry: 'Fintech',
    headline: 'Internal dashboards shipped in 4 weeks, not 6 months',
    body: 'A Series A fintech replaced spreadsheet-driven operations with a real-time analytics dashboard. Engineering freed to focus on the core product.',
    outcome: '4× faster decision making',
    tag: 'Analytics Dashboard',
    href: '/case-studies',
    accent: '#00C896',
  },
  {
    icon: Bot,
    industry: 'Real Estate',
    headline: 'AI assistant qualifies leads at 9pm on Sundays',
    body: 'A residential real estate team deployed an AI that responds to inquiries within 90 seconds, qualifies leads, and books showing appointments automatically.',
    outcome: '37% more booked showings',
    tag: 'AI Automation',
    href: '/case-studies',
    accent: '#F0A500',
  },
]

export function FeaturedCaseStudy() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.cs-card')
    if (!cards || cards.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      cards.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none' })
      return
    }

    gsap.set(cards, { opacity: 0, y: 50 })

    ScrollTrigger.create({
      trigger: cardsRef.current,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
        })
      },
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[color:var(--bg-primary)] border-t border-[color:var(--border)]">
      <div className="container">
        <div className="mb-16">
          <div className="section-label text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">
            PROVEN RESULTS
          </div>
          <h2 className="text-h2 mb-4">Real systems. Real outcomes.</h2>
          <p className="text-lg text-[color:var(--text-muted)] max-w-2xl">
            We don&apos;t build websites. We build infrastructure that generates revenue and eliminates manual work.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map(({ icon: Icon, industry, headline, body, outcome, tag, href, accent }, i) => (
            <Link
              key={i}
              href={href}
              className="cs-card group relative bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-2xl p-8 flex flex-col hover:border-[color:var(--border-accent)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top bar accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300 opacity-40 group-hover:opacity-100"
                style={{ background: accent }}
              />

              {/* Icon + tag */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${accent}18` }}
                >
                  <Icon size={20} style={{ color: accent }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                  style={{ color: accent, borderColor: `${accent}40`, background: `${accent}0D` }}>
                  {tag}
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--text-muted)] mb-3">{industry}</div>
              <h3 className="text-h4 text-[color:var(--text-primary)] mb-4 font-[family-name:var(--font-heading)] leading-snug">
                {headline}
              </h3>
              <p className="text-sm text-[color:var(--text-muted)] leading-relaxed mb-6 flex-1">{body}</p>

              {/* Outcome chip */}
              <div className="flex items-center justify-between mt-auto pt-5 border-t border-[color:var(--border)]">
                <span className="text-sm font-semibold" style={{ color: accent }}>{outcome}</span>
                <ArrowRight size={16} className="text-[color:var(--text-faint)] group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent)] hover:text-white transition-colors group"
          >
            View all case studies
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  )
}

