'use client'

import React from 'react'

interface StatItemProps {
  value: string | number
  suffix?: string
  label: string
  className?: string
}

export function StatItem({ value, suffix = '', label, className = '' }: StatItemProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div
        className="text-[48px] md:text-[64px] font-bold leading-[1.1] text-[color:var(--text-primary)] font-[family-name:var(--font-heading)] mb-2 tracking-tight will-change-contents"
      >
        {value}{suffix}
      </div>
      <div className="text-lg font-medium text-[color:var(--text-muted)]">
        {label}
      </div>
    </div>
  )
}
