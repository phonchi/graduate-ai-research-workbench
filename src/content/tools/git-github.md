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
avoidFor: [取代內容審查, 把密鑰與個資提交上線, 不理解後果的歷史重寫]
firstStep: 用 GitHub Desktop 或 git status 確認狀態，先建立一個乾淨存檔點。
platformNames: [Git, GitHub, GitHub Desktop]
officialUrl: https://git-scm.com/
relatedLessons: [04-checkpoints-and-tools, 05-challenge-and-review]
lastVerified: 2026-07-10
draft: false
---

## 白話是什麼

Git 是研究檔案的「存檔點與時光機」；GitHub 是把這份歷史放到遠端，供自己、合作者與自動部署共同使用的平台。兩者有關，但不是同一個東西。

## 什麼時候用

讓 agent 修改檔案前先存一版，修改後用 diff 看它改了什麼；確認無誤再 commit，需要協作或發布時才 push。研究程式、論文來源與網站都適用這個習慣。

## 不要拿它做什麼

Git 不會判斷論文內容正不正確，也不會自動保護你免於錯誤操作。不要提交 API key、學生個資或不可公開材料；不熟悉時不要自行改寫共享歷史。

## 第一次怎麼開始

新手可用 GitHub Desktop 建 repo、做第一個 commit，再故意改一行文字觀察 Changes。熟悉 terminal 後，再學 `git status`、`git diff`、`git add`、`git commit` 與 `git push`。

## 和其他工具的關係

Agent 負責動手修改，Git 負責留下可比較的歷史，GitHub 負責遠端協作與可能的部署。它們合在一起，才形成「先存檔、再放手、看差異、再發布」的安全流程。
