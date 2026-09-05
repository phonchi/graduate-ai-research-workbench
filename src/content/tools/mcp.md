---
title: MCP
summary: Model Context Protocol，讓 AI client 透過標準介面連接外部工具與資料來源。
order: 12
kind: 協定
level: 進階
aliases: [Model Context Protocol, MCP server, MCP client]
capabilities:
  localFiles: depends
  commands: depends
  sourceCitations: depends
  webAccess: depends
  backgroundTasks: depends
  humanApproval: depends
bestFor: [連接固定資料源, 使用外部服務工具, 減少重複搬運資料]
avoidFor: [單次短問答, 尚未跑順的流程, 不明來源或過度授權的 server]
firstStep: 先說清楚要接哪個服務與只讀需求，請 agent 評估最小權限和測試方法。
platformNames: [MCP clients, MCP servers]
officialUrl: https://modelcontextprotocol.io/
relatedLessons: [04-checkpoints-and-tools, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 讓 Agent 接上外部資料或工具

MCP（Model Context Protocol）是一種連接協定。你使用的 Agent 工具是連接的一端，稱為 client；提供查詢或操作功能的一端稱為 server。兩端接好後，Agent 才能使用對方提供且你允許的功能。

例如研究筆記放在另一個服務，工作中經常要查它，MCP 可以減少手動搬運資料。若資料已在本機、現有工具就能讀，通常不必為此再接一個服務。

## 可以先試

```text
我想查詢研究室的筆記服務，只需要讀取指定資料夾。
請先說明現有工具是否能完成，若需要 MCP，
指出要連哪個服務、能讀什麼，以及如何用測試資料確認。
先不連接正式資料。
```

只開放任務需要的功能，登入憑證不要貼進對話。MCP 提供連接方式，外部資料是否正確仍要回查。[Skill](../skill/) 則提供做事步驟，[Subagent](../subagent/) 用來分工，三者可以搭配。
