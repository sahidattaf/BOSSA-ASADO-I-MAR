-- OWNER GATE BOSSA-AI-CONCIERGE-7
-- Migration file only. Do not execute under this gate.
-- Aligns the database lead_type constraint with the existing /api/leads contract.

alter table public.bossa_leads
  drop constraint if exists bossa_leads_lead_type_check;

alter table public.bossa_leads
  add constraint bossa_leads_lead_type_check check (
    lead_type in (
      'weekend_fire_order',
      'reservation',
      'party_event_quote',
      'general_inquiry',
      'catering',
      'private_event',
      'tourist_experience',
      'partner',
      'contact'
    )
  );

-- Preserve the existing anonymous-insert boundary while aligning accepted safe event types.
drop policy if exists "Allow public safe lead inserts" on public.bossa_leads;
create policy "Allow public safe lead inserts"
on public.bossa_leads
for insert
to anon
with check (
  lead_type in (
    'weekend_fire_order',
    'reservation',
    'party_event_quote',
    'general_inquiry',
    'catering',
    'private_event',
    'tourist_experience',
    'partner',
    'contact'
  )
  and jsonb_typeof(metadata) = 'object'
);
