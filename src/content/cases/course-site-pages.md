---
title: 把研究成果集中成一個會自動更新的網站
summary: 從課程 GitHub Pages 經驗出發，把 lab、project 與研究成果集中發布，並用 Git 留下可回復的存檔點。
order: 30
part: 實作
difficulty: 實作
category: 公開成果
reproducible: false
relatedTools:
  - git-github
  - codex
  - claude-code
graduateTransfer:
  - 建立 lab 或 project 網站，集中方法、文件、demo 與版本資訊。
  - 將研究軟體或資料說明透過 GitHub Pages 持續發布，保留每次修改紀錄。
lastVerified: 2026-07-10
draft: false
sourceUrl: https://phonchi.github.io/nsysu-math208/lectures/
sourceLicense: 本頁截圖由原網站作者 phonchi 提供並以 CC BY 4.0 收錄；原站教材、原始碼、校徽與第三方資產不因本案例而重新授權。
privacyReview: 截圖與來源連結限定在不含人員名單的 lectures 頁；本站不鏡像課程首頁的助教姓名、電子郵件、學生帳號、成績或後台資料。
coverImage: /graduate-ai-research-workbench/images/cases/course-site-pages.webp
---

## 成果先看

[資料結構課程講義索引](https://phonchi.github.io/nsysu-math208/lectures/)把講義、作業、考試與互動教材集中在同一站。修改推送後由 GitHub Pages 自動更新；每次 Git 紀錄都是一個「存檔點」，改壞時可以回到先前版本。

## 當時怎麼交辦

網站更新不是叫 Agent 自由整理整個專案，而是給一個可檢查的小範圍：

> 先讀現有網站結構與慣例。把這一章的講義與互動頁加入索引，不要改其他頁面的文字。完成後跑建置與連結檢查，列出你改了什麼；我確認後再建立 Git 存檔點並推送。

這樣既保留 Agent 動手更新的效率，也讓公開發布仍有清楚的人工決策點。

## 輸入、動作、輸出與驗證

- **輸入**：現有網站結構、要新增的公開教材、固定網址與不可公開清單。
- **動作**：只修改指定索引與資產，執行建置及連結檢查，人工檢視 diff 後才 commit 與 push。
- **輸出**：可追溯的 Git 版本、部署紀錄與公開頁面。
- **驗證**：從正式網址抽查導覽、圖片、下載與手機版；部署成功訊息不能取代公開結果檢查。

## 踩坑提醒

- 部署顯示成功不代表公開頁面正確，仍要從正式網址打開圖片、連結與下載檔。
- Git 不會自動阻止密鑰、名單或未公開結果被加入，推送前一定要看變更內容。
- 大量重排會讓審查困難；一次更新一個清楚主題，存檔紀錄才有用。
