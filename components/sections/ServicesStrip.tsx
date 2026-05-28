'use client'

import React, { useRef, useEffect } from 'react'
import { Lock, Bot, BarChart2 } from 'lucide-react'
import { ServiceCard } from '../ui/ServiceCard'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function ServicesStrip() {
  const containerRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Initial Load Stagger
      gsap.from('.service-card-wrapper', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Scroll Entry Rotation
      mm.add("(min-width: 768px)", () => {
        gsap.from('.service-card-wrapper', {
          rotate: 3,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true,
            markers: true, // Dev only
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
          <h2 className="section-heading text-h2 mb-4">Digital Infrastructure Built for Scale</h2>
          <p className="section-sub text-lg text-[color:var(--text-muted)] max-w-2xl">
            We replace manual workflows with secure, automated systems that run your firm 24/7.
          </p>
        </div>

        <div ref={cardsRef} className="section-content grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="service-card-wrapper will-change-transform">
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
