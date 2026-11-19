// Loads the HubSpot lead form into [data-hubspot-form] — only after marketing-cookie consent.
// Config comes from data attributes (set from src/content/pages/<locale>/contact.yaml):
//   data-portal-id, data-form-id, data-region
// Same embed as HubSpot's snippet (forms/embed/v2.js + hbspt.forms.create), without inline script,
// so it works under a strict Content-Security-Policy.
import { grant, whenGranted } from './consent';

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create(options: { portalId: string; formId: string; region: string; target: string }): void;
      };
    };
  }
}

const EMBED_SRC = 'https://js.hsforms.net/forms/embed/v2.js';

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

document.querySelectorAll<HTMLElement>('[data-hubspot-form]').forEach((slot) => {
  const { portalId, formId, region } = slot.dataset;
  const target = slot.querySelector<HTMLElement>('[data-hubspot-target]');
  if (!portalId || !formId || !region || !target) return;

  show(slot, 'consent');
  slot.querySelector('[data-hubspot-consent]')?.addEventListener('click', () => grant('marketing'));

  whenGranted('marketing', async () => {
    show(slot, 'loading');
    try {
      await loadScript(EMBED_SRC);
      if (!window.hbspt) throw new Error('HubSpot embed did not initialise');
      window.hbspt.forms.create({ portalId, formId, region, target: `#${target.id}` });
      show(slot, 'ready');
    } catch (error) {
      console.error(error);
      show(slot, 'error');
    }
  });
});
