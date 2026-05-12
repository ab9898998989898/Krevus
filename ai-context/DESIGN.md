# Krevus — Design System

> **Rule:** Every visual decision in this file is final. If the AI suggests a different color, font, spacing, or animation — reject it and reference this document.

---

## 1. Brand Identity

Krevus must feel like a firm a US fintech CTO or managing partner would trust with a $10,000 contract. The visual language is:

- **Precise** — nothing decorative that doesn't serve a purpose
- **Cold** — not warm, not friendly, not casual
- **Authoritative** — institutional confidence without arrogance
- **Fast** — animations are quick and purposeful, not slow and theatrical

References: Linear, Vercel, Stripe, Raycast  
Anti-references: Wix, Squarespace, generic agency templates, anything with gradients on stock photos

---

## 2. Color System

### Premium Site (all pages except /briqly)

```css
:root {
  /* Backgrounds */
  --bg-primary:   #080C14;  /* Main page background */
  --bg-card:      #0D1420;  /* Card backgrounds */
  --bg-elevated:  #141C2E;  /* Hover states, elevated cards */
  --bg-subtle:    #0A0F1A;  /* Section alternates — very subtle */

  /* Text */
  --text-primary: #FFFFFF;  /* Headings, important text */
  --text-body:    #C8CFDD;  /* All paragraph text */
  --text-muted:   #8A8F9E;  /* Labels, captions, placeholders */
  --text-faint:   #4A5266;  /* Disabled states, very secondary */

  /* Accent */
  --accent:       #3D5AFE;  /* Primary buttons, links, highlights */
  --accent-hover: #2A47EB;  /* Button hover state */
  --accent-dim:   #1A2A6E;  /* Accent at low opacity — icon backgrounds */
  --accent-glow:  rgba(61, 90, 254, 0.15); /* Subtle glow on hover */

  /* Borders */
  --border:       #1E2A3D;  /* Card borders, dividers */
  --border-accent:#3D5AFE33; /* Accent border at 20% opacity */

  /* Status */
  --success:      #00C896;
  --error:        #FF4D6A;
  --warning:      #F0A500;

  /* SMB Accent (Briqly banner on homepage only) */
  --amber:        #F0A500;
  --amber-hover:  #D99200;
  --amber-dim:    #FFF4D6;
}
```

### SMB Section (/briqly page only)

```css
.briqly-theme {
  --smb-bg:           #FFFFFF;
  --smb-bg-section:   #F8F9FA;
  --smb-bg-card:      #FFFFFF;
  --smb-bg-card-hover:#FFF9EE;
  --smb-text:         #111827;
  --smb-body:         #374151;
  --smb-muted:        #9CA3AF;
  --smb-accent:       #F0A500;
  --smb-accent-hover: #D99200;
  --smb-accent-light: #FFF4D6;
  --smb-border:       #E5E7EB;
  --smb-success:      #10B981;
  --smb-error:        #EF4444;
}
```

> ⚠️ **Never** use teal, cyan, or purple anywhere on the site. Never use gradients on text or backgrounds. Never use white backgrounds on the premium site.

---

## 3. Typography

### Font Families

```typescript
// app/layout.tsx — install via next/font
import { Space_Grotesk, DM_Sans } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500'],
})
```

> **Space Grotesk** — headings only  
> **DM Sans** — all body text, labels, buttons, inputs

### Scale

| Token | Font | Size | Line Height | Weight | Usage |
|---|---|---|---|---|---|
| `--text-hero` | Space Grotesk | 64px desktop / 40px mobile | 1.05 | 700 | Homepage hero H1 only |
| `--text-h1` | Space Grotesk | 48px desktop / 34px mobile | 1.1 | 700 | Page titles |
| `--text-h2` | Space Grotesk | 34px desktop / 26px mobile | 1.2 | 600 | Section headings |
| `--text-h3` | Space Grotesk | 22px | 1.3 | 600 | Sub-sections, card titles |
| `--text-h4` | Space Grotesk | 18px | 1.4 | 600 | Small headings, labels |
| `--text-xl` | DM Sans | 20px | 1.6 | 400 | Hero sub-headline |
| `--text-lg` | DM Sans | 18px | 1.7 | 400 | Lead paragraphs |
| `--text-base` | DM Sans | 16px | 1.75 | 400 | Body text |
| `--text-sm` | DM Sans | 14px | 1.5 | 400 | Secondary text, captions |
| `--text-xs` | DM Sans | 12px | 1.4 | 500 | Tags, labels, badges |
| `--text-btn` | DM Sans | 15px | 1 | 600 | All button text |

### Rules

- Letter spacing on headings: `-0.02em` (slightly tight, premium feel)
- Letter spacing on tags/labels: `0.06em` (slightly open, reads clearly at small sizes)
- Never use italic on headings
- Maximum line length: 68 characters for body text (readability)
- Minimum font size anywhere: 12px

---

## 4. Spacing System

Base unit: `4px`. All spacing in multiples of 4.

```css
/* Tailwind config additions */
spacing: {
  '18': '4.5rem',   /* 72px */
  '22': '5.5rem',   /* 88px */
  '26': '6.5rem',   /* 104px */
  '30': '7.5rem',   /* 120px */
}
```

| Context | Value | Tailwind |
|---|---|---|
| Section vertical padding | 96px desktop / 64px mobile | `py-24 md:py-12` |
| Container max-width | 1160px | `max-w-[1160px]` |
| Container padding | 24px | `px-6` |
| Card padding | 32px | `p-8` |
| Card padding (compact) | 24px | `p-6` |
| Gap between cards | 24px | `gap-6` |
| Gap between sections | 80px | `mb-20` |

---

## 5. Component Styles

### Buttons

```
Primary (blue):
  bg: var(--accent)
  text: white
  border-radius: 6px (rounded-md)
  padding: 14px 28px
  font: DM Sans 15px / 600
  hover: bg var(--accent-hover), translateY(-1px) via GSAP
  active: scale(0.98)
  NO: rounded-full, gradients, shadows on default state

Outline:
  bg: transparent
  border: 1px solid var(--accent)
  text: var(--accent)
  same radius + padding as primary
  hover: bg var(--accent-glow)

Ghost:
  bg: transparent, no border
  text: var(--accent)
  hover: text underline or opacity change

Amber Primary (SMB only):
  bg: var(--smb-accent)
  text: white
  Same radius + padding
```

### Cards

```
Premium Card:
  bg: var(--bg-card)
  border: 1px solid var(--border)
  border-radius: 12px
  padding: 32px
  hover (via GSAP): translateY(-8px) + border-color → var(--accent) at 60% opacity
  NO: box-shadow on default state — add only on hover via GSAP

Service Card:
  Same as Premium Card +
  Left border: 3px solid var(--accent) — always visible, not just on hover

SMB Pricing Card:
  bg: white
  border: 1px solid var(--smb-border)
  border-radius: 12px
  "Most Popular" card: border 2px solid var(--smb-accent), elevated shadow
  padding: 32px
```

### Form Inputs

```
Premium inputs (dark):
  bg: var(--bg-card)
  border: 1px solid var(--border)
  border-radius: 6px
  padding: 14px 16px
  text: var(--text-primary)
  placeholder: var(--text-faint)
  focus: border-color → var(--accent), no box-shadow
  font-size: 16px minimum (iOS zoom prevention)

SMB inputs (light):
  bg: white
  border: 1px solid var(--smb-border)
  focus: border-color → var(--smb-accent)
  font-size: 16px minimum — NEVER below this
```

### Tags / Badges

```
Industry tag:
  bg: var(--accent-dim)
  text: var(--accent)
  border-radius: 4px
  padding: 4px 10px
  font: DM Sans 12px / 700 / letter-spacing: 0.06em
  uppercase: YES

"Concept Project" badge:
  bg: var(--amber-dim)
  text: var(--amber)
  Same as above

"Most Popular" badge:
  bg: var(--smb-accent)
  text: white
  border-radius: 20px (pill)
  padding: 4px 14px
```

---

## 6. Layout Patterns

### Grid System

```
Homepage sections: single column, full-width sections
Content width: max-w-[1160px] centered with px-6
Service cards: 3-column grid (md:grid-cols-3), single column mobile
Industry tiles: 3-column (md:grid-cols-3), single column mobile
Case study grid: 2-column (md:grid-cols-2), single column mobile
Pricing cards: 3-column (md:grid-cols-3), single column mobile
Before/after: 3-column desktop, horizontal scroll mobile
Stats: 3 or 4 column inline — never stacked on desktop
```

### Section Structure

Every section follows:
```
<section>
  <div class="container"> // max-w-[1160px] mx-auto px-6
    <div class="section-header"> // label + heading + optional sub
    <div class="section-content"> // cards, grid, etc.
    <div class="section-cta"> // optional bottom CTA
  </div>
</section>
```

### Navigation

```
Header:
  bg: transparent → rgba(8,12,20,0.96) with blur(16px) on scroll (GSAP)
  height: 72px
  logo: left-aligned
  nav links: center (desktop), hamburger (mobile)
  CTA button: right-aligned — "Book a Call" (primary, small)
  
Nav links: Services / Industries / Case Studies / About
  font: DM Sans 14px / 500
  color: var(--text-muted) → var(--text-primary) on hover
  NO underlines on hover — just color change

Mobile nav:
  Full-screen overlay on dark bg
  Links stacked, centered
  Large font size (24px)
```

---

## 7. GSAP Animation System

> All 10 hooks must be built in `/hooks` before any page component.

### Plugin Registration

```typescript
// lib/gsap.ts — run once at app level
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, SplitText)
```

### Hook Specifications

#### `useGsapHeroReveal(containerRef)`
```
Trigger: on mount (no ScrollTrigger — hero is always visible)
Step 1: SplitText splits H1 into words
Step 2: gsap.fromTo(words, { y: 80, opacity: 0 }, { y: 0, opacity: 1,
  duration: 0.7, stagger: 0.06, ease: 'power4.out' })
Step 3: Sub-headline 400ms after last word — { y:30, opacity:0 } → { y:0, opacity:1, duration:0.6 }
Step 4: CTAs 200ms after sub — stagger 0.1s, { y:20, opacity:0 } → { y:0, opacity:1 }
Rule: useGSAP() with scope — never raw useEffect
```

#### `useGsapFadeIn(ref, stagger = 0.12)`
```
Trigger: ScrollTrigger, start: 'top 82%'
Effect: opacity:0 y:50 → opacity:1 y:0
Duration: 0.65s, ease: 'power3.out'
Stagger: 0.12s between ref.current.children
Use on: card grids, feature lists, step sections
```

#### `useGsapCardHover(cardRef, borderRef?)`
```
mouseenter:
  gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' })
  gsap.to(borderEl, { opacity: 1, duration: 0.2 }) — if borderRef provided
mouseleave:
  gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
  gsap.to(borderEl, { opacity: 0.3, duration: 0.2 })
RULE: Never CSS :hover transforms on cards — GSAP only
```

#### `useGsapMagneticButton(btnRef)`
```
Track mouse position when cursor within 80px of button
On proximity: gsap.to(btn, { x: deltaX*0.35, y: deltaY*0.35, duration: 0.3 })
On leave: gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
Apply ONLY to: Homepage hero primary CTA, major CTA banner
```

#### `useGsapCounter(ref, target, suffix = '')`
```
ScrollTrigger: when ref enters viewport
gsap.to(obj, { val: target, duration: 2, ease: 'power1.out',
  onUpdate: () => el.textContent = Math.round(obj.val) + suffix })
```

#### `useGsapNavScroll(headerRef)`
```
ScrollTrigger.create({
  start: 'top -80px',
  onEnter: () => gsap.to(header, { backgroundColor: 'rgba(8,12,20,0.96)',
    backdropFilter: 'blur(16px)', duration: 0.35 }),
  onLeaveBack: () => gsap.to(header, { backgroundColor: 'transparent',
    backdropFilter: 'blur(0px)', duration: 0.35 }),
})
```

#### `useGsapLineReveal(ref)`
```
ScrollTrigger, start: 'top 80%'
gsap.fromTo(line, { width: '0%' }, { width: '100%', duration: 0.7, ease: 'power2.inOut' })
Apply to: decorative underlines beneath H2 section headings
```

#### `useGsapPageTransition()`
```
usePathname(): on change →
  Exit: gsap.to(page, { opacity: 0, y: -20, duration: 0.2 })
  Enter: gsap.fromTo(page, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' })
Implement in root layout
```

#### `useGsapParallax(ref)` — /briqly only
```
ScrollTrigger: scrub: 1.5
y: gsap.fromTo(el, { y: -40 }, { y: 40, scrollTrigger: { scrub: 1.5 } })
Disable completely under 768px breakpoint
Only apply to before/after images on /briqly
```

#### `useGsapSectionReveal(containerRef)`
```
Orchestrated sequence on ScrollTrigger (start: 'top 75%'):
  1. Section label: { x: -40, opacity: 0 } → { x: 0, opacity: 1, duration: 0.5 }
  2. Heading (150ms delay): { x: -60, opacity: 0 } → { x: 0, opacity: 1, duration: 0.6 }
  3. Sub-text (300ms delay): { y: 30, opacity: 0 } → { y: 0, opacity: 1, duration: 0.5 }
  4. Content children (500ms delay): stagger with useGsapFadeIn logic
Apply to: Services section, Industries section, About section
```

### GSAP Rules (Non-Negotiable)

1. **Always** `useGSAP()` from `@gsap/react` — never `useEffect` for animations
2. **Never** animate layout properties: `width`, `height`, `margin`, `padding`
3. All durations: **0.2s–0.8s** maximum — nothing longer
4. Always check `prefers-reduced-motion` and skip all animations if set
5. Disable `useGsapParallax` under 768px
6. `useGSAP()` with `scope` handles cleanup — no manual `ScrollTrigger.kill()`

```typescript
// Always check reduced motion
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReduced) return
```

---

## 8. Visual Details

### Borders and Separators

```
Card borders: 1px solid var(--border) — always present, not just on hover
Section dividers: 1px solid rgba(255,255,255,0.06) — very subtle
Accent underlines: 2px solid var(--accent) — beneath section headings
Left border on service cards: 3px solid var(--accent)
```

### Icons

- Use [Lucide Icons](https://lucide.dev) — `npm install lucide-react`
- Icon size on cards: 24px
- Icon size in nav: 20px
- Icon color: `var(--accent)` for feature icons, `var(--text-muted)` for UI icons
- Never use emoji as icons in the premium sections

### Images

- No stock photography of people or offices on premium sections
- Use: UI screenshots of real/demo work, abstract geometric forms, dark backgrounds with subtle patterns
- On `/briqly`: real photos of actual small businesses — no stock photos
- All images: `next/image` with `priority` on above-fold images

### Subtle Background Textures

```css
/* Optional: very subtle dot grid on hero section */
.hero-bg {
  background-image: radial-gradient(circle, rgba(61,90,254,0.08) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* Optional: subtle noise overlay on premium sections */
.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,..."); /* noise SVG */
  pointer-events: none;
}
```

---

## 9. Responsive Breakpoints

Using Tailwind defaults:

| Breakpoint | Width | Notes |
|---|---|---|
| Default | < 640px | Mobile-first base |
| `sm` | 640px+ | Large mobile |
| `md` | 768px+ | Tablet — switch to 2-col grids |
| `lg` | 1024px+ | Desktop — switch to 3-col grids |
| `xl` | 1280px+ | Wide desktop |

### Mobile Rules

- All inputs: minimum `font-size: 16px` — prevents iOS zoom on focus
- Pricing cards: `grid-cols-1` on mobile → `grid-cols-3` on `lg`
- Before/after pairs: horizontal scroll (`overflow-x-auto`) on mobile
- Navigation: hamburger menu with full-screen overlay
- WhatsApp button: always visible on mobile (highest priority CTA)
- Minimum touch target: 44×44px

---

## 10. Do Not List

| Never do this | Do this instead |
|---|---|
| Use Framer Motion | Use GSAP |
| Use Prisma | Use Drizzle |
| Use Supabase | Use Neon |
| Use teal/cyan/purple | Use `--accent` blue or `--amber` |
| Use white background on premium pages | Use `--bg-primary` or `--bg-card` |
| Use dark background on /briqly | Use `--smb-bg` white |
| Use gradients on text | Plain color fills only |
| Use box-shadow on card default state | Add shadow only on hover via GSAP |
| Use CSS `:hover` transforms on cards | Use `useGsapCardHover` |
| Use `useEffect` for GSAP | Use `useGSAP()` from `@gsap/react` |
| Use `rounded-full` on CTA buttons | Use `rounded-md` (6px) |
| Show WhatsApp button on main site | Show only on `/briqly` |
| Show Tidio chat on main site | Show only on `/briqly` |
| Use Inter or Roboto | Use Space Grotesk + DM Sans |
| Mix premium and SMB tone on same page | Strict visual separation |
