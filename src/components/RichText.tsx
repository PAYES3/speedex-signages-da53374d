import { sanitizeHtml } from '@/lib/cms/sanitize';

/** Renders admin-authored rich text safely. */
export function RichText({ html, className = '' }: { html?: string | null; className?: string }) {
  if (!html || !html.trim()) return null;
  return <div className={`prose-cms ${className}`} dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />;
}
