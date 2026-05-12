'use client'

import React, { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGsapSectionReveal } from '@/hooks/useGsapSectionReveal'
import { useGsapTextScramble } from '@/hooks/useGsapTextScramble'
import { CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    phase: 'Discovery',
    duration: 'Day 1–3',
    description:
      "We spend time understanding your operation, your pain points, and what success looks like. Most agencies skip this. We don't.",
    deliverables: ['Scope document', 'Tech recommendation', 'Timeline & cost'],
  },
  {
    number: '02',
    phase: 'Architecture',
    duration: 'Day 4–7',
    description:
      "We design the system before writing a line of code. Every portal, automation, and dashboard is planned to the component level before development begins.",
    deliverables: ['System diagram', 'Component spec', 'Data model'],
  },
  {
    number: '03',
    phase: 'Build',
    duration: 'Week 2–5',
    description:
      "Weekly progress updates. You see the product being built — no black boxes, no surprises. We iterate with your feedback in real time.",
    deliverables: ['Weekly demos', 'Staging environment', 'Test coverage'],
  },
  {
    number: '04',
    phase: 'Launch & Support',
    duration: 'Week 6+',
    description:
      "Deployment, documentation, and 30 days of free support. Your team gets trained. The system runs without us.",
    deliverables: ['Production deploy', 'Team training', '30-day support'],
  },
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGsapSectionReveal(sectionRef)
  useGsapTextScramble(headingRef)

  // Animate the connecting progress line on scroll
  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { line.style.scaleX = '1'; return }

    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      end: 'bottom 80%',
      once: true,
      onEnter: () => {
        gsap.to(line, {
          scaleX: 1,
          duration: 1.6,
          ease: 'power2.inOut',
        })
      },
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[color:var(--bg-subtle)] border-t border-[color:var(--border)]">
      <div className="container">
        <div className="mb-16">
          <div className="section-label text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">
            THE PROCESS
          </div>
          <h2 ref={headingRef} className="section-heading text-h2 mb-4 max-w-2xl">
            We move fast. We build right. We don&apos;t disappear after launch.
          </h2>
          <p className="text-lg text-[color:var(--text-muted)] max-w-xl">
            A structured 6-week engagement — from first call to live system.
          </p>
        </div>

        {/* Desktop: horizontal timeline — Mobile: vertical stack */}
        <div className="section-content grid grid-cols-1 md:grid-cols-4 gap-0 relative">
          {/* Animated connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-[1px] z-0 overflow-hidden"
            style={{ background: 'var(--border)' }}
          >
            <div
              ref={lineRef}
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent))', transformOrigin: 'left center' }}
            />
          </div>

          {steps.map((step, i) => (
            <div
              key={i}
              className="relative z-10 flex flex-col md:items-center text-left md:text-center px-0 md:px-4 py-8 md:py-0 border-b md:border-b-0 border-[color:var(--border)] last:border-b-0"
            >
              {/* Number bubble */}
              <div className="relative w-16 h-16 rounded-full bg-[color:var(--bg-elevated)] border-2 border-[color:var(--accent)] flex items-center justify-center mb-6 shrink-0">
                <span className="font-bold text-[color:var(--accent)] font-[family-name:var(--font-heading)] text-lg">
                  {step.number}
                </span>
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ boxShadow: '0 0 20px var(--accent)', borderRadius: '50%' }} />
              </div>

              <div className="text-[color:var(--accent)] text-xs font-bold uppercase tracking-widest mb-1">
                {step.duration}
              </div>
              <h3 className="text-h4 text-[color:var(--text-primary)] mb-3 font-[family-name:var(--font-heading)]">
                {step.phase}
              </h3>
              <p className="text-sm text-[color:var(--text-muted)] leading-relaxed max-w-[220px] mx-0 md:mx-auto mb-4">
                {step.description}
              </p>

              {/* Deliverables */}
              <ul className="space-y-1 md:items-center flex flex-col">
                {step.deliverables.map((d, j) => (
                  <li key={j} className="flex items-center gap-1.5 text-xs text-[color:var(--text-muted)]">
                    <CheckCircle size={12} className="text-[color:var(--accent)] shrink-0 opacity-70" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

