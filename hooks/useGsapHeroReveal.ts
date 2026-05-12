import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { RefObject } from 'react'

export function useGsapHeroReveal(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const container = containerRef.current
    if (!container) return

    const h1 = container.querySelector('h1')
    const sub = container.querySelector('.hero-sub')
    const ctas = container.querySelectorAll('.hero-cta')
    const shapes = container.querySelectorAll<HTMLElement>('.hero-shape')
    const mesh = container.querySelector<HTMLElement>('.gradient-mesh')

    const tl = gsap.timeline()

    // 1. Background mesh fades in
    if (mesh) {
      tl.fromTo(mesh,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' },
        0
      )
    }

    // 2. Geometric shapes float in from outside
    if (shapes.length > 0) {
      const origins = [
        { x: 200, y: 0 },   // top-right shape
        { x: 150, y: -80 },  // top-right small
        { x: -150, y: 0 },  // bottom-left
        { x: 100, y: 60 },   // bottom-right
      ]
      shapes.forEach((shape, i) => {
        const origin = origins[i] || { x: 0, y: 0 }
        tl.fromTo(shape,
          { x: origin.x, y: origin.y, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: i === 0 ? 1.5 : i === 1 ? 1.5 : i === 2 ? 2 : 1.8, ease: 'power3.out' },
          0.3
        )
      })
    }

    // 3. Headline
    if (h1) {
      tl.fromTo(h1,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out' },
        0.2
      )
    }

    // 4. Sub-headline (only if not typewriter)
    if (sub && !sub.classList.contains('min-h-\\[3em\\]')) {
      tl.fromTo(sub,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '+=0.35'
      )
    }

    // 5. CTAs
    if (ctas.length > 0) {
      tl.fromTo(ctas,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1 },
        '+=0.15'
      )
    }
  }, { scope: containerRef })
}
