/** Normalise an admin-entered website URL into a safe absolute external URL. */
export function normalizeExternalUrl(raw?: string | null): string | null {
  const value = (raw ?? '').trim();
  if (!value) return null;
  if (/^(javascript|data|vbscript):/i.test(value)) return null;
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value.replace(/^\/+/, '')}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (!url.hostname.includes('.')) return null;
    return url.toString();
  } catch {
    return null;
  }
}
