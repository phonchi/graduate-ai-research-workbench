---
title: 改檔之前先存一版，離開之前留下進度
summary: 繼續整理三篇論文：用 Git 保存筆記版本，把共通規則與當次進度分開，讓下一次能接著做。
order: 4
part: 實作
difficulty: 實作
estimatedMinutes: 28
learningOutcomes:
  - 分清工作區規則、當次任務與交接紀錄各自要寫什麼。
  - 建立 Git 存檔點，查看修改差異，分清本機提交與對外推送。
  - 留下已完成項目、待確認問題與下一步，並限制 Agent 的工作範圍。
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
  - 工作區
  - AGENTS.md
  - CLAUDE.md
  - Git 存檔點
  - 交接紀錄
  - 檔案權限
  - 差異檢查
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

## 比較表還要改，先把目前這版留下來

前一課把三篇論文放進 `papers/`，用 `notes/sources.md` 記下每篇的檔名與來源。現在你準備修改 `notes/comparison.md`：補上漏掉的樣本數，修正不清楚的方法描述。

先保存目前版本。這樣改完後，你能看到哪些句子被動過；若改壞，也有先前的內容可參考。這份資料夾可以保持很簡單：

```text
research-project/
├── papers/
│   ├── D01.pdf
│   ├── D02.pdf
│   └── D03.pdf
├── notes/
│   ├── sources.md
│   └── comparison.md
├── AGENTS.md          # 使用 Codex 時的共通規則
└── HANDOFF.md         # 離開前留下的進度
```

使用 Claude Code 時，對應的規則檔是 `CLAUDE.md`。已有其他資料夾慣例也可以沿用，不必為了這個範例重排整個專案。

## 用 Git 建立本機存檔點

Git 會記錄你選擇保存的檔案版本。一次保存叫作 **commit（提交）**，這一課把它稱為存檔點。GitHub 則是放置遠端專案的平台；你可以先在本機用 Git，之後需要協作時再連到 GitHub。

若資料夾已使用 Git，在其中執行 `git status`，就能看到目前哪些檔案有變動。若顯示「not a git repository」，表示目前位置不在 Git 專案裡：先確認自己進入的是正確資料夾；若這確實是你新建的練習資料夾，再執行一次 `git init`。不熟命令列時，也可以使用 GitHub Desktop 建立本機儲存庫。

以下命令假設兩份筆記已存在。先看差異，再只選這兩份筆記保存：

```bash
git status
git diff -- notes/sources.md notes/comparison.md
git add notes/sources.md notes/comparison.md
git diff --cached
git commit -m "Save first literature comparison"
```

`git diff` 顯示已追蹤檔案的未提交修改；新檔案要直接打開來看。`git add` 選擇這次要保存的檔案，`git diff --cached` 則讓你在提交前再看一次所選內容。第一次提交若要求姓名與電子郵件，依 Git 提示設定自己願意記錄在版本歷史中的署名資訊。

這裡只保存筆記，沒有把 `papers/` 的 PDF 加入版本歷史。下載的論文、未公開材料與登入憑證，要分別確認能否保存與分享。Git 也只保存你提交的內容，未追蹤的檔案不會自動得到保護。

如果已有你或同學尚未提交的修改，先弄清楚用途，保留在原處。不要為了取得「乾淨狀態」刪掉它們，也不要全部收進這次提交。

## 把每次都適用的要求寫成短規則

你可能已反覆交代：「原文不要改」「尚未查完就標記待查」「關鍵內容附來源」。這些可以放進 `AGENTS.md` 或 `CLAUDE.md`，下次不用重新說一次：

```markdown
# 論文整理慣例

- papers/ 的原始檔案僅供讀取，不改寫。
- 筆記寫在 notes/，每篇論文沿用 sources.md 的編號。
- 數字與方法描述附檔名、章節或頁碼；尚未查完寫「待查」，確認原文未交代才寫「未提供」。
- 新增比較來源或更改比較欄位前，先說明原因並取得我的決定。
```

「這次只補 D02 的樣本數」仍放在當次交辦。「D03 的兩個數字還沒釐清」則留在進度紀錄。共通規則一旦塞入這些暫時狀態，很快就會過期。

規則檔的讀取範圍依工具而異；初次使用可請 Agent 指出它讀到了哪一份。規則也不能代替工具權限設定：只開放這次需要的資料夾，若本次只需閱讀，就使用工具提供的唯讀設定。

## 改完後，看它實際改了什麼

有了存檔點，就能交辦這次的小修改：

```text
先讀工作區規則和 notes/sources.md。
只補 notes/comparison.md 中 D02 的受試者數與影像數，
來源限 papers/D02.pdf，每個數字附章節或頁碼。
尚未查完寫「待查」，確認原文未交代才寫「未提供」。
完成後列出修改位置和回查的來源。
```

Agent 完成後，重新執行 `git diff -- notes/comparison.md`，檢查它有沒有順便改掉其他列，再打開 `papers/D02.pdf` 對照數字及其意義。差異檢查告訴你「改了什麼」，原文核對才能回答「改得對不對」。

如果任務是分析程式，則依專案已有的測試方式，重跑一小份已知資料；若是網站，建置後還要打開頁面確認。回報應說明實際做過的檢查及未完成之處。

確認內容後，可以再提交這次修改。**commit 保存在本機；push 會把提交傳到已設定的遠端位置。** 後者可能讓合作者讀到內容，也可能觸發網站更新。發布前要另外確認目的地、可見範圍與待傳送檔案，不能把「筆記改好了」當成發布授權。

## 離開前，把下一步留在 HANDOFF.md

下一次對話不一定記得這次過程。留下幾句能接著工作的紀錄，比保存整段聊天更容易使用：

```markdown
# 三篇論文比較進度

已完成：D01、D02 的比較列已回查原文，位置記在 notes/comparison.md。
待確認：D03 摘要與方法段的受試者數不同，目前保留兩值與來源位置。
下一步：讀 papers/D03.pdf 的補充說明，查明兩值的定義；不要自行選一值。
相關檔案：notes/sources.md、notes/comparison.md。
```

以上是假設進度，實作時要換成你真的完成的事。重新開始時，請 Agent 先讀規則、來源目錄與 `HANDOFF.md`，再從下一步接續。需要完整範本可看[工作區規則](../../templates/workspace-rules/)與[Git 存檔及發布](../../templates/git-checkpoint-release/)；資料能不能交給工具，則查[研究安全與責任](../../safety/)。

完整的收尾與接手練習在[第 7 課](../07-reproducible-research/)，也可以直接使用[交接便條](../../templates/handoff/)。
