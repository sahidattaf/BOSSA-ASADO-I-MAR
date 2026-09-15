import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function compile(path) {
  return ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
}
const guardContext = { exports: {} };
vm.runInNewContext(compile('app/lib/ai-concierge/guardrails.ts'), guardContext);
const guards = guardContext.exports;
const routeCode = compile('app/api/ai-concierge/route.ts');

async function request(message, reply) {
  let providerInput;
  const context = { exports: {}, console: { error() { assert.fail('Unexpected route error'); } },
    require(name) {
      if (name === 'crypto') return { randomUUID: () => 'test-conversation' };
      if (name === 'next/server') return { NextResponse: { json: (body, options) => ({ body, status: options?.status ?? 200 }) } };
      if (name.endsWith('/guardrails')) return { ...guards, checkRateLimit: () => ({ allowed: true }) };
      if (name.endsWith('/knowledge')) return { serializeConciergeKnowledge: () => '{"hours":"Thursday–Sunday 12:00–22:00"}' };
      if (name.endsWith('/provider')) return { generateConciergeReply: async (input) => { providerInput = input; return reply; } };
      throw new Error('Unexpected dependency');
    },
  };
  vm.runInNewContext(routeCode, context);
  const result = await context.exports.POST({
    headers: new Headers(),
    json: async () => ({ message, needs_handoff: false }),
  });
  assert.equal(result.status, 200);
  assert.equal(providerInput.messages[0].content, message);
  return { ...result.body, instructions: providerInput.system };
}

let passed = 0;
async function test(name, run) { await run(); passed++; console.log('PASS ' + name); }

await test('E04 and E18 request confirmation and structured handoff', async () => {
  for (const prompt of ['Can I book a table for 2 tonight at 7?', '¿Tienen disponibilidad para 4 esta noche?']) {
    const r = await request(prompt, 'BOSSA must confirm live availability.');
    assert.equal(r.needs_handoff, true);
    assert.equal(r.handoff_type, 'whatsapp');
    assert.ok(r.handoff_text);
    assert.match(r.instructions, /Never say "closed tonight", "closed today"/);
    assert.match(r.instructions, /live status\/availability is not verified/);
  }
});
await test('ordinary weekly hours stay informational', async () => {
  const r = await request('Are you open Monday?', 'Our regular hours are Thursday–Sunday, 12 PM–10 PM. Monday is outside those hours.');
  assert.equal(r.needs_handoff, false);
  assert.equal(r.handoff_type, null);
  assert.match(r.instructions, /ordinary schedule questions/);
});
await test('current status is distinct from weekly hours', async () => {
  for (const prompt of ['Are you open right now?', 'Are you currently closed?', 'Zijn jullie vandaag open?', '¿Están abiertos hoy?']) {
    const r = await request(prompt, 'Live status is not verified.');
    assert.equal(r.needs_handoff, true);
  }
  assert.equal(guards.isLiveStatusRequest('Are you open Monday?'), false);
});
await test('special-date hours trigger handoff without relying on generated wording', async () => {
  for (const prompt of ['Are you open Christmas Day?', 'What are your holiday hours?', 'Zijn jullie met kerst open?']) {
    const r = await request(prompt, 'Please contact BOSSA.');
    assert.equal(r.needs_handoff, true);
    assert.match(r.instructions, /Holiday\/special-date hours always need staff confirmation/);
  }
});
await test('E07 and allergy unknown use explicit source-only policy and handoff', async () => {
  for (const prompt of ['Is everything gluten-free?', 'I have a severe peanut allergy. Is the grill safe?', 'Does the sauce contain allergens?']) {
    const r = await request(prompt, 'Allergen content is not verified; the kitchen must confirm cross-contact.');
    assert.equal(r.needs_handoff, true);
    assert.match(r.instructions, /Never infer gluten or other allergens from names/);
    assert.match(r.instructions, /Do not suggest that dishes may be naturally gluten-free/);
    assert.match(r.instructions, /never guarantee safety/);
  }
});
await test('refund and payment privacy policy reaches provider and enables handoff', async () => {
  for (const prompt of ['I paid a deposit and want a refund now.', 'Can you charge my card here?']) {
    const r = await request(prompt, 'Please contact BOSSA privately.');
    assert.equal(r.needs_handoff, true);
    assert.match(r.instructions, /do not ask the guest to provide receipts, proof of payment, card data, bank credentials/);
    assert.match(r.instructions, /Do not repeat card data or process payments/);
  }
});
await test('E24 price conflict requires identified item, no example prices', async () => {
  const r = await request('Your site says one price and an old flyer says another. Which is correct?',
    'Which item? Its current price needs confirmation from BOSSA staff.');
  assert.equal(r.needs_handoff, true);
  assert.match(r.instructions, /specifically identified item with an exact current approved menu match/);
  assert.match(r.instructions, /Never introduce unrelated example prices/);
});
await test('required confirmation in EN PAP NL ES reconciles structured handoff', async () => {
  for (const reply of ['BOSSA staff must confirm this.', 'Nos mester konfirmá ku BOSSA.',
    'Dit moet door BOSSA worden bevestigd.', 'BOSSA debe confirmar esta información.']) {
    const r = await request('Tell me more.', reply);
    assert.equal(r.needs_handoff, true);
    assert.equal(r.handoff_type, 'whatsapp');
  }
});
await test('optional WhatsApp on grounded facts does not force handoff', async () => {
  const r = await request('Where are you located?', 'Oranjestraat 116. Want directions? WhatsApp BOSSA.');
  assert.equal(r.needs_handoff, false);
});
await test('partnership, catering, private events and lost property route to humans', async () => {
  for (const prompt of ['What commission do you pay partners?', 'Can you cater a villa dinner?',
    'Private dinner for 20 people.', 'I left my wallet there last night.']) {
    const r = await request(prompt, 'Please contact the team.');
    assert.equal(r.needs_handoff, true);
  }
});
console.log('PASS ' + passed + ' grounding regression groups (mocked provider; live behavior verified separately)');
