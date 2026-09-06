---
title: Codex
summary: OpenAI 的程式與檔案型 agent，可在授權範圍內讀寫專案並執行檢查。
order: 3
kind: 桌面 App
interfaces: [CLI]
level: 入門
aliases: [Codex app, Codex CLI, OpenAI Codex]
capabilities:
  localFiles: yes
  commands: yes
  sourceCitations: depends
  webAccess: depends
  backgroundTasks: depends
  humanApproval: depends
bestFor: [跨檔案修改, 執行測試與建置, 檢查研究程式或網站]
avoidFor: [未建立存檔點就大改, 未授權的公開發布, 只需一句定義的問題]
firstStep: 選一個有 Git 存檔點的測試資料夾，先要求唯讀盤點，不要修改。
platformNames: [Codex app, Codex CLI]
officialUrl: https://developers.openai.com/codex/
relatedLessons: [01-from-chat-to-agent, 04-checkpoints-and-tools, 05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 把說好的任務交給能改檔的 Agent

Codex 能讀取專案、修改檔案與執行檢查。它適合需要跨檔案理解的工作，例如補論文比較表、修改分析程式，或更新研究網站。桌面 App 可以用來查看專案與修改差異；CLI（命令列介面）則適合已在終端機工作的人。

## 可以先試

準備一份練習資料夾，先讓它只閱讀，不修改：

```text
請先讀 notes/sources.md 和 notes/comparison.md，不修改檔案。
列出三篇論文對應的檔名、目前的比較欄位和待釐清問題。
若要補上缺值，說明會回查哪份原文。
```

確認它理解現況，再讓它完成一個小修改。動手前保存版本，完成後查看差異；[第 4 課](../../learn/04-checkpoints-and-tools/)會帶你做一次。

[AGENTS.md](../agents-md/) 保存每次都適用的規則；[Skill](../skill/) 提供某類任務的工作手冊；[Subagent](../subagent/) 用來分工。先熟悉讀檔、改檔與檢查，再依工作需要加入這些功能。
