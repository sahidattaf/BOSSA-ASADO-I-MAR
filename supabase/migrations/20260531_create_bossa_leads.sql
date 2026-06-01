-- BOSSA Asado i Mar lead tracking table
-- Supabase project: Bossa Asado i Mar
-- Project ref: zgfncoexiqnqeqaxpqdy
-- Purpose: Store safe, non-sensitive website lead events from WhatsApp/order/quote CTAs.

create table if not exists public.bossa_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,

  lead_type text not null check (
    lead_type in (
      'weekend_fire_order',
      'reservation',
      'party_event_quote',
      'general_inquiry'
    )
  ),

  intent text check (
    intent is null or intent in (
      'order',
      'reserve',
      'party_quote',
      'deposit',
      'customizer',
      'contact'
    )
  ),

  offer text,
  item_name text,
  box_number text,

  estimated_value numeric check (estimated_value is null or estimated_value >= 0),
  actual_value numeric check (actual_value is null or actual_value >= 0),
  currency text not null default 'XCG' check (currency in ('XCG', 'USD')),

  lead_status text not null default 'New' check (
    lead_status in (
      'New',
      'WhatsApp Clicked',
      'Conversation Started',
      'Awaiting Details',
      'Confirmed',
      'Deposit Pending',
      'Deposit Paid',
      'Completed',
      'Lost',
      'Cancelled'
    )
  ),

  order_status text not null default 'Not Started' check (
    order_status in (
      'Not Started',
      'Requested',
      'Confirmed',
      'In Prep',
      'Ready',
      'Completed',
      'Cancelled'
    )
  ),

  payment_status text not null default 'Not Required' check (
    payment_status in (
      'Not Required',
      'Pending',
      'Paid',
      'Failed',
      'Refunded',
      'Disputed'
    )
  ),

  follow_up_owner text,
  follow_up_due timestamptz,
  last_follow_up_at timestamptz,

  staff_notes text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists bossa_leads_created_at_idx on public.bossa_leads (created_at desc);
create index if not exists bossa_leads_lead_type_idx on public.bossa_leads (lead_type);
create index if not exists bossa_leads_lead_status_idx on public.bossa_leads (lead_status);
create index if not exists bossa_leads_utm_campaign_idx on public.bossa_leads (utm_campaign);
create index if not exists bossa_leads_follow_up_due_idx on public.bossa_leads (follow_up_due);

create or replace function public.set_bossa_leads_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_bossa_leads_updated_at on public.bossa_leads;

create trigger set_bossa_leads_updated_at
before update on public.bossa_leads
for each row
execute function public.set_bossa_leads_updated_at();

alter table public.bossa_leads enable row level security;

-- Public anonymous insert is intentionally allowed only for safe, non-sensitive lead metadata.
-- Do not store private customer contact details from the browser without a privacy policy and stricter access controls.
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
    'general_inquiry'
  )
  and jsonb_typeof(metadata) = 'object'
);

-- Authenticated users can read/update for internal dashboards after login is configured.
drop policy if exists "Allow authenticated lead access" on public.bossa_leads;
create policy "Allow authenticated lead access"
on public.bossa_leads
for all
to authenticated
using (true)
with check (true);

comment on table public.bossa_leads is 'Safe lead tracking table for BOSSA website WhatsApp/order/event intent.';
comment on column public.bossa_leads.metadata is 'Safe non-sensitive metadata only. Do not store private contact or payment data here from public browser events.';
