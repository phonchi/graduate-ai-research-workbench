import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage stages reach the matching guide sections and existing resources', async ({ page }) => {
  await page.goto('./');
  const stages = page.locator('.workflow-starts a');
  const destinations = await stages.evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
  expect(destinations).toHaveLength(5);
  for (const destination of destinations) {
    await page.goto(destination);
    const section = page.locator(new URL(destination).hash);
    await expect(section).toBeVisible();
    await expect(section.locator('dt')).toHaveText(['先準備什麼', 'AI 可以協助', '自己要查核什麼']);
    expect(await section.locator('.workflow-resources a').count()).toBeGreaterThan(0);
  }
  await page.getByRole('link', { name: 'html-visualizer：整理成 HTML 報告' }).click();
  await expect(page.locator('#skill-html-visualizer details')).toHaveAttribute('open', '');
});

test('each prompt copies its own full text and reports clipboard failure', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('./guides/research-workflow/');
  for (const prompt of await page.locator('.workflow-prompt').all()) {
    await prompt.locator('summary').click();
    const expected = await prompt.locator('[data-workflow-prompt]').textContent();
    await prompt.getByRole('button').click();
    await expect(prompt.getByRole('status')).toContainText('已複製交辦範例');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(expected);
  }
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async () => { throw new Error('Clipboard unavailable'); } },
  }));
  const first = page.locator('.workflow-prompt').first();
  await first.getByRole('button').click();
  await expect(first.getByRole('status')).toContainText('手動複製');
  await expect(first.locator('pre')).toBeVisible();
});

test('HTML reports are discoverable by use, category, permalink and lesson', async ({ page }) => {
  await page.goto('./guides/research-skills/');
  const card = page.locator('#skill-html-visualizer');
  for (const query of ['HTML 報告', '文獻比較', '研究成果展示', 'html-visualizer']) {
    await page.getByLabel('想找什麼技能？').fill(query);
    await expect(card).toBeVisible();
  }
  for (const category of ['visualize', 'present']) {
    await page.getByLabel('依任務篩選').selectOption(category);
    await expect(card).toBeVisible();
  }
  await page.goto('./guides/research-skills/#skill-html-visualizer');
  await expect(card.locator('pre')).toBeVisible();
  await expect(card.getByRole('link', { name: '原始專案與安裝說明' })).toHaveAttribute('href', 'https://github.com/chenjackle45/html-visualizer');
  await page.goto('./learn/06-build-your-toolbox/');
  await page.getByRole('link', { name: 'html-visualizer', exact: true }).click();
  await expect(card.locator('details')).toHaveAttribute('open', '');
});

test('site-wide search includes the new workflow guide', async ({ page }) => {
  await page.goto('./search/?q=研究階段');
  await expect(page.locator('.pagefind-ui__result-link').first()).toBeVisible();
  const result = page.locator('.pagefind-ui__result-link[href*="/guides/research-workflow/"]').first();
  if (await result.count() === 0) await page.locator('.pagefind-ui__button').click();
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.getByRole('heading', { level: 1, name: '依研究階段開始' })).toBeVisible();
});

test('safety checklist has nine labeled items, resets and does not retain checks on reload', async ({ page }) => {
  await page.goto('./safety/#research-checklist');
  const form = page.locator('[data-research-checklist]');
  const checks = form.getByRole('checkbox');
  await expect(checks).toHaveCount(9);
  await expect(form.locator('fieldset')).toHaveCount(3);
  for (const check of await checks.all()) {
    await expect(check).not.toBeChecked();
    await expect(check).toHaveAccessibleName(/.+/);
  }
  await checks.first().check();
  await checks.last().check();
  await form.getByRole('button', { name: '清除勾選' }).click();
  await expect(checks.first()).not.toBeChecked();
  await expect(checks.last()).not.toBeChecked();
  await checks.first().check();
  await page.reload();
  await expect(checks.first()).not.toBeChecked();
});

test('expanded workflow and safety checklist remain accessible with no runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const route of ['./guides/research-workflow/', './safety/#research-checklist']) {
    await page.goto(route);
    if (route.includes('research-workflow')) await page.locator('.workflow-prompt summary').first().click();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('workflow prompts, resource links and checklist remain usable', async ({ page }) => {
    await page.goto('./guides/research-workflow/');
    await expect(page.locator('.workflow-stage')).toHaveCount(5);
    const prompt = page.locator('.workflow-prompt').first();
    await prompt.locator('summary').click();
    await expect(prompt.locator('pre')).toBeVisible();
    await expect(prompt.getByRole('button')).toBeHidden();
    await page.getByRole('link', { name: '研究安全檢核', exact: true }).click();
    const checks = page.locator('[data-research-checklist]').getByRole('checkbox');
    // Native smooth scrolling runs without page JS; wait for a stable position
    // through the browser protocol before starting the action's rAF check.
    let previousY: number | undefined;
    await expect.poll(async () => {
      const box = await checks.first().boundingBox();
      const stable = !!box && box.y === previousY && box.y >= 0 && box.y < page.viewportSize()!.height;
      previousY = box?.y;
      return stable;
    }, { intervals: [100, 200, 400] }).toBe(true);
    await checks.first().check();
    await expect(checks.first()).toBeChecked();
    await page.getByRole('button', { name: '清除勾選' }).click();
    await expect(checks.first()).not.toBeChecked();
  });
});
