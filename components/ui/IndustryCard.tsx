'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { useGsapCardHover } from '@/hooks/useGsapCardHover'

interface IndustryCardProps {
  icon: LucideIcon
  name: string
  description: string
  href: string
}

export function IndustryCard({ icon: Icon, name, description, href }: IndustryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  useGsapCardHover(cardRef)

  return (
    <Link href={href} className="block group h-full">
      <div 
        ref={cardRef} 
        className="flex flex-col bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-xl p-8 h-full transition-shadow"
      >
        <div className="w-12 h-12 rounded-lg bg-[color:var(--accent-dim)] flex items-center justify-center mb-6 text-[color:var(--accent)]">
          <Icon size={24} />
        </div>

        <h3 className="text-h3 mb-3">{name}</h3>
        <p className="text-base text-[color:var(--text-body)] mb-8 flex-grow">{description}</p>

        <div className="flex items-center text-[color:var(--accent)] font-semibold mt-auto">
          Explore Industry <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
