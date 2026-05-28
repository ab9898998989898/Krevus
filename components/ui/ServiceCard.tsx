'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { gsap } from '@/lib/gsap'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const onMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(titleRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
      duration: 0.4,
      ease: 'power2.inOut',
    });
    gsap.to(titleRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative flex flex-col bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-xl p-8 h-full overflow-hidden will-change-transform"
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[color:var(--accent)]" />

      <div className="w-12 h-12 rounded-lg bg-[color:var(--accent-dim)] flex items-center justify-center mb-6 text-[color:var(--accent)]">
        <Icon size={24} />
      </div>

      <h3 ref={titleRef} className="text-h3 mb-3 will-change-transform">{title}</h3>
      <p className="text-base text-[color:var(--text-body)] mb-8 flex-grow">{description}</p>

      <Link href={href} className="inline-flex items-center text-[color:var(--accent)] font-semibold hover:underline mt-auto">
        Discuss This Service <ArrowRight size={16} className="ml-2" />
      </Link>
    </div>
  )
}
