# BOSSA Weekend Fire Sales Funnel

Owner: Coach Sahid  
Brand: BOSSA Asado i Mar  
Primary offer: Weekend Fire take-out boxes  
Primary route: `/weekend-fire/deepseek-preview`  
Primary CTA: WhatsApp order

---

## 1. Funnel Goal

Turn BOSSA Weekend Fire content into a simple, trackable sales machine:

```txt
YouTube / Shorts / Reels / QR / Instagram
→ Weekend Fire landing page
→ WhatsApp order
→ Supabase lead
→ Admin lead dashboard
→ Follow-up owner
→ Revenue entry
→ Completed sale
```

The funnel should make it easy for locals, tourists, hotel guests, and Pietermaai visitors to understand the offer, choose a box, and order through WhatsApp.

---

## 2. Core Customer Journey

| Step | Customer Action | BOSSA System Response |
| --- | --- | --- |
| 1 | Sees video, QR, story, or post | Clear hook: Weekend Fire Boxes |
| 2 | Clicks landing page link | Opens BOSSA Weekend Fire page |
| 3 | Chooses box number | Box cards explain options quickly |
| 4 | Taps WhatsApp CTA | WhatsApp message opens with intent |
| 5 | Sends message | Lead captured by tracking system |
| 6 | BOSSA confirms | Owner follows up in `/admin/leads` |
| 7 | Customer pays / picks up | Revenue entered in dashboard |

---

## 3. Primary Links

### Landing Page

```txt
https://www.bossaasado.com/weekend-fire/deepseek-preview
```

### Direct WhatsApp Order

```txt
https://wa.me/59995230683?text=Hi%20BOSSA!%20I%20want%20to%20order%20a%20Weekend%20Fire%20box.
```

### Admin Dashboard

```txt
https://www.bossaasado.com/admin/leads
```

---

## 4. Traffic Sources

| Source | Content Type | CTA |
| --- | --- | --- |
| YouTube Shorts | 45–60 sec box promo | Order Weekend Fire |
| Instagram Reels | Fire box reveal | Tap link / WhatsApp |
| TikTok | Fast food montage | Order by box number |
| QR Flyer | Print / table / hotel desk | Scan to order |
| Hotel Partners | Guest recommendation | Reserve Weekend Fire |
| WhatsApp Status | Daily box alert | Reply to order |
| Google Business Profile | Menu/offer update | Visit page |

---

## 5. Offer Structure

| Box | Name | Price | CTA Intent |
| --- | --- | --- | --- |
| #1 | BOSSA Box Mix | ANG 49.50 | Best all-round intro box |
| #2 | Skewer Box | ANG 49.50 | Premium skewer box |
| #3 | Fire Bread Sandwich Box | ANG 49.50 | Sandwich variety |
| #4 | Community Fire Box | ANG 20.00 | Volume / local entry offer |
| #5 | Chicken Classic | ANG 49.50 | Family-style chicken |
| #6 | Ribs Classic | ANG 49.50 | Rib-focused box |
| #7 | Sea Box | Coming Soon | Future seafood demand |
| #8 | Local Fire Box | ANG 39.50 | Local pickup favorite |

---

## 6. YouTube Video Funnel

### Video Title

```txt
BOSSA Weekend Fire Boxes 🔥 | Curaçao Take-Out Grill Boxes Near Pietermaai
```

### Video Hook

```txt
Curaçao, your Weekend Fire Box is ready.
```

### Video CTA

```txt
Order by box number. Tap the link. Reserve Weekend Fire on WhatsApp.
```

### Description Link Order

1. Landing page
2. Direct WhatsApp order
3. Location near Pietermaai / Avila
4. Box list
5. Hashtags

---

## 7. Tracking Rules

Every key CTA should preserve tracking attributes where possible:

```tsx
data-track="whatsapp-click"
data-cta-source="weekend-fire"
data-cta-label="box-order"
data-offer-id="box-1"
```

Recommended CTA source values:

```txt
deepseek-preview
youtube-short
instagram-reel
qr-flyer
hotel-partner
whatsapp-status
```

Recommended CTA labels:

```txt
hero-order
floating-whatsapp
box-order
location-whatsapp
qr-order
hotel-order
```

---

## 8. Admin Dashboard Workflow

When a lead enters `/admin/leads`, BOSSA should update:

| Field | Meaning |
| --- | --- |
| Lead Status | New, Conversation Started, Confirmed, Deposit Paid, Completed, Lost |
| Owner | Coach Sahid, Manager, Kitchen, Sales, Events |
| Follow-Up Due | Next action time |
| Actual Value | Real sale amount |
| Currency | XCG / USD |
| Notes | Order details, pickup time, special context |

---

## 9. Daily Operating Routine

### Before service

```txt
□ Confirm available boxes
□ Confirm pickup hours
□ Post WhatsApp Status
□ Post Instagram Story
□ Check QR link
□ Open /admin/leads
```

### During service

```txt
□ Watch new leads
□ Assign owner
□ Confirm box number
□ Confirm pickup time
□ Mark status as Confirmed / Deposit Paid
```

### After service

```txt
□ Mark completed orders
□ Enter actual revenue
□ Mark lost/cancelled orders
□ Note top-selling boxes
□ Prepare next content hook
```

---

## 10. KPI Dashboard Targets

| KPI | Target |
| --- | --- |
| Landing page clicks | Increase weekly |
| WhatsApp clicks | 20+ per weekend |
| Confirmed orders | 10+ per weekend to start |
| Completed revenue | Track weekly |
| Best-selling box | Identify every weekend |
| Lost leads | Review why they did not convert |

---

## 11. Good / Better / Best Execution

### Good

Use the landing page and WhatsApp link in every post.

### Better

Use tracked links per channel:

```txt
?source=youtube
?source=instagram
?source=qr
?source=hotel
```

### Best

Create automated lead source dashboards:

```txt
YouTube → orders
Instagram → orders
QR → orders
Hotel partner → orders
```

Then use the data to decide where to post and which box to promote.

---

## 12. Next Actions

```txt
1. Test all WhatsApp CTAs on the preview page
2. Confirm one test lead appears in /admin/leads
3. Create YouTube Shorts video
4. Add landing page link to video description
5. Create QR code for the landing page
6. Place QR on flyer / counter / hotel partner sheet
7. Review dashboard after first weekend campaign
```

---

## 13. Decision Log

| Decision | Status | Notes |
| --- | --- | --- |
| Use Weekend Fire preview as campaign page | Active | Current route: `/weekend-fire/deepseek-preview` |
| Use WhatsApp as primary checkout | Active | Fastest conversion path |
| Use Supabase/admin dashboard for follow-up | Active | Tracks leads and sales |
| Promote preview to `/weekend-fire` | Pending | Decide after live testing |
| Add QR flyer | Recommended | High-value for hotels and Pietermaai traffic |
