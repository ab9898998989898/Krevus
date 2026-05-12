'use client'

import React, { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Krevus built our client portal in 5 weeks. Onboarding that used to take 3 days now takes 18 minutes. Our clients actually comment on how professional it feels.",
    name: "Sarah Mitchell",
    title: "Managing Partner, Mitchell CPA Group",
    initials: "SM",
    color: "var(--accent)",
  },
  {
    quote: "We had spreadsheets managing $40M in transactions. Krevus replaced them with a real-time dashboard that our investors can log into. Game changer.",
    name: "David Park",
    title: "COO, Clearfund Financial",
    initials: "DP",
    color: "#00C896",
  },
  {
    quote: "The AI they built responds to leads faster than any human could. We went from losing weekend leads to capturing them automatically. ROI in the first month.",
    name: "James Reeves",
    title: "Broker-Owner, Reeves Realty Group",
    initials: "JR",
    color: "#F0A500",
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.testimonial-card')
    if (!cards || cards.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      cards.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none' })
      return
    }

    gsap.set(cards, { opacity: 0, y: 40 })

    ScrollTrigger.create({
      trigger: cardsRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.65,
          ease: 'power3.out',
        })
      },
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[color:var(--bg-subtle)] border-t border-[color:var(--border)] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(61,90,254,0.05) 0%, transparent 70%)' }}
      />

      <div className="container relative z-10">
        <div className="mb-16 text-center">
          <div className="section-label text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-4 justify-center flex">
            CLIENT STORIES
          </div>
          <h2 className="text-h2 mb-4">Don&apos;t take our word for it.</h2>
          <p className="text-lg text-[color:var(--text-muted)] max-w-xl mx-auto">
            Every engagement is measured by one thing: did it move the needle?
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, title, initials, color }, i) => (
            <div
              key={i}
              className="testimonial-card relative bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-2xl p-8 flex flex-col group hover:border-[color:var(--border-accent)] transition-all duration-300"
            >
              {/* Accent corner */}
              <div
                className="absolute top-0 left-0 w-12 h-12 rounded-tl-2xl rounded-br-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: color }}
              />

              <Quote size={24} className="mb-6 opacity-30" style={{ color }} />

              <p className="text-[color:var(--text-body)] leading-relaxed text-base mb-8 flex-1 italic">
                &ldquo;{quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-[color:var(--border)]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: color }}
                >
                  {initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[color:var(--text-primary)]">{name}</div>
                  <div className="text-xs text-[color:var(--text-muted)]">{title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
