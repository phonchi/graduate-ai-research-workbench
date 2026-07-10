---
title: 把抽象概念做成可以操作的互動圖
summary: 從 3D 曲面到導數反例，讓 Agent 寫互動頁，研究者專心決定概念怎麼呈現、哪裡必須驗算。
order: 10
part: 實作
difficulty: 入門
slideRefs:
  - 19
  - 20
  - 27
relatedTools:
  - codex
  - claude-code
  - git-github
graduateTransfer:
  - 把模型參數、空間結構或敏感度分析做成可拖曳的研究互動圖。
  - 用最小反例測試方法假設，做成組會或口試時可操作的概念頁。
lastVerified: 2026-07-10
draft: false
sourceUrl: https://phonchi.github.io/nsysu-calculus2/static_files/presentations/surfaces_3d.html#sec-surfaces
sourceLicense: 本頁截圖由原互動頁作者 phonchi 提供並以 CC BY 4.0 收錄；原頁使用的第三方程式庫與素材仍依各自授權。
privacyReview: 案例只描述公開頁面與通用製作流程，不包含助教姓名、電子郵件、未公開題目或學生資料。
coverImage: /graduate-ai-research-workbench/images/cases/interactive-calculus.webp
---

## 成果先看

[3D 曲面互動教材](https://phonchi.github.io/nsysu-calculus2/static_files/presentations/surfaces_3d.html#sec-surfaces)可以直接旋轉曲面、改變視角；[導數概念頁](https://phonchi.github.io/nsysu-calculus2/static_files/presentations/derivatives.html)則把「哪些推論成立、哪些會被反例推翻」放在同一張圖上。投影片中的重點不是炫技，而是分工：老師決定怎麼教，Agent 負責繁重的前端實作。

## 當時怎麼交辦

不是只說「幫我做一個 3D 網頁」，而是用教學語言說清楚操作與判讀方式：

> 把這個曲面做成可用滑鼠旋轉的互動頁。公式要能閱讀，手機也能操作。導數概念另外做一頁，把成立的關係和會失敗的推論分開，失敗處配一個具體反例。動工前先問我還缺哪些條件。

Agent 能處理版面與互動；曲面範圍、公式、條件和反例是否真的成立，仍由作者逐一驗算。

## 研究生可以怎麼轉用

- 把論文中的參數變化、三維結構或最佳化路徑做成可操作圖，先拿來檢查自己的理解，再用於組會說明。
- 把「方法在什麼條件下成立」與最小失敗案例並排，作為研究設計或口試準備的概念驗證頁。
- 用合成資料做 prototype，確認互動與敘事有效後，再決定是否接入真實研究資料。

## 踩坑提醒

- 畫面會動不代表概念正確；反例尤其容易被 AI 編得很像真的。
- 只測預設值會漏掉邊界錯誤，至少要試零值、極端值與手機操作。
- 互動圖是解釋與探索工具，不能代替正式推導、統計檢驗或證明。
