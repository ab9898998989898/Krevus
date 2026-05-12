'use client'

import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { RefObject } from 'react'

/**
 * useGsapStaggerWords
 * Each word in targeted paragraphs animates in individually from bottom.
 * Targets elements with class `stagger-words` inside the container.
 */
export function useGsapStaggerWords(ref: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const el = ref.current
    if (!el) return

    // Split text into word spans
    const text = el.textContent || ''
    const words = text.split(' ').filter(w => w.length > 0)

    el.innerHTML = words
      .map(w => `<span class="inline-block word-split" style="overflow:hidden;display:inline-block;margin-right:0.28em"><span class="inline-block word-inner">${w}</span></span>`)
      .join('')

    const inners = el.querySelectorAll<HTMLElement>('.word-inner')

    gsap.set(inners, { y: 30, opacity: 0 })

    ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gsap.to(inners, {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power2.out',
        })
      },
    })
  }, { scope: ref })
}
