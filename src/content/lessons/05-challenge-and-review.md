---
title: 比較表寫好了，怎麼知道它有沒有讀錯？
summary: 從三篇論文的錯誤比較表開始，練習回查數字、處理缺值與矛盾，再請另一位檢查者找漏掉的問題。
order: 5
part: 把關
difficulty: 進階
estimatedMinutes: 26
learningOutcomes:
  - 從比較表與原文的差異，找出錯誤開始的位置。
  - 分開能直接比對的項目與需要領域判斷的問題。
  - 用獨立複核與小型測試材料，檢查修正是否有效。
prerequisites:
  - 02-ask-before-action
  - 04-checkpoints-and-tools
references:
  - title: Evals API Reference
    url: https://platform.openai.com/docs/api-reference/evals
    type: official
    note: 說明如何保存評估任務、判定條件與執行結果。
  - title: Working with evals
    url: https://platform.openai.com/docs/guides/evals
    type: official
    note: 示範以測試材料、已知答案與判定規則檢查模型輸出。
  - title: NIST AI Risk Management Framework
    url: https://airc.nist.gov/airmf-resources/airmf/
    type: standard
    note: 提供持續管理 AI 風險的參考。
  - title: Demystifying evals for AI agents
    url: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
    type: official
    note: 說明如何組合程式比對、模型協助與人工判定，檢查成果。
keyTerms:
  - 靜默失敗
  - 規格漂移
  - 獨立複核
  - 測試案例
  - 判定標準
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
lastVerified: 2026-09-05
draft: false
featured: true
---

## 一張整齊的表格，也可能把數字讀錯

你打開前一課的 `notes/comparison.md`，發現 Agent 把三篇論文整理成下面的表格。這一課的數字是教學用假設；實作時，請換成你手上論文的內容與來源位置。

| 論文 | 受試者數 | 影像數 |
|---|---:|---:|
| D01 | 120 | 600 |
| D02 | 600 | 600 |
| D03 | 120 | 未提供 |

表格完整，數字卻還不能使用。回到 `papers/D01.pdf`、`papers/D02.pdf`、`papers/D03.pdf`，你讀到：

- D01 的方法段寫「120 位受試者、600 張影像」，這一列正確。
- D02 只寫了「600 張影像」，沒有報告受試者數。Agent 把兩種數量混在一起。
- D03 的摘要寫 120 位，方法段寫 118 位，沒有交代差異。只留 120 會把問題藏起來。

因此，D02 的受試者數應改成「未提供」；D03 則保留「摘要 120、方法段 118，待釐清」，兩值各附位置。每列都要有來源，讓下一位讀者可以直接打開原文核對。

## 先保留錯誤，再找它從哪裡開始

先留下改正前的版本與原始交辦，避免修完後忘記問題怎麼發生。前一課的 Git 存檔點就能幫忙比較前後差異。

接著查最早讀錯的位置。D02 是擷取數字時就把影像當成人數，還是寫入表格時填錯欄？若中間筆記已錯，只修改最後的表格，下次重建仍會得到錯誤答案。應從第一個錯誤步驟修正，再檢查它影響了哪些摘要、圖表或結論。

你可以這樣交辦：

```text
先讀 notes/comparison.md、notes/ 中與 D02 相關的筆記，
以及 papers/D02.pdf。
找出現有紀錄中「600 位受試者」最早出現的位置；
若未保存產生過程，請明說無法確認起因。
列出原文實際寫法、目前表格寫法與受影響段落。
先回報原因與需修正的位置，暫不改檔。
```

找不到產生過程時，就明說無法確定原因；仍可依原文改正表格，並把尚未查明的部分寫進 `HANDOFF.md`。

## 哪些能直接檢查，哪些要靠人讀懂？

有些問題很容易比對：三篇是否都有列出、欄位有沒有漏掉、D01 的兩個數字是否分別為 120 和 600。這類固定格式可以交給程式檢查。

另一些問題需要讀懂內容。例如「未提供」是真的沒寫，還是 Agent 漏讀？D03 的 120 和 118，是否分別指招募人數與實際分析人數？沒有原文支持時，不能自己補上這個解釋。

檢查結果可以分開記成「通過」「需修正」「目前無法判定」。表格格式通過，不代表數字與研究解釋也通過；不要用一個平均分數把關鍵錯誤蓋過去。

## 讓另一位檢查者重新看一次

請另一個對話或 [subagent](../../tools/subagent/) 讀任務要求、來源和表格，不先告訴它「這張表應該已經正確」。它要回答的是原文是否支持表格，而非替前一個 Agent 解釋。

```text
請獨立檢查 notes/comparison.md。
來源目錄是 notes/sources.md，原文限 papers/D01.pdf、
papers/D02.pdf、papers/D03.pdf，不修改檔案。
逐列核對受試者數、影像數與來源位置；
找不到、互相矛盾或定義不清楚時，保留疑點並指出原文位置。
```

新的對話能減少前面討論的影響，同一模型仍可能犯相同的錯。最後由你回看疑點，特別是會影響研究結論的數字與解釋。需要更完整的交辦，可用[獨立複核範本](../../templates/independent-review/)。

## 留下三種小案例，下次修改後再試

D01 的資訊完整、D02 缺少人數、D03 來源互相矛盾，剛好能保留為三種測試材料。每種材料附一份你已核對的預期處理方式。下次換模型、修改交辦或整理成 Skill 時，再用相同材料看看：能否填對完整資訊、保留缺值、指出矛盾？

這些案例不必做成大型評分系統。材料和判定方式清楚，才有辦法比較修改前後。流程若在新材料失敗，就把那個例子加入測試；重要工作也要觀察多次執行是否一致。

## 把這個例子用到其他研究工作

「程式跑完但內容錯了」常被稱為**靜默失敗**。若後來少了原本要求的欄位或偷偷換了比較標準，則是**規格漂移**。你先提示答案、Agent 只找支持理由，是**附和**；錯誤數字再流進摘要與圖表，便形成**連鎖錯誤**。知道名稱有助於討論，但每次處理仍從實際產出與原始要求的差異開始。

這個方法也適用於[實驗結果](../../guides/research-skills/#experiment)與[視覺化](../../guides/research-skills/#visualize)：回到產生數字的資料與程式，檢查單位、計算方式及圖例。若需要新的資料、要改分析範圍，或關鍵數字始終無法釐清，就把問題交回研究者決定，不讓 Agent 不斷重試直到得到一個順眼的答案。

完成後，在 `HANDOFF.md` 記下修正與待決問題。若同類錯誤反覆出現，就值得把有效做法整理成下一課的工作手冊；也可以用[使用回顧](../../tools/insights/)找出哪些交辦條件經常漏寫。
