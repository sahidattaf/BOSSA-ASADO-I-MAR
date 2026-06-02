# DeepSeek BOSSA Landing HTML → Next.js Conversion Plan

Owner: Coach Sahid
Repo: `sahidattaf/BOSSA-ASADO-I-MAR`
Source archive: `archive/html/bossaasado-landing-deepseek-20260602.html`
Target preview route: `app/weekend-fire/deepseek-preview/page.tsx`

---

## Goal

Convert the uploaded standalone BOSSA Weekend Fire landing page into a safe Next.js route without breaking the current production site, Supabase lead tracking, Vercel deployment, or admin CRM.

---

## Recommendation

Do not replace the current homepage with raw HTML.

The current repo already includes:

- Next.js app router
- Vercel production deployment
- Supabase lead capture
- Admin lead dashboard
- WhatsApp click tracking
- SEO metadata
- Data-driven menu structure
- Weekend Fire and Party/Event routes

The uploaded HTML should become a preview/design source first.

---

## Good / Better / Best

## Good

Archive the HTML and keep it as design reference.

Path:

```txt
archive/html/bossaasado-landing-deepseek-20260602.html
```

## Better

Create a safe preview route:

```txt
app/weekend-fire/deepseek-preview/page.tsx
```

Use current repo assets and production tracking attributes.

## Best

Extract the strongest design sections and merge them into the existing Weekend Fire page while keeping:

- Supabase lead tracking
- CTA tracking attributes
- SEO metadata
- Existing image paths
- No CDN Tailwind
- No inline browser scripts
- No placeholder images

---

## Uploaded HTML Elements to Convert

| HTML Section | Next.js Conversion |
| --- | --- |
| Sticky header | React header inside preview route |
| Hero | JSX hero section |
| 8 Fire Boxes Grid | Data array + `.map()` cards |
| Rules | Static JSX section |
| Operational Flow | Static JSX section |
| Location | Static JSX section |
| Newsletter CTA | WhatsApp CTA link |
| Modal | Prefer direct WhatsApp links first; modal can come later |
| JavaScript listeners | Replace with React-friendly links/buttons |
| CDN Tailwind | Replace with existing CSS/classes or scoped CSS module |
| Font Awesome icons | Replace with text/icon emojis or local SVG/lucide later |

---

## Asset Safety Check

The uploaded HTML references local PNG names such as:

```txt
bossa-box-mix.png.png
skewer-box.png.png
fire-bread-sandwich-box.png.png
community-fire-box.png.png
chicken-classic.png.png
ribs clasic live.png
sea-box-coming-soon.png.png
local-fire-box.png.png
```

Before using these exact names, verify they exist in the repo.

Current repo references known Weekend Fire assets through paths like:

```txt
/images/bossa/weekend-fire/box-1-bossa-box-mix.png
/images/bossa/weekend-fire/box-7-sea-box-coming-soon.png
```

Use existing repo asset paths when possible. Do not add duplicate PNG files unless a missing visual is required.

---

## Safe Image Mapping Draft

| Box | Uploaded HTML name | Preferred repo path |
| --- | --- | --- |
| #1 BOSSA Box Mix | `bossa-box-mix.png.png` | `/images/bossa/weekend-fire/box-1-bossa-box-mix.png` |
| #2 Skewer Box | `skewer-box.png.png` | Verify existing file before use |
| #3 Fire Bread Sandwich | `fire-bread-sandwich-box.png.png` | Verify existing file before use |
| #4 Community Fire Box | `community-fire-box.png.png` | Verify existing file before use |
| #5 Chicken Classic | `chicken-classic.png.png` | Verify existing file before use |
| #6 Ribs Classic | `ribs clasic live.png` | Verify existing file before use |
| #7 Sea Box Coming Soon | `sea-box-coming-soon.png.png` | `/images/bossa/weekend-fire/box-7-sea-box-coming-soon.png` |
| #8 Local Fire Box | `local-fire-box.png.png` | Verify existing file before use |

---

## CTA Tracking Rules

All WhatsApp links must preserve BOSSA tracking attributes:

```tsx
data-track="whatsapp-click"
data-cta-source="deepseek-preview"
data-cta-label="box-order"
data-offer-id="box-1"
```

This keeps the CRM pipeline working:

```txt
CTA click → /api/leads → Supabase → /admin/leads
```

---

## Proposed Data Shape

```ts
type FireBox = {
  number: string;
  name: string;
  description: string;
  price: string;
  image: string;
  status: 'active' | 'coming_soon';
  note: string;
};
```

---

## Preview Route Build Plan

Create:

```txt
app/weekend-fire/deepseek-preview/page.tsx
```

Include:

1. Local data array for 8 boxes
2. Hero section
3. Box grid
4. Rules section
5. Operational flow
6. Location section
7. WhatsApp CTA links with tracking attributes
8. Scoped styles inside the page or use existing global classes

---

## Test Checklist

Before promoting to production:

```txt
1. npm run build passes
2. /weekend-fire/deepseek-preview loads
3. All images load
4. WhatsApp CTAs open correct message
5. CTA click creates Supabase lead
6. /admin/leads shows new lead
7. No fake admin leads are created
8. Mobile layout is clean
9. No CDN dependency is required
10. No placeholder picsum image remains
```

---

## Decision Log

| Decision | Status | Notes |
| --- | --- | --- |
| Archive raw HTML | Done | Keep as source reference |
| Convert raw HTML directly to homepage | Rejected | Too risky while CRM is active |
| Build preview route first | Recommended | Safe comparison path |
| Use existing repo PNGs | Recommended | Avoid duplicate assets |
| Preserve tracking attributes | Required | Keeps BOSSA CRM alive |

---

## Next Step

Build the preview route:

```txt
app/weekend-fire/deepseek-preview/page.tsx
```

Then compare visual quality with:

```txt
/weekend-fire
```

and decide which sections to promote.
