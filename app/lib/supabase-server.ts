type SupabaseInsertResponse = {
  data?: unknown;
  error?: {
    message?: string;
    details?: string;
    hint?: string;
    code?: string;
  } | null;
};

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.SUPABASE_URL;

const SUPABASE_SERVER_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SECRET_KEY ??
  process.env.SUPABASE_SERVICE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_PUBLISHABLE_KEY;

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVER_KEY);
}

export async function insertSupabaseRow<TRecord extends Record<string, unknown>>(
  tableName: string,
  record: TRecord,
) {
  if (!SUPABASE_URL || !SUPABASE_SERVER_KEY) {
    throw new Error('Supabase environment variables are not configured.');
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVER_KEY,
      Authorization: `Bearer ${SUPABASE_SERVER_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(record),
    cache: 'no-store',
  });

  const payload = (await response.json()) as SupabaseInsertResponse | unknown[];

  if (!response.ok) {
    const errorPayload = payload as SupabaseInsertResponse;

    throw new Error(
      errorPayload.error?.message ??
        errorPayload.error?.details ??
        `Supabase insert failed with status ${response.status}.`,
    );
  }

  return payload;
}
