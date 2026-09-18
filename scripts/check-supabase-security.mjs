import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const trackedFiles = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean).filter((file) => !file.startsWith('node_modules/'));
const textFiles = trackedFiles.filter((file) => !/\.(png|jpe?g|gif|webp|ico|woff2?|pdf)$/i.test(file));
const forbiddenSecretValue = /(?:SUPABASE_SERVICE_ROLE_KEY|NOTION_API_KEY|STRIPE_SECRET_KEY)\s*=\s*[^\s#`][^\r\n]*/;
const secretToken = /(?:sb_secret_[A-Za-z0-9._-]+|sk_live_[A-Za-z0-9][A-Za-z0-9._-]+)/;

for (const file of textFiles) {
  if (file === 'scripts/check-supabase-security.mjs') continue;
  const content = readFileSync(file, 'utf8');
  if (forbiddenSecretValue.test(content) || secretToken.test(content)) throw new Error(`Secret-like value detected in tracked file: ${file}`);
}

const serverHelper = readFileSync('app/lib/supabase-server.ts', 'utf8');
for (const forbidden of ['SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_PUBLISHABLE_KEY']) {
  if (serverHelper.includes(forbidden)) throw new Error(`Public/alternate Supabase fallback remains in server helper: ${forbidden}`);
}
for (const route of ['app/api/admin/leads/route.ts', 'app/api/admin/leads/[id]/route.ts']) {
  if (!readFileSync(route, 'utf8').includes('authorizeAdminRequest')) throw new Error(`Admin route lacks authentication: ${route}`);
}
const migration = readFileSync('supabase/migrations/20260531_create_bossa_leads.sql', 'utf8').toLowerCase();
for (const proof of ['enable row level security', 'create policy', 'to anon', 'for insert', 'with check']) {
  if (!migration.includes(proof)) throw new Error(`Repository RLS proof is incomplete: missing ${proof}`);
}
console.log('Security repair checks passed: no tracked secret values, no public Supabase fallback, admin auth present, and repository RLS proof found.');