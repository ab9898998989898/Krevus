'use client'

import React, { useRef } from 'react'
import { Button } from '../ui/Button'
import { type LucideIcon, CheckCircle2 } from 'lucide-react'
import { useGsapSectionReveal } from '@/hooks/useGsapSectionReveal'

interface ServiceDetailProps {
  id: string
  icon: React.ReactNode
  title: string
  whatItIs: string
  whoFor: string
  deliverables: string[]
  result?: string
  align?: 'left' | 'right'
}

export function ServiceDetail({ 
  id, 
  icon, 
  title, 
  whatItIs, 
  whoFor, 
  deliverables, 
  result, 
  align = 'left' 
}: ServiceDetailProps) {
  const containerRef = useRef<HTMLElement>(null)
  useGsapSectionReveal(containerRef)

  const isRight = align === 'right'

  return (
    <section id={id} ref={containerRef} className={`py-24 md:py-32 ${isRight ? 'bg-[color:var(--bg-subtle)]' : 'bg-[color:var(--bg-primary)]'} border-t border-[color:var(--border)]`}>
      <div className="container">
        <div className={`flex flex-col md:flex-row gap-16 md:gap-24 items-center ${isRight ? 'md:flex-row-reverse' : ''}`}>
          
          <div className="flex-1 w-full section-content">
            <div className="w-16 h-16 rounded-xl bg-[color:var(--accent-dim)] flex items-center justify-center mb-8 text-[color:var(--accent)] [&>svg]:w-8 [&>svg]:h-8">
              {icon}
            </div>
            
            <h2 className="section-heading text-h2 mb-6">{title}</h2>
            
            <div className="space-y-6 mb-10">
              <div>
                <h4 className="text-sm font-bold tracking-widest text-[color:var(--text-muted)] uppercase mb-2">What It Is</h4>
                <p className="text-lg text-[color:var(--text-body)]">{whatItIs}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-bold tracking-widest text-[color:var(--text-muted)] uppercase mb-2">Who It's For</h4>
                <p className="text-lg text-[color:var(--text-body)]">{whoFor}</p>
              </div>
            </div>

            <Button variant="primary" href="/contact">Discuss This Service</Button>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-2xl p-8 md:p-10 section-content">
              <h3 className="text-h3 mb-8">Deliverables</h3>
              
              <ul className="space-y-5 mb-8">
                {deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start text-[color:var(--text-body)] text-lg">
                    <span className="w-2 h-2 rounded-full bg-[color:var(--accent)] mt-2.5 mr-4 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {result && (
                <div className="mt-10 pt-8 border-t border-[color:var(--border)]">
                  <h4 className="text-sm font-bold tracking-widest text-[color:var(--text-muted)] uppercase mb-3">Typical Result</h4>
                  <div className="flex items-start text-[color:var(--success)] font-semibold text-lg">
                    <CheckCircle2 size={24} className="mr-3 flex-shrink-0 mt-0.5" />
                    {result}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
