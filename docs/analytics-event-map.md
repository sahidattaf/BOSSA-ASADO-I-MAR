# BOSSA Analytics Event Map

Owner: Coach Sahid
Repo: `sahidattaf/BOSSA-ASADO-I-MAR`
Website: `bossaasado.com`
Purpose: Define the analytics events, funnel stages, tracking properties, KPIs, and reporting logic for BOSSA Asado i Mar.

---

## Purpose

This document turns the BOSSA website from a static marketing site into a measurable business funnel.

The goal is to answer:

```text
Where do visitors come from?
What do they click?
Which offers create WhatsApp leads?
Which campaigns create orders?
Which pages create party/event inquiries?
Where do customers drop off?
```

---

## Core Funnel

```text
Visitor lands on website
        ↓
Views offer or menu
        ↓
Clicks WhatsApp CTA
        ↓
Sends order / quote message
        ↓
BOSSA confirms availability
        ↓
Optional deposit/payment
        ↓
Order or event is completed
```

---

## Tracking Principles

1. Track business actions, not vanity clicks.
2. WhatsApp clicks are primary lead events.
3. Payment clicks are secondary and must follow confirmation-first policy.
4. Every campaign should use UTM parameters.
5. Every event should include page, offer, source, and intent when possible.
6. No private customer information should be sent into analytics tools.
7. Revenue tracking should be connected later through safe lead/order logging, not browser-only events.

---

## Recommended Analytics Stack

## Good

```text
Vercel Analytics
```

Use for:

- Page views
- Referrers
- Basic traffic
- Performance insight

## Better

```text
Vercel Analytics + custom CTA events
```

Use for:

- WhatsApp click tracking
- Payment click tracking
- Campaign CTA tracking

## Best

```text
Vercel Analytics + Supabase lead log + Notion weekly dashboard
```

Use for:

- Visitor source
- Lead intent
- Offer clicked
- WhatsApp lead status
- Deposit status
- Order status
- Revenue estimate
- Weekly marketing review

---

## Event Naming Rules

Use lowercase snake_case.

Good:

```text
whatsapp_home_click
whatsapp_weekend_fire_click
party_quote_click
stripe_deposit_click
menu_item_interest_click
customizer_start
customizer_submit
```

Avoid:

```text
Click Here
Button 1
User did something
Order click maybe
```

---

## Core Events

| Event Name | Funnel Stage | Trigger | Priority |
| --- | --- | --- | --- |
| `page_view_home` | Awareness | Homepage viewed | Medium |
| `page_view_weekend_fire` | Offer interest | Weekend Fire page viewed | High |
| `page_view_party_menu` | Event interest | Party page viewed | High |
| `whatsapp_home_click` | Lead | Homepage WhatsApp CTA clicked | High |
| `whatsapp_weekend_fire_click` | Lead | Weekend Fire order CTA clicked | Critical |
| `whatsapp_party_quote_click` | Lead | Party quote CTA clicked | Critical |
| `whatsapp_customizer_click` | Lead | Customizer WhatsApp handoff clicked | High |
| `stripe_deposit_click` | Payment intent | Deposit button clicked | High |
| `menu_item_interest_click` | Product interest | Menu item CTA clicked | Medium |
| `customizer_start` | Product config | Customer starts customizer | Medium |
| `customizer_submit` | Product config | Customer completes customizer | High |
| `video_play_click` | Engagement | Customer starts a video | Low |
| `audio_play_click` | Engagement | Customer starts audio | Low |
| `maps_click` | Location intent | Customer clicks map/location | Medium |
| `call_click` | Contact intent | Customer clicks phone/call | Medium |

---

## Event Property Standard

Every event should include as many of these as possible:

```ts
{
  page: string;
  section?: string;
  cta_label?: string;
  intent?: 'order' | 'reserve' | 'party_quote' | 'deposit' | 'menu_view' | 'customizer';
  offer?: string;
  item_name?: string;
  box_number?: string;
  price?: string;
  source?: string;
  campaign?: string;
  medium?: string;
  language?: 'en' | 'pap' | 'nl' | 'es';
}
```

Never send:

```text
Full customer name
Phone number
Private message text
Payment card information
Private customer notes
```

---

## Page Event Map

## Homepage `/`

| Event | Trigger | Properties |
| --- | --- | --- |
| `page_view_home` | Homepage loads | page `/` |
| `whatsapp_home_click` | Main WhatsApp CTA | intent `reserve` or `order` |
| `weekend_fire_cta_click` | Weekend Fire card/button | offer `weekend_fire` |
| `party_menu_cta_click` | Party/Event card/button | intent `party_quote` |
| `menu_item_interest_click` | Menu CTA clicked | item_name, section |
| `video_play_click` | Video play | media_id |
| `audio_play_click` | Audio play | media_id |

---

## Weekend Fire `/weekend-fire`

| Event | Trigger | Properties |
| --- | --- | --- |
| `page_view_weekend_fire` | Page loads | page `/weekend-fire` |
| `whatsapp_weekend_fire_click` | Order box CTA clicked | box_number, item_name, price |
| `customizer_start` | Customizer link clicked | offer `weekend_fire` |
| `stripe_weekend_deposit_click` | Weekend deposit clicked | payment_type `weekend_deposit` |
| `menu_item_interest_click` | Box details clicked | item_name, box_number |

---

## Customizer `/weekend-fire/customize`

| Event | Trigger | Properties |
| --- | --- | --- |
| `page_view_customizer` | Page loads | page `/weekend-fire/customize` |
| `customizer_start` | Customer starts customizer | offer `weekend_fire` |
| `customizer_option_select` | Option selected | option_type, option_value |
| `customizer_submit` | Customer generates/submits order | selected_items_count |
| `whatsapp_customizer_click` | WhatsApp handoff clicked | intent `order` |

---

## Party Menu `/party-menu`

| Event | Trigger | Properties |
| --- | --- | --- |
| `page_view_party_menu` | Page loads | page `/party-menu` |
| `whatsapp_party_quote_click` | Quote CTA clicked | package_name, intent `party_quote` |
| `stripe_event_deposit_click` | Event deposit clicked | payment_type `event_deposit` |
| `stripe_catering_deposit_click` | Catering deposit clicked | payment_type `catering_deposit` |
| `party_package_interest_click` | Package card clicked | package_name |

---

## UTM Tracking Standard

Every campaign link should include:

```text
utm_source
utm_medium
utm_campaign
```

Optional:

```text
utm_content
utm_term
```

Examples:

```text
https://bossaasado.com/weekend-fire?utm_source=instagram&utm_medium=social&utm_campaign=weekend_fire
https://bossaasado.com/party-menu?utm_source=hotel_partner&utm_medium=referral&utm_campaign=private_events
https://bossaasado.com/weekend-fire?utm_source=whatsapp&utm_medium=broadcast&utm_campaign=friday_fire_box
```

---

## Campaign Naming Rules

Use lowercase snake_case.

Examples:

```text
weekend_fire
friday_seafood
party_grill_package
hotel_guest_offer
pietermaai_lunch
holiday_fire_menu
```

---

## KPI Map

| KPI | Definition | Target |
| --- | --- | --- |
| Website visits | Total sessions/page views | Increase weekly |
| Weekend Fire page views | Visits to `/weekend-fire` | Increase before weekends |
| WhatsApp clicks | All WhatsApp CTA clicks | Primary lead metric |
| Weekend Fire WhatsApp clicks | Box/order CTA clicks | Primary order metric |
| Party quote clicks | Party CTA clicks | Event lead metric |
| Payment clicks | Stripe/deposit clicks | Secondary intent metric |
| Customizer completions | Completed customizer handoffs | Product interest metric |
| Conversion rate | WhatsApp clicks / page views | Improve weekly |
| Campaign CTR | Campaign visits to CTA clicks | Improve per campaign |
| Revenue estimate | Confirmed orders × average order value | Track manually or via lead log |

---

## Funnel Metrics

### Homepage Funnel

```text
homepage views
  ↓
main CTA clicks
  ↓
WhatsApp conversations
  ↓
confirmed orders/reservations
```

### Weekend Fire Funnel

```text
weekend_fire page views
  ↓
box CTA clicks
  ↓
WhatsApp order messages
  ↓
confirmed box orders
  ↓
revenue
```

### Party/Event Funnel

```text
party_menu page views
  ↓
quote CTA clicks
  ↓
WhatsApp event inquiries
  ↓
confirmed quote
  ↓
deposit paid
  ↓
event completed
```

---

## Lead Tracking Fields

If Supabase or Notion lead logging is added later, use:

```text
lead_id
created_at
source_page
utm_source
utm_medium
utm_campaign
utm_content
intent
offer
item_name
box_number
party_size
preferred_date
whatsapp_clicked
payment_clicked
lead_status
order_status
estimated_value
actual_value
notes
```

Recommended statuses:

```text
New
WhatsApp Clicked
Conversation Started
Confirmed
Deposit Pending
Deposit Paid
Completed
Lost
Cancelled
```

---

## Analytics Implementation Options

## Option A — Vercel Analytics Only

Best for quick setup.

Tracks:

```text
Page views
Referrers
Basic web performance
```

Limitation:

```text
Not enough for full order funnel tracking.
```

## Option B — Vercel Analytics + Custom Events

Best for practical BOSSA website tracking.

Tracks:

```text
CTA clicks
WhatsApp clicks
Payment clicks
Customizer events
Campaign clicks
```

## Option C — Supabase Lead Log + Analytics

Best for professional restaurant operations.

Tracks:

```text
Lead source
Lead intent
Offer clicked
Order status
Payment status
Revenue estimate
Weekly reports
```

---

## Recommended Event Helper

Future file:

```text
app/lib/analytics.ts
```

Suggested interface:

```ts
export type BossaEventName =
  | 'whatsapp_home_click'
  | 'whatsapp_weekend_fire_click'
  | 'whatsapp_party_quote_click'
  | 'whatsapp_customizer_click'
  | 'stripe_deposit_click'
  | 'menu_item_interest_click'
  | 'customizer_start'
  | 'customizer_submit'
  | 'maps_click';

export function trackBossaEvent(
  eventName: BossaEventName,
  properties: Record<string, string | number | boolean | null> = {},
) {
  // Route to Vercel Analytics, console in development, or future Supabase logging.
}
```

---

## Recommended CTA Tracking Pattern

Future component:

```text
app/components/TrackedLink.tsx
```

Purpose:

```text
Wrap important links and record an analytics event before navigation.
```

Example usage:

```tsx
<TrackedLink
  href={whatsappUrl}
  eventName="whatsapp_weekend_fire_click"
  eventProperties={{
    page: '/weekend-fire',
    intent: 'order',
    box_number: '1',
    item_name: 'BOSSA Box Mix',
    price: 'XCG 49.50',
  }}
>
  Order Box #1 on WhatsApp
</TrackedLink>
```

---

## Weekly Marketing Report

Every week, review:

```text
1. Top pages
2. Top traffic sources
3. WhatsApp clicks by page
4. Weekend Fire CTA clicks
5. Party quote clicks
6. Campaign performance
7. Payment/deposit clicks
8. Confirmed orders manually reported
9. Revenue estimate
10. Next campaign decision
```

Recommended weekly question:

```text
Which page or campaign created the most real WhatsApp conversations this week?
```

---

## Dashboard Recommendation

Create a Notion or Supabase dashboard with:

```text
Total visits
WhatsApp clicks
Weekend Fire leads
Party/Event leads
Payment clicks
Confirmed orders
Estimated revenue
Top campaign
Top source
Open follow-ups
```

---

## Privacy Rules

Do not send private customer info to browser analytics.

Allowed:

```text
page
campaign
offer
item name
box number
price label
intent
CTA label
```

Not allowed:

```text
customer full name
phone number
email
private message
payment info
address
special personal notes
```

---

## Success Targets

Initial targets:

| Metric | Target |
| --- | --- |
| Homepage CTA clarity | Customer understands in 5 seconds |
| WhatsApp click rate | Track baseline first |
| Weekend Fire page conversion | Track baseline first |
| Party quote leads | At least monthly growth |
| Campaign tracking coverage | 100% of campaign links use UTM |
| Broken CTA events | 0 |
| Private data leakage | 0 |

---

## Next Implementation Files

Recommended next files:

```text
app/lib/analytics.ts
app/components/TrackedLink.tsx
docs/lead-tracking-architecture.md
docs/weekly-marketing-report.md
```

---

## Final Rule

BOSSA analytics should answer business questions, not just collect numbers.

```text
Track the click.
Understand the intent.
Confirm the order.
Measure the revenue.
Improve the next campaign.
```
