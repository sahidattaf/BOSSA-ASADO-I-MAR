# BOSSA Supabase Leads Schema

**Owner:** Sahid Attaf
**Status:** Planning — tables not yet created
**System:** BOSSA Website OS → Supabase data layer
**Last updated:** 2026-05-28

**Prerequisite:** Supabase project must be created and env variables must be in Vercel before any code reads from or writes to these tables.

---

## Purpose

Define the database tables, columns, Row Level Security policies, and integration points for BOSSA's lead capture and analytics data layer. This schema supports three data flows:

1. **WhatsApp click events** — which CTA was clicked, which box, which page
2. **Lead records** — guest name, phone, interest, source, status
3. **Payment records** — Stripe deposit metadata, linked to a lead

No card data is stored. No raw PII is stored from WhatsApp click events. Payment data mirrors Stripe metadata only.

---

## Tables

### 1. `whatsapp_events`

Logs each WhatsApp CTA click. No PII — captures only click metadata.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Default: `gen_random_uuid()` |
| `created_at` | `timestamptz` | Default: `now()` |
| `page` | `text` | Route: `'/'`, `'/weekend-fire'`, `'/party-menu'` |
| `cta` | `text` | `'order_box'`, `'reservation'`, `'party_quote'`, `'general'` |
| `box_id` | `text` | `'#1'`–`'#8'` or `null` |
| `session_id` | `text` | Anonymous browser session ID (not tied to a user account) |

**Row Level Security:**

```sql
-- Allow insert from anon key (client-side click events)
CREATE POLICY "anon insert whatsapp_events"
ON whatsapp_events
FOR INSERT
TO anon
WITH CHECK (true);

-- Block all reads from anon key
CREATE POLICY "block anon read whatsapp_events"
ON whatsapp_events
FOR SELECT
TO anon
USING (false);
```

**No PII stored.** Name and phone are never captured in this table.

---

### 2. `leads`

Created when a guest sends a WhatsApp message (via WA Business API webhook, Phase 3) or when BOSSA staff manually creates a record after a conversation.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Default: `gen_random_uuid()` |
| `created_at` | `timestamptz` | Default: `now()` |
| `full_name` | `text` | Guest-provided name from WhatsApp message |
| `phone` | `text` | WhatsApp number in E.164 format: `+5999...` |
| `interest` | `text` | `'weekend_fire'`, `'party'`, `'catering'`, `'reservation'` |
| `source` | `text` | `'whatsapp_direct'`, `'website_click'`, `'referral'`, `'google'` |
| `box_id` | `text` | Box number if interest is `'weekend_fire'` — nullable |
| `notes` | `text` | Staff notes — nullable |
| `status` | `text` | `'new'`, `'contacted'`, `'confirmed'`, `'completed'`, `'cancelled'` |
| `notion_page_id` | `text` | Notion page ID once a client page is created — nullable |

**Row Level Security:**

```sql
-- Block all anon reads and writes on leads (PII table)
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
-- Then re-enable with explicit deny:
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "block anon on leads"
ON leads
FOR ALL
TO anon
USING (false)
WITH CHECK (false);
```

Leads are inserted only by the Supabase Edge Function using the service role key. No client-side code touches this table.

---

### 3. `payments`

Mirrors Stripe payment metadata. Created by the Stripe webhook handler Edge Function on `payment_intent.succeeded` or `checkout.session.completed`.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Default: `gen_random_uuid()` |
| `created_at` | `timestamptz` | Default: `now()` |
| `stripe_payment_intent_id` | `text` | Stripe `pi_...` ID — unique |
| `stripe_session_id` | `text` | Stripe checkout session ID — nullable |
| `stripe_customer_id` | `text` | Stripe `cus_...` ID — nullable |
| `lead_id` | `uuid` | FK → `leads.id` — nullable (may not have a lead yet) |
| `product_name` | `text` | `'Weekend Fire Deposit'`, `'Party Deposit'`, `'Catering Deposit'` |
| `amount` | `numeric` | Amount in the payment currency |
| `currency` | `text` | Stripe currency code: `'eur'`, `'usd'`, `'ang'` |
| `payment_status` | `text` | `'succeeded'`, `'refunded'`, `'disputed'`, `'cancelled'` |
| `customer_email` | `text` | From Stripe — nullable |
| `customer_name` | `text` | From Stripe — nullable |

**Row Level Security:**

```sql
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Block all anon access (financial data)
CREATE POLICY "block anon on payments"
ON payments
FOR ALL
TO anon
USING (false)
WITH CHECK (false);
```

Payments are inserted only by the Stripe webhook Edge Function using the service role key.

---

## SQL to Create All Tables

Run this in Supabase → SQL Editor when ready to create the schema:

```sql
-- whatsapp_events
CREATE TABLE whatsapp_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  page text NOT NULL,
  cta text NOT NULL,
  box_id text,
  session_id text
);
ALTER TABLE whatsapp_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert only"
  ON whatsapp_events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "block anon read"
  ON whatsapp_events FOR SELECT TO anon USING (false);

-- leads
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  phone text NOT NULL,
  interest text NOT NULL,
  source text NOT NULL DEFAULT 'whatsapp_direct',
  box_id text,
  notes text,
  status text NOT NULL DEFAULT 'new',
  notion_page_id text,
  UNIQUE (phone)
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "block anon on leads"
  ON leads FOR ALL TO anon USING (false) WITH CHECK (false);

-- payments
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  stripe_payment_intent_id text UNIQUE NOT NULL,
  stripe_session_id text,
  stripe_customer_id text,
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  amount numeric NOT NULL,
  currency text NOT NULL,
  payment_status text NOT NULL DEFAULT 'succeeded',
  customer_email text,
  customer_name text
);
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "block anon on payments"
  ON payments FOR ALL TO anon USING (false) WITH CHECK (false);
```

---

## Required Env Variables (names only — no secrets)

### Vercel (Next.js app)

| Variable | Used for |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for client-side init |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key for client-side `whatsapp_events` insert only |

### Supabase Edge Functions (set via `supabase secrets set`, never in repo)

| Variable | Used for |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Bypass RLS for Edge Function inserts into `leads` and `payments` |
| `STRIPE_WEBHOOK_SECRET` | Verify Stripe webhook signature before processing |
| `NOTION_API_KEY` | Write client setup pages to Notion |
| `NOTION_CLIENT_SETUP_DB_ID` | Notion database ID for client setup tasks |

---

## Integration Points

### Next.js → Supabase

| Operation | Table | Key used | Phase |
|---|---|---|---|
| Log WA click | `whatsapp_events` | Anon key | 3 |
| Read own data | None — client never reads | — | — |

### Stripe webhook → Supabase Edge Function

| Event | Table | Operation |
|---|---|---|
| `payment_intent.succeeded` | `payments` | INSERT |
| `payment_intent.succeeded` | `leads` | INSERT or UPSERT (on phone match) |
| `checkout.session.completed` | `payments` | INSERT |

### Supabase Edge Function → Notion

| Trigger | Action |
|---|---|
| New payment row inserted | Create page in Notion → 06 — Knowledge & Memory → Client Setup Tasks |
| New lead row inserted | Create or update page in Notion → 02 — BOSSA Domain → Leads |

---

## Security Checklist

```text
[ ] RLS enabled on all three tables before any table goes live
[ ] Anon key can only INSERT into whatsapp_events — no reads, no updates
[ ] Anon key cannot touch leads or payments at all
[ ] Service role key is stored only in Supabase Edge Function secrets
[ ] NEXT_PUBLIC_SUPABASE_ANON_KEY is scoped to insert-only via RLS (not by trust)
[ ] No customer card data is stored — Stripe holds card data, not Supabase
[ ] Leads table has UNIQUE(phone) to prevent duplicate records
[ ] Payments table has UNIQUE(stripe_payment_intent_id) to prevent duplicate inserts
[ ] Supabase project has backup enabled before going live
[ ] .env.local is in .gitignore (confirm before first local dev session)
```

---

## Implementation Checklist

```text
[ ] Supabase project created at supabase.com
[ ] SQL schema applied (whatsapp_events, leads, payments)
[ ] RLS policies applied and tested
[ ] NEXT_PUBLIC_SUPABASE_URL added to Vercel
[ ] NEXT_PUBLIC_SUPABASE_ANON_KEY added to Vercel
[ ] SUPABASE_SERVICE_ROLE_KEY added to Supabase Edge Function secrets
[ ] Test insert: whatsapp_events row inserts via anon key
[ ] Test block: anon SELECT on leads returns empty (not an error)
[ ] Test block: anon SELECT on payments returns empty
[ ] Edge Function deployed and tested with Stripe CLI
[ ] Notion integration tested with a real payment
```
