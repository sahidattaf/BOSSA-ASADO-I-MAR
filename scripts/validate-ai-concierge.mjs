import fs from 'node:fs';
import ts from 'typescript';

const required = [
  'app/api/ai-concierge/route.ts',
  'app/ai-concierge/AiConciergeChat.tsx',
  'app/lib/ai-concierge/knowledge.ts',
  'app/lib/ai-concierge/provider.ts',
  'app/lib/ai-concierge/guardrails.ts',
  'supabase/migrations/20260911_align_bossa_leads_concierge_types.sql',
  'evals/test-cases.md',
];

const failures = [];
for (const file of required) if (!fs.existsSync(file)) failures.push(`missing ${file}`);

const route = fs.readFileSync('app/api/ai-concierge/route.ts', 'utf8');
const guardrails = fs.readFileSync('app/lib/ai-concierge/guardrails.ts', 'utf8');
const knowledge = fs.readFileSync('app/lib/ai-concierge/knowledge.ts', 'utf8');
const evals = fs.readFileSync('evals/test-cases.md', 'utf8');
const migration = fs.readFileSync('supabase/migrations/20260911_align_bossa_leads_concierge_types.sql', 'utf8');
const provider = fs.readFileSync('app/lib/ai-concierge/provider.ts', 'utf8');

const checks = [
  ['message length guard', route.includes('MAX_MESSAGE_LENGTH')],
  ['rate limit guard', route.includes('checkRateLimit')],
  ['generic provider failure', route.includes('temporarily unavailable')],
  ['reservation is not confirmation', route.includes('never a confirmed booking')],
  ['allergy guard', route.includes('never guarantee safety')],
  ['four-language support', ['en', 'pap', 'nl', 'es'].every((lang) => route.includes(`'${lang}'`))],
  ['menu source imported', knowledge.includes("../../data/menu")],
  ['site config imported', knowledge.includes("../../data/site")],
  ['structured reservation handoff', guardrails.includes('Party size: ___')],
  ['28 eval cases retained', (evals.match(/^## E\d+/gm) || []).length >= 28],
  ['schema includes concierge lead types', ['catering', 'private_event', 'tourist_experience', 'partner', 'contact'].every((type) => migration.includes(`'${type}'`))],
  ['provider timeout configured', provider.includes('REQUEST_TIMEOUT_MS') && provider.includes('AbortController')],
  ['transient retry configured', provider.includes('MAX_ATTEMPTS') && provider.includes('response.status === 429 || response.status >= 500')],
  ['sanitized provider diagnostics', route.includes('request_id') && route.includes('retryable') && !route.includes('OPENAI_API_KEY')],
  ['two-attempt ceiling unchanged', provider.includes('MAX_ATTEMPTS = 2')],
  ['route maxDuration covers two-attempt provider recovery', (() => {
    const match = route.match(/export const maxDuration = (\d+)/);
    if (!match) return false;
    const timeoutMatch = provider.match(/REQUEST_TIMEOUT_MS = (\d+)/);
    if (!timeoutMatch) return false;
    // Worst case: two full provider timeouts plus backoff between attempts.
    const worstCaseMs = Number(timeoutMatch[1]) * 2 + 1000;
    return Number(match[1]) * 1000 >= worstCaseMs;
  })()],
  ['full-reply language purity instruction present', route.includes('ENTIRE reply') && route.includes('Do not switch into English mid-reply')],
  ['WhatsApp handoff text is language-aware', guardrails.includes("buildWhatsAppText(intent: ConciergeIntent, language: ConciergeLanguage")],
  ['ordinary grounded answers do not append unrequested handoff content', route.includes('answer that fact directly and stop there')],
  ['Papiamentu purity instruction avoids Spanish loanwords', route.includes('Do not substitute Spanish words such as "abierto", "disponibilidad" or "estado actual"') && route.includes('Spanish weekday abbreviations such as "Jue"')],
  ['internal data-format terms (e.g. JSON) never presented to customers', route.includes('internal implementation details such as data formats, file names or "JSON"') && !route.includes('BOSSA KNOWLEDGE JSON')],
  ['cross-contact warning stays general, no unverified equipment claims', route.includes('do not assert specific unverified equipment')],
  ['terminal provider failure prepares a structured handoff instead of a bare error', route.includes('needsHumanHandoff(intent, message)') && route.includes("handoff_text: fallbackHandoff ? buildWhatsAppText(intent, language) : null")],
];

for (const [name, passed] of checks) {
  console.log(`${passed ? 'PASS' : 'FAIL'} ${name}`);
  if (!passed) failures.push(name);
}

const compiledGuardrails = ts.transpileModule(guardrails, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const module = { exports: {} };
new Function('exports', 'module', 'require', compiledGuardrails)(module.exports, module, () => ({}));
const { detectLanguage } = module.exports;

const languageCases = [
  ['E02 English', 'Are you open Monday?', 'en'],
  ['E13 Papiamentu', 'Unda BOSSA ta keda?', 'pap'],
  ['E14 Papiamentu', "Mi por reserva pa 6 hende awe 8'or?", 'pap'],
  ['E15 Dutch', 'Zijn jullie zondag open?', 'nl'],
  ['E16 Dutch', 'Kun je een tafel voor ons bevestigen?', 'nl'],
  ['E17 Spanish', '¿Dónde están ubicados?', 'es'],
  ['E18 Spanish', '¿Tienen disponibilidad para 4 esta noche?', 'es'],
  ['E26 mixed', 'Bon dia, can you tell me the opening hours por favor?', 'pap'],
];

for (const [name, input, expected] of languageCases) {
  const actual = detectLanguage(input);
  const passed = actual === expected;
  console.log(`${passed ? 'PASS' : 'FAIL'} ${name}: ${actual}`);
  if (!passed) failures.push(`${name} expected ${expected}, got ${actual}`);
}

if (failures.length) {
  console.error(`Validation failed: ${failures.join(', ')}`);
  process.exit(1);
}
console.log(`PASS ${checks.length} concierge MVP controls + ${languageCases.length} executable language cases validated`);

// Keep provider behavior executable in the existing deployment validation gate.
await import('./test-ai-concierge-provider.mjs');
await import('./test-ai-concierge-grounding.mjs');
