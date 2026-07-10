---
title: 研究工作環境：規則、存檔點、進度與權限
summary: 逐步建立讓 Agent 能安全接手的研究工作區：長期規則、Git checkpoint、進度紀錄、最小權限與可執行驗證。
order: 4
part: 實作
difficulty: 實作
estimatedMinutes: 28
learningOutcomes:
  - 將長期研究慣例與單次任務規格放在不同位置，避免規則互相污染。
  - 在 Agent 動手前建立 Git checkpoint，並用狀態與差異檢查保護既有工作。
  - 以進度紀錄、最小權限與可執行命令定義可接續、可驗證的工作環境。
prerequisites:
  - 能辨認原始資料、衍生結果與可公開檔案。
  - 已在副本或測試專案中使用過檔案型 Agent。
references:
  - title: "Custom Instructions with AGENTS.md"
    url: https://learn.chatgpt.com/docs/agent-configuration/agents-md
    type: official
    note: 說明 Codex 如何依全域與專案層級發現及合併 AGENTS.md 指令。
  - title: "How Claude Remembers Your Project"
    url: https://code.claude.com/docs/en/memory
    type: official
    note: 說明 CLAUDE.md、匯入與不同作用域的專案指令及記憶方式。
  - title: "Claude Code Settings"
    url: https://code.claude.com/docs/en/settings
    type: official
    note: 提供權限、設定作用域與專案設定的官方參考。
  - title: "Git Tutorial"
    url: https://git-scm.com/docs/gittutorial
    type: official
    note: 說明 Git 的變更追蹤、提交與版本歷史基本工作方式。
keyTerms:
  - research workspace
  - AGENTS.md
  - CLAUDE.md
  - Git checkpoint
  - progress log
  - permission
  - verification command
relatedTools:
  - codex
  - claude-code
  - gemini-cli
  - agents-md
  - claude-md
  - git-github
relatedCases:
  - course-site-pages
  - programmatic-slides
lastVerified: 2026-07-10
draft: false
featured: true
---

## Walkthrough：把一個研究資料夾變成可安全接手的工作區

假設你有一個分析專案，包含原始資料、程式、衍生結果與論文草稿。Agent 能不能可靠工作，不只取決於模型，而取決於它進入時看見哪些規則、是否有可回復版本、做到哪裡如何記錄，以及哪些動作真的被授權。

```text
research-project/
├── AGENTS.md 或 CLAUDE.md
├── README.md
├── data/raw/          # 原始資料，不由 Agent 改寫
├── data/derived/      # 可重建的衍生資料
├── src/               # 分析程式
├── results/           # 圖表與輸出
├── tests/             # 可執行檢查
└── progress.md        # 目前狀態與下一步
```

這只是示例，不必為了配合工具重排既有專案。重點是每一類材料有清楚角色，Agent 能知道哪裡是權威來源、哪裡可以重建、哪裡不能覆寫。

## 第一步：把長期規則與單次任務分開

不同產品使用不同規則檔名與讀取順序。Codex 支援分層的 `AGENTS.md`，Claude Code 使用 `CLAUDE.md` 與相關設定。通用概念是「工作區指令」：保存跨任務都成立、從程式碼不容易看出的慣例。

```markdown
# 研究工作規則

## 資料邊界
- data/raw/ 是權威原始資料，只讀，不覆寫。
- 衍生資料寫入 data/derived/，並保留產生命令。

## 驗證
- 修改分析程式後執行既有測試。
- 影響結果時重建小型測試輸出，核對欄位與筆數。

## 人工決策
- 新增資料來源、改變納入條件、公開結果前必須詢問。
```

不要把本週進度、臨時檔名、密鑰或整篇研究背景永久塞進規則檔。單次目標與範圍留在本次任務；做到哪裡則交給 progress log。

## 第二步：動工前建立 checkpoint

先用唯讀命令理解現況：

```bash
git status
git diff
```

如果工作區已有修改，先分清楚哪些是研究者尚未提交的工作。不要要求 Agent 自動收進同一個 commit，也不要覆蓋它們。

在確認目前狀態可回復後，再建立一個有意義的 checkpoint。提交應對應一個清楚階段，例如「加入基準分析與測試資料」，而不是把所有變動一次打包。

```bash
git add <這次確認過的檔案>
git commit -m "record baseline analysis"
```

Git 是版本歷史，不是內容正確性保證，也不是敏感資料備份。密鑰、受試者資料、受限制文件與大型原始資料需要其他合適的儲存與治理方式。

## 第三步：用 progress log 保存可接續狀態

規則說「每次都怎麼做」，progress log 說「這次做到哪裡」。一份短紀錄即可：

```markdown
# Current progress

## 目標
重建 baseline 並核對主要表格。

## 已完成
- [x] 確認原始資料 checksum。
- [x] 建立小型測試設定。

## 下一步
- [ ] 執行 baseline 設定並保存 log。
- [ ] 比對表格欄位與樣本數。

## 阻塞與決策
- 尚未確認缺失值處理方式；不得自行選擇。

## 最近驗證
- 命令：...
- 結果：...
```

每次結束前更新事實狀態，不要把未驗證推測寫成已完成。新的對話或另一位協作者讀完規則、任務規格與 progress log，就能知道從哪裡接續。

## 第四步：權限從最小範圍開始

權限應依任務逐步開放：

1. 先允許讀取指定專案。
2. 再允許修改明確的來源或文件路徑。
3. 命令執行只開放必要工具與測試。
4. 網路、安裝套件、刪除、發布與憑證存取分開確認。

規則文字是合作約定；permission 與 sandbox 才是技術邊界。高風險操作不要只寫一句「請小心」，而要讓環境實際要求確認或阻擋。

## 第五步：把完成條件寫成命令與觀察

好的驗證命令應來自專案本身，而不是 Agent 臨時發明。依專案可能包括：

```text
- 執行單元測試或資料驗證測試。
- 用固定小型設定重跑分析。
- 比較產出欄位、筆數、checksum 或已知答案。
- 建置網站後檢查正式路徑與連結。
- 對文件抽查數字、引用與圖表來源。
```

交辦時要求回報實際證據：執行了什麼、exit status、哪些檢查通過、哪些沒有執行，以及剩餘不確定處。不要只接受「已測試」「看起來正常」。

## 一次完整交接

```text
先讀工作區規則、README 與 progress.md，再檢查 Git 狀態。
不要覆蓋既有修改，也不要讀取 data/raw/ 以外未授權路徑。

本次只完成 progress.md 的下一個未完成項目。
動工前回報預計修改檔案與驗證命令；
若缺失值策略仍未決定，停下來問我。

完成後更新 progress.md，列出實際 diff、命令結果與未確認事項。
不要自行發布或推送。
```

這套工作環境的目的不是讓 Agent 永遠不犯錯，而是讓錯誤較容易被限制、看見、回復與追查。
