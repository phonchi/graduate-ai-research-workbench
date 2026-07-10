# 研究生 AI 研究工作台

面向跨領域研究生的任務式 AI 研究技能教學網站。公開站預定部署於：

<https://phonchi.github.io/graduate-ai-research-workbench/>

## Site structure

- `學習路徑`：七個由任務規格到工作流封裝的核心單元
- `研究任務`：依文獻、引用、材料整理、重現、溝通與自動化進站
- `案例`：六個公開或匿名化的完整工作流
- `技能索引`：研究能力定義、使用時機與最低驗收標準
- `模板`：八份可複製、下載的 Markdown 模板
- `安全與倫理`：資料、授權、揭露與人工責任邊界

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

案例封面可用 `node scripts/build-case-assets.mjs` 從授權來源與本機預覽重新產生。

網站程式碼採 MIT License，原創教材採 CC BY 4.0。
