import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

const presentationFraming = /\bslideRefs\b|對照投影片|投影片主線|投影片的核心比喻|\.pptx\b|第\s*\d+\s*(?:張|頁)\s*投影片|投影片\s*\d+/iu;

const publicContentRoutes = [
  './',
  './learn/',
  ...[
    '01-from-chat-to-agent',
    '02-ask-before-action',
    '03-context-and-indexes',
    '04-checkpoints-and-tools',
    '05-challenge-and-review',
    '06-build-your-toolbox',
    '07-reproducible-research',
  ].map((slug) => `./learn/${slug}/`),
  './tools/',
  ...[
    'agents-md',
    'ask-user-question',
    'chatgpt',
    'claude-code',
    'claude-md',
    'codex',
    'gemini-cli',
    'git-github',
    'insights',
    'mcp',
    'notebooklm',
    'skill',
    'subagent',
  ].map((slug) => `./tools/${slug}/`),
  './cases/',
  ...[
    'algorithm-visualization',
    'anonymous-manuscript-review',
    'course-site-pages',
    'document-cache',
    'interactive-calculus',
    'programmatic-slides',
    'reproducible-experiment',
  ].map((slug) => `./cases/${slug}/`),
  './templates/',
  ...[
    'ask-before-action',
    'context-cache-index',
    'git-checkpoint-release',
    'independent-review',
    'six-part-brief',
    'usage-review',
    'workspace-rules',
  ].map((slug) => `./templates/${slug}/`),
  './tasks/',
  './safety/',
  './search/',
  './content-license/',
];

const legacyRedirects = [
  ['./learn/01-task-specification/', './learn/02-ask-before-action/'],
  ['./learn/02-literature-evidence/', './learn/03-context-and-indexes/'],
  ['./learn/03-context-knowledge-base/', './learn/03-context-and-indexes/'],
  ['./learn/04-research-outputs/', './learn/02-ask-before-action/'],
  ['./learn/05-reproducibility-git/', './learn/04-checkpoints-and-tools/'],
  ['./learn/06-verification-review/', './learn/05-challenge-and-review/'],
  ['./learn/07-workflow-automation/', './learn/06-build-your-toolbox/'],
  ['./skills/', './tools/'],
  ['./skills/academic-writing/', './tasks/#write'],
  ['./skills/claim-evidence-mapping/', './learn/05-challenge-and-review/'],
  ['./skills/context-management/', './learn/03-context-and-indexes/'],
  ['./skills/counterexample-checking/', './learn/05-challenge-and-review/'],
  ['./skills/data-provenance/', './learn/04-checkpoints-and-tools/'],
  ['./skills/git-version-control/', './tools/git-github/'],
  ['./skills/literature-synthesis/', './learn/03-context-and-indexes/'],
  ['./skills/reproducible-research/', './learn/04-checkpoints-and-tools/'],
  ['./skills/skill-design/', './tools/skill/'],
  ['./skills/source-verification/', './learn/05-challenge-and-review/'],
  ['./skills/subagent-delegation/', './tools/subagent/'],
  ['./skills/task-specification/', './learn/02-ask-before-action/'],
  ['./skills/visual-verification/', './learn/05-challenge-and-review/'],
  ['./templates/claim-citation-audit/', './templates/independent-review/'],
  ['./templates/literature-evidence-matrix/', './templates/context-cache-index/'],
  ['./templates/manuscript-review-checklist/', './templates/independent-review/'],
  ['./templates/presentation-web-qa/', './templates/git-checkpoint-release/'],
  ['./templates/reproducibility-checklist/', './templates/git-checkpoint-release/'],
  ['./templates/research-log/', './templates/usage-review/'],
  ['./templates/research-task-brief/', './templates/six-part-brief/'],
] as const;

test('homepage introduces an agent-first learning journey with three clear entry points', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByRole('heading', { level: 1, name: '研究生 AI 研究工作台' })).toBeVisible();
  await expect(page.getByText('把 AI 從聊天工具變成會做事的研究助手')).toBeVisible();
  await expect(page.getByRole('link', { name: /第一次用 Agent/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /查工具名詞/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /我有研究任務/ })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: '先學會怎麼合作，再決定用哪個工具' })).toBeVisible();
});

test('the standalone learning path ships seven lessons', async ({ page }) => {
  await page.goto('./learn/');

  const lessons = page.locator('.lesson-list > li');
  await expect(lessons).toHaveCount(7);
  await expect(lessons.first()).toContainText('學完可以：');
  await expect(lessons.last().getByRole('link', { name: /可重現研究工作流/ })).toBeVisible();

});

test('all public content is independent from presentation framing', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Content invariant only needs one browser project');

  for (const route of publicContentRoutes) {
    const response = await page.goto(route);
    expect(response, `${route} did not return a document response`).not.toBeNull();
    expect(response?.ok(), `${route} returned ${response?.status()}`).toBe(true);
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

test('Pagefind returns the AskUserQuestion tool result and follows its destination', async ({ page, baseURL }) => {
  await page.goto('./search/');
  const fullText = page.locator('.pagefind-ui__search-input');
  await expect(fullText).toBeVisible();
  await fullText.fill('AskUserQuestion');
  const expectedPath = '/graduate-ai-research-workbench/tools/ask-user-question/';
  const result = page.locator('.pagefind-ui__result').filter({
    has: page.locator(`.pagefind-ui__result-link[href="${expectedPath}"]`),
  });
  await expect(result).toContainText('AskUserQuestion');
  const resultLink = result.locator('.pagefind-ui__result-link');
  await expect(resultLink).toHaveAttribute('href', expectedPath);
  await resultLink.click();
  await expect(page).toHaveURL(new URL(expectedPath, baseURL).href);
  await expect(page.getByRole('heading', { level: 1, name: 'AskUserQuestion' })).toBeVisible();
});

test('every legacy URL redirects to its configured project-local destination', async ({ page, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Redirect behavior is viewport-independent');
  expect(legacyRedirects).toHaveLength(28);

  for (const [source, destination] of legacyRedirects) {
    await page.goto(source);
    await expect(page, `${source} should redirect to ${destination}`).toHaveURL(new URL(destination, baseURL).href);
  }
});

test('templates can be copied and downloaded as Markdown', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('./templates/six-part-brief/');
  await page.getByRole('button', { name: '複製模板' }).click();
  await expect(page.getByText('已複製模板')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('## 目標');

  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: '下載 Markdown' }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('six-part-brief.md');
  const downloadPath = await download.path();
  expect(downloadPath).not.toBeNull();
  expect(await readFile(downloadPath as string, 'utf8')).toContain('## 目標');
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

test('/tools/ has no automatically detectable accessibility violations', async ({ page }) => {
  await page.goto('./tools/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('/tasks/ has no automatically detectable accessibility violations after interaction', async ({ page }) => {
  await page.goto('./tasks/');
  await page.getByLabel('研究任務').selectOption('experiment');
  await page.getByLabel('讀寫本機檔案').check();
  await page.getByLabel('執行程式').check();
  await page.getByLabel('資料含敏感資訊嗎？').selectOption('yes');
  await expect(page.locator('[data-sensitive-warning]')).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

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

  test('task routing falls back to readable static guidance and valid local candidate links', async ({ page, request, baseURL }) => {
    await page.goto('./tasks/');

    await expect(page.locator('.task-router-form')).toBeHidden();
    const fallback = page.locator('.no-js-task-note');
    await expect(fallback).toBeVisible();
    await expect(fallback.getByRole('link', { name: /安全指南/ })).toBeVisible();

    const taskPanels = page.locator('[data-task-panel]');
    await expect(taskPanels).toHaveCount(6);
    const candidateHrefs = new Set<string>();
    for (const panel of await taskPanels.all()) {
      await expect(panel).toBeVisible();
      const candidateLinks = panel.locator('[data-task-tool] > a');
      expect(await candidateLinks.count()).toBeGreaterThan(0);
      for (const link of await candidateLinks.all()) {
        await expect(link).toBeVisible();
        const href = await link.getAttribute('href');
        expect(href).toMatch(/^\/graduate-ai-research-workbench\/tools\/[a-z0-9-]+\/$/);
        candidateHrefs.add(href as string);
      }
    }

    for (const href of candidateHrefs) {
      const response = await request.get(new URL(href, baseURL).href);
      expect(response.ok(), `${href} should resolve inside the project`).toBe(true);
    }
  });
});
