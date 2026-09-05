---
title: AskUserQuestion
summary: 當缺少會影響成果的決定時，讓 Agent 提出問題並取得你的選擇。
order: 9
kind: 功能
level: 入門
aliases: [Ask User Question, 開工前反問, 澄清問題]
capabilities:
  localFiles: no
  commands: no
  sourceCitations: no
  webAccess: no
  backgroundTasks: no
  humanApproval: yes
bestFor: [補齊模糊規格, 讓使用者選擇方案, 高影響決策前確認]
avoidFor: [可從檔案自行查明的問題, 每一步都停下來問, 用提問逃避合理判斷]
firstStep: 先讓 Agent 查現有資料，仍有會影響成果的未決事項時再提問。
platformNames: [Claude Code AskUserQuestion]
officialUrl: https://code.claude.com/docs/en/tools-reference
relatedLessons: [02-ask-before-action]
lastVerified: 2026-07-10
draft: false
---

## 缺一個關鍵決定時，先問清楚

`AskUserQuestion` 是 Claude Code 的提問工具。你不用記住這個名稱，也能請 Agent 在資訊不足時提出問題。例如比較論文前，「樣本數」究竟指受試者、影像或實驗次數，會影響整張表，值得先確認。

可以從現有文件找到的答案，讓 Agent 先查；已交代清楚的小修改則直接做。提問適合用在兩種合理做法會產生不同成果，而且資料無法代你決定的時候。

## 可以先試

```text
請比較 papers/ 中三篇論文的方法。
先讀 notes/sources.md 和現有比較欄位；
若仍有會改變比較結果、且無法從資料查明的選擇，
再提出少量問題，附上你的建議與理由。
```

這樣的交辦讓 Agent 先利用已知資訊，再把真正需要你決定的部分交回來。沒有同名提問工具，也能直接在對話中完成。
