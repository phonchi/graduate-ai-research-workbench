import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import siteConfig from '../../site.config.json' with { type: 'json' };
const guidePath = `${siteConfig.projectBase}/guides/research-skills/`;

test('homepage searches skills directly', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByText('這裡可以找適合研究工作的 AI 技能')).toBeVisible();
  await page.getByRole('searchbox', { name: '搜尋研究技能', exact: true }).fill('交接');
  await page.getByRole('button', { name: '搜尋', exact: true }).click();
  await expect(page).toHaveURL(new RegExp('/guides/research-skills/\\?q='));
  await expect(page.locator('#skill-query')).toHaveValue('交接');
  await expect(page.locator('#skill-handoff')).toBeVisible();
  await expect(page.locator('#skill-paper-fetch')).toBeHidden();
});

test('cards support searching, combining categories, resetting, and sharing', async ({ page }) => {
  await page.goto('./guides/research-skills/');
  const cards = page.locator('[data-skill-card]');
  const total = await cards.count();
  expect(total).toBeGreaterThan(0);
  await page.getByLabel('想找什麼技能？').fill('NOTEBOOKLM');
  await expect(page.locator('#skill-notebooklm-py')).toBeVisible();
  await page.getByLabel('依任務篩選').selectOption('read');
  await expect(page.locator('#skill-notebooklm-py')).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('依任務篩選')).toHaveValue('read');
  await expect(page.getByLabel('想找什麼技能？')).toHaveValue('NOTEBOOKLM');
  await page.getByLabel('依任務篩選').selectOption('plan');
  await expect(page.getByText('沒有找到符合條件的技能')).toBeVisible();
  await page.getByRole('button', { name: '顯示全部技能' }).click();
  await expect(page.locator('[data-skill-card]:visible')).toHaveCount(total);
  await expect(page).not.toHaveURL(/\?/);
  const handoff = page.locator('#skill-handoff');
  await expect(handoff.locator('details')).not.toHaveAttribute('open', '');
  await handoff.getByText('查看 handoff 用法', { exact: true }).click();
  await expect(handoff.locator('pre')).toBeVisible();
  await expect(handoff.getByRole('link', { name: '原始專案與安裝說明' })).toHaveAttribute('href', /mattpocock/);
});

for (const [oldSection, category] of Object.entries({ read: 'read', write: 'write', experiment: 'experiment', present: 'present', publish: 'write', automate: 'plan' })) {
  test(`old task link ${oldSection} selects ${category}`, async ({ page }) => {
    await page.goto(`./tasks/#${oldSection}`);
    await expect(page).toHaveURL(new RegExp(`${guidePath}#${category}$`));
    await expect(page.getByLabel('依任務篩選')).toHaveValue(category);
    const visible = page.locator('[data-skill-card]:visible');
    expect(await visible.count()).toBeGreaterThan(0);
    for (const card of await visible.all()) expect((await card.getAttribute('data-categories'))?.split('|')).toContain(category);
  });
}

test('direct card links open details and invalid filters fall back to all categories', async ({ page }) => {
  await page.goto('./guides/research-skills/#skill-handoff');
  await expect(page.locator('#skill-handoff details')).toHaveAttribute('open', '');
  await expect(page.locator('#skill-handoff pre')).toBeVisible();
  await page.goto('./guides/research-skills/?category=not-a-category#%E0%A4%A');
  await expect(page.getByLabel('依任務篩選')).toHaveValue('');
  await expect(page.locator('#skill-paper-fetch')).toBeVisible();
});

test('guide links from lessons and templates still resolve', async ({ page, baseURL }) => {
  const destinations = new Set<string>();
  for (const route of ['./learn/02-ask-before-action/', './learn/03-context-and-indexes/', './learn/06-build-your-toolbox/', './learn/07-reproducible-research/', './tools/skill/', './tools/notebooklm/', './templates/handoff/']) {
    await page.goto(route);
    for (const href of await page.locator('a[href*="guides/research-skills"]').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href))) {
      const target = new URL(href, baseURL);
      expect(target.pathname).toBe(guidePath);
      destinations.add(target.href);
    }
  }
  expect(destinations.size).toBeGreaterThan(0);
  for (const destination of destinations) {
    await page.goto(destination);
    await expect(page.getByRole('heading', { level: 1, name: '找研究技能' })).toBeVisible();
    const fragment = new URL(destination).hash.slice(1);
    if (fragment) await expect(page.locator(`[id="${fragment}"]`)).toBeVisible();
  }
});

for (const query of ['grill-me', 'spec', 'evals', 'handoff', 'Hook', 'Colab']) {
  test(`site-wide search finds ${query}`, async ({ page }) => {
    await page.goto('./search/');
    await page.locator('.pagefind-ui__search-input').fill(query);
    const link = page.locator('.pagefind-ui__result-link').first();
    await expect(link).toBeVisible();
    await link.click();
    await expect(page.locator('main')).toContainText(new RegExp(query, 'i'));
  });
}

test('lesson tables render as tables, not Markdown code', async ({ page }) => {
  await page.goto('./learn/03-context-and-indexes/');
  const tables = page.locator('.prose table');
  expect(await tables.count()).toBeGreaterThanOrEqual(2);
  await expect(tables.first()).toContainText('D01');
  for (const text of await page.locator('.prose pre').allTextContents()) expect(text).not.toMatch(/^\s*\|.*\|\s*$/m);
});

for (const [slug, marker] of [['context-cache-index', 'D01'], ['independent-review', '差異'], ['usage-review', 'token'], ['handoff', '下一步']]) {
  test(`${slug} previews, copies and downloads its Markdown`, async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(`./templates/${slug}/`);
    const text = await page.locator('[data-template-body]').textContent();
    expect(text).toContain(marker);
    await expect(page.locator('.template-preview')).toBeVisible();
    if (slug !== 'handoff') expect(await page.locator('.template-preview table').count()).toBeGreaterThan(0);
    await page.getByText('看一份填好的例子', { exact: true }).click();
    await expect(page.locator('.template-example .prose')).toBeVisible();
    expect((await page.locator('.template-example .prose').innerText()).trim().length).toBeGreaterThan(40);
    await page.getByRole('button', { name: '複製模板' }).click();
    await expect(page.getByText('已複製模板')).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(text);
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('button', { name: '下載 Markdown' }).click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toBe(`${slug}.md`);
    const path = await download.path();
    expect(await readFile(path!, 'utf8')).toBe(text);
  });
}

test('catalog and expanded templates are accessible and fit the viewport', async ({ page }) => {
  for (const route of ['./guides/research-skills/', './templates/context-cache-index/', './templates/usage-review/']) {
    await page.goto(route);
    await page.locator('details').first().locator('summary').click();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('all skills and native details remain readable', async ({ page }) => {
    await page.goto('./guides/research-skills/?q=handoff');
    await expect(page.locator('.skill-search')).toBeHidden();
    const allCards = page.locator('[data-skill-card]');
    for (const card of await allCards.all()) await expect(card).toBeVisible();
    await page.locator('#skill-handoff summary').click();
    await expect(page.locator('#skill-handoff pre')).toBeVisible();
    await page.goto('./templates/context-cache-index/');
    await expect(page.locator('.template-preview table').first()).toBeVisible();
    await page.getByText('查看 Markdown 原文', { exact: true }).click();
    await expect(page.locator('[data-template-body]')).toBeVisible();
  });
  test('the old tasks page offers links to the new catalog', async ({ page }) => {
    await page.goto('./tasks/');
    await page.getByRole('link', { name: '技能搜尋頁', exact: true }).click();
    await expect(page.getByRole('heading', { name: '找研究技能', level: 1 })).toBeVisible();
  });
});
