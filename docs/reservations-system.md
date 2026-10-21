# BOSSA Reservation System

Gate: BOSSA-RESERVATIONS-1 · Built 2026-10-21

Guests request a table at `/reserve`. Every request is stored in Supabase as **pending**. Staff confirm, cancel, seat or mark no-shows at `/admin/reservations`, then send the guest a WhatsApp confirmation.

## Business rules (official hours, owner-confirmed 2026-10-21)

| Rule | Value | Enforced in |
| --- | --- | --- |
| Opening days | Thursday – Sunday. Closed Monday, Tuesday & Wednesday | Form, API, database check constraint (active bookings) |
| Opening hours | 12:00 PM – 10:00 PM (America/Curacao) | `content/notion/bossa-website-content.template.json` → `siteConfig.hours` (footer, contact, homepage, concierge) and `/reserve` copy |
| Reservation times | 12:00 PM – 9:30 PM, every 30 minutes (20 slots). Last seating 9:30 PM | Form, API, database check constraint |
| Capacity | 40 guests per 30-minute slot | API pre-check + database trigger (authoritative) |
| Party size | 1–40 | Form, API, database check constraint |
| Approval | Manual — every request starts as `pending` | Database default + insert policy |
| Counted toward capacity | `pending`, `confirmed`, `seated` | API + database trigger |
| Not counted | `cancelled`, `no_show` | API + database trigger |

Rules live in two places that must stay in sync:

- `app/lib/reservations.ts` — shared by the guest form, API and dashboard.
- `supabase/migrations/005_create_reservations.sql` + `006_update_reservation_hours.sql` — check constraints and `public.enforce_reservation_slot_rules()`. 006 replaces 005's original Wednesday–Sunday 5:00–9:30 PM rules.

## Architecture

```text
Guest ─► /reserve (ReservationForm, EN + Papiamentu)
          │  POST /api/reservations
          ▼
   validate ─► rate limit ─► capacity pre-check ─► insert (service role, server only)
                                                     │
                                       Supabase public.reservations
                                       └─ trigger: per-slot advisory lock + capacity + past-slot check
          ▲
Staff ─► /admin/reservations (Basic Auth via proxy.ts)
          │  GET  /api/reservations?from=&to=      (Basic Auth checked in the route)
          │  PATCH /api/admin/reservations/[id]    (Basic Auth via proxy.ts + route)
          ▼
   Confirm · Cancel · Mark as Seated · No-show · WhatsApp the guest
```

| File | Purpose |
| --- | --- |
| `supabase/migrations/005_create_reservations.sql` | Table, indexes, slot rules trigger, RLS policies, grants |
| `supabase/migrations/006_update_reservation_hours.sql` | Official hours: Thursday–Sunday, slots 12:00–21:30 |
| `app/lib/reservations.ts` | Shared rules, validation, date/time helpers (client-safe) |
| `app/lib/reservations-store.ts` | Server-only Supabase access (reuses `supabase-server.ts`) |
| `app/api/reservations/route.ts` | `POST` public request · `GET` staff list |
| `app/api/admin/reservations/[id]/route.ts` | `PATCH` staff status update |
| `app/reserve/page.tsx`, `app/reserve/reserve.css` | Guest page |
| `app/components/ReservationForm.tsx` | Bilingual form with validation, error and success states |
| `app/admin/reservations/page.tsx` | Staff dashboard (server) |
| `app/components/admin/ReservationsBoard.tsx` | Dashboard table, filters, actions, auto-refresh |

### API responses

`POST /api/reservations`

| Status | Body | When |
| --- | --- | --- |
| 201 | `{ ok: true, reservation: { id, status, party_size, reservation_date, reservation_time } }` | Saved as pending (no guest PII echoed) |
| 400 | `{ ok: false, error: 'validation_failed', fields: { field: code } }` | Missing/invalid fields, closed day, time outside slots, slot already passed |
| 400 | `{ ok: false, error: 'slot_full', seats_left }` | Slot would exceed 40 guests |
| 400 | `{ ok: false, error: 'invalid_json' }` | Body is not a JSON object |
| 429 | `{ ok: false, error: 'rate_limited' }` | More than 5 requests per 10 minutes from one IP (best effort, per server instance) |
| 503 | `{ ok: false, error: 'reservations_unavailable' }` | Supabase not configured, unreachable, or migration not applied |

Field codes: `required`, `name_invalid`, `phone_invalid`, `email_invalid`, `party_size_invalid`, `date_invalid`, `date_past`, `closed_day`, `time_invalid`, `time_past`, `notes_too_long`.

`GET /api/reservations?date=YYYY-MM-DD` or `?from=YYYY-MM-DD&to=YYYY-MM-DD` (max 31 days) → `{ ok, reservations, summary: { total, pending, upcoming_pending } }`. Requires the admin Basic Auth credentials.

`PATCH /api/admin/reservations/{id}` with `{ "status": "confirmed" | "cancelled" | "seated" | "no_show" | "pending" }`. Returns 409 if re-activating a booking would overbook its slot.

## Security and privacy

- Guest name, phone, email and notes are personal data. They are only readable by staff.
- `anon` may insert guest-facing columns only (column-level grant) and can never read rows back. It cannot set `status`.
- Supabase Auth users can read/update/delete only when `app_metadata.role = 'staff'` (set server-side). No such users exist yet; the dashboard uses the server-side service role behind Basic Auth, like `/admin/leads`.
- The capacity trigger is `SECURITY DEFINER` so it can count all bookings, and takes a per-slot advisory lock so simultaneous requests cannot overbook.
- Server logs contain error messages only, never guest details.
- `npm run security:check` now also verifies the reservation routes require admin auth, the migration keeps RLS/least-privilege/locking, and no client file imports the server Supabase boundary.

## Go-live checklist (owner actions)

1. **Apply the migrations** `supabase/migrations/005_create_reservations.sql` then `006_update_reservation_hours.sql` to the active Supabase project (`bossa-ai-os`, ref `oqmftkttkfktyzefswpz`). Until this is done, `/reserve` shows "Online reservations are temporarily unavailable" with a WhatsApp link, and the dashboard shows a database warning.
2. **Set admin credentials in Vercel** (Production): `BOSSA_ADMIN_USERNAME`, `BOSSA_ADMIN_PASSWORD`. Without them, `/admin/*` and the staff `GET` fail closed with 503.
3. Confirm `SUPABASE_SERVICE_ROLE_KEY` and `NEXT_PUBLIC_SUPABASE_URL` (or `SUPABASE_URL`) remain set for Production — the reservation API uses the same server-only boundary as the leads adapter.
4. Have a native speaker review the Papiamentu copy in `app/components/ReservationForm.tsx` and the WhatsApp confirmation text in `app/components/admin/ReservationsBoard.tsx`.
5. Run the smoke tests below on the production URL.

## Test plan

### Automated checks (run before every release)

```bash
npm run security:check
npm run deploy:check     # validate content, generate data, concierge checks, typecheck, build
```

### Database (local Postgres + migration)

| # | Case | Expected |
| --- | --- | --- |
| D1 | anon inserts a valid request | Row saved with `status = pending` |
| D2 | anon selects | `permission denied` |
| D3 | anon tries to set `status = confirmed` | `permission denied` |
| D4 | Monday / Tuesday / Wednesday | `reservations_open_day_check` |
| D5 | 11:30, 12:15, 22:00 | `reservations_slot_time_check` (12:00 and 21:30 accepted) |
| D6 | Party size 0 or 41 | `reservations_party_size_check` |
| D7 | Bad phone, bad email, blank name | Matching check constraint |
| D8 | Slot already in the past | `BOSSA_SLOT_IN_PAST` |
| D9 | 34 booked + 7 | `BOSSA_SLOT_FULL` (`seats_left=6`); exactly 40 accepted |
| D10 | Two simultaneous transactions for the last 5 seats | One succeeds, one gets `BOSSA_SLOT_FULL`; total stays 40 |
| D11 | Non-staff authenticated user | Sees 0 rows, updates nothing |
| D12 | Staff user | Reads all rows; confirm → seated; cancel |
| D13 | Cancelled booking | Seats released; re-activating into a full slot is blocked |
| D14 | Service role | Bypasses RLS but still capacity-checked |

### API

| # | Case | Request | Expected |
| --- | --- | --- | --- |
| A1 | **Valid submission** | Thursday 19:00, 4 guests, all required fields (also 12:00 and 21:30) | 201, `status: pending`, no PII echoed |
| A2 | **Missing fields** | `{}` | 400 `validation_failed`, every required field = `required` |
| A3 | Invalid phone / email / party size 0 or 41 | | 400 with matching field codes |
| A4 | **Closed day** | Next Monday, Tuesday or Wednesday | 400, `reservation_date: closed_day` |
| A5 | Time outside slots | 11:30, 12:15 or 22:00 | 400, `reservation_time: time_invalid` |
| A6 | Past date / earlier slot today | | 400, `date_past` / `time_past` |
| A7 | **Full slot** | Fill a slot to 40, then request 1 more | 400 `slot_full`, `seats_left: 0` |
| A8 | Partially full slot | 34 booked, request 7 | 400 `slot_full`, `seats_left: 6`; request 6 → 201 |
| A9 | 20 parallel requests × 3 guests into an empty slot | | Exactly 13 accepted (39 guests), 7 `slot_full` |
| A10 | Invalid JSON / honeypot filled | | 400 `invalid_json` / silent 201 without saving |
| A11 | 6 requests from one IP in 10 minutes | | 6th → 429 |
| A12 | Supabase down or table missing | | 503 `reservations_unavailable` |
| A13 | `GET` without / with wrong / with correct Basic Auth | | 401 / 401 / 200 (`no-store`, `noindex`) |
| A14 | `GET` range > 31 days or invalid date | | 400 |
| A15 | `PATCH` confirm → seated; cancel | | 200 with updated row |
| A16 | `PATCH` invalid status, extra fields, bad id, unknown id | | 400 / 400 / 400 / 404 |
| A17 | `PATCH` restore cancelled booking into full slot | | 409 |

### Browser (desktop 1280 px and phone 390 px)

| # | Case | Expected |
| --- | --- | --- |
| B1 | Open `/reserve` | No horizontal scroll; header shows the orange **Reserve** button |
| B2 | Submit empty form | Inline errors; focus moves to Name |
| B3 | Pick a Monday, Tuesday or Wednesday | "We are closed on Monday, Tuesday and Wednesday…" under Date |
| B4 | Switch to Papiamentu | All labels, errors and success text switch language |
| B5 | Valid request | "Your request has been received. We will confirm via WhatsApp shortly." + WhatsApp follow-up link to +5999 523 0683 |
| B6 | Full slot | "This time is fully booked… Only N seats are left at this time." |
| B7 | Choose today's date | Already-passed times are disabled |
| B8 | Homepage "Reserve a table" card | "Reserve online" → `/reserve`; "Or reserve on WhatsApp" keeps the WhatsApp flow |
| B9 | `/admin/reservations` | Pending count at top, Today / Tomorrow / This Week filters, seats-per-slot bars on single days |
| B10 | Confirm → Mark as Seated → Cancel | Status badges update; pending count drops; "Send confirmation" opens WhatsApp to the guest with an EN + Papiamentu message |
| B11 | Leave dashboard open | Refreshes every 30 s while the tab is visible; manual Refresh button |

### Production smoke test (after the migration is applied)

1. Submit a request on `https://www.bossaasado.com/reserve` for the next open day with the name "TEST — delete".
2. Open `/admin/reservations` → This Week → the request shows as Pending.
3. Confirm it, then cancel it so it frees the slot.

## Known limitations and follow-ups

- **Hours are now one source of truth:** Thursday – Sunday · 12:00 PM – 10:00 PM (owner-confirmed 2026-10-21) in `content/notion/bossa-website-content.template.json`, matched by `app/lib/reservations.ts`, migration 006, `LiveFireStatus`, page metadata and the LocalBusiness schema in `app/layout.tsx`. If the hours change, update all of them together.
- No automatic guest notifications (email/WhatsApp API). Staff send the confirmation from the dashboard's WhatsApp button.
- How far ahead guests may book is not limited — needs confirmation.
- Holidays and special closures are not modelled — needs confirmation of how they should be blocked.
- The dashboard refreshes by polling (30 s), not Supabase Realtime, because staff access uses Basic Auth rather than Supabase Auth.
- The migration file name `005_create_reservations.sql` was specified by the owner; other migrations use date prefixes. It has no dependency on them.
