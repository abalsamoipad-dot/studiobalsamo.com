import test from 'node:test';
import assert from 'node:assert/strict';
import { CONTACT_ENDPOINT, sendContactRequest } from '../src/contact.js';

test('sends to the existing endpoint and accepts only a successful response', async () => {
  const data = new FormData();
  data.set('nome', 'Test locale');
  let calls = 0;
  await sendContactRequest(data, { fetchImpl: async (url, options) => {
    calls++;
    assert.equal(url, CONTACT_ENDPOINT);
    assert.equal(options.method, 'POST');
    assert.equal(options.body, data);
    assert.equal(options.headers.Accept, 'application/json');
    return { ok: true, status: 200 };
  } });
  assert.equal(calls, 1);
});

test('does not turn validation or server failure into success', async () => {
  for (const status of [400, 422, 429, 500]) {
    await assert.rejects(sendContactRequest(new FormData(), {
      fetchImpl: async () => ({ ok: false, status }),
    }), new RegExp(String(status)));
  }
});

test('network failure remains an error, without automatic resend', async () => {
  let calls = 0;
  await assert.rejects(sendContactRequest(new FormData(), { fetchImpl: async () => {
    calls++;
    throw new TypeError('Network unavailable');
  } }), /Network unavailable/);
  assert.equal(calls, 1);
});

test('a stalled request is aborted and can be retried by the user', async () => {
  await assert.rejects(sendContactRequest(new FormData(), {
    timeoutMs: 10,
    fetchImpl: async (_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('Timed out')), { once: true });
    }),
  }), /Timed out/);
});
