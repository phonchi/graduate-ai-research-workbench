---
title: Gemini CLI
summary: Google 的開源終端機 agent，適合在命令列中閱讀專案、修改檔案與執行工具。
order: 5
kind: CLI
level: 進階
aliases: [Google Gemini CLI, Gemini command line]
canEditFiles: yes
bestFor: [終端機研究流程, 程式與文件修改, Google 生態使用者的 agent 工作]
avoidFor: [不熟 terminal 的第一次體驗, 未確認權限的工具操作, 單純來源問答]
firstStep: 先依官方文件完成安裝登入，再在測試 repo 中執行只讀任務。
platformNames: [Gemini CLI]
officialUrl: https://github.com/google-gemini/gemini-cli
relatedLessons: [01-from-chat-to-agent, 04-checkpoints-and-tools, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 白話是什麼

Gemini CLI 是在 terminal 裡工作的 agent 入口。它把 Gemini 模型接到檔案與命令列工具上，適合已經理解目前目錄、指令執行與權限範圍的人。

## 什麼時候用

研究流程本來就在 terminal 中進行，例如檢查程式、整理專案檔案或跑可重現命令時可考慮。若你主要需求是閱讀一批固定來源，NotebookLM 通常更容易起步。

## 不要拿它做什麼

不要只因為 CLI 看起來效率高，就在唯一版本或敏感資料上練習。也不要假定它和 Codex、Claude Code 的指令、規則檔或擴充名稱完全相同。

## 第一次怎麼開始

先讀官方安裝說明，在測試 repo 中要求只列出檔案結構與可能的檢查方法。確認輸出後，再交辦單一小修改並查看 Git diff。

## 和其他工具的關係

它和 Codex CLI、Claude Code CLI 同屬 agent CLI，但平台名稱與操作習慣不同；共通原則仍是先存檔、給規格、限制權限、驗證結果。
