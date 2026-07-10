import { expect, test } from '@playwright/test';

const visualRoutes = [
  { name: 'home', route: './' },
  { name: 'lesson-7', route: './learn/07-reproducible-research/' },
  { name: 'tools', route: './tools/' },
  { name: 'tasks', route: './tasks/' },
  { name: 'cases', route: './cases/' },
  { name: 'safety', route: './safety/' },
];

for (const { name, route } of visualRoutes) {
  test(`${name} fits the viewport and renders its visual assets`, async ({ page }, testInfo) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const brokenImages = await page.locator('img').evaluateAll((images) => (images as HTMLImageElement[]).filter((image) => !image.complete || image.naturalWidth === 0).length);
    expect(brokenImages).toBe(0);

    await page.screenshot({ path: testInfo.outputPath(`${testInfo.project.name}-${name}.png`), fullPage: true });
  });
}
