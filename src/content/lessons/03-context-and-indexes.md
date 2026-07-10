---
title: 別搬整座圖書館：Context、索引與新對話
summary: 理解 lost in the middle，學會用 quick notes、索引與全文文字快取三層資料，以及 NotebookLM 和新對話控制 Context。
order: 3
part: Context
difficulty: 實作
estimatedMinutes: 24
slideRefs: [4, 5, 10, 14, 15, 16, 17, 26]
keyTerms:
  - Context
  - lost in the middle
  - quick notes
  - 索引
  - 全文文字快取
  - NotebookLM
  - 新對話
relatedTools:
  - chatgpt
  - notebooklm
  - codex
  - claude-code
  - subagent
relatedCases:
  - document-cache
  - anonymous-manuscript-review
lastVerified: 2026-07-10
draft: false
featured: true
---

## 研究生日常

你把 30 篇 PDF、兩版論文與一整串實驗日誌丟進同一段對話，期待 AI 全部記住。剛開始還正常，後來它漏掉中間那篇關鍵論文，把舊版數字當新版，甚至忘記你原本只要處理方法章。

資料很多不等於 Context 用得好。研究工作真正需要的是：先知道哪裡有什麼，再把當下需要的少量原文拿進來。

## 投影片的核心比喻

別把整座圖書館搬上桌，先給助理書目和書架位置。長內容放在 Context 中間時較容易被忽略，這個現象常稱為 **lost in the middle**。

投影片提供三層做法：

1. **摘要（quick notes）**：每份資料一句話，快速判斷是否相關。
2. **索引**：檔名、標題、關鍵字與位置，用來定位候選來源。
3. **全文文字快取**：把原始文件抽成可搜尋文字，保留來源檔與頁碼或段落位置；真的要引用、核對公式或細讀方法時才開這層，最後仍回原始文件確認。

另一個比喻是「存檔重來」。一個階段結束就開新對話，帶上目標、目前進度、下一步和必要來源，不必把整段歷史一起拖過去。

## 正式工具名詞

**Context** 是模型在當次工作中可見的指令、對話與資料，不等於永久記憶。Context 越長，也不保證每一段都被同等注意。

**NotebookLM** 適合把 PDF、簡報、網址等放成一組來源，再進行有來源定位的閱讀、問答與整理。它的強項是「讀與答」；要改本機檔案、跑程式或部署網站，仍需要 Agent。

在 Context 管理上，**subagent** 的作用是把大批閱讀過程留在獨立 Context，只把結論、來源位置與未確定事項帶回主對話，避免主線被全文與搜尋紀錄塞滿。它與 Skill、MCP 的完整差異留到第六單元。

## 直接試一次

先請 Agent 為一個資料夾做最小索引，不要一開始就摘要所有內容：

```text
請先盤點 papers/，不要修改原始檔。
輸出三層閱讀快取：
1. quick notes：每份文件一句話；
2. index：檔名、主題、關鍵字、年份與可定位位置；
3. full text cache：每份原始文件抽成可搜尋文字，
   存入 cache/fulltext/，並保留來源檔、頁碼或段落位置。

先用索引回答「哪些資料談到 domain shift？」；
需要引用時才開候選原文，並標明來源位置。
```

階段完成後，用這張接力便條開新對話：

```text
目標：比較三篇 domain shift 方法。
已完成：papers/index.md 已定位 A、B、C 三篇。
本輪只讀：A 與 B 的方法、限制段落。
下一步：先列共同假設與差異；引用前回到全文核對。
不要沿用先前對話中未出現在來源裡的數字。
```

## 真實案例怎麼看

[合成文件快取知識庫](/graduate-ai-research-workbench/cases/document-cache/)示範 quick notes、索引與全文文字快取如何分層；[匿名 Manuscript Review Skill](/graduate-ai-research-workbench/cases/anonymous-manuscript-review/)則提醒：即使 Context 管得好，受保密義務約束的稿件仍要先確認能不能交給該工具。

## 先避開三個坑

1. **索引寫得很漂亮卻找不到原文**：每筆都保留穩定檔名或路徑。
2. **來源更新但快取沒更新**：索引標記日期或版本，引用前確認不是舊稿。
3. **新對話只貼「接著做」**：重貼目標、進度、下一步與必要來源，別靠它猜前情。

## 一句帶走

**先看 quick notes，再查索引，最後才開全文文字快取並回原始文件核對；一個階段結束，就用乾淨的新對話接力。**
