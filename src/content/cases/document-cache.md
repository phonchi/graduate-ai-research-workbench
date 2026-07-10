---
title: 先給目錄，再讀真正需要的文件
summary: 把論文、投影片與技術文件做成摘要、索引、全文三層快取，避免每次把整座資料庫塞進對話。
order: 50
part: 封裝
difficulty: 實作
slideRefs:
  - 14
  - 15
  - 16
  - 31
relatedTools:
  - notebooklm
  - codex
  - claude-code
  - skill
graduateTransfer:
  - 為論文、投影片與技術文件建立可重複查詢的本地索引。
  - 用 NotebookLM 先做零門檻的來源式問答，再把需要動檔的流程交給 Agent。
lastVerified: 2026-07-10
draft: false
sourceLicense: 本站自行建立的四份合成語料、索引與案例預覽採 CC BY 4.0；真實文件仍須由使用者確認研究倫理、契約與著作權授權。
privacyReview: 範例索引不含真實受試者、未公開論文、審稿文件、帳號資訊或可回推個人的檔名與中繼資料。
coverImage: /graduate-ai-research-workbench/images/cases/document-cache.webp
---

## 成果先看

[`examples/synthetic-corpus`](https://github.com/phonchi/graduate-ai-research-workbench/tree/main/examples/synthetic-corpus) 收錄四份合成來源與可程式解析的 `index.json`。這就是投影片所說的三層做法：quick notes 先說每份文件是什麼，索引幫你定位關鍵字，真的要引用時才開全文。

## 當時怎麼交辦

> 先盤點這個資料夾的 PDF、DOCX 與簡報，為每份文件建立一句 quick note 和可搜尋索引。平常只查摘要與索引；需要回答或引用時，再打開少數相關全文。擷取失敗要列出來，不要默默略過。動工前先問我哪些資料可處理、哪些只能留在本機。

不想先建本地流程時，也可以一門研究主題建立一個 NotebookLM 筆記本，讓它根據上傳來源回答；要批次改檔、生成成果或部署網站，再交給 Agent。

## 研究生可以怎麼轉用

- 將研究資料夾中的論文、實驗室投影片與軟體文件做成可重複搜尋的索引，先定位再精讀。
- 口試準備時，用 NotebookLM 查「這個定義在哪份簡報」或「哪些來源討論這個限制」，再回原文確認。
- 把成熟的擷取與索引流程封裝成 Skill，新加入的文件只需更新快取，不必每次重讀全部資料。

## 踩坑提醒

- 快取是目錄，不是權威原文；正式引用與關鍵數字仍要回原檔。
- 掃描 PDF、表格、公式與腳註可能擷取錯誤，不能把「有文字輸出」當成成功。
- 原始檔更新後要重建索引，否則對話可能引用舊版本。
