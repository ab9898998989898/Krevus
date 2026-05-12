'use client'

import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { RefObject } from 'react'

/**
 * useGsapScrollProgress
 * Thin top-of-page progress bar that grows 0→100% as user scrolls.
 * Apply to a ref on the progress bar element (a fixed div at top of page).
 */
export function useGsapScrollProgress(ref: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' })

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0,
      onUpdate: (self) => {
        gsap.set(el, { scaleX: self.progress })
      },
    })
  }, { scope: ref })
}
