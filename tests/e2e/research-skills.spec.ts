import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import siteConfig from '../../site.config.json' with { type: 'json' };
import { readFile } from 'node:fs/promises';

const guidePath = `${siteConfig.projectBase}/guides/research-skills/`;

test('the skill guide is reachable from learning and tool entry points', async ({ page }) => {
  for (const route of ['./', './learn/', './tools/']) {
    await page.goto(route);
    await page.locator(`a[href="${guidePath}"]`).first().click();
    await expect(page.getByRole('heading', { level: 1, name: '研究技能選用指南' })).toBeVisible();
  }
});

test('research tasks link to the matching skill section', async ({ page }) => {
  const sections = { read: 'read', write: 'write', experiment: 'experiment', present: 'present', publish: 'write', automate: 'plan' };
  for (const [task, section] of Object.entries(sections)) {
    await page.goto('./tasks/');
    await page.getByLabel('研究任務', { exact: true }).selectOption(task);
    const link = page.locator(`[data-task-panel="${task}"]`).getByRole('link', { name: '這個任務可用的技能' });
    await expect(link).toHaveAttribute('href', `${guidePath}#${section}`);
    await link.click();
    await expect(page.locator(`#${section}`)).toBeVisible();
  }
});

test('guide links from lessons and templates resolve to real sections', async ({ page, baseURL }) => {
  const destinations = new Set<string>();
  for (const route of [
    './learn/02-ask-before-action/', './learn/03-context-and-indexes/',
    './learn/05-challenge-and-review/', './learn/06-build-your-toolbox/',
    './tools/skill/', './tools/subagent/', './templates/six-part-brief/',
    './templates/ask-before-action/', './templates/workspace-rules/',
    './templates/independent-review/', './templates/context-cache-index/', './templates/usage-review/',
  ]) {
    await page.goto(route);
    for (const href of await page.locator('a[href*="guides/research-skills"]').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href))) {
      const destination = new URL(href, baseURL);
      expect(destination.pathname).toBe(guidePath);
      destinations.add(destination.href);
    }
  }
  expect(destinations.size).toBeGreaterThan(0);
  for (const destination of destinations) {
    const response = await page.goto(destination);
    // Moving between fragments on the same page does not make an HTTP request.
    if (response) expect(response.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1, name: '研究技能選用指南' })).toBeVisible();
    const fragment = new URL(destination).hash.slice(1);
    if (fragment) await expect(page.locator(`[id="${fragment}"]`)).toBeVisible();
  }
});

for (const query of ['grill-me', 'spec', 'evals', 'Colab']) {
  test(`search finds relevant teaching content for ${query}`, async ({ page }) => {
    await page.goto('./search/');
    await page.locator('.pagefind-ui__search-input').fill(query);
    const results = page.locator('.pagefind-ui__result-link');
    if (query === 'grill-me' || query === 'Colab') {
      await expect(page.locator(`.pagefind-ui__result-link[href="${guidePath}"]`)).toBeVisible();
    } else {
      await expect(results.first()).toBeVisible();
      await results.first().click();
      await expect(page.locator('main')).toContainText(new RegExp(query, 'i'));
    }
  });
}

test('skill guide is accessible and fits the viewport', async ({ page }) => {
  await page.goto('./guides/research-skills/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

for (const [slug, requiredText] of [['independent-review', '矛盾來源'], ['usage-review', '總 token']]) {
  test(`${slug} copies and downloads the updated worksheet`, async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(`./templates/${slug}/`);
    const worksheet = await page.locator('[data-template-body]').innerText();
    expect(worksheet).toContain(requiredText);
    await page.getByRole('button', { name: '複製模板' }).click();
    await expect(page.getByText('已複製模板')).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(worksheet);
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('button', { name: '下載 Markdown' }).click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toBe(`${slug}.md`);
    const path = await download.path();
    expect(path).not.toBeNull();
    expect(await readFile(path!, 'utf8')).toBe(worksheet);
  });
}

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, contextOptions: { reducedMotion: 'reduce' } });
  test('the guide and its section links remain readable', async ({ page }) => {
    await page.goto('./guides/research-skills/');
    for (const section of ['plan', 'read', 'experiment', 'write', 'visualize', 'present']) {
      await page.locator(`a[href="#${section}"]`).first().click();
      await expect(page.locator(`#${section}`)).toBeVisible();
    }
    await expect(page.getByRole('heading', { name: /paper-fetch/ })).toBeVisible();
  });
});
