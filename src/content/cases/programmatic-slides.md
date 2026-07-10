---
title: 用程式反覆生成 seminar 與口試簡報
summary: 把版型、內容資料與講者備註交給 Agent 組成可重跑簡報，換圖、改數字或調順序時不必逐頁重做。
order: 40
part: 封裝
difficulty: 進階
slideRefs:
  - 30
  - 31
  - 32
relatedTools:
  - codex
  - claude-code
  - skill
  - git-github
graduateTransfer:
  - 將 seminar 或口試簡報做成可重跑生成器，統一版型與講者備註。
  - 把論文圖表與簡報資料連到同一來源，減少跨頁數字不同步。
lastVerified: 2026-07-10
draft: false
sourceUrl: https://docs.google.com/presentation/d/1mnjmwNZKsl1afDW2ia_QjWbJ9t45-FNC/
sourceLicense: 封面是作者 phonchi 的公開投影片並由作者授權本站以 CC BY 4.0 收錄；簡報內其他圖像、圖示和字型仍依各自授權使用。
privacyReview: 封面保留已公開的作者名稱 phonchi、活動名稱與日期；未收錄聯絡資料、學生資料、未公開研究結果或投影片備註。
coverImage: /graduate-ai-research-workbench/images/cases/programmatic-slides.webp
---

## 成果先看

這場「AI 教學助攻」簡報本身就是程式化產物：PptxGenJS 生成 13.3 × 7.5 吋寬螢幕版面，以共用元件維持標題、卡片、圖示與頁碼一致，34 張投影片逐頁帶有講者備註。產出不是一張圖片，而是可重新生成的 `deck.pptx`。

## 當時怎麼交辦

先給內容結構和使用情境，再讓 Agent 建立共用版型：

> 這是一場面向非程式背景教師的演講。請依章節大綱製作 16:9 簡報，維持固定色票、頁碼與標題層級，每頁加入對應講者備註。內容與版面分開管理；輸出後逐頁渲染，檢查截字、遮擋與字型替換。

流程跑順後，將生成、渲染與 QA 習慣封裝成 Skill，下次換主題仍可沿用。

## 研究生可以怎麼轉用

- 為 seminar、proposal 或口試建立固定簡報骨架，讓標題頁、方法頁、結果頁和備註保持一致。
- 把圖表標題、數值與來源集中管理，更新結果時同步重建所有引用該資料的頁面。
- 將「輸出 PPTX、渲染預覽、逐頁抽查」封裝成實驗室共用 Skill，交接給學弟妹。

## 踩坑提醒

- 成功產生 PPTX 不代表投影時可讀；一定要渲染並實際試播。
- 字型替換、長標題與圖表更新最容易造成截字和遮擋。
- 程式能維持一致版型，不能代替研究者判斷論點順序、數據與限制是否講清楚。
