import React from 'react'
import { Check } from 'lucide-react'
import { Button } from './Button'

interface PricingCardProps {
  name: string
  price: string
  deliveryDays: number
  features: string[]
  isPopular?: boolean
  ctaHref: string
}

export function PricingCard({ name, price, deliveryDays, features, isPopular, ctaHref }: PricingCardProps) {
  return (
    <div className={`relative flex flex-col bg-white border ${isPopular ? 'border-2 border-[color:var(--smb-accent)] shadow-xl' : 'border-[color:var(--border)]'} rounded-xl p-8 h-full`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[color:var(--smb-accent)] text-black text-md font-extrabold uppercase tracking-wider py-2 px-3 rounded-full">
          Most Popular
        </div>
      )}
      
      <h3 className="text-h3 text-[color:var(--text-primary)] mb-2">{name}</h3>
      <div className="text-[36px] leading-[1] font-bold font-[family-name:var(--font-heading)] text-[color:var(--text-primary)] mb-2">
        {price}
      </div>
      <p className="text-sm text-[color:var(--text-muted)] mb-8">
        Delivered in {deliveryDays} days
      </p>

      <div className="space-y-4 mb-8 flex-grow">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start">
            <Check size={20} className="text-[color:var(--smb-accent)] mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-base text-[color:var(--text-body)]">{feature}</span>
          </div>
        ))}
      </div>

      <Button variant="amber" href={ctaHref} className="w-full mt-auto">
        Get Started
      </Button>
    </div>
  )
}
