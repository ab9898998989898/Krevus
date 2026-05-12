'use client'

import React, { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGsapSectionReveal } from '@/hooks/useGsapSectionReveal'
import { useGsapTextScramble } from '@/hooks/useGsapTextScramble'
import { useGsapStaggerWords } from '@/hooks/useGsapStaggerWords'

const comparisons = [
  { generic: 'Learn as they go', krevus: 'Industry-specific from day one' },
  { generic: 'Pretty websites', krevus: 'Systems that generate revenue' },
  { generic: 'Disappear at launch', krevus: '30 days support post-launch' },
  { generic: 'One size fits all', krevus: 'Built for your compliance requirements' },
]

export function WhyKrevusSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const statementRef = useRef<HTMLParagraphElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)

  useGsapSectionReveal(sectionRef)
  useGsapTextScramble(headingRef)
  useGsapStaggerWords(statementRef)

  useEffect(() => {
    const rows = rowsRef.current?.querySelectorAll<HTMLElement>('.comparison-row')
    if (!rows || rows.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      rows.forEach(r => { r.style.opacity = '1'; r.style.transform = 'none' })
      return
    }

    gsap.set(rows, { opacity: 0, x: 40 })

    ScrollTrigger.create({
      trigger: rowsRef.current,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gsap.to(rows, {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power3.out',
        })
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-[color:var(--bg-primary)] border-t border-[color:var(--border)]"
    >
      <div className="container">
        <div className="mb-16">
          <div className="section-label text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">
            THE DIFFERENCE
          </div>
          <h2 ref={headingRef} className="section-heading text-h2 mb-4">
            We&apos;re not a generalist agency. We&apos;re specialists.
          </h2>
        </div>

        <div className="section-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — large statement */}
          <div>
            <p
              ref={statementRef}
              className="font-[family-name:var(--font-heading)] font-semibold text-[color:var(--text-primary)] leading-[1.3]"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
            >
              Most agencies learn your industry during your project. We already know it before you contact us.
            </p>
          </div>

          {/* Right — comparison rows */}
          <div ref={rowsRef} className="space-y-0 border border-[color:var(--border)] rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 px-6 py-4 bg-[color:var(--bg-card)] border-b border-[color:var(--border)]">
              <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--text-muted)]">Generic Agencies</span>
              <span className="text-xs font-bold text-[color:var(--text-faint)]">vs</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--accent)]">Krevus</span>
            </div>

            {comparisons.map((row, i) => (
              <div
                key={i}
                className="comparison-row grid grid-cols-[1fr_auto_1fr] gap-4 px-6 py-5 border-b border-[color:var(--border)] last:border-b-0 items-center group hover:bg-[color:var(--bg-elevated)] transition-colors duration-200"
              >
                <span className="text-sm text-[color:var(--text-muted)] line-through decoration-[color:var(--text-faint)]">
                  {row.generic}
                </span>
                <span className="text-[color:var(--text-faint)] text-xs">→</span>
                <span className="text-sm text-[color:var(--text-primary)] font-medium">
                  {row.krevus}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
