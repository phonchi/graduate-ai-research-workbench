import { expect, test } from '@playwright/test';

test('all discoverable internal links resolve', async ({ page, baseURL }) => {
  const origin = new URL(baseURL ?? 'http://127.0.0.1:4173').origin;
  const pending = [new URL('./', baseURL).href];
  const visited = new Set<string>();
  const failures: string[] = [];

  while (pending.length > 0 && visited.size < 100) {
    const url = pending.shift();
    if (!url || visited.has(url)) continue;
    visited.add(url);
    const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
    if (!response || response.status() >= 400) {
      failures.push(`${response?.status() ?? 'NO_RESPONSE'} ${url}`);
      continue;
    }
    const hrefs = await page.locator('a[href]').evaluateAll((anchors) => anchors.map((anchor) => (anchor as HTMLAnchorElement).href));
    for (const href of hrefs) {
      const link = new URL(href);
      link.hash = '';
      if (link.origin === origin && link.pathname.startsWith('/graduate-ai-research-workbench/') && !visited.has(link.href)) pending.push(link.href);
    }
  }

  expect(visited.size).toBeGreaterThan(35);
  expect(failures).toEqual([]);
});
