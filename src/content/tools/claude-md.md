---
title: CLAUDE.md
summary: Claude Code 的工作區規矩檔，用來保存專案長期慣例與不可跨越的界線。
order: 8
kind: 檔案
level: 入門
aliases: [Claude memory file, Claude Code 工作守則]
capabilities:
  localFiles: no
  commands: no
  sourceCitations: no
  webAccess: no
  backgroundTasks: no
  humanApproval: depends
bestFor: [固定 Claude Code 專案規矩, 保存驗證方式, 降低重複交代]
avoidFor: [放一次性需求, 保存敏感資訊, 直接當成 AGENTS.md 的通用別名]
firstStep: 做過幾次小任務後，請 Claude Code 先整理一份短草稿，再由你確認。
platformNames: [Claude Code]
officialUrl: https://code.claude.com/docs/en/memory
relatedLessons: [01-from-chat-to-agent, 04-checkpoints-and-tools, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 把每次都適用的要求留下來

`CLAUDE.md` 是 Claude Code 使用的工作區說明。你可以寫下研究專案的語言、資料夾用途、檢查方式和不能改的內容。例如「公式保留為文字」「papers/ 原文僅供讀取」「修改筆記後回查數字」。

這份檔案適合保存長期慣例。本次要完成哪篇論文、卡在哪個問題，分別留在交辦與 `HANDOFF.md`；某一類任務的詳細步驟則放在 [Skill](../skill/)。

## 可以先試

```text
請根據現有文件和我們已確認的做法，草擬一份短版 CLAUDE.md。
說明 papers/、notes/ 的用途，以及數字和引用要怎麼檢查。
不要加入猜測的慣例，先給我看草稿。
```

確認內容適用於之後的工作，再存成規則檔。密碼與登入憑證不要放進去。

[AGENTS.md](../agents-md/) 常用於 Codex，兩者都保存工作區規則，但讀取範圍及優先順序依工具而定。同時使用兩種工具時，可以共享慣例，仍需確認各自讀到了正確檔案。
