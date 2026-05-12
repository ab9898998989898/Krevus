import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata = {
  title: 'Contact Us | Krevus',
  description: 'Request a proposal or book a discovery call to discuss your enterprise digital infrastructure needs.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-[72px]">
        <section className="py-24 hero-bg relative border-b border-[color:var(--border)]">
          <div className="container relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-hero text-[color:var(--text-primary)] mb-6 tracking-tight font-bold font-[family-name:var(--font-heading)] leading-[1.05]">
              Let's Build Your Infrastructure
            </h1>
            <p className="text-xl text-[color:var(--text-body)] max-w-2xl mx-auto">
              Tell us about your current bottlenecks, and we'll design a custom system to eliminate them.
            </p>
          </div>
          <div className="noise-overlay" />
        </section>

        <section className="py-24 bg-[color:var(--bg-primary)]">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-h2 mb-6 text-[color:var(--text-primary)]">Book a Discovery Call</h2>
                <p className="text-lg text-[color:var(--text-body)] mb-8">
                  Schedule a 30-minute consultation with a partner. We'll discuss your current tech stack, operational bottlenecks, and determine if Krevus is the right fit to build your solution.
                </p>
                
                <div className="bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-xl overflow-hidden h-[600px] relative">
                  <iframe 
                    src={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com'} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    title="Schedule a Call"
                  />
                </div>
              </div>
              
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
