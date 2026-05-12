'use client'

import React, { useRef } from 'react'
import { useGsapScrollProgress } from '@/hooks/useGsapScrollProgress'

/**
 * ScrollProgressBar
 * Thin 2px bar at the top of the viewport that grows from left→right as user scrolls.
 */
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)
  useGsapScrollProgress(barRef)

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, var(--accent), #7B8FFF)',
        transformOrigin: 'left center',
        zIndex: 99998,
        pointerEvents: 'none',
      }}
    />
  )
}
