import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ServiceDetail } from '@/components/sections/ServiceDetail'
import { LayoutDashboard, Bot, Code, ArrowRight } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { CapabilitiesGrid } from './CapabilitiesGrid'

export const metadata = {
  title: 'Services — Secure Portals, AI Automation & Dashboards | Krevus',
  description: 'We replace manual workflows with secure, automated systems that run your firm 24/7.',
}



function ServicesCTA() {
  return (
    <section className="py-24 bg-[color:var(--bg-subtle)] border-t border-[color:var(--border)] text-center">
      <div className="container max-w-2xl mx-auto">
        <div className="text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-6">READY TO START?</div>
        <h2 className="text-h2 mb-6">Every project starts with a discovery call.</h2>
        <p className="text-lg text-[color:var(--text-muted)] mb-10">
          No commitment. No pitch deck. Just 30 minutes to understand your problem and see if we&apos;re the right fit.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-8 py-4 bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-hover)] transition-colors">
            Book a Discovery Call <ArrowRight size={16} />
          </Link>
          <Link href="/case-studies" className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-8 py-4 border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-[color:var(--border-accent)] transition-colors">
            See Our Work
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-[72px]">
        {/* Hero */}
        <section className="py-24 md:py-32 hero-bg relative border-b border-[color:var(--border)] overflow-hidden">
          <div className="gradient-mesh pointer-events-none absolute inset-0">
            <div className="gradient-orb gradient-orb-1" />
            <div className="gradient-orb gradient-orb-2" />
          </div>
          <div className="container relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-block text-[color:var(--accent)] font-bold tracking-widest uppercase text-xs mb-6 border border-[color:var(--border-accent)] px-4 py-1.5 rounded-full">
              Services
            </div>
            <h1 className="text-hero text-[color:var(--text-primary)] mb-8 tracking-tight font-bold font-[family-name:var(--font-heading)] leading-[1.05]">
              Digital Infrastructure<br />Built for Scale
            </h1>
            <p className="text-xl text-[color:var(--text-body)] mb-12 max-w-2xl mx-auto">
              We specialize in replacing manual, unsecured workflows with custom software systems that increase capacity and compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Secure Portals', 'AI Automation', 'Custom Dashboards', 'API Integrations'].map((tag) => (
                <span key={tag} className="text-xs font-semibold px-4 py-2 rounded-full border border-[color:var(--border)] text-[color:var(--text-muted)]">{tag}</span>
              ))}
            </div>
          </div>
          <div className="noise-overlay" />
        </section>

        <ServiceDetail
          id="portals"
          icon={<LayoutDashboard />}
          title="Secure Client Portals"
          whatItIs="Encrypted client portals replacing email attachments for tax/CPA firms. Clients upload, review, and sign documents in one place — no PDF attachments, no compliance exposure."
          whoFor="Tax firms, CPA practices, accounting companies handling sensitive financial documents."
          deliverables={[
            'Client upload portal with role-based access',
            'Admin dashboard with full audit trail',
            'Automated email/SMS notifications',
            'E-signature integration',
            'HIPAA-aligned data handling',
          ]}
          result="Onboarding from 3 days to 20 minutes"
          align="left"
        />

        <ServiceDetail
          id="automation"
          icon={<Bot />}
          title="AI & Automation"
          whatItIs="Calling agents, chat agents, intake bots, and front desk automation that work 24/7 without additional headcount. Built on GPT-4 with full CRM integration."
          whoFor="All industries needing 24/7 lead capture and qualification without hiring additional staff."
          deliverables={[
            'AI intake & qualification bot',
            'Inbound/outbound calling agent',
            'Appointment booking automation',
            'CRM sync (HubSpot, Salesforce)',
            'Lead scoring & routing',
          ]}
          result="37% increase in qualified leads captured"
          align="right"
        />

        <ServiceDetail
          id="software"
          icon={<Code />}
          title="Custom Software & Dashboards"
          whatItIs="Finance dashboards, data connection infrastructure, and real estate portals. We replace spreadsheets and disconnected tools with unified, real-time systems your whole team can use."
          whoFor="Fintech (analytics dashboards), Real estate (client portals, MLS integrations), Operations-heavy businesses."
          deliverables={[
            'Real-time analytics dashboard',
            'Third-party API integrations',
            'Data pipeline & sync infrastructure',
            'Role-based access control',
            'Client-facing reporting portal',
          ]}
          result="4× faster decision making vs. spreadsheets"
          align="left"
        />

        <CapabilitiesGrid />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  )
}
