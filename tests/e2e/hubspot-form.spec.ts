import { expect, test, type Page } from '@playwright/test';

// HubSpot lead form on /contact (src/scripts/hubspot-form.ts). HubSpot's script is replaced by a stub,
// so the tests don't depend on the network and record what the page asked HubSpot to create.

const STUB = `
  window.hbspt = { forms: { create: function (o) {
    window.__hubspotCreate = o;
    document.querySelector(o.target).innerHTML = '<form aria-label="HubSpot stub"><label>שם מלא <input name="name"></label></form>';
  } } };
`;

async function stubHubSpot(page: Page) {
  const requests: string[] = [];
  await page.route('**/forms/embed/v2.js', (route) => {
    requests.push(route.request().url());
    return route.fulfill({ contentType: 'text/javascript', body: STUB });
  });
  return requests;
}

test.describe('without marketing consent (default test visitor)', () => {
  test('the button grants consent and loads the configured form', async ({ page }) => {
    const requests = await stubHubSpot(page);
    await page.goto('/contact');
    await expect(page.locator('#hubspot-form')).toHaveAttribute('data-state', 'consent');
    expect(requests).toEqual([]);

    await page.getByRole('button', { name: 'אישור עוגיות שיווק והצגת הטופס' }).click();

    await expect(page.locator('#hubspot-form')).toHaveAttribute('data-state', 'ready');
    await expect(page.getByRole('form', { name: 'HubSpot stub' })).toBeVisible();
    expect(requests).toEqual(['https://js.hsforms.net/forms/embed/v2.js']);
    expect(await page.evaluate(() => (window as unknown as { __hubspotCreate: unknown }).__hubspotCreate)).toEqual({
      portalId: '2799426',
      formId: '05171e84-3123-41fc-81e0-3f8626cb3574',
      region: 'na1',
      target: '#hubspot-form-target',
    });
    // Consent was stored: marketing on, analytics unchanged
    expect(
      await page.evaluate(() => JSON.parse(localStorage.getItem('nv-consent') ?? '{}') as Record<string, unknown>),
    ).toMatchObject({ marketing: true, analytics: false });
  });

  test('shows an error message when HubSpot is blocked', async ({ page }) => {
    await page.route('**/forms/embed/v2.js', (route) => route.abort());
    await page.goto('/contact');
    await page.getByRole('button', { name: 'אישור עוגיות שיווק והצגת הטופס' }).click();
    await expect(page.locator('#hubspot-form')).toHaveAttribute('data-state', 'error');
    await expect(page.getByRole('alert')).toContainText('לא הצלחנו לטעון את הטופס');
  });
});

test.describe('with marketing consent already given', () => {
  test.use({
    storageState: {
      cookies: [],
      origins: [
        {
          origin: 'http://localhost:4321',
          localStorage: [
            {
              name: 'nv-consent',
              value: JSON.stringify({ v: 1, analytics: false, marketing: true, at: '2026-01-01T00:00:00.000Z' }),
            },
          ],
        },
      ],
    },
  });

  test('the form loads straight away', async ({ page }) => {
    await stubHubSpot(page);
    await page.goto('/contact');
    await expect(page.locator('#hubspot-form')).toHaveAttribute('data-state', 'ready');
    await expect(page.getByRole('form', { name: 'HubSpot stub' })).toBeVisible();
  });
});
