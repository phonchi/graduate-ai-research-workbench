import { expect, test } from '@playwright/test';

const visualRoutes = [
  { name: 'research-skills', route: './guides/research-skills/', heading: '研究技能選用指南' },
  { name: 'home', route: './', heading: '研究生 AI 研究工作台' },
  { name: 'lesson-7', route: './learn/07-reproducible-research/', heading: /可重現研究工作流/ },
  { name: 'tools', route: './tools/', heading: '名字很多，先看它到底能不能動手' },
  { name: 'tasks', route: './tasks/', heading: '先說要做什麼，再決定用哪個工具' },
  { name: 'cases', route: './cases/', heading: '從公開成果、可重跑示範與流程重建學做法' },
  { name: 'safety', route: './safety/', heading: '先分級、限權、驗證，再交給 Agent' },
];

for (const { name, route, heading } of visualRoutes) {
  test(`${name} fits the viewport and renders its visual assets`, async ({ page }, testInfo) => {
    const response = await page.goto(route);
    expect(response, `${route} did not return a document response`).not.toBeNull();
    expect(response?.ok(), `${route} returned ${response?.status()}`).toBe(true);
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    await page.waitForLoadState('networkidle');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const brokenImages = await page.locator('img').evaluateAll((images) => (images as HTMLImageElement[]).filter((image) => !image.complete || image.naturalWidth === 0).length);
    expect(brokenImages).toBe(0);

    await page.screenshot({ path: testInfo.outputPath(`${testInfo.project.name}-${name}.png`), fullPage: true });
  });
}
