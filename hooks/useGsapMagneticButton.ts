import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { RefObject } from 'react'

export function useGsapMagneticButton(btnRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const btn = btnRef.current
    if (!btn) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      // If within 80px (approximate detection logic)
      if (Math.abs(distanceX) < 80 + rect.width / 2 && Math.abs(distanceY) < 80 + rect.height / 2) {
        gsap.to(btn, { x: distanceX * 0.35, y: distanceY * 0.35, duration: 0.3 })
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    }

    window.addEventListener('mousemove', handleMouseMove)
    btn.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      btn.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: btnRef })
}
