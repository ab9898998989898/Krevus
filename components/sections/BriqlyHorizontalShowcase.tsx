'use client'

import React, { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ArrowUpRight } from 'lucide-react'

const portfolioItems = [
  {
    businessType: 'Dental Clinic',
    city: 'Chicago, IL',
    before: 'Static HTML site from 2018. No mobile optimization. 4.2s load time.',
    after: 'Fast, SEO-optimized site with online booking. Ranked #3 on Google Maps in 60 days.',
    result: '2× increase in online bookings',
    color: '#3D5AFE',
  },
  {
    businessType: 'Roofing Contractor',
    city: 'Austin, TX',
    before: 'Wix template with no contact form. Leads called a voicemail that went unchecked.',
    after: 'Conversion-focused landing page with SMS lead alerts and Google review integration.',
    result: '45% lower bounce rate',
    color: '#00C896',
  },
  {
    businessType: 'Restaurant',
    city: 'Miami, FL',
    before: 'PDF menu link on Facebook. No reservation system. Yelp page out of date.',
    after: 'Live menu, OpenTable embed, Google Business sync, and Instagram feed on site.',
    result: '3× more online reservations',
    color: '#F0A500',
  },
  {
    businessType: 'Law Firm',
    city: 'New York, NY',
    before: 'Generic template site ranking on page 4. No intake form. 80% mobile bounce rate.',
    after: 'Practice-area pages with schema markup, live chat intake, and Google Ads landing pages.',
    result: 'First page Google ranking in 60 days',
    color: '#FF4D6A',
  },
]

export function BriqlyHorizontalShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.upgrade-card')
    if (!cards || cards.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReduced) {
      gsap.set(cards, { opacity: 0, y: 50 })
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            stagger: 0.13,
            duration: 0.65,
            ease: 'power3.out',
          })
        },
      })
    }

    const line = lineRef.current
    if (line && !prefersReduced) {
      gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(line, { scaleX: 1, duration: 0.8, ease: 'power2.out' })
        },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white border-t border-[color:var(--border)]">
      <div className="container">
        <div className="mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--amber)] mb-4">THE UPGRADE</div>
          <div className="relative inline-block">
            <h2 className="text-h2 text-[color:var(--text-primary)] mb-2">
              See the difference a modern site makes.
            </h2>
            <div
              ref={lineRef}
              className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full"
              style={{ background: 'var(--amber)' }}
            />
          </div>
          <p className="text-lg text-[color:var(--text-body)] max-w-2xl mt-6">
            Every Briqly site is purpose-built to convert visitors. These are real transformations.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioItems.map(({ businessType, city, before, after, result, color }, i) => (
            <div
              key={i}
              className="upgrade-card group bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-2xl overflow-hidden hover:border-[color:var(--amber)]/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-[3px]" style={{ background: color }} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-sm font-bold text-[color:var(--text-primary)] mb-1">{businessType}</div>
                    <div className="text-xs text-[color:var(--text-muted)]">{city}</div>
                  </div>
                  <ArrowUpRight size={20} className="text-[color:var(--text-faint)] group-hover:text-[color:var(--amber)] transition-colors duration-200 shrink-0 mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[color:var(--bg-card)] rounded-xl p-4 border border-[color:var(--border)]">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-2">Before</div>
                    <p className="text-xs text-[color:var(--text-muted)] leading-relaxed">{before}</p>
                  </div>
                  <div className="bg-[color:var(--bg-card)] rounded-xl p-4 border border-[color:var(--border)]">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-green-500 mb-2">After</div>
                    <p className="text-xs text-[color:var(--text-muted)] leading-relaxed">{after}</p>
                  </div>
                </div>

                <div
                  className="text-sm font-bold px-4 py-2 rounded-full inline-block"
                  style={{ color, background: `${color}18`, border: `1px solid ${color}40` }}
                >
                  ↑ {result}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
