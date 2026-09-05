---
title: "to-tickets"
summary: "將計畫拆成有成果、有驗收條件的小工作。"
order: 40
categories: ["plan"]
kind: "Skill"
aliases: ["工作拆解", "tickets"]
tags: ["工作單", "計畫拆解", "前置依賴"]
platforms: ["Claude Code", "Codex"]
sourceUrl: "https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md"
draft: false
---

### 準備什麼

提供已確認的規格與交付位置。先想一個能獨立展示的小成果，例如用一份範例資料完成匯入與檢查，再逐步增加支援格式。技能會先讓你核對拆分方式與工作順序，再寫入本機工作檔或設定好的工作追蹤系統。

### 試著這樣交辦

```text
請用 to-tickets 拆解已確認的 spec.md。
每項工作都要有一個可展示的成果、驗收條件與必須先完成的工作。
先讓我核對拆分與順序，再將每項工作寫成一份本機工作檔。
```

### 完成後看什麼

每張工作單應寫出成果、驗收條件與真正必須先完成的工作。試著挑一張讀給同學聽：他能否知道從哪裡開始、做到什麼程度算完成？如果只能說「處理資料」或「做介面」，就還需要縮小範圍。
