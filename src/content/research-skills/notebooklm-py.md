---
title: "notebooklm-py"
summary: "用 Python、CLI 或 Skill 管理 NotebookLM 來源、問答與產出。"
order: 55
categories: ["read", "present"]
kind: "非官方 Python 工具・CLI・Skill"
aliases: ["NotebookLM", "notebooklm", "Gemini Notebook"]
tags: ["來源問答", "筆記本", "文獻閱讀", "語音摘要", "簡報"]
platforms: ["Python", "CLI", "Agent Skills"]
sourceUrl: "https://github.com/teng-lin/notebooklm-py"
draft: false
---

### 準備什麼

準備 Python 環境、可登入 NotebookLM 的帳戶，以及要加入筆記本的來源。這是非官方工具，附有供 Agent 使用的技能；需要先完成登入。第一次可以從幾份公開材料開始，指定筆記本與問題，等來源處理完成後再開始問答。

### 試著這樣交辦

```text
請用 notebooklm-py 建立一個「文獻比較」筆記本，
加入我指定的三篇公開論文，等來源處理完成。
依這些來源比較研究問題、方法與限制，保留來源引用。
將比較結果存到 notes/notebooklm-comparison.md，
回報筆記本名稱與位置，方便我回去查看。
```

### 完成後看什麼

核對筆記本是否收齊指定來源，再打開比較結果，逐項回查引用與原文。需要語音摘要或簡報時，可以再指定主題、語言與輸出位置；等待產出完成後下載，實際開啟檔案確認內容與來源相符。
