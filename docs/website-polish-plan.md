# Website Polish Plan — bossaasado.com

UX/UI audit of `app/page.tsx` and `app/reserve/page.tsx` (read from `origin/main` at `62b750a`) and the plan to make the site ready for real customers.

Rules that apply to every phase (from `AGENTS.md`): one branch/PR per phase, no direct push to `main`, content and price changes go through `content/notion/bossa-website-content.template.json` + `npm run generate:data` (never edit `app/data/*.ts`), customer-facing copy must not use internal/developer language.

## Audit findings

### Top 3 reasons the site looks unpolished

1. **Internal/developer language on customer pages** — "BOSSA V2" badge, "Clear revenue paths", "hospitality platform", "Choose the intent. BOSSA handles the flow", "Every major customer path now has… SEO metadata".
2. **Concept art instead of real photography** — the hero is a rooftop concept render, the catering section reuses the "Sea Box Coming Soon" image, and inline `<img>` tags have no width/height or lazy loading.
3. **Too many competing actions and a very long page** — four equal-weight hero buttons, the same paths repeated in several sections, an inline audio player, three video embeds and a full menu catalog.

### Mobile improvements

- One primary action in the hero, one or two secondary; move other links to the header and section nav.
- Sticky bottom WhatsApp button already exists (`.sticky-whatsapp` in `app/layout.tsx`); consider adding Reserve next to it.
- Tap targets at least 44px; stack hero buttons.
- Keep Catering visible on mobile; only collapse low-value sections.
- Click-to-load YouTube embeds and the audio player.
- `/reserve`: form first on mobile, check the language toggle does not overlap the title at 360px, native date/time inputs.
- Phone numbers as `tel:` links.

### Trust signals

| Signal | Status |
| --- | --- |
| Real food photos | Missing (box images and concept art only) |
| Real photos of the place | Missing (hero is a render) |
| Reviews / testimonials | `/reviews` exists but is not linked from home or `/reserve` |
| Map | Link to Google Maps only, no embed |
| Price range | Not stated on the home page |
| Hours | Shown only at the bottom of the home page (now also under the hero) |
| Social proof (Instagram, Google rating) | Missing |
| Reservation reassurance | Good on `/reserve` ("confirmed personally on WhatsApp") |

**Open question for the owner:** the Notion dashboard says BOSSA is NOT YET OPEN. Decide whether the site presents as open or "opening soon". Do not add reviews or ratings that are not real and verifiable.

## Plan

### Phase 0 — Prep
- [x] Sync local checkout to `origin/main`.
- [x] Owner decision: BOSSA is NOT YET OPEN. Site shows a "Grand Opening Coming Soon" banner, "Opening Soon" status and "Reserve for our Grand Opening" CTA. Flip `GRAND_OPENING_PENDING` in `app/data/opening-status.ts` to `false` on opening day.
- [ ] Collect 8–12 real photos (food, fire, building, team) into `public/images/bossa/` (lowercase, hyphens, no spaces).

### Phase 1 — Copy cleanup (`polish/home-copy-and-cta`)
- [x] Replace internal phrases in `app/page.tsx` with customer language (V2 badge, revenue paths, hospitality platform, choose the intent).
- [x] Show opening hours directly under the hero buttons.
- [x] Move hardcoded phone into `siteConfig` (`phoneDisplay` added to the content JSON, `app/data/site.ts` regenerated; footer, contact, party-menu, weekend-fire, reserve and home use `PhoneLink`). Hours already came from `siteConfig`.

### Phase 2 — Hero and calls to action (same branch)
- [x] Hero: one primary (Order on WhatsApp) plus Reserve a table and Weekend Fire Boxes; Catering and Menu remain in header/section nav.
- [x] Phone number on home and `/reserve` is a tappable `tel:` link.
- [x] Sticky CTA is now two buttons side by side: WhatsApp and Reserve.

### Phase 3 — Real imagery and trust (`feature/home-gallery-trust`)
- [ ] Replace the hero with a real photo, or clearly label the concept image and keep it secondary.
- [ ] Gallery strip on the home page linking to `/gallery`.
- [ ] Embedded Google Map next to address and hours.
- [ ] "Guests say" block with real reviews only; link to `/reviews`.
- [ ] Swap inline `<img>` for `next/image` with width/height.

### Phase 4 — Mobile performance (`polish/home-mobile-perf`)
- [ ] Click-to-load YouTube embeds and audio player.
- [ ] Keep Catering expanded on mobile; collapse only lower-value sections.
- [ ] `/reserve`: form first on mobile; test at 360px.

### Phase 5 — QA and release
- [ ] `npm run validate:content`, `npm run generate:data` (if content changed), `npm run build`.
- [ ] Walk through `docs/qa-checklist.md` on a real phone and on the Vercel preview.
- [ ] Open a PR per phase; no direct push to `main`.
