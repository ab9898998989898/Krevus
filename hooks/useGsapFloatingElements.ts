'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { RefObject } from 'react'

/**
 * useGsapFloatingElements
 * Subtle continuous floating (bob) on decorative elements.
 * Targets children with class `floating-el` inside the container.
 */
export function useGsapFloatingElements(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll<HTMLElement>('.floating-el')
    if (elements.length === 0) return

    gsap.set(elements, { willChange: 'transform' })

    gsap.to(elements, {
      y: -12,
      duration: 2.5,
      ease: 'sine.inOut',
      stagger: { each: 0.4, from: 'random' },
      repeat: -1,
      yoyo: true,
    })

    // Pause when tab hidden for performance
    const handleVisibility = () => {
      if (document.hidden) {
        gsap.globalTimeline.pause()
      } else {
        gsap.globalTimeline.resume()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, { scope: containerRef })
}
