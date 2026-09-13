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

      const requestId = response.headers.get('x-request-id') || undefined;
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

      const data = (await response.json()) as {
        output_text?: string;
        output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
      };

      const text = data.output_text || data.output?.flatMap((item) => item.content || []).find((item) => item.type === 'output_text')?.text;
      if (!text) throw new ConciergeProviderError('empty_response', 'AI provider returned no response text.', { requestId });

      return text.trim();
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
