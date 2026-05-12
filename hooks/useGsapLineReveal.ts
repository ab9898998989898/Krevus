import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { RefObject } from 'react'

export function useGsapLineReveal(ref: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const line = ref.current
    if (!line) return

    gsap.fromTo(line, 
      { width: '0%' }, 
      { 
        width: '100%', 
        duration: 0.7, 
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: line,
          start: 'top 80%'
        }
      }
    )
  }, { scope: ref })
}
