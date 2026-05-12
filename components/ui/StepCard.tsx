import React from 'react'

interface StepCardProps {
  number: number
  title: string
  description: string
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left relative z-10 bg-white p-6 md:p-0 rounded-xl md:bg-transparent">
      <div className="w-12 h-12 bg-[color:var(--smb-accent)] rounded-full flex items-center justify-center text-white text-[24px] font-bold font-[family-name:var(--font-heading)] mb-6 shadow-md">
        {number}
      </div>
      <h3 className="text-h3 text-[color:var(--text-primary)] mb-3">{title}</h3>
      <p className="text-base text-[color:var(--text-body)]">{description}</p>
    </div>
  )
}
