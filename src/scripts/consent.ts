// Cookie consent (docs/design-system.md §10.23; AGENTS.md §4.4).
//
// Categories: "necessary" (always on: remembers this choice), "analytics", "marketing" (HubSpot forms
// and tracking). Nothing third-party may run before its category is granted.
//
// Gating third-party scripts — add them as inert scripts and they run only after consent:
//   <script type="text/plain" data-consent="marketing" data-src="https://…/embed.js"></script>
// Or from code:
//   window.nvConsent.whenGranted('marketing', () => { /* create the HubSpot form */ });
//
// The choice is kept in localStorage ("nv-consent"). Bump VERSION when the categories or the policy
// change, so every visitor is asked again.

export type Category = 'analytics' | 'marketing';
export interface ConsentState {
  v: number;
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp of the decision */
  at: string;
}

const KEY = 'nv-consent';
const VERSION = 1;
const CATEGORIES: Category[] = ['analytics', 'marketing'];

/** Cookies each category may set; deleted when that consent is withdrawn. */
const COOKIES: Record<Category, RegExp[]> = {
  analytics: [/^_ga/, /^_gid$/, /^_gcl/],
  marketing: [/^__hs/, /^hubspotutk$/, /^__hstc$/, /^__hssc$/, /^__hssrc$/, /^messagesUtk$/],
};

function read(): ConsentState | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? 'null') as ConsentState | null;
    return parsed && parsed.v === VERSION ? parsed : null;
  } catch {
    return null;
  }
}

function write(state: ConsentState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage blocked (private mode): the choice holds for this page view only.
  }
}

let state = read();
const waiting: Record<Category, (() => void)[]> = { analytics: [], marketing: [] };

export function granted(category: Category): boolean {
  return state?.[category] === true;
}

export function hasDecided(): boolean {
  return state !== null;
}

export function whenGranted(category: Category, fn: () => void) {
  if (granted(category)) fn();
  else waiting[category].push(fn);
}

/** Turn inert <script type="text/plain" data-consent="…"> elements into running scripts. */
function activate(category: Category) {
  document
    .querySelectorAll<HTMLScriptElement>(`script[type="text/plain"][data-consent="${category}"]`)
    .forEach((inert) => {
      const script = document.createElement('script');
      for (const attr of Array.from(inert.attributes)) {
        if (!['type', 'data-consent', 'data-src'].includes(attr.name)) script.setAttribute(attr.name, attr.value);
      }
      if (inert.dataset.src) script.src = inert.dataset.src;
      else script.textContent = inert.textContent;
      inert.replaceWith(script);
    });
  waiting[category].splice(0).forEach((fn) => fn());
}

function deleteCookies(category: Category) {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0]?.trim())
    .filter((n): n is string => Boolean(n));
  const host = location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const name of names) {
    if (!COOKIES[category].some((re) => re.test(name))) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

export function save(choice: { analytics: boolean; marketing: boolean }) {
  const before = state;
  state = { v: VERSION, analytics: choice.analytics, marketing: choice.marketing, at: new Date().toISOString() };
  write(state);

  // Withdrawn consent: delete that category's cookies and reload, so already-running scripts stop.
  const withdrawn = CATEGORIES.filter((c) => before?.[c] && !choice[c]);
  if (withdrawn.length) {
    withdrawn.forEach(deleteCookies);
    location.reload();
    return;
  }

  CATEGORIES.filter((c) => choice[c]).forEach(activate);
  document.dispatchEvent(new CustomEvent('nv:consent', { detail: state }));
}

/** Grant one category, keeping the visitor's other choices (e.g. "show the form" on /contact). */
export function grant(category: Category) {
  save({ analytics: granted('analytics'), marketing: granted('marketing'), [category]: true });
  const banner = document.getElementById('consent-banner');
  if (banner) banner.hidden = true;
}

// ---------- UI: banner, settings dialog, footer link ----------

function initUi() {
  const banner = document.getElementById('consent-banner');
  const dialog = document.getElementById('consent-dialog') as HTMLDialogElement | null;
  const form = document.getElementById('consent-form') as HTMLFormElement | null;
  if (!banner || !dialog || !form) return;

  const hideBanner = () => {
    const hadFocus = banner.contains(document.activeElement);
    banner.hidden = true;
    if (hadFocus) document.getElementById('main')?.focus({ preventScroll: true });
  };

  const syncForm = () => {
    for (const c of CATEGORIES) {
      const box = form.elements.namedItem(c) as HTMLInputElement | null;
      if (box) box.checked = granted(c);
    }
  };

  const openDialog = () => {
    syncForm();
    dialog.showModal();
  };

  const decide = (choice: { analytics: boolean; marketing: boolean }) => {
    save(choice);
    hideBanner();
    if (dialog.open) dialog.close();
  };

  document.querySelectorAll<HTMLElement>('[data-consent-action="accept"]').forEach((b) =>
    b.addEventListener('click', () => decide({ analytics: true, marketing: true })),
  );
  document.querySelectorAll<HTMLElement>('[data-consent-action="reject"]').forEach((b) =>
    b.addEventListener('click', () => decide({ analytics: false, marketing: false })),
  );
  document.querySelectorAll<HTMLElement>('[data-consent-open]').forEach((b) => b.addEventListener('click', openDialog));
  dialog.querySelector('[data-consent-close]')?.addEventListener('click', () => dialog.close());

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = (name: Category) => (form.elements.namedItem(name) as HTMLInputElement | null)?.checked === true;
    decide({ analytics: value('analytics'), marketing: value('marketing') });
  });

  if (!hasDecided()) banner.hidden = false;
}

// Start: run what's already allowed, then wire the UI.
CATEGORIES.filter(granted).forEach(activate);
initUi();

declare global {
  interface Window {
    nvConsent: {
      whenGranted: typeof whenGranted;
      granted: typeof granted;
      grant: typeof grant;
      open: () => void;
    };
  }
}

window.nvConsent = {
  whenGranted,
  granted,
  grant,
  open: () => (document.querySelector<HTMLElement>('[data-consent-open]') ?? null)?.click(),
};
