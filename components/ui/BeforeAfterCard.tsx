'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useGsapParallax } from '@/hooks/useGsapParallax'

interface BeforeAfterCardProps {
  businessType: string
  city: string
  beforeImageUrl: string
  afterImageUrl: string
  result: string
  isDemo?: boolean
}

export function BeforeAfterCard({
  businessType,
  city,
  beforeImageUrl,
  afterImageUrl,
  result,
  isDemo
}: BeforeAfterCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  
  useGsapParallax(containerRef)

  return (
    <div 
      ref={containerRef}
      className="flex flex-col bg-white border border-[color:var(--border)] rounded-xl overflow-hidden min-w-[300px] md:min-w-0"
    >
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer group"
        onClick={() => setIsRevealed(!isRevealed)}
        onMouseEnter={() => setIsRevealed(true)}
        onMouseLeave={() => setIsRevealed(false)}
      >
        <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          {/* We'll use a standard img tag with object-fit if no real images are provided yet, 
              or Next.js Image component if configured. A placeholder is fine for now. */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            {beforeImageUrl ? (
              <img src={beforeImageUrl} alt={`Before`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400">Before Image</span>
            )}
          </div>
          
          <div 
            className="absolute inset-0 w-full h-full transition-all duration-[450ms] ease-in-out"
            style={{ clipPath: isRevealed ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
          >
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              {afterImageUrl ? (
                <img src={afterImageUrl} alt={`After`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500">After Image</span>
              )}
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded">
          {isRevealed ? 'After' : 'Before'}
        </div>

        {isDemo && (
          <div className="absolute top-4 right-4 bg-[color:var(--amber-dim)] text-[color:var(--amber)] text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded">
            Concept Project
          </div>
        )}
      </div>

      <div className="p-6">
        <h4 className="text-h4 text-[color:var(--text-primary)] mb-1">{businessType}</h4>
        <p className="text-sm text-[color:var(--text-muted)] mb-4">{city}</p>
        <p className="text-sm font-medium text-[color:var(--success)]">{result}</p>
      </div>
    </div>
  )
}
