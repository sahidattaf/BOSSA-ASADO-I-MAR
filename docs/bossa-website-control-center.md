# BOSSA Website Control Center

**Owner:** Sahid Attaf  
**Status:** Draft control layer  
**Last updated:** 2026-05-21  
**System:** BOSSA Asado i Mar Website OS  
**Repo:** `sahidattaf/BOSSA-ASADO-I-MAR`

---

## Purpose

This page is the operating control layer for the BOSSA public website. It connects the live website, Notion content source, menu updates, Weekend Fire flyer system, WhatsApp order flow, audio, videos, and future Stripe payment/deposit buttons.

The rule is simple:

```text
Notion plans the content.
GitHub stores the public website source.
Vercel deploys the website.
WhatsApp closes the order.
Stripe collects deposits once approved.
```

---

## Current website routes

| Route | Purpose | Owner action |
| --- | --- | --- |
| `/` | Homepage, brand story, menu preview, order/reserve/party flow | Keep clean and conversion-focused |
| `/weekend-fire` | Weekend Fire public order page | Keep Box #1–#8 updated |
| `/weekend-fire/customize` | Internal flyer customizer | Use for PNG, PDF, and offline HTML exports |
| `/party-menu` | Party / Events quote flow | Use for group orders and future event deposits |

---

## Source-of-truth map

| Website area | Source of truth | Website file |
| --- | --- | --- |
| Homepage hero/copy | BOSSA Website Control Center | `app/page.tsx` |
| Menu blocks | BOSSA Notion Menu → cleaned website data | `app/data/menu.ts` |
| Weekend Fire boxes | Weekend Fire final flyer copy | `app/weekend-fire/page.tsx` |
| Flyer customizer | Weekend Fire flyer system | `app/weekend-fire/customize/EditableWeekendFlyer.tsx` |
| Party / events | Party/Event package plan | `app/party-menu/page.tsx` |
| Audio | Public audio asset | `public/audio/bossa/sabor-di-bossa-papiamentu.mp3` |
| Video | YouTube embed links | `app/page.tsx`, `app/weekend-fire/page.tsx`, `app/party-menu/page.tsx` |
| Product images | Final BOSSA image assets | `public/images/bossa/` |
| Stripe links | Stripe dashboard / payment links | Future env/data file, no secrets |

---

## Homepage Control

### Current homepage goal

Move visitors into one of three actions:

1. Order Weekend Fire boxes
2. Reserve/contact BOSSA on WhatsApp
3. Request a party or event quote

### Homepage checklist before publishing changes

- [ ] Hero image loads
- [ ] Main CTA opens WhatsApp
- [ ] Weekend Fire CTA opens `/weekend-fire`
- [ ] Party/Event CTA opens `/party-menu`
- [ ] Audio block plays
- [ ] YouTube videos load
- [ ] Menu blocks show clean prices
- [ ] Mobile layout is clean
- [ ] Sticky WhatsApp button still works if present

### Homepage fields to control

| Field | Current value | Change location |
| --- | --- | --- |
| Hero badge | Pietermaai · Opposite Avila Hotel · Curaçao | `app/page.tsx` |
| Main headline | Wood fire dining with Caribbean soul. | `app/page.tsx` |
| WhatsApp number | +5999 523 0683 | `app/page.tsx` |
| Hero image | `bossa-hero-pietermaai-business-hub.jpg` | `public/images/bossa/` |
| Audio | `sabor-di-bossa-papiamentu.mp3` | `public/audio/bossa/` |
| YouTube videos | `fin2x52-A6Y`, `wxO63r9nkHs` | `app/page.tsx` |

---

## Weekend Fire Control

### Current Weekend Fire rules

- Take-out only
- Limited batches
- Order by box number
- WhatsApp confirmation first
- PNG is for phone/WhatsApp/Canva
- PDF is for print
- Offline HTML is for future editing backup

### Weekend Fire box map

| Box | Name | Price | Image |
| --- | --- | --- | --- |
| #1 | BOSSA Box Mix | XCG 49.50 | `box-1-bossa-box-mix.png` |
| #2 | Skewer Box | XCG 49.50 | `box-2-skewer-box.png` |
| #3 | Fire Bread Sandwich Box | XCG 49.50 | `box-3-fire-bread-sandwich-box.png` |
| #4 | Community Fire Box | XCG 19.50 | `box-4-community-fire-box.png` |
| #5 | Chicken Classic | XCG 49.50 | `box-5-chicken-classic.png` |
| #6 | Ribs Classic | XCG 49.50 | `box-6-ribs-classic.png` |
| #7 | SEA BOX Coming Soon | XCG 99.50 | `box-7-sea-box-coming-soon.png` |
| #8 | Local Fire Box | XCG 6+ | `box-8-local-fire-box.png` |

### Weekend Fire update checklist

- [ ] Update copy in `app/weekend-fire/page.tsx`
- [ ] Update flyer customizer if internal flyer should match
- [ ] Update menu data if homepage menu should match
- [ ] Confirm all images exist in `public/images/bossa/weekend-fire/`
- [ ] Test WhatsApp order button per box
- [ ] Export PNG
- [ ] Export PDF
- [ ] Export offline HTML
- [ ] Save final assets in local BOSSA Weekend Fire Final folder

---

## Party / Event Control

### Current package types

| Package | Purpose | Payment readiness |
| --- | --- | --- |
| Weekend Fire Box Bundle | Group pickup and beach groups | Deposit ready later |
| Skewer Party Platter | Birthdays, rooftop nights, team gatherings | Quote first |
| Fire Bread Sandwich Tray | Content shoots and late-night groups | Quote first |
| Fire & Sea Event Box | Premium seafood/sunset specials | Coming soon |

### Party quote WhatsApp fields

```text
Bon dia BOSSA, I want a party / event quote.
Date: ___
Group size: ___
Pickup/event time: ___
Package preference: ___
Budget: ___
```

### Party/Event checklist

- [ ] Package names are clear
- [ ] Prices do not overpromise if quote-based
- [ ] WhatsApp quote CTA works
- [ ] Images match package promise
- [ ] Audio block works
- [ ] Videos load
- [ ] Deposit rules are clear before Stripe links go live

---

## Audio & Video Control

### Audio

| Asset | Location | Usage |
| --- | --- | --- |
| Sabor di BOSSA — Papiamentu | `public/audio/bossa/sabor-di-bossa-papiamentu.mp3` | Homepage, Weekend Fire, Party/Event |

### YouTube videos

| Video | Embed URL | Usage |
| --- | --- | --- |
| Fire & Flavor Video | `https://www.youtube.com/embed/fin2x52-A6Y` | Homepage, Weekend Fire, Party/Event |
| Weekend Fire Video | `https://www.youtube.com/embed/wxO63r9nkHs` | Homepage, Weekend Fire, Party/Event |

---

## Payment Control — future Stripe layer

No Stripe payment links are live yet.

Planned buttons:

| Payment type | Suggested use | Status |
| --- | --- | --- |
| Weekend Fire preorder deposit | Reserve limited batch order | Planned PR #37 |
| Party/Event deposit | Lock group order/date | Planned PR #37 |
| Private catering deposit | Custom quote confirmation | Planned PR #37 |
| Full payment link | Optional later | Not first priority |

### Stripe safety rules

- Never commit Stripe secret keys
- Use Stripe Payment Links first
- Store public payment URLs only after approval
- Keep WhatsApp confirmation as the operational backup
- Human approval required before any payment link goes live

---

## Deployment checklist

Before merging any website PR:

- [ ] Confirm changed files only affect intended pages
- [ ] No secrets added
- [ ] No packages added unless explicitly needed
- [ ] Run local dev if possible
- [ ] Wait for Vercel Ready
- [ ] Test homepage
- [ ] Test Weekend Fire
- [ ] Test Party/Event
- [ ] Test mobile
- [ ] Merge only after visual QA

---

## Next roadmap

| PR | Name | Goal |
| --- | --- | --- |
| #36 | Control system | Create control docs and operating layer |
| #37 | Stripe money buttons | Add approved payment/deposit buttons |
| #38 | Notion → website automation | Build structured sync workflow from Notion to website data |
