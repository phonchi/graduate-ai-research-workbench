// Add a category here; the catalog and content validation use this same list.
export const skillCategories = [
  { id: 'plan', label: '規劃與交接' },
  { id: 'read', label: '找論文與閱讀' },
  { id: 'write', label: '寫作與修改' },
  { id: 'experiment', label: '程式與實驗' },
  { id: 'visualize', label: '畫圖與理解' },
  { id: 'present', label: '製作簡報' },
];

export const legacySkillCategories: Record<string, string> = { publish: 'write', automate: 'plan' };
