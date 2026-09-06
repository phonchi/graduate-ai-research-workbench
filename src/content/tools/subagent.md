---
title: Subagent
summary: 讓高階模型規劃與驗證，次階模型分身依規格實作，把較貴的呼叫用在重要判斷。
order: 13
kind: 工作方式
level: 進階
aliases: [sub-agent, 分身, 獨立 context, agent delegation]
capabilities:
  localFiles: depends
  commands: depends
  sourceCitations: depends
  webAccess: depends
  backgroundTasks: depends
  humanApproval: depends
bestFor: [大範圍搜尋, 獨立審查, 多份材料平行比較]
avoidFor: [需要即時共同決策, 背景沒有寫清楚的任務, 很小且不可切分的工作]
firstStep: 先由高階模型寫好規格與驗收案例，再指定次階模型完成一項實作。
platformNames: [支援 subagent 的 agent 工具]
relatedLessons: [01-from-chat-to-agent, 03-context-and-indexes, 05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-09-05
draft: false
---

## 分身接手一項工作，不必重讀整段對話

Subagent 是主 Agent 派出的工作分身，有自己的上下文，也就是這次能看到的指令與材料。交辦時提供目標、規格、檔案位置與完成條件，分身便能處理指定工作，再把結果交回主對話。

分身和模型等級是兩件事：分身可以用相同模型，也可以在工具支援時指定不同模型。要節省費用，可以讓高階模型負責規劃與重要驗證，較低成本的次階模型負責明確實作。貴模型不必讀每份紀錄、改每一行程式；先試做一小項，再依實際結果決定分工。

## 先判斷能不能拆，再決定開幾個分身

一份子任務至少要有指定輸入、獨立交付物與完成條件。如果它還在等另一份結果，就先標明依賴，不要同時開工。例如先固定比較欄位，才能分別整理 D01、D02、D03；三份筆記齊了，再由一個整合者合併。

讓分身各寫 `notes/D01-extract.md` 等獨立檔案，不要同時修改同一張比較表。只有一支小程式要實作時，一個分身就可能足夠；多開分身會增加讀背景、等待與整合的工作。可以先約定試做時間、並行上限及何時回報，將資源留給真正需要的工作。

## 從論文比較表，做到整理表格的小程式

假設你已有 D01、D02、D03 的來源筆記，想把已核對內容存成 `notes/records.csv`，由程式產生 `notes/comparison.generated.md`。可以這樣分工：

```text
高階模型：請定義輸入欄位、資料邊界、可修改位置與驗收案例，
將決定寫入 notes/program-spec.md，附試做輸入與預期輸出。

次階模型分身：讀這份規格、指定輸入與必要程式檔，
實作 scripts/build_comparison.py，輸出 notes/comparison.generated.md，
保留數字、單位與原文位置，原比較筆記留作驗收比對。
先跑正常資料、缺漏與重跑一致性測試，完整紀錄存入 notes/。
回報修改檔案、測試結果、疑點與紀錄位置，不重貼全部內容。

高階模型：依規格驗收，回查測試無法判定的資料語意與來源疑點。
若需求改變，或修正後仍反覆驗證失敗，分身交回失敗案例，
由高階模型重新判斷後再繼續。
```

這段練習的完整材料與步驟見[第 3 課](../../learn/03-context-and-indexes/)，也可直接填[模型分工範本](../../templates/model-delegation/)。一般程式先檢查欄位與輸出是否符合規格，高階模型再處理需要判斷的問題，研究者確認關鍵結論。

## 怎麼指定模型，怎麼看是否省下費用

在支援分身模型設定的工具中，為實作分身選擇次階模型，再確認它實際使用的模型。[Claude Code 的模型設定說明](https://code.claude.com/docs/en/sub-agents#choose-a-model)提供其中一種做法。沒有分身功能時，也能另開較低成本模型的對話，交付相同規格，再把結果帶回原對話。

限制每個分身讀取的檔案，交接時只給必要背景，回報使用摘要與紀錄位置，可以減少重複讀取。把規劃、實作、驗證的用量分開記，總 token 加入所有分身與重試，費用則依實際模型與方案計算。若背景交接比實作還多，小工作留在主對話通常更省事。更多做法見[成本管理說明](https://code.claude.com/docs/en/costs)。

[Skill](../skill/) 是工作手冊，Subagent 是這次分給誰做；分身也能讀 Skill，或使用 [MCP](../mcp/) 連接的工具。
