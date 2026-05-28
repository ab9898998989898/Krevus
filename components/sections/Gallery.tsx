'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const works = [
  {
    title: 'Fintech Dashboard',
    category: 'Software Architecture',
    image: '/images/work/fintech.png',
    color: 'bg-blue-500/10'
  },
  {
    title: 'Tax Portal',
    category: 'Secure Infrastructure',
    image: '/images/work/tax.png',
    color: 'bg-amber-500/10'
  },
  {
    title: 'Real Estate Platform',
    category: 'Digital Transformation',
    image: '/images/work/realestate.png',
    color: 'bg-emerald-500/10'
  },
  {
    title: 'AI Automation Suite',
    category: 'Intelligent Workflows',
    image: '/images/work/ai.png',
    color: 'bg-purple-500/10'
  },
  {
    title: 'Client Portal',
    category: 'B2B Experience',
    image: '/images/work/portal.png',
    color: 'bg-rose-500/10'
  },
  {
    title: 'Enterprise API',
    category: 'Backend Systems',
    image: '/images/work/api.png',
    color: 'bg-cyan-500/10'
  },
]

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.from(itemsRef.current, {
          clipPath: 'inset(50% 50% 50% 50%)',
          stagger: 0.1,
          duration: 1,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            once: true,
            markers: true, // Dev only
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    gsap.to(ref.current, {
      scale: 1.05,
      rotate: 2,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    gsap.to(ref.current, {
      scale: 1,
      rotate: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  };

  return (
    <section ref={containerRef} className="py-24 bg-[color:var(--bg-primary)] overflow-hidden">
      <div className="container">
        <div className="mb-16">
          <div className="section-label text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4">Our Work</div>
          <h2 className="section-heading text-h2 mb-4">Proven Results Across Industries</h2>
          <p className="section-sub text-lg text-[color:var(--text-muted)] max-w-2xl">
            We don't just build websites; we engineer growth engines that automate your operation and delight your clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, i) => {
            const itemRef = useRef<HTMLDivElement>(null);
            // Store ref in array for GSAP
            if (!itemsRef.current.includes(itemRef)) {
              itemsRef.current.push(itemRef);
            }

            return (
              <div
                key={i}
                ref={itemRef}
                onMouseEnter={(e) => handleMouseEnter(e, itemRef)}
                onMouseLeave={(e) => handleMouseLeave(e, itemRef)}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[color:var(--border)] will-change-transform ${work.color}`}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">{work.category}</div>
                  <h3 className="text-xl font-bold">{work.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
