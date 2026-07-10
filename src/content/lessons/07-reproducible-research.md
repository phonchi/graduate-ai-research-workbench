---
title: 讓下一個人真的跑得出來：可重現研究工作流
summary: 從唯讀盤點、環境與資料版本，到 manifest、gold tasks、人工 rubric 與失敗日誌，建立可交接的研究執行紀錄。
order: 7
part: 實作
difficulty: 進階
estimatedMinutes: 30
learningOutcomes:
  - 建立不改動 raw data、可追蹤環境、設定、命令與 derived outputs 的研究目錄。
  - 撰寫一份足以讓合作者重跑的 experiment manifest。
  - 用 gold tasks、人工 rubric、失敗日誌與停止條件驗收研究流程。
prerequisites:
  - 04-checkpoints-and-tools
  - 05-challenge-and-review
references:
  - title: Good enough practices in scientific computing
    url: https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005510
    type: paper
    note: Wilson 等人提出研究資料、軟體、協作、專案組織與追蹤工作的入門實務。
  - title: The FAIR Guiding Principles for scientific data management and stewardship
    url: https://www.nature.com/articles/sdata201618
    type: paper
    note: FAIR 原始論文，要求研究物件可尋、可取、可互通、可再用，並保留 metadata、授權與 provenance。
  - title: Working with evals
    url: https://platform.openai.com/docs/guides/evals
    type: official
    note: OpenAI 官方評估指南，提供代表性測試資料、ground truth 與明確 testing criteria 的實作例子。
  - title: Best Practices for Sharing Research Software
    url: https://datascience.nih.gov/tools-and-analytics/best-practices-for-sharing-research-software-faq
    type: policy
    note: NIH 官方指引，涵蓋版本控制、metadata、授權、安裝與使用說明等研究軟體分享要件。
keyTerms:
  - reproducibility
  - manifest
  - immutable raw data
  - environment lock
  - provenance
  - failure log
relatedTools:
  - codex
  - claude-code
  - git-github
  - agents-md
  - claude-md
relatedCases:
  - document-cache
  - anonymous-manuscript-review
  - programmatic-slides
lastVerified: 2026-07-10
draft: false
featured: true
---

## 完成的定義：不是「我這台跑過」

可重現的計算研究，至少要讓另一個人知道：用了哪份資料、哪個程式與環境、什麼設定與命令、產生哪些結果，以及失敗時在哪裡停下來。它不保證科學結論必然正確，但讓流程能被檢查、重跑與質疑。

本單元建立一條可以直接照做的最小工作流。第一次請在無敏感資料的副本練習。

## 1. 唯讀盤點

先不要改檔或安裝套件。列出研究問題、入口文件、程式、資料、既有環境檔、執行命令與預期輸出，並標記不確定處。

```text
請只讀盤點目前專案：
1. 找出 raw data、程式入口、設定、環境檔與既有結果；
2. 標記每項的版本或日期，以及不能確認的地方；
3. 提出最小重跑計畫，但不要修改、安裝或執行。
```

如果連權威資料、主要程式或成功判定都無法指出，先停在盤點階段。

## 2. 建立 Git checkpoint

確認哪些是你原本尚未提交的修改，再為程式、設定與文件建立可回復的存檔點。大型資料、密鑰、受限制資料與產生後可重建的暫存檔，應依專案政策使用適合的儲存位置，不要因為有 Git 就全部提交。

記錄 checkpoint 的 commit ID；後續 manifest 要能指出這次執行使用哪一版程式。

## 3. 鎖定環境

使用專案既有工具保存直接依賴與解析後版本，例如 lockfile、conda environment、容器定義或系統套件清單。另記錄作業系統、CPU/GPU、驅動與必要外部程式。

不要在正式環境上看到缺套件就任意升級。先確認既有環境檔是否為權威來源；若重建失敗，把錯誤與版本差異寫進 failure log。

## 4. 保持 raw data 不可變

`raw/` 只放原始輸入或指向受控資料位置的說明。清理、篩選、正規化與人工標註輸出放到 `derived/`，由程式或可追蹤步驟產生。

至少為輸入記錄穩定 ID、版本或日期、取得方式、授權/存取限制，以及可行時的 checksum。FAIR 不等於所有資料都必須公開；受限制資料仍可用 metadata、授權流程與 provenance 說明如何合法取得。

## 5. 固定 seed 與 config

把會改變結果的參數寫進設定檔，不要只留在對話或 shell history：

- random seed 與資料切分方式。
- 模型、方法、閾值與 baseline 版本。
- 輸入、輸出路徑與排除規則。
- 重複次數、統計方式與硬體相關選項。

固定 seed 只能降低部分隨機差異；硬體、函式庫與非決定性運算仍可能造成變化，因此還要記錄環境與容許誤差。

## 6. 保存 command log 與 derived outputs

每次正式執行保存實際命令、開始/結束時間、exit code、stdout/stderr 位置與使用的 config。輸出寫入新的 run 目錄，不覆蓋先前結果：

```text
runs/2026-07-10-baseline/
  manifest.yaml
  command.txt
  stdout.log
  stderr.log
  metrics.json
  figures/
```

圖表與摘要應由 `metrics.json` 或同一批 derived data 產生，避免手工複製數字後失去來源。

## 7. 寫 experiment manifest

Manifest 是一次執行的索引，不必塞入所有 log。以下欄位已足以開始：

```yaml
run_id: 2026-07-10-baseline
question: 比較 baseline 與 proposed method 的驗證集表現
code_commit: abc1234
environment: environments/analysis.lock
data:
  id: dataset-v2
  checksum: sha256:...
config: configs/baseline.yaml
seed: 42
command: python -m analysis.run --config configs/baseline.yaml
outputs:
  metrics: runs/2026-07-10-baseline/metrics.json
  figures: runs/2026-07-10-baseline/figures/
acceptance:
  - command exit code 為 0
  - metrics 包含事先指定的三個欄位
  - 表格與圖中的數值來自同一份 metrics
known_limits:
  - GPU kernel 可能造成容許範圍內的浮點差異
```

路徑必須真的存在，`acceptance` 必須能逐項判定；`known_limits` 不應拿來掩蓋未調查的錯誤。

## 8. 用 gold tasks 與人工 rubric 驗收

為資料讀取、前處理、核心分析與報表各留少量 gold tasks。能客觀判定的部分用測試或精確/容差比對；涉及圖表可讀性、主張範圍或領域合理性的部分，使用簡短人工 rubric。

代表性測試資料要包含正常輸入、邊界條件與過去失敗案例。OpenAI Evals 的 test data、ground truth 與 testing criteria 是一個結構化例子；本機研究流程可用小型 fixtures、預期檔案與人工評分表達成同樣目的。

## 9. 維護 failure log

失敗日誌不是只貼錯誤訊息。每筆至少記錄：

| 欄位 | 內容 |
|---|---|
| run ID | 對應 manifest |
| 症狀 | 實際觀察到什麼 |
| 第一個偏離點 | 最早不符合預期的步驟 |
| 證據 | log、輸入、輸出與版本位置 |
| 處置 | 修正、重跑、接受限制或停止 |
| 影響 | 哪些下游結果需要作廢或重建 |

新的修正應回到 gold tasks，避免相同錯誤再次靜默發生。

## 明確停止條件

遇到下列情況不要讓 Agent 自行擴權或無限重試：

- raw data、授權、IRB/同意範圍或資料版本無法確認。
- 環境無法依 lock 重建，且升級會改變方法或結果。
- checksum、筆數、schema 或關鍵指標與 manifest 不符。
- 同一錯誤重跑兩次仍沒有新證據。
- 需要覆寫 raw data、刪除既有 run、公開未審結果或存取新系統。
- 客觀測試通過，但領域 rubric 對研究主張仍有重大疑慮。

停止時保留現場，列出已完成、未完成、最後成功 checkpoint 與需要誰決定。下一位合作者應能從 manifest 和 failure log 接手，而不是重新猜整段對話。

## 交接前最後檢查

- [ ] 新環境可依文件建立，或已明確記錄無法重建的原因。
- [ ] raw data 未被修改，derived outputs 可追到輸入與 config。
- [ ] Manifest 的路徑、commit、命令與 checksum 已抽查。
- [ ] Gold tasks 與人工 rubric 有實際結果，不只列名稱。
- [ ] Failure log 包含所有被跳過或無法判定的項目。
- [ ] README 說明最小重跑步驟、授權與已知限制。

Good Enough Practices 強調先採用每位研究者都做得到的資料、程式、協作與專案管理習慣；NIH 的研究軟體分享指引也要求版本控制、metadata、授權與安裝使用資訊。可重現性不是最後一次整理，而是從第一次執行就留下足夠證據。

## 一句帶走

**把資料、環境、設定、命令、輸出與失敗串成 manifest，下一個人才有可能重跑，而不是重猜。**
