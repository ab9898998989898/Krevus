import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { ServiceDetail } from '@/components/sections/ServiceDetail'
import { WhatYouGetSection } from '@/components/sections/WhatYouGetSection'
import { FeaturedCaseStudy } from '@/components/sections/FeaturedCaseStudy'
import { Lock, Bot } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure Portals & AI Automation for CPA Firms | Krevus',
  description: 'Risking firm compliance with email attachments? Krevus builds IRS-compliant secure client portals and AI intake systems for CPA firms. Book your strategy call.',
  openGraph: { 
    title: 'Secure Portals & AI Automation for CPA Firms | Krevus',
    description: 'Risking firm compliance with email attachments? Krevus builds IRS-compliant secure client portals and AI intake systems for CPA firms. Book your strategy call.',
    url: 'https://krevus.org/industries/tax-firms' 
  },
}

const taxFeatures = [
  {
    iconName: 'Upload',
    title: 'Encrypted Upload Portal',
    description: "Clients upload documents directly to a secure portal.\nAES-256 encryption. No email. No USB drives. No risk.",
  },
  {
    iconName: 'LayoutDashboard',
    title: 'Admin Dashboard',
    description: "Your team sees every document the moment it arrives.\nFilter by client, status, and date. Full audit trail built in.",
  },
  {
    iconName: 'Bell',
    title: 'Client Notifications',
    description: "Automatic email confirmations when documents are received, reviewed, and completed. No more client emails asking 'did you get it?'",
  },
  {
    iconName: 'Palette',
    title: 'Custom Branding',
    description: "Your logo, your colors, your domain. Clients never know what technology runs underneath — they just see your firm.",
  },
]

export default function TaxFirmsPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <Hero 
          headline="Secure Portals & Automation for Tax Firms"
          subheadline="Replace unsecure email chains with encrypted client portals and automate your intake process so your partners can focus on billable work."
          primaryCta={{ label: 'Book a Consultation', href: process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact' }}
          secondaryCta={{ label: 'See Tax Case Study', href: '/case-studies/cpa-firm-portal' }}
        />
        
        <ServiceDetail 
          id="portals"
          icon={<Lock />}
          title="Secure Document Portals"
          whatItIs="A custom, branded portal where clients can securely upload tax documents, sign forms, and communicate."
          whoFor="Tax firms and CPA practices handling sensitive financial data."
          deliverables={[
            "Secure document vault",
            "E-signature integration",
            "Client task lists",
            "Bank-level encryption"
          ]}
          result="Eliminates 100% of unsecure email attachments"
          align="left"
        />

        <ServiceDetail 
          id="automation"
          icon={<Bot />}
          title="AI Automation Systems"
          whatItIs="AI-driven workflows that qualify leads and collect initial documentation before a partner ever gets on a call."
          whoFor="Growing firms overwhelmed with unqualified leads during tax season."
          deliverables={[
            "AI intake chatbot",
            "Automated document requests",
            "CRM integration",
            "Partner calendar routing"
          ]}
          align="right"
        />

        <WhatYouGetSection
          heading="Everything your clients need. Nothing they don't."
          features={taxFeatures}
        />

        <FeaturedCaseStudy />
      </main>
      <Footer />
    </>
  )
}
