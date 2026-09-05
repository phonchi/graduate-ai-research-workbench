---
title: AGENTS.md
summary: 寫給 Codex 等 agent 的工作區規矩檔，用來固定專案慣例、流程與紅線。
order: 7
kind: 檔案
level: 入門
aliases: [AGENTS file, Codex 工作守則, agent instructions]
capabilities:
  localFiles: no
  commands: no
  sourceCitations: no
  webAccess: no
  backgroundTasks: no
  humanApproval: depends
bestFor: [固定專案慣例, 設定工作紅線, 告訴 agent 如何驗證]
avoidFor: [放單次任務細節, 保存密鑰與個資, 取代 Skill 的完整專門流程]
firstStep: 先合作幾次，再請主 agent 根據重複出現的偏好草擬內容供你確認。
platformNames: [Codex]
officialUrl: https://developers.openai.com/codex/guides/agents-md
relatedLessons: [01-from-chat-to-agent, 04-checkpoints-and-tools, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 給每次進入專案的 Agent 一頁說明

`AGENTS.md` 是 Codex 等工具會讀取的工作區規則。把你每次都會交代的事寫進去，例如使用繁體中文、原始論文只讀、筆記沿用來源編號。它像新助理的入職須知，省下反覆交代的時間。

只在這次需要的任務，例如「補 D02 的樣本數」，留在當次交辦；做到哪裡則記在 `HANDOFF.md`。規則越貼近長期慣例，越不容易過期。

## 可以先試

```text
根據我們已確認的做法，草擬一份短版 AGENTS.md：
原文放 papers/，整理結果放 notes/，數字附來源位置。
只保留之後仍適用的規則，把你不確定的地方標出，先不寫檔。
```

讀完草稿，刪掉只屬於這次任務的細節，再存檔。不要放密碼、登入憑證或整篇研究背景。

Claude Code 對應的規則檔是 [CLAUDE.md](../claude-md/)，兩者的讀取方式依工具而定。某類任務的完整步驟則適合放在 [Skill](../skill/)；規則檔本身不會阻止程式讀寫檔案，實際權限仍要在工具或環境中設定。
