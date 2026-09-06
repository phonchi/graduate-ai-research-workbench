---
title: NotebookLM
summary: 針對指定資料查問並回查引用；先用網頁閱讀，重複操作時可再了解社群自動化工具。
order: 2
kind: 網頁
level: 零門檻
aliases: [Google NotebookLM, NotebookLM 筆記本]
capabilities:
  localFiles: no
  commands: no
  sourceCitations: yes
  webAccess: depends
  backgroundTasks: depends
  humanApproval: no
bestFor: [多份來源問答, 課程與研究資料整理, 帶引用的初步查找]
avoidFor: [修改本機檔案, 執行研究程式, 取代人工核對原文]
firstStep: 為一個研究主題建立筆記本，先放少量可分享的來源並測試引用。
platformNames: [NotebookLM Web]
officialUrl: https://notebooklm.google.com/
relatedLessons: [03-context-and-indexes, 05-challenge-and-review]
lastVerified: 2026-07-10
draft: false
---

## 把三篇論文放進同一個筆記本

NotebookLM 適合針對指定材料問問題。你把論文、講義或網址加入筆記本，再問「這幾篇用了什麼方法」，並沿回答中的引用回到原文。第一次使用可以直接從網頁開始。

先加入少量你熟悉、可以上傳的材料，例如 D01、D02、D03 三篇公開論文，再問：

```text
比較這三篇論文的受試者數、影像數與方法，每項附來源引用。
缺少資訊就寫「未提供」；來源互相矛盾時，把兩處內容都列出。
```

打開引用，確認每個數字的單位和原文一致。若沒有分享權限，先使用公開或合成材料，不要把未公開稿件直接上傳。

## 想重複操作時，可以再接 Python、CLI 或 Skill

社群專案 [notebooklm-py](https://github.com/teng-lin/notebooklm-py) 提供 Python、CLI（命令列）與 Agent Skill，能建立筆記本、加入來源、查問及下載產出。它不是 Google 官方工具，使用前需要安裝並完成 Google 登入；登入資料應保留在工具的憑證儲存位置，不要貼進交辦。

例如你每週整理一批可上傳的論文，可以交辦：

```text
請用 notebooklm-py 的 Skill 處理 notes/sources.md 中已確認可上傳的三篇論文。
建立本次筆記本，加入 papers/D01.pdf、papers/D02.pdf、papers/D03.pdf。
確認來源已處理完成，再比較方法與樣本數，保留引用。
將回答與待查問題整理到 notes/comparison.md，完成後我會回查原文。
```

這個流程會使用雲端服務。自動化能省下重複點選，但仍有服務額度與登入需求；負責操作的 Agent 也可能使用模型額度。網頁版的來源問答，與另外安裝的 Python／CLI 工具能力要分開看。

若要建立本機文件目錄，可看[第 3 課的來源表與索引](../../learn/03-context-and-indexes/)；要修改分析程式或其他研究檔案，則交給能讀寫工作區的 Agent。
