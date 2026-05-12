import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { RefObject } from 'react'

export function useGsapSectionReveal(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const container = containerRef.current
    if (!container) return

    const label = container.querySelector('.section-label')
    const heading = container.querySelector('.section-heading')
    const sub = container.querySelector('.section-sub')
    const content = container.querySelector('.section-content')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%'
      }
    })

    if (label) {
      tl.fromTo(label, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0)
    }

    if (heading) {
      tl.fromTo(heading, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, label ? 0.15 : 0)
    }

    if (sub) {
      tl.fromTo(sub, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, heading ? 0.3 : 0)
    }

    if (content && content.children.length > 0) {
      tl.fromTo(content.children, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.12 },
        sub ? 0.8 : (heading ? 0.5 : 0)
      )
    }
  }, { scope: containerRef })
}
