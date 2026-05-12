'use client'

import React, { useRef } from 'react'
import { Calculator, Building2, Briefcase } from 'lucide-react'
import { IndustryCard } from '../ui/IndustryCard'
import { useGsapSectionReveal } from '@/hooks/useGsapSectionReveal'
import { useGsapLineReveal } from '@/hooks/useGsapLineReveal'
import { useGsapTextScramble } from '@/hooks/useGsapTextScramble'

export function IndustriesBlock() {
  const containerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  
  useGsapSectionReveal(containerRef)
  useGsapLineReveal(lineRef)
  useGsapTextScramble(headingRef)

  const industries = [
    { 
      icon: Calculator, 
      name: 'Tax & CPA Firms', 
      description: 'Stop emailing sensitive documents. We build secure client portals with automated onboarding.', 
      href: '/industries/tax-firms' 
    },
    { 
      icon: Briefcase, 
      name: 'Fintech', 
      description: 'Build compliant, fast, and connected platforms without a 12-month internal roadmap.', 
      href: '/industries/fintech' 
    },
    { 
      icon: Building2, 
      name: 'Real Estate', 
      description: 'Capture leads with AI and provide real-time property portals for your clients.', 
      href: '/industries/real-estate' 
    },
  ]

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[color:var(--bg-subtle)] relative border-t border-[color:var(--border)]">
      <div className="container">
        <div className="mb-16">
          <h2 ref={headingRef} className="section-heading text-h2 mb-6 inline-block relative">
            Industries We Serve
            <div ref={lineRef} className="absolute -bottom-2 left-0 h-[2px] bg-[color:var(--accent)] w-0" />
          </h2>
          <p className="section-sub text-lg text-[color:var(--text-muted)] max-w-2xl mt-4">
            We specialize in highly regulated, high-ticket industries where trust and precision are non-negotiable.
          </p>
        </div>
        
        <div className="section-content grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((ind, index) => (
            <div key={index}>
              <IndustryCard 
                icon={ind.icon}
                name={ind.name}
                description={ind.description}
                href={ind.href}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
