# Krevus — Components Map

> Build components in the order listed. A component marked **[BEFORE PAGES]** must exist before any page is built.

---

## Component Tree Overview

```
app/
├── layout.tsx                    # Root — fonts, GSAP init, WhatsApp btn (briqly only)
│
├── page.tsx (/)                  # Homepage
│   ├── sections/Hero
│   ├── sections/ServicesStrip
│   ├── sections/IndustriesBlock
│   ├── sections/StatsSection
│   ├── sections/FeaturedCaseStudy
│   └── sections/BriqlyCTABanner
│
├── services/page.tsx
│   └── sections/ServiceDetail (×3)
│
├── industries/
│   ├── page.tsx                  # Industries overview
│   └── [slug]/page.tsx           # tax-firms | fintech | real-estate
│       └── sections/IndustryPage
│
├── case-studies/
│   ├── page.tsx                  # Grid
│   └── [slug]/page.tsx           # MDX detail
│
├── contact/page.tsx
│   ├── CalendlyEmbed
│   └── forms/ContactForm
│
├── briqly/page.tsx               # Full SMB section — light theme
│   ├── sections/BriqlyHero
│   ├── sections/PricingSection
│   ├── sections/BeforeAfterSection
│   ├── sections/HowItWorks
│   ├── sections/IndustriesGrid
│   └── forms/BriqlyContactForm
│
└── about/page.tsx
```

---

## 1. Primitive UI Components [BEFORE PAGES]

Build these first. They are used across every page.

---

### `components/ui/Button.tsx`

```typescript
interface ButtonProps {
  variant: 'primary' | 'outline' | 'ghost' | 'amber'
  size?: 'sm' | 'md' | 'lg'
  href?: string              // renders as <a> if provided
  onClick?: () => void
  children: React.ReactNode
  className?: string
  magnetic?: boolean         // applies useGsapMagneticButton if true
}
```

**Styles:**
```
primary:  bg-[--accent] text-white hover handled by GSAP
outline:  border border-[--accent] text-[--accent] bg-transparent
ghost:    text-[--accent] no border, underline on hover
amber:    bg-[--smb-accent] text-white — SMB pages only
```

**Size:**
```
sm: px-4 py-2 text-sm
md: px-7 py-3.5 text-[15px]  ← default
lg: px-9 py-4 text-base
```

**Rules:**
- Always `rounded-md` (6px) — never `rounded-full`
- `magnetic` prop triggers `useGsapMagneticButton` via `useRef` internally
- If `href` prop: render as Next.js `<Link>` not `<a>`

---

### `components/ui/ServiceCard.tsx`

```typescript
interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}
```

**Structure:**
```
<div> // card container — useGsapCardHover applied here
  <div> // left accent border — 3px solid var(--accent)
  <div> // icon wrapper — bg var(--accent-dim), rounded-lg, p-3
  <LucideIcon />
  <h3> // title — Space Grotesk 22px/600
  <p>  // description — DM Sans 16px
  <Link> // "Learn more →" ghost style
```

---

### `components/ui/IndustryCard.tsx`

```typescript
interface IndustryCardProps {
  icon: LucideIcon
  name: string
  description: string
  href: string
}
```

**Structure:**
```
<Link> // full card is clickable
  <div> // card — useGsapCardHover
  <div> // icon wrapper — accent bg, rounded
  <h3>  // name
  <p>   // description
  <ArrowRight /> // icon — GSAP: x: 0→4 on card hover
```

---

### `components/ui/CaseStudyCard.tsx`

```typescript
interface CaseStudyCardProps {
  industry: 'tax-firms' | 'fintech' | 'real-estate'
  headline: string
  result: string
  href: string
  isDemo?: boolean           // shows "Concept Project" badge if true
}
```

**Structure:**
```
<Link>
  <div> // card — useGsapCardHover
  <IndustryTag industry={industry} /> // top-left
  {isDemo && <DemoBadge />}          // amber "Concept Project"
  <h3>  // headline
  <p>   // result — prefixed with icon
  <span>// "Read case study →"
```

---

### `components/ui/IndustryTag.tsx`

```typescript
interface IndustryTagProps {
  industry: 'tax-firms' | 'fintech' | 'real-estate'
}
// Maps to: "Tax & CPA" | "Fintech" | "Real Estate"
```

**Style:**
```
bg-[--accent-dim] text-[--accent]
rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wide
```

---

### `components/ui/PricingCard.tsx` — /briqly only

```typescript
interface PricingCardProps {
  name: string                // "Starter" | "Growth" | "Pro"
  price: string               // "$400 – $600"
  deliveryDays: number
  features: string[]
  isPopular?: boolean
  ctaHref: string
}
```

**Style (light theme):**
```
bg-white border border-[--smb-border] rounded-xl p-8
isPopular: border-2 border-[--smb-accent] shadow-lg
  + amber "Most Popular" pill badge at top
Feature list: checkmark (amber) + text
CTA: full-width amber Button
Price: Space Grotesk 36px/700
Delivery: DM Sans 14px muted
```

---

### `components/ui/BeforeAfterCard.tsx` — /briqly only

```typescript
interface BeforeAfterCardProps {
  businessType: string
  city: string
  beforeImageUrl: string
  afterImageUrl: string
  result: string
  isDemo?: boolean
}
```

**Behaviour:**
- Default state: shows "before" image
- On hover (desktop): CSS `clip-path` reveals "after" image — `transition: clip-path 0.45s ease`
- On tap (mobile): toggle reveal
- `useGsapParallax` applied to both images (desktop only, disabled < 768px)
- `isDemo`: renders amber "Concept Project" badge

---

### `components/ui/StepCard.tsx` — /briqly only

```typescript
interface StepCardProps {
  number: number
  title: string
  description: string
}
```

**Style:**
- Step number: amber circle (48px), white number, Space Grotesk 24px/700
- Connected by dashed line between steps on desktop
- Single column on mobile

---

### `components/ui/StatItem.tsx`

```typescript
interface StatItemProps {
  value: number
  suffix?: string            // "+" or "%" etc.
  label: string
}
// useGsapCounter applied internally
```

---

## 2. Layout Components [BEFORE PAGES]

---

### `components/layout/Header.tsx`

```typescript
// No props — reads pathname internally for active state
```

**Structure:**
```
<header> // position: sticky, top-0, z-50 — useGsapNavScroll
  <nav class="container">
    <Logo /> // Krevus wordmark SVG, links to /
    <NavLinks />  // Services | Industries | Case Studies | About
    <Button variant="primary" size="sm" href="/contact">Book a Call</Button>
    <MobileMenuToggle /> // hamburger — mobile only
  </nav>
  <MobileMenu /> // full-screen overlay — mobile only
```

**Nav links styling:**
- `text-[--text-muted]` default
- `text-[--text-primary]` on hover and active route
- No underline
- Active: subtle left accent indicator OR brighter text

---

### `components/layout/Footer.tsx`

```typescript
// No props
```

**Structure:**
```
<footer class="bg-[--bg-card] border-t border-[--border]">
  <div class="container">
    Row 1: Logo + tagline (left) | Nav links (right)
    Row 2: Divider
    Row 3: "© 2024 Krevus" (left) | "For small businesses: krevus.com/briqly" (right)
```

---

## 3. Section Components

---

### `components/sections/Hero.tsx`

```typescript
interface HeroProps {
  headline: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}
```

**Animation:** `useGsapHeroReveal` + `useGsapMagneticButton` on primary CTA  
**Background:** No image — subtle dot grid pattern via CSS  
**Layout:** Left-aligned text, full viewport height on desktop

---

### `components/sections/ServicesStrip.tsx`

```typescript
// Uses ServiceCard × 3
// useGsapSectionReveal on section container
// useGsapFadeIn on card grid
```

Services data (hardcoded):
```typescript
const services = [
  { icon: Lock, title: 'Secure Portals', description: '...', href: '/services#portals' },
  { icon: Bot, title: 'AI Automation', description: '...', href: '/services#automation' },
  { icon: BarChart2, title: 'Software & Dashboards', description: '...', href: '/services#software' },
]
```

---

### `components/sections/IndustriesBlock.tsx`

```typescript
// Uses IndustryCard × 3
// useGsapSectionReveal on container
// useGsapLineReveal on section heading underline
```

---

### `components/sections/StatsSection.tsx`

```typescript
// Uses StatItem × 3
// useGsapFadeIn on section
```

Default stats:
```typescript
const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 3, suffix: '', label: 'Industries Served' },
  { value: 100, suffix: '%', label: 'US Client Focus' },
]
```

---

### `components/sections/FeaturedCaseStudy.tsx`

```typescript
// Renders one CaseStudyCard in a wider layout
// Static — points to /case-studies/cpa-firm-portal
```

---

### `components/sections/BriqlyCTABanner.tsx`

```typescript
// The SMB call-out at bottom of homepage
// MUST be visually distinct — amber theme
// bg: amber-light (#FFF4D6) or white section
// text: dark (#111827)
// CTA button: amber variant
// separator: subtle top border with amber accent
```

---

### `components/sections/IndustryPage.tsx`

```typescript
interface IndustryPageProps {
  slug: 'tax-firms' | 'fintech' | 'real-estate'
  headline: string
  subheadline: string
  problems: string[]
  solutions: string[]
  services: ServiceCardProps[]
  caseStudySlug: string
}
```

---

### `components/sections/BriqlyHero.tsx`

```typescript
// Light theme hero — bg white
// useGsapHeroReveal
// H1: "A website that brings you customers. Delivered in 7 days."
// Sub: "Fixed pricing. No surprises. Starting at $400."
// CTA 1: scroll to #briqly-pricing
// CTA 2: scroll to #briqly-work
```

---

### `components/sections/PricingSection.tsx`

```typescript
// Uses PricingCard × 3
// id="briqly-pricing" — anchor for scroll CTAs
// useGsapFadeIn stagger on cards
// Must be visible without scrolling on desktop
```

---

### `components/sections/BeforeAfterSection.tsx`

```typescript
// id="briqly-work"
// Uses BeforeAfterCard × 3
// Desktop: 3-col grid
// Mobile: overflow-x-auto horizontal scroll
// useGsapFadeIn on section
```

---

### `components/sections/HowItWorks.tsx`

```typescript
// Uses StepCard × 3
// useGsapFadeIn stagger
```

---

### `components/sections/IndustriesGrid.tsx`

```typescript
// /briqly page — icons + labels grid
// 4-col grid on md+, 2-col on mobile
// Industries: Restaurants, Clinics, Salons, Contractors, Bakeries, Gyms, Retail, Any business
// Icon + label only — no description, no links
```

---

## 4. Form Components [BEFORE PAGES]

---

### `components/forms/ContactForm.tsx`

Premium contact form for `/contact` page.

```typescript
// Client component ("use client")
// Controlled with React state (no react-hook-form needed)
// Zod validation on client before submit
// POST to /api/contact
// Loading state: spinner + "Sending..."
// Success: inline green message (no redirect)
// Error: inline red message
// GSAP: useGsapFadeIn stagger on fields on mount
```

**Fields rendered in order:**
```
Full Name        → text input
Company          → text input
Email            → email input
Industry         → select dropdown
Service Interest → select dropdown
Message          → textarea (min-height: 120px)
How did you find us? → select dropdown (optional)
Submit Button    → primary variant, full width
```

---

### `components/forms/BriqlyContactForm.tsx`

SMB contact form for `/briqly` page. Light theme styles.

```typescript
// Same pattern as ContactForm but:
// - Light theme inputs (white bg, var(--smb-border))
// - Different fields: Name, Business Name, Business Type, Phone, Email, Service, Message
// - POST to /api/briqly-contact
// - Amber loading/success colors
// - id="briqly-contact" on the wrapper for anchor scroll
```

---

### `components/CalendlyEmbed.tsx`

```typescript
// "use client"
// useEffect: dynamically inject Calendly script
// Renders inline widget (not popup)
// URL from process.env.NEXT_PUBLIC_CALENDLY_URL
// Loading state: skeleton placeholder
```

```typescript
useEffect(() => {
  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  script.async = true
  document.body.appendChild(script)
  return () => document.body.removeChild(script)
}, [])
```

---

## 5. Floating Components

---

### `components/ui/WhatsAppButton.tsx`

```typescript
// "use client"
// Fixed position: bottom-6 right-6, z-50
// ONLY rendered on /briqly page — check pathname
// IntersectionObserver: hides when #briqly-contact is in viewport
// Link: https://wa.me/{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%20Krevus...
// Style: green bg (#25D366), white WhatsApp icon, "Chat with us" label
// Mobile: always visible regardless of viewport check
```

---

## 6. Data / Content Files

```
content/
└── case-studies/
    ├── cpa-firm-portal.mdx        # Tax firm secure portal demo
    └── real-estate-portal.mdx    # Real estate portal demo
```

**MDX frontmatter schema:**
```typescript
interface CaseStudyFrontmatter {
  title:      string
  client:     string        // "Harlow & Associates (Concept Project)"
  industry:   'tax-firms' | 'fintech' | 'real-estate'
  isDemo:     boolean
  challenge:  string        // 1-sentence summary
  result:     string        // 1-sentence metric result
  tech:       string[]      // tech tags
  date:       string        // YYYY-MM-DD
}
```

---

## 7. Build Checklist

### Phase 1 — Infrastructure (before any component)
- [ ] Next.js init + all dependencies installed
- [ ] Neon project created + `DATABASE_URL` in `.env.local`
- [ ] `lib/db/schema.ts` + `drizzle.config.ts` + `npx drizzle-kit push`
- [ ] `lib/gsap.ts` created + plugins registered
- [ ] All 10 GSAP hooks built in `/hooks`
- [ ] `globals.css` — all CSS variables
- [ ] `next/font` — Space Grotesk + DM Sans configured in `layout.tsx`

### Phase 2 — Primitives
- [ ] `Button.tsx` — all 4 variants
- [ ] `ServiceCard.tsx`
- [ ] `IndustryCard.tsx`
- [ ] `CaseStudyCard.tsx`
- [ ] `IndustryTag.tsx`
- [ ] `PricingCard.tsx`
- [ ] `BeforeAfterCard.tsx`
- [ ] `StepCard.tsx`
- [ ] `StatItem.tsx`

### Phase 3 — Layout
- [ ] `Header.tsx`
- [ ] `Footer.tsx`

### Phase 4 — Forms
- [ ] `ContactForm.tsx`
- [ ] `BriqlyContactForm.tsx`
- [ ] `CalendlyEmbed.tsx`
- [ ] `WhatsAppButton.tsx`

### Phase 5 — Pages (P0 first)
- [ ] Homepage `/`
- [ ] `/services`
- [ ] `/industries` + 3 sub-pages
- [ ] MDX demo case studies written
- [ ] `/case-studies` + `/case-studies/[slug]`
- [ ] `/contact` + `POST /api/contact`
- [ ] `/briqly` + `POST /api/briqly-contact`

### Phase 6 — P1 + Polish
- [ ] `/about`
- [ ] SEO metadata on all pages
- [ ] OG images
- [ ] Schema markup
- [ ] `next-sitemap` configured
- [ ] Hotjar snippet installed
- [ ] Vercel Analytics enabled
- [ ] Lighthouse audit — 90+ desktop, 85+ mobile
- [ ] Deploy to Vercel

---

## 8. Import Conventions

```typescript
// Always use path aliases — never relative ../../
import { Button } from '@/components/ui/Button'
import { db } from '@/lib/db'
import { useGsapFadeIn } from '@/hooks/useGsapFadeIn'
import { krevusEnquiries } from '@/lib/db/schema'
```

**Configure in `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```
