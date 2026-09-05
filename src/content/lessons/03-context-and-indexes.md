---
title: 讀過之後找得回來：來源表、索引與 Context
summary: 替三篇論文建立來源表與位置索引，回查比較表內容，再留下一份能接續工作的交接便條。
order: 3
part: Context
difficulty: 實作
estimatedMinutes: 28
learningOutcomes:
  - 用來源清單、quick notes 與索引建立可按需擴充的研究資料入口。
  - 區分 preprint、正式出版版本、勘誤與撤稿狀態。
  - 精準取回原文並標記待核主張，區分主 context、總 token、費用與時間。
prerequisites:
  - 能辨認研究資料夾中的原始來源與衍生筆記。
references:
  - title: "Lost in the Middle: How Language Models Use Long Contexts"
    url: https://arxiv.org/abs/2307.03172
    type: paper
    note: 說明在其評估任務中，相關資訊的位置會影響長 context 模型的取用表現。
  - title: "Google NotebookLM"
    url: https://notebooklm.google/
    type: official
    note: 官方入口說明 NotebookLM 可針對使用者提供的來源回答，並以引用連回來源內容。
  - title: "Effective context engineering for AI agents"
    url: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
    type: official
    note: 說明按需取回資料、精簡工具輸出、保存任務筆記與分開 context 的做法及取捨。
  - title: "Crossmark"
    url: https://www.crossref.org/services/crossmark/
    type: standard
    note: 說明如何查看研究輸出的更正、撤稿或其他出版後更新狀態。
keyTerms:
  - Context
  - lost in the middle
  - quick notes
  - 索引
  - 全文文字快取
  - source version
  - NotebookLM
relatedTools:
  - chatgpt
  - notebooklm
  - codex
  - claude-code
relatedCases:
  - document-cache
  - anonymous-manuscript-review
lastVerified: 2026-09-05
draft: false
featured: true
---

## 三篇論文讀過了，下次怎麼找回來

前兩課已準備三份論文，也說清楚要做組會用的資料與方法比較表。接下來很容易遇到一個問題：AI 剛才好像看過那段，換一輪對話卻找不到；你記得某篇有說限制，但忘了在哪一頁。

這一課會在 `notes/sources.md` 建立一份來源筆記，讓你和 AI 下次都能找回原文。步驟是：記下有哪些資料，標出可能相關的位置，再回到原文填寫比較表。

## Context 是這一輪看得到的內容

Context（上下文）包含模型這一輪能看到的指令、對話、檔案內容與工具輸出。對話變長，不代表每段資訊都會被同樣仔細地使用。Liu 等人的長輸入研究發現，相關內容放在不同位置，會影響模型在受測任務中的答題表現。

因此，與其每次重新貼三篇全文，可以把來源及位置留在檔案裡，回答問題時再取回需要的段落。這也讓你有地方檢查：比較表的內容究竟從哪裡來。

## 先在來源表記下三份檔案

在 `notes/sources.md` 中建立下面的表格。D01、D02、D03 沿用前兩課的代號；標題與版本要由你實際使用的論文填入。

| 來源代號 | 原始檔 | 論文標題 | 版本與日期 | 下一步 |
|---|---|---|---|---|
| D01 | papers/D01.pdf | 從首頁填入 | 尚未確認 | 查看出版者頁面 |
| D02 | papers/D02.pdf | 從首頁填入 | 尚未確認 | 查看出版者頁面 |
| D03 | papers/D03.pdf | 從首頁填入 | 尚未確認 | 查看出版者頁面 |

論文可能有預印本（preprint）、已接受但尚未完成出版編排的作者稿（accepted manuscript），以及正式刊登版本（version of record）。不同版本的樣本數、表格或限制可能改過，所以要記錄自己讀的是哪一份。若找到新版，另存檔案並更新對照，保留舊版供回查。

正式引用前，再到出版者頁面確認是否有更正（correction）或撤稿通知（retraction notice）。有些頁面提供 Crossmark 按鈕，可查看出版後更新；沒有按鈕時，也要查看頁面上的相關通知。

## 每篇寫一句提示，再記下值得回查的位置

先寫一至三句簡短筆記，英文常稱 quick notes，幫自己記得這篇為什麼值得讀。以下是寫法示意，不是對某篇真實論文的摘要：

> D01：這篇可能用來說明研究資料如何取得。接著要看資料章節，確認樣本單位與排除條件。

等你找到段落，再把位置放入同一份 `notes/sources.md`。這就是索引：它告訴你要找某個主題時，先去哪裡看。

| 想查什麼 | 來源代號 | 先找的位置 | 目前進度 |
|---|---|---|---|
| 資料從哪裡取得 | D01 | 資料章節，讀取後補頁碼 | 待定位 |
| 方法的輸入與輸出 | D02 | 方法章節，讀取後補頁碼 | 待定位 |
| 作者提到的限制 | D03 | 討論或限制章節，讀取後補頁碼 | 待定位 |

這些列只是待辦示例。實際整理時，三篇都要找資料、方法與限制；不要因為表中只各列一個主題，就以為其餘欄位已經處理。

## 沿著索引，完成比較表的一列

先挑 D01 練習。請 AI 打開資料與方法相關段落，將它們整理成 `notes/comparison.md` 的第一列，再附上 D01 與原文位置。你親手打開 PDF，核對一項資料條件與一項方法說明。

```text
請依 notes/sources.md 找到 papers/D01.pdf 的資料與方法段落。
在 notes/comparison.md 整理資料來源、樣本單位、方法與限制。
每項內容附 D01 及原文頁面；原文沒提供的欄位寫「未提供」。
若目前只是還沒找到，請寫「待查」，不要把它當成原文未提供。
先完成 D01，讓我核對後再整理 D02、D03。
```

「未提供」和「待查」要分開：前者是已檢查相關內容後，仍沒有找到作者交代；後者是這輪還沒完成查找。若 PDF 頁序與頁面印刷頁碼不同，也要說明使用哪一種頁碼，免得下次翻錯位置。

完成 D01 的核對後，再照相同欄位整理另外兩篇。這次練習結束時，你應該拿到一份來源筆記，以及至少一列已回查過的比較內容。

## 文件變多時，再加入文字快取

三篇論文可以直接讀 PDF。等資料變多、需要批次搜尋時，再把 PDF 擷取成文字檔。這種保存在本機、供下次搜尋使用的副本稱為全文文字快取。

快取要記錄原始檔路徑、來源版本、擷取工具與日期。掃描頁可能需要 OCR，也就是把影像上的文字辨識出來；公式、表格與腳註容易辨識錯誤，關鍵內容仍需回到 PDF 查看。原文更新後，也要重新產生相應的快取。

例如你已建立 `cache/D01.txt`，可以請 Agent 搜尋「data」「method」或「limitation」，只回報命中位置前後的段落。會使用命令列的人也可在工作區終端機執行：

```bash
rg -n -i -C 3 'data|method|limitation' cache/D01.txt
```

`rg` 是文字搜尋工具；這裡顯示行號、忽略大小寫，並帶出命中處前後三行。如果沒安裝，直接請 Agent 使用可用的搜尋工具即可。命中結果用來找位置，讀取時仍要留意否定詞、條件與前後文。

若你偏好上傳來源後直接問答，也可試用 [NotebookLM](../../tools/notebooklm/)。先確認材料允許上傳，再沿回答中的引用回看內容。本機索引則方便保留檔案路徑、版本與批次處理紀錄。更多做法見[閱讀工具箱](../../guides/research-skills/#read)。

## 進階延伸：讀得少，是否就花得少

模型使用的文字通常以 token 計量，這是模型處理內容的單位，和中文字數不完全相同。減少不必要的全文讀取，可以讓當前對話比較精簡；是否省錢、是否較快，還要看整項工作。

| 想知道什麼 | 要看哪個紀錄 |
|---|---|
| 當前對話攜帶多少內容 | 主對話的 context 用量 |
| 整項工作用了多少模型處理量 | 所有呼叫、分身與重試的總 token |
| 實際花多少錢 | 使用方案、模型與工具的計費紀錄 |
| 何時拿到可用成果 | 從交辦到檢查完成的時間，包含重做 |

分身可以把不同文件分開處理，回報主對話時只留下重點，但分身也會消耗用量。較低成本模型若經常抽錯欄位，重做與人工檢查也可能抵銷節省的費用。可以先用同一篇論文試做，確認結果可用，再擴大分工。計費細節可查 [Claude Code 成本管理文件](https://code.claude.com/docs/en/costs)。

## 換對話前，留下接手便條

來源表記錄資料在哪裡；交接便條則記錄工作做到哪裡。把下面六項寫進 `HANDOFF.md`，新對話就能從未完成的部分接下去。以下進度仍是教學示意，請依實際核對結果填寫。

```text
目標：為組會比較 D01、D02、D03 使用的資料與方法。
材料：papers/ 中三份 PDF；版本與位置見 notes/sources.md。
已完成：D01 比較列已寫入 notes/comparison.md，資料與方法已回查。
未完成：D02、D03 尚未整理。
已決定：不排名方法；保留原始 PDF；找不到的內容不補猜。
下一步：先整理 D02，用相同欄位，完成後核對原文位置。
```

可直接使用[工作交接便條](../../templates/handoff/)。[下一課](../04-checkpoints-and-tools/)會接著處理工作守則與存檔：讓後續修改有可回復的版本，也讓 Agent 知道哪些約定要持續遵守。
