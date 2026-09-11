import fs from 'node:fs';

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
];

for (const [name, passed] of checks) {
  console.log(`${passed ? 'PASS' : 'FAIL'} ${name}`);
  if (!passed) failures.push(name);
}

if (failures.length) {
  console.error(`Validation failed: ${failures.join(', ')}`);
  process.exit(1);
}
console.log(`PASS ${checks.length} concierge MVP controls validated`);
