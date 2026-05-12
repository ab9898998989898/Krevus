'use client'

import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { RefObject } from 'react'

/**
 * useGsapRevealMask
 * A reveal-from-mask effect — a solid panel slides away revealing content.
 * Expects the container to have:
 *   - a child with class `reveal-mask` (the sliding panel)
 *   - a child with class `reveal-content` (the content underneath)
 */
export function useGsapRevealMask(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const container = containerRef.current
    if (!container) return

    const masks = container.querySelectorAll<HTMLElement>('.reveal-mask')
    const contents = container.querySelectorAll<HTMLElement>('.reveal-content')

    masks.forEach((mask, i) => {
      const content = contents[i]
      if (!mask) return

      // Set initial state
      gsap.set(mask, { x: '0%', willChange: 'transform' })
      if (content) gsap.set(content, { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mask.parentElement || mask,
          start: 'top 82%',
          once: true,
        },
        onComplete: () => {
          gsap.set(mask, { willChange: 'auto' })
          if (content) gsap.set(content, { willChange: 'auto' })
        },
      })

      tl.to(mask, { x: '101%', duration: 0.6, ease: 'power3.inOut' })

      if (content) {
        tl.to(content, { opacity: 1, duration: 0.3 }, '-=0.2')
      }
    })
  }, { scope: containerRef })
}

/**
 * useGsapRevealMaskSingle
 * Apply to a single card element rather than a container of many.
 */
export function useGsapRevealMaskSingle(ref: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const el = ref.current
    if (!el) return

    const mask = el.querySelector<HTMLElement>('.reveal-mask')
    const content = el.querySelector<HTMLElement>('.reveal-content')
    if (!mask) return

    gsap.set(mask, { x: '0%', willChange: 'transform' })
    if (content) gsap.set(content, { opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        once: true,
      },
      onComplete: () => {
        gsap.set(mask, { willChange: 'auto' })
        if (content) gsap.set(content, { willChange: 'auto' })
      },
    })

    tl.to(mask, { x: '101%', duration: 0.6, ease: 'power3.inOut' })
    if (content) {
      tl.to(content, { opacity: 1, duration: 0.3 }, '-=0.2')
    }
  }, { scope: ref })
}
