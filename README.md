# 研究生 AI 研究工作台

面向跨領域研究生的 AI agent 合作習慣與工具名詞教學網站。公開站部署於：

<https://phonchi.github.io/graduate-ai-research-workbench/>

## Site structure

- `找研究技能`：首頁可直接搜尋用途或名稱，依任務篩選，展開卡片閱讀交辦範例。
- `概念與習慣`：七篇以準備研究室會議串起的課程，從交辦走到檢查與交接。
- `工具詞典`：產品、檔案、Hook 與工作方式的白話說明。
- `研究案例`：研究與教學成果，以及匿名流程重建。
- `直接拿來用`：可閱讀預覽、複製與下載的範本，附填妥示例。
- `研究安全`：處理資料、檔案與公開成果時的基本提醒。

技能搜尋網址為 `/guides/research-skills/`；舊 `/tasks/` 會導向此頁並保留任務分類。全站教材搜尋仍在 `/search/`。

## 新增技能

在 `src/content/research-skills/` 新增一份 Markdown，不必改頁面或搜尋程式。檔名會成為永久連結的識別字，例如 `handoff.md` 對應 `#skill-handoff`，發布後請避免隨意改名。

```markdown
---
title: 我的研究技能
summary: 用一句話說明學生可以拿它完成什麼工作。
order: 150
categories: [read]
kind: Skill
aliases: [英文名稱, 常用別名]
tags: [文獻, 整理]
platforms: [Agent Skills]
sourceUrl: https://agentskills.io/
draft: true
---

### 準備什麼

寫清楚要提供的材料與必要環境。

### 試著這樣交辦

提供一段可以改成自己任務的交辦範例。

### 完成後看什麼

告訴學生怎麼判斷這次成果是否符合需求。
```

`draft: true` 的內容不公開；內容完成後改為 `false`。搜尋比對名稱、簡介、別名、標籤、平台與分類名稱；請在 `aliases` 和 `tags` 補上學生可能搜尋的說法。多個關鍵字以空白分隔時須全部符合，分類與關鍵字可一起使用。

分類統一放在 `src/data/skill-categories.ts`。要加入新分類，先新增穩定 ID 與中文標籤，再於 Markdown 的 `categories` 使用該 ID；選單、驗證與篩選會自動沿用。內容不限定每個技能只能出現在一個分類。

執行 `npm run verify`，檢查搜尋、連結與版面，再提交。一般新增不需要修改技能數量測試或入口清單。範本另有 `templateBody`（複製／下載原稿）與選填 `exampleBody`（填妥示例），閱讀畫面會將兩者渲染為 Markdown。

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run verify
```

`verify` 會執行 lint、單元測試、Astro/content schema、production build、Pagefind 索引，以及 desktop/mobile Playwright 測試。

案例封面可用 `node scripts/build-case-assets.mjs` 從 repo 內的預覽來源重新產生；其餘實作成果圖保留為公開成果的授權快照。

網站程式碼採 MIT License，原創教材採 CC BY 4.0。
