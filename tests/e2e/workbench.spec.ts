import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage introduces an agent-first learning journey with three clear entry points', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByRole('heading', { level: 1, name: '研究生 AI 研究工作台' })).toBeVisible();
  await expect(page.getByText('把 AI 從聊天工具變成會做事的研究助手')).toBeVisible();
  await expect(page.getByRole('link', { name: /第一次用 Agent/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /查工具名詞/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /我有研究任務/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: '先學會怎麼合作，再決定用哪個工具' })).toBeVisible();
});

test('tool glossary filters named products and concepts with a resettable empty state', async ({ page }) => {
  await page.goto('./tools/?q=NotebookLM');

  const search = page.getByRole('searchbox', { name: '篩選工具詞典' });
  await expect(search).toHaveValue('NotebookLM');
  await search.fill('AskUserQuestion');
  await expect(page.locator('[data-catalog-item]:visible')).toHaveCount(1);

  await search.fill('完全不存在的工具名詞');
  await expect(page.getByText('沒有符合條件的工具')).toBeVisible();
  await page.getByRole('button', { name: '清除篩選' }).click();
  expect(await page.locator('[data-catalog-item]:visible').count()).toBeGreaterThan(1);
});

test('lesson pages teach presentation concepts through named tools and a usable prompt', async ({ page }) => {
  await page.goto('./learn/02-ask-before-action/');

  await expect(page.getByRole('heading', { level: 1, name: /先反問/ })).toBeVisible();
  await expect(page.getByText('AskUserQuestion', { exact: true }).first()).toBeVisible();
  await expect(page.locator('pre').filter({ hasText: '動工前' }).first()).toBeVisible();
});

test('Pagefind searches lesson body text in the production build', async ({ page }) => {
  await page.goto('./search/');
  const fullText = page.locator('.pagefind-ui__search-input');
  await expect(fullText).toBeVisible();
  await fullText.fill('AskUserQuestion');
  const result = page.locator('.pagefind-ui__result-link').first();
  await expect(result).toBeVisible();
  await expect(result).toHaveAttribute('href', /graduate-ai-research-workbench/);
  await result.click();
  await expect(page).toHaveURL(/graduate-ai-research-workbench\//);
});

test('templates can be copied and downloaded as Markdown', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('./templates/six-part-brief/');
  await page.getByRole('button', { name: '複製模板' }).click();
  await expect(page.getByText('已複製模板')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('目標：');

  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: '下載 Markdown' }).click();
  expect((await download).suggestedFilename()).toBe('six-part-brief.md');
});

test('mobile navigation opens without covering the menu control', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile-only behavior');
  await page.goto('./');
  const button = page.locator('.mobile-menu');
  await expect(button).toHaveAccessibleName('開啟導覽');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(button).toHaveAccessibleName('關閉導覽');
  await expect(page.getByRole('navigation', { name: '主要導覽' })).toBeVisible();
  await expect(page.getByRole('link', { name: '工具詞典' })).toBeVisible();
});

test('homepage has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('./');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

for (const route of ['./learn/02-ask-before-action/', './tools/notebooklm/', './templates/six-part-brief/', './safety/']) {
  test(`${route} has no automatically detectable accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('navigation and lesson content remain readable', async ({ page }) => {
    await page.goto('./learn/03-context-and-indexes/');
    await expect(page.getByRole('navigation', { name: '主要導覽' })).toBeVisible();
    await expect(page.getByRole('button', { name: '開啟導覽' })).toBeHidden();
    await expect(page.getByText(/quick notes/i).first()).toBeVisible();
    await expect(page.getByText(/NotebookLM/).first()).toBeVisible();
  });
});
