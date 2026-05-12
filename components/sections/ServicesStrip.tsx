'use client'

import React, { useRef } from 'react'
import { Lock, Bot, BarChart2 } from 'lucide-react'
import { ServiceCard } from '../ui/ServiceCard'
import { useGsapSectionReveal } from '@/hooks/useGsapSectionReveal'
import { useGsapTextScramble } from '@/hooks/useGsapTextScramble'

export function ServicesStrip() {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  useGsapSectionReveal(containerRef)
  useGsapTextScramble(headingRef)

  const services = [
    { 
      icon: Lock, 
      title: 'Secure Portals', 
      description: 'Encrypted client portals replacing email attachments for tax/CPA firms.', 
      href: '/services#portals' 
    },
    { 
      icon: Bot, 
      title: 'AI Automation', 
      description: 'Calling agents, chat agents, and intake bots providing 24/7 coverage.', 
      href: '/services#automation' 
    },
    { 
      icon: BarChart2, 
      title: 'Software & Dashboards', 
      description: 'Finance dashboards, data connection infrastructure, and real estate portals.', 
      href: '/services#software' 
    },
  ]

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[color:var(--bg-primary)]">
      <div className="container">
        <div className="mb-16">
          <div className="section-label text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">Core Capabilities</div>
          <h2 ref={headingRef} className="section-heading text-h2 mb-4">Digital Infrastructure Built for Scale</h2>
          <p className="section-sub text-lg text-[color:var(--text-muted)] max-w-2xl">
            We replace manual workflows with secure, automated systems that run your firm 24/7.
          </p>
        </div>
        
        <div className="section-content grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index}>
              <ServiceCard 
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
