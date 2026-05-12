'use client'

import React, { useRef } from 'react'
import {
  Upload, LayoutDashboard, Bell, Palette,
  BarChart2, Plug, Shield, Bot,
  Home, MessageSquare, FileText,
  Search, Smartphone, Phone,
  type LucideProps,
} from 'lucide-react'
import { useGsapSectionReveal } from '@/hooks/useGsapSectionReveal'
import { useGsapTextScramble } from '@/hooks/useGsapTextScramble'
import { useGsapRevealMask } from '@/hooks/useGsapRevealMask'

// ── Icon registry — avoids passing React components from Server→Client ──
const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  Upload, LayoutDashboard, Bell, Palette,
  BarChart2, Plug, Shield, Bot,
  Home, MessageSquare, FileText,
  Search, Smartphone, Phone,
}

export interface FeatureBlock {
  /** Key from ICON_MAP */
  iconName: string
  title: string
  description: string
}

interface WhatYouGetSectionProps {
  heading: string
  features: FeatureBlock[]
}

export function WhatYouGetSection({ heading, features }: WhatYouGetSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGsapSectionReveal(sectionRef)
  useGsapTextScramble(headingRef)
  useGsapRevealMask(cardsRef)

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[color:var(--bg-card)] border-t border-[color:var(--border)]">
      <div className="container">
        <div className="mb-16">
          <h2 ref={headingRef} className="section-heading text-h2 mb-4 max-w-2xl">
            {heading}
          </h2>
        </div>

        <div ref={cardsRef} className="section-content grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map(({ iconName, title, description }, i) => {
            const Icon = ICON_MAP[iconName]
            return (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl bg-[color:var(--bg-elevated)] border border-[color:var(--border)] p-8 group hover:border-[color:var(--accent)]/30 transition-colors duration-300"
                data-cursor="card"
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
                  {/* Accent left border */}
                  <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-[color:var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

                  {Icon && (
                    <div className="mb-5 text-[color:var(--accent)]">
                      <Icon size={28} />
                    </div>
                  )}
                  <h3 className="text-h4 text-[color:var(--text-primary)] mb-3 font-[family-name:var(--font-heading)]">
                    {title}
                  </h3>
                  <p className="text-sm text-[color:var(--text-muted)] leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
