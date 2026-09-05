---
title: 讓別人重算你的平均值：五筆量測的小實驗
summary: 從五筆數字算出摘要，保存資料、設定與程式，讓另一個人也能重跑並核對結果。
order: 45
part: 實作
difficulty: 入門
category: 可重跑示範
reproducible: true
relatedTools:
  - codex
  - claude-code
  - git-github
graduateTransfer:
  - 把原始資料、設定與衍生輸出分開，讓結果可重建且不覆寫原始資料。
  - 用預期結果、輸入雜湊與失敗紀錄驗證 Agent 產生的研究流程。
lastVerified: 2026-07-10
draft: false
sourceUrl: https://github.com/phonchi/graduate-ai-research-workbench/tree/main/examples/reproducible-experiment
sourceLicense: 實驗資料、分析程式、預期輸出、案例文字與預覽皆為本站原創合成素材，採 CC BY 4.0；網站程式碼另依 MIT License。
privacyReview: 輸入是五筆人工建立的合成量測，不含受試者、學生、位置、帳號、未公開研究或可識別中繼資料。
coverImage: /images/cases/reproducible-experiment.webp
---

## 五筆量測，算出同一份摘要

你算出一個平均值，別人想確認它怎麼來的。除了結果，還需要原始數字、計算方式和設定。這個[小型實驗](https://github.com/phonchi/graduate-ai-research-workbench/tree/main/examples/reproducible-experiment)把這些材料放在一起，讓你先用五筆合成量測試一次。

`raw/measurements.csv` 的數字是 10.2、11.8、12.4、13.6、14.0。預期結果為 5 筆、平均 12.4、最小 10.2、最大 14。你可以先手算，再對照程式輸出。

## 跑一次看看

準備好 Node.js 後，從專案根目錄執行下面兩行，不需為分析程式另裝套件：

```bash
cd examples/reproducible-experiment
node analyze.mjs
```

程式依設定讀取原始 CSV，建立或更新 `derived/summary.json`，不修改 `raw/`。打開輸出，`statistics` 中的 `count`、`mean`、`min`、`max` 就是筆數、平均、最小值與最大值。

同一個檔案還有 `manifest`，記錄這次用了哪些輸入、設定與環境。這份來源紀錄讓別人能追問「你跑的是哪一版」，不必只憑最後的數字猜測。

## 幾個檔案怎麼分工？

| 檔案 | 用途 |
|---|---|
| `raw/measurements.csv` | 五筆合成量測，分析時只讀 |
| `config.json` | 指定輸入、輸出、四捨五入位數及示範用記錄欄位 |
| `analyze.mjs` | 計算摘要的程式，只使用 Node.js 內建功能 |
| `expected/summary-template.json` | 預先保存的正確欄位與統計值，供測試比對 |

## 想了解怎麼核對版本，再看 manifest

紀錄中包含原始 CSV 與設定檔的 SHA-256 雜湊、實際命令、Node.js 版本，以及設定中的 `seed` 與 `timestamp`。雜湊相當於檔案內容的校驗值，用來確認比對的是否為同一份內容；它不會判斷量測本身是否真實或合理。

這個例子沒有隨機計算，`seed` 只是示範隨機種子的記錄位置；`timestamp` 也是固定設定，不能當成實際執行時間。真正的隨機實驗，要把種子接入計算，並另記實際執行時間。

## 自動檢查會看哪些事？

先回到已安裝網站測試依賴的專案根目錄，再執行：

```bash
npm test -- src/lib/reproducible-experiment.test.ts
```

測試會記下原始 CSV 的內容與雜湊，移除舊的衍生輸出，再重新分析。接著比對統計值和欄位、確認原始 CSV 沒有改變，並檢查程式成功結束、來源紀錄齊全，以及程式引用的模組都來自 Node.js 內建功能。

預期範本中的 `$NODE_VERSION` 會換成當下實際版本，再做結構比較。這讓測試可以比對本次環境記錄，並不表示各種執行環境必然有相同行為。

## 欄名改了，程式會怎麼辦？

範例的失敗紀錄曾在暫存副本把 CSV 欄名改成 `value`，程式便以 `Expected CSV header: sample_id,measurement` 停止。這指出它需要的輸入格式，沒有繼續猜測資料意義。

若你確實要改欄位，就一起調整相關設定、分析程式和預期輸出，再確認分析意義是否改變。保留失敗時的輸入、命令和錯誤訊息，才知道下一次該從哪一步修正。

## 換成自己的研究資料

沿用「原始資料、設定、衍生結果分開」的方式，並保留資料取得位置和版本；受限制的原始資料不要直接加入公開專案。分析環境要記下硬體、套件與外部服務版本，必要時保存套件版本鎖定檔。

執行紀錄也要一起保存，包括正常輸出、錯誤訊息、結束狀態及失敗結果。這些檢查能確認程式是否照設定完成；方法是否適合研究問題、結果支持多強的結論，還要由研究者判斷。
