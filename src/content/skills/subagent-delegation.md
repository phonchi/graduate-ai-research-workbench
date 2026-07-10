---
title: "Subagent Delegation"
summary: "把可獨立的搜尋、比較與審查工作交給不同 Context，最後由主工作流整合。"
order: 113
stage: "封裝"
difficulty: "技術"
estimatedMinutes: 25
skills:
  - "subagent delegation"
tools:
  - "檔案型 Agent"
outputs:
  - "自我完備的 subagent 任務規格"
lastVerified: 2026-07-10
draft: false
aliases:
  - "代理分工"
  - "獨立 Context 審查"
prerequisites:
  - "任務規格"
relatedLessons:
  - "06-verification-review"
  - "07-workflow-automation"
---

## 定義

Subagent delegation 是由主 agent 將可獨立處理的子任務放入分離 Context，讓不同工作者搜尋、比較或審查；主 agent 仍負責整合、核對衝突與最終交付。

## 何時使用

- 多份互不依賴的材料可平行閱讀。
- 需要不受原推理影響的獨立審查。
- 大範圍搜尋會占用主工作流大量 Context。

不適合需要頻繁共享可變狀態、明確順序依賴或即時研究者決策的小任務。

## 快速做法

每個內部任務都寫清背景、目標、範圍、必要輸入、禁止事項、輸出格式與長度。不要引用「前面談過的內容」。主 agent 預先定義如何去重、比較證據、處理矛盾與標記未完成。

## 最低驗收標準

- [ ] 子任務彼此獨立，沒有同時修改同一狀態的衝突。
- [ ] 每份規格不依賴主對話的隱含背景。
- [ ] 回報包含來源、位置或可核對證據，不只給結論。
- [ ] 主 agent 已處理矛盾、去重並標示未驗證項目。
- [ ] 最終責任沒有轉嫁給 subagent。

## 常見陷阱

平行數量不是品質；背景不足會產生不可比較答案，而把多份輸出直接拼接也不是整合。
