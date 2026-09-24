-- BOSSA-WHATSAPP-LEADS-MIGRATION-PARITY-1
-- Local pgTAP contract + RLS/grant proof.

begin;

create extension if not exists pgtap with schema extensions;

select plan(21);

select has_table('public', 'whatsapp_leads', 'public.whatsapp_leads exists');

select has_column('public', 'whatsapp_leads', 'id', 'id column exists');
select has_column('public', 'whatsapp_leads', 'name', 'name column exists');
select has_column('public', 'whatsapp_leads', 'phone', 'phone column exists');
select has_column('public', 'whatsapp_leads', 'source', 'source column exists');
select has_column('public', 'whatsapp_leads', 'message', 'message column exists');
select has_column('public', 'whatsapp_leads', 'status', 'status column exists');
select has_column('public', 'whatsapp_leads', 'created_at', 'created_at column exists');
select has_column('public', 'whatsapp_leads', 'updated_at', 'updated_at column exists');

select col_type_is('public', 'whatsapp_leads', 'id', 'uuid', 'id is uuid');
select col_type_is('public', 'whatsapp_leads', 'status', 'text', 'status is text');
select col_type_is('public', 'whatsapp_leads', 'created_at', 'timestamp with time zone', 'created_at is timestamptz');
select col_type_is('public', 'whatsapp_leads', 'updated_at', 'timestamp with time zone', 'updated_at is timestamptz');

select ok(
  (select relrowsecurity from pg_class where oid = 'public.whatsapp_leads'::regclass),
  'RLS is enabled'
);

select ok(
  not has_table_privilege('anon', 'public.whatsapp_leads', 'SELECT'),
  'anon cannot select whatsapp_leads'
);
select ok(
  not has_table_privilege('anon', 'public.whatsapp_leads', 'INSERT'),
  'anon cannot insert whatsapp_leads directly'
);
select ok(
  not has_table_privilege('anon', 'public.whatsapp_leads', 'UPDATE'),
  'anon cannot update whatsapp_leads directly'
);
select ok(
  not has_table_privilege('authenticated', 'public.whatsapp_leads', 'SELECT'),
  'authenticated cannot select whatsapp_leads directly'
);
select ok(
  has_table_privilege('service_role', 'public.whatsapp_leads', 'SELECT')
  and has_table_privilege('service_role', 'public.whatsapp_leads', 'INSERT')
  and has_table_privilege('service_role', 'public.whatsapp_leads', 'UPDATE'),
  'service_role has server-side adapter privileges'
);

select is(
  (select count(*)::integer
   from public.whatsapp_leads
   where id in (
     '00000000-0000-4000-8000-000000000101'::uuid,
     '00000000-0000-4000-8000-000000000102'::uuid,
     '00000000-0000-4000-8000-000000000103'::uuid
   )),
  3,
  'three synthetic seed leads are present'
);

select ok(
  not has_table_privilege('service_role', 'public.whatsapp_leads', 'DELETE'),
  'service_role does not receive delete privilege from this migration'
);

select * from finish();

rollback;
