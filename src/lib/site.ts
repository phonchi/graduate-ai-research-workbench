export function buildSitePath(base: string, route: string): string {
  const normalizedBase = base === '/' ? '/' : `/${base.replace(/^\/+|\/+$/g, '')}/`;
  const normalizedRoute = route.replace(/^\/+|\/+$/g, '');

  if (!normalizedRoute) return normalizedBase;
  return `${normalizedBase}${normalizedRoute}/`.replace(/\/{2,}/g, '/');
}
