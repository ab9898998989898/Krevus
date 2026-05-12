'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { useGsapNavScroll } from '@/hooks/useGsapNavScroll'

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Only apply scroll animation to premium pages
  const isBriqly = pathname === '/briqly'
  const isPremium = !isBriqly

  // Conditional hook call handled internally in hook, but here we can just pass ref
  useGsapNavScroll(isPremium ? headerRef : { current: null })

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'About', href: '/about' },
  ]

  const Logo = () => (
    <Link href="/" className="font-bold text-2xl font-[family-name:var(--font-heading)] text-[color:var(--text-primary)] flex items-center relative z-50">
      KREVUS
      {isBriqly && <span className="ml-3 text-sm text-[color:var(--smb-accent)] uppercase tracking-widest font-bold">SMB Services</span>}
    </Link>
  )

  return (
    <>
      <header 
        ref={headerRef} 
        className={`fixed top-0 left-0 right-0 z-40 h-[72px] flex items-center transition-colors duration-300 ${isBriqly ? 'bg-white border-b border-[color:var(--border)] briqly-theme' : 'bg-transparent'}`}
      >
        <div className="container w-full flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          {isPremium && (
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href) && link.href !== '/'
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${isActive ? 'text-[color:var(--text-primary)]' : 'text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]'}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          )}

          <div className="hidden md:block">
            {isPremium ? (
              <Button variant="primary" size="sm" href="/contact">Book a Call</Button>
            ) : (
              <Button variant="amber" size="sm" href="#briqly-contact">Get Started</Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 -mr-2 relative z-50 ${isBriqly ? 'text-[color:var(--text-primary)]' : 'text-[color:var(--text-primary)]'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-30 ${isBriqly ? 'bg-white text-[color:var(--text-primary)] briqly-theme' : 'bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]'} flex flex-col pt-[72px] px-6 pb-6`}>
          {isPremium && (
            <nav className="flex flex-col space-y-8 items-center flex-grow pt-16">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="text-2xl font-bold font-[family-name:var(--font-heading)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="mt-auto pt-8 pb-4">
            {isPremium ? (
              <Button variant="primary" className="w-full" size="lg" href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Book a Call</Button>
            ) : (
              <Button variant="amber" className="w-full" size="lg" href="#briqly-contact" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
