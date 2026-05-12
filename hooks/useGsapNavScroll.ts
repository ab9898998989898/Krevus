import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { RefObject } from 'react'

export function useGsapNavScroll(headerRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const header = headerRef.current
    if (!header) return

    ScrollTrigger.create({
      start: 'top -80px',
      onEnter: () => gsap.to(header, { backgroundColor: 'rgba(8,12,20,0.96)', backdropFilter: 'blur(16px)', duration: 0.35 }),
      onLeaveBack: () => gsap.to(header, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.35 }),
    })
  }, { scope: headerRef })
}
