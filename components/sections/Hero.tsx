'use client'

import React, { useRef, useEffect } from 'react'
import { Button } from '../ui/Button'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface HeroProps {
  headline: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  imageUrl?: string
  videoUrl?: string
}

export function Hero({ headline, subheadline, primaryCta, secondaryCta, imageUrl, videoUrl = '/videos/hero-bg.mp4' }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Floating blobs animation
      gsap.to('.hero-blob-1', {
        xPercent: 15,
        yPercent: 10,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-blob-2', {
        xPercent: -15,
        yPercent: 15,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-blob-3', {
        xPercent: 10,
        yPercent: -15,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Entry Timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', duration: 0.8 }
      });

      tl.from(headlineRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
      })
      .from(subheadlineRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.4')
      .from(ctasRef.current?.children || [], {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
      }, '-=0.4');

      // Scroll Effects
      mm.add("(min-width: 768px)", () => {
        // Fade out headline as user scrolls
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom center',
          onUpdate: (self) => {
            if (headlineRef.current) {
              gsap.set(headlineRef.current, { opacity: 1 - self.progress });
            }
          },
          scrub: true,
          markers: true, // Dev only
        });

        // Scale video background
        gsap.to(videoRef.current, {
          scale: 1.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            markers: true, // Dev only
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black"
    >
      {/* Full-viewport background video & fallback mesh gradients */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-black">
        {/* Animated premium tech gradient meshes */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
          <div className="hero-blob-1 absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.3)_0%,transparent_70%)] blur-[120px]" />
          <div className="hero-blob-2 absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.35)_0%,transparent_70%)] blur-[120px]" />
          <div className="hero-blob-3 absolute top-[25%] left-[30%] w-[45%] h-[45%] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)] blur-[100px]" />
        </div>

        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-60 mix-blend-lighten will-change-transform"
          onError={(e) => {
            (e.target as HTMLVideoElement).style.display = 'none';
          }}
        />
        {/* Overlay gradient fade to transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[color:var(--bg-primary)]/40 pointer-events-none" />
      </div>

      <div className="container relative z-10 max-w-[900px] text-center mx-auto px-6">
        <h1
          ref={headlineRef}
          className="text-hero text-white mb-8 tracking-tight font-bold font-[family-name:var(--font-heading)] leading-[1.05] will-change-opacity"
        >
          {headline}
        </h1>

        <p
          ref={subheadlineRef}
          className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed will-change-opacity"
        >
          {subheadline}
        </p>

        <div ref={ctasRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="w-full sm:w-auto">
            <Button variant="primary" size="lg" href={primaryCta.href} magnetic className="w-full sm:w-auto">
              {primaryCta.label}
            </Button>
          </div>
          <div className="w-full sm:w-auto">
            <Button variant="outline" size="lg" href={secondaryCta.href} className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10">
              {secondaryCta.label}
            </Button>
          </div>
        </div>

        {imageUrl && (
          <div className="mt-16 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative will-change-transform">
            <img src={imageUrl} alt="Hero illustration" className="w-full h-auto object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </div>
        )}
      </div>
      <div className="noise-overlay" />
    </section>
  )
}
