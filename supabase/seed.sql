-- BOSSA-WHATSAPP-LEADS-MIGRATION-PARITY-1
-- Synthetic local seed only. No real customer data.

insert into public.whatsapp_leads (
  id,
  name,
  phone,
  source,
  message,
  status,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-4000-8000-000000000101',
    'Synthetic Weekend Fire',
    '+59990000001',
    '/weekend-fire',
    '{"lead_type":"weekend_fire_order","intent":"order","item_name":"Synthetic Fire Box","currency":"XCG","metadata":{"synthetic":true}}',
    'WhatsApp Clicked',
    now() - interval '30 minutes',
    now() - interval '30 minutes'
  ),
  (
    '00000000-0000-4000-8000-000000000102',
    'Synthetic Reservation',
    '+59990000002',
    '/contact',
    '{"lead_type":"reservation","intent":"reserve","currency":"XCG","metadata":{"synthetic":true}}',
    'Awaiting Details',
    now() - interval '20 minutes',
    now() - interval '20 minutes'
  ),
  (
    '00000000-0000-4000-8000-000000000103',
    'Synthetic Event Quote',
    '+59990000003',
    '/private-events',
    '{"lead_type":"party_event_quote","intent":"party_quote","currency":"XCG","metadata":{"synthetic":true}}',
    'Confirmed',
    now() - interval '10 minutes',
    now() - interval '10 minutes'
  )
on conflict (id) do update set
  name = excluded.name,
  phone = excluded.phone,
  source = excluded.source,
  message = excluded.message,
  status = excluded.status,
  updated_at = excluded.updated_at;
