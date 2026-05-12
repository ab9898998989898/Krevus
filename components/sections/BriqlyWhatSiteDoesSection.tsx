'use client'

import React, { useRef } from 'react'
import { Search, Smartphone, Phone } from 'lucide-react'
import { useGsapSectionReveal } from '@/hooks/useGsapSectionReveal'

const features = [
  {
    icon: Search,
    title: 'Shows Up on Google',
    description:
      'We optimise every site for local search. When someone searches "[your business] in [your city]", you show up. Not your competitor.',
  },
  {
    icon: Smartphone,
    title: 'Works on Every Phone',
    description:
      '100% of your visitors are on mobile. Your new site loads in under 2 seconds and looks perfect on every screen size.',
  },
  {
    icon: Phone,
    title: 'Gets You Contacted',
    description:
      'Click-to-call buttons, WhatsApp links, contact forms, and booking integration. We make it effortless for customers to reach you.',
  },
]

export function BriqlyWhatSiteDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useGsapSectionReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[color:var(--bg-subtle)] border-b border-[color:var(--border)]"
    >
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-h2 text-[color:var(--text-primary)] mb-4">
            Not just a website. A 24/7 salesperson.
          </h2>
          <p className="text-lg text-[color:var(--text-body)] max-w-2xl mx-auto">
            Every Briqly site is engineered to convert visitors into customers — on autopilot.
          </p>
        </div>

        <div className="section-content grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description }, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 border border-[color:var(--border)] shadow-sm group hover:border-[color:var(--amber)]/40 transition-colors duration-300"
              data-cursor="card"
            >
              <div className="w-12 h-12 rounded-xl bg-[color:var(--amber)]/10 flex items-center justify-center mb-6 text-[color:var(--amber)]">
                <Icon size={24} />
              </div>
              <h3 className="text-h4 text-[color:var(--text-primary)] mb-3 font-[family-name:var(--font-heading)]">
                {title}
              </h3>
              <p className="text-sm text-[color:var(--text-body)] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
