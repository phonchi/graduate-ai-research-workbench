import { describe, expect, it } from 'vitest';
import siteConfig from '../../site.config.json';
import * as site from './site';

const { buildSitePath } = site;
const base = `${siteConfig.projectBase}/`;

describe('buildSitePath', () => {
  it('joins the configured base with root-relative routes', () => {
    expect(buildSitePath(base, '/learn/')).toBe(`${siteConfig.projectBase}/learn/`);
  });

  it('does not duplicate slashes and preserves the site root', () => {
    expect(buildSitePath(base, '/')).toBe(base);
    expect(buildSitePath('/', '/cases/')).toBe('/cases/');
  });

  it('joins the configured base with public asset paths without adding a trailing slash', () => {
    const buildSiteAssetPath = Reflect.get(site, 'buildSiteAssetPath') as unknown;
    expect(typeof buildSiteAssetPath).toBe('function');
    if (typeof buildSiteAssetPath !== 'function') return;

    expect(buildSiteAssetPath(base, '/images/cases/example.webp')).toBe(`${siteConfig.projectBase}/images/cases/example.webp`);
    expect(buildSiteAssetPath('/', '/images/cases/example.webp')).toBe('/images/cases/example.webp');
  });
});
