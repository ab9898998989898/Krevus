import React from 'react'
import { Button } from '../ui/Button'

export function BriqlyCTABanner() {
  return (
    <section className="py-24 bg-[color:var(--bg-subtle)] border-t border-[color:var(--border)] briqly-theme relative overflow-hidden">
      <div className="container relative z-10 text-center max-w-3xl mx-auto">
        <div className="inline-block bg-[color:var(--smb-accent)] text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full mb-6">
          SMB Services
        </div>
        
        <h2 className="text-h2 text-[color:var(--text-primary)] mb-6">
          Need a website for your local business? Delivered in 7 days from $400.
        </h2>
        
        <p className="text-lg text-[color:var(--text-body)] mb-10 max-w-xl mx-auto">
          We bring our enterprise-grade development to small businesses like restaurants, clinics, and contractors at fixed, transparent pricing.
        </p>

        <Button variant="amber" size="lg" href="/briqly">
          See Packages
        </Button>
      </div>
    </section>
  )
}
