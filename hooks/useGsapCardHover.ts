import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { RefObject } from 'react'

export function useGsapCardHover(cardRef: RefObject<HTMLElement | null>, borderRef?: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const card = cardRef.current
    const borderEl = borderRef?.current

    if (!card) return

    const handleMouseEnter = () => {
      gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' })
      if (borderEl) {
        gsap.to(borderEl, { opacity: 1, duration: 0.2 })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
      if (borderEl) {
        gsap.to(borderEl, { opacity: 0.3, duration: 0.2 })
      }
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: cardRef })
}
