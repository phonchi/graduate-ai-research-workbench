export const researchTasks = [
  { id: 'literature', label: '讀懂與比較文獻', description: '建立有來源、能回查的文獻脈絡。', icon: 'library', skills: ['文獻綜整', '來源查核'] },
  { id: 'claims', label: '查核引用與論述', description: '分開原文證據、推論與待驗證主張。', icon: 'badge-check', skills: ['主張證據對照', '反例檢查'] },
  { id: 'organize', label: '整理研究材料', description: '讓檔案、筆記與 AI context 保持可追溯。', icon: 'folder-tree', skills: ['Context 管理', '資料溯源'] },
  { id: 'reproduce', label: '重現分析與實驗', description: '保存設定、環境、版本與驗證結果。', icon: 'refresh-cw', skills: ['可重現研究', '版本控制'] },
  { id: 'communicate', label: '修訂論文與簡報', description: '把研究內容轉成可審查、可辯護的產出。', icon: 'presentation', skills: ['學術寫作', '視覺驗證'] },
  { id: 'automate', label: '封裝重複工作流', description: '把已跑順的方法整理成模板、Skill 或自動化。', icon: 'blocks', skills: ['Skill 設計', '工作流評估'] },
] as const;
