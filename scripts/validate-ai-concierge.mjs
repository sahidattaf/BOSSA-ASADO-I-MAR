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
