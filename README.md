# BOSSA Asado i Mar — Public Website + AI Hospitality OS

BOSSA Asado i Mar is a Curaçao fire-grill restaurant concept built around smoke, sea, rooftop energy, WhatsApp-first reservations, and AI-powered hospitality.

**Official domain:** https://bossaasado.com  
**Repository:** https://github.com/sahidattaf/BOSSA-ASADO-I-MAR  
**Primary deployment target:** Vercel

---

## Current Build Status

This repo is being upgraded from a business codex repository into a deployable public website.

### Added for deployment

- `package.json` — Next.js project configuration
- `app/layout.tsx` — root layout + metadata
- `app/page.tsx` — first public BOSSA landing page
- `app/globals.css` — mobile-first styling
- `next.config.mjs` — Next.js config
- `.gitignore` — cleaned for Next.js + Vercel

---

## Website Scope — BOSSA V2

The public site is now being upgraded from a Phase 1 restaurant website into a multi-page hospitality revenue platform.

- Homepage
- Menu
- Weekend Fire Boxes
- Rooftop Lounge
- Catering
- Private Events
- Tourist Experiences
- Gallery
- About BOSSA
- Reviews
- Partners
- Contact
- AI Concierge placeholder

The first V2 pass is intentionally static: clear customer pages, SEO metadata, sitemap, robots rules, and WhatsApp CTAs before adding heavier backend capture.

---

## BOSSA V2 Revenue Flow

```text
Visitor lands
   ↓
Chooses intent
   ↓
Order / Reserve / Quote / Partner
   ↓
WhatsApp handoff
   ↓
Follow-up
   ↓
Revenue
```

Primary pages:

```text
/
/menu
/weekend-fire
/rooftop-lounge
/catering
/private-events
/tourist-experiences
/gallery
/reviews
/about
/partners
/contact
/ai-concierge
```

---

## Recommended Stack

```text
Notion = internal BOSSA operating system
GitHub = code source
Vercel = public website deployment
Cloudflare = DNS / domain control
Supabase = reservations, leads, chat history later
WhatsApp = fastest reservation CTA
```

---

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server locally:

```bash
npm start
```

### Lead Capture Environment

BOSSA V2.1 lead forms post to `app/api/leads/route.ts`.

Required for Notion lead storage:

```bash
NOTION_API_KEY=
NOTION_LEADS_DATABASE_ID=
```

Expected Notion database properties:

```text
Name
Phone
Email
Lead Type
Source Page
Event Date
Guest Count
Budget
Message
Status
Lead ID
```

If the Notion variables are missing, the API keeps the form safe and returns success while logging the lead server-side as a console fallback. No secret keys are exposed to the frontend.

---

## Deployment Flow

```text
VS Code / GitHub
   ↓
Vercel project import
   ↓
Preview deployment
   ↓
Connect bossaasado.com
   ↓
Production launch
```

---

## YouTube Content Operating System

BOSSA's YouTube channel is managed as an internal content-to-revenue workflow in Notion:

- **Channel:** BOSSA Asado i Mar
- **Positioning:** Live Fire Cooking • Curaçao Food & Travel
- **Tagline:** Fire, Flavors & the Sea
- **Primary CTA:** WhatsApp +5999 523 0683
- **Operating hub:** [BOSSA YouTube Live Cooking Content System](https://app.notion.com/p/38fa269fc947813fb986fc250dc16d76)

Operating model:

```text
Cook once → Film once → Publish long-form → Repurpose Shorts/Reels/TikTok
→ Drive WhatsApp orders, reservations, and partner inquiries → Measure → Repeat
```

Keep production calendars, scripts, unpublished offers, analytics, partner pipelines, and agent prompts in Notion. Only public-safe channel links and approved media assets should be added to this repository.

## Source Documents

The original business codex remains in:

- `bossa_codex_plan.md`

The Notion system contains the fuller BOSSA operating structure, including:

- BOSSA Domain
- BOSSA Operations & Content Hub
- BOSSA Playbook
- BOSSA Agent / Sub-Agent Operating Logic
- AI Build Workflow OS

---

## Immediate Next Actions

- [ ] Connect this repo to a Vercel project
- [ ] Confirm the production domain mapping for `bossaasado.com`
- [x] Add BOSSA V2 static revenue pages
- [x] Add sitemap and robots rules
- [x] Hide `/weekend-fire/customize` from search indexing
- [ ] Add final menu items and prices
- [ ] Add real images / video hero
- [ ] Replace sample review layout with real Google / TripAdvisor / Instagram proof
- [ ] Add AI Concierge implementation
- [ ] Add Notion or Supabase lead capture later

---

## Important Note

This is now the public website foundation. Keep internal SOPs, agent prompts, staff flows, and operating dashboards inside Notion unless they are safe to publish.
