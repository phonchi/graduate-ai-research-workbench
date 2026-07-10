---
title: 把跑順的流程寫成 Skill：你的實驗室手冊
summary: 把做順的研究流程、踩過的坑與 QA 清單整理成會在需要時載入、可重複使用的 Skill。
order: 6
part: 封裝
difficulty: 進階
estimatedMinutes: 22
slideRefs: [10, 29, 30, 31, 32]
keyTerms:
  - Skill
  - subagent
  - MCP
  - 工作手冊
  - QA 清單
  - 可重複流程
relatedTools:
  - codex
  - claude-code
  - skill
  - subagent
  - mcp
relatedCases:
  - programmatic-slides
  - document-cache
  - anonymous-manuscript-review
lastVerified: 2026-07-10
draft: false
featured: false
---

## 研究生日常

你花了三天把「整理論文資料夾 → 建索引 → 找候選段落 → 核對引用」跑順。下個月換一批資料，又從空白 prompt 開始；同門想複用，只拿到一段看不懂的對話紀錄。

真正值得留下的不是那串對話，而是標準步驟、你踩過的坑、需要的工具和最後的 QA 清單。把它們寫成可載入的 Skill，下一個任務才不用重教一次。

## 投影片的核心比喻

**Skill 像實驗室手冊**：把標準步驟、你踩過的坑和完成前的 QA 寫在一起。新助理遇到這類任務時才拿出來照著做，平常不用把整本手冊塞進 Context。每解決一次問題，就多留下一份下次可直接複用的研究資產。

## 正式工具名詞

- **Skill**：回答「遇到這類任務，照什麼手冊做？」它封裝觸發條件、操作步驟、參考資料與檢查方式。
- **subagent**：回答「這一次工作要分給誰？」它是獨立 Context 的分身，完成一項子任務後帶結果回來。
- **MCP（Model Context Protocol）**：回答「Agent 怎麼接到外部資料或工具？」它提供連接方式，不提供你的研究流程。

三者解決不同問題，也能一起使用：Skill 管流程，subagent 管本次分工，MCP 管外部連接。詳見 [Skill](/graduate-ai-research-workbench/tools/skill/)、[subagent](/graduate-ai-research-workbench/tools/subagent/) 與 [MCP](/graduate-ai-research-workbench/tools/mcp/) 工具詞典。本單元的重點是先把流程寫成 Skill。

## 直接試一次

挑一個已經跑順、下次還會再做的流程，請 Agent 整理成 Skill 草案：

```text
請回顧這次「研究簡報發布」流程，整理成可重複使用的 Skill 草案。
必須包含：
- 何時應該觸發、何時不該觸發；
- 開工前要向我確認的資訊；
- 固定步驟與會用到的工具；
- 我們這次真的遇到的坑；
- 完成前的內容、數字、視覺與發布 QA。

請把專案專屬路徑改成可填參數，並給這個 Skill 一句清楚的觸發說明。
```

草案完成後，用一個新的小任務試跑：觸發是否正確、步驟是否足夠、QA 是否真的抓得到你曾遇過的錯。把試跑發現補回手冊，Skill 才會越用越貼近你的研究習慣。

## 真實案例怎麼看

[程式化簡報](/graduate-ai-research-workbench/cases/programmatic-slides/)可沉澱成「規格 → 產生 → 渲染 → 檢查」Skill；[合成文件快取知識庫](/graduate-ai-research-workbench/cases/document-cache/)適合封裝批次擷取與索引；[匿名 Manuscript Review Skill](/graduate-ai-research-workbench/cases/anonymous-manuscript-review/)則直接展示審查模式、步驟與邊界如何寫進工作手冊。

## 先避開三個坑

1. **第一次成功就急著封裝**：至少重跑一次，分清固定步驟與偶然條件。
2. **只存 prompt，不存 QA**：真正有價值的是錯誤處理、檢查方式與人工決策點。
3. **把所有工作塞進一個巨型 Skill**：一份手冊處理一類清楚任務，才容易觸發、測試與更新。

## 一句帶走

**把做順的流程、踩過的坑與 QA 寫成 Skill，研究經驗才會從一次性對話變成可複用的實驗室手冊。**
