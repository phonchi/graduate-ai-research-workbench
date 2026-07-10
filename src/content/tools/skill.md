---
title: Skill
summary: 把跑順的特定流程整理成可重複載入的工作手冊。
order: 11
kind: 工作方式
level: 進階
aliases: [Agent Skill, SKILL.md, 工作手冊, 實驗室手冊]
capabilities:
  localFiles: depends
  commands: depends
  sourceCitations: depends
  webAccess: depends
  backgroundTasks: depends
  humanApproval: depends
bestFor: [重複任務流程, 固定 QA 清單, 保存踩坑與模板]
avoidFor: [第一次做的任務, 所有專案都適用的通用規矩, 連接外部服務]
firstStep: 本站採用的起點是先有一個跑順的真實案例，再用不同輸入盲測；通過後才整理 Skill 草稿。
platformNames: [Claude Code Skills, Codex Skills, Agent Skills]
officialUrl: https://agentskills.io/
relatedLessons: [05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 白話是什麼

Skill 是給 agent 的「可重複工作手冊」。它記錄某類任務的標準步驟、踩過的坑與 QA 清單，需要時才載入，讓下次不用從頭口頭教一次。

## 什麼時候用

本站不採固定次數門檻。先保留一個跑順的真實案例，再用不同輸入盲測；原案例與盲測都能依同一套步驟與檢查點驗收時，再整理成 Skill。這是本站為了降低流程過早封裝所採用的教學條件，不是 Agent Skills 官方規格。

## 不要拿它做什麼

不要在還沒跑過流程時憑空設計一本大全，也不要把所有長期偏好塞進 Skill。每次都要遵守的規矩應放 `AGENTS.md` 或 `CLAUDE.md`；只做一次的需求留在當次 prompt。

## 小型練習

把成功案例與盲測紀錄交給主 agent：「只整理兩者共同成立的流程，草擬觸發情境、步驟、踩坑、QA 與紅線；差異處列為待確認，先不要安裝。」

## 和其他工具的關係

Skill 管「遇到某類任務怎麼做」；MCP 管「如何接上外部資料或服務」；subagent 管「這次工作怎麼拆到獨立 context」。三者可一起用，但解決的問題不同。
