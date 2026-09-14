type ProviderMessage = { role: 'user' | 'assistant'; content: string };

type ProviderInput = {
  system: string;
  messages: ProviderMessage[];
};

export class ConciergeProviderError extends Error {
  code: string;
  status?: number;
  requestId?: string;
  retryable: boolean;

  constructor(code: string, message: string, options?: { status?: number; requestId?: string; retryable?: boolean }) {
    super(message);
    this.name = 'ConciergeProviderError';
    this.code = code;
    this.status = options?.status;
    this.requestId = options?.requestId;
    this.retryable = Boolean(options?.retryable);
  }
}

const REQUEST_TIMEOUT_MS = 12_000;
const MAX_ATTEMPTS = 2;

function record(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

// Responses API ResponseOutputMessage / ResponseOutputText:
// https://github.com/openai/openai-node/blob/master/src/resources/responses/responses.ts
// output_text is the SDK convenience aggregation; raw REST uses output messages.
// Do not interpret input_text, reasoning, refusal or arbitrary text fields as replies.
export function extractResponseText(value: unknown): string {
  if (!record(value)) return '';
  if (typeof value.output_text === 'string' && value.output_text.trim()) {
    return value.output_text.trim();
  }
  if (!Array.isArray(value.output)) return '';
  const segments: string[] = [];
  for (const item of value.output) {
    if (!record(item) || item.type !== 'message' || item.role !== 'assistant' || !Array.isArray(item.content)) continue;
    for (const content of item.content) {
      if (record(content) && content.type === 'output_text' && typeof content.text === 'string') {
        segments.push(content.text);
      }
    }
  }
  return segments.join('').trim();
}

function safeId(value: unknown, prefix: 'req_' | 'resp_'): string | null {
  return typeof value === 'string' && value.startsWith(prefix) &&
    /^[a-zA-Z0-9_-]{5,128}$/.test(value) ? value : null;
}

function known(value: unknown, allowed: readonly string[]): string {
  return typeof value === 'string' && allowed.includes(value) ? value : 'unknown';
}

export function responseShape(value: unknown) {
  const data = record(value) ? value : {};
  const output = Array.isArray(data.output) ? data.output : [];
  const details = record(data.incomplete_details) ? data.incomplete_details : {};
  return {
    response_id: safeId(data.id, 'resp_'),
    response_status: known(data.status, ['completed', 'incomplete', 'failed', 'cancelled', 'queued', 'in_progress']),
    incomplete_reason: known(details.reason, ['max_output_tokens', 'content_filter']),
    output_item_count: output.length,
    // Cap shape arrays and allowlist labels: never echo arbitrary provider strings.
    output_items: output.slice(0, 20).map((item) => {
      const entry = record(item) ? item : {};
      const content = Array.isArray(entry.content) ? entry.content : [];
      return {
        type: known(entry.type, ['message', 'reasoning', 'function_call', 'web_search_call', 'file_search_call']),
        content_item_count: content.length,
        content_types: content.slice(0, 20).map((part) =>
          known(record(part) ? part.type : null, ['output_text', 'refusal'])),
      };
    }),
    top_level_output_text_present: Object.prototype.hasOwnProperty.call(data, 'output_text'),
    top_level_output_text_is_string: typeof data.output_text === 'string',
  };
}

// Only completed, recognized text-response envelopes can be transient empties.
// Incomplete token budgets, refusals, tool-only/unknown payloads are not retried.
export function isRetryableEmptyResponse(value: unknown): boolean {
  if (!record(value) || value.status !== 'completed' || value.error != null ||
      value.incomplete_details != null || !Array.isArray(value.output) ||
      (value.output_text !== undefined && typeof value.output_text !== 'string')) return false;
  return value.output.every((item) => {
    if (!record(item)) return false;
    if (item.type === 'reasoning') return Array.isArray(item.summary);
    return item.type === 'message' && item.role === 'assistant' && item.status === 'completed' &&
      Array.isArray(item.content) && item.content.every((part) =>
        record(part) && part.type === 'output_text' && typeof part.text === 'string');
  });
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateConciergeReply(input: ProviderInput) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new ConciergeProviderError('missing_api_key', 'AI provider is not configured.');

  const model = process.env.BOSSA_AI_CONCIERGE_MODEL || 'gpt-5-mini';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          instructions: input.system,
          input: input.messages.map((message) => ({
            role: message.role,
            content: [{ type: 'input_text', text: message.content }],
          })),
          max_output_tokens: 500,
        }),
        signal: controller.signal,
      });

      const requestId = safeId(response.headers.get('x-request-id'), 'req_') || undefined;
      if (!response.ok) {
        const retryable = response.status === 429 || response.status >= 500;
        if (retryable && attempt < MAX_ATTEMPTS) {
          await wait(350 * attempt);
          continue;
        }
        throw new ConciergeProviderError('provider_http_error', `AI provider request failed with status ${response.status}.`, {
          status: response.status,
          requestId,
          retryable,
        });
      }

      let data: unknown;
      try {
        data = await response.json();
      } catch (error) {
        if (!(error instanceof SyntaxError)) throw error;
        console.warn('[BOSSA AI Concierge response shape]', JSON.stringify({
          code: 'invalid_response', status: response.status, request_id: requestId ?? null,
          attempt, retryable: false, ...responseShape(null),
        }));
        throw new ConciergeProviderError('invalid_response', 'AI provider returned invalid JSON.', {
          status: response.status, requestId,
        });
      }
      const text = extractResponseText(data);
      if (text) return text;

      const retryable = isRetryableEmptyResponse(data);
      console.warn('[BOSSA AI Concierge response shape]', JSON.stringify({
        code: 'empty_response', status: response.status, request_id: requestId ?? null,
        attempt, retryable, ...responseShape(data),
      }));
      if (retryable && attempt < MAX_ATTEMPTS) {
        await wait(350 * attempt);
        continue;
      }
      throw new ConciergeProviderError('empty_response', 'AI provider returned no response text.', {
        status: response.status, requestId, retryable,
      });
    } catch (error) {
      if (error instanceof ConciergeProviderError) throw error;

      const timedOut = error instanceof Error && error.name === 'AbortError';
      if (attempt < MAX_ATTEMPTS) {
        await wait(350 * attempt);
        continue;
      }
      throw new ConciergeProviderError(timedOut ? 'provider_timeout' : 'provider_network_error', timedOut ? 'AI provider request timed out.' : 'AI provider request failed.', {
        retryable: true,
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new ConciergeProviderError('provider_unknown_error', 'AI provider request failed.');
}
