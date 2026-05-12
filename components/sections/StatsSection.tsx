'use client'

import React, { useRef } from 'react'
import { StatItem } from '../ui/StatItem'
import { useGsapFadeIn } from '@/hooks/useGsapFadeIn'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 3,  suffix: '',  label: 'Industries Served' },
  { value: 100, suffix: '%', label: 'US Client Focus' },
  { value: 98,  suffix: '%', label: 'Client Retention' },
  { value: 30,  suffix: '',  label: 'Days Post-Launch Support' },
  { value: 6,   suffix: 'wk', label: 'Avg. Time to Launch' },
]

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  useGsapFadeIn(containerRef)

  return (
    <section className="relative py-24 border-y border-[color:var(--border)] bg-[color:var(--bg-primary)] overflow-hidden">
      {/* Glow strip */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--accent) 40%, var(--accent) 60%, transparent 100%)', opacity: 0.25 }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--accent) 40%, var(--accent) 60%, transparent 100%)', opacity: 0.25 }}
      />

      {/* Subtle radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(61,90,254,0.04) 0%, transparent 70%)' }}
      />

      <div className="container relative z-10">
        <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-center">
              <StatItem value={stat.value} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

