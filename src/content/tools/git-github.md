---
title: Git 與 GitHub
summary: Git 建立本機存檔點，GitHub 保存與分享共同修改歷史。
order: 6
kind: CLI
interfaces: [桌面 App, 網頁]
level: 入門
aliases: [Git, GitHub, GitHub Desktop, 版本控制]
capabilities:
  localFiles: depends
  commands: depends
  sourceCitations: no
  webAccess: depends
  backgroundTasks: depends
  humanApproval: depends
bestFor: [建立修改存檔點, 比較版本差異, 協作與部署前追蹤]
avoidFor: [取代內容審查, 把金鑰與個資提交上線, 不理解後果的歷史重寫]
firstStep: 在練習資料夾建立本機儲存庫，保存一份筆記，再比較一行修改前後的差異。
platformNames: [Git, GitHub, GitHub Desktop]
officialUrl: https://git-scm.com/
relatedLessons: [04-checkpoints-and-tools, 05-challenge-and-review]
lastVerified: 2026-07-10
draft: false
---

## Git 保存版本，GitHub 方便協作

Git 讓你保存檔案的修改歷史，一次保存稱為 **commit（提交）**。你可以比較兩版內容，也能取回之前提交的版本。GitHub 則把 Git 專案放到遠端，供你與合作者使用；本機存檔不需要先把內容公開。

讓 Agent 修改筆記前，先存一版。修改後用 **diff（差異）** 看它改了哪幾行，再回查內容是否正確。**push（推送）** 才會把提交送到已設定的遠端位置，可能讓合作者看到內容或觸發網站發布。

## 可以先試

在新建的練習資料夾用 GitHub Desktop 建立儲存庫，或用 `git init` 初始化。把一份不含敏感資訊的筆記提交成第一版，改一行後，在 Changes 或 `git diff` 中比較前後文字。完整命令見[第 4 課](../../learn/04-checkpoints-and-tools/)。

Git 只保存你提交的檔案，不能替你判斷內容真偽，也不會自動攔住個資和金鑰。公開前要查看待推送內容與遠端可見範圍。已有同學的未提交修改時，先保留，不要為了整理狀態覆蓋或刪除。
