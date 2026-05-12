import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { usePathname } from 'next/navigation'
import { RefObject, useState } from 'react'

export function useGsapPageTransition(pageRef: RefObject<HTMLElement | null>) {
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState(pathname)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const page = pageRef.current
    if (!page) return

    if (pathname !== currentPath) {
      gsap.fromTo(page, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      )
      setCurrentPath(pathname)
    }
  }, { scope: pageRef, dependencies: [pathname, currentPath] })

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const page = pageRef.current
    if (!page) return

    gsap.fromTo(page, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    )
  }, { scope: pageRef })
}
