import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { ServiceDetail } from '@/components/sections/ServiceDetail'
import { WhatYouGetSection } from '@/components/sections/WhatYouGetSection'
import { Home, MessageSquare } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Lead Capture & Property Portals for Real Estate | Krevus',
  description: 'Losing high-value leads after hours? Krevus builds 24/7 AI lead qualification agents and exclusive property portals for top brokerages. See how we automate.',
  openGraph: { 
    title: 'AI Lead Capture & Property Portals for Real Estate | Krevus',
    description: 'Losing high-value leads after hours? Krevus builds 24/7 AI lead qualification agents and exclusive property portals for top brokerages. See how we automate.',
    url: 'https://krevus.org/industries/real-estate' 
  },
}

const realEstateFeatures = [
  {
    iconName: 'Home',
    title: 'Real-Time Property Portal',
    description: "Clients log in and see live updates on their listings, offers, documents, and next steps. No more 'what's the status?' calls.",
  },
  {
    iconName: 'Bot',
    title: 'AI Lead Qualification',
    description: "Every inbound lead is contacted, qualified, and scheduled within 2 minutes — whether it's 2pm or 2am.",
  },
  {
    iconName: 'FileText',
    title: 'Document Management',
    description: "Contracts, disclosures, and agreements handled in one place. E-signature ready. Compliance built in.",
  },
  {
    iconName: 'LayoutDashboard',
    title: 'Team Dashboard',
    description: "Your entire team's pipeline, appointments, and client communications visible in one place. No spreadsheets.",
  },
]

export default function RealEstatePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <Hero 
          headline="AI Lead Capture & Property Portals"
          subheadline="Modernize your real estate brokerage with AI agents that qualify leads 24/7 and custom property portals for high-net-worth clients."
          primaryCta={{ label: 'Book a Strategy Call', href: process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact' }}
          secondaryCta={{ label: 'View Case Studies', href: '/case-studies' }}
        />
        
        <ServiceDetail 
          id="lead-capture"
          icon={<MessageSquare />}
          title="24/7 AI Lead Qualification"
          whatItIs="An AI voice and chat agent trained on your inventory to answer buyer questions and schedule showings instantly."
          whoFor="High-volume brokerages losing leads during off-hours."
          deliverables={[
            "Voice AI answering service",
            "Website chat agent",
            "Automatic CRM data entry",
            "Showing scheduling integration"
          ]}
          result="Lead response time drops from hours to 2 seconds"
          align="left"
        />

        <ServiceDetail 
          id="portals"
          icon={<Home />}
          title="Exclusive Property Portals"
          whatItIs="Private, password-protected web portals for off-market listings or high-net-worth buyers."
          whoFor="Luxury brokerages and commercial real estate firms."
          deliverables={[
            "Private listing dashboard",
            "Secure document sharing (NDAs, financials)",
            "High-res media galleries",
            "Analytics on buyer engagement"
          ]}
          align="right"
        />

        <WhatYouGetSection
          heading="What your competitors are already using."
          features={realEstateFeatures}
        />
      </main>
      <Footer />
    </>
  )
}
