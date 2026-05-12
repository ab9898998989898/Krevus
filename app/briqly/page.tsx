'use client'
import React, { useRef, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BriqlyContactForm } from '@/components/forms/BriqlyContactForm'
import { PricingCard } from '@/components/ui/PricingCard'
import { BriqlyWhatSiteDoesSection } from '@/components/sections/BriqlyWhatSiteDoesSection'
import { BriqlyHorizontalShowcase } from '@/components/sections/BriqlyHorizontalShowcase'
import { BriqlyGuaranteeSection } from '@/components/sections/BriqlyGuaranteeSection'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { Check, ChevronDown, ChevronUp, Star, Zap, Clock, Shield } from 'lucide-react'


const testimonials = [
  {
    quote: "I had a new site up in 5 days. My old Wix site looked like it was from 2009. Now my clients actually compliment me on how professional we look.",
    name: "Maria Chen",
    business: "Chen Family Dental",
    city: "Chicago, IL",
    rating: 5,
  },
  {
    quote: "Fixed price, fast delivery, no surprises. I've worked with 3 agencies before and they all went over budget. Briqly delivered exactly what was promised.",
    name: "Tom Kowalski",
    business: "Kowalski Roofing",
    city: "Austin, TX",
    rating: 5,
  },
  {
    quote: "My restaurant needed a site fast for a big event. They had it live in 4 days. Online reservations went up immediately. Worth every dollar.",
    name: "Rosa Delgado",
    business: "Delgado's Kitchen",
    city: "Miami, FL",
    rating: 5,
  },
]

const faqs = [
  {
    q: 'Do I need to provide my own content?',
    a: "We'll send you a simple intake form asking for your logo, photos, and key information. If you don't have professional photos, we can source stock photography that matches your brand.",
  },
  {
    q: 'What happens after the 7 days?',
    a: "You own the site completely. We host it for the first year free, then it's $15/month after that. You can request changes or additions at any time with transparent per-hour rates.",
  },
  {
    q: 'Can I update the site myself after launch?',
    a: "Yes. The Standard Site and E-commerce tiers include a CMS (content management system) that lets you update text, photos, and products without any coding.",
  },
  {
    q: 'What if I need more pages than the package includes?',
    a: "We can add additional pages at $75/page. Just let us know in your intake form and we'll scope it before starting.",
  },
  {
    q: 'Do you offer refunds?',
    a: "We offer a 100% refund if we miss our delivery deadline. We've never had to issue one — but the guarantee exists because we stand behind our timelines.",
  },
]

const perks = [
  { icon: Zap, label: '7-day delivery', sub: 'Or your money back' },
  { icon: Clock, label: 'Fixed pricing', sub: 'No surprise invoices' },
  { icon: Shield, label: '100% owned by you', sub: 'No lock-in contracts' },
  { icon: Check, label: 'Mobile-first design', sub: 'Works on every device' },
]

function TestimonialsRow() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cards = ref.current?.querySelectorAll<HTMLElement>('.briqly-tcard')
    if (!cards || cards.length === 0) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    gsap.set(cards, { opacity: 0, y: 40 })
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      once: true,
      onEnter: () => gsap.to(cards, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' }),
    })
  }, [])

  return (
    <section className="py-24 bg-[color:var(--bg-subtle)] border-b border-[color:var(--border)]">
      <div className="container">
        <div className="text-center mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--amber)] mb-4">CLIENT STORIES</div>
          <h2 className="text-h2 text-[color:var(--text-primary)] mb-4">Small businesses. Real results.</h2>
          <p className="text-lg text-[color:var(--text-body)] max-w-xl mx-auto">
            Every Briqly client was overdue for a modern website. Here&apos;s what happened after launch.
          </p>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, business, city, rating }, i) => (
            <div key={i} className="briqly-tcard bg-white border border-[color:var(--border)] rounded-2xl p-8 shadow-sm group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-[color:var(--amber)] text-[color:var(--amber)]" />
                ))}
              </div>
              <p className="italic text-[color:var(--text-body)] text-base leading-relaxed mb-6">&ldquo;{quote}&rdquo;</p>
              <div className="border-t border-[color:var(--border)] pt-5">
                <div className="font-semibold text-sm text-[color:var(--text-primary)]">{name}</div>
                <div className="text-xs text-[color:var(--text-muted)]">{business} · {city}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const [open, setOpen] = React.useState<number | null>(null)
  return (
    <section className="py-24 bg-white border-b border-[color:var(--border)]">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--amber)] mb-4">FAQ</div>
          <h2 className="text-h2 text-[color:var(--text-primary)] mb-4">Common questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="border border-[color:var(--border)] rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-[color:var(--bg-subtle)] hover:bg-[color:var(--bg-card)] transition-colors duration-200"
              >
                <span className="text-sm font-semibold text-[color:var(--text-primary)] pr-4">{q}</span>
                {open === i
                  ? <ChevronUp size={18} className="text-[color:var(--amber)] shrink-0" />
                  : <ChevronDown size={18} className="text-[color:var(--text-muted)] shrink-0" />
                }
              </button>
              {open === i && (
                <div className="px-6 pb-6 pt-2 bg-white">
                  <p className="text-sm text-[color:var(--text-body)] leading-relaxed">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function BriqlyPage() {
  const perksRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const items = perksRef.current?.querySelectorAll<HTMLElement>('.perk-item')
    if (!items || items.length === 0) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    gsap.set(items, { opacity: 0, y: 20 })
    ScrollTrigger.create({
      trigger: perksRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(items, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }),
    })
  }, [])

  return (
    <div className="briqly-theme bg-[color:var(--bg-primary)] min-h-screen font-[family-name:var(--font-body)] text-[color:var(--text-body)]">
      <Header />
      <main className="flex flex-col pt-[72px]">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden bg-[color:var(--bg-subtle)] border-b border-[color:var(--border)]">
          {/* Warm glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(240,165,0,0.06) 0%, transparent 70%)' }} />

          <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="inline-block bg-[color:var(--smb-accent)] text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full mb-6 shadow-sm">
                SMB Services by Krevus
              </div>
              <h1 className="text-hero text-[color:var(--text-primary)] mb-6 tracking-tight font-bold font-[family-name:var(--font-heading)] leading-[1.05]">
                Enterprise-Grade Websites for Local Businesses.
              </h1>
              <p className="text-xl text-[color:var(--text-body)] mb-8 max-w-lg">
                Stop overpaying agencies for basic websites. We bring our enterprise development speed to clinics, contractors, and restaurants — with transparent, fixed pricing.
              </p>

              {/* Perks strip */}
              <div ref={perksRef} className="grid grid-cols-2 gap-3 mb-10">
                {perks.map(({ icon: Icon, label, sub }, i) => (
                  <div key={i} className="perk-item flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[color:var(--border)] shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-[color:var(--amber-dim)] flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-[color:var(--amber)]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[color:var(--text-primary)]">{label}</div>
                      <div className="text-[10px] text-[color:var(--text-muted)]">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#briqly-contact" className="inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-200 cursor-pointer text-btn px-9 py-4 bg-[color:var(--amber)] text-white hover:bg-[color:var(--amber-hover)] active:scale-95 shadow-md">
                  View Packages & Pricing
                </a>
                <a href="#upgrade" className="inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-200 cursor-pointer text-btn px-9 py-4 border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-[color:var(--amber)]/40">
                  See Results
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--amber)]/20 to-[color:var(--amber)]/5 rounded-2xl transform rotate-3 scale-105" />
              <div className="bg-white border border-[color:var(--border)] rounded-2xl p-6 shadow-xl relative z-10 transform -rotate-1 aspect-[4/3] flex flex-col">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="bg-[color:var(--bg-subtle)] text-xs text-[color:var(--text-muted)] py-1.5 px-3 rounded flex-grow font-mono text-center border border-[color:var(--border)]">
                    yourbusiness.com
                  </div>
                </div>
                <div className="space-y-4 flex-grow flex flex-col">
                  <div className="flex-grow bg-[color:var(--bg-subtle)] rounded-lg w-full flex items-center justify-center overflow-hidden border border-[color:var(--border)] relative">
                    <img src="/images/briqly_dashboard.png" alt="Briqly Dashboard" className="object-cover w-full h-full absolute inset-0" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 h-24">
                    <div className="bg-[color:var(--bg-subtle)] rounded-lg w-full border border-[color:var(--border)] overflow-hidden relative"><img src="/images/before_after_dental.png" className="object-cover w-full h-full absolute inset-0 opacity-80" alt="Dental" /></div>
                    <div className="bg-[color:var(--bg-subtle)] rounded-lg w-full border border-[color:var(--border)] overflow-hidden relative"><img src="/images/before_after_roofing.png" className="object-cover w-full h-full absolute inset-0 opacity-80" alt="Roofing" /></div>
                    <div className="bg-[color:var(--bg-subtle)] rounded-lg w-full border border-[color:var(--border)] flex items-center justify-center font-bold text-[color:var(--amber)] text-lg">+42%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-white border-b border-[color:var(--border)]">
          <div className="container">
            <div className="text-center mb-16">
              <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--amber)] mb-4">THE PROCESS</div>
              <h2 className="text-h2 text-[color:var(--text-primary)] mb-4">3 steps. 7 days. Live site.</h2>
              <p className="text-lg text-[color:var(--text-body)] max-w-2xl mx-auto">
                We&apos;ve done this dozens of times. The process is fast because it&apos;s been refined to cut out every unnecessary step.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-[2px] bg-[color:var(--border)] z-0" />
              {[
                { n: 1, title: 'Choose Package', desc: 'Select the tier that fits your needs and submit your business information.' },
                { n: 2, title: 'Send Your Details', desc: 'We send a simple intake form to collect your logo, photos, and any copy you have.' },
                { n: 3, title: 'Launch in 7 Days', desc: 'We design, build, and deploy your site on a custom domain. You review and approve before launch.' },
              ].map(({ n, title, desc }) => (
                <div key={n} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[color:var(--amber-dim)] border-2 border-[color:var(--amber)] flex items-center justify-center mb-6 shrink-0">
                    <span className="font-bold text-[color:var(--amber)] text-lg font-[family-name:var(--font-heading)]">0{n}</span>
                  </div>
                  <h3 className="text-h4 text-[color:var(--text-primary)] mb-3">{title}</h3>
                  <p className="text-sm text-[color:var(--text-body)] max-w-[220px] mx-auto leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Your Site Does */}
        <BriqlyWhatSiteDoesSection />

        {/* Pricing Section */}
        <section className="py-24 bg-[color:var(--bg-subtle)] border-b border-[color:var(--border)]">
          <div className="container">
            <div className="text-center mb-16">
              <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--amber)] mb-4">PRICING</div>
              <h2 className="text-h2 text-[color:var(--text-primary)] mb-4">Transparent Pricing</h2>
              <p className="text-lg text-[color:var(--text-body)] max-w-2xl mx-auto">
                No hidden fees. No ongoing agency retainers. No surprises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                name="Landing Page"
                price="$400"
                deliveryDays={4}
                features={[
                  'Single page design',
                  'Contact form integration',
                  'Mobile responsive',
                  'Basic SEO setup',
                  '1 revision round',
                ]}
                ctaHref="#briqly-contact"
              />
              <PricingCard
                name="Standard Site"
                price="$900"
                deliveryDays={7}
                isPopular={true}
                features={[
                  'Up to 5 pages',
                  'Contact form integration',
                  'Mobile responsive',
                  'Advanced SEO setup',
                  'Content management system',
                  '2 revision rounds',
                ]}
                ctaHref="#briqly-contact"
              />
              <PricingCard
                name="E-commerce"
                price="$1,500"
                deliveryDays={14}
                features={[
                  'Up to 10 pages',
                  'Payment gateway setup',
                  'Up to 50 products',
                  'Inventory management',
                  'Advanced SEO setup',
                  '3 revision rounds',
                ]}
                ctaHref="#briqly-contact"
              />
            </div>

            {/* Trust note */}
            <div className="mt-10 text-center">
              <p className="text-sm text-[color:var(--text-muted)]">
                All packages include 12 months free hosting · SSL certificate · Google Analytics · Sitemap
              </p>
            </div>
          </div>
        </section>

        {/* Guarantee Block */}
        <BriqlyGuaranteeSection />

        {/* Before & After */}
        <div id="upgrade">
          <BriqlyHorizontalShowcase />
        </div>

        {/* Testimonials */}
        <TestimonialsRow />

        {/* FAQ */}
        <FaqSection />

        {/* Contact Section */}
        <section id="briqly-contact" className="py-24 bg-[color:var(--amber-dim)] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[color:var(--bg-subtle)]" />
          <div className="container relative z-10 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--amber)] mb-4">GET STARTED</div>
              <h2 className="text-h2 text-[color:var(--text-primary)] mb-4">Ready to upgrade?</h2>
              <p className="text-lg text-[color:var(--text-body)]">Fill out the form below and we&apos;ll get back to you within 24 hours with a quote and timeline.</p>
            </div>
            <BriqlyContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
