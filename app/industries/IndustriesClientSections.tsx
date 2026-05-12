'use client'

import React, { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Building2, TrendingUp, Home, ArrowRight, ShieldCheck, Zap, FileCheck } from 'lucide-react'
import Link from 'next/link'

const industries = [
  {
    icon: Building2,
    name: 'Tax & CPA Firms',
    slug: '/industries/tax-firms',
    tagline: 'Eliminate paper. Eliminate exposure.',
    pain: 'Documents travel by email. Onboarding takes days. Compliance is a coin flip.',
    solution: 'Encrypted client portals, automated workflows, and audit trails built for IRS standards.',
    stat: '93% faster onboarding',
    accent: '#3D5AFE',
  },
  {
    icon: TrendingUp,
    name: 'Fintech',
    slug: '/industries/fintech',
    tagline: 'Move faster than your spreadsheets.',
    pain: 'Engineers build internal tools instead of the product. Decisions happen on outdated data.',
    solution: 'Real-time analytics dashboards, Plaid integrations, and data pipelines that scale to millions of rows.',
    stat: '4× faster decisions',
    accent: '#00C896',
  },
  {
    icon: Home,
    name: 'Real Estate',
    slug: '/industries/real-estate',
    tagline: 'The first agent to respond wins.',
    pain: "73% of buyers work with the first agent who responds. Your team isn't available at 9pm on Sunday.",
    solution: 'AI calling agents, automated lead qualification, and CRM integrations that work around the clock.',
    stat: '37% more showings booked',
    accent: '#F0A500',
  },
]

const whyRegulated = [
  { icon: ShieldCheck, label: 'Compliance-aware from day one', desc: "We know HIPAA, SEC, IRS, and state-level requirements. You won't pay us to learn." },
  { icon: FileCheck, label: 'Audit trail built in', desc: 'Every system we build includes access logging, version history, and role-based permissions.' },
  { icon: Zap, label: 'Integrated with your stack', desc: "Salesforce, HubSpot, Plaid, DocuSign, MLS feeds — we've integrated them all." },
]

export function IndustriesClientSections() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const whyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.ind-card')
    if (cards && cards.length > 0) {
      gsap.set(cards, { opacity: 0, y: 50 })
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 78%',
        once: true,
        onEnter: () => gsap.to(cards, { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out' }),
      })
    }

    const whyCards = whyRef.current?.querySelectorAll<HTMLElement>('.why-card')
    if (whyCards && whyCards.length > 0) {
      gsap.set(whyCards, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: whyRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => gsap.to(whyCards, { opacity: 1, y: 0, stagger: 0.1, duration: 0.55, ease: 'power3.out' }),
      })
    }
  }, [])

  return (
    <>
      {/* Industry Cards */}
      <section className="py-24 md:py-32 bg-[color:var(--bg-subtle)] border-t border-[color:var(--border)]">
        <div className="container">
          <div className="mb-14">
            <div className="text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">INDUSTRIES WE SERVE</div>
            <h2 className="text-h2 mb-4">Built for your world, not a generic template.</h2>
            <p className="text-lg text-[color:var(--text-muted)] max-w-xl">
              We work exclusively in regulated, high-trust industries — which means we understand your compliance requirements, workflows, and risk exposure before the first meeting.
            </p>
          </div>
          <div ref={cardsRef} className="space-y-6">
            {industries.map(({ icon: Icon, name, slug, tagline, pain, solution, stat, accent }, i) => (
              <Link key={i} href={slug} className="ind-card group block bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-2xl p-8 md:p-10 hover:border-[color:var(--border-accent)] transition-all duration-300 hover:-translate-y-0.5">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}18` }}>
                        <Icon size={20} style={{ color: accent }} />
                      </div>
                      <h3 className="text-h3 text-[color:var(--text-primary)] font-[family-name:var(--font-heading)]">{name}</h3>
                    </div>
                    <p className="text-lg font-semibold text-[color:var(--text-primary)] mb-3 italic">&ldquo;{tagline}&rdquo;</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--text-muted)] mb-1.5">The Problem</div>
                        <p className="text-sm text-[color:var(--text-muted)] leading-relaxed">{pain}</p>
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--text-muted)] mb-1.5">Our Solution</div>
                        <p className="text-sm text-[color:var(--text-muted)] leading-relaxed">{solution}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold font-[family-name:var(--font-heading)]" style={{ color: accent }}>{stat}</div>
                      <div className="text-xs text-[color:var(--text-muted)]">Typical client result</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200" style={{ color: accent }}>
                      Learn more <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Regulated */}
      <section className="py-24 bg-[color:var(--bg-card)] border-t border-[color:var(--border)]">
        <div className="container">
          <div className="mb-14 text-center">
            <div className="text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">WHY REGULATED INDUSTRIES</div>
            <h2 className="text-h2 mb-4">We don&apos;t do everything. We do this.</h2>
            <p className="text-lg text-[color:var(--text-muted)] max-w-xl mx-auto">Specialization lets us deliver faster, with fewer questions, and less risk for you.</p>
          </div>
          <div ref={whyRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyRegulated.map(({ icon: Icon, label, desc }, i) => (
              <div key={i} className="why-card bg-[color:var(--bg-elevated)] border border-[color:var(--border)] rounded-2xl p-8 group hover:border-[color:var(--border-accent)] transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-[color:var(--accent-dim)] flex items-center justify-center mb-5 text-[color:var(--accent)]">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-[color:var(--text-primary)] mb-2">{label}</h3>
                <p className="text-sm text-[color:var(--text-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
