import { chromium } from 'playwright';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'public/images/cases');
const sources = [
  ['/mnt/c/Windows/Temp/interactive-calculus2.png', 'interactive-calculus.webp'],
  ['/mnt/c/Windows/Temp/algorithm2.png', 'algorithm-visualization.webp'],
  ['/mnt/c/Windows/Temp/course-site.png', 'course-site-pages.webp'],
  ['/home/phonchi/learn_cli/skills/slides/slide-01.jpg', 'programmatic-slides.webp'],
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 1 });
for (const [source, filename] of [
  ['scripts/previews/document-cache.html', 'document-cache.webp'],
  ['scripts/previews/manuscript-skill.html', 'anonymous-manuscript-review.webp'],
]) {
  await page.goto(`file://${resolve(root, source)}`);
  const png = await page.screenshot({ type: 'png' });
  await sharp(png).webp({ quality: 84 }).toFile(resolve(out, filename));
}
await browser.close();

for (const [source, filename] of sources) {
  await sharp(source).resize(1200, 675, { fit: 'cover' }).webp({ quality: 84 }).toFile(resolve(out, filename));
}

console.log(`Generated ${sources.length + 2} case assets in ${out}`);
