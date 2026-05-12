# Krevus — Product Requirements Document

> **Version:** 1.0  
> **Stack:** Next.js 14 · GSAP · Neon · Drizzle · Tailwind · Resend · Calendly  
> **Domain:** krevus.com  
> **Read before writing a single line of code.**

---

## 1. Project Overview

Krevus is a digital agency website with two client tiers under one domain:

| Tier | Audience | Pages |
|---|---|---|
| **Premium** | US tax firms, fintech companies, real estate businesses | All pages except /briqly |
| **SMB (Briqly)** | US small businesses — restaurants, clinics, salons, contractors | /briqly only |

The two tiers must **never bleed visually**. A fintech CTO must never encounter bakery pricing. A restaurant owner must never feel intimidated by compliance dashboards.

### North Star Metrics
- **Premium:** Calendly discovery call bookings via /contact
- **SMB:** Contact form submissions and WhatsApp messages via /briqly

---

## 2. Tech Stack

```
Frontend:     Next.js 14 App Router
Styling:      Tailwind CSS v3 (no component library)
Animations:   GSAP + @gsap/react — ONLY. Never Framer Motion.
Database:     Neon (Serverless PostgreSQL) — pooled connection
ORM:          Drizzle ORM + drizzle-kit — Never Prisma
Email:        Resend
Validation:   Zod
IDs:          @paralleldrive/cuid2
Case Studies: next-mdx-remote (MDX files in /content/case-studies/)
Analytics:    Vercel Analytics + Hotjar
Calendar:     Calendly inline embed (not popup)
SMB Chat:     Tidio free tier (/briqly only)
Deployment:   Vercel
```

### Install Commands

```bash
npx create-next-app@latest krevus --typescript --tailwind --app
npm install gsap @gsap/react drizzle-orm @neondatabase/serverless @paralleldrive/cuid2 resend zod next-mdx-remote
npm install -D drizzle-kit
```

---

## 3. Pages & Routes

| Route | Page | Type | Priority |
|---|---|---|---|
| `/` | Homepage | SSG | P0 |
| `/services` | Services | SSG | P0 |
| `/industries` | Industries Overview | SSG | P0 |
| `/industries/tax-firms` | Tax & CPA Firms | SSG | P0 |
| `/industries/fintech` | Fintech | SSG | P0 |
| `/industries/real-estate` | Real Estate | SSG | P0 |
| `/case-studies` | Case Studies Index | SSG | P0 |
| `/case-studies/[slug]` | Case Study Detail | ISR | P0 |
| `/about` | About Krevus | SSG | P1 |
| `/contact` | Contact / Book a Call | SSG + API | P0 |
| `/briqly` | SMB Section (Briqly) | SSG + API | P0 |

> Build P0 pages first. Do not start P1 until all P0 pages are deployed and tested.

---

## 4. Page Specifications

### 4.1 Homepage — `/`

#### Hero Section
- Background: `#080C14` — no hero image, typography IS the hero
- **H1:** `"Your firm is losing clients to slow processes. We fix that."`
- **Sub:** `"Krevus builds secure portals, AI automation, and digital infrastructure for tax firms, fintech companies, and real estate businesses."`
- **CTA Primary** (magnetic button): `"Book a Discovery Call"` → `NEXT_PUBLIC_CALENDLY_URL`
- **CTA Secondary** (outline): `"See Our Work"` → `/case-studies`
- GSAP: `useGsapHeroReveal` + `useGsapMagneticButton` on primary CTA

#### Services Strip
- 3 cards: **Secure Portals** / **AI Automation** / **Software & Dashboards**
- Each card: icon, title, 2-sentence description, arrow link
- GSAP: `useGsapFadeIn` stagger on scroll + `useGsapCardHover` on each card

#### Industries Block
- 3 tiles: Tax & CPA Firms / Fintech / Real Estate
- Each links to `/industries/[slug]`
- GSAP: `useGsapSectionReveal` on section, `useGsapLineReveal` on heading

#### Stats Section
- 3 stats (example): "50+ Projects" / "3 Industries" / "100% US Clients"
- GSAP: `useGsapCounter` on each number

#### Featured Case Study
- One card: client type, problem headline, result metric, CTA
- Label demo work `"Concept Project"` — never imply real client

#### SMB Banner (Briqly CTA)
- **Visually completely different** from sections above — amber accent, white/light background
- **Headline:** `"Need a website for your local business? Delivered in 7 days from $400."`
- **CTA:** `"See Packages"` → `/briqly`
- This is the **only** place on the main site that references the SMB tier

---

### 4.2 Services — `/services`

Three service sections in full detail:

**Service 1 — Secure Document Portals**
- What it is: Encrypted client portals replacing email attachments for tax/CPA firms
- Who it's for: Tax firms, CPA practices, accounting companies
- Deliverables: Client upload portal, admin dashboard, audit trail, email notifications
- Result statement: "Onboarding from 3 days to 20 minutes"
- CTA: "Discuss This Service" → `/contact`

**Service 2 — AI Automation Systems**
- What it is: Calling agents, chat agents, intake bots, front desk automation
- Who it's for: All three industries — 24/7 coverage without headcount
- Deliverables: AI intake bot, lead qualifier, calling agent, CRM integration
- CTA: "Discuss This Service" → `/contact`

**Service 3 — Software & Dashboards**
- What it is: Finance dashboards, data connection infrastructure, real estate portals
- Who it's for: Fintech (dashboards, API connections), Real estate (client portals)
- Deliverables: Custom dashboard, API integrations, real-time data, client-facing portal
- CTA: "Discuss This Service" → `/contact`

---

### 4.3 Industry Pages — `/industries/[slug]`

Identical structure for all three:

| Slug | Hero Headline | Lead Service |
|---|---|---|
| `tax-firms` | `"Your clients are still emailing sensitive documents. That stops today."` | Secure document portal |
| `fintech` | `"Build compliant, fast, and connected — without a 12-month roadmap."` | Finance dashboards + AI |
| `real-estate` | `"Your leads deserve better than a missed call and a delayed email."` | Real-time portals + AI |

**Section structure for each page:**
1. Hero (industry-specific headline + CTA)
2. The Problem (3 bullet points — industry-specific pain)
3. Our Solution (how Krevus solves each pain)
4. Relevant Services (2–3 services most relevant to this industry)
5. Case Study or Demo (with "Concept Project" label if demo)
6. CTA: `"Talk to Someone Who Understands [Industry]"` → `/contact`

GSAP: `useGsapHeroReveal` on hero, `useGsapFadeIn` stagger on all sections

---

### 4.4 Case Studies — `/case-studies` and `/case-studies/[slug]`

**Index page:**
- Grid of `CaseStudyCard` components
- Filter by industry tag (add after launch)
- Each card: industry tag, headline, result metric, CTA

**Detail page (MDX-powered):**
- Challenge → Solution → Result → Tech Used → CTA
- `IndustryTag` component for industry label
- Demo badge: amber "Concept Project" pill

**Demo case studies to create before launch:**

```
File: /content/case-studies/cpa-firm-portal.mdx
client: "Harlow & Associates (Concept Project)"
industry: tax-firms
challenge: Client documents sent via email, compliance risk, 3-day onboarding
solution: Encrypted upload portal, admin dashboard, email notification system
result: Onboarding reduced from 3 days to 20 minutes
tech: Next.js, Neon, Drizzle, Resend, AWS S3
```

```
File: /content/case-studies/real-estate-portal.mdx
client: "Summit Realty Group (Concept Project)"
industry: real-estate
challenge: No centralised client portal, leads lost after hours, manual follow-up
solution: Real-time property portal with AI lead qualification bot
result: 40% reduction in missed leads, client satisfaction improved significantly
tech: Next.js, GSAP, Neon, AI calling agent
```

> ⚠️ Always label demo work "Concept Project" — never imply real client work.

---

### 4.5 Contact — `/contact`

- **Top:** Calendly inline widget (not popup) — load via `useEffect` script tag
- **Divider:** `"Or send us a message"`
- **Form fields:**
  - Full Name (required)
  - Company Name (required)
  - Email (required, valid format)
  - Industry (dropdown: Tax/CPA Firm / Fintech / Real Estate / Other)
  - Service Interest (dropdown: Secure Portal / AI Automation / Software & Dashboard / SEO / Not Sure)
  - Message (required, min 30 chars)
  - How did you find us? (optional)
- **Success message (inline):** `"We'll reply within 4 hours during US business hours."`
- **Error message (inline):** `"Something went wrong. Please try again."`
- GSAP: `useGsapFadeIn` stagger on form fields on page mount

---

### 4.6 Briqly SMB Section — `/briqly`

> This page is a **complete standalone experience** with light theme. The only shared element with the main site is the Krevus logo + "SMB Services" subtitle in the nav.

**Hero**
- Background: `#FFFFFF`
- H1: `"A website that brings you customers. Delivered in 7 days."`
- Sub: `"Fixed pricing. No surprises. Starting at $400."`
- CTA 1: `"See Packages"` (scroll to pricing)
- CTA 2: `"See Our Work"` (scroll to portfolio)
- GSAP: `useGsapHeroReveal`

**Pricing Section (must be visible without scrolling on desktop)**
- 3 `PricingCard` components:
  - Starter: $400–600 / 7 days / 5-page site, mobile optimised, contact form, basic SEO
  - Growth: $800–1,200 / 14 days / 10-page site, Google Business, local SEO, 1 month support
  - Pro: $1,500–2,500 / 21 days / Full site + SEO + basic chat automation + monthly retainer
- "Most Popular" amber badge on Growth
- Full deliverables list on each card
- Full-width amber CTA per card: `"Get Started"` → scroll to `#briqly-contact`

**Before/After Portfolio**
- 3 pairs — horizontal scroll mobile, 3-col grid desktop
- Tap reveals after image via CSS clip-path transition
- `useGsapParallax` on images (desktop only, disabled under 768px)
- "Concept Project" amber badge on demo work

**How It Works**
- Step 1: Tell us about your business (15 min call)
- Step 2: We build in 7 days
- Step 3: You get more customers
- Amber numbered circles for step indicators
- GSAP: `useGsapFadeIn` stagger

**Industries Served**
- Icon + label grid: Restaurants, Clinics, Salons, Contractors, Bakeries, Gyms, Retail, Any local business

**Contact Form (anchor: `#briqly-contact`)**
- Fields: Name, Business Name, Business Type (text), Phone, Email, Service (dropdown: New Website / Redesign / SEO / Automation / Not Sure), Message (optional)
- Calendly inline widget below form
- WhatsApp CTA: `"Chat directly on WhatsApp"`

**WhatsApp Floating Button**
- Fixed bottom-right on `/briqly` page **only** — not on main site pages
- Pre-filled message: `"Hi Krevus, I'm interested in a website for my business"`
- Hides when `#briqly-contact` section is in viewport (IntersectionObserver)

**Tidio Chat Widget**
- Install on `/briqly` only via Script tag in page component
- Not on main site

---

## 5. API Routes

### `POST /api/contact` — Premium enquiries

**Validation (Zod):**

```typescript
{
  name:            string (required, min 2)
  company:         string (required, min 2)
  email:           string (required, valid email)
  industry:        enum: tax-firm | fintech | real-estate | other
  serviceInterest: enum: secure-portal | ai-automation | software | seo | not-sure
  message:         string (required, min 30, max 3000)
  howFound:        string (optional, max 200)
}
```

**Behaviour:**
- Insert to `krevusEnquiries` table via Drizzle
- Send Resend email to `NOTIFICATION_EMAIL`
- Return 200 on success
- Return 400 with field-level errors on validation failure
- Return 429 if rate limited (3 submissions per IP per hour)
- Return 500 on server error — log internally, return generic message

---

### `POST /api/briqly-contact` — SMB enquiries

**Validation (Zod):**

```typescript
{
  name:         string (required, min 2)
  businessName: string (required, min 2)
  businessType: string (required, max 100)
  phone:        string (required, min 7)
  email:        string (required, valid email)
  service:      enum: new-website | redesign | seo | automation | not-sure
  message:      string (optional, max 2000)
}
```

**Behaviour:** Same as above but inserts to `briqlyEnquiries` table.

---

## 6. Database — Neon + Drizzle

### Setup

```typescript
// lib/db/index.ts
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })
```

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: './lib/db/schema.ts',
  out:    './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
})
```

### Schema

```typescript
// lib/db/schema.ts
import { pgTable, text, timestamp, real } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const krevusEnquiries = pgTable('krevus_enquiries', {
  id:              text('id').primaryKey().$defaultFn(() => createId()),
  name:            text('name').notNull(),
  company:         text('company').notNull(),
  email:           text('email').notNull(),
  industry:        text('industry').notNull(),
  serviceInterest: text('service_interest').notNull(),
  message:         text('message').notNull(),
  howFound:        text('how_found'),
  createdAt:       timestamp('created_at').defaultNow().notNull(),
  status:          text('status').default('new').notNull(),
  notes:           text('notes'),
})

export const briqlyEnquiries = pgTable('briqly_enquiries', {
  id:           text('id').primaryKey().$defaultFn(() => createId()),
  name:         text('name').notNull(),
  businessName: text('business_name').notNull(),
  businessType: text('business_type').notNull(),
  phone:        text('phone').notNull(),
  email:        text('email').notNull(),
  service:      text('service').notNull(),
  message:      text('message'),
  createdAt:    timestamp('created_at').defaultNow().notNull(),
  status:       text('status').default('new').notNull(),
  packageSold:  text('package_sold'),
  dealValue:    real('deal_value'),
})

export type NewKrevusEnquiry = typeof krevusEnquiries.$inferInsert
export type NewBriqlyEnquiry = typeof briqlyEnquiries.$inferInsert
```

### Migration

```bash
npx drizzle-kit push      # dev — push schema directly
npx drizzle-kit generate  # prod — generate migration file
```

---

## 7. Environment Variables

```bash
DATABASE_URL=                 # Neon pooled connection string (not direct)
RESEND_API_KEY=               # resend.com API key
NOTIFICATION_EMAIL=           # Abdullah's email — receives all form submissions
NEXT_PUBLIC_SITE_URL=         # https://krevus.com
NEXT_PUBLIC_CALENDLY_URL=     # https://calendly.com/[your-link]
NEXT_PUBLIC_WHATSAPP_NUMBER=  # +[country-code][number] — no spaces
```

> ⚠️ Always use the **pooled** Neon connection string for serverless/API routes — not the direct connection.

---

## 8. SEO Requirements

| Page | Title Tag | Focus Keyword |
|---|---|---|
| `/` | `Krevus — AI Automation & Secure Portals for Tax Firms, Fintech & Real Estate` | AI automation agency |
| `/services` | `Services — Secure Portals, AI Automation & Dashboards \| Krevus` | secure client portal |
| `/industries/tax-firms` | `Secure Document Portals for CPA & Tax Firms \| Krevus` | secure portal tax firm |
| `/industries/fintech` | `Finance Dashboards & AI Automation for Fintech \| Krevus` | fintech software development |
| `/industries/real-estate` | `Real-Time Portals & AI Lead Automation for Real Estate \| Krevus` | real estate client portal |
| `/briqly` | `Small Business Websites — 7-Day Delivery from $400 \| Krevus` | small business website |

- Schema markup: `Organization`, `Service`, `FAQ` on all relevant pages
- `sitemap.xml` via `next-sitemap` package
- `robots.txt` — allow all
- Open Graph tags on every page with Krevus logo as `og:image`

---

## 9. Build Order

Follow exactly. Do not skip steps.

| Step | Task |
|---|---|
| 1 | Init Next.js project + install all dependencies |
| 2 | Create Neon project → copy pooled `DATABASE_URL` to `.env.local` |
| 3 | `lib/db/schema.ts` (both tables) + `drizzle.config.ts` + `npx drizzle-kit push` |
| 4 | `lib/gsap.ts` — register all plugins including SplitText |
| 5 | Build all 10 GSAP hooks in `/hooks` — test each before moving on |
| 6 | `globals.css` — all CSS variables (dark + light/SMB tokens) + `next/font` setup |
| 7 | Build all UI components (see `COMPONENTS-MAP.md`) |
| 8 | Build `Header` + `Footer` |
| 9 | Build `Hero` section with `useGsapHeroReveal` + `useGsapMagneticButton` |
| 10 | Build complete Homepage |
| 11 | Build `/services` page |
| 12 | Build `/industries` overview + 3 industry sub-pages |
| 13 | Write 2 MDX demo case studies + build `/case-studies` + `/case-studies/[slug]` |
| 14 | Build `/contact` — Calendly embed + `ContactForm` + `POST /api/contact` |
| 15 | Build `/briqly` — full light-theme SMB page + `POST /api/briqly-contact` |
| 16 | Build `/about` page |
| 17 | SEO — `generateMetadata` per page, OG tags, schema markup, `next-sitemap` |
| 18 | Install Hotjar snippet + Vercel Analytics |
| 19 | Lighthouse audit — 90+ desktop, 85+ mobile before any deploy |
| 20 | Deploy to Vercel on `krevus.com` |
