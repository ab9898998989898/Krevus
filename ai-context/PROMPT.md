# Krevus — AI IDE Prompt

> **How to use:** Paste this entire file as your **first message** in Cursor, Windsurf, or any AI coding tool. Do not write any code or create any files before this. Reference `PRD.md`, `DESIGN.md`, and `COMPONENTS-MAP.md` when the AI needs specifics.

---

## Paste this as your first message:

---

You are a senior Next.js developer building `krevus.com` — a production-grade website for a digital agency called Krevus. You have access to four reference documents in this project:

- `PRD.md` — all page specs, routes, API routes, database schema, build order
- `DESIGN.md` — complete design system, colors, typography, GSAP hooks, spacing
- `COMPONENTS-MAP.md` — every component, its props, its structure, and build checklist

**Read all three documents before writing a single line of code.** Every decision about colors, fonts, animations, components, and architecture is already made in those files. Your job is to implement them precisely.

---

## Non-Negotiable Stack Rules

These cannot be changed under any circumstances:

- **Animations:** GSAP + `@gsap/react` only. **Never suggest or install Framer Motion.**
- **Database:** Neon (`@neondatabase/serverless`) only. **Never suggest Supabase.**
- **ORM:** Drizzle ORM + `drizzle-kit` only. **Never suggest Prisma.**
- **Fonts:** Space Grotesk (headings) + DM Sans (body). **Never use Inter, Roboto, or system fonts.**
- **Styling:** Tailwind CSS v3 only. No component libraries (no shadcn, no MUI, no Radix by itself).

If you are about to suggest any of the forbidden options — stop, re-read the rules, and use the correct alternative.

---

## The Two-Tier Structure

This site serves two audiences that must **never visually mix**:

**Tier 1 — Premium** (all pages except `/briqly`):
- Dark theme (`#080C14` background)
- Blue accent (`#3D5AFE`)
- Audience: US tax firms, fintech companies, real estate businesses
- Tone: institutional, cold, precise, authoritative

**Tier 2 — SMB** (`/briqly` page only):
- Light theme (`#FFFFFF` background)
- Amber accent (`#F0A500`)
- Audience: US small businesses — restaurants, clinics, salons
- Tone: friendly, fast, price-transparent

A fintech CTO must never see bakery pricing. A restaurant owner must never feel intimidated by compliance dashboards. The site architecture enforces this.

---

## Build Order

Follow `COMPONENTS-MAP.md` Phase checklist exactly. **Do not build any page before Phase 1–4 are complete.**

### Summary of order:
1. Init project + install dependencies (see PRD.md Section 2)
2. Neon + Drizzle setup (see PRD.md Section 6)
3. `lib/gsap.ts` — register all plugins
4. All 10 GSAP hooks in `/hooks` (specs in DESIGN.md Section 7)
5. CSS variables in `globals.css` + fonts in `layout.tsx`
6. All primitive UI components (COMPONENTS-MAP.md Section 1)
7. Layout components — Header + Footer
8. Form components
9. Pages in P0 order (see PRD.md Section 9)
10. SEO, analytics, Lighthouse audit, deploy

**At each step:** confirm completion before moving to the next. Do not skip ahead.

---

## GSAP Implementation Rules

Read DESIGN.md Section 7 for full specifications. Critical rules:

```typescript
// ALWAYS use useGSAP() — never useEffect for animations
import { useGSAP } from '@gsap/react'

// ALWAYS check prefers-reduced-motion
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReduced) return

// ALWAYS use scope for automatic cleanup
useGSAP(() => {
  // your animation
}, { scope: containerRef })
```

- Never animate: `width`, `height`, `margin`, `padding`
- All durations: 0.2s–0.8s maximum
- `useGsapParallax` disabled under 768px breakpoint
- `useGsapCardHover` — never use CSS `:hover` transforms on cards, GSAP only

---

## Database Rules

```typescript
// lib/db/index.ts — exact implementation
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })

// Always use POOLED connection string from Neon
// Never use direct connection in API routes
```

See PRD.md Section 6 for full schema with both tables.

---

## API Route Pattern

Both API routes follow the same pattern:

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { krevusEnquiries } from '@/lib/db/schema'
import { Resend } from 'resend'

const schema = z.object({ /* see PRD.md Section 5 */ })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)           // throws ZodError on invalid
    await db.insert(krevusEnquiries).values(data)
    // send Resend notification
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.flatten() }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
```

---

## Specific Page Instructions

### Homepage Hero
```
H1: "Your firm is losing clients to slow processes. We fix that."
Sub: "Krevus builds secure portals, AI automation, and digital infrastructure
     for tax firms, fintech companies, and real estate businesses."
CTA 1 (primary + magnetic): "Book a Discovery Call" → NEXT_PUBLIC_CALENDLY_URL
CTA 2 (outline): "See Our Work" → /case-studies
Apply: useGsapHeroReveal + useGsapMagneticButton on CTA 1
```

### Industry Page Headlines
```
/industries/tax-firms:    "Your clients are still emailing sensitive documents. That stops today."
/industries/fintech:      "Build compliant, fast, and connected — without a 12-month roadmap."
/industries/real-estate:  "Your leads deserve better than a missed call and a delayed email."
```

### /briqly Page
```
Background: #FFFFFF (light theme — not dark)
H1: "A website that brings you customers. Delivered in 7 days."
Sub: "Fixed pricing. No surprises. Starting at $400."
Pricing section must be visible WITHOUT scrolling on desktop
WhatsApp button: /briqly page ONLY — fixed bottom-right
Tidio chat widget: /briqly page ONLY
```

### Demo Case Studies
Create before building case study pages:

```
/content/case-studies/cpa-firm-portal.mdx
title: "Secure Client Portal for CPA Firm"
client: "Harlow & Associates (Concept Project)"
industry: tax-firms
isDemo: true
challenge: "Client documents sent via email, compliance risk, 3-day onboarding"
result: "Onboarding from 3 days to 20 minutes. Zero email document sharing."
tech: ["Next.js", "Neon", "Drizzle", "Resend", "AWS S3"]
```

```
/content/case-studies/real-estate-portal.mdx
title: "Real-Time Client Portal for Real Estate Agency"
client: "Summit Realty Group (Concept Project)"
industry: real-estate
isDemo: true
challenge: "No centralised portal, leads lost after hours, manual follow-up"
result: "40% reduction in missed leads. Client satisfaction improved."
tech: ["Next.js", "GSAP", "Neon", "Drizzle", "AI Calling Agent"]
```

**Always label demo work "Concept Project" — never imply real client work.**

---

## Environment Variables Needed

```bash
DATABASE_URL=                 # Neon pooled connection string
RESEND_API_KEY=               # resend.com
NOTIFICATION_EMAIL=           # receives all form submissions
NEXT_PUBLIC_SITE_URL=         # https://krevus.com
NEXT_PUBLIC_CALENDLY_URL=     # https://calendly.com/[link]
NEXT_PUBLIC_WHATSAPP_NUMBER=  # +[code][number]
```

---

## Before Deploying — Checklist

- [ ] All 10 GSAP hooks implemented and tested on all breakpoints
- [ ] Both API routes tested end-to-end (form submit → DB insert → email notification)
- [ ] `/briqly` page is definitively light theme — no dark backgrounds
- [ ] WhatsApp button appears ONLY on `/briqly`, not main site
- [ ] All demo case studies labeled "Concept Project"
- [ ] `generateMetadata` added to every page
- [ ] `npx next-sitemap` generates `sitemap.xml`
- [ ] Hotjar snippet installed
- [ ] Vercel Analytics enabled
- [ ] Lighthouse: 90+ desktop, 85+ mobile
- [ ] All form inputs minimum 16px font-size (iOS zoom prevention)
- [ ] `prefers-reduced-motion` check in every GSAP hook

---

## Start Command

```
Start with Step 1 from the build order in PRD.md:
Initialise the Next.js project and install all dependencies.
Confirm when complete before moving to Step 2.
```
