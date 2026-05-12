'use client'

import React, { useRef } from 'react'
import { Shield } from 'lucide-react'
import { useGsapGlowPulse } from '@/hooks/useGsapGlowPulse'

export function BriqlyGuaranteeSection() {
  const iconRef = useRef<HTMLDivElement>(null)
  // Amber glow for the shield
  useGsapGlowPulse(iconRef, 'rgba(240, 165, 0, 0.5)')

  return (
    <section className="py-20 bg-[color:var(--amber)] text-white">
      <div className="container max-w-3xl mx-auto text-center">
        <div
          ref={iconRef}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-8 mx-auto"
          style={{ borderRadius: '50%' }}
        >
          <Shield size={36} className="text-white" />
        </div>

        <h2
          className="font-[family-name:var(--font-heading)] font-bold text-white mb-6"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.1 }}
        >
          7-Day Delivery. Guaranteed.
        </h2>

        <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          If we don&apos;t deliver your website within the agreed timeline, you get a full refund. 
          No questions asked. We&apos;ve never had to pay one.
        </p>

        <a
          href="/briqly#briqly-contact"
          className="inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 cursor-pointer text-btn px-9 py-4 bg-white text-[color:var(--amber)] hover:bg-white/90 active:scale-95 shadow-md"
        >
          Hold Us To It →
        </a>
      </div>
    </section>
  )
}
