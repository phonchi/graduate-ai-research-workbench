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

## 白話是什麼

Claude Code 是能在專案裡動手的 agent，而不只是 Claude 網頁聊天。依你使用的平台，它可透過桌面介面或 CLI 閱讀工作區、提出修改並執行檢查。

## 什麼時候用

研究任務牽涉多份文件、程式、網站或固定 QA 流程時適合使用。熟悉幾次小任務後，可把長期規矩整理進 `CLAUDE.md`，把反覆流程整理成 Skill。

## 不要拿它做什麼

不要一開始就要求它重寫整個資料夾，也不要省略 Git 存檔點與人工 diff。CLI、桌面版與不同版本的功能可能不同，操作前應以當下官方文件及畫面為準。

## 小型練習

在沒有敏感資料的副本中試著要求：「先只讀；用三段回報研究主題、重要檔案與不確定處。不要修改，等我確認範圍。」

## 和其他工具的關係

Claude Code 常以 `CLAUDE.md` 保存工作區規矩；這不等於 Codex 常用的 `AGENTS.md`。Skill、MCP 與 subagent 分別是流程手冊、外部連接協定與分工方式。
