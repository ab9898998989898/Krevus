'use client'

import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { RefObject } from 'react'

/**
 * useGsapHorizontalScroll
 * Pins a section and scrolls its content horizontally while the user scrolls vertically.
 * The container must have:
 *   - class `h-scroll-container` on the pinned outer div
 *   - class `h-scroll-track` on the inner scrolling row
 * Automatically disabled on mobile (< 768px).
 */
export function useGsapHorizontalScroll(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Disable on mobile
    if (window.innerWidth < 768) return

    const container = containerRef.current
    if (!container) return

    const track = container.querySelector<HTMLElement>('.h-scroll-track')
    const progressBar = container.querySelector<HTMLElement>('.h-scroll-progress')
    if (!track) return

    gsap.set(container, { contain: 'paint' })

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressBar) {
            gsap.set(progressBar, { scaleX: self.progress, transformOrigin: 'left center' })
          }
        },
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === container) t.kill()
      })
    }
  }, { scope: containerRef })
}
