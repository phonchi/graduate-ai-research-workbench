# Synthetic Research Corpus

這組小型合成語料用於「文件快取知識庫」案例，不對應真實論文、研究參與者或未公開資料。

## Inputs

- `source-manifest.json`：唯一的來源清單；每筆含 stable ID、相對路徑、類型、授權、SHA-256 與 quick note
- `paper-01-method.md`：合成方法摘要
- `paper-02-baseline.md`：合成基線摘要
- `notes-assumptions.md`：合成研究備忘錄
- `dataset-card.html`：合成資料集說明

Builder 不會掃描整個資料夾或用 HTML regex 猜欄位，只處理 manifest 明列的來源。來源路徑必須留在本 corpus，且不得把 generated `index.json` 列為 raw source。

## Rebuild

在此資料夾執行零外部依賴命令：

```bash
node build-index.mjs
```

Builder 會先驗證全部來源 bytes 與 manifest hash，再依 stable ID 排序。寫入時先在同目錄以 `wx` 建立 unique temp file，完整寫入並 sync 後才用 rename 原子替換 `index.json`；失敗或中斷會清除 temp，保留上一版 index。它不接受輸出參數。

## Outputs and expected result

- `index.json`：實際 deterministic 輸出
- `expected-index.json`：committed expected fixture
- `failure-log.md`：hash mismatch、越界路徑與改寫 output 嘗試的預期失敗紀錄

重建後可做 byte-for-byte 比對：

```bash
cmp index.json expected-index.json
```

Repo 根目錄的 focused test 會把 corpus 複製到獨立暫存 sandbox，再連跑兩次 builder、核對 expected fixture、逐筆重算 SHA-256，並模擬 rename 前中斷。測試也會確認 sandbox sources 不變、temp file 已清除，以及 tracked `index.json` 的 bytes 與 mtime 都未改變：

```bash
npm test -- src/lib/document-cache-reproducibility.test.ts
```

文字內容採 CC BY 4.0。
