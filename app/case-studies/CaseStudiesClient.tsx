'use client'

import React, { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Building2, TrendingUp, Bot, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'

const caseStudies = [
  {
    icon: Building2,
    industry: 'Tax & CPA',
    tag: 'Client Portal',
    headline: 'Onboarding from 3 days to 20 minutes',
    challenge: 'A mid-sized CPA firm was sending client documents via email — unencrypted, untracked, and non-compliant with IRS e-file security standards.',
    solution: 'We built a secure client portal with role-based access, automated document reminders, and a full audit trail. Zero email document sharing.',
    results: ['93% reduction in onboarding time', 'Zero compliance incidents post-launch', 'Client NPS score increased 28 points'],
    timeline: '5 weeks',
    href: '/case-studies/cpa-firm-portal',
    accent: '#3D5AFE',
    isDemo: true,
  },
  {
    icon: TrendingUp,
    industry: 'Fintech',
    tag: 'Analytics Dashboard',
    headline: 'Internal dashboards shipped in 4 weeks, not 6 months',
    challenge: 'A Series A fintech was managing $40M in transactions on Google Sheets. Engineering was building internal tools instead of the core product.',
    solution: 'We built a real-time analytics dashboard with Plaid integration, custom reporting, and investor-facing views — freeing their engineering team completely.',
    results: ['4× faster decision making', 'Engineering team freed for core product', '$1.2M raised using dashboard in investor deck'],
    timeline: '4 weeks',
    href: '/case-studies',
    accent: '#00C896',
    isDemo: true,
  },
  {
    icon: Bot,
    industry: 'Real Estate',
    tag: 'AI Automation',
    headline: 'AI qualifies leads at 9pm on Sundays',
    challenge: 'A residential real estate team was losing weekend and after-hours leads to competitors who responded faster. 73% of buyers go with the first agent who responds.',
    solution: 'We deployed an AI calling agent that responds within 90 seconds, qualifies leads, and books showing appointments — around the clock.',
    results: ['37% more booked showings', '90-second average response time', '22% increase in closed transactions'],
    timeline: '3 weeks',
    href: '/case-studies',
    accent: '#F0A500',
    isDemo: true,
  },
]

export function CaseStudiesClient() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.cs-detail-card')
    if (!cards || cards.length === 0) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    gsap.set(cards, { opacity: 0, y: 60 })
    ScrollTrigger.create({
      trigger: cardsRef.current,
      start: 'top 78%',
      once: true,
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, stagger: 0.18, duration: 0.7, ease: 'power3.out' }),
    })
  }, [])

  return (
    <section className="py-24 md:py-32 bg-[color:var(--bg-subtle)] border-t border-[color:var(--border)]">
      <div className="container">
        <div ref={cardsRef} className="space-y-8">
          {caseStudies.map(({ icon: Icon, industry, tag, headline, challenge, solution, results, timeline, href, accent, isDemo }, i) => (
            <div key={i} className="cs-detail-card bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-2xl overflow-hidden group hover:border-[color:var(--border-accent)] transition-all duration-300">
              <div className="h-[2px]" style={{ background: accent }} />
              <div className="p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${accent}18` }}>
                        <Icon size={18} style={{ color: accent }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--text-muted)]">{industry}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}40` }}>
                        {tag}
                      </span>
                      {isDemo && <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[color:var(--border)] text-[color:var(--text-faint)]">Demo</span>}
                    </div>
                    <h2 className="text-h3 text-[color:var(--text-primary)] mb-6 font-[family-name:var(--font-heading)]">{headline}</h2>
                    <div className="space-y-5">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--text-muted)] mb-2">The Challenge</div>
                        <p className="text-[color:var(--text-body)] leading-relaxed">{challenge}</p>
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--text-muted)] mb-2">Our Solution</div>
                        <p className="text-[color:var(--text-body)] leading-relaxed">{solution}</p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:border-l border-[color:var(--border)] lg:pl-10 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--text-muted)] mb-4">Results</div>
                      <ul className="space-y-3 mb-8">
                        {results.map((r, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: accent }} />
                            <span className="text-sm font-medium text-[color:var(--text-primary)]">{r}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2 text-xs text-[color:var(--text-muted)] mb-8">
                        <Clock size={14} />
                        Delivered in {timeline}
                      </div>
                    </div>
                    <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold group/link" style={{ color: accent }}>
                      Read Full Case Study
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
