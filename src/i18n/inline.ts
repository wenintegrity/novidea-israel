// Minimal inline formatting for long-form content (prose blocks): escapes HTML, then turns
// [label](href) into links. Only http(s), mailto:, tel:, site-relative and #anchor hrefs are allowed.
// The special href "#cookie-settings" becomes a button that opens the cookie settings dialog.

function escape(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/|#)/;

/** Placeholders still to fill in, e.g. "[לעדכון: שם הרכז]", are highlighted with <mark>. */
const PLACEHOLDER = /\[(לעדכון|TODO):([^\]]*)\](?!\()/g;

export function renderInline(text: string): string {
  return renderLinks(escape(text)).replace(PLACEHOLDER, '<mark>[$1:$2]</mark>');
}

function renderLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label: string, href: string) => {
    if (href === '#cookie-settings') {
      return `<button type="button" class="prose-link-button" data-consent-open>${label}</button>`;
    }
    if (!SAFE_HREF.test(href)) return match;
    const external = /^https?:\/\//.test(href);
    const dir = /^(mailto:|tel:|https?:)/.test(href) ? ' dir="ltr"' : '';
    return `<a href="${href}"${external ? ' rel="noopener"' : ''}${dir}>${label}</a>`;
  });
}
