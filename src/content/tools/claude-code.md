---
title: Claude Code
summary: Anthropic 的檔案型 agent，提供桌面與 CLI 工作方式來閱讀、修改及檢查專案。
order: 4
kind: 桌面 App
interfaces: [CLI]
level: 入門
aliases: [Claude Code desktop, Claude Code CLI]
capabilities:
  localFiles: yes
  commands: yes
  sourceCitations: depends
  webAccess: depends
  backgroundTasks: depends
  humanApproval: depends
bestFor: [長文件與專案修改, 執行檢查, 使用 Skill 或 subagent 拆解工作]
avoidFor: [未確認差異就發布, 把長期規矩只留在對話裡, 高風險資料的無界線操作]
firstStep: 在副本或 Git repo 中先做只讀盤點，確認工具看到的範圍。
platformNames: [Claude Code desktop app, Claude Code CLI]
officialUrl: https://code.claude.com/docs/en/overview
relatedLessons: [01-from-chat-to-agent, 04-checkpoints-and-tools, 05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 讓 Agent 進入研究資料夾工作

Claude Code 能閱讀和修改專案檔案，也能執行命令檢查成果。你可以透過桌面介面或 CLI（命令列介面）使用它；適合需要一起處理多份文件、程式或網站的任務。

## 可以先試

先開一份沒有敏感資料的練習資料夾，請它熟悉現況：

```text
先只讀 notes/sources.md 和 notes/comparison.md。
說明三篇論文目前比較了哪些欄位，哪些內容尚待補充。
先不修改；若要補內容，指出需要讀哪篇原文。
```

確認它找對檔案後，選一個小項目修改。動手前保存版本，完成後查看差異並回查原文，做法見[第 4 課](../../learn/04-checkpoints-and-tools/)。

Claude Code 使用 [CLAUDE.md](../claude-md/) 保存共通規則。重複流程可以整理成 [Skill](../skill/)，獨立搜尋或複核可交給 [Subagent](../subagent/)。不同介面與版本的操作位置，以官方文件和目前畫面為準。
