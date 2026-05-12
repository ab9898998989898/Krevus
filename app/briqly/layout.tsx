import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Briqly SMB Services | Fixed Price Websites by Krevus',
  description: 'Enterprise-grade development for small businesses. Delivered in 7 days from $400.',
  openGraph: { url: 'https://krevus.org/briqly' },
}

export default function BriqlyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
