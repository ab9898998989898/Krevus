import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { RefObject } from 'react'

export function useGsapFadeIn(ref: RefObject<HTMLElement | null>, stagger = 0.12) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const container = ref.current
    if (!container) return

    const children = container.children

    gsap.fromTo(children,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.65, 
        ease: 'power3.out', 
        stagger,
        scrollTrigger: {
          trigger: container,
          start: 'top 82%'
        }
      }
    )
  }, { scope: ref })
}
