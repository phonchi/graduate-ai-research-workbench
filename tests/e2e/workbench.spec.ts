import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const presentationFraming = /\bslideRefs\b|對照投影片|投影片主線|投影片的核心比喻|\.pptx\b|第\s*\d+\s*(?:張|頁)\s*投影片|投影片\s*\d+/iu;

test('homepage introduces an agent-first learning journey with three clear entry points', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByRole('heading', { level: 1, name: '研究生 AI 研究工作台' })).toBeVisible();
  await expect(page.getByText('把 AI 從聊天工具變成會做事的研究助手')).toBeVisible();
  await expect(page.getByRole('link', { name: /第一次用 Agent/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /查工具名詞/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /我有研究任務/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: '先學會怎麼合作，再決定用哪個工具' })).toBeVisible();
});

test('the standalone learning path ships seven lessons without presentation framing', async ({ page }) => {
  await page.goto('./learn/');

  const lessons = page.locator('.lesson-list > li');
  await expect(lessons).toHaveCount(7);
  await expect(lessons.first()).toContainText('學完可以：');
  await expect(lessons.last().getByRole('link', { name: /可重現研究工作流/ })).toBeVisible();

  for (const route of ['./', './learn/', './learn/07-reproducible-research/', './cases/', './cases/reproducible-experiment/', './templates/', './templates/six-part-brief/']) {
    await page.goto(route);
    expect(await page.locator('body').innerText(), `${route} exposes presentation-dependent framing`).not.toMatch(presentationFraming);
  }
});

test('lesson seven exposes outcomes, prerequisites, tools, and two to four named references', async ({ page }) => {
  await page.goto('./learn/07-reproducible-research/');

  await expect(page.getByRole('heading', { level: 1, name: /可重現研究工作流/ })).toBeVisible();
  await expect(page.getByText('學習成果', { exact: true })).toBeVisible();
  await expect(page.getByText('先備條件', { exact: true })).toBeVisible();
  await expect(page.getByText('相關工具', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: '來源與延伸閱讀' })).toBeVisible();

  const references = page.locator('.reference-list li');
  expect(await references.count()).toBeGreaterThanOrEqual(2);
  expect(await references.count()).toBeLessThanOrEqual(4);
  for (const reference of await references.all()) {
    await expect(reference.locator('.reference-type')).not.toHaveText('');
    await expect(reference.getByRole('link')).toHaveAttribute('href', /^https?:\/\//);
    await expect(reference.locator('p')).not.toHaveText('');
  }
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

test('tool glossary includes multi-interface agents in type and level filters', async ({ page }) => {
  await page.goto('./tools/');
  await page.getByLabel('類型').selectOption('CLI');

  const visibleTools = page.locator('[data-catalog-item]:visible');
  await expect(visibleTools.getByRole('heading', { name: 'Codex' })).toBeVisible();
  await expect(visibleTools.getByRole('heading', { name: 'Claude Code' })).toBeVisible();
  await expect(visibleTools.getByRole('heading', { name: 'Gemini CLI' })).toBeVisible();
  await expect(visibleTools.getByRole('heading', { name: 'Git 與 GitHub' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'ChatGPT' })).toBeHidden();

  await page.getByLabel('門檻').selectOption('進階');
  await expect(visibleTools).toHaveCount(1);
  await expect(visibleTools.getByRole('heading', { name: 'Gemini CLI' })).toBeVisible();

  await page.getByLabel('類型').selectOption('網頁');
  await page.getByLabel('門檻').selectOption('');
  await expect(visibleTools.getByRole('heading', { name: 'ChatGPT' })).toBeVisible();
  await expect(visibleTools.getByRole('heading', { name: 'NotebookLM' })).toBeVisible();
  await expect(visibleTools.getByRole('heading', { name: 'Git 與 GitHub' })).toBeVisible();
});

test('capability filters surface agents and source-grounded tools', async ({ page }) => {
  await page.goto('./tools/');

  await page.getByLabel('本機檔案').selectOption('yes');
  await page.getByLabel('命令執行').selectOption('yes');

  const visibleTools = page.locator('[data-catalog-item]:visible');
  await expect(visibleTools).toHaveCount(3);
  await expect(visibleTools.getByRole('heading', { name: 'Codex' })).toBeVisible();
  await expect(visibleTools.getByRole('heading', { name: 'Claude Code' })).toBeVisible();
  await expect(visibleTools.getByRole('heading', { name: 'Gemini CLI' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'ChatGPT' })).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Git 與 GitHub' })).toBeHidden();
  await expect(page.getByRole('heading', { name: 'NotebookLM' })).toBeHidden();

  await page.getByLabel('固定來源引用').selectOption('yes');
  await expect(visibleTools).toHaveCount(0);
  await expect(page.getByText('沒有符合條件的工具')).toBeVisible();
  await page.getByRole('button', { name: '清除篩選' }).click();
  await expect(visibleTools).toHaveCount(13);

  await page.getByLabel('固定來源引用').selectOption('yes');
  await expect(visibleTools).toHaveCount(1);
  await expect(visibleTools.getByRole('heading', { name: 'NotebookLM' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Codex' })).toBeHidden();
});

test('tool cards and details expose all six capability facets', async ({ page }) => {
  await page.goto('./tools/');

  const cards = page.locator('[data-catalog-item]');
  await expect(cards).toHaveCount(13);
  for (const card of await cards.all()) await expect(card.locator('.capability-list li')).toHaveCount(6);

  await page.goto('./tools/codex/');
  const capabilityDetails = page.locator('.capability-strip dl > div');
  await expect(capabilityDetails).toHaveCount(6);
  for (const facet of ['本機檔案', '命令執行', '固定來源引用', '網路存取', '背景任務', '人工確認']) {
    await expect(capabilityDetails.getByText(facet, { exact: true })).toBeVisible();
  }
});

test('capability-first task routing offers choices and protects sensitive data', async ({ page }) => {
  await page.goto('./tasks/');

  await page.getByLabel('研究任務').selectOption('experiment');
  const experiment = page.locator('[data-task-panel="experiment"]');
  await expect(experiment.getByRole('heading', { name: '執行程式與實驗' })).toBeVisible();
  await page.getByLabel('讀寫本機檔案').check();
  await page.getByLabel('執行程式').check();
  const visibleCandidates = experiment.locator('[data-task-tool]:visible');
  await expect(visibleCandidates).toHaveCount(4);
  await expect(experiment.getByRole('link', { name: /Codex/ })).toBeVisible();
  const conditionalCandidate = experiment.locator('[data-task-tool]').filter({ hasText: 'Git 與 GitHub' });
  await expect(conditionalCandidate).toBeVisible();
  await expect(conditionalCandidate).toContainText('視設定');

  await page.getByLabel('固定來源引用').check();
  await expect(visibleCandidates).toHaveCount(3);
  await expect(conditionalCandidate).toBeHidden();
  await expect(experiment.getByRole('link', { name: /NotebookLM/ })).toHaveCount(0);
  await expect(experiment.getByRole('link', { name: '推薦課程' })).toHaveAttribute('href', /\/learn\/07-reproducible-research\/$/);

  await page.getByLabel('資料含敏感資訊嗎？').selectOption('yes');
  await expect(page.getByRole('link', { name: '先看安全指南' })).toBeVisible();
});

test('case catalog exposes seven categories and the runnable experiment evidence', async ({ page }) => {
  await page.goto('./cases/');

  const cases = page.locator('.content-card');
  await expect(cases).toHaveCount(7);
  await expect(page.locator('.card-topline > span:first-child').filter({ hasText: '公開成果' })).toHaveCount(4);
  await expect(page.locator('.card-topline > span:first-child').filter({ hasText: '可重跑示範' })).toHaveCount(2);
  await expect(page.locator('.card-topline > span:first-child').filter({ hasText: '匿名流程重建' })).toHaveCount(1);

  await page.goto('./cases/reproducible-experiment/');
  await expect(page.getByRole('heading', { level: 1, name: /從原始量測到可驗證摘要/ })).toBeVisible();
  await expect(page.getByText('可依本站輸入與命令重新執行', { exact: true })).toBeVisible();
  await expect(page.locator('.prose code').filter({ hasText: 'node analyze.mjs' }).first()).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: '一個刻意記錄的失敗' })).toBeVisible();
  const cover = page.locator('.case-figure img');
  await expect(cover).toBeVisible();
  expect(await cover.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
});

test('research safety covers data, privilege, injection, secrets, publication, and policy', async ({ page }) => {
  await page.goto('./safety/');

  for (const heading of [
    '第一步：先替資料分級',
    '最小權限檢查清單',
    '外部文件也可能含有指令',
    'Secrets、套件與執行環境',
    '公開與投稿前，責任仍在人',
    '權威入口',
  ]) {
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }
  await expect(page.getByRole('link', { name: /NIST AI Risk Management Framework/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /OWASP LLM01:2025 Prompt Injection/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /COPE: Authorship and AI tools/ })).toBeVisible();
});

test('lesson pages teach presentation concepts through named tools and a usable prompt', async ({ page }) => {
  await page.goto('./learn/02-ask-before-action/');

  await expect(page.getByRole('heading', { level: 1, name: /別給願望/ })).toBeVisible();
  const lesson = page.locator('.prose');
  await expect(lesson.getByText('AskUserQuestion', { exact: true }).first()).toBeVisible();
  await expect(lesson.locator('pre').filter({ hasText: '動工前' }).first()).toBeVisible();
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

test('legacy lesson and skill URLs redirect inside the deployed project base', async ({ page }) => {
  await page.goto('./learn/01-task-specification/');
  await expect(page).toHaveURL(/graduate-ai-research-workbench\/learn\/02-ask-before-action\/$/);
  await expect(page.getByRole('heading', { level: 1, name: /別給願望/ })).toBeVisible();

  await page.goto('./skills/git-version-control/');
  await expect(page).toHaveURL(/graduate-ai-research-workbench\/tools\/git-github\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Git 與 GitHub' })).toBeVisible();

  await page.goto('./templates/research-task-brief/');
  await expect(page).toHaveURL(/graduate-ai-research-workbench\/templates\/six-part-brief\/$/);
  await expect(page.getByRole('heading', { level: 1, name: '六要素交辦單' })).toBeVisible();
});

test('templates can be copied and downloaded as Markdown', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('./templates/six-part-brief/');
  await page.getByRole('button', { name: '複製模板' }).click();
  await expect(page.getByText('已複製模板')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('## 目標');

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
  const navigation = page.getByRole('navigation', { name: '主要導覽' });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole('link', { name: '工具詞典', exact: true })).toBeVisible();
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
    await expect(page.getByText('學習成果', { exact: true })).toBeVisible();
    const lesson = page.locator('.prose');
    await expect(lesson.getByText(/quick notes/i).first()).toBeVisible();
    await expect(lesson.getByText(/NotebookLM/).first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: '來源與延伸閱讀' })).toBeVisible();
    expect(await page.locator('.reference-list li').count()).toBeGreaterThanOrEqual(2);
  });

  test('task routing falls back to readable static guidance and all task choices', async ({ page }) => {
    await page.goto('./tasks/');

    await expect(page.locator('.task-router-form')).toBeHidden();
    const fallback = page.locator('.no-js-task-note');
    await expect(fallback).toBeVisible();
    await expect(fallback.getByRole('link', { name: /安全指南/ })).toBeVisible();

    const taskPanels = page.locator('[data-task-panel]');
    await expect(taskPanels).toHaveCount(6);
    for (const panel of await taskPanels.all()) {
      await expect(panel).toBeVisible();
      expect(await panel.locator('[data-task-tool] a').count()).toBeGreaterThan(0);
    }
  });
});
