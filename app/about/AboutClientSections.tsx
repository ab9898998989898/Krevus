'use client'

import React, { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Users, Target, Clock, Award } from 'lucide-react'

const values = [
  { icon: Target, title: 'Industry-First Thinking', body: "We don't learn your industry during your project. We know the compliance requirements, workflow pain points, and integration landscape before we write a single line of code." },
  { icon: Clock, title: 'Speed Without Shortcuts', body: "Our fastest delivery is 4 days. Our average is 6 weeks for complex systems. We move fast because we plan obsessively — not because we skip testing or documentation." },
  { icon: Users, title: 'Engineering, Not Design', body: "We are engineers first. We build systems that process real transactions, handle sensitive data, and run without supervision. Clean UI is a byproduct of clear thinking." },
  { icon: Award, title: 'No Midnight Launches', body: "Every engagement ends with deployment documentation, team training, and 30 days of free support. You should never have to call us at midnight because something broke." },
]

const timeline = [
  { year: '2021', event: 'Founded with a focus on CPA and accounting firm portals' },
  { year: '2022', event: 'Expanded to fintech dashboards and API integration work' },
  { year: '2023', event: 'Launched AI automation practice — calling agents and intake bots' },
  { year: '2024', event: 'Opened Briqly SMB division for local business websites' },
  { year: '2025', event: 'Serving 50+ clients across tax, fintech, and real estate' },
]

export function AboutClientSections() {
  const valuesRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = valuesRef.current?.querySelectorAll<HTMLElement>('.value-card')
    if (cards && cards.length > 0) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!prefersReduced) {
        gsap.set(cards, { opacity: 0, y: 40 })
        ScrollTrigger.create({
          trigger: valuesRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => gsap.to(cards, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }),
        })
      }
    }

    const items = timelineRef.current?.querySelectorAll<HTMLElement>('.tl-item')
    if (items && items.length > 0) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!prefersReduced) {
        gsap.set(items, { opacity: 0, x: -30 })
        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => gsap.to(items, { opacity: 1, x: 0, stagger: 0.12, duration: 0.55, ease: 'power3.out' }),
        })
      }
    }
  }, [])

  return (
    <>
      {/* Values */}
      <section className="py-24 md:py-32 bg-[color:var(--bg-card)] border-t border-[color:var(--border)]">
        <div className="container">
          <div className="mb-14">
            <div className="text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">OUR VALUES</div>
            <h2 className="text-h2 mb-4 max-w-xl">How we think about every engagement</h2>
          </div>
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="value-card bg-[color:var(--bg-elevated)] border border-[color:var(--border)] rounded-2xl p-8 group hover:border-[color:var(--border-accent)] transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-[color:var(--accent-dim)] flex items-center justify-center mb-5 text-[color:var(--accent)]">
                  <Icon size={20} />
                </div>
                <h3 className="text-h4 mb-3 text-[color:var(--text-primary)]">{title}</h3>
                <p className="text-[color:var(--text-muted)] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[color:var(--bg-subtle)] border-t border-[color:var(--border)]">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-14">
            <div className="text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">OUR HISTORY</div>
            <h2 className="text-h2 mb-4">How we got here</h2>
          </div>
          <div ref={timelineRef} className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-[color:var(--border)]" />
            <div className="space-y-8">
              {timeline.map(({ year, event }, i) => (
                <div key={i} className="tl-item flex items-start gap-6 pl-12 relative">
                  <div className="absolute left-0 top-0.5 w-10 h-10 rounded-full border-2 border-[color:var(--accent)] bg-[color:var(--bg-elevated)] flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[color:var(--accent)]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[color:var(--accent)] uppercase tracking-widest mb-1">{year}</div>
                    <p className="text-[color:var(--text-body)]">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
