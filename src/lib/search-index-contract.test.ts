import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

describe('search index contract', () => {
  it('passes a URL query to the initialized Pagefind UI', () => {
    const searchPage = source('src/pages/search/index.astro');

    expect(searchPage).toMatch(/new URLSearchParams\(window\.location\.search\)\.get\(['"]q['"]\)/);
    expect(searchPage).toMatch(/\.triggerSearch\([^)]*\)/);
  });

  it('keeps the 404 response out of Pagefind and search engine indexes', () => {
    const notFound = source('src/pages/404.astro');
    const layout = source('src/layouts/BaseLayout.astro');

    expect(notFound).toMatch(/<BaseLayout\b[^>]*\bnoindex\b/);
    expect(notFound).toMatch(/<BaseLayout\b[^>]*\bpagefindBody=\{false\}/);
    expect(layout).toContain('<meta name="robots" content="noindex" />');
    expect(layout).toMatch(/data-pagefind-body=\{pagefindBody \? true : undefined\}/);
  });
});
