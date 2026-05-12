'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * CustomCursor
 * Desktop-only custom cursor:
 *   - Outer ring: 32px, border 1.5px accent, 0.6s lag
 *   - Inner dot: 6px filled accent, instant
 *   - On clickable hover: ring scales 2x, opacity 0.3, dot scales 1.5x
 *   - On card hover: ring fills 10% accent, text "VIEW →" appears inside
 * Disabled on touch/mobile devices.
 */
export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    // Detect touch device — disable cursor entirely
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    setIsTouch(false)

    const outer = outerRef.current
    const inner = innerRef.current
    const label = labelRef.current
    if (!outer || !inner) return

    // Hide default cursor
    document.documentElement.style.cursor = 'none'

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let outerX = mouseX
    let outerY = mouseY

    gsap.set([outer, inner], { xPercent: -50, yPercent: -50 })
    gsap.set(outer, { x: mouseX, y: mouseY })
    gsap.set(inner, { x: mouseX, y: mouseY })

    // Instant inner dot movement
    const rafId = { current: 0 }
    const animate = () => {
      outerX += (mouseX - outerX) * 0.12
      outerY += (mouseY - outerY) * 0.12
      gsap.set(outer, { x: outerX, y: outerY })
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.set(inner, { x: e.clientX, y: e.clientY })
    }

    const onClickableEnter = () => {
      gsap.to(outer, { scale: 2, opacity: 0.3, duration: 0.2, ease: 'power2.out' })
      gsap.to(inner, { scale: 1.5, duration: 0.2, ease: 'power2.out' })
    }

    const onClickableLeave = () => {
      gsap.to(outer, { scale: 1, opacity: 0.6, duration: 0.2, ease: 'power2.out' })
      gsap.to(inner, { scale: 1, duration: 0.2, ease: 'power2.out' })
    }

    const onCardEnter = () => {
      gsap.to(outer, {
        scale: 2.2,
        backgroundColor: 'rgba(61,90,254,0.10)',
        opacity: 0.8,
        duration: 0.25,
        ease: 'power2.out',
      })
      if (label) gsap.to(label, { opacity: 1, scale: 1, duration: 0.2 })
    }

    const onCardLeave = () => {
      gsap.to(outer, {
        scale: 1,
        backgroundColor: 'rgba(61,90,254,0)',
        opacity: 0.6,
        duration: 0.25,
        ease: 'power2.out',
      })
      if (label) gsap.to(label, { opacity: 0, scale: 0, duration: 0.15 })
    }

    const onMouseLeave = () => gsap.to([outer, inner], { opacity: 0, duration: 0.2 })
    const onMouseEnter = () => gsap.to([outer, inner], { opacity: 1, duration: 0.2 })

    window.addEventListener('mousemove', onMouseMove)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)

    // Attach delegated listeners
    const attachListeners = () => {
      document.querySelectorAll<HTMLElement>('a, button, [role="button"], input, label, select').forEach(el => {
        el.style.cursor = 'none'
        el.addEventListener('mouseenter', onClickableEnter)
        el.addEventListener('mouseleave', onClickableLeave)
      })

      document.querySelectorAll<HTMLElement>('[data-cursor="card"]').forEach(el => {
        el.style.cursor = 'none'
        el.addEventListener('mouseenter', onCardEnter)
        el.addEventListener('mouseleave', onCardLeave)
      })
    }

    // Run once + observe future additions
    attachListeners()
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.documentElement.style.cursor = ''
      observer.disconnect()
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: 8,
            fontWeight: 700,
            color: 'var(--accent)',
            opacity: 0,
            transform: 'scale(0)',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          VIEW →
        </span>
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
    </>
  )
}
