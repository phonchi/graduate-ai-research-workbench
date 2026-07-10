export interface CatalogItem {
  title: string;
  summary: string;
  stage: string;
  difficulty: string;
  skills: string[];
  tools: string[];
  outputs: string[];
  href: string;
}

export interface CatalogFilters {
  query?: string;
  stage?: string;
  difficulty?: string;
  skill?: string;
  tool?: string;
  output?: string;
}

export function normalizeSearchText(value: string): string {
  return value.trim().toLocaleLowerCase('zh-Hant');
}

export function filterCatalog(items: CatalogItem[], filters: CatalogFilters): CatalogItem[] {
  const query = normalizeSearchText(filters.query ?? '');

  return items.filter((item) => {
    const searchable = normalizeSearchText([
      item.title,
      item.summary,
      ...item.skills,
      ...item.tools,
      ...item.outputs,
    ].join(' '));

    return (!query || searchable.includes(query))
      && (!filters.stage || item.stage === filters.stage)
      && (!filters.difficulty || item.difficulty === filters.difficulty)
      && (!filters.skill || item.skills.includes(filters.skill))
      && (!filters.tool || item.tools.includes(filters.tool))
      && (!filters.output || item.outputs.includes(filters.output));
  });
}
