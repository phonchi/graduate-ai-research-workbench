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

可重現的計算研究，要讓另一個人能回答：用了哪份資料、哪個程式與環境、什麼設定與命令，以及結果從哪裡產生。它不保證科學結論必然正確，但讓流程能被檢查、重跑與質疑。

下面是本站建議的起步順序，不是唯一標準流程。第一次可在無敏感資料的副本練習三個動作：固定輸入與執行條件、用 manifest 記錄一次 run、用小型代表案例驗收。其他紀錄依專案風險與交接需求補上。

## 起步一：固定輸入與執行條件

先唯讀盤點研究問題、入口文件、程式、資料、既有環境檔、執行命令與預期輸出，並標記不確定處。

```text
請只讀盤點目前專案：
1. 找出 raw data、程式入口、設定、環境檔與既有結果；
2. 標記每項的版本或日期，以及不能確認的地方；
3. 提出最小重跑計畫，但不要修改、安裝或執行。
```

如果連權威資料、主要程式或成功判定都無法指出，先停在盤點階段。

確認哪些是研究者尚未提交的修改，再為程式、設定與文件留下 Git checkpoint。大型資料、密鑰、受限制資料與可重建暫存檔依專案政策存放，不要因為有 Git 就全部提交。後續 manifest 應能指出這次執行使用的 commit ID。

環境、資料與設定按需補到能解釋結果差異的程度：

- **環境**：沿用專案既有 lockfile、conda environment、容器定義或套件清單，另記錄會影響結果的作業系統、GPU、驅動與外部程式。
- **資料**：`raw/` 保持不可變，清理、篩選、正規化與標註輸出寫到 `derived/`；為輸入保留穩定 ID、版本或日期、取得方式、授權限制，以及可行時的 checksum。
- **設定**：把 seed、資料切分、模型或方法版本、閾值、路徑、排除規則與統計方式放進 config，不只留在對話或 shell history。

FAIR 不等於所有資料都必須公開；受限制資料仍可用 metadata、授權流程與 provenance 說明如何合法取得。固定 seed 也只能降低部分隨機差異，硬體、函式庫與非決定性運算仍要靠環境紀錄與容許誤差說明。

## 起步二：用 manifest 記錄一次 run

每次正式執行保存實際命令、exit code、使用的 config 與輸出位置。需要追效能或長時間工作時，再加開始/結束時間與 stdout/stderr。輸出寫入新的 run 目錄，不覆蓋先前結果：

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

Manifest 是一次執行的索引，不必塞入所有 log。以下是可刪減的起步例子：

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

## 起步三：用代表案例驗收並留下問題

先為最容易悄悄出錯的環節留少量 gold tasks，不必為每個階段湊齊固定題數。能客觀判定的部分用測試或精確/容差比對；涉及圖表可讀性、主張範圍或領域合理性的部分，使用簡短人工 rubric。

代表性測試資料要包含正常輸入、邊界條件與過去失敗案例。OpenAI Evals 的 test data、ground truth 與 testing criteria 是一個結構化例子；本機研究流程可用小型 fixtures、預期檔案與人工評分表達成同樣目的。

遇到會影響後續結果的問題時再寫 failure log，不必把每個可立即修正的 typo 都登記。每筆保留能讓合作者定位與判斷影響的資訊：

| 欄位 | 內容 |
|---|---|
| run ID | 對應 manifest |
| 症狀 | 實際觀察到什麼 |
| 第一個偏離點 | 最早不符合預期的步驟 |
| 證據 | log、輸入、輸出與版本位置 |
| 處置 | 修正、重跑、接受限制或停止 |
| 影響 | 哪些下游結果需要作廢或重建 |

新的修正應回到 gold tasks，避免相同錯誤再次靜默發生。

## 只保留三條高風險紅線

遇到下列情況不要讓 Agent 自行擴權或重試：

- raw data、授權、IRB/同意範圍或資料版本無法確認。
- manifest、輸入與關鍵指標互相不符，而且尚未找到第一個偏離點。
- 下一步需要覆寫 raw data、刪除既有 run、公開未審結果或存取新系統。

停止時保留現場，列出最後成功 checkpoint 與需要誰決定。資料治理、公開與外部系統的更多情境集中在[研究安全與責任](../../safety/)，不必在每份 experiment manifest 重抄。

## 交接前看三件事

- 新環境能依文件建立，或已記錄無法重建的原因。
- derived outputs 能追到輸入、config、commit 與實際命令。
- 代表案例有結果；被跳過、無法判定或仍需人工 rubric 的項目清楚可見。

需要一份可直接填寫的交接表時，可使用[Git checkpoint 與發布範本](../../templates/git-checkpoint-release/)。Good Enough Practices 強調先採用每位研究者都做得到的資料、程式、協作與專案管理習慣；NIH 的研究軟體分享指引也要求版本控制、metadata、授權與安裝使用資訊。可重現性不是最後一次整理，而是從第一次執行就留下足夠證據。

## 一句帶走

**把資料、環境、設定、命令、輸出與失敗串成 manifest，下一個人才有可能重跑，而不是重猜。**
