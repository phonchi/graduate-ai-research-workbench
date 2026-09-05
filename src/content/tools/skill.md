---
title: Skill
summary: 按任務選用現成工作手冊，也能把驗證過的流程整理成自己的 Skill。
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
avoidFor: [未經驗證就自行封裝流程, 所有專案都適用的通用規矩, 連接外部服務]
firstStep: 先找符合任務的現成 Skill，讀清楚用途、需要的工具與限制；若要自己寫，再從成功案例與盲測紀錄整理。
platformNames: [Claude Code Skills, Codex Skills, Agent Skills]
officialUrl: https://agentskills.io/
relatedLessons: [05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-09-05
draft: false
---

## 白話是什麼

Skill 是給 agent 的「可重複工作手冊」。它記錄某類任務的標準步驟、踩過的坑與 QA 清單，需要時才載入，讓下次不用從頭口頭教一次。

## 什麼時候用

第一次做任務也可以選用合適的現成 Skill。先查看來源、觸發情境、工具需求與限制，再拿小份資料試跑，依任務的驗收條件檢查結果。可從[研究工作各階段的技能指南](../../guides/research-skills/#plan)找到起點。

若要自行封裝，本站不採固定次數門檻。先保留一個跑順的真實案例，再用不同輸入盲測；原案例與盲測都能依同一套步驟與檢查點驗收時，再整理成 Skill。這是本站為了降低流程過早封裝所採用的教學條件，不是 Agent Skills 官方規格。

[Agent Skills 規格](https://agentskills.io/specification#progressive-disclosure)將載入分成簡短名稱與描述、啟用後的 `SKILL.md` 指令、需要時才讀的參考檔案。這有助於按需提供內容，但 Skill 的描述與已載入指令仍會占用 context；不同工具的實際支援也要確認。

## 不要拿它做什麼

不要在還沒跑過流程時憑空設計一本大全，也不要把所有長期偏好塞進 Skill。每次都要遵守的規矩應放 `AGENTS.md` 或 `CLAUDE.md`；本次目標、來源版本與驗收條件放在當次 spec 或 prompt。現成 Skill 也不能取代這些任務條件。

## 小型練習

把成功案例與盲測紀錄交給主 agent：「只整理兩者共同成立的流程，草擬觸發情境、步驟、踩坑、QA 與紅線；差異處列為待確認，先不要安裝。」

## 和其他工具的關係

Skill 管「遇到某類任務怎麼做」；MCP 管「如何接上外部資料或服務」；subagent 管「這次工作怎麼拆到獨立 context」。三者可一起用，但解決的問題不同。
