import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { ServiceDetail } from '@/components/sections/ServiceDetail'
import { WhatYouGetSection } from '@/components/sections/WhatYouGetSection'
import { BarChart2, Shield } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fintech Dashboards & Compliant Architecture | Krevus',
  description: 'Blocked by slow dev cycles and compliance hurdles? Krevus builds secure fintech dashboards & API integrations in weeks, not months. Accelerate your roadmap.',
  openGraph: { 
    title: 'Fintech Dashboards & Compliant Architecture | Krevus',
    description: 'Blocked by slow dev cycles and compliance hurdles? Krevus builds secure fintech dashboards & API integrations in weeks, not months. Accelerate your roadmap.',
    url: 'https://krevus.org/industries/fintech' 
  },
}

const fintechFeatures = [
  {
    iconName: 'BarChart2',
    title: 'Finance Dashboards',
    description: "Real-time P&L, cash flow, and KPI dashboards that connect directly to your data sources. Built in weeks, not months.",
  },
  {
    iconName: 'Plug',
    title: 'Data Connection Infrastructure',
    description: "API integrations between your banking partners, payment processors, and internal systems. Clean data flowing where it needs to go.",
  },
  {
    iconName: 'Shield',
    title: 'Compliance-Ready Architecture',
    description: "Every system we build is designed with audit trails, role-based access, and data residency in mind from line one.",
  },
  {
    iconName: 'Bot',
    title: 'AI Automation Layer',
    description: "Automated reporting, anomaly detection, and client communication running 24/7 without your team lifting a finger.",
  },
]

export default function FintechPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <Hero 
          headline="Fast, Compliant Infrastructure for Fintech"
          subheadline="We build secure dashboards, API integrations, and robust web applications for financial technology companies looking to scale quickly."
          primaryCta={{ label: 'Discuss Your Project', href: process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact' }}
          secondaryCta={{ label: 'View Services', href: '/services' }}
        />
        
        <ServiceDetail 
          id="dashboards"
          icon={<BarChart2 />}
          title="Financial Dashboards"
          whatItIs="Real-time data visualization interfaces that connect to your core banking or payment APIs."
          whoFor="B2B fintech platforms and financial data aggregators."
          deliverables={[
            "Real-time chart integration",
            "Complex data grids",
            "Role-based access control",
            "Export/Reporting modules"
          ]}
          align="left"
        />

        <ServiceDetail 
          id="security"
          icon={<Shield />}
          title="Compliant Architecture"
          whatItIs="Cloud-native infrastructure designed to meet strict financial regulatory standards from day one."
          whoFor="Startups entering the financial space requiring immediate trust and security."
          deliverables={[
            "End-to-end encryption",
            "VPC configuration",
            "Audit logging",
            "Pen-test ready code"
          ]}
          align="right"
        />

        <WhatYouGetSection
          heading="What we build for fintech teams."
          features={fintechFeatures}
        />
      </main>
      <Footer />
    </>
  )
}
