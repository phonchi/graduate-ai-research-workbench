---
title: 開工前先反問
summary: 不要求自己一次想完所有規格，先讓 AI 把缺少的條件整理成容易回答的選項。
order: 20
category: 交辦
applicableTasks: [read, write, experiment, present, publish, automate]
relatedTools:
  - ask-user-question
  - chatgpt
  - codex
  - claude-code
  - gemini-cli
templateBody: |
  在動工前，先檢查我的交辦是否有會明顯改變成果的模糊處。

  請遵守以下方式：
  - 最多先問 3 個關鍵問題。
  - 能用 2 至 3 個互斥選項回答時，請提供選項並標出你的建議。
  - 不要問能從現有檔案、規格或專案慣例查到的事情，先自行檢查。
  - 若我已提出方案，請檢查它依賴的前提；必要時追問「有什麼證據」「什麼反例會推翻它」（grill-me）。
  - 若剩下的模糊處影響很小，採用合理預設並明確告訴我。
  - 等我回答會改變方向的問題後，再開始修改或執行。
  - 將確認的目標、範圍、交付物與驗收條件整理成短 spec，附上 eval 的輸入與預期結果，供執行者接手。

  我的任務：
  [貼上任務]
lastVerified: 2026-09-05
draft: false
---

## 用法

接在任何任務描述後面。工具若有 `AskUserQuestion` 類功能，可直接使用；沒有也沒關係，這段文字本身就能要求相同行為。

Grill-me 在這裡指針對假設與取捨追問的方式，不是每個工具都有的固定指令。追問得到足以決策的答案就應收斂，將結果交給 spec 與 eval。可參考[規劃與追問示範](../../guides/research-skills/#plan)。

## 完成後你會得到什麼

一組只針對高影響模糊處的短問題，先把方向、範圍或輸出差異確認清楚，再讓 AI 開工。

## 不適用情境

不適合每一個微小步驟都要求確認，否則會讓 Agent 無法連續完成已授權、低風險的工作。
