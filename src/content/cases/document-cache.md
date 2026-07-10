---
title: 先給目錄，再讀真正需要的文件
summary: 用明確 source manifest、可驗證 hash 與 deterministic index 建立可回查、可重建的本地文件快取。
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
coverImage: /graduate-ai-research-workbench/images/cases/document-cache.webp
---

## 成果先看

[`examples/synthetic-corpus`](https://github.com/phonchi/graduate-ai-research-workbench/tree/main/examples/synthetic-corpus) 收錄四份合成來源、含 SHA-256 的 `source-manifest.json`、零相依 builder 與 committed expected fixture。Quick notes 放在結構化 manifest；重建時不靠檔名猜測或脆弱的 HTML regex，真的要引用時仍回查原始來源。

## 當時怎麼交辦

> 只處理 `source-manifest.json` 明列的來源；先驗證路徑與 SHA-256，再依 stable ID 產生 deterministic `index.json`。不要掃描未列入的檔案、覆寫 raw source 或把輸出寫到 corpus 外。失敗要保留上一版 index 並記錄原因。

不想先建本地流程時，也可以一門研究主題建立一個 NotebookLM 筆記本，讓它根據上傳來源回答；要批次改檔、生成成果或部署網站，再交給 Agent。

## 輸入、動作、輸出與驗證

- **輸入**：`source-manifest.json` 與四份 repo-local 合成來源。Manifest 明列 stable ID、path、kind、license、quick note 與來源 SHA-256。
- **動作**：在 `examples/synthetic-corpus` 執行 `node build-index.mjs`。程式先確認來源存在且沒有逃出 corpus，再核對 bytes；全部通過後才排序並寫入固定的 `index.json`。
- **輸出**：deterministic `index.json`、`expected-index.json` 與 `failure-log.md`。Builder 不接受其他 output path，也不覆寫 raw source。
- **驗證**：執行 `cmp index.json expected-index.json`，再於 repo 根目錄執行 `npm test -- src/lib/document-cache-reproducibility.test.ts`；測試會重建兩次、逐筆重算 hash，並確認原始來源 bytes 不變。

## Expected 與失敗紀錄

成功時，重建的 `index.json` 必須與 committed `expected-index.json` byte-for-byte 相同。來源 hash 不符、路徑越界或傳入額外 output 參數時，命令必須非零結束，且不得改動上一版 index 或任何來源；可重現的失敗案例與錯誤文字記在 `failure-log.md`。

## 踩坑提醒

- 快取是目錄，不是權威原文；正式引用與關鍵數字仍要回原檔。
- 掃描 PDF、表格、公式與腳註可能擷取錯誤，不能把「有文字輸出」當成成功。
- 原始檔更新後要重建索引，否則對話可能引用舊版本。
