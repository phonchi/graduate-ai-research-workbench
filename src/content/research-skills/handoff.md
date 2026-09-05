---
title: "handoff"
summary: "把這次對話整理成交接文件，讓下一次工作接得上。"
order: 45
categories: ["plan"]
kind: "Skill"
aliases: ["交接便條", "HANDOFF.md", "對話交接"]
tags: ["交接", "研究進度", "下一步", "context"]
platforms: ["Claude Code", "Codex"]
sourceUrl: "https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md"
draft: false
---

### 準備什麼

在目前的工作對話中使用，告訴 Agent 下次要處理什麼，並提供相關文件位置。例如三篇論文已讀完兩篇，就聚焦尚未閱讀的第三篇。技能會引用既有成果，將交接文件寫到作業系統的暫存目錄，並列出下一次可能用到的技能。

### 試著這樣交辦

```text
請使用 handoff 整理這次文獻比較的進度。
留下研究目標、已完成內容、待確認問題與檔案位置。
下次先讀 papers/D03.pdf，補齊 notes/comparison.md。
產生後請另存到工作資料夾的 HANDOFF.md，回報完整位置；
若已有同名文件，另存新檔。
```

### 完成後看什麼

打開文件，確認已完成與待確認事項符合現況，引用的路徑也找得到。另存到工作資料夾是本次交辦增加的保存動作，可避免交接文件隨暫存目錄被清理。新對話先讀便條，再核對材料，接續完成第一個小任務。
