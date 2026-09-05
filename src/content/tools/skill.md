---
title: Skill
summary: 按任務選用現成工作手冊，也能把驗證過的流程整理成自己的 Skill。
order: 11
kind: 工作方式
level: 進階
aliases: [Agent Skill, SKILL.md, 工作手冊, 實驗室手冊]
capabilities:
  localFiles: depends
  commands: depends
  sourceCitations: depends
  webAccess: depends
  backgroundTasks: depends
  humanApproval: depends
bestFor: [重複任務流程, 保存檢查方式, 留下經驗與範本]
avoidFor: [未經驗證就自行封裝流程, 所有專案都適用的通用規矩, 連接外部服務]
firstStep: 先找符合任務的現成 Skill；若要自己寫，從完成的任務整理初稿，再換材料試用。
platformNames: [Claude Code Skills, Codex Skills, Agent Skills]
officialUrl: https://agentskills.io/
relatedLessons: [05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-09-05
draft: false
---

## 給某一類任務一份工作手冊

Skill 記錄特定工作的步驟、參考材料與常見錯誤，需要時才讓 Agent 讀取。例如「整理論文比較表」可以提醒它分開記錄受試者數與影像數、保留缺值、為數字附來源。

第一次做任務，也可以選用適合的現成 Skill。先看用途和工具需求，再用小份資料試用；可從[研究技能指南](../../guides/research-skills/)找起點。

## 想保存自己的做法時

順序是：**完成一次任務→整理手冊初稿→換材料試用→依結果修訂**。先有實際經驗，才知道哪些步驟值得保存；換材料後，才能發現手冊是否過度依賴第一個案例。

```text
請根據這次三篇論文的比較過程，草擬一份 Skill。
保留來源確認、欄位擷取、缺值與矛盾處理、回查原文等通用步驟。
本次的論文檔名和具體數值留在案例，不寫成固定規則。
先提供 SKILL.md 初稿，之後再用另一批材料試用。
```

[第 6 課](../../learn/06-build-your-toolbox/)有完整示例。`SKILL.md` 是入口，可另附 `scripts/` 程式和 `references/` 參考資料；資料夾不必一開始就備齊。

每次都適用的規則放 `AGENTS.md` 或 `CLAUDE.md`，當次目標與檔案位置留在交辦。Skill 提供方法，但材料越多仍會占用 Agent 的閱讀空間；按需載入能減少重複讀取，不能保證不增加用量。
