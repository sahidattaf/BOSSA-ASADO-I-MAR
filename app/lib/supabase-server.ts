type SupabaseErrorPayload = {
  data?: unknown;
  error?: {
    message?: string;
    details?: string;
    hint?: string;
    code?: string;
  } | null;
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
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

function getSupabaseHeaders(extraHeaders: Record<string, string> = {}) {
  if (!SUPABASE_SERVER_KEY) {
    throw new Error('Supabase key is not configured.');
  }

  return {
    apikey: SUPABASE_SERVER_KEY,
    Authorization: `Bearer ${SUPABASE_SERVER_KEY}`,
    'Content-Type': 'application/json',
    ...extraHeaders,
  };
}

function getSupabaseErrorMessage(payload: unknown, status: number) {
  const errorPayload = payload as SupabaseErrorPayload;

  return (
    errorPayload.error?.message ??
    errorPayload.error?.details ??
    errorPayload.message ??
    errorPayload.details ??
    `Supabase request failed with status ${status}.`
  );
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
    headers: getSupabaseHeaders({
      Prefer: 'return=representation',
    }),
    body: JSON.stringify(record),
    cache: 'no-store',
  });

  const payload = (await response.json()) as SupabaseErrorPayload | unknown[];

  if (!response.ok) {
    throw new Error(getSupabaseErrorMessage(payload, response.status));
  }

  return payload;
}

export async function selectSupabaseRows<TRecord>(
  tableName: string,
  query = 'select=*&order=created_at.desc&limit=100',
) {
  if (!SUPABASE_URL || !SUPABASE_SERVER_KEY) {
    throw new Error('Supabase environment variables are not configured.');
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}?${query}`, {
    method: 'GET',
    headers: getSupabaseHeaders(),
    cache: 'no-store',
  });

  const payload = (await response.json()) as SupabaseErrorPayload | TRecord[];

  if (!response.ok) {
    throw new Error(getSupabaseErrorMessage(payload, response.status));
  }

  return payload as TRecord[];
}
