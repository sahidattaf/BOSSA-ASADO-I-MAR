type ProviderMessage = { role: 'user' | 'assistant'; content: string };

type ProviderInput = {
  system: string;
  messages: ProviderMessage[];
};

export async function generateConciergeReply(input: ProviderInput) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('AI provider is not configured.');

  const model = process.env.BOSSA_AI_CONCIERGE_MODEL || 'gpt-5-mini';
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
  });

  if (!response.ok) throw new Error(`AI provider request failed with status ${response.status}.`);

  const data = (await response.json()) as {
    output_text?: string;
    output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
  };

  const text = data.output_text || data.output?.flatMap((item) => item.content || []).find((item) => item.type === 'output_text')?.text;
  if (!text) throw new Error('AI provider returned no response text.');

  return text.trim();
}
