export function normalizeSearch(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase('zh-Hant').trim();
}

export function matchesSkill(searchText: string, categories: string[], query: string, category = ''): boolean {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  return (!category || categories.includes(category)) && terms.every((term) => normalizeSearch(searchText).includes(term));
}
