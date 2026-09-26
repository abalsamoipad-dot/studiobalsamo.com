// Existing endpoint already used by the published Studio Balsamo website.
export const CONTACT_ENDPOINT = 'https://formspree.io/f/xnnljgoa';

export async function sendContactRequest(data, { fetchImpl = globalThis.fetch, timeoutMs = 15000 } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(CONTACT_ENDPOINT, {
      method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Contact service returned ${response.status}`);
  } finally {
    clearTimeout(timeout);
  }
}
