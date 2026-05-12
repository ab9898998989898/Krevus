'use client'

import React, { useRef } from 'react'
import { Button } from '../ui/Button'
import { useGsapHeroReveal } from '@/hooks/useGsapHeroReveal'
import { useGsapFloatingElements } from '@/hooks/useGsapFloatingElements'
import { useGsapTypewriter } from '@/hooks/useGsapTypewriter'

interface HeroProps {
  headline: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  imageUrl?: string
  /** If true, uses typewriter effect on the sub-headline instead of fade */
  typewriterSub?: boolean
}

export function Hero({ headline, subheadline, primaryCta, secondaryCta, imageUrl, typewriterSub = false }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useGsapHeroReveal(containerRef)
  useGsapFloatingElements(containerRef)

  // Typewriter only for homepage hero (typewriterSub flag)
  useGsapTypewriter(
    typewriterSub ? subRef : { current: null },
    subheadline,
    1.2
  )

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 hero-bg overflow-hidden">
      
      {/* ── Animated gradient mesh ── */}
      <div className="gradient-mesh pointer-events-none" aria-hidden="true">
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div className="gradient-orb gradient-orb-3" />
      </div>

      {/* ── Decorative floating geometric shapes ── */}
      <div className="floating-el absolute top-[10%] right-[5%] w-48 h-48 border border-white/[0.04] rounded-full opacity-0 hero-shape" aria-hidden="true" />
      <div className="floating-el absolute top-[15%] right-[8%] w-24 h-24 border border-[color:var(--accent)]/[0.04] rotate-45 opacity-0 hero-shape" aria-hidden="true" />
      <div className="floating-el absolute bottom-[20%] left-[3%] w-36 h-36 border border-white/[0.03] rounded-lg opacity-0 hero-shape" aria-hidden="true" />
      <div className="floating-el absolute bottom-[35%] right-[15%] w-16 h-16 border border-[color:var(--accent)]/[0.05] rotate-12 opacity-0 hero-shape" aria-hidden="true" />

      <div className="container relative z-10 max-w-[900px] text-left md:text-center mx-auto">
        <h1 className="text-hero text-[color:var(--text-primary)] mb-8 tracking-tight font-bold font-[family-name:var(--font-heading)] leading-[1.05]">
          {headline}
        </h1>
        
        <p
          ref={subRef}
          className={`hero-sub text-xl text-[color:var(--text-body)] mb-12 max-w-2xl mx-0 md:mx-auto ${typewriterSub ? 'min-h-[3em]' : ''}`}
        >
          {typewriterSub ? '' : subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-start md:items-center justify-start md:justify-center gap-4 sm:gap-6">
          <div className="hero-cta w-full sm:w-auto">
            <Button variant="primary" size="lg" href={primaryCta.href} magnetic className="w-full sm:w-auto">
              {primaryCta.label}
            </Button>
          </div>
          <div className="hero-cta w-full sm:w-auto">
            <Button variant="outline" size="lg" href={secondaryCta.href} className="w-full sm:w-auto">
              {secondaryCta.label}
            </Button>
          </div>
        </div>

        {imageUrl && (
          <div className="mt-16 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-[color:var(--border)] shadow-2xl relative">
            <img src={imageUrl} alt="Hero illustration" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--bg-primary)] to-transparent pointer-events-none" />
          </div>
        )}
      </div>
      <div className="noise-overlay" />
    </section>
  )
}
