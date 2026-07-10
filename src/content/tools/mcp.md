---
title: MCP
summary: Model Context Protocol，讓 AI client 透過標準介面連接外部工具與資料來源。
order: 12
kind: 協定
level: 進階
aliases: [Model Context Protocol, MCP server, MCP client]
canEditFiles: depends
bestFor: [連接固定資料源, 使用外部服務工具, 減少重複搬運資料]
avoidFor: [單次短問答, 尚未跑順的流程, 不明來源或過度授權的 server]
firstStep: 先說清楚要接哪個服務與只讀需求，請 agent 評估最小權限和測試方法。
platformNames: [MCP clients, MCP servers]
officialUrl: https://modelcontextprotocol.io/
relatedLessons: [04-checkpoints-and-tools, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 白話是什麼

MCP 是 Model Context Protocol，可把 agent 想成工作者、MCP 想成標準化插座。Client 透過 MCP server 接觸外部資料或工具；它只是連接方式，能做多少取決於 server 能力與你授予的權限。

## 什麼時候用

資料長期放在 GitHub、筆記系統或資料庫，而且流程真的需要反覆存取時，才值得評估。先從低風險、只讀資料測試，再逐步增加必要能力。

## 不要拿它做什麼

不要為了一次性問答就接服務，也不要把高權限 token 交給不熟的 server。MCP 不等於資料正確、安全或永遠可用，錯誤處理與人工確認仍要設計。

## 第一次怎麼開始

先問：「我想讓 agent 讀取某個固定資料源，只需要查詢。請評估是否需要 MCP，列出 client、server、最小權限、測試資料與風險；不要直接連正式資料。」

## 和其他工具的關係

MCP 提供外部工具連接；Skill 提供可重複流程；subagent 提供獨立分工。NotebookLM 是現成的來源問答產品，不應因為也能讀資料就直接稱為 MCP。
