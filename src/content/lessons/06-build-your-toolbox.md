---
title: 從成功一次到穩定重跑：Skill 的生命週期
summary: 先手動跑順、收集真實失敗，再拆分 instructions、scripts 與 references，經過盲測與版本審查後才成為可複用手冊。
order: 6
part: 封裝
difficulty: 進階
estimatedMinutes: 25
learningOutcomes:
  - 判斷一個研究流程是否已成熟到適合封裝成 Skill。
  - 將流程拆成 instructions、scripts 與 references，並保留清楚的觸發邊界。
  - 用第二個任務盲測、版本紀錄與定期審查控制 skill rot。
prerequisites:
  - 03-context-and-indexes
  - 05-challenge-and-review
references:
  - title: Agent Skills Specification
    url: https://agentskills.io/specification
    type: standard
    note: Agent Skills 的公開規格，定義 SKILL.md、scripts、references、assets 與漸進式載入。
  - title: Extend Claude with skills
    url: https://code.claude.com/docs/en/skills
    type: official
    note: Claude Code 官方文件，說明 skill 觸發、支援檔案、隔離執行與除錯方式。
  - title: Build skills
    url: https://developers.openai.com/codex/skills
    type: official
    note: OpenAI 官方 Skill 指南，強調單一工作、明確輸入輸出、確定性腳本與觸發測試。
keyTerms:
  - Skill
  - blind test
  - scripts
  - references
  - skill rot
  - 版本管理
relatedTools:
  - codex
  - claude-code
  - skill
  - subagent
  - mcp
  - agents-md
  - claude-md
relatedCases:
  - programmatic-slides
  - document-cache
  - anonymous-manuscript-review
lastVerified: 2026-07-10
draft: false
featured: false
---

## 先問：這個流程值得封裝嗎？

Skill 不是一份寫得很長的 prompt，也不是第一次做新任務時的需求清單。它是已經做過、知道會在哪裡失敗，而且下次還會再做的工作手冊。

本站先看這些條件：

- 是否已有一個真實案例從頭到尾跑順，並留下輸入、決策與完成證據？
- 是否能換一批不同輸入做盲測，而不是只重播原案例？
- 重複判斷與錯誤是否能轉成明確規則、固定腳本或人工檢查點？

「一個跑順案例，再用不同輸入盲測」是本站為避免太早封裝而採用的起步門檻，不是 Agent Skills 規格、Codex 或 Claude Code 的官方成功次數規則。

只做一次、仍在探索研究問題，或每次都需要指導者重新決定的方法，不要急著封裝。保留當次紀錄即可。

## 生命週期一：跑順一個真實案例

先在真實案例中完成整條流程，保留：

- 原始交辦與必要輸入。
- Agent 曾經問過的關鍵問題。
- 使用的命令、工具與人工決策。
- 失敗點、修正方式與完成證據。

不要從想像中的完美流程開始。這個案例用來提供手冊素材；能否泛化，留到後面的不同輸入盲測判斷。

## 生命週期二：把內容放到正確位置

Agent Skills 規格以 `SKILL.md` 為必要入口，並允許按需使用其他資源。研究流程可以拆成三層：

```text
literature-evidence-audit/
  SKILL.md
  scripts/
    check_citation_keys.sh
  references/
    lab-terminology.md
    output-example.md
```

**instructions** 放需要 Agent 判斷的目標、順序、停止條件與回報格式。**scripts** 放可確定執行的解析、計數、比對與格式檢查。**references** 放術語表、格式範例、詳細規範與少用的例外。

`SKILL.md` 應像地圖：說明何時使用、需要哪些輸入、去讀哪份參考、要跑哪個檢查、何時停下來問人。不要把整個知識庫複製進主文件。

## 生命週期三：寫清楚觸發與禁用邊界

名稱告訴人這是什麼；description 則要同時寫「做什麼」與「何時使用」。例如：

```yaml
name: literature-evidence-audit
description: Use when checking whether manuscript claims, numbers, and citations can be traced to an approved local source set.
```

接著補一段「不要使用」：第一次探索主題、來源集合尚未核准、需要重新判斷研究設計時，不應自動套用這份 Skill。觸發太寬會把不相干任務硬塞進舊流程；觸發太窄則永遠想不起來使用。

## 生命週期四：用不同輸入盲測

不要拿建立 Skill 的原任務當唯一測試。準備另一批小型、無敏感資料的輸入，只提供正常使用者會給的需求，不提示預期觸發詞或內部步驟。

盲測可先看：

- 該觸發時是否會觸發，不該觸發時是否保持安靜。
- 缺少必要輸入時是否先詢問，而不是自行補猜。
- 腳本失敗是否回報 exit code 與未完成項目。
- references 是否只在需要時讀取，且輸出能回到來源。
- QA 是否抓得到原案例遇過的真實錯誤。

Codex 官方指南也建議用 prompts 測試 description 的觸發行為；Claude Code 文件則提供觸發過少、過多與 metadata 錯誤的除錯方向。這些是平台實作例子，盲測原則本身不依賴特定產品。

## 生命週期五：版本化並清理 skill rot

Skill 會隨資料格式、工具、模型與實驗室慣例變動。每次修改記錄：改了什麼、因哪個失敗案例而改、用哪些盲測驗證。保留一小組固定測試，避免修好新案例卻弄壞舊流程。

定期檢查以下退化訊號：

- 同一規則在多處重複或互相衝突。
- 路徑、命令、欄位或官方介面已失效。
- description 太寬，開始誤觸不相關任務。
- references 變成無法定位原始來源的摘要堆。
- 新增的補丁只處理單一案例，卻提高其他任務失敗率。

遇到這些情況，先縮小範圍、刪除過期規則並重跑盲測；不要讓 Skill 自動改寫自己後直接投入正式研究。

## 五個概念不要混在一起

| 概念 | 解決的問題 |
|---|---|
| 專案規則 | 這個工作區每次都必須遵守什麼 |
| Skill | 遇到某類任務時，依哪份可測試手冊執行 |
| subagent | 這一次工作要不要拆到獨立 context |
| MCP | 如何連接外部資料或工具 |
| plugin | 如何把一組能力與設定打包、安裝或分發 |

一個流程可以同時用到它們，但不需要為了「完整」全部加入。先從一份能盲測的 Skill 開始；只有固定外部連接需求才評估 MCP，需要獨立搜尋或複核才拆 subagent，需要整包分發時才考慮 plugin。

## 實驗室驗收卡

```text
已有一個跑順的真實案例：是／否
收錄的真實失敗案例：
instructions／scripts／references 分工：
不同輸入盲測與不應觸發任務：
客觀檢查與人工檢查：
停止條件：
版本與下次審查日期：
```

只有當另一位成員能在不閱讀原始長對話的情況下完成盲測，這份 Skill 才算可交接。

## 一句帶走

**先跑順一個真實案例並留下證據，再用不同輸入盲測；通過後才把流程當成可複用 Skill，並持續處理 skill rot。**
