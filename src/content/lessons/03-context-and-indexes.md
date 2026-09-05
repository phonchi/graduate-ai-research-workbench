---
title: 先定位再細讀：Context、索引與來源版本
summary: 先用 quick notes 與索引定位，再按需讀原文、核對版本；分清主對話長度、總 token、費用與等待時間，減少無效讀取。
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

## 為什麼不能只把資料全部塞進對話

Context 是模型這一輪可見的指令、對話與資料，不是可靠的永久記憶。Liu 等人的研究在多文件問答與 key-value retrieval 任務中發現：只改變相關資訊在長輸入中的位置，就可能明顯改變表現；資訊位於中間時常比位於開頭或結尾更難取用。這項結果不代表所有新模型都有相同比例，但足以否定「放得進去就一定用得到」的假設。

研究工作需要的不是一次載入所有全文，而是建立一條可追蹤路徑：**先知道有哪些來源，再定位候選位置，最後才讀原文並核對版本。**

## 本站建議的起步順序

不需要先建複雜資料庫。多數任務先做好「盤點來源、建立定位入口、回原文核對」就能開始；全文快取只在需要批次搜尋時加入。

### 起步一：盤點原始來源

先為每份來源配置穩定 ID，不要用「最新版」「那篇藍色封面」等暫時名稱。

```markdown
| ID | 檔名／DOI | 類型 | 版本日期 | 狀態 | 存取限制 |
|---|---|---|---|---|---|
| D01 | ... | preprint | ... | 待查正式版 | 公開 |
```

「狀態」至少能表示 preprint、accepted manuscript、version of record、correction、retraction notice 或無法確認。不要覆蓋舊版本；版本差異本身可能影響研究判讀。

### 起步二：用 quick notes 與索引定位

每份文件只寫一至三句：它是什麼、與哪個問題最相關、目前有哪些不確定處。Quick note 是路標，不是可直接引用的權威文字。

```markdown
- D01：提出某種 domain adaptation 方法；可能與資料偏移假設相關。
  尚未核對正式出版版本與限制段落。
```

接著把需要反覆查找的主題放進可搜尋索引。索引記錄「哪個主題可能在哪裡」，並保留穩定定位資訊：來源 ID、章節、頁面或段落標記、擷取狀態與版本。

```markdown
| 主題 | 來源 ID | 位置 | 擷取狀態 | 備註 |
|---|---|---|---|---|
| domain shift 假設 | D01 | Methods / Assumptions | 已擷取 | 需回原文 |
```

### 按需加入全文文字快取

只有在需要程式搜尋時才抽取全文。快取應保留來源 ID、原始路徑、擷取工具、日期與失敗紀錄。掃描檔、公式、表格、圖說與腳註容易擷取錯誤，所以「有文字檔」不等於「擷取正確」。

原始檔是權威來源，全文快取只是可搜尋衍生物。原始檔更新時，舊快取要能被辨認並重建。

### 起步三：取回原文並回查

回答問題時先搜尋 quick notes 與索引，選出少量候選段落，再打開原文。回報時區分：

- **已核對**：已回到指定版本的原文位置。
- **待核**：只在摘要、快取或 AI 回答中出現。
- **版本衝突**：preprint 與正式版本不同，或另有 correction。
- **無法定位**：目前材料不足，不應補猜。

## 省 token，先減少不必要的讀取

需要查三篇論文的限制時，先讀索引中的來源 ID、版本與章節，再搜尋候選段落。不要每次都把整個資料夾載入對話。Anthropic 的 context 工程指南也採用這種按需取回資料的方式；讀得少的前提，是仍保留足以判斷的上下文。

本地有文字快取時，可以先限定檔案與關鍵詞，再閱讀命中位置的前後文。下例的路徑只是示意：

```bash
rg -n -i -C 3 'limitation|assumption|domain shift' cache/D01.txt cache/D03.txt
```

命中句子只是候選證據；指代、否定詞、表格註解與研究條件仍需回到原文確認。文獻整理與寫作查證可以接著看[閱讀技能](../../guides/research-skills/#read)及[寫作技能](../../guides/research-skills/#write)。

工具輸出很長時，完整紀錄留在工作目錄，對話只帶摘要與必要片段。截短後至少保留命令、結束狀態、失敗項目、錯誤訊息、完整紀錄位置，以及「這是節錄」的標示。只留下成功筆數，會讓下一輪誤以為所有文件都已處理。錯誤還沒定位前，也不要只憑最後幾行 log 判斷原因。

### 四種成本分開看

| 想改善什麼 | 應觀察什麼 | 不能直接推論什麼 |
|---|---|---|
| 主 context 長度 | 主對話當下需要攜帶的內容 | 子 Agent 回報很短，不代表整項工作少用 token |
| 總 token | 所有呼叫、子 Agent 與重試累計的輸入輸出用量 | 輸出字少，不代表背景讀取也少 |
| 費用 | 實際方案、模型、快取與工具使用的計費紀錄 | 少一半 token，不保證少一半費用 |
| 等待時間 | 從交辦到通過驗收的實際耗時 | 平行執行較快，不保證總用量較低 |

以 Claude Code 為例，官方[成本管理文件](https://code.claude.com/docs/en/costs)分開說明 token、快取、API 用量與訂閱額度，也提醒多 Agent 各自消耗用量。介面上的估算金額不一定就是帳單；比較時要採用相同計費方式，並保留整項任務的紀錄。

本站建議把研究設計、歧義判斷與重要驗證交給在這類任務上表現較好的模型；輸入、格式、完成條件都清楚的工作，再試用較低成本模型。例如先確定抽取欄位與判定標準，才分派各篇文件的欄位抽取，最後回查原文。可重現的計數或格式轉換，優先交給一般程式。

這種分工能否省錢，要連同重試與人工核對成本一起測量。換模型前，用同一組小型評估案例比較通過率、總用量與耗時；若返工變多，就縮小它的任務或換回原模型。不要只按模型名稱認定能力，也不必把會變動的即時價格寫進長期工作守則。

## 來源版本檢查清單

引用前逐項檢查：

- [ ] 標題、作者與 DOI 是否一致，還是同名的不同稿？
- [ ] 目前拿到的是 preprint、accepted manuscript，還是 version of record？
- [ ] 正式版是否改動方法、樣本數、表格、限制或結論？
- [ ] 出版者頁面或 Crossmark 是否列出 correction、expression of concern、withdrawal 或 retraction？
- [ ] 本地快取是否記錄版本日期與原始檔位置？
- [ ] AI 提供的引用是否真的指向支持該主張的原文，而不只是相關文件？

Crossmark 能提高出版後更新的可見性，但其存在本身不是內容正確的保證；沒有 Crossmark 也不代表沒有更新。仍需查看出版者頁面與正式通知。

## NotebookLM 與本地索引怎麼選

NotebookLM 適合把一組邊界清楚、允許上傳的來源放入筆記本，先做來源式問答並沿引用回看內容。引用是定位入口，不是研究者免除核對責任的證明。

本地索引適合受限制資料、需要版本控制、批次擷取或要與程式流程整合的情境。兩者可以接力：先用少量公開來源熟悉問題，再於受控工作區建立可重跑索引。

## 階段結束時建立 checkpoint

長對話累積舊假設後，另開乾淨對話並帶入短 checkpoint：

```text
研究問題：比較 A、B、C 三種方法的共同假設。
權威來源：index.md 中 D01、D03、D07 的指定版本。
本輪範圍：只核對 Methods 與 Limitations。
已確認：D01 有正式版；D03 只有 preprint。
待確認：D07 是否有 correction。
輸出：每項主張附來源 ID 與原文位置；無法核對就標記待核。
已決定事項：只比較共同假設，不排名方法，也不新增來源。
下一步：查 D07 的出版者頁面，再核對三份來源的限制段落。
驗收條件：每列均有來源 ID、版本與位置；版本衝突不得省略。
完整證據位置：原始檔路徑見 index.md；核對紀錄見 evidence/claims.md。
```

這張便條保存的是任務狀態與來源邊界，不是要求模型重現完整推理歷史。
