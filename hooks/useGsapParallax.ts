import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { RefObject } from 'react'

export function useGsapParallax(ref: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    
    // Disable completely under 768px breakpoint
    if (window.innerWidth < 768) return

    const el = ref.current
    if (!el) return

    gsap.fromTo(el, 
      { y: -40 }, 
      { 
        y: 40, 
        scrollTrigger: { 
          trigger: el,
          scrub: 1.5 
        } 
      }
    )
  }, { scope: ref })
}
