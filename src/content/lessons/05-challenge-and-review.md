---
title: 漂亮不代表正確：請 AI 挑錯，不要只求附和
summary: 用反例、挑錯式問法、獨立複核與人工抽查守住研究品質，再用 /insights 或回顧 prompt 改善自己的交辦習慣。
order: 5
part: 把關
difficulty: 進階
estimatedMinutes: 24
slideRefs: [20, 21, 22, 27, 28, 32, 33]
keyTerms:
  - 反例
  - 挑錯式問法
  - 獨立複核
  - 人工抽查
  - peer review
  - /insights
relatedTools:
  - chatgpt
  - codex
  - claude-code
  - insights
  - subagent
relatedCases:
  - interactive-calculus
  - anonymous-manuscript-review
  - algorithm-visualization
lastVerified: 2026-07-10
draft: false
featured: true
---

## 研究生日常

AI 幫你生成了一張漂亮的比較表、流暢的解釋和排版完整的程式輸出。你問「這樣對吧？」它也說對。隔天組會才發現：一個指標方向寫反，反例不成立，圖表還引用了舊版數字。

最大的風險不一定是難看的錯，而是看起來已經可以交出去的錯。研究成果越整齊，越要刻意安排一個唱反調的檢查者。

## 投影片的核心比喻

出題的人不該是唯一驗算的人。就像論文要交給作者以外的 reviewer 審查，產生內容的 AI 不該是唯一檢查者。第一個 AI 產生內容，第二個獨立實例負責找錯；最後仍由知道研究脈絡的人決定。

問法也要改。別問「我這樣解對吧？」改問「最可能錯在哪裡？請找反例、指出隱含假設，並說明什麼觀察會推翻這個結論。」這不是要 AI 故意悲觀，而是抵消它順著你說的傾向。

## 正式工具名詞

**counterexample（反例）** 是能推翻一般性敘述的具體例子。AI 很會提出候選，但反例本身必須驗算。

**independent review（獨立複核）** 指檢查者不要直接沿用產生者的推理歷史。可以開新對話、使用另一個 Agent，或派一個只拿到需求與成品的 subagent。真正高風險的數字、推導與資料處理，還要由人或可信的程式檢查。

**/insights** 是講者所用工具中的指令名稱，不代表每個 AI 都支援。它在投影片中用來回顧常見交辦模式與卡點；名稱與替代做法可查 [/insights 工具詞典](/graduate-ai-research-workbench/tools/insights/)。若手邊工具沒有同名指令，用一般回顧 prompt 也能實作同一個精進迴圈。

## 直接試一次

先把產出交給一個沒有原對話歷史的檢查者：

```text
你是獨立檢查者。不要重做排版，先挑錯。
請依序檢查：
1. 數字是否能回到指定來源；
2. 結論是否超過資料能支持的範圍；
3. 是否存在反例、遺漏條件或替代解釋；
4. 圖表、正文與程式輸出是否互相一致。

每項請標示「已核對／有疑慮／無法判定」，
並寫出需要人工核對的原始位置。不要因為文字流暢就判定正確。
```

一個階段完成後，再回顧自己的用法：

```text
回顧這一輪對話：我在哪些地方交代得太模糊？
哪些返工其實能用一條工作守則或驗收標準預防？
請給我最多 5 條可直接加入 AGENTS.md／CLAUDE.md 的短規則，
並區分「通用習慣」與「只適用本任務」。
```

## 真實案例怎麼看

[3D 曲面與導數反例互動教材](/graduate-ai-research-workbench/cases/interactive-calculus/)把反例當作候選，再由研究者驗算；[匿名 Manuscript Review Skill](/graduate-ai-research-workbench/cases/anonymous-manuscript-review/)把挑錯流程固定成多輪檢查；[搜尋與排序演算法動畫](/graduate-ai-research-workbench/cases/algorithm-visualization/)則證明最終答案正確還不夠，中間步驟也要對。

## 先避開三個坑

1. **同一段對話自己產、自己審**：另開乾淨 Context，避免照著原推理附和。
2. **只叫它「再檢查一次」**：明列要查的錯誤類型、來源與判定格式。
3. **把 AI 複核當人工簽核**：涉及論文主張、成績、受試者或公開數據時，人仍是最後把關者。

## 一句帶走

**不要問 AI「我對不對」；請獨立的一方找反例、挑假設、核來源，再由你做最後判斷。**
