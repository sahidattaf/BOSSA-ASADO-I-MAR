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

## Website Scope — Phase 1

The first version of the BOSSA website should launch with:

- Homepage
- Menu direction
- WhatsApp reservation CTA
- Events / rooftop storytelling
- AI Concierge placeholder
- Contact / location section

Future pages:

- `/menu`
- `/reserve`
- `/events`
- `/private-dining`
- `/ai-concierge`
- `/about`
- `/subscribe`

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
- [ ] Replace placeholder WhatsApp number with the real BOSSA number
- [ ] Add real opening hours
- [ ] Add final menu items and prices
- [ ] Add real images / video hero
- [ ] Add AI Concierge implementation
- [ ] Add Supabase reservation capture later

---

## Important Note

This is now the public website foundation. Keep internal SOPs, agent prompts, staff flows, and operating dashboards inside Notion unless they are safe to publish.
