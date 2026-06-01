import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_LEAD_TYPES = [
  'weekend_fire_order',
  'reservation',
  'party_event_quote',
  'general_inquiry',
] as const;

const ALLOWED_INTENTS = [
  'order',
  'reserve',
  'party_quote',
  'deposit',
  'customizer',
  'contact',
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.lead_type) {
      return NextResponse.json(
        {
          ok: false,
          error: 'lead_type is required.',
        },
        { status: 400 },
      );
    }

    if (!ALLOWED_LEAD_TYPES.includes(body.lead_type)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid lead_type.',
        },
        { status: 400 },
      );
    }

    if (
      body.intent &&
      !ALLOWED_INTENTS.includes(body.intent)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid intent.',
        },
        { status: 400 },
      );
    }

    const leadId = randomUUID();

    const leadRecord = {
      id: leadId,
      created_at: new Date().toISOString(),
      ...body,
    };

    // Future implementation:
    // 1. Validate with Zod.
    // 2. Insert into Supabase.
    // 3. Optional notification workflow.
    // 4. Optional CRM sync.

    if (process.env.NODE_ENV !== 'production') {
      console.info('[BOSSA lead]', leadRecord);
    }

    return NextResponse.json({
      ok: true,
      lead_id: leadId,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: 'Invalid request payload.',
      },
      { status: 400 },
    );
  }
}
