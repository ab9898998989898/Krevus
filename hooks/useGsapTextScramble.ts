'use client'

import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { RefObject } from 'react'

/**
 * useGsapTextScramble
 * Smooth word-by-word reveal: each word slides up from a clip-path mask.
 * Much more elegant than character scrambling. Apply to H2 section headings.
 */
export function useGsapTextScramble(ref: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const el = ref.current
    if (!el) return

    // Split text into word spans
    const text = el.textContent || ''
    el.innerHTML = text
      .split(' ')
      .map(w => `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${w}</span></span>`)
      .join(' ')

    const words = el.querySelectorAll<HTMLElement>('.word-inner')
    gsap.set(words, { y: '105%', opacity: 0 })

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(words, {
          y: '0%',
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.05,
        })
      },
    })
  }, { scope: ref })
}

/**
 * useGsapTextScrambleOnMount
 * Same word-reveal but triggers on mount (for hero H1 equivalent usage).
 */
export function useGsapTextScrambleOnMount(ref: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const el = ref.current
    if (!el) return

    const text = el.textContent || ''
    el.innerHTML = text
      .split(' ')
      .map(w => `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${w}</span></span>`)
      .join(' ')

    const words = el.querySelectorAll<HTMLElement>('.word-inner')
    gsap.set(words, { y: '105%', opacity: 0 })

    setTimeout(() => {
      gsap.to(words, {
        y: '0%',
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.05,
        delay: 0.3,
      })
    }, 100)
  }, { scope: ref })
}
