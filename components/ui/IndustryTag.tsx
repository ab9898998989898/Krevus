import React from 'react'

export interface IndustryTagProps {
  industry: 'tax-firms' | 'fintech' | 'real-estate'
}

const industryLabels = {
  'tax-firms': 'Tax & CPA',
  'fintech': 'Fintech',
  'real-estate': 'Real Estate',
}

export function IndustryTag({ industry }: IndustryTagProps) {
  return (
    <span className="bg-[color:var(--accent-dim)] text-[color:var(--accent)] rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wide inline-block">
      {industryLabels[industry]}
    </span>
  )
}
