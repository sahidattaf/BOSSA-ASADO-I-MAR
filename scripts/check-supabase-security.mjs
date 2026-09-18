import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const scanned = files.filter((file) => !/\.(md|png|jpe?g|gif|webp|ico|woff2?|pdf)$/i.test(file) && file !== 'scripts/check-supabase-security.mjs');
function gitGrep(pattern) {
  try { return execFileSync('git', ['grep', '-I', '-n', '-E', pattern, '--', ...scanned], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); }
  catch (error) { if (error.status === 1) return ''; throw error; }
}
const secretAssignments = gitGrep('^(SUPABASE_SERVICE_ROLE_KEY|NOTION_API_KEY|STRIPE_SECRET_KEY)=[^[:space:]#`]{8,}$');
const secretTokens = gitGrep('(sb_secret_[A-Za-z0-9._-]{8,}|sk_(live|test)_[A-Za-z0-9._-]{8,})');
if (secretAssignments || secretTokens) throw new Error(`Secret-like value detected in tracked files:\n${secretAssignments}${secretTokens}`);

const adapter = readFileSync('app/lib/bossa-leads-adapter.ts', 'utf8');
for (const proof of ['whatsapp_leads', 'insertBossaClickLead', 'updateBossaLeadStatus']) {
  if (!adapter.includes(proof)) throw new Error(`Active schema adapter proof is incomplete: ${proof}`);
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
console.log('Security repair checks passed.');