import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage starts with real research tasks and exposes the learning path', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByRole('heading', { level: 1, name: '研究生 AI 研究工作台' })).toBeVisible();
  await expect(page.getByRole('searchbox', { name: '搜尋研究技能與任務' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: '你現在要完成什麼？' })).toBeVisible();
  await expect(page.getByRole('link', { name: /讀懂與比較文獻/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /開始學習/ })).toBeVisible();
});

test('catalog filters content and offers a resettable empty state', async ({ page }) => {
  await page.goto('./search/?q=Git');

  const search = page.getByRole('searchbox', { name: '篩選網站內容' });
  await expect(search).toHaveValue('Git');
  await search.fill('用 Git 與執行紀錄建立可重現的研究歷史');
  await expect(page.locator('[data-catalog-item]:visible')).toHaveCount(1);

  await search.fill('完全不存在的研究技能');
  await expect(page.getByText('沒有符合條件的內容')).toBeVisible();
  await page.getByRole('button', { name: '清除篩選' }).click();
  expect(await page.locator('[data-catalog-item]:visible').count()).toBeGreaterThan(1);
});

test('lesson tool recipes behave as keyboard-accessible tabs', async ({ page }) => {
  await page.goto('./learn/01-task-specification/');

  const notebookTab = page.getByRole('tab', { name: 'NotebookLM' });
  await notebookTab.focus();
  await notebookTab.press('Enter');
  await expect(notebookTab).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('NotebookLM');
  await notebookTab.press('ArrowRight');
  await expect(page.getByRole('tab', { name: '檔案型 Agent' })).toBeFocused();
});

test('Pagefind searches lesson body text in the production build', async ({ page }) => {
  await page.goto('./search/');
  const fullText = page.locator('.pagefind-ui__search-input');
  await expect(fullText).toBeVisible();
  await fullText.fill('可重現');
  const result = page.locator('.pagefind-ui__result-link').first();
  await expect(result).toBeVisible();
  await expect(result).toHaveAttribute('href', /graduate-ai-research-workbench/);
  await result.click();
  await expect(page).toHaveURL(/graduate-ai-research-workbench\//);
});

test('templates can be copied and downloaded as Markdown', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('./templates/research-task-brief/');
  await page.getByRole('button', { name: '複製模板' }).click();
  await expect(page.getByText('已複製模板')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('研究任務');

  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: '下載 Markdown' }).click();
  expect((await download).suggestedFilename()).toBe('research-task-brief.md');
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
  await expect(page.getByRole('link', { name: '研究任務' })).toBeVisible();
});

test('homepage has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('./');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

for (const route of ['./learn/01-task-specification/', './templates/research-task-brief/', './safety/']) {
  test(`${route} has no automatically detectable accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('navigation and all tool recipes remain readable', async ({ page }) => {
    await page.goto('./learn/01-task-specification/');
    await expect(page.getByRole('navigation', { name: '主要導覽' })).toBeVisible();
    await expect(page.getByRole('button', { name: '開啟導覽' })).toBeHidden();
    await expect(page.getByText('NotebookLM 適合有固定來源的閱讀與對照。')).toBeVisible();
    await expect(page.getByText('適合跨檔案整理、產生差異與執行驗證。')).toBeVisible();
  });
});
