import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[color:var(--bg-card)] border-t border-[color:var(--border)] pt-16 pb-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="font-bold text-2xl font-[family-name:var(--font-heading)] text-[color:var(--text-primary)] block mb-2">
              KREVUS
            </Link>
            <p className="text-sm text-[color:var(--text-muted)] max-w-xs">
              Secure portals, AI automation, and digital infrastructure for enterprise clients.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-4 md:flex md:gap-8">
            <Link href="/services" className="text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors">Services</Link>
            <Link href="/industries" className="text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors">Industries</Link>
            <Link href="/case-studies" className="text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors">Case Studies</Link>
            <Link href="/about" className="text-sm text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors">About</Link>
          </nav>
        </div>

        <div className="h-px w-full bg-white/5 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-[color:var(--text-faint)]">
          <p>© {new Date().getFullYear()} Krevus. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <Link href="/briqly" className="text-[color:var(--accent)] hover:text-white transition-colors font-medium">
              For small businesses: krevus.org/briqly
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
