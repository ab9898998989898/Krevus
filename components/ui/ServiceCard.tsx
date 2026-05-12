'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { useGsapCardHover } from '@/hooks/useGsapCardHover'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Service cards have the left border always visible according to DESIGN.md
  // "Left border on service cards: 3px solid var(--accent) — always visible, not just on hover"
  useGsapCardHover(cardRef)

  return (
    <div 
      ref={cardRef} 
      className="relative flex flex-col bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-xl p-8 h-full transition-shadow overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[color:var(--accent)]" />
      
      <div className="w-12 h-12 rounded-lg bg-[color:var(--accent-dim)] flex items-center justify-center mb-6 text-[color:var(--accent)]">
        <Icon size={24} />
      </div>

      <h3 className="text-h3 mb-3">{title}</h3>
      <p className="text-base text-[color:var(--text-body)] mb-8 flex-grow">{description}</p>

      <Link href={href} className="inline-flex items-center text-[color:var(--accent)] font-semibold hover:underline mt-auto">
        Discuss This Service <ArrowRight size={16} className="ml-2" />
      </Link>
    </div>
  )
}
