---
title: AGENTS.md
summary: 寫給 Codex 等 agent 的工作區規矩檔，用來固定專案慣例、流程與紅線。
order: 7
kind: 檔案
level: 入門
aliases: [AGENTS file, Codex 工作守則, agent instructions]
canEditFiles: no
bestFor: [固定專案慣例, 設定工作紅線, 告訴 agent 如何驗證]
avoidFor: [放單次任務細節, 保存密鑰與個資, 取代 Skill 的完整專門流程]
firstStep: 先合作幾次，再請主 agent 根據重複出現的偏好草擬內容供你確認。
platformNames: [Codex]
officialUrl: https://developers.openai.com/codex/guides/agents-md
relatedLessons: [01-from-chat-to-agent, 04-checkpoints-and-tools, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 白話是什麼

`AGENTS.md` 是放在工作區裡的一頁「入職須知」。它把語言、檔案範圍、測試方式與不可碰的紅線寫下來，讓支援它的 agent 進入專案時知道怎麼合作。

## 什麼時候用

當你已經重複說過「用繁體中文」「改超過三個檔先列計畫」「不要碰未公開資料」等規矩時，就值得整理進去。內容應以這個 repo 長期都適用的規則為主。

## 不要拿它做什麼

不要把這次任務的所有背景、帳號密碼或整套專門工作流程全塞進去。規則太長、互相衝突，也會讓 agent 無法判斷優先順序。

## 第一次怎麼開始

先請 agent 只輸出草稿：「根據我們最近幾次合作，整理課程與語言、工作方式、驗證、紅線四段；先不要寫檔。」人工確認後才存成 `AGENTS.md`。

## 和其他工具的關係

`AGENTS.md` 常用於 Codex 工作區；`CLAUDE.md` 是 Claude Code 的對應規則檔。它們概念相近但讀取規則依工具而定，不能只改檔名就假定行為完全一樣；Skill 則處理特定任務流程。
