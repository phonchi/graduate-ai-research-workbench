import { describe, expect, it } from 'vitest';
import { buildSitePath } from './site';

describe('buildSitePath', () => {
  it('joins the configured base with root-relative routes', () => {
    expect(buildSitePath('/graduate-ai-research-workbench/', '/learn/')).toBe('/graduate-ai-research-workbench/learn/');
  });

  it('does not duplicate slashes and preserves the site root', () => {
    expect(buildSitePath('/graduate-ai-research-workbench/', '/')).toBe('/graduate-ai-research-workbench/');
    expect(buildSitePath('/', '/cases/')).toBe('/cases/');
  });
});
