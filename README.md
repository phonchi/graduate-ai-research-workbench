# 研究生 AI 研究工作台

面向跨領域研究生的 AI agent 合作習慣與工具名詞教學網站。公開站部署於：

<https://phonchi.github.io/graduate-ai-research-workbench/>

## Site structure

- `概念與習慣`：六篇依教學投影片主線整理的核心課程
- `研究任務`：依讀論文、寫作、程式、簡報、網站與工作流進站
- `工具詞典`：13 項產品、檔案與工作方式的正式名稱及使用邊界
- `真實案例`：六個公開成果或匿名合成的工作流程
- `直接拿來用`：七份對應投影片習慣的 Markdown 模板
- `安全紅線`：四項資料、引用、公開與高風險操作邊界

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

合成案例與投影片封面可用 `node scripts/build-case-assets.mjs` 從 repo 內的預覽來源重新產生；其餘實作成果圖保留為公開成果的授權快照。

網站程式碼採 MIT License，原創教材採 CC BY 4.0。
