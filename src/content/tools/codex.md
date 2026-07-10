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
firstStep: 選一個有 Git 存檔點的測試資料夾，先要求只讀盤點，不要修改。
platformNames: [Codex app, Codex CLI]
officialUrl: https://developers.openai.com/codex/
relatedLessons: [01-from-chat-to-agent, 04-checkpoints-and-tools, 05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 白話是什麼

Codex 是「不只回答，還能動手」的 agent 工具。它的模型是腦，讀檔、改檔與跑指令是手，`AGENTS.md` 和你的單次交辦是規矩；工作方式應是觀察、動手、驗證，再修正。

## 什麼時候用

當任務需要跨檔案理解、修改程式或教材、跑測試、看差異時使用。桌面 App 適合先熟悉專案與變更檢視，CLI 適合已能在 terminal 中工作的使用者。

## 不要拿它做什麼

不要把「能修改」理解成「可以不看就改」。沒有乾淨存檔點、包含敏感資料、或發布權限不清楚時，先停下來界定範圍；重要研究判斷仍由人負責。

## 小型練習

在測試 repo 中說：「請只閱讀目前資料夾，不要修改或執行寫入指令。列出用途、重要檔案、你不確定的地方，以及若要修改會怎麼驗證。」

## 和其他工具的關係

`AGENTS.md` 是 Codex 可讀的工作區規矩；Skill 是特定任務的工作手冊；MCP 是連接外部服務的協定；subagent 是拆分工作的方式，四者不是 Codex 的同義詞。
