---
title: Subagent
summary: 主 agent 派出的獨立工作分身，適合大量搜尋、平行比較與第二視角審查。
order: 13
kind: 工作方式
level: 進階
aliases: [sub-agent, 分身, 獨立 context, agent delegation]
capabilities:
  localFiles: depends
  commands: depends
  sourceCitations: depends
  webAccess: depends
  backgroundTasks: depends
  humanApproval: depends
bestFor: [大範圍搜尋, 獨立審查, 多份材料平行比較]
avoidFor: [需要即時共同決策, 背景沒有寫清楚的任務, 很小且不可切分的工作]
firstStep: 對主 agent 說明想要獨立審查或大量搜尋，要求最後只整合結論回來。
platformNames: [支援 subagent 的 agent 工具]
relatedLessons: [01-from-chat-to-agent, 03-context-and-indexes, 05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 白話是什麼

Subagent 是主 agent 派出去的「分身」。它在獨立 context 裡讀大量材料或做一項審查，最後只把整理過的結論帶回主對話，避免把整個搜尋過程堆在你的桌面上。

## 什麼時候用

要搜尋很多檔案、比較多份資料、請另一個視角挑錯，或有數個互不依賴的子任務時適合。任務說明必須自我完備，包含背景、目標、範圍與輸出格式。

## 不要拿它做什麼

需要你反覆查看中間過程、即時選擇方向，或高度依賴主對話隱含背景時，不適合直接派分身。分身也不代表結果自動正確；主 agent 仍要整合與驗證。

## 小型練習

不必先學 dispatch 語法，直接說：「請對這三份材料做獨立比較；若適合請自行分工，最後只帶回差異、風險與建議，並標明仍需人工確認之處。」

## 和其他工具的關係

Subagent 是這次任務的分工方式；Skill 是可重複使用的流程手冊；MCP 是連外部工具的協定。Subagent 可以使用 Skill 或 MCP，但本身不是其中任何一個。
