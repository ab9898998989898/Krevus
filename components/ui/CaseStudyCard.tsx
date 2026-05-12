'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useGsapCardHover } from '@/hooks/useGsapCardHover'
import { IndustryTag } from './IndustryTag'

interface CaseStudyCardProps {
  industry: 'tax-firms' | 'fintech' | 'real-estate'
  headline: string
  result: string
  href: string
  isDemo?: boolean
}

export function CaseStudyCard({ industry, headline, result, href, isDemo }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  useGsapCardHover(cardRef)

  return (
    <Link href={href} className="block group h-full">
      <div 
        ref={cardRef} 
        className="flex flex-col bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-xl p-8 h-full transition-shadow"
      >
        <div className="flex flex-wrap gap-2 items-center mb-6">
          <IndustryTag industry={industry} />
          {isDemo && (
            <span className="bg-[color:var(--amber-dim)] text-[color:var(--amber)] rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wide inline-block">
              Concept Project
            </span>
          )}
        </div>

        <h3 className="text-h3 mb-6 flex-grow">{headline}</h3>
        
        <p className="text-base font-medium text-[color:var(--success)] flex items-start mb-8">
          <CheckCircle2 size={20} className="mr-3 flex-shrink-0 mt-0.5" />
          <span>{result}</span>
        </p>

        <div className="flex items-center text-[color:var(--accent)] font-semibold mt-auto">
          Read case study <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
