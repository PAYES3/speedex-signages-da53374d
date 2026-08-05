/** Sanitizes admin-authored HTML before rendering it on the public site. */
const ALLOWED_TAGS = [
  'p','br','strong','b','em','i','u','s','h1','h2','h3','h4','h5','h6',
  'ul','ol','li','a','blockquote','table','thead','tbody','tr','th','td',
  'img','video','source','span','div','hr','code','pre',
];

export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';
  if (typeof window === 'undefined') {
    // Server render: strip scripts, iframes/objects and inline event handlers.
    return dirty
      .replace(/<\s*(script|iframe|object|embed|style)[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/javascript:/gi, '');
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const DOMPurify = require('dompurify');
  const purify = DOMPurify.default ?? DOMPurify;
  return purify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ['href','src','alt','title','target','rel','colspan','rowspan','class','controls','poster','muted','loop','playsinline','style'],
  });
}
