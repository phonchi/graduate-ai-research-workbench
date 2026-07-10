---
title: "資料溯源"
summary: "記錄資料從取得、轉換、分析到產出的來源、版本與處理歷史。"
order: 105
stage: "執行"
difficulty: "進階"
estimatedMinutes: 25
skills:
  - "資料溯源"
tools:
  - "Git"
  - "CLI"
  - "檔案型 Agent"
outputs:
  - "資料來源與轉換紀錄"
lastVerified: 2026-07-10
draft: false
aliases:
  - "data lineage"
  - "provenance"
prerequisites:
  - "任務規格"
relatedLessons:
  - "02-literature-evidence"
  - "03-context-knowledge-base"
  - "05-reproducibility-git"
---

## 定義

資料溯源描述每個研究資料集或衍生產物從哪裡來、何時取得、用哪個版本與參數經過哪些轉換，以及最後被哪個分析使用。

## 何時使用

- 合併多個資料來源或手動清理資料。
- 圖表與報告數值可能因資料更新而改變。
- 原始資料受限，不能直接放入版本控制。

## 快速做法

為每個資料產物記錄來源 ID、取得日期、授權或存取條件、版本或雜湊、轉換程式、參數、輸入與輸出路徑。手動決策另外保存理由與操作者。

## 最低驗收標準

- [ ] 原始資料可被識別，但敏感內容與憑證未被公開。
- [ ] 每個衍生資料能連回輸入、程式、參數與版本。
- [ ] 手動排除、補值或修正有明確紀錄。
- [ ] 圖表或結論能指出使用的資料版本。

## 常見陷阱

只記最後 CSV 檔名無法重建處理過程；「最新版」也不是可追溯的版本描述。
