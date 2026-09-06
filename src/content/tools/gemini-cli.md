---
title: Gemini CLI
summary: Google 的開源終端機 agent，適合在命令列中閱讀專案、修改檔案與執行工具。
order: 5
kind: CLI
level: 進階
aliases: [Google Gemini CLI, Gemini command line]
capabilities:
  localFiles: yes
  commands: yes
  sourceCitations: depends
  webAccess: depends
  backgroundTasks: depends
  humanApproval: depends
bestFor: [終端機研究流程, 程式與文件修改, Google 生態使用者的 agent 工作]
avoidFor: [不熟 terminal 的第一次體驗, 未確認權限的工具操作, 單純來源問答]
firstStep: 先依官方文件完成安裝登入，再在測試 repo 中執行唯讀任務。
platformNames: [Gemini CLI]
officialUrl: https://github.com/google-gemini/gemini-cli
relatedLessons: [01-from-chat-to-agent, 04-checkpoints-and-tools, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 在終端機裡處理研究專案

Gemini CLI 把 Gemini 模型接到檔案與命令列工具，讓 Agent 能閱讀專案、提出修改與執行命令。若你原本就用終端機整理檔案、執行分析程式，可以考慮這個入口。

CLI 是命令列介面。第一次接觸時，先確認自己位於哪個資料夾，以及命令會影響哪些檔案；只想閱讀幾篇論文，可以先用 [NotebookLM](../notebooklm/) 的網頁介面。

## 可以先試

依官方文件完成安裝與登入，在練習資料夾中請它讀 `notes/sources.md`，列出三篇論文對應的檔案。確認它找對位置，再交辦 `notes/comparison.md` 的一個小修改，完成後查看版本差異。

Gemini CLI、Codex 和 Claude Code 都能處理檔案，但指令與規則檔設定各有不同。切換工具時，先確認它實際讀取的工作區與規則，不要直接沿用另一套工具的設定名稱。
