---
title: CLAUDE.md
summary: Claude Code 的工作區規矩檔，用來保存專案長期慣例與不可跨越的界線。
order: 8
kind: 檔案
level: 入門
aliases: [Claude memory file, Claude Code 工作守則]
canEditFiles: no
bestFor: [固定 Claude Code 專案規矩, 保存驗證方式, 降低重複交代]
avoidFor: [放一次性需求, 保存敏感資訊, 直接當成 AGENTS.md 的通用別名]
firstStep: 做過幾次小任務後，請 Claude Code 先整理一份短草稿，再由你確認。
platformNames: [Claude Code]
officialUrl: https://code.claude.com/docs/en/memory
relatedLessons: [01-from-chat-to-agent, 04-checkpoints-and-tools, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 白話是什麼

`CLAUDE.md` 是 Claude Code 在工作區裡使用的固定說明。你可以把研究專案的語言、目錄慣例、測試命令、人工把關點與紅線寫進去，像給新助理的一頁入職須知。

## 什麼時候用

同一個專案反覆出現相同要求，而且這些要求每次任務都適用時使用。例如「公式不可改成圖片」「完成後跑指定測試」「未公開資料不可上傳」。

## 不要拿它做什麼

不要把本次交辦、臨時檔名、token 或所有可能流程都永久寫入。規矩要短而可執行；只在某類任務才用的長流程，應整理成 Skill。

## 第一次怎麼開始

先說：「請根據這個 repo 已有文件與我們實際合作過的要求，草擬一份短版 `CLAUDE.md`；標出你推測的地方，先不要寫檔。」確認後再落地。

## 和其他工具的關係

`CLAUDE.md` 服務 Claude Code，`AGENTS.md` 常用於 Codex。兩者都承載工作區規矩，但讀取範圍與優先順序以各工具官方文件為準；若同時維護，內容可共享，檔案不能視為完全等價。
