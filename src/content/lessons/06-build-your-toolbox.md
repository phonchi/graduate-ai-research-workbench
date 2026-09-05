---
title: 把做過的事整理成下次能用的 Skill
summary: 從三篇論文的整理經驗寫出一份工作手冊，再換材料試用；也學會什麼時候直接選用現成 Skill。
order: 6
part: 封裝
difficulty: 進階
estimatedMinutes: 25
learningOutcomes:
  - 分清選用現成 Skill 與自行封裝，判斷研究流程何時適合整理成手冊。
  - 將操作說明、固定腳本與參考材料分開，寫清楚何時使用。
  - 換一批材料試用初稿，再依結果修訂和保留修改紀錄。
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
  - 換材料試用
  - scripts
  - references
  - 手冊維護
  - 版本管理
relatedTools:
  - codex
  - claude-code
  - skill
  - subagent
  - mcp
  - hook
  - agents-md
  - claude-md
relatedCases:
  - programmatic-slides
  - document-cache
  - anonymous-manuscript-review
lastVerified: 2026-09-05
draft: false
featured: false
---

## 同樣的論文比較，下次還要從頭交代嗎？

前幾課已完成三篇論文的比較。你現在知道要先確認來源、把人數和影像數分開、缺值照實保留，遇到矛盾時記下兩處原文。若下個研究題目還會用到這套做法，就可以把它整理成 **Skill**：給 Agent 依任務選讀的工作手冊。

Skill 可以附上範例與程式，但最初只要一份清楚的 `SKILL.md`。你也可以從第一次任務就選用別人整理好的 Skill，先看用途、需要的材料與工具，再用小份材料試用。找現成工具可從[研究技能指南](../../guides/research-skills/)開始；只有想保存自己的做法時，才需要往下寫手冊。

## 先做完一次，再整理初稿

拿出這次的交辦、`notes/sources.md`、`notes/comparison.md` 與 `HANDOFF.md`。從裡面挑出下一批論文仍適用的步驟：先認清每篇來源，再擷取資訊，最後回查數字。D03 的特定數值則留在案例裡，不寫成所有論文都要遵守的規則。

如果每次都還在改研究問題，先保留當次筆記就好。值得整理的內容，是你已做過、下次也可能再做的部分。

以下是這份手冊的起稿範例。開頭的 `name` 是名稱，`description` 說明它做什麼、何時該用；後面才是具體步驟。

```markdown
---
name: compare-paper-methods
description: 在已有指定論文與比較欄位時，整理方法比較表，並回查數字與來源位置。
---

# 方法比較

讀取本次提供的來源目錄，確認論文編號、檔名與版本。
依本次指定欄位擷取資料，每項附檔名、章節或頁碼。
不同計數單位分開記錄；尚未查完寫「待查」，
核對相關內容後確認未交代，才寫「未提供」。
來源互相矛盾時，同時保留兩處內容，交由使用者釐清。
完成後逐列回查原文，將比較表存到指定位置。

這份手冊適合整理已選定的論文。
要搜尋新文獻、決定研究問題或判斷方法優劣時，另外交辦。
```

這次使用時，才指定來源目錄是 `notes/sources.md`，輸出是 `notes/comparison.md`。把檔案位置和比較欄位留給當次任務，手冊才能換到另一份研究材料。

## 內容變多時，再拆開放

如果後來累積了範例、術語或程式，可以拆成：

```text
compare-paper-methods/
├── SKILL.md
├── references/
│   └── comparison-example.md
└── scripts/
    └── check_columns.py
```

`SKILL.md` 保留操作說明；`references/` 放需要時才看的比較表範例與術語；`scripts/` 放固定檢查，例如確認每篇都有一列、必要欄位沒有消失。上面的腳本是未來可加入的示意，不是這份教材已提供的命令。沒有重複的程式工作，就不必先建立腳本。

主文件要告訴 Agent 何時讀哪份參考、何時執行哪個檢查，避免它每次把全部材料讀進對話。安裝位置與啟用方式依所用工具而定，可參考 [Agent Skills 規格](https://agentskills.io/specification)及自己的工具文件。

## 換一批材料，看看手冊能不能用

初稿寫好後，找另一批小型、可分享的材料，讓新的對話或同學只拿手冊與任務要求來做。這次不要沿途提醒內部步驟，看看哪裡真的需要補充。

例如新材料缺少受試者數時，是否仍能保留「未提供」？相同數字出現在不同段落時，是否看清楚單位？只要求改寫一段文章時，是否會誤套論文比較流程？再把前一課保留的三種測試材料拿來比對，確認沒有把已修好的錯誤帶回來。

這就是用不同輸入試用手冊。若失敗，先找原因：描述太廣、步驟漏了，還是參考範例讓它誤以為每篇都有相同欄位？修訂後重試受影響的案例，不必為每次小改建立一整套審查程序。

## 修訂後，讓別人也能接手

把有效修改和理由一起保存，例如「新增計數單位提醒，避免把影像數當成人數」。資料格式或工具改變時，檢查舊命令和參考是否還能用；過期規則可以刪掉，不必一直往後追加例外。

整個順序是：**完成一次任務→整理手冊初稿→換材料試用→依結果修訂**。同學若不用重讀原始長對話，也能依手冊完成任務，才比較適合在研究室共用。

## Skill 和其他功能怎麼搭配？

這次比較論文時，你可能同時遇到幾個名稱。用各自負責的事情來分，就不容易混淆：

| 名稱 | 在這個例子裡負責什麼 |
|---|---|
| 專案規則 | 每次都保護原文、沿用來源編號 |
| Skill | 說明論文比較的步驟與注意事項 |
| Subagent | 把一部分擷取或獨立複核交給另一個工作分身 |
| Hook | 指定事件發生時執行動作，例如完成後通知你 |
| MCP | 讓 Agent 接上外部筆記或資料服務 |
| Plugin | 將技能與其他功能包在一起，方便安裝或分享 |

只需比較三篇論文時，一份清楚的交辦就能開始。等到反覆交代同一流程，再選用或整理 Skill；等待長任務時想收到通知，可看 [Hook](../../tools/hook/)；需要分工時，再看 [Subagent](../../tools/subagent/)。
