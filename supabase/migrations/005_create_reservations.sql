-- BOSSA-RESERVATIONS-1
-- Table reservation requests for BOSSA Asado i Mar.
--
-- NOTE: the opening days and reservation times below were superseded the same
-- day by 006_update_reservation_hours.sql (Thursday–Sunday, slots 12:00–21:30).
-- Always apply 005 and 006 together.
--
-- Owner-confirmed business rules (Coach Sahid, 2026-10-21):
--   * Open Wednesday–Sunday, 5:00 PM–11:00 PM (America/Curacao). Closed Monday & Tuesday.
--   * Bookable times: 17:00–21:30 in 30-minute slots.
--   * Capacity: 40 guests per 30-minute slot. Pending, confirmed and seated
--     reservations count toward the slot; cancelled and no-show do not.
--   * Approval is manual: every request starts as 'pending' and staff confirm it.
--
-- PII boundary: guest_name, guest_phone, guest_email and notes are personal data.
--   * anon may INSERT the guest-facing columns only and can never read rows back.
--   * Staff access requires a Supabase Auth user whose app_metadata.role = 'staff'
--     (app_metadata can only be set server-side), or the server-side service role
--     used by app/lib/supabase-server.ts.
--
-- If the hours or capacity change, ship a new migration that updates the
-- reservations_* check constraints and public.enforce_reservation_slot_rules().

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null
    constraint reservations_guest_name_check check (char_length(btrim(guest_name)) between 1 and 120),
  guest_phone text not null
    constraint reservations_guest_phone_check check (guest_phone ~ '^\+?[0-9 ()-]{7,24}$'),
  guest_email text
    constraint reservations_guest_email_check check (
      guest_email is null
      or (char_length(guest_email) <= 254 and guest_email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$')
    ),
  party_size integer not null
    constraint reservations_party_size_check check (party_size between 1 and 40),
  reservation_date date not null
    constraint reservations_open_day_check check (extract(isodow from reservation_date) not in (1, 2)),
  reservation_time time not null
    constraint reservations_slot_time_check check (
      reservation_time between time '17:00' and time '21:30'
      and extract(minute from reservation_time) in (0, 30)
      and extract(second from reservation_time) = 0
    ),
  status text not null default 'pending'
    constraint reservations_status_check check (status in ('pending', 'confirmed', 'cancelled', 'seated', 'no_show')),
  notes text
    constraint reservations_notes_check check (notes is null or char_length(notes) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.reservations is
  'BOSSA table reservation requests. Contains guest PII. anon: insert-only; staff/service role: read and manage.';

create index if not exists reservations_date_time_idx
  on public.reservations (reservation_date, reservation_time);

-- Keep updated_at current on every change.
create or replace function public.set_reservations_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_reservations_updated_at on public.reservations;
create trigger set_reservations_updated_at
before update on public.reservations
for each row
execute function public.set_reservations_updated_at();

-- Slot rules enforced in the database so they hold for every caller.
-- SECURITY DEFINER lets the capacity sum see all rows even when the caller is
-- anon (who cannot SELECT). The advisory lock serialises concurrent requests
-- for the same slot so two guests cannot both take the last seats.
create or replace function public.enforce_reservation_slot_rules()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  slot_capacity constant integer := 40;
  booked integer;
begin
  if new.status not in ('pending', 'confirmed', 'seated') then
    return new;
  end if;

  -- Out-of-range party sizes are left to reservations_party_size_check so the
  -- caller gets that clearer error instead of "slot full".
  if new.party_size is null or new.party_size < 1 or new.party_size > slot_capacity then
    return new;
  end if;

  -- A status change between active states that keeps the slot and does not
  -- add guests never needs a capacity check.
  if tg_op = 'UPDATE'
    and old.status in ('pending', 'confirmed', 'seated')
    and new.reservation_date = old.reservation_date
    and new.reservation_time = old.reservation_time
    and new.party_size <= old.party_size then
    return new;
  end if;

  if tg_op = 'INSERT'
    and (new.reservation_date + new.reservation_time) <= (now() at time zone 'America/Curacao') then
    raise exception 'BOSSA_SLOT_IN_PAST'
      using errcode = 'P0001', hint = 'Choose a future date and time.';
  end if;

  perform pg_advisory_xact_lock(
    hashtextextended('bossa-reservation-slot:' || new.reservation_date::text || ' ' || new.reservation_time::text, 0)
  );

  select coalesce(sum(party_size), 0)
    into booked
    from public.reservations
   where reservation_date = new.reservation_date
     and reservation_time = new.reservation_time
     and status in ('pending', 'confirmed', 'seated')
     and id <> new.id;

  if booked + new.party_size > slot_capacity then
    raise exception 'BOSSA_SLOT_FULL'
      using errcode = 'P0001',
            detail = format('seats_left=%s', greatest(slot_capacity - booked, 0));
  end if;

  return new;
end;
$$;

revoke all on function public.enforce_reservation_slot_rules() from public;

drop trigger if exists enforce_reservation_slot_rules on public.reservations;
create trigger enforce_reservation_slot_rules
before insert or update on public.reservations
for each row
execute function public.enforce_reservation_slot_rules();

-- Staff = Supabase Auth user with app_metadata.role = 'staff'.
create or replace function public.is_bossa_staff()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'staff', false);
$$;

-- Row Level Security and least-privilege grants.
alter table public.reservations enable row level security;

revoke all on table public.reservations from anon;
revoke all on table public.reservations from authenticated;
revoke all on table public.reservations from service_role;

-- Public: insert guest-facing columns only. id, status and timestamps use defaults.
grant insert (guest_name, guest_phone, guest_email, party_size, reservation_date, reservation_time, notes)
  on table public.reservations to anon, authenticated;
grant select, update, delete on table public.reservations to authenticated;
grant select, insert, update, delete on table public.reservations to service_role;

drop policy if exists "Public can request reservations" on public.reservations;
create policy "Public can request reservations"
on public.reservations
for insert
to anon, authenticated
with check (status = 'pending');

drop policy if exists "Staff can read reservations" on public.reservations;
create policy "Staff can read reservations"
on public.reservations
for select
to authenticated
using ((select public.is_bossa_staff()));

drop policy if exists "Staff can update reservations" on public.reservations;
create policy "Staff can update reservations"
on public.reservations
for update
to authenticated
using ((select public.is_bossa_staff()))
with check ((select public.is_bossa_staff()));

drop policy if exists "Staff can delete reservations" on public.reservations;
create policy "Staff can delete reservations"
on public.reservations
for delete
to authenticated
using ((select public.is_bossa_staff()));
