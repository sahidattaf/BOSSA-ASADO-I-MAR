# BOSSA Lead Tracking Architecture

Owner: Coach Sahid
Repo: `sahidattaf/BOSSA-ASADO-I-MAR`
Website: `bossaasado.com`
Purpose: Define how BOSSA tracks leads from website visits, WhatsApp clicks, orders, party/event inquiries, deposits, and revenue.

---

## Purpose

This document defines the bridge between website analytics and real restaurant operations.

Analytics answers:

```text
What did visitors click?
```

Lead tracking answers:

```text
Who became a real business opportunity?
What did they want?
Did BOSSA follow up?
Did it become revenue?
```

---

## Core Business Funnel

```text
Website visitor
  ↓
Offer/page view
  ↓
WhatsApp click
  ↓
Lead created
  ↓
Staff follow-up
  ↓
Order / quote confirmed
  ↓
Deposit or payment
  ↓
Completed order/event
  ↓
Revenue report
```

---

## Lead Types

BOSSA should track four primary lead types:

| Lead Type | Description | Example |
| --- | --- | --- |
| Weekend Fire Order | Customer wants a Weekend Fire box or grill order | Box #1, Box #2, Skewers |
| Reservation | Customer wants to visit or reserve | Table/reservation request |
| Party / Event Quote | Customer wants catering, party, or private event | Birthday, family event, hotel group |
| General Inquiry | Customer asks a question | Hours, location, availability |

---

## Lead Source Types

| Source | Example |
| --- | --- |
| Website | `bossaasado.com` |
| Instagram | Campaign link in bio/story |
| Facebook | Page post or ad |
| TikTok | Video link |
| WhatsApp Broadcast | Direct campaign broadcast |
| Hotel Partner | Avila/Pietermaai referral |
| Walk-in | Manual staff entry |
| Referral | Customer referral |

---

## Recommended Tracking Stack

## Good — Manual Notion Lead Log

Best for immediate use.

```text
Website WhatsApp clicks
  ↓
Staff manually logs lead in Notion
  ↓
Weekly review
```

## Better — Supabase Lead Table

Best for digital tracking.

```text
Website CTA click
  ↓
Lead event inserted into Supabase
  ↓
Staff/AI dashboard reviews leads
```

## Best — Supabase + Notion + Weekly Marketing Dashboard

Best for professional operations.

```text
Website lead event
  ↓
Supabase lead table
  ↓
Notion dashboard sync/report
  ↓
Weekly KPI review
  ↓
Campaign decisions
```

---

## Minimum Lead Record

Every lead should have:

```text
lead_id
created_at
source_page
lead_type
intent
offer
status
follow_up_owner
follow_up_due
```

Better record:

```text
lead_id
created_at
source_page
utm_source
utm_medium
utm_campaign
lead_type
intent
offer
item_name
box_number
estimated_value
actual_value
lead_status
order_status
payment_status
staff_notes
last_follow_up_at
follow_up_owner
follow_up_due
```

---

## Lead Status Model

Recommended statuses:

| Status | Meaning |
| --- | --- |
| New | Lead entered system |
| WhatsApp Clicked | Customer clicked WhatsApp CTA |
| Conversation Started | Customer sent message or staff replied |
| Awaiting Details | Staff needs date, quantity, guest count, etc. |
| Confirmed | Order/event is confirmed |
| Deposit Pending | Customer needs to pay deposit |
| Deposit Paid | Deposit confirmed |
| Completed | Order/event completed |
| Lost | Lead did not convert |
| Cancelled | Customer or BOSSA cancelled |

---

## Payment Status Model

| Payment Status | Meaning |
| --- | --- |
| Not Required | No deposit/payment required |
| Pending | Payment/deposit requested |
| Paid | Payment/deposit received |
| Failed | Payment failed |
| Refunded | Payment refunded |
| Disputed | Customer disputed payment |

---

## Order Status Model

| Order Status | Meaning |
| --- | --- |
| Not Started | No order created yet |
| Requested | Customer asked for order/quote |
| Confirmed | BOSSA confirmed availability |
| In Prep | Food/event preparation started |
| Ready | Order ready for pickup/service |
| Completed | Customer received order/event completed |
| Cancelled | Order cancelled |

---

## Recommended Supabase Table

Future table:

```text
bossa_leads
```

Suggested SQL:

```sql
create table public.bossa_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,

  lead_type text not null,
  intent text,
  offer text,
  item_name text,
  box_number text,

  estimated_value numeric,
  actual_value numeric,
  currency text default 'XCG',

  lead_status text not null default 'New',
  order_status text default 'Not Started',
  payment_status text default 'Not Required',

  follow_up_owner text,
  follow_up_due timestamptz,
  last_follow_up_at timestamptz,

  staff_notes text,
  metadata jsonb default '{}'::jsonb
);
```

---

## Privacy Rule

Do not store sensitive customer data until BOSSA has a clear privacy and data retention process.

Allowed early-stage fields:

```text
lead type
source page
campaign
item name
box number
estimated value
status
staff notes without sensitive details
```

Avoid at website analytics level:

```text
full customer name
phone number
email
home address
payment card data
private message text
```

If customer contact details are added later, they should be handled with a proper privacy policy and restricted access.

---

## Website Lead Event Types

| Lead Event | Trigger | Creates Lead? |
| --- | --- | --- |
| `whatsapp_home_click` | Homepage WhatsApp CTA | Yes |
| `whatsapp_weekend_fire_click` | Weekend Fire box CTA | Yes |
| `whatsapp_party_quote_click` | Party quote CTA | Yes |
| `whatsapp_customizer_click` | Customizer handoff | Yes |
| `stripe_deposit_click` | Deposit clicked | Maybe, if prior lead exists |
| `maps_click` | Location click | No, interest only |
| `menu_item_interest_click` | Menu item interest | No, unless paired with CTA |

---

## Lead Creation Logic

A lead should be created when the user performs a high-intent action:

```text
WhatsApp CTA clicked
Party quote requested
Customizer submitted
Deposit/payment link clicked after confirmation
```

A lead should not be created for every page view.

---

## Client-Side Lead Logging Option

Future file:

```text
app/lib/leads.ts
```

Purpose:

```text
Create a lightweight lead record when a high-intent CTA is clicked.
```

Suggested interface:

```ts
export type BossaLeadInput = {
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  lead_type: 'weekend_fire_order' | 'reservation' | 'party_event_quote' | 'general_inquiry';
  intent?: 'order' | 'reserve' | 'party_quote' | 'deposit' | 'customizer';
  offer?: string;
  item_name?: string;
  box_number?: string;
  estimated_value?: number;
  currency?: 'XCG' | 'USD';
};

export async function createBossaLead(input: BossaLeadInput) {
  // Future implementation: send to API route or Supabase Edge Function.
}
```

---

## Recommended API Route

Future route:

```text
app/api/leads/route.ts
```

Purpose:

```text
Accept safe lead events from the website and write them to Supabase.
```

Why API route instead of direct browser insert:

```text
Better validation
Better abuse control
No service role key exposed
Cleaner future logic
```

---

## Recommended Validation Rules

A lead insert should require:

```text
lead_type
intent
source_page
```

Optional fields:

```text
offer
item_name
box_number
utm_source
utm_medium
utm_campaign
estimated_value
currency
```

Reject:

```text
secret keys
card data
private customer notes
long raw WhatsApp messages
unexpected fields
```

---

## Staff Workflow

When a new WhatsApp lead arrives:

```text
1. Reply quickly.
2. Confirm customer intent.
3. Ask missing details.
4. Confirm availability.
5. Confirm price/deposit if needed.
6. Update lead status.
7. Mark order/event confirmed or lost.
8. Record actual value after completion.
```

---

## Weekend Fire Lead Workflow

```text
Customer clicks Box CTA
  ↓
Lead created: Weekend Fire Order
  ↓
WhatsApp opens with box details
  ↓
Staff confirms quantity and pickup time
  ↓
Status moves to Confirmed or Lost
  ↓
Order value is logged
```

---

## Party/Event Lead Workflow

```text
Customer clicks Party Quote CTA
  ↓
Lead created: Party / Event Quote
  ↓
WhatsApp opens quote template
  ↓
Staff asks date, guest count, location, menu direction
  ↓
Quote prepared
  ↓
Deposit requested if approved
  ↓
Event confirmed or lost
```

---

## Weekly Lead Review

Every week, review:

```text
new leads
confirmed leads
lost leads
completed orders
total estimated value
actual revenue
best source
best campaign
best offer
follow-ups overdue
```

Key question:

```text
Which campaign or page produced real conversations and revenue?
```

---

## Notion Lead Dashboard Option

Recommended database:

```text
BOSSA Lead Tracker
```

Fields:

```text
Lead Name / ID
Created Date
Source Page
Campaign
Lead Type
Intent
Offer
Item / Box
Estimated Value
Actual Value
Lead Status
Payment Status
Order Status
Owner
Follow-Up Due
Notes
```

Recommended views:

```text
🔥 New Leads
📞 Needs Follow-Up
🍖 Weekend Fire Leads
🎉 Party/Event Leads
💰 Deposit Pending
✅ Completed Orders
📊 Weekly Revenue Review
```

---

## Supabase + Notion Sync Option

Best future architecture:

```text
Website CTA
  ↓
API route
  ↓
Supabase bossa_leads
  ↓
Weekly export/report
  ↓
Notion dashboard
```

Reason:

```text
Supabase handles structured data.
Notion handles human review and operations.
```

---

## Lead Quality Scoring

Optional future scoring:

| Signal | Points |
| --- | --- |
| Weekend Fire order CTA | +3 |
| Party quote CTA | +5 |
| Customizer completed | +4 |
| Payment clicked | +5 |
| Campaign source present | +1 |
| Staff confirmed conversation | +5 |
| Deposit paid | +10 |

Score categories:

```text
Cold: 0–3
Warm: 4–8
Hot: 9+
```

---

## Reporting Metrics

| Metric | Meaning |
| --- | --- |
| Lead volume | Total new leads |
| Lead conversion rate | Confirmed leads / new leads |
| Order completion rate | Completed orders / confirmed orders |
| Average order value | Revenue / completed orders |
| Party quote conversion | Confirmed events / quote requests |
| Campaign ROI | Revenue estimate by campaign |
| Follow-up speed | Time from lead to staff response |
| Lost reason count | Why leads did not convert |

---

## Good / Better / Best Roadmap

## Good

Manual Notion lead tracker and weekly review.

## Better

Website creates safe lead events and stores them in Supabase.

## Best

Supabase lead log + Notion dashboard + automated weekly marketing report + revenue tracking.

---

## Implementation Roadmap

### Phase 1 — Manual Lead Tracker

```text
Create Notion BOSSA Lead Tracker
Add views for New Leads, Follow-Up, Weekend Fire, Party/Event, Completed
Train staff to log every serious WhatsApp inquiry
```

### Phase 2 — Website Lead Logging

```text
Create app/lib/leads.ts
Create app/api/leads/route.ts
Create Supabase bossa_leads table
Connect WhatsAppButton to create lead record before opening WhatsApp
```

### Phase 3 — Reporting Layer

```text
Weekly report from Supabase
Notion dashboard summary
Campaign performance review
Revenue estimate by offer
```

---

## Safety Boundaries

Do not implement automatic lead storage of private contact data until:

```text
Privacy policy exists
Access rules are defined
Retention policy is defined
Supabase RLS is configured
Staff process is approved
```

---

## Final Rule

Do not only count clicks.

```text
Clicks are signals.
Leads are opportunities.
Orders are operations.
Revenue is proof.
```
