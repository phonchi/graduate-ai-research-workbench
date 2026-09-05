---
title: 把演算法步驟做成可以播放的方法展示
summary: 用搜尋與排序動畫示範如何交代狀態、控制與邊界，快速做出研究方法的互動原型。
order: 20
part: 實作
difficulty: 實作
category: 公開成果
reproducible: false
relatedTools:
  - codex
  - claude-code
  - skill
graduateTransfer:
  - 把模型更新、資料處理或搜尋流程做成逐步方法展示。
  - 在正式開發視覺化系統前，先用小型合成輸入驗證原型。
lastVerified: 2026-07-10
draft: false
sourceUrl: https://phonchi.github.io/nsysu-math208/static_files/presentations/searching_sorting.html#selection
sourceLicense: 本頁截圖由原互動頁作者 phonchi 提供並以 CC BY 4.0 收錄；原頁內容、程式碼與第三方程式庫仍依各自授權。
privacyReview: 僅使用公開頁面與合成陣列說明流程，不包含人員名單、成績、作業繳交紀錄或未公開教材。
coverImage: /images/cases/algorithm-visualization.webp
---

## 成果先看

[搜尋與排序互動頁](https://phonchi.github.io/nsysu-math208/static_files/presentations/searching_sorting.html#selection)把演算法從一張靜態流程圖變成可播放、暫停和逐步查看的教材。相同內容另有適合課後閱讀的靜態輸出，避免互動效果成為理解步驟的唯一入口。

## 當時怎麼交辦

作者用「學生要看到什麼」描述需求，而不是先指定前端技術：

> 把搜尋與排序做成可以一步一步播放的動畫。每一步要看得到目前比較的元素、資料狀態和文字說明，並提供播放、暫停、單步與重設。先用短陣列做出可用版本，再補重複值與已排序輸入。

這種交辦讓 Agent 寫程式，作者則用已知演算法結果逐步核對動畫。

## 從材料到成果

- **輸入**：短陣列、演算法定義，以及重複值、已排序、空輸入等邊界案例。
- **動作**：把比較、交換與目前索引拆成離散狀態，讓播放、暫停、單步與重設都操作同一份狀態。
- **輸出**：互動動畫、每一步的文字說明，以及離線仍可理解的靜態版本。
- **驗證**：用已知輸入逐步比對真正演算法；另測快速連按控制、重設與手機畫面。

## 實作時容易漏掉的地方

- 最後答案正確，不代表中間動畫與真正演算法一致。
- 動畫速度不是演算法時間複雜度，兩者不要混為一談。
- 連按播放、重複值與空輸入很容易讓狀態錯位，應列入最早的原型測試。
