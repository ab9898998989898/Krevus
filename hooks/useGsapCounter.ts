import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { RefObject } from 'react'

/**
 * useGsapCounter
 * Upgraded with:
 * 1. Count-up with odometer-style easing
 * 2. Brief scale pulse when counter reaches final value
 * 3. Color brightens briefly on complete
 */
export function useGsapCounter(ref: RefObject<HTMLElement | null>, target: number, suffix: string = '') {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      if (ref.current) ref.current.textContent = `${target}${suffix}`
      return
    }

    const el = ref.current
    if (!el) return

    const obj = { val: 0 }

    gsap.set(el, { willChange: 'transform, color' })

    gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.val)}${suffix}`
      },
      onComplete: () => {
        // Scale pulse
        gsap.timeline()
          .to(el, { scale: 1.15, duration: 0.15, ease: 'power2.out' })
          .to(el, { scale: 1, duration: 0.2, ease: 'power2.in' })
          .to(el, { color: '#FFFFFF', duration: 0.1 }, 0)
          .to(el, { color: '', duration: 0.5, delay: 0.1 })
          .set(el, { willChange: 'auto' })
      },
    })
  }, { scope: ref })
}
