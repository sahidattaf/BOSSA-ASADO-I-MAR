-- BOSSA-WHATSAPP-LEADS-MIGRATION-PARITY-1
-- Repository-only migration. Do not execute against a remote Supabase project under this gate.
-- Purpose: create/align the minimum public.whatsapp_leads contract required by
-- app/lib/bossa-leads-adapter.ts without expanding the approved runtime surface.

create table if not exists public.whatsapp_leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  source text,
  message text,
  status text not null default 'New',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Fail closed if an existing table does not expose the adapter's required UUID id.
do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'whatsapp_leads'
      and column_name = 'id'
      and data_type = 'uuid'
  ) then
    raise exception 'whatsapp_leads parity check failed: required uuid id column is missing or incompatible';
  end if;
end;
$$;

-- If the table already exists locally with a partial shape, add only the
-- adapter-required columns. Existing data/columns are preserved.
alter table public.whatsapp_leads
  add column if not exists name text,
  add column if not exists phone text,
  add column if not exists source text,
  add column if not exists message text,
  add column if not exists status text,
  add column if not exists created_at timestamptz,
  add column if not exists updated_at timestamptz;

alter table public.whatsapp_leads
  alter column status set default 'New',
  alter column created_at set default now(),
  alter column updated_at set default now();

update public.whatsapp_leads
set
  status = coalesce(nullif(btrim(status), ''), 'New'),
  created_at = coalesce(created_at, now()),
  updated_at = coalesce(updated_at, created_at, now())
where
  status is null
  or btrim(status) = ''
  or created_at is null
  or updated_at is null;

alter table public.whatsapp_leads
  alter column status set not null,
  alter column created_at set not null,
  alter column updated_at set not null;

alter table public.whatsapp_leads
  drop constraint if exists whatsapp_leads_status_check;

alter table public.whatsapp_leads
  add constraint whatsapp_leads_status_check check (
    status in (
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
  );

create index if not exists whatsapp_leads_created_at_idx
  on public.whatsapp_leads (created_at desc);

create index if not exists whatsapp_leads_status_idx
  on public.whatsapp_leads (status);

create or replace function public.set_whatsapp_leads_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_whatsapp_leads_updated_at on public.whatsapp_leads;

create trigger set_whatsapp_leads_updated_at
before update on public.whatsapp_leads
for each row
execute function public.set_whatsapp_leads_updated_at();

alter table public.whatsapp_leads enable row level security;

-- The current application adapter performs reads/inserts/status updates only
-- through the server-side service-role boundary. Do not grant direct browser
-- access to anon/authenticated roles under this parity gate.
revoke all on table public.whatsapp_leads from anon;
revoke all on table public.whatsapp_leads from authenticated;
revoke all on table public.whatsapp_leads from service_role;
grant select, insert, update on table public.whatsapp_leads to service_role;

comment on table public.whatsapp_leads is
  'BOSSA active lead adapter table. Minimum contract for server-side lead capture/admin status operations.';

comment on column public.whatsapp_leads.message is
  'Safe serialized click-context JSON/text from the server-side adapter; do not place secrets or payment credentials here.';
