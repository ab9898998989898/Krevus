'use client'

import React, { useRef } from 'react'
import { useGsapCounter } from '@/hooks/useGsapCounter'

interface StatItemProps {
  value: number
  suffix?: string
  label: string
}

export function StatItem({ value, suffix = '', label }: StatItemProps) {
  const numRef = useRef<HTMLDivElement>(null)

  useGsapCounter(numRef, value, suffix)

  return (
    <div className="flex flex-col">
      <div 
        ref={numRef}
        className="text-[48px] md:text-[64px] font-bold leading-[1.1] text-[color:var(--text-primary)] font-[family-name:var(--font-heading)] mb-2 tracking-tight"
      >
        0{suffix}
      </div>
      <div className="text-lg font-medium text-[color:var(--text-muted)]">
        {label}
      </div>
    </div>
  )
}
