'use client'

import React, { useRef, useEffect } from 'react'
import { Button } from '../ui/Button'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function BriqlyCTABanner() {
  const bannerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slide-in from bottom at 60% page depth
      gsap.to(bannerRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: 'body',
          start: '60% bottom',
          toggleActions: 'play none none reverse',
          markers: true, // Dev only
        },
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const handleRipple = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const ripple = document.createElement('div');

    ripple.className = 'absolute rounded-full bg-white/30 pointer-events-none will-change-transform';
    ripple.style.width = '2px';
    ripple.style.height = '2px';
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    ripple.style.position = 'absolute';

    buttonRef.current.appendChild(ripple);

    gsap.to(ripple, {
      scale: 10,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        ripple.remove();
      },
    });
  };

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-0 left-0 right-0 z-50 translate-y-full transition-transform duration-300"
    >
      <section className="py-6 bg-[color:var(--bg-subtle)] border-t border-[color:var(--border)] briqly-theme relative overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-6 max-w-6xl mx-auto">
          <div className="text-left">
            <div className="inline-block bg-[color:var(--smb-accent)] text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full mb-2">
              SMB Services
            </div>
            <h2 className="text-lg font-bold text-[color:var(--text-primary)] leading-tight">
              Need a website for your local business? Delivered in 7 days.
            </h2>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <p className="text-sm text-[color:var(--text-body)] hidden sm:block">
              Transparent pricing from $400.
            </p>
            <Button
              ref={buttonRef}
              variant="amber"
              size="sm"
              href="/briqly"
              onClick={handleRipple}
              className="relative overflow-hidden"
            >
              See Packages
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
