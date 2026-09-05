---
title: "to-spec"
summary: "把已討論的需求整理成可交辦、可驗收的規格。"
order: 30
categories: ["plan"]
kind: "Skill"
aliases: ["需求規格", "spec"]
tags: ["需求整理", "規格", "驗收"]
platforms: ["Claude Code", "Codex"]
sourceUrl: "https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md"
draft: false
---

### 準備什麼

準備已有共識的討論、相關程式與決策文件。例如團隊已決定資料匯入工具要接受哪些欄位，就能把需求整理成一份交辦文件。先選擇保存位置：技能可將規格發布到設定好的工作追蹤系統；只需本機草稿時，交辦中明確指定。

### 試著這樣交辦

```text
請依 to-spec 整理我們已確認的資料匯入需求。
以目前討論與程式庫為準，列出問題、使用情境、
實作決定、測試方式與不做的範圍；確認測試邊界。
這次只寫本機 spec.md 草稿，不發布到 issue tracker。
```

### 完成後看什麼

讀完規格後，另一位成員應知道要解決什麼問題、這次做哪些事，以及如何判定完成。檢查每項需求是否出自已確認的討論，並確認本次不處理的問題有明確列出，避免交接後各自想像。
