---
title: Subagent
summary: 把明確子任務交給獨立工作分身，讓主 agent 保留決策與驗證；可依工具支援搭配不同模型。
order: 13
kind: 工作方式
level: 進階
aliases: [sub-agent, 分身, 獨立 context, agent delegation]
capabilities:
  localFiles: depends
  commands: depends
  sourceCitations: depends
  webAccess: depends
  backgroundTasks: depends
  humanApproval: depends
bestFor: [大範圍搜尋, 獨立審查, 多份材料平行比較]
avoidFor: [需要即時共同決策, 背景沒有寫清楚的任務, 很小且不可切分的工作]
firstStep: 寫清楚子任務的來源、欄位、輸出與驗收條件，再請主 agent 判斷是否值得分工。
platformNames: [支援 subagent 的 agent 工具]
relatedLessons: [01-from-chat-to-agent, 03-context-and-indexes, 05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-09-05
draft: false
---

## 把一項清楚的工作交給另一個分身

Subagent 是主 Agent 派出的工作分身，有自己的對話閱讀空間。它可以先看指定材料，再把整理過的結果交回來，讓主對話專心處理比較、取捨與下一步。

例如三篇論文的方法擷取互不依賴，可以分開處理；另一個分身也能獨立檢查比較表。每份交辦都要寫清楚背景、來源、目標與輸出，不能假設分身知道主對話裡沒說出的意思。

## 可以先試

```text
請把三篇論文的方法擷取分開處理。
來源是 notes/sources.md 所列的 papers/D01.pdf、papers/D02.pdf、papers/D03.pdf。
每份子任務只讀一篇，擷取受試者數、影像數與方法，每項附來源位置。
缺值與矛盾照實保留，不從其他論文補答案。
主 Agent 整合到 notes/comparison.md，再回查影響結論的數字與疑點。
```

若工具支援指定模型，可以讓較低成本模型處理欄位擷取，較強模型負責規劃與判斷。[Claude Code 的子模型設定](https://code.claude.com/docs/en/sub-agents#choose-a-model)提供其中一種做法；仍要確認實際可用的模型，不能只看分身名稱推測成本。

分身需要讀背景、回報，主 Agent 也要整合，所以分工不保證減少總用量。很小的工作、需要你隨時調整方向的任務，通常留在主對話更方便。

[Skill](../skill/) 是工作手冊，Subagent 是這次分給誰做；分身可以讀 Skill，也能使用 [MCP](../mcp/) 連接的工具。
