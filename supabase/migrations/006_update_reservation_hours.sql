-- BOSSA-RESERVATIONS-2
-- Official BOSSA opening hours (owner-confirmed by Coach Sahid, 2026-10-21).
-- Supersedes the hours in 005_create_reservations.sql:
--   * Open Thursday – Sunday · 12:00 PM – 10:00 PM (America/Curacao).
--   * Closed Monday, Tuesday & Wednesday.
--   * Reservation slots: 12:00–21:30 every 30 minutes (last seating 9:30 PM).
--   * Capacity is unchanged: 40 guests per slot (public.enforce_reservation_slot_rules).
--
-- The day rule applies to active reservations (pending, confirmed, seated) so
-- historical cancelled / no-show rows on other days stay valid and staff can
-- still cancel any booking. Fails with a clear message if an active Wednesday
-- reservation exists; cancel or move it first, then re-run.

do $$
declare
  active_wednesday integer;
begin
  select count(*)
    into active_wednesday
    from public.reservations
   where extract(isodow from reservation_date) = 3
     and status in ('pending', 'confirmed', 'seated');

  if active_wednesday > 0 then
    raise exception 'BOSSA-RESERVATIONS-2: % active Wednesday reservation(s) exist. Cancel or move them before applying the Thursday–Sunday hours.', active_wednesday;
  end if;
end;
$$;

alter table public.reservations drop constraint if exists reservations_open_day_check;
alter table public.reservations
  add constraint reservations_open_day_check check (
    status not in ('pending', 'confirmed', 'seated')
    or extract(isodow from reservation_date) in (4, 5, 6, 7)
  );

alter table public.reservations drop constraint if exists reservations_slot_time_check;
alter table public.reservations
  add constraint reservations_slot_time_check check (
    reservation_time between time '12:00' and time '21:30'
    and extract(minute from reservation_time) in (0, 30)
    and extract(second from reservation_time) = 0
  );

comment on table public.reservations is
  'BOSSA table reservation requests (Thursday–Sunday, slots 12:00–21:30). Contains guest PII. anon: insert-only; staff/service role: read and manage.';
