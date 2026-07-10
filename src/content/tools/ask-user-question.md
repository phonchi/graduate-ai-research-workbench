---
title: AskUserQuestion
summary: Claude Code 的內建提問工具；共通習慣是開工前先把缺的規格問回來。
order: 9
kind: 功能
level: 入門
aliases: [Ask User Question, 開工前反問, 澄清問題]
capabilities:
  localFiles: no
  commands: no
  sourceCitations: no
  webAccess: no
  backgroundTasks: no
  humanApproval: yes
bestFor: [補齊模糊規格, 讓使用者選擇方案, 高影響決策前確認]
avoidFor: [可從檔案自行查明的問題, 每一步都停下來問, 用提問逃避合理判斷]
firstStep: 在 prompt 最後加上「動工前先問我最多三個會影響結果的問題」。
platformNames: [Claude Code AskUserQuestion]
officialUrl: https://code.claude.com/docs/en/tools-reference
relatedLessons: [02-ask-before-action]
lastVerified: 2026-07-10
draft: false
---

## 白話是什麼

`AskUserQuestion` 是 Claude Code 的內建提問工具，不是所有 AI 都有同名按鈕。真正要學的是「先反問、再動手」：把你漏掉的目標、範圍或選擇問完整，避免 agent 自己腦補。

## 什麼時候用

當兩種做法都合理，而且選擇會大幅改變成果時使用，例如研究對象、輸出格式、是否改動原資料或 A/B 版本差異。問題最好附少量、互斥的選項。

## 不要拿它做什麼

不要詢問 agent 能從 repo、既有文件或工作區規則查到的事，也不要每改一行就反問。太多低影響問題會中斷工作，反而把責任全丟回使用者。

## 第一次怎麼開始

沒有同名功能也沒關係，直接用等價 prompt：「請不要直接動工。先列出最多三個會實質影響成果、且無法從現有資料查明的問題；提供選項與你的建議。」

## 和其他工具的關係

它補的是六要素規格裡的缺口，不是 Skill、MCP 或 subagent。Skill 固定流程，MCP 連外部工具，subagent 拆工作；`AskUserQuestion` 只負責在關鍵決策前取得人的答案。
