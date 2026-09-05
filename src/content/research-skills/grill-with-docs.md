---
title: "grill-with-docs"
summary: "一面討論研究工具的設計，一面留下共用術語與決策理由。"
order: 20
categories: ["plan"]
kind: "Skill"
aliases: ["術語與決策", "domain-modeling"]
tags: ["研究軟體", "多人協作", "術語表"]
platforms: ["Claude Code", "Codex"]
sourceUrl: "https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md"
draft: false
---

### 準備什麼

準備研究工具計畫、現有程式與團隊常用的名稱，指定文件保存位置。例如同一份資料有人稱為個案、有人稱為樣本，就先討論兩者是否相同。此技能會合用 grilling 與 domain-modeling，讓討論結果成為後續工作能參照的文件。

### 試著這樣交辦

```text
請用 grill-with-docs 討論我們的實驗追蹤工具。
先讀現有 glossary 與決策紀錄，沿用已定義的名稱。
追問尚未決定的部分，把確認過的術語與設計理由寫入 docs/；
尚未取得共識的選項請保留為待決事項。
```

### 完成後看什麼

完成後打開術語表與決策紀錄，確認相同概念使用同一名稱，每項決定都有問題、選擇與理由。尚未取得共識的選項應保留為待決事項；下一位合作者應能從文件理解團隊為什麼這樣做。
