import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = fs.readFileSync('app/lib/ai-concierge/provider.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const sensitive = 'PRIVATE_TEST_SENTINEL';
const input = { system: sensitive, messages: [{ role: 'user', content: sensitive }] };
const message = (...texts) => ({
  type: 'message', role: 'assistant', status: 'completed',
  content: texts.map((text) => ({ type: 'output_text', text, annotations: [] })),
});
const envelope = (output = []) => ({
  object: 'response', id: 'resp_fixture', status: 'completed',
  error: null, incomplete_details: null, output,
});
function harness(responses = []) {
  const calls = [];
  const logs = [];
  const timers = new Map();
  let nextTimer = 0;
  const context = {
    exports: {}, AbortController, Error, SyntaxError,
    process: { env: { OPENAI_API_KEY: sensitive } },
    console: Object.fromEntries(['log', 'info', 'warn', 'error'].map((method) => [
      method, (...args) => logs.push(args),
    ])),
    setTimeout(fn, ms) {
      const id = ++nextTimer;
      if (ms < 1000) queueMicrotask(fn);
      else timers.set(id, fn);
      return id;
    },
    clearTimeout(id) { timers.delete(id); },
    async fetch(url, options) {
      calls.push({ url, options });
      const next = responses[calls.length - 1];
      assert.ok(next, 'Unexpected extra provider attempt');
      if (next.network) throw new Error(sensitive);
      if (next.timeout) {
        for (const fn of timers.values()) fn();
        assert.equal(options.signal.aborted, true);
        const error = new Error(sensitive);
        error.name = 'AbortError';
        throw error;
      }
      return {
        ok: (next.status ?? 200) < 400,
        status: next.status ?? 200,
        headers: new Headers({ 'x-request-id': 'req_fixture' }),
        async json() {
          if (next.invalidJson) throw new SyntaxError(sensitive);
          return next.body;
        },
      };
    },
  };
  vm.runInNewContext(compiled, context);
  return { ...context.exports, calls, logs, timers };
}

let passed = 0;
async function test(name, run) {
  await run();
  passed += 1;
  console.log('PASS ' + name);
}
const extractor = harness().extractResponseText;
await test('A: top-level text takes precedence without duplication', () => {
  assert.equal(extractor({ ...envelope([message('duplicate')]), output_text: ' Hello ' }), 'Hello');
});
await test('B: nested assistant output_text content', () => {
  assert.equal(extractor(envelope([message('Bon dia')])), 'Bon dia');
});
await test('C: concatenate all segments and messages in order', () => {
  assert.equal(extractor(envelope([message('', 'Bon ', 'dia'), message(' BOSSA')])), 'Bon dia BOSSA');
  assert.equal(extractor({ ...envelope([message('Nested')]), output_text: '   ' }), 'Nested');
});
await test('D: valid reasoning-only and whitespace responses have no usable text', () => {
  assert.equal(extractor(envelope([{ type: 'reasoning', summary: [] }])), '');
  assert.equal(extractor(envelope([message('  ')])), '');
});
await test('E: malformed and unsupported shapes do not throw or become text', () => {
  for (const value of [null, [], 7, 'text', {}, { output: {} },
    { output_text: {} }, envelope([null, { type: 'message', content: {} }]),
    envelope([{ ...message('ignored'), role: 'user' }]),
    envelope([{ ...message(), content: [{ type: 'text', text: 'unsupported' }] }]),
    envelope([{ type: 'reasoning', text: 'private reasoning' }])]) {
    assert.equal(extractor(value), '');
    assert.equal(harness().isRetryableEmptyResponse(value), false);
  }
});
await test('F: transient completed empty retries once and recovers', async () => {
  const h = harness([{ body: envelope() }, { body: envelope([message('Recovered')]) }]);
  assert.equal(await h.generateConciergeReply(input), 'Recovered');
  assert.equal(h.calls.length, 2);
  assert.equal(h.logs.length, 1);
  assert.equal(JSON.parse(h.logs[0][1]).retryable, true);
  assert.equal(h.timers.size, 0);
});
await test('G: retry exhaustion is a bounded controlled provider error', async () => {
  const h = harness([{ body: envelope() }, { body: envelope() }]);
  await assert.rejects(h.generateConciergeReply(input), (error) =>
    error instanceof h.ConciergeProviderError && error.code === 'empty_response' &&
    error.status === 200 && error.retryable === true);
  assert.equal(h.calls.length, 2);
  assert.deepEqual(h.logs.map((log) => JSON.parse(log[1]).attempt), [1, 2]);
  assert.equal(h.timers.size, 0);
});
await test('H: diagnostics never include sensitive text or full payloads', async () => {
  const body = {
    ...envelope(), id: sensitive, status: sensitive, output_text: { text: sensitive },
    instructions: sensitive, authorization: sensitive, customer: sensitive,
    output: [{ type: sensitive, content: [{ type: sensitive, text: sensitive }] }],
  };
  const h = harness([{ body }]);
  await assert.rejects(h.generateConciergeReply(input), { code: 'empty_response', retryable: false });
  const serialized = JSON.stringify(h.logs);
  assert.equal(serialized.includes(sensitive), false);
  assert.equal(serialized.includes('instructions'), false);
  assert.equal(serialized.includes('authorization'), false);
  const shape = JSON.parse(h.logs[0][1]);
  assert.equal(shape.response_id, null);
  assert.equal(shape.response_status, 'unknown');
  assert.equal(shape.output_items[0].type, 'unknown');
  assert.equal(shape.request_id, 'req_fixture');
  assert.equal(shape.top_level_output_text_present, true);
});
await test('incomplete token budget, content filter, refusal and malformed empties never retry', async () => {
  for (const body of [
    { ...envelope(), status: 'incomplete', incomplete_details: { reason: 'max_output_tokens' } },
    { ...envelope(), status: 'incomplete', incomplete_details: { reason: 'content_filter' } },
    envelope([{ ...message(), content: [{ type: 'refusal', refusal: sensitive }] }]),
    { ...envelope(), status: 'failed', error: { message: sensitive } },
    envelope([{ type: 'unknown' }]), { ...envelope(), output: {} },
  ]) {
    const h = harness([{ body }]);
    await assert.rejects(h.generateConciergeReply(input), { code: 'empty_response', retryable: false });
    assert.equal(h.calls.length, 1);
    assert.equal(JSON.stringify(h.logs).includes(sensitive), false);
  }
});
await test('invalid JSON is controlled, sanitized and not retried', async () => {
  const h = harness([{ invalidJson: true }]);
  await assert.rejects(h.generateConciergeReply(input), { code: 'invalid_response', retryable: false });
  assert.equal(h.calls.length, 1);
  assert.equal(JSON.stringify(h.logs).includes(sensitive), false);
});
await test('429 and 5xx retain bounded retries; 4xx do not retry', async () => {
  for (const status of [429, 500, 503]) {
    const h = harness([{ status }, { body: envelope([message('OK')]) }]);
    assert.equal(await h.generateConciergeReply(input), 'OK');
    assert.equal(h.calls.length, 2);
    const exhausted = harness([{ status }, { status }]);
    await assert.rejects(exhausted.generateConciergeReply(input), { code: 'provider_http_error', status, retryable: true });
    assert.equal(exhausted.calls.length, 2);
  }
  for (const status of [400, 401, 403, 404]) {
    const h = harness([{ status }]);
    await assert.rejects(h.generateConciergeReply(input), { code: 'provider_http_error', status, retryable: false });
    assert.equal(h.calls.length, 1);
  }
});
await test('network and abort timeout retain bounded retries and cleanup', async () => {
  for (const [kind, code] of [['network', 'provider_network_error'], ['timeout', 'provider_timeout']]) {
    const h = harness([{ [kind]: true }, { [kind]: true }]);
    await assert.rejects(h.generateConciergeReply(input), { code, retryable: true });
    assert.equal(h.calls.length, 2);
    assert.equal(h.timers.size, 0);
  }
});
await test('successful extraction logs no payload and preserves model configuration', async () => {
  const h = harness([{ body: envelope([message('OK')]) }]);
  assert.equal(await h.generateConciergeReply(input), 'OK');
  assert.equal(h.logs.length, 0);
  const sent = JSON.parse(h.calls[0].options.body);
  assert.equal(sent.model, 'gpt-5-mini');
  assert.equal(sent.max_output_tokens, 500);
});
console.log('PASS ' + passed + ' provider test groups');
