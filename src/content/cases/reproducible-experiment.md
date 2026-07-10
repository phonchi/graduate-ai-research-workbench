---
title: 從原始量測到可驗證摘要：一個零依賴實驗
summary: 用固定輸入、設定、命令、預期輸出與 SHA-256 manifest，示範研究結果如何由別人重新執行並核對。
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
  - 把原始資料、設定與衍生輸出分開，讓結果可重建且不覆寫 raw data。
  - 用預期結果、輸入雜湊與失敗紀錄驗證 Agent 產生的研究流程。
lastVerified: 2026-07-10
draft: false
sourceUrl: https://github.com/phonchi/graduate-ai-research-workbench/tree/main/examples/reproducible-experiment
sourceLicense: 實驗資料、分析程式、預期輸出、案例文字與預覽皆為本站原創合成素材，採 CC BY 4.0；網站程式碼另依 MIT License。
privacyReview: 輸入是五筆人工建立的合成量測，不含受試者、學生、位置、帳號、未公開研究或可識別中繼資料。
coverImage: /graduate-ai-research-workbench/images/cases/reproducible-experiment.webp
---

## 先看可重跑範圍

[`examples/reproducible-experiment`](https://github.com/phonchi/graduate-ai-research-workbench/tree/main/examples/reproducible-experiment) 是一個刻意保持很小的完整實驗：不用安裝套件，Node.js 直接讀取五筆合成量測，依設定計算 count、mean、min、max，再寫出統計摘要與 provenance manifest。

它不是要示範複雜分析，而是把「可重現」拆成能逐項檢查的檔案與命令。

## 輸入與環境

- `raw/measurements.csv`：唯一原始輸入，分析器只讀。
- `config.json`：指定輸入、輸出、四捨五入位數、seed 與固定 timestamp。
- `analyze.mjs`：只使用 Node.js built-ins，沒有套件安裝步驟。
- `expected/summary-template.json`：保存預期欄位與統計值；測試執行時將 `$NODE_VERSION` 正規化為當下 runtime 版本，再進行結構比較。

執行環境只要求可使用 Node.js。實際版本會寫入 manifest，不假裝不同 runtime 完全相同。

## 執行命令

```bash
cd examples/reproducible-experiment
node analyze.mjs
```

程式只會建立或更新 `derived/summary.json`，不會寫入 `raw/`。

## 輸出與 manifest

統計輸出固定為五筆量測的 count、mean、min 與 max。Manifest 同時記錄：

- 原始 CSV 的 SHA-256。
- config 的 SHA-256。
- 實際命令。
- Node 版本。
- config 中的 seed。
- config 中的固定 timestamp。

雜湊能證明測試針對哪一組 bytes 執行，但不能證明輸入資料本身真實、無偏或符合研究倫理。

## 如何驗證

從 repo 根目錄執行：

```bash
npm test -- src/lib/reproducible-experiment.test.ts
```

測試會先記錄 raw CSV 的內容與 SHA-256，刪除舊 derived output，重新執行分析，再確認：

1. process exit status 為 0。
2. 將 expected template 的 runtime 欄位正規化後，summary 的結構與值相符。
3. manifest 欄位齊全，兩個 SHA-256 格式正確。
4. raw CSV 執行前後內容與雜湊不變。
5. 分析器的 import 全部來自 `node:` built-ins。

## 一個刻意記錄的失敗

開發時曾在暫存副本把 CSV 欄名改成 `value`，分析器立即以 `Expected CSV header: sample_id,measurement` 停止。這不是要讓程式猜測另一種格式，而是把輸入契約寫清楚：欄位變更應先更新 config、分析器與 gold output，再由 review 判斷是否仍是同一個實驗。

失敗紀錄至少要回答：用了哪個輸入、執行哪個命令、錯在哪裡、是否產生不完整輸出，以及下一次修正要改規格還是改程式。

## 搬進真實研究前

- 把合成 CSV 換成資料 manifest，而不是直接提交受管制 raw data。
- 固定 environment 或 lockfile，並記錄硬體、套件與外部服務版本。
- 把 seed 真正接入隨機流程；本例沒有隨機計算，seed 只示範 manifest 欄位。
- 保存 stdout、stderr、exit status 與失敗輸出，不只保存成功結果。
- 為科學主張建立人工 rubric；測試通過只能證明流程符合目前規格。
