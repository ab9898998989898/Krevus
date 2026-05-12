# Krevus — Animation & Copy Enhancement Prompt

> **How to use:** After the initial build is done, paste this as a new message in your AI IDE session. It upgrades the existing site with richer copy, more sections, and significantly more advanced GSAP animations.

---

## Paste this as your message:

---

The Krevus website has been built following the PRD. Now we are upgrading it with significantly richer copy, more page sections, and advanced GSAP animations throughout. This is a visual and content upgrade — do not change any stack decisions, routes, or database schema.

Read the existing `DESIGN.md` and `PRD.md` before making changes. All color, font, and spacing decisions remain the same.

---

## PART 1 — ADVANCED GSAP ANIMATIONS

Add these new animations on top of the existing 10 hooks. Upgrade existing pages first, then add new sections.

---

### NEW HOOK: `useGsapTextScramble(ref)`

```typescript
// A text scramble effect on headings — characters randomise then resolve to final text
// Trigger: ScrollTrigger OR on mount for hero
// Characters cycle through: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
// Duration per character: 40ms cycling, total resolve time: 800ms
// Use on: section headings ONLY (h2 elements), not body text
// Effect: heading appears to "decode" into its final text — subtle, not chaotic
// Implementation:
useGSAP(() => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%'
  const original = el.textContent
  let iteration = 0
  const interval = setInterval(() => {
    el.textContent = original.split('').map((char, i) => {
      if (i < iteration) return original[i]
      return chars[Math.floor(Math.random() * chars.length)]
    }).join('')
    if (iteration >= original.length) clearInterval(interval)
    iteration += 1/3
  }, 40)
}, { scope: ref })
```

Apply to: All H2 section headings on homepage, all industry page H1s

---

### NEW HOOK: `useGsapRevealMask(ref)`

```typescript
// A reveal-from-mask effect — content appears to slide out from behind a solid panel
// The mask slides away (x: 0 → 100%) revealing the content underneath
// Use on: case study cards, feature highlights, before/after images
// Implementation:
// 1. Wrap target in a div with overflow:hidden position:relative
// 2. Add a ::after pseudo element (or a sibling div) as the mask — bg: var(--accent)
// 3. On scroll enter: gsap.timeline()
//    .to(mask, { x: '100%', duration: 0.6, ease: 'power3.inOut' })
//    .from(content, { opacity: 0, duration: 0.3 }, '-=0.2')
// Duration: 0.6s for mask slide, ease: 'power3.inOut'
```

Apply to: Case study cards on index page, industry solution blocks

---

### NEW HOOK: `useGsapFloatingElements(containerRef)`

```typescript
// Subtle continuous floating animation on decorative elements
// Elements gently bob up and down — organic, not mechanical
// Use on: background decorative shapes, icon elements, stat numbers
// Implementation:
gsap.to(elements, {
  y: -12,
  duration: 2.5,
  ease: 'sine.inOut',
  stagger: { each: 0.4, from: 'random' },
  repeat: -1,
  yoyo: true,
})
// Elements never stop — they float continuously while page is visible
```

Apply to: Abstract geometric background shapes on hero section, decorative accent elements

---

### NEW HOOK: `useGsapStaggerWords(ref)`

```typescript
// Every word in a paragraph animates in individually from bottom
// More dramatic than the hero reveal — used for key statement paragraphs
// Trigger: ScrollTrigger, start: 'top 78%'
// Effect: each word — y:30 opacity:0 → y:0 opacity:1
// Duration: 0.45s per word, stagger: 0.04s, ease: 'power2.out'
// Use SplitText with type: 'words'
```

Apply to: The main sub-headline on each industry page, the "result" text in case study cards

---

### NEW HOOK: `useGsapGlowPulse(ref)`

```typescript
// A subtle pulsing glow effect on accent elements
// Creates a breathing glow on accent-colored borders and icons
// Implementation:
gsap.to(element, {
  boxShadow: '0 0 24px rgba(61, 90, 254, 0.4)',
  duration: 1.8,
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true,
})
// On hover: intensify glow immediately via mouseenter handler
```

Apply to: Service card left borders on hover, the primary CTA button, stat numbers

---

### NEW HOOK: `useGsapHorizontalScroll(ref)` — /briqly only

```typescript
// Horizontal scroll section for before/after showcase
// The section pins while user scrolls vertically — content moves horizontally
// Implementation using ScrollTrigger pin + horizontal movement:
gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: () => `+=${track.scrollWidth - window.innerWidth}`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
  },
})
// Mobile: disable — show normal vertical scroll grid
// Add progress indicator at bottom (thin line that grows as user scrolls)
```

Apply to: Before/after portfolio section on /briqly page

---

### NEW HOOK: `useGsapTypewriter(ref)` — Hero subtitle

```typescript
// Types out the sub-headline character by character using TextPlugin
// After hero word reveal completes, sub-headline types itself
// Duration: each character adds over 800ms total
// Cursor blink: add blinking | cursor that disappears after typing completes
gsap.to(el, {
  text: {
    value: fullText,
    delimiter: '',
  },
  duration: 0.8,
  ease: 'none',
  delay: 1.2, // after headline reveal finishes
})
```

Apply to: Homepage hero sub-headline ONLY

---

### UPGRADE: `useGsapHeroReveal` — Add background animation

Upgrade the existing hero reveal to include:
```typescript
// Simultaneously with text reveal:
// 1. Background dot grid fades from opacity:0 → 0.06 over 1.2s
// 2. 3 geometric shapes (CSS-drawn pentagons/lines) float in from outside viewport
//    Shape 1: top-right, enters x:200→0 opacity:0→0.04 over 1.5s
//    Shape 2: bottom-left, enters x:-150→0 opacity:0→0.03 over 2s  
//    Shape 3: center-right, y:100→0 opacity:0→0.05 over 1.8s
// These shapes are pure CSS — border-only, no fill, very faint
// They continue floating after appear via useGsapFloatingElements
```

---

### UPGRADE: Page Scroll Progress Indicator

```typescript
// Add a thin 2px progress bar at the very top of the page
// Color: var(--accent) blue gradient
// Grows from width:0 to width:100% as user scrolls page
// Implementation:
gsap.to(progressBar, {
  scaleX: () => window.scrollY / (document.body.offsetHeight - window.innerHeight),
  ease: 'none',
  scrollTrigger: {
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0,
    onUpdate: (self) => gsap.set(progressBar, { scaleX: self.progress }),
  },
})
// transform-origin: left center
// Apply to ALL pages
```

---

### UPGRADE: Cursor Enhancement

```typescript
// Custom cursor — replaces default on desktop only (never on mobile)
// Outer ring: 32px circle, border 1.5px solid var(--accent), opacity:0.6
// Inner dot: 6px filled circle, bg var(--accent)
// Follows mouse with lag: outer ring has 0.12s delay, inner dot is instant
// On hover over clickable elements:
//   - outer ring scales to 2x and opacity drops to 0.3
//   - inner dot scales to 1.5x
// On hover over cards:
//   - outer ring fills with var(--accent) at 10% opacity
//   - text "VIEW →" appears inside cursor ring
// Implement entirely with GSAP — no CSS cursor:none alternative
// On mobile/touch devices: disable completely, show default cursor
```

---

## PART 2 — COPY UPGRADES

### Homepage — Additional Sections to Add

**Add after Services Strip and before Industries Block:**

#### SECTION: "The Problem We Solve"

```
Section label: WHAT WE FIX
Heading: "High-trust industries run on outdated infrastructure."

Three problem cards (icon + heading + 2 sentences):

Card 1 — Tax & CPA Firms:
Icon: FileWarning
Heading: "Documents still travel by email."
Body: "Every PDF sent to a client is a compliance risk, a support ticket, and a delay. Your clients deserve better than an attachment buried in an inbox."

Card 2 — Fintech Companies:
Icon: Clock
Heading: "Internal tools take 6 months to ship."
Body: "Your engineers are building dashboards instead of your product. Meanwhile, decisions are made on spreadsheets that shouldn't exist."

Card 3 — Real Estate:
Icon: PhoneMissed
Heading: "Leads die after business hours."
Body: "73% of buyers work with the first agent who responds. If your team isn't available at 9pm on a Sunday, your competitor's AI is."

Animation: useGsapRevealMask on each card as it enters viewport
```

---

**Add after Industries Block:**

#### SECTION: "How It Works" (Premium)

```
Section label: THE PROCESS
Heading: "We move fast. We build right. We don't disappear after launch."

Four steps in horizontal timeline on desktop, vertical on mobile:

Step 1 — Discovery (Day 1–3):
"We spend time understanding your operation, your pain points, and what success looks like. Most agencies skip this. We don't."

Step 2 — Architecture (Day 4–7):
"We design the system before writing a line of code. Every portal, automation, and dashboard is planned to the component level before development begins."

Step 3 — Build (Week 2–5):
"Weekly progress updates. You see the product being built — no black boxes, no surprises. We iterate with your feedback in real time."

Step 4 — Launch & Support (Week 6+):
"Deployment, documentation, and 30 days of free support. Your team gets trained. The system runs without us."

Animation: useGsapFadeIn stagger + step number useGsapCounter effect
```

---

**Add before the CTA banner at bottom of homepage:**

#### SECTION: "Why Krevus"

```
Section label: THE DIFFERENCE
Heading: "We're not a generalist agency. We're specialists."

Left side — large statement text (40px, Space Grotesk):
"Most agencies learn your industry during your project.
We already know it before you contact us."

Right side — 4 comparison rows:

Row 1:  Generic agencies    →    Krevus
        "Learn as they go"  →    "Industry-specific from day one"

Row 2:  Generic agencies    →    Krevus
        "Pretty websites"   →    "Systems that generate revenue"

Row 3:  Generic agencies    →    Krevus
        "Disappear at launch" →  "30 days support post-launch"

Row 4:  Generic agencies    →    Krevus
        "One size fits all" →    "Built for your compliance requirements"

Animation: useGsapStaggerWords on the large left statement
           Comparison rows: slide in from right with stagger
```

---

### Industry Pages — More Copy Per Page

**Add to each industry page after "Our Solution":**

#### Tax & CPA Firms — Add "What You Get" Section

```
Section heading: "Everything your clients need. Nothing they don't."

Four feature blocks with icons:

1. Encrypted Upload Portal
"Clients upload documents directly to a secure portal. 
AES-256 encryption. No email. No USB drives. No risk."

2. Admin Dashboard
"Your team sees every document the moment it arrives. 
Filter by client, status, and date. Full audit trail built in."

3. Client Notifications
"Automatic email confirmations when documents are received, 
reviewed, and completed. No more client emails asking 'did you get it?'"

4. Custom Branding
"Your logo, your colors, your domain. Clients never know 
what technology runs underneath — they just see your firm."
```

**Add to Fintech page:**

```
Section heading: "What we build for fintech teams."

1. Finance Dashboards
"Real-time P&L, cash flow, and KPI dashboards that connect 
directly to your data sources. Built in weeks, not months."

2. Data Connection Infrastructure  
"API integrations between your banking partners, payment processors, 
and internal systems. Clean data flowing where it needs to go."

3. Compliance-Ready Architecture
"Every system we build is designed with audit trails, role-based access, 
and data residency in mind from line one."

4. AI Automation Layer
"Automated reporting, anomaly detection, and client communication 
running 24/7 without your team lifting a finger."
```

**Add to Real Estate page:**

```
Section heading: "What your competitors are already using."

1. Real-Time Property Portal
"Clients log in and see live updates on their listings, offers, 
documents, and next steps. No more 'what's the status?' calls."

2. AI Lead Qualification
"Every inbound lead is contacted, qualified, and scheduled 
within 2 minutes — whether it's 2pm or 2am."

3. Document Management
"Contracts, disclosures, and agreements handled in one place. 
E-signature ready. Compliance built in."

4. Team Dashboard
"Your entire team's pipeline, appointments, and client 
communications visible in one place. No spreadsheets."
```

---

### /briqly Page — More Copy Sections

**Add after How It Works, before Industries Grid:**

#### SECTION: "What Your New Site Does"

```
Background: --smb-bg-section (#F8F9FA)
Heading: "Not just a website. A 24/7 salesperson."

Three cards with amber icons:

Card 1 — Shows Up on Google
"We optimise every site for local search. 
When someone searches '[your business] in [your city]', 
you show up. Not your competitor."

Card 2 — Works on Every Phone
"100% of your visitors are on mobile. 
Your new site loads in under 2 seconds and 
looks perfect on every screen size."

Card 3 — Gets You Contacted
"Click-to-call buttons, WhatsApp links, 
contact forms, and booking integration. 
We make it effortless for customers to reach you."
```

---

**Add after the industries grid:**

#### SECTION: "What Our Clients Say" (Placeholder)

```
Note to developer: Only render this section if testimonials array has items.
Default: hide section entirely.
When first 3 real clients provide testimonials, add:

Testimonial card structure:
- Quote text (italic, 18px)
- Business name + city
- Star rating (5 stars)
- Amber quote mark decoration

Code the section now but leave testimonials array empty: 
const testimonials = []
{testimonials.length > 0 && <TestimonialsSection data={testimonials} />}
```

---

**Add below FAQ on /briqly pricing section:**

#### SECTION: Guarantee Block

```
Background: amber (#F0A500), white text
Large icon: shield
Heading: "7-Day Delivery. Guaranteed."
Body: "If we don't deliver your website within the agreed timeline, 
you get a full refund. No questions asked. We've never had to pay one."
CTA: "Hold Us To It" → /briqly#briqly-contact
Animation: useGsapGlowPulse on the shield icon (amber glow version)
```

---

## PART 3 — ADDITIONAL VISUAL DETAILS

### Hero Background Enhancement

Replace the simple dot grid with a more sophisticated background:

```typescript
// Animated gradient mesh in hero background
// 3 radial gradients that move slowly in different directions
// Colors: very dark versions of --accent (5-8% opacity max)
// Implementation: CSS custom properties animated with GSAP

const gradients = [
  { x: '20%', y: '30%', color: 'rgba(61,90,254,0.07)' },
  { x: '80%', y: '60%', color: 'rgba(61,90,254,0.04)' },
  { x: '50%', y: '90%', color: 'rgba(61,90,254,0.05)' },
]

// Each gradient slowly moves to a new position over 8-12 seconds
// Loop infinitely — very slow, barely perceptible
// Creates a sense that the background is alive
```

### Section Transition Lines

```typescript
// Between every two sections, add an animated divider line
// Line draws from left to right as user scrolls past it
// Width: 100%, Height: 1px, Color: rgba(255,255,255,0.06)
// GSAP: scaleX 0→1, transformOrigin: left, ScrollTrigger scrub:1
// Adds visual rhythm between sections without using heavy separators
```

### Number Count-Up Enhancement

```typescript
// Upgrade existing useGsapCounter to include:
// 1. Number odometer effect — digits roll like a slot machine
// 2. Brief scale pulse when counter reaches final value:
//    gsap.to(el, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1 })
// 3. Color shift on complete: number briefly brightens to pure white
```

---

## PART 4 — DOMAIN UPDATE

Update all references from `krevus.com` to `krevus.org`:

```bash
# Files to update:
# - app/layout.tsx (metadata base URL)
# - All generateMetadata() calls
# - next-sitemap.config.js (siteUrl)
# - .env.local / .env.production (NEXT_PUBLIC_SITE_URL)
# - Footer copyright and links
# - og:url meta tags
# - canonical URLs
# - robots.txt

# Search and replace in entire project:
# "krevus.com" → "krevus.org"
```

---

## PART 5 — PERFORMANCE RULES FOR ANIMATIONS

These rules prevent animations from killing page performance:

```typescript
// 1. Lazy-load GSAP plugins — only import what each page needs
// 2. Use will-change: transform on animated elements — but remove after animation completes
//    gsap.set(el, { willChange: 'transform' })
//    animation.eventCallback('onComplete', () => gsap.set(el, { willChange: 'auto' }))

// 3. Horizontal scroll section: use contain: paint on the container
//    This prevents layout recalculation during scroll

// 4. All continuous animations (floating, glow pulse): 
//    pause when tab is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause()
  } else {
    gsap.globalTimeline.resume()
  }
})

// 5. ScrollTrigger.refresh() after any dynamic content loads
//    Prevents scroll position calculation errors

// 6. Batch ScrollTriggers where possible:
ScrollTrigger.batch(cards, {
  onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1 }),
  start: 'top 85%',
})
// ScrollTrigger.batch is more performant than individual triggers on card grids
```

---

## Implementation Order

1. Add all new GSAP hooks to `/hooks`
2. Add custom cursor component — test on desktop only
3. Add scroll progress bar to root layout
4. Upgrade hero background (gradient mesh + floating shapes)
5. Add "The Problem We Solve" section to homepage
6. Add "How It Works" section to homepage
7. Add "Why Krevus" section to homepage
8. Update all three industry pages with new sections
9. Add /briqly new sections (What Your Site Does, Guarantee block)
10. Apply useGsapTextScramble to all H2 headings
11. Apply useGsapRevealMask to case study and feature cards
12. Apply useGsapGlowPulse to accent elements
13. Add horizontal scroll to /briqly before/after section
14. Add section transition lines throughout
15. Update all domain references from .com to .org
16. Performance audit — test with DevTools Performance panel
17. Lighthouse re-audit — maintain 90+ desktop, 85+ mobile
