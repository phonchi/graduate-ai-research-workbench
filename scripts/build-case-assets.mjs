import { chromium } from 'playwright';
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'public/images/cases');
const rasterSources = [['scripts/previews/programmatic-slides.png', 'programmatic-slides.webp']];
const htmlSources = [
  ['scripts/previews/document-cache.html', 'document-cache.webp'],
  ['scripts/previews/manuscript-skill.html', 'anonymous-manuscript-review.webp'],
];
const inlineSvgSources = [['scripts/previews/reproducible-experiment.html', 'reproducible-experiment.webp']];

for (const [source, filename] of inlineSvgSources) {
  const html = await readFile(resolve(root, source), 'utf8');
  const svg = html.match(/<svg[\s\S]*<\/svg>/)?.[0];
  if (!svg) throw new Error(`${source} does not contain an inline SVG preview`);
  await sharp(Buffer.from(svg)).webp({ quality: 84 }).toFile(resolve(out, filename));
}

let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 1 });
  for (const [source, filename] of htmlSources) {
    await page.goto(`file://${resolve(root, source)}`);
    const png = await page.screenshot({ type: 'png' });
    await sharp(png).webp({ quality: 84 }).toFile(resolve(out, filename));
  }
} catch (error) {
  const missing = htmlSources.filter(([, filename]) => !existsSync(resolve(out, filename)));
  if (missing.length > 0) throw error;
  console.warn('Browser unavailable; preserved existing legacy HTML preview assets.');
} finally {
  await browser?.close();
}

for (const [source, filename] of rasterSources) {
  await sharp(resolve(root, source)).resize(1200, 675, { fit: 'cover' }).webp({ quality: 84 }).toFile(resolve(out, filename));
}

console.log(`Generated or verified ${rasterSources.length + htmlSources.length + inlineSvgSources.length} case assets in ${out}`);
