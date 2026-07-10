---
title: "Context 管理"
summary: "為單一任務選擇必要、最新且權威的材料，排除過量與衝突背景。"
order: 104
stage: "探索"
difficulty: "進階"
estimatedMinutes: 20
skills:
  - "Context 管理"
tools:
  - "NotebookLM"
  - "檔案型 Agent"
outputs:
  - "任務 Context 封包"
lastVerified: 2026-07-10
draft: false
aliases:
  - "上下文管理"
  - "context engineering"
prerequisites:
  - "任務規格"
relatedLessons:
  - "01-task-specification"
  - "03-context-knowledge-base"
---

## 定義

Context 管理是依任務挑選模型或協作者當下需要的規格、定義、來源與範例，並清楚標出版本、權威性、衝突與禁用內容。

## 何時使用

- 資料夾包含多版草稿、筆記、PDF、資料與聊天紀錄。
- 回答反覆引用舊版或混用不同定義。
- 任務太大，需要分階段或交給獨立工作者。

## 快速做法

建立 `必讀、選讀、禁用` 三張清單，附每項材料的用途與版本。另寫本任務採用的術語、已知衝突及回答時必須保留的引用格式。

## 最低驗收標準

- [ ] 每份載入材料都有用途、版本與權威性說明。
- [ ] 已排除舊版、未驗證摘要與不相關資料。
- [ ] 任務所用術語與定義明確且一致。
- [ ] Context 中的摘要能回到原始來源。

## 常見陷阱

Context 越多不代表越完整；過期與低權威材料會稀釋真正的限制，單一超大知識庫也不適合所有任務。
