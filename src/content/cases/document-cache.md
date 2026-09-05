---
title: 先給目錄，再讀真正需要的文件
summary: 用四份合成文件示範如何自動建立來源目錄，先查簡介與路徑，再打開需要的原文。
order: 50
part: 封裝
difficulty: 實作
category: 可重跑示範
reproducible: true
relatedTools:
  - notebooklm
  - codex
  - claude-code
  - skill
graduateTransfer:
  - 為論文、研究簡報與技術文件建立可重複查詢的本地索引。
  - 用 NotebookLM 先做零門檻的來源式問答，再把需要動檔的流程交給 Agent。
lastVerified: 2026-07-10
draft: false
sourceLicense: 本站自行建立的四份合成語料、索引與案例預覽採 CC BY 4.0；真實文件仍須由使用者確認研究倫理、契約與著作權授權。
privacyReview: 範例索引不含真實受試者、未公開論文、審稿文件、帳號資訊或可回推個人的檔名與中繼資料。
coverImage: /images/cases/document-cache.webp
---

## 文件變多時，先問哪一份值得打開

三篇論文可以用 `notes/sources.md` 手動記錄。當文件越來越多，你也可以用程式維護同樣的目錄：每份文件有固定編號、路徑與一句簡介，Agent 先查目錄，再打開需要的原文。

[`examples/synthetic-corpus`](https://github.com/phonchi/graduate-ai-research-workbench/tree/main/examples/synthetic-corpus) 是這個做法的小型示範。它提供四份合成文件與一份來源清單，執行後產生 `index.json`。例如想查方法，就先找到方法筆記的路徑，不必每次重讀全部文件。

這個範例會整理既有清單，沒有示範從任意 PDF 自動抽出所有文字。若現在只想針對幾份材料提問，可以先用 [NotebookLM](../../tools/notebooklm/)；需要自己管理本機檔案與版本時，再試下面的程式。

## 交辦時，把來源和成果說清楚

```text
只整理來源清單明列的四份文件。
先確認檔案存在且版本符合清單，再依固定編號建立目錄。
把結果寫入 index.json，不修改原文。
若有文件不符合清單，保留上一版目錄，說明是哪一份出了問題。
```

這裡的來源清單叫 `source-manifest.json`。Manifest 就是用來記錄一組檔案資訊的清單；範例列出每份文件的編號、路徑、類型、授權、簡介與檔案雜湊。雜湊可以用來比對檔案內容是否改變，本例使用 SHA-256。

## 跑一次，看看目錄長什麼樣

從專案根目錄進入範例資料夾，在已安裝 Node.js 的環境執行：

```bash
cd examples/synthetic-corpus
node build-index.mjs
cmp index.json expected-index.json
```

第一個命令產生目錄，第二個命令將結果與已保存的預期版本逐位元組比較。`cmp` 沒有印出差異且成功結束，代表兩份內容相同；沒有這個命令的環境，也能使用檔案比較工具。

打開 `index.json`，你會看見四筆記錄。每筆的 `quickNote` 是來源清單已提供的簡介，並非這次由模型重新摘要。需要正式引用時，仍沿 `path` 回到原始文件。

## 想了解程式如何保護來源，再看這裡

產生器只使用 Node.js 內建功能，不必另裝套件。來源清單中的 `id`、`path`、`kind`、`license`、`quickNote` 與 `sha256`，分別對應固定編號、路徑、類型、授權、簡介與內容校驗值。

程式先確認路徑沒有離開範例資料夾，並逐一比對原始檔的位元組。全部通過後，依固定編號排序，因此相同來源和清單會得到相同的 `index.json`。寫入時先完成同一資料夾中的唯一暫存檔，最後才用重新命名取代舊目錄，避免把半份結果當成完成品。程式不接受其他輸出路徑，也不改寫原文。

若雜湊不符、路徑越界、額外指定輸出位置，或暫存檔完成後中斷，上一版目錄及來源都應保持原樣，也不應殘留暫存檔。這些失敗情境記在 `failure-log.md`。

從專案根目錄可執行完整檢查：

```bash
npm test -- src/lib/document-cache-reproducibility.test.ts
```

測試在暫存副本裡重建，逐筆重算雜湊、模擬替換前中斷，並確認專案原有目錄的內容與修改時間不變。

## 用到自己的文件時

先維護正確的來源清單，文件更新後也要更新相應記錄並重建目錄。若之後加入 PDF 文字擷取，另外抽查表格、公式、腳註與掃描頁；產生了文字檔，還不表示內容都讀對了。
