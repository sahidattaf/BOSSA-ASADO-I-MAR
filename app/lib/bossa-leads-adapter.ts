import { insertSupabaseRow, selectSupabaseRows, updateSupabaseRows } from './supabase-server';

const ACTIVE_LEADS_TABLE = 'whatsapp_leads';

export type BossaAdminLead = {
  id: string;
  created_at: string;
  updated_at: string;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  lead_type: 'weekend_fire_order' | 'reservation' | 'party_event_quote' | 'general_inquiry';
  intent: string | null;
  offer: string | null;
  item_name: string | null;
  box_number: string | null;
  estimated_value: number | null;
  actual_value: number | null;
  currency: 'XCG' | 'USD';
  lead_status: string;
  order_status: string;
  payment_status: string;
  follow_up_owner: string | null;
  follow_up_due: string | null;
  last_follow_up_at: string | null;
  staff_notes: string | null;
  metadata: Record<string, unknown>;
};

type ActiveWhatsAppLead = {
  id: string;
  name: string | null;
  phone: string | null;
  source: string | null;
  message: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
};

function inferLeadType(source: string | null, message: string | null): BossaAdminLead['lead_type'] {
  const value = `${source ?? ''} ${message ?? ''}`.toLowerCase();
  if (value.includes('party') || value.includes('event')) return 'party_event_quote';
  if (value.includes('reservation') || value.includes('reserve')) return 'reservation';
  if (value.includes('weekend') || value.includes('box') || value.includes('order')) return 'weekend_fire_order';
  return 'general_inquiry';
}

function normalizeStatus(value: string | null) {
  return value?.trim() || 'New';
}

function mapActiveLead(row: ActiveWhatsAppLead): BossaAdminLead {
  return {
    id: row.id,
    created_at: row.created_at ?? new Date(0).toISOString(),
    updated_at: row.updated_at ?? row.created_at ?? new Date(0).toISOString(),
    source_page: row.source,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    lead_type: inferLeadType(row.source, row.message),
    intent: null,
    offer: null,
    item_name: null,
    box_number: null,
    estimated_value: null,
    actual_value: null,
    currency: 'XCG',
    lead_status: normalizeStatus(row.status),
    order_status: 'Not Started',
    payment_status: 'Not Required',
    follow_up_owner: null,
    follow_up_due: null,
    last_follow_up_at: null,
    staff_notes: null,
    metadata: { active_table: ACTIVE_LEADS_TABLE, customer_name_present: Boolean(row.name), phone_present: Boolean(row.phone) },
  };
}

export async function selectBossaAdminLeads() {
  const rows = await selectSupabaseRows<ActiveWhatsAppLead>(
    ACTIVE_LEADS_TABLE,
    'select=id,name,phone,source,message,status,created_at,updated_at&order=created_at.desc&limit=100',
  );
  return rows.map(mapActiveLead);
}

export async function insertBossaClickLead(record: {
  id: string;
  source_page: string | null;
  lead_type: string;
  intent: string | null;
  offer: string | null;
  item_name: string | null;
  box_number: string | null;
  estimated_value: number | null;
  currency: string;
  metadata: Record<string, unknown>;
}) {
  return insertSupabaseRow(ACTIVE_LEADS_TABLE, {
    id: record.id,
    source: record.source_page,
    message: JSON.stringify({
      lead_type: record.lead_type,
      intent: record.intent,
      offer: record.offer,
      item_name: record.item_name,
      box_number: record.box_number,
      estimated_value: record.estimated_value,
      currency: record.currency,
      metadata: record.metadata,
    }),
    status: 'WhatsApp Clicked',
  });
}

export async function updateBossaLeadStatus(id: string, status: string) {
  const result = await updateSupabaseRows(ACTIVE_LEADS_TABLE, `id=eq.${encodeURIComponent(id)}`, {
    status,
    updated_at: new Date().toISOString(),
  });
  return result;
}