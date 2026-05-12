'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { RefObject } from 'react'

/**
 * useGsapGlowPulse
 * Pulsing glow effect on accent elements — breathing blue glow.
 * Pass `color` to override the default accent blue.
 */
export function useGsapGlowPulse(
  ref: RefObject<HTMLElement | null>,
  color = 'rgba(61, 90, 254, 0.4)'
) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const el = ref.current
    if (!el) return

    const anim = gsap.to(el, {
      boxShadow: `0 0 24px ${color}`,
      duration: 1.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Intensify on hover
    const handleEnter = () => {
      anim.pause()
      const strong = color.replace(/[\d.]+\)$/, '0.7)')
      gsap.to(el, {
        boxShadow: `0 0 40px ${strong}`,
        duration: 0.25,
        ease: 'power2.out',
      })
    }

    const handleLeave = () => {
      gsap.to(el, {
        boxShadow: `0 0 0px ${color.replace(/[\d.]+\)$/, '0)')}`,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => anim.resume(),
      })
    }

    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)

    // Pause when tab hidden
    const handleVisibility = () => {
      if (document.hidden) anim.pause()
      else anim.resume()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
      anim.kill()
    }
  }, { scope: ref })
}
