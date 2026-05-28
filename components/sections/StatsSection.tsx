'use client'

import React, { useRef, useEffect, useState } from 'react'
import { StatItem } from '../ui/StatItem'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 3,  suffix: '',  label: 'Industries Served' },
  { value: 100, suffix: '%', label: 'US Client Focus' },
  { value: 98,  suffix: '%', label: 'Client Retention' },
  { value: 30,  suffix: '',  label: 'Days Post-Launch Support' },
  { value: 6,   suffix: 'wk', label: 'Avg. Time to Launch' },
]

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Sequential Count-Up Animation
      const countTls = stats.map((stat, i) => {
        const proxy = { val: 0 };
        return gsap.to(proxy, {
          val: stat.value,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            setCounts(prev => {
              const next = [...prev];
              next[i] = Math.floor(proxy.val);
              return next;
            });
          },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
            markers: true, // Dev only
          },
          delay: i * 0.15, // Sequential stagger
        });
      });

      // Background Parallax Shift
      mm.add("(min-width: 768px)", () => {
        gsap.to(bgRef.current, {
          backgroundPosition: '50% 100%',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
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
      className="relative py-24 border-y border-[color:var(--border)] bg-[color:var(--bg-primary)] overflow-hidden"
    >
      {/* Parallax Background Gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(61,90,254,0.15) 0%, transparent 70%)',
          backgroundSize: '100% 200%',
          backgroundPosition: '50% 0%'
        }}
      />

      {/* Glow strips */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--accent) 40%, var(--accent) 60%, transparent 100%)', opacity: 0.25 }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--accent) 40%, var(--accent) 60%, transparent 100%)', opacity: 0.25 }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-center will-change-contents">
              <StatItem
                value={counts[index]}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

