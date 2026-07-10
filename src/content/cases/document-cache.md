---
title: 先給目錄，再讀真正需要的文件
summary: 把論文、研究簡報與技術文件做成摘要、索引、全文三層快取，避免每次把整座資料庫塞進對話。
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

[`examples/synthetic-corpus`](https://github.com/phonchi/graduate-ai-research-workbench/tree/main/examples/synthetic-corpus) 收錄四份合成來源與可程式解析的 `index.json`。Quick notes 先說每份文件是什麼，索引幫你定位關鍵字，真的要引用時才開全文並回查原始來源。

## 當時怎麼交辦

> 先盤點這個資料夾的 PDF、DOCX 與研究簡報，為每份文件建立一句 quick note 和可搜尋索引。平常只查摘要與索引；需要回答或引用時，再打開少數相關全文。擷取失敗要列出來，不要默默略過。動工前先問我哪些資料可處理、哪些只能留在本機。

不想先建本地流程時，也可以一門研究主題建立一個 NotebookLM 筆記本，讓它根據上傳來源回答；要批次改檔、生成成果或部署網站，再交給 Agent。

## 輸入、動作、輸出與驗證

- **輸入**：四份 repo-local 合成來源；不需要真實論文、審稿文件或個資。
- **動作**：為每份來源建立 quick note，抽取可搜尋文字並產生含穩定路徑的索引。
- **輸出**：來源清單、`index.json`、全文快取與擷取失敗紀錄。
- **驗證**：確認索引中的每條路徑存在；抽查查詢結果能回到來源；來源更新後重建並比較索引差異。

## 踩坑提醒

- 快取是目錄，不是權威原文；正式引用與關鍵數字仍要回原檔。
- 掃描 PDF、表格、公式與腳註可能擷取錯誤，不能把「有文字輸出」當成成功。
- 原始檔更新後要重建索引，否則對話可能引用舊版本。
