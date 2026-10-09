# 研究流程與 html-visualizer 增補驗證

日期：2026-10-09。原始版本：`8246be2`。本文件記錄推送前的本機驗證；發布狀態以 GitHub Actions 為準。

## 改動

- 首頁新增五階段入口，連到 `/guides/research-workflow/`；原有首頁區塊、主選單與路由保留。
- 五階段各有準備材料、AI 可協助事項、人工查核、可複製交辦範例及既有教材連結。
- 研究安全頁追加九項檢核，支援清除與重新載入後重設，不儲存或傳送勾選。
- html-visualizer 納入「畫圖與理解」與「製作簡報」，可依用途、名稱搜尋或以永久連結展開。第 6 課追加使用範例。

## 驗證結果

最終 `npm run verify` 結束碼為 0，lint、27 項單元測試、Astro 檢查、production build、Pagefind 與 Playwright 通過。瀏覽器測試為 **196 passed、74 skipped**；略過項目沿用既有的行動版重複內容／轉址檢查設定，未新增略過規則。

對照原始版本的 88 個 `src/`、`public/` 檔案，全部仍存在，每一行原始內容均依原順序保留；見 [內容保存檢查](content-preservation.txt)。未更動依賴、lockfile、部署設定或技能分類。

新增行為檢查涵蓋五階段入口、教材連結、逐段 prompt 複製、剪貼簿失敗提示、技能搜尋／分類／永久連結、第 6 課入口、全文搜尋、九項檢核重設、停用 JavaScript、無障礙掃描及執行期錯誤。

以 Chromium 在 **1440 × 900** 與 **390 × 844** 檢查新增區塊，均無水平溢出或頁面執行期錯誤，見 [瀏覽器紀錄](browser-checks.json)。八張區塊截圖均已實際查看；截圖使用減少動態效果設定，並僅在截圖時隱藏固定導覽與跳轉連結，避免遮住內容。

## 畫面

| 區塊 | 桌面 | 手機 |
|---|---|---|
| 首頁研究階段入口 | [桌面](desktop-home-entry.png) | [手機](mobile-home-entry.png) |
| 展開的研究導讀與 prompt | [桌面](desktop-workflow-expanded.png) | [手機](mobile-workflow-expanded.png) |
| 九項研究安全檢核 | [桌面](desktop-safety-checklist.png) | [手機](mobile-safety-checklist.png) |
| html-visualizer 技能卡 | [桌面](desktop-html-visualizer.png) | [手機](mobile-html-visualizer.png) |

## 過程與限制

[完整 run.log](run.log) 保留初次沙箱禁止監聽本機埠的錯誤、測試修正前的結果及最終成功結果。取得所需權限後，測試僅使用 `127.0.0.1:4173` 的本機靜態站。

全文搜尋沿用既有 Pagefind 的中文分詞與每頁五筆結果。整句標題不一定匹配；已確認「研究階段」能找到新導讀，並測試分頁後精確開啟其網址。初版測試誤選首頁同名段落，已改以導讀網址定位。

停用 JavaScript 後，原生平滑捲動仍會執行。測試改為等待位置穩定再勾選，未改動網站原有捲動設定；原生滑鼠操作也已另行確認可勾選。

本次提供 html-visualizer 的使用教學與官方安裝連結，未執行第三方安裝腳本，也未驗證其在其他使用者環境中的產出。無障礙掃描結果僅代表自動檢查通過。
