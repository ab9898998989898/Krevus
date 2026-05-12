'use client'

import React from 'react'

const tools = [
  'Next.js', 'TypeScript', 'PostgreSQL', 'OpenAI', 'Stripe', 'Vercel',
  'Supabase', 'Drizzle ORM', 'Resend', 'Plaid', 'Twilio', 'AWS S3',
  'Zapier', 'HubSpot', 'Salesforce', 'DocuSign',
]

export function TechMarquee() {
  // Duplicate for seamless loop
  const items = [...tools, ...tools]

  return (
    <section className="py-14 bg-[color:var(--bg-card)] border-y border-[color:var(--border)] overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, var(--bg-card), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, var(--bg-card), transparent)' }} />

      <div className="flex items-center mb-6 container">
        <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--text-faint)]">
          Integrated with tools your team already uses
        </span>
      </div>

      <div className="marquee-track flex gap-8 whitespace-nowrap" style={{ animation: 'marqueeScroll 30s linear infinite' }}>
        {items.map((tool, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)] text-sm font-medium text-[color:var(--text-muted)] shrink-0 hover:text-[color:var(--text-primary)] hover:border-[color:var(--border-accent)] transition-colors duration-200 cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent)] opacity-60" />
            {tool}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
