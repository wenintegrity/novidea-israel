// Loads the HubSpot lead form into [data-hubspot-form] — only after marketing-cookie consent.
// Config comes from data attributes (set from src/content/pages/<locale>/contact.yaml):
//   data-portal-id, data-form-id, data-region, data-submit-label
// Same embed as HubSpot's snippet (forms/embed/v2.js + hbspt.forms.create), without inline script,
// so it works under a strict Content-Security-Policy.
//
// HubSpot draws the form inside an iframe, so the site's CSS can't reach it. The iframe is
// same-origin (about:blank), so once the form is in it we style it from here (styleForm):
// the page's language and direction, the brand font, colors and focus ring, and LTR email and
// phone values. Field labels and the field list themselves are set in HubSpot.
import { grant, whenGranted } from './consent';

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create(options: {
          portalId: string;
          formId: string;
          region: string;
          target: string;
          onFormReady?: () => void;
        }): void;
      };
    };
  }
}

const EMBED_SRC = 'https://js.hsforms.net/forms/embed/v2.js';
const STYLE_ID = 'nv-form-style';

// Brand colors (src/styles/tokens.css). The iframe can't read the page's CSS variables, so the
// values are repeated here. Logical properties only: direction comes from the iframe's dir.
const FORM_CSS = `
html, body { background: transparent; }
body, .hs-form, .hs-form *, .submitted-message, .submitted-message * {
  font-family: 'Rubik Variable', 'Rubik', system-ui, sans-serif !important;
  color: #101338;
}
.hs-form fieldset { max-inline-size: none !important; }
.hs-form .hs-form-field { margin-block-end: 1.25rem; }
.hs-form label:not(.hs-form-booleancheckbox-display):not(.hs-form-radio-display) {
  display: block;
  margin-block-end: 0.375rem;
  font-size: 1rem !important;
  font-weight: 500 !important;
  color: #101338 !important;
  text-align: start !important;
}
.hs-form .hs-form-required { color: #c22e2d; margin-inline-start: 0.125rem; }
.hs-form .hs-input:not([type='checkbox']):not([type='radio']) {
  box-sizing: border-box;
  inline-size: 100% !important;
  min-block-size: 3rem;
  padding: 0.75rem 1rem !important;
  border: 1px solid #5e6066 !important;
  border-radius: 2px !important;
  background: #fff !important;
  color: #101338 !important;
  font-size: 1rem !important;
  text-align: start;
}
.hs-form .hs-input[dir='ltr'] { text-align: end; }
.hs-form .hs-input:focus {
  outline: 2px solid #101338 !important;
  outline-offset: 2px;
  border-color: #101338 !important;
  box-shadow: none !important;
}
.hs-form .inputs-list { padding-inline-start: 0 !important; margin: 0; list-style: none; }
.hs-form .hs-error-msgs label, .hs-form .hs-error-msg, .hs-form .hs-main-font-element {
  color: #c22e2d !important;
  font-weight: 500 !important;
}
.hs-form .hs_submit, .hs-form .actions { text-align: start !important; padding: 0 !important; }
.hs-form .hs-button, .hs-form input[type='submit'] {
  min-block-size: 3rem;
  padding: 0.75rem 2rem !important;
  border: 1px solid #101338 !important;
  border-radius: 2px !important;
  background: #101338 !important;
  color: #fff !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  cursor: pointer;
}
.hs-form .hs-button:hover, .hs-form input[type='submit']:hover {
  background: #1b1f4a !important;
  border-color: #1b1f4a !important;
}
.hs-form .hs-button:focus-visible, .hs-form input[type='submit']:focus-visible {
  outline: 2px solid #101338 !important;
  outline-offset: 2px;
}
`;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing && window.hbspt) return resolve();
    const script = existing ?? document.createElement('script');
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
    if (!existing) {
      script.src = src;
      script.charset = 'utf-8';
      document.head.append(script);
    }
  });
}

function show(slot: HTMLElement, state: 'consent' | 'loading' | 'error' | 'ready') {
  slot.dataset.state = state;
  slot.querySelectorAll<HTMLElement>('[data-when]').forEach((el) => {
    el.hidden = el.dataset.when !== state;
  });
}

/** The site's self-hosted @font-face rules, so the iframe can use the brand font. */
function fontFaces(): string {
  const rules: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let list: CSSRuleList;
    try {
      list = sheet.cssRules; // throws for cross-origin sheets (the Bootstrap CDN), which have no fonts
    } catch {
      continue;
    }
    for (const rule of Array.from(list)) {
      if (rule instanceof CSSFontFaceRule) rules.push(rule.cssText);
    }
  }
  return rules.join('\n');
}

/** Styles the form inside HubSpot's iframe. Returns false until the form is there. */
function styleForm(target: HTMLElement, submitLabel?: string): boolean {
  const frame = target.querySelector('iframe');
  let doc: Document | null | undefined;
  try {
    doc = frame?.contentDocument;
  } catch {
    return true; // not same-origin (HubSpot changed its embed): leave HubSpot's own styling
  }
  const form = doc?.querySelector('form');
  if (!frame || !doc || !form) return false;

  if (!doc.getElementById(STYLE_ID)) {
    doc.documentElement.lang = document.documentElement.lang;
    doc.documentElement.dir = document.documentElement.dir;
    const style = doc.createElement('style');
    style.id = STYLE_ID;
    style.textContent = fontFaces() + FORM_CSS;
    doc.head.append(style);

    // Keep the iframe as tall as its content (fonts and spacing changed it; errors appear later)
    const fit = () => {
      frame.style.height = `${doc.documentElement.scrollHeight}px`;
    };
    new ResizeObserver(fit).observe(doc.body);
    fit();
  }

  // Email addresses and phone numbers are typed left to right (design-system.md §8.2)
  form.querySelectorAll<HTMLInputElement>('input[type="email"], input[type="tel"]').forEach((input) => {
    input.dir = 'ltr';
  });
  if (submitLabel) {
    form.querySelectorAll<HTMLInputElement>('input[type="submit"]').forEach((button) => {
      button.value = submitLabel;
    });
  }
  return true;
}

/** onFormReady can fire before the iframe has the form, so retry briefly. */
function styleWhenReady(target: HTMLElement, submitLabel?: string, tries = 40) {
  if (styleForm(target, submitLabel) || tries <= 0) return;
  setTimeout(() => styleWhenReady(target, submitLabel, tries - 1), 100);
}

document.querySelectorAll<HTMLElement>('[data-hubspot-form]').forEach((slot) => {
  const { portalId, formId, region, submitLabel } = slot.dataset;
  const target = slot.querySelector<HTMLElement>('[data-hubspot-target]');
  if (!portalId || !formId || !region || !target) return;

  show(slot, 'consent');
  slot.querySelector('[data-hubspot-consent]')?.addEventListener('click', () => grant('marketing'));

  whenGranted('marketing', async () => {
    show(slot, 'loading');
    try {
      await loadScript(EMBED_SRC);
      if (!window.hbspt) throw new Error('HubSpot embed did not initialise');
      window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: `#${target.id}`,
        onFormReady: () => styleWhenReady(target, submitLabel),
      });
      show(slot, 'ready');
    } catch (error) {
      console.error(error);
      show(slot, 'error');
    }
  });
});
