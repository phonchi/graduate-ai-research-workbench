---
title: 工作交接便條
summary: 用六項短筆記記下目標、材料與進度，讓新對話知道從哪裡接著做。
order: 80
category: Context
applicableTasks: [read, write, experiment, automate]
relatedTools:
  - codex
  - claude-code
  - chatgpt
templateBody: |
  # 工作交接便條

  目標：這項工作要完成什麼，給誰使用？
  材料：原始來源、版本與目前產物放在哪裡？
  已完成：實際完成並檢查過哪些內容？
  未完成：還缺什麼，哪些問題尚未確認？
  已決定：哪些範圍、做法或限制要沿用？
  下一步：接手後先做哪一件事，怎麼確認完成？

  接手提示：
  請先讀這份便條與列出的檔案，確認能讀取後再繼續。
  沿用已決定事項；若檔案現況與便條不同，先回報差異。
exampleBody: |
  # 組會論文整理交接

  目標：讓組會同學看懂 D01、D02、D03 的資料與方法差異。
  材料：papers/D01.pdf、papers/D02.pdf、papers/D03.pdf；來源版本見 notes/sources.md；比較表在 notes/comparison.md。
  已完成：D01 的比較列已整理，資料與方法已回查原文。
  未完成：D02、D03 尚未整理；D01 的限制欄仍待查。
  已決定：不新增論文，不排名方法；保留原始 PDF；引用附來源代號與頁碼。
  下一步：先回查 D01 的限制章節並更新比較表，再處理 D02。

  接手提示：
  請先讀 HANDOFF.md、notes/sources.md 與 notes/comparison.md，
  確認目前進度；若和便條不同，先回報差異。
  完成後更新實際做完的事項與下一步，保留尚未確認的問題。
lastVerified: 2026-09-05
draft: false
---

## 何時使用與怎麼填

要暫停工作或換新對話時，把六項內容寫進專案的 `HANDOFF.md`。下方進度是教學示例，請改成你實際完成的事情；寫過但還沒檢查的內容，也要說清楚。

接手時，先請 AI 讀便條，再打開列出的材料。便條讓它知道從哪裡繼續，原始檔與目前產物則讓它確認實際狀態。不要只寫「接著做」，也不用貼整段聊天紀錄。

這份便條適合保存短期進度。持續適用的規則放在[一頁工作守則](../workspace-rules/)，來源版本與段落位置則放在[來源與位置筆記](../context-cache-index/)。
