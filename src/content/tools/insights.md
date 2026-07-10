---
title: /insights
summary: Claude Code 的使用回顧指令；共通做法是定期檢查自己的交辦習慣。
order: 10
kind: 功能
level: 入門
aliases: [insights command, 使用回顧, 交辦習慣回顧]
canEditFiles: no
bestFor: [回顧常見模糊點, 找出重複摩擦, 決定哪些習慣值得固定]
avoidFor: [驗證研究結論, 取代本次成果檢查, 未審核就自動改寫工作守則]
firstStep: 先在目前工具確認是否支援；不支援就改用等價回顧 prompt。
platformNames: [Claude Code /insights]
officialUrl: https://code.claude.com/docs/en/commands
relatedLessons: [05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 白話是什麼

`/insights` 是 Claude Code 的指令名稱，不是每個 AI 都支援。投影片真正強調的是「精進迴圈」：回顧自己怎麼交辦、哪裡讓工具一直猜，再把有效習慣留到下一次。

## 什麼時候用

完成一批相似任務、反覆卡在同一處，或準備整理工作守則與 Skill 前使用。它看的不是單一答案，而是合作方式中有哪些條件老是漏寫。

## 不要拿它做什麼

它不能證明程式、數據或論文內容正確，也不該直接替你永久改規則。回顧建議只是候選項，必須確認真的會重複、沒有互相衝突，再寫回工作守則。

## 第一次怎麼開始

若工具沒有 `/insights`，使用等價 prompt：「回顧我最近的交辦方式：哪些條件清楚、哪些地方需要你猜、哪些慣例值得寫進工作守則、哪些流程已重複到可整理成 Skill？」

## 和其他工具的關係

回顧結果可更新 `AGENTS.md` 或 `CLAUDE.md` 的長期規矩，也可提示某流程適合整理成 Skill；但 `/insights` 本身不是規則檔，也不是 Skill 產生器。
