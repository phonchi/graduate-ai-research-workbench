---
title: "html-visualizer"
summary: "把研究筆記、文獻比較與會議報告整理成可在瀏覽器閱讀的 HTML。"
order: 105
categories: ["visualize", "present"]
kind: "Skill 組合"
aliases: ["HTML Visualizer", "HTML 報告", "網頁報告", "研究成果展示"]
tags: ["文獻比較", "研究筆記", "研究室會議", "報告", "HTML", "視覺化"]
platforms: ["Claude Code", "Codex", "Cursor", "Agent Skills"]
sourceUrl: "https://github.com/chenjackle45/html-visualizer"
draft: false
---

### 準備什麼

準備已核對的研究筆記、來源清單與圖表，說明讀者、用途及輸出位置。適合把長篇內容整理成有目錄、比較表與圖解的閱讀頁，或在研究室會議中展示研究進度。

先依下方「原始專案與安裝說明」選擇所用工具的安裝方式，重新載入後請 Agent 確認技能可用。原專案包含 html-visualizer、chart 與 diagram-design 三個技能；安裝前先確認已有的同名技能與來源，避免覆寫自己使用的版本。CLI 安裝腳本需要 Python 3.8 以上；瀏覽器自檢另需可用的 Node.js 與 Playwright 環境。

### 試著這樣交辦

```text
請用 html-visualizer，把已核對的 notes/comparison.md
整理成給跨領域研究生閱讀的研究室會議報告，存到 reports/literature-review.html。
來源與位置見 notes/sources.md；只使用我提供且允許分享的材料。
先交代比較目的，再呈現方法差異、研究限制與下一步。
保留來源位置、單位、缺值與待確認事項，不新增引用或研究結果。
重要細節可收合，但不要刪掉。確認目錄、表格與手機閱讀正常，
並回報實際完成的內容查核及瀏覽器自檢；未執行的項目請明說。
```

### 完成後看什麼

交付是 HTML 閱讀頁。用瀏覽器開啟，確認內容沒有在排版時被省略，表格仍保留比較條件、來源與限制，再核對目錄連結、收合區塊及實際提供的複製按鈕。縮小到手機寬度時，文字與表格也應能閱讀。頁面可能載入外部字體或圖表資源；需要離線使用時，要另外要求離線版並斷網檢查。

版面自檢不能驗證研究結論。回到原文核對重要數值與論點，未查完的地方繼續標記；分享前確認資料與素材可公開。不能執行瀏覽器檢查時，應標示「未驗證」，不要把成功產生 HTML 當成已驗收。

### 和其他視覺工具怎麼選

html-visualizer 適合整理整份報告與閱讀頁；Archify 適合依程式證據說明技術架構與資料流；diagram-design 適合製作結構圖。本工具箱保留各專案的原始來源，請依這次的交付形式選用。
