---
title: 從 Chat 到 Agent：先選合作方式，再交出工具
summary: 用模型、工具、規則、環境與人的責任理解 Agent，並依任務風險選擇 Centaur 或 Cyborg 協作方式。
order: 1
part: 觀念
difficulty: 入門
estimatedMinutes: 18
learningOutcomes:
  - 區分 Chat、固定 workflow 與會自行選擇下一步的 Agent。
  - 依可逆性、可驗證性與研究風險選擇 Centaur 或 Cyborg 協作方式。
  - 說清楚 Agent 可用的工具、工作邊界與人類必須保留的判斷責任。
prerequisites: []
references:
  - title: "The Bitter Lesson"
    url: http://www.incompleteideas.net/IncIdeas/BitterLesson.html
    type: paper
    note: 提醒長期有效的方法通常依賴可擴展的學習與搜尋，而不是不斷堆疊人工微操規則。
  - title: "Building Effective Agents"
    url: https://www.anthropic.com/engineering/building-effective-agents
    type: official
    note: 區分預先編排的 workflow 與由模型動態決定工具使用流程的 agent。
  - title: "Claude Code Overview"
    url: https://code.claude.com/docs/en/overview
    type: official
    note: 提供能讀取工作區、修改檔案、執行命令與驗證成果的產品實例。
  - title: "Navigating the Jagged Technological Frontier"
    url: https://www.hbs.edu/ris/download.aspx?name=24-013.pdf
    type: paper
    note: 原始研究附錄描述 Centaur 分工與 Cyborg 緊密交錯兩種人機協作實踐。
keyTerms:
  - Chat
  - workflow
  - Agent
  - agentic loop
  - Centaur
  - Cyborg
  - 工作邊界
relatedTools:
  - chatgpt
  - codex
  - claude-code
  - gemini-cli
  - agents-md
  - claude-md
relatedCases:
  - interactive-calculus
  - algorithm-visualization
lastVerified: 2026-07-10
draft: false
featured: true
---

## 三種工作方式，不是一條升級階梯

Agent 並不是「比較高級的 Chat」。它代表另一種工作安排：模型不只產生回答，還能根據目前結果選擇工具、觀察輸出並決定下一步。這種彈性也帶來成本與風險，所以最簡單、最可控的方式常常才是正確選擇。

| 工作方式 | 下一步由誰決定 | 適合研究情境 | 主要風險 |
|---|---|---|---|
| Chat | 人每一輪發問 | 解釋名詞、討論研究問題、改寫一小段文字 | 回答流暢但來源或事實未核對 |
| 固定 workflow | 預先寫好的流程 | 格式轉換、固定報表、每次步驟相同的處理 | 規格改變後仍照舊流程執行 |
| Agent | 模型依環境與結果選擇工具 | 跨檔案盤點、修改、執行檢查與反覆修正 | 範圍漂移、誤用工具或把錯誤擴散到更多檔案 |

一個實用的 Agent 工作環境至少包含五個部分：

1. **模型**：理解目標並判斷下一步。
2. **工具**：讀檔、搜尋、修改、執行命令或存取外部服務。
3. **規則**：資料範圍、命名慣例、禁止事項與完成條件。
4. **環境**：實際工作區、權限、版本控制與可執行檢查。
5. **人**：決定研究問題、提供授權、處理高風險歧義並驗收成果。

Agentic loop 可以簡化成「觀察現況 → 選擇動作 → 取得結果 → 驗證與調整」。迴圈能跑，不代表方向正確；人的責任是先定義邊界，並在關鍵決策點保留否決權。

## Centaur 還是 Cyborg？

Centaur 與 Cyborg 原本是研究中觀察到的兩種協作實踐，不是產品模式，也沒有一種永遠較好。

- **Centaur**：人先切分工作，再把適合的子任務交給 AI。研究者保留問題定義、資料選擇與最後判斷。
- **Cyborg**：人與 AI 在同一個細部流程中快速來回，例如產生一小段程式、立即執行、看結果後再共同修正。

用下面四題決定本輪採哪一種：

1. **錯一次會不會造成不可逆後果？** 會公開、覆寫原始資料或影響受試者時，採 Centaur，先切小並設人工確認。
2. **結果能不能立刻客觀檢查？** 有測試、已知答案或可重算輸出時，可以用 Cyborg 快速迭代。
3. **我是否具備判斷品質的領域知識？** 若無法辨認錯誤，就先縮小任務或找領域專家，不要靠更多自動化補洞。
4. **工具需要多大權限？** 只授予本任務必要的資料夾與動作；權限範圍比產品名稱更重要。

同一個研究流程可以混用兩者。例如人先決定納入哪些資料與分析方法，再與 Agent 交錯撰寫清理程式；最後由人核對統計假設與對外主張。

## 第一次練習：只觀察，不修改

選一個沒有敏感資料的研究副本，先測試 Agent 是否能正確理解環境：

```text
請先只讀盤點目前工作區，不要修改檔案或執行會寫入的命令。
請回報：
1. 這個專案的目的與主要輸入、輸出；
2. 哪些檔案看起來是權威來源；
3. 現有的測試或驗證命令；
4. 你無法從檔案確認的事項。

每一點附檔案位置；不確定就標記，不要補猜。
```

你要檢查的不是文筆，而是它是否真的先看環境、能區分事實與推測，並遵守只讀範圍。通過後，再交付一個可回復的小修改。

## 選工具前的最後檢查

- 只要解釋與討論：先用 Chat。
- 步驟固定且規則清楚：優先用簡單 workflow。
- 需要根據中間結果調整、多次使用工具：才考慮 Agent。
- 來源、數字、倫理、公開與不可逆操作：一定保留人的決策點。

Sutton 的文章不是叫人「不要寫規則」，而是提醒不要用愈來愈細的人工微操取代可擴展的方法。對研究工作而言，耐用的做法是給清楚目標、合適工具、可檢查環境與停止條件，再讓模型在這些邊界內工作。
