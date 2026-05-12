'use client'

import { useGSAP } from '@gsap/react'
import { gsap, TextPlugin } from '@/lib/gsap'
import { RefObject } from 'react'

// Ensure TextPlugin is registered (already done in lib/gsap.ts)
void TextPlugin

/**
 * useGsapTypewriter
 * Types out text character by character using GSAP TextPlugin.
 * Apply to the hero sub-headline.
 * @param ref - ref to the element that will receive the text
 * @param fullText - the full string to type out
 * @param delay - seconds to wait before starting (default 1.2, after headline reveal)
 */
export function useGsapTypewriter(
  ref: RefObject<HTMLElement | null>,
  fullText: string,
  delay = 1.2
) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      if (ref.current) ref.current.textContent = fullText
      return
    }

    const el = ref.current
    if (!el) return

    // Start empty, then type
    el.textContent = ''

    // Create cursor
    const cursor = document.createElement('span')
    cursor.textContent = '|'
    cursor.style.cssText = 'display:inline-block;margin-left:2px;opacity:1;animation:blink 0.8s step-end infinite;'
    el.appendChild(cursor)

    // Add blink animation
    if (!document.getElementById('typewriter-blink-style')) {
      const style = document.createElement('style')
      style.id = 'typewriter-blink-style'
      style.textContent = `@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`
      document.head.appendChild(style)
    }

    const tl = gsap.timeline({ delay })

    tl.to(el, {
      duration: 0.8,
      text: {
        value: fullText,
        delimiter: '',
      },
      ease: 'none',
      onUpdate: () => {
        // Keep cursor at end
        if (cursor.parentNode !== el) el.appendChild(cursor)
      },
      onComplete: () => {
        // Stop blinking and remove cursor after brief pause
        gsap.to(cursor, {
          opacity: 0,
          duration: 0.4,
          delay: 0.8,
          onComplete: () => cursor.remove(),
        })
      },
    })
  }, { scope: ref })
}
