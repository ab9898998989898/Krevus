'use client'

import React, { useRef } from 'react'
import { FileWarning, Clock, PhoneMissed } from 'lucide-react'
import { useGsapSectionReveal } from '@/hooks/useGsapSectionReveal'
import { useGsapRevealMask } from '@/hooks/useGsapRevealMask'

const problems = [
  {
    Icon: FileWarning,
    industry: 'Tax & CPA Firms',
    heading: 'Documents still travel by email.',
    body: "Every PDF sent to a client is a compliance risk, a support ticket, and a delay. Your clients deserve better than an attachment buried in an inbox.",
  },
  {
    Icon: Clock,
    industry: 'Fintech Companies',
    heading: 'Internal tools take 6 months to ship.',
    body: "Your engineers are building dashboards instead of your product. Meanwhile, decisions are made on spreadsheets that shouldn't exist.",
  },
  {
    Icon: PhoneMissed,
    industry: 'Real Estate',
    heading: 'Leads die after business hours.',
    body: "73% of buyers work with the first agent who responds. If your team isn't available at 9pm on a Sunday, your competitor's AI is.",
  },
]


export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGsapSectionReveal(sectionRef)
  useGsapRevealMask(cardsRef)

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[color:var(--bg-card)] border-t border-[color:var(--border)]">
      <div className="container">
        <div className="mb-16">
          <div className="section-label text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">
            WHAT WE FIX
          </div>
          <h2 className="section-heading text-h2 mb-4">
            High-trust industries run on outdated infrastructure.
          </h2>
        </div>

        <div ref={cardsRef} className="section-content grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map(({ Icon, industry, heading, body }, i) => (
            <div
              key={i}
              className="problem-card bg-[color:var(--bg-elevated)] rounded-2xl p-8 border border-[color:var(--border)] group hover:border-[color:var(--accent)]/30 transition-colors duration-300"
              data-cursor="card"
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {/* Reveal mask */}
              <div
                className="reveal-mask"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--accent)',
                  borderRadius: 'inherit',
                  zIndex: 10,
                }}
              />
              {/* Content */}
              <div className="reveal-content relative z-0">
                <div className="inline-flex items-center gap-2 text-[color:var(--accent)] text-xs font-bold uppercase tracking-widest mb-6">
                  <Icon size={16} />
                  {industry}
                </div>
                <h3 className="text-h4 text-[color:var(--text-primary)] mb-3 font-[family-name:var(--font-heading)]">
                  {heading}
                </h3>
                <p className="text-sm text-[color:var(--text-muted)] leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
