import { expect, test } from '@playwright/test';

for (const route of ['./', './search/', './cases/interactive-calculus/']) {
  test(`${route} fits the viewport and renders its visual assets`, async ({ page }, testInfo) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const brokenImages = await page.locator('img').evaluateAll((images) => (images as HTMLImageElement[]).filter((image) => !image.complete || image.naturalWidth === 0).length);
    expect(brokenImages).toBe(0);

    await page.screenshot({ path: testInfo.outputPath(`${testInfo.project.name}-${route.replace(/[^a-z]+/gi, '-') || 'home'}.png`), fullPage: true });
  });
}
