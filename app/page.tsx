import { Hero } from '@/components/sections/Hero'
import { ServicesStrip } from '@/components/sections/ServicesStrip'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { IndustriesBlock } from '@/components/sections/IndustriesBlock'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { Gallery } from '@/components/sections/Gallery'
import { StatsSection } from '@/components/sections/StatsSection'
import { FeaturedCaseStudy } from '@/components/sections/FeaturedCaseStudy'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { WhyKrevusSection } from '@/components/sections/WhyKrevusSection'
import { BriqlyCTABanner } from '@/components/sections/BriqlyCTABanner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <Hero
          headline="Your firm is losing clients to slow processes. We fix that."
          subheadline="Krevus builds secure portals, AI automation, and digital infrastructure for tax firms, fintech companies, and real estate businesses."
          primaryCta={{ label: 'Book a Discovery Call', href: process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact' }}
          secondaryCta={{ label: 'See Our Work', href: '/case-studies' }}
          imageUrl="/images/hero_dashboard.png"
        />
        <ServicesStrip />
        <TechMarquee />
        <ProblemSection />
        <IndustriesBlock />
        <HowItWorksSection />
        <Gallery />
        <StatsSection />
        <FeaturedCaseStudy />
        <TestimonialsSection />
        <WhyKrevusSection />
        <BriqlyCTABanner />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Krevus",
            "url": "https://krevus.org",
            "logo": "https://krevus.org/krevus-logo.png",
            "description": "B2B software agency building secure client portals, AI automation, and digital infrastructure for tax firms, fintech companies, and real estate businesses.",
            "sameAs": ["https://www.linkedin.com/company/krevus"],
            "areaServed": { "@type": "Country", "name": "US" },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "3"
            }
          })
        }}
      />
    </>
  )
}
