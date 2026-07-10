---
title: 看起來完成，不代表真的正確：研究失敗診斷
summary: 從靜默失敗、規格漂移、附和與連鎖錯誤著手，保存證據、定位偏離點，再用客觀檢查與獨立複核判斷成果。
order: 5
part: 把關
difficulty: 進階
estimatedMinutes: 26
learningOutcomes:
  - 區分靜默失敗、規格漂移、附和與連鎖錯誤，並指出各自需要的證據。
  - 為研究產出配置客觀檢查、代表性測試資料與獨立人工 rubric。
  - 寫出明確的停止與升級條件，不讓 Agent 在高風險錯誤上自行重試。
prerequisites:
  - 02-ask-before-action
  - 04-checkpoints-and-tools
references:
  - title: Evals API Reference
    url: https://platform.openai.com/docs/api-reference/evals
    type: official
    note: OpenAI 官方 API reference，說明 eval、testing criteria、run 與 output item 的資料結構。
  - title: Working with evals
    url: https://platform.openai.com/docs/guides/evals
    type: official
    note: OpenAI 官方指南，示範以代表性測試資料、ground truth 與 grader 檢查模型輸出。
  - title: NIST AI Risk Management Framework
    url: https://airc.nist.gov/airmf-resources/airmf/
    type: standard
    note: NIST 的 AI 風險治理框架，以 Govern、Map、Measure、Manage 四個功能組織風險管理工作。
keyTerms:
  - 靜默失敗
  - 規格漂移
  - 獨立複核
  - gold task
  - rubric
  - 停止條件
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

## 先辨認是哪一種失敗

最危險的研究錯誤，常常不是程式當場停止，而是流程順利結束、檔案也存在，內容卻悄悄偏離需求。先不要叫 Agent「再試一次」，先把症狀分類。

以下四類是本站依研究協作中常見症狀整理的診斷框架，不是 NIST AI RMF 或 OpenAI Evals 原文提出的 taxonomy。這兩份官方資料分別支撐持續風險管理與以測試資料、判定規則進行評估的做法；類別名稱與分組則用來幫助本站讀者定位證據。

| 失敗模式 | 常見症狀 | 先找什麼證據 |
|---|---|---|
| 靜默失敗 | 顯示完成，但漏檔、漏列、使用舊資料或跳過失敗項目 | 實際輸出、exit code、缺漏清單、資料筆數 |
| 規格漂移 | 做到後面改了受眾、範圍、欄位或判定標準 | 原始交辦、變更紀錄、最終產出差異 |
| 附和 | 你先暗示結論，檢查者只替它找理由 | 反例、替代解釋、盲化後的獨立判定 |
| 連鎖錯誤 | 前一步取錯資料，後面的圖、表與文字全部合理化 | 每一階段的輸入、輸出與轉換紀錄 |

一個錯誤可能同時屬於多類。分類的目的不是貼標籤，而是決定下一個可觀察的檢查點。

## 把產生與判定拆開

本站進一步把複雜任務分成三種責任：規劃者界定步驟與完成條件，產生者執行，評估者只拿規格與成品挑錯。這是為了降低自產自審偏誤而採用的責任分離方式，不是 OpenAI Evals API 或 NIST AI RMF 規定的系統架構。三者不一定要使用三個 Agent；重點是評估時不要沿用產生過程中的辯解。

先做能明確判定的客觀檢查：

- 檔案是否存在、格式能否解析、程式是否成功結束。
- 資料筆數、ID、欄位與來源版本是否相符。
- 圖表數字是否能回到表格或程式輸出。
- 允許修改的檔案範圍是否被遵守。

再處理需要領域判斷的項目，例如主張是否過度、方法限制是否交代完整。這些項目要有短 rubric，並保留「無法判定」選項。OpenAI Evals 是把測試資料、預期答案與判定規則結構化的一種官方工具；研究生也可以用本機 CSV、測試程式與 Markdown 表格實作同一個原則，不必先接 API。

## 本站建議的診斷主線

1. **凍結現場**：保留失敗輸出、命令、log 與當時使用的資料版本，不要立刻覆寫。
2. **定位第一個偏離點**：用「預期／觀察到／證據位置」描述差距，再從成品往前找到最早不符合契約的輸入或步驟。
3. **分開驗證與修正**：先用 parser、測試、計數或比對排除可確定的錯，再讓獨立檢查者依原規格與必要來源找反例；根因與影響範圍清楚後才重跑。

可以直接使用這份回報格式：

```text
失敗症狀：
第一個可確認的偏離點：
客觀證據與位置：
可能受影響的下游產出：
可以安全重跑的最小步驟：
必須由研究者決定的問題：
```

## 先準備小型評估集

不要等到投稿前才驗收。為重複流程保留一組小型但具代表性的 **gold tasks**，涵蓋正常案例、邊界案例與過去真的失敗過的案例。每個案例記錄輸入、預期行為、客觀判定方式，以及需要人工 rubric 的部分；數量依風險與流程差異決定，不把固定題數當成完整性的證明。

評估集不是一次性的考卷。當資料格式、模型、prompt、Skill 或程式改變時，重跑相同案例並比較差異；新增失敗案例時，也要記錄它代表哪一種風險。NIST AI RMF 強調風險管理應持續進行，而不是完成一次檢查就永久有效。

## 何時必須停止並升級

符合任一條就停止自動重試，把現場與證據交給研究者、指導者或領域專家：

- 原始資料、資料授權、受試者同意或分析範圍不清楚。
- 關鍵數字無法回到來源，或不同來源互相矛盾。
- 下一步需要刪除、覆寫、公開、擴大資料權限，或會改變研究結論與作者責任。

停止不是失敗；在證據不足時停止，正是可靠流程的一部分。更完整的資料、公開與外部服務界線集中在[研究安全與責任](/graduate-ai-research-workbench/safety/)；需要讓另一位檢查者盲化複核時，可直接使用[獨立複核範本](/graduate-ai-research-workbench/templates/independent-review/)。

## 把失敗變成下一輪的檢查點

任務結束後，回顧「哪個規格沒說清楚、哪個錯誤可以由機器檢查、哪個決策必須由人保留」。把通用規則寫回工作守則，把特定流程累積成下一單元的 Skill 候選。

部分 Claude Code 版本提供 `/insights` 作為使用回顧入口，但它只是平台例子。其他工具直接使用等價問題即可：

```text
回顧這次失敗：哪些規格缺口、客觀檢查與停止條件
值得保留到下一次？請區分工作區通則、任務流程與一次性資訊。
```

回顧不能證明研究結論正確，也不能未經審查就自動改寫永久規則。

## 一句帶走

**先保存失敗證據，找到第一個偏離點，再用客觀檢查與獨立判定決定修正或停止。**
