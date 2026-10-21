-- BOSSA-RESERVATIONS-0
-- Reconcile a pre-existing public.reservations table before 005/006 run.
--
-- Found on the production project (bossa-ai-os) on 2026-10-21: a reservations
-- table with the same columns as 005 but created outside the migration history,
-- with permissive access (any authenticated user could read guest PII; anon could
-- insert any status) and none of 005's column checks. Because 005 uses
-- CREATE TABLE IF NOT EXISTS, its inline checks would be skipped on that table.
--
-- This migration brings such a table to exactly the shape 005 creates on a fresh
-- database. It is a no-op when the table does not exist. It does not delete rows.
-- Apply in order: 004 → 005 → 006.

do $$
begin
  if to_regclass('public.reservations') is null then
    return; -- fresh database: 005 creates the table with all checks
  end if;

  -- Legacy permissive policies (005 re-creates the staff policies by name).
  drop policy if exists "Public can insert reservations" on public.reservations;
  drop policy if exists "Staff can read reservations" on public.reservations;
  drop policy if exists "Staff can update reservations" on public.reservations;
  drop policy if exists "Staff can delete reservations" on public.reservations;

  -- 005 creates the equivalent reservations_date_time_idx.
  drop index if exists public.idx_reservations_date_time;

  -- Timestamps are NOT NULL in 005.
  update public.reservations set created_at = coalesce(created_at, now()), updated_at = coalesce(updated_at, created_at, now())
   where created_at is null or updated_at is null;
  alter table public.reservations alter column created_at set not null;
  alter table public.reservations alter column updated_at set not null;

  -- Column checks from 005 (open day and slot time are replaced again by 006).
  if not exists (select 1 from pg_constraint where conrelid = 'public.reservations'::regclass and conname = 'reservations_guest_name_check') then
    alter table public.reservations add constraint reservations_guest_name_check check (char_length(btrim(guest_name)) between 1 and 120);
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.reservations'::regclass and conname = 'reservations_guest_phone_check') then
    alter table public.reservations add constraint reservations_guest_phone_check check (guest_phone ~ '^\+?[0-9 ()-]{7,24}$');
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.reservations'::regclass and conname = 'reservations_guest_email_check') then
    alter table public.reservations add constraint reservations_guest_email_check check (
      guest_email is null
      or (char_length(guest_email) <= 254 and guest_email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$')
    );
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.reservations'::regclass and conname = 'reservations_party_size_check') then
    alter table public.reservations add constraint reservations_party_size_check check (party_size between 1 and 40);
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.reservations'::regclass and conname = 'reservations_open_day_check') then
    alter table public.reservations add constraint reservations_open_day_check check (extract(isodow from reservation_date) not in (1, 2));
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.reservations'::regclass and conname = 'reservations_slot_time_check') then
    alter table public.reservations add constraint reservations_slot_time_check check (
      reservation_time between time '17:00' and time '21:30'
      and extract(minute from reservation_time) in (0, 30)
      and extract(second from reservation_time) = 0
    );
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.reservations'::regclass and conname = 'reservations_status_check') then
    alter table public.reservations add constraint reservations_status_check check (status in ('pending', 'confirmed', 'cancelled', 'seated', 'no_show'));
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.reservations'::regclass and conname = 'reservations_notes_check') then
    alter table public.reservations add constraint reservations_notes_check check (notes is null or char_length(notes) <= 1000);
  end if;
end;
$$;
