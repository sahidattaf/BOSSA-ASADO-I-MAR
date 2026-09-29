# BOSSA Asado i Mar — Design System

A premium Caribbean fire-grill restaurant brand in **Pietermaai, Curaçao**. This
design system captures BOSSA's visual language — charcoal & ember, wood-fired
warmth, sea-breeze accents, and a relentless WhatsApp-first call to action — so any
agent can produce on-brand menus, flyers, social posts, posters and pitch material.

- **Website:** https://www.bossaasado.com
- **Source repo:** https://github.com/sahidattaf/BOSSA-ASADO-I-MAR *(Next.js public site + AI hospitality OS — explore it for fuller context on copy, menu data and page structure)*
- **WhatsApp / phone:** +5999 523 0683 · **Address:** Oranjestraat 116, Pietermaai, Willemstad, Curaçao
- **Hours:** Thursday–Sunday · 12:00 PM – 10:00 PM · take-out / weekend fire batches

Tokens, colors and surface treatments were lifted directly from the live
`app/globals.css` in that repo; menu items, prices and voice from `app/data/menu.ts`
and `app/data/site.ts`.

---

## Content fundamentals

**Voice:** warm, confident, energetic, hospitable — never corporate. BOSSA speaks
like a pitmaster who loves their craft and their island.

- **Casing:** big statements in ALL-CAPS condensed display ("WEEKEND FIRE BOX",
  "ROASTED BY FIRE"); descriptions in warm sentence case.
- **Person:** addresses the guest directly ("Send your guests to the fire") and
  speaks as a confident "we" ("when the fire rests, we close").
- **Signature lines:** *"Roasted by fire. Served with soul."* · *"Fire · Flavor ·
  Sea · Caribbean Soul"* · *"Limited batches — when the fire rests, we close."*
- **Recurring vocabulary:** fire, flame, wood-fired, smoke, ember, fire box, fire
  bread, BOSSA jus, Caribbean soul, Pietermaai, Curaçao, weekend, hotel partners,
  fresh grill, hospitality.
- **Emoji:** the 🔥 flame is a genuine brand device (status, bullets, step rows) —
  used deliberately, not decoratively. 💬 marks WhatsApp / phone. Sparing use of
  food emoji is acceptable on casual local menus but avoid clutter.
- **Prices:** Curaçao guilder, written `XCG 49.50`. Always gold or in an ember pill.
- **CTA discipline:** every customer-facing surface ends in a WhatsApp action.
- **Avoid:** cold corporate language, fake awards/Michelin claims, luxury
  real-estate tone, over-promising.

---

## Visual foundations

- **Palette:** warm charcoal base (`#120d0a`) under a fixed radial ember wash;
  **ember orange `#ff6a1a`** is the primary brand color; **fire gold `#f3b35b`**
  carries headings, prices and accents; **cream `#fff7ed`** is primary text, **sand
  `#d7c3ad`** is muted body; **sea blue `#44c7c4`** is a rare cool accent (used
  sparingly — the brand is warm). Deep brown `#3a2416` evokes wood.
- **Backgrounds:** never flat black — a `radial-gradient` ember glow at top-left over
  a charcoal→near-black diagonal (`--bg-wash`), applied fixed. Cards use a subtle
  white glass gradient. Cinematic full-bleed food/venue photography anchors heroes.
- **Type:** condensed display (**Anton**) for punchy ALL-CAPS titles; an elegant
  high-contrast serif (**Cormorant Garamond**, often italic) for dish names and
  taglines — matching the "BOSSA Fire Ribs" marketing lockup; clean **Mulish** for
  body and UI. *(Webfont substitutions — see Fonts below.)*
- **Corner radii:** pills (`999px`) for buttons, badges, prices and box numbers;
  `26px` cards; `32px` hero image wells; `12–20px` inner media.
- **Shadows:** deep soft drop (`0 24px 70px rgba(0,0,0,.38)`); ember-tinted shadow on
  primary buttons; a soft fire **glow** (`0 24px 80px rgba(255,106,26,.12)`) on
  featured cards.
- **Borders:** hairline cream lines at 14% opacity; featured elements switch to an
  ember border at ~64%.
- **Imagery vibe:** warm, low-key, cinematic — real food in kraft boxes, live flame,
  wood stacks, golden-hour patio. No cold, blue, or obviously-AI imagery.
- **Hover:** buttons lift 1px and brighten (ember→`#ff7d35`); secondary/ghost gain a
  gold border. Links shift sand→gold.
- **Transparency & blur:** glass captions and floating UI use `rgba(18,13,10,.74)`
  + `backdrop-filter: blur(12px)`.
- **Layout rules:** `min(1120px, 100%-32px)` content column; fixed sticky WhatsApp
  pill bottom-right; generous 56–92px hero padding; 2–4 col responsive grids.
- **Motion:** restrained — 0.2s ease transitions on color/transform/border. No bounce,
  no infinite decorative loops.

---

## Iconography

BOSSA's icon language is intentionally minimal and emoji-led rather than a formal
icon set:

- The 🔥 **flame** emoji is the brand's working icon — fire-status, rule bullets,
  workflow steps. The 💬 speech bubble denotes WhatsApp/phone; 📍 location.
- The **flame & wave mark** (`assets/logo-mark.png`) is the geometric brand symbol
  (orange flame over a sea wave) and the only custom "icon" — use it where a compact
  logo is needed. The full **wordmark** lockup is `assets/logo-primary.png`.
- **QR codes** are generated on the fly via `api.qrserver.com` pointing at the
  WhatsApp link — used on flyers and posters.
- No icon font or SVG sprite ships in the source codebase, so none is bundled here.
  If a future surface needs a true line-icon set, substitute **Lucide** (CDN) at a
  ~1.75px stroke to stay warm and rounded — and flag the substitution.

---

## Fonts — substitution note

The live codebase renders body text in system **Arial** and flyer titles in
**Impact**. For a premium, rustic, webfont-portable system we substitute Google
Fonts: **Anton** (≈ Impact condensed display), **Cormorant Garamond** (elegant serif
accent), **Mulish** (clean body). If you have licensed brand fonts, drop the files in
and update `tokens/fonts.css` + `tokens/typography.css`. **Please confirm or send
preferred font files.**

---

## Index / manifest

**Root**
- `styles.css` — single entry point (consumers link this). `@import`s all tokens + base.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`, `base.css`.
- `assets/` — logos (`logo-primary.png`, `logo-mark.png`), food & venue photography,
  weekend-flyer reference.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `SKILL.md` — Agent-Skills wrapper.

**Components** (`window.<Namespace>` after the bundle loads)
- `components/core/` — `Button`, `Badge`, `Card`, `Eyebrow`, `WhatsAppButton`.
- `components/menu/` — `PriceTag`, `MenuItem`, `FireBoxCard`.

**UI kits**
- `ui_kits/weekend-fire/` — interactive recreation of the BOSSA site (home, fire-box
  grid + rules/QR, visit, order-on-WhatsApp modal).

**Templates** (copy-and-go marketing artifacts, `templates/<slug>/`)
- `instagram-post` (1080×1080) · `menu-card` (720×1020) · `fire-box-flyer`
  (1080×1350) · `hotel-partner-flyer` (900×1273) · `qr-ordering-poster` (900×1273) ·
  `pitch-slide` (1280×720).

---

## Caveats
- Fonts are substitutions (see above) — awaiting brand font confirmation.
- Photography is the supplied AI-generated set; swap in real shoot photos for
  production. QR codes resolve to the WhatsApp link via a third-party generator.
