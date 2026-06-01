# BOSSA Lead Ops Dashboard

Owner: Coach Sahid
Repo: `sahidattaf/BOSSA-ASADO-I-MAR`
Website: `bossaasado.com`
Supabase Project: `Bossa Asado i Mar`
Supabase Table: `public.bossa_leads`
Purpose: Turn website WhatsApp leads into follow-up actions, confirmed orders, deposits, completed events, and weekly revenue insight.

---

## Current System Status

BOSSA now has a working lead capture flow:

```text
Customer clicks WhatsApp CTA
  ↓
Website tracker fires
  ↓
POST /api/leads
  ↓
Vercel API route
  ↓
Supabase insert
  ↓
public.bossa_leads
```

This dashboard layer defines how BOSSA staff should use those rows operationally.

---

## Dashboard Purpose

The lead dashboard should answer five questions every day:

```text
1. Who showed buying intent?
2. What did they want?
3. Has BOSSA followed up?
4. Did it become an order, event, or lost lead?
5. How much revenue did it create?
```

---

## Lead Operating Rule

A lead is not complete when the customer clicks WhatsApp.

A lead is complete only when one of these outcomes is recorded:

```text
Completed
Lost
Cancelled
```

Until then, every lead needs ownership and follow-up.

---

## Core Database Fields

The current Supabase table supports:

| Field | Purpose |
| --- | --- |
| `id` | Unique lead ID |
| `created_at` | When the lead was captured |
| `updated_at` | When the lead was last changed |
| `source_page` | Page where the customer clicked |
| `utm_source` | Campaign source |
| `utm_medium` | Campaign medium |
| `utm_campaign` | Campaign name |
| `lead_type` | Type of business opportunity |
| `intent` | Customer action intent |
| `offer` | Offer or campaign clicked |
| `item_name` | Box, package, or item name |
| `box_number` | Weekend Fire box/package number |
| `estimated_value` | Expected order value |
| `actual_value` | Final order/event value |
| `currency` | XCG or USD |
| `lead_status` | Lead progress |
| `order_status` | Operational order state |
| `payment_status` | Deposit/payment state |
| `follow_up_owner` | Staff member responsible |
| `follow_up_due` | Follow-up deadline |
| `last_follow_up_at` | Last staff follow-up |
| `staff_notes` | Internal notes |
| `metadata` | Safe technical/context metadata |

---

## Lead Types

| Lead Type | Meaning | Owner Priority |
| --- | --- | --- |
| `weekend_fire_order` | Customer wants a Weekend Fire order | High |
| `party_event_quote` | Customer wants party/event/catering quote | Critical |
| `reservation` | Customer wants table/reservation | High |
| `general_inquiry` | Customer asks a general question | Medium |

---

## Lead Status Workflow

Use these statuses exactly:

```text
New
WhatsApp Clicked
Conversation Started
Awaiting Details
Confirmed
Deposit Pending
Deposit Paid
Completed
Lost
Cancelled
```

### Status Meaning

| Status | Meaning | Staff Action |
| --- | --- | --- |
| New | Lead exists but not reviewed | Assign owner |
| WhatsApp Clicked | Customer clicked CTA | Check WhatsApp conversation |
| Conversation Started | Staff/customer conversation started | Gather details |
| Awaiting Details | Missing quantity/date/time/guest count | Follow up |
| Confirmed | BOSSA confirmed availability | Prepare order/event |
| Deposit Pending | Deposit requested | Monitor payment |
| Deposit Paid | Deposit received | Lock order/event |
| Completed | Order/event completed | Add actual value |
| Lost | Customer did not convert | Add reason |
| Cancelled | Cancelled by customer or BOSSA | Add reason |

---

## Order Status Workflow

```text
Not Started
Requested
Confirmed
In Prep
Ready
Completed
Cancelled
```

Use this for kitchen/event execution after the lead becomes operational.

---

## Payment Status Workflow

```text
Not Required
Pending
Paid
Failed
Refunded
Disputed
```

Payment status should only be updated after BOSSA confirms availability.

---

## Recommended Dashboard Views

Create these views in Supabase, Notion, or future admin UI.

---

## 1. 🔥 New Leads

Purpose: See all fresh website leads.

Filter:

```sql
lead_status in ('New', 'WhatsApp Clicked')
```

Sort:

```sql
created_at desc
```

Visible fields:

```text
created_at
source_page
lead_type
intent
offer
item_name
box_number
lead_status
follow_up_owner
follow_up_due
```

Staff rule:

```text
Every new lead should be reviewed within 15 minutes during operating hours.
```

---

## 2. 📞 Needs Follow-Up

Purpose: Prevent missed WhatsApp leads.

Filter:

```sql
lead_status in ('WhatsApp Clicked', 'Conversation Started', 'Awaiting Details')
```

Sort:

```sql
follow_up_due asc nulls last
```

Staff rule:

```text
No follow-up lead should stay open overnight without a note.
```

---

## 3. 🍖 Weekend Fire Leads

Purpose: Manage box orders and fire-grill campaign demand.

Filter:

```sql
lead_type = 'weekend_fire_order'
```

Sort:

```sql
created_at desc
```

Key fields:

```text
created_at
source_page
box_number
item_name
offer
estimated_value
lead_status
order_status
payment_status
actual_value
```

Daily question:

```text
Which box is generating the most WhatsApp intent?
```

---

## 4. 🎉 Party / Event Quotes

Purpose: Track higher-value catering and event leads.

Filter:

```sql
lead_type = 'party_event_quote'
```

Sort:

```sql
created_at desc
```

Key fields:

```text
created_at
source_page
offer
item_name
lead_status
payment_status
estimated_value
actual_value
follow_up_owner
follow_up_due
staff_notes
```

Staff rule:

```text
Party/event leads must receive human follow-up as soon as possible.
```

---

## 5. 💰 Deposit Pending

Purpose: Track confirmed leads waiting for payment.

Filter:

```sql
payment_status = 'Pending'
```

Sort:

```sql
follow_up_due asc nulls last
```

Staff rule:

```text
Deposit requests should not be sent before availability and pricing are confirmed.
```

---

## 6. ✅ Completed Orders

Purpose: Track completed revenue.

Filter:

```sql
lead_status = 'Completed'
```

Sort:

```sql
created_at desc
```

Key fields:

```text
lead_type
offer
actual_value
currency
utm_source
utm_campaign
created_at
updated_at
```

Weekly question:

```text
Which source, page, or campaign produced completed revenue?
```

---

## 7. ❌ Lost Leads

Purpose: Learn why customers do not convert.

Filter:

```sql
lead_status = 'Lost'
```

Sort:

```sql
updated_at desc
```

Required note:

```text
reason_lost should be written in staff_notes until a dedicated field is added.
```

Examples:

```text
No reply
Price too high
Date unavailable
Customer changed mind
Staff replied too late
```

---

## 8. 📊 Weekly Revenue Review

Purpose: Weekly owner/operator decision view.

Review every week:

```text
Total leads
New leads
Confirmed leads
Completed leads
Lost leads
Weekend Fire leads
Party/event leads
Estimated value
Actual value
Best source
Best campaign
Best page
Follow-ups overdue
```

---

## Recommended SQL Queries

### Total leads this week

```sql
select count(*) as total_leads
from public.bossa_leads
where created_at >= date_trunc('week', now());
```

### Leads by type this week

```sql
select lead_type, count(*) as total
from public.bossa_leads
where created_at >= date_trunc('week', now())
group by lead_type
order by total desc;
```

### Leads by status

```sql
select lead_status, count(*) as total
from public.bossa_leads
group by lead_status
order by total desc;
```

### Weekend Fire demand

```sql
select box_number, item_name, count(*) as total_click_leads
from public.bossa_leads
where lead_type = 'weekend_fire_order'
group by box_number, item_name
order by total_click_leads desc;
```

### Campaign performance

```sql
select
  coalesce(utm_campaign, 'no_campaign') as campaign,
  count(*) as total_leads,
  sum(coalesce(estimated_value, 0)) as estimated_value,
  sum(coalesce(actual_value, 0)) as actual_value
from public.bossa_leads
group by coalesce(utm_campaign, 'no_campaign')
order by total_leads desc;
```

### Completed revenue this week

```sql
select
  currency,
  sum(coalesce(actual_value, 0)) as completed_revenue
from public.bossa_leads
where lead_status = 'Completed'
  and created_at >= date_trunc('week', now())
group by currency;
```

### Follow-ups due now

```sql
select *
from public.bossa_leads
where follow_up_due is not null
  and follow_up_due <= now()
  and lead_status not in ('Completed', 'Lost', 'Cancelled')
order by follow_up_due asc;
```

---

## Daily Staff Workflow

Use this every operating day.

### Morning / Opening Check

```text
1. Open New Leads.
2. Open Needs Follow-Up.
3. Assign every unassigned lead.
4. Check WhatsApp for each lead.
5. Update status.
6. Add follow-up due time if not resolved.
```

### During Service

```text
1. Check new leads every 30 minutes.
2. Prioritize Weekend Fire and Party/Event leads.
3. Confirm availability before deposit/payment.
4. Move confirmed orders into kitchen/service workflow.
5. Record actual value after completion.
```

### Closing Check

```text
1. No unanswered new leads.
2. No open party/event quote without follow-up note.
3. Deposit pending leads reviewed.
4. Completed orders updated with actual value.
5. Lost leads marked with reason.
```

---

## Owner Review Workflow

Coach Sahid should review weekly:

```text
1. Which page generated most leads?
2. Which offer generated real orders?
3. Which leads were lost and why?
4. Which campaign deserves another push?
5. Which menu/box should be improved?
6. Which staff step caused delay?
7. What should be tested next week?
```

---

## Lead SLA

| Lead Type | First Response Target | Owner |
| --- | --- | --- |
| Weekend Fire Order | 15 minutes during operating hours | Staff / Operator |
| Party/Event Quote | 30 minutes during operating hours | Owner / Manager |
| Reservation | 15 minutes during operating hours | Staff |
| General Inquiry | Same day | Staff |

---

## Manual Update Rules

Staff should update these fields manually until an admin dashboard is built:

```text
lead_status
order_status
payment_status
follow_up_owner
follow_up_due
last_follow_up_at
estimated_value
actual_value
staff_notes
```

Do not manually change:

```text
id
created_at
source_page
utm fields
metadata
```

---

## Privacy Rule

Do not store full private customer information in `bossa_leads` yet.

Allowed:

```text
lead source
lead type
offer
box number
status
estimated value
actual value
non-sensitive staff notes
```

Avoid:

```text
full customer name
phone number
email
home address
private WhatsApp message
payment card details
sensitive personal notes
```

If BOSSA later stores contact details, add:

```text
privacy policy
retention policy
restricted access
proper RLS policies
staff permissions
```

---

## Recommended Next Database Fields

Future migration:

```text
reason_lost
service_date
pickup_time
guests_count
lead_score
confirmed_at
completed_at
lost_at
```

Recommended SQL:

```sql
alter table public.bossa_leads
add column if not exists reason_lost text,
add column if not exists service_date date,
add column if not exists pickup_time time,
add column if not exists guests_count integer check (guests_count is null or guests_count > 0),
add column if not exists lead_score integer default 0 check (lead_score >= 0),
add column if not exists confirmed_at timestamptz,
add column if not exists completed_at timestamptz,
add column if not exists lost_at timestamptz;
```

---

## Good / Better / Best Dashboard Options

## Good

Use Supabase Table Editor manually.

```text
Fastest
Already live
Good for first 50 leads
```

## Better

Create Notion BOSSA Lead Tracker and manually sync weekly.

```text
Better for staff review
Better notes
Better owner dashboard
```

## Best

Build internal admin page:

```text
/admin/leads
```

With:

```text
login
lead table
status editing
follow-up queue
weekly revenue summary
export to CSV
```

---

## Future Admin Page Spec

Path:

```text
/admin/leads
```

Components:

```text
LeadStatsCards
LeadFilters
LeadTable
LeadStatusEditor
FollowUpQueue
RevenueSummary
```

Basic views:

```text
All Leads
New Leads
Needs Follow-Up
Weekend Fire
Party/Event
Deposit Pending
Completed
Lost
```

---

## Weekly Report Template

```markdown
# BOSSA Weekly Lead Report

Week:
Reviewer:

## Summary
- Total leads:
- Weekend Fire leads:
- Party/Event leads:
- Confirmed orders:
- Completed orders:
- Lost leads:
- Actual revenue:

## Best Performing Source

## Best Performing Offer

## Lead Loss Reasons

## Staff Follow-Up Issues

## Next Week Action
1.
2.
3.
```

---

## Success Metric

This dashboard is successful when BOSSA can answer:

```text
Which website click became money?
```

The goal is not just more leads.

The goal is:

```text
tracked leads
fast follow-up
confirmed orders
completed revenue
better campaigns
```

---

## Final Rule

BOSSA should never lose a customer because a WhatsApp click was not followed up.

```text
Click captured.
Lead assigned.
Customer answered.
Order confirmed.
Revenue recorded.
```
