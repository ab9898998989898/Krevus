'use client'

import React, { useRef, useEffect } from 'react'
import { Shield, Zap, BarChart2, Bot, Code, Lock } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const capabilities = [
  { icon: Shield, label: 'HIPAA-Aligned Security', desc: 'End-to-end encryption, audit trails, and access controls built to regulated industry standards.' },
  { icon: Zap, label: 'Sub-10 Day Delivery', desc: 'Rapid delivery cycles with weekly demos — no 6-month agency timelines.' },
  { icon: BarChart2, label: 'Built to Scale', desc: 'Architecture designed for 50K+ concurrent users and real-time data sync.' },
  { icon: Bot, label: 'AI-First Approach', desc: 'AI automation built into every system — not bolted on after the fact.' },
  { icon: Code, label: 'Modern Stack', desc: 'Next.js, TypeScript, PostgreSQL, and cloud-native infrastructure — not WordPress.' },
  { icon: Lock, label: '30-Day Support Included', desc: 'Every engagement includes 30 days of free post-launch support and training.' },
]

export function CapabilitiesGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.cap-card')
    if (!cards || cards.length === 0) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    gsap.set(cards, { opacity: 0, y: 40 })
    ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, stagger: 0.09, duration: 0.55, ease: 'power3.out' }),
    })
  }, [])

  return (
    <section className="py-24 bg-[color:var(--bg-card)] border-t border-[color:var(--border)]">
      <div className="container">
        <div className="mb-14 text-center">
          <div className="text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">WHY KREVUS</div>
          <h2 className="text-h2 mb-4">What we bring to every engagement</h2>
          <p className="text-lg text-[color:var(--text-muted)] max-w-xl mx-auto">
            We don&apos;t just write code. We deliver systems built around your compliance requirements, timeline, and growth goals.
          </p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map(({ icon: Icon, label, desc }, i) => (
            <div key={i} className="cap-card bg-[color:var(--bg-elevated)] border border-[color:var(--border)] rounded-2xl p-7 group hover:border-[color:var(--border-accent)] transition-colors duration-300">
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
  )
}
