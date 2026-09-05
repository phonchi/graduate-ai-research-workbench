---
title: Subagent
summary: 把明確子任務交給獨立工作分身，讓主 agent 保留決策與驗證；可依工具支援搭配不同模型。
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
firstStep: 寫清楚子任務的來源、欄位、輸出與驗收條件，再請主 agent 判斷是否值得分工。
platformNames: [支援 subagent 的 agent 工具]
relatedLessons: [01-from-chat-to-agent, 03-context-and-indexes, 05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-09-05
draft: false
---

## 白話是什麼

Subagent 是主 agent 派出去的「分身」。它在獨立 context 裡讀大量材料或做一項審查，最後只把整理過的結論帶回主對話，避免把整個搜尋過程堆在你的桌面上。

## 什麼時候用

要搜尋很多檔案、比較多份資料、請另一個視角挑錯，或有數個互不依賴的子任務時適合。任務說明必須自我完備，包含背景、目標、範圍與輸出格式。

如果工具支援指定子模型，可以把較強模型用在研究問題、方案取捨、規劃與結果驗證；較低成本模型則處理指定文件的欄位擷取、格式整理或已寫清楚的局部修改。主模型應先定義驗收條件，不能把「自己判斷怎麼做」連同模糊需求一起丟出去。[Claude Code 支援指定 subagent 模型](https://code.claude.com/docs/en/sub-agents#choose-a-model)，但可用模型與設定會影響實際選擇；不要假設名叫 Explore 的分身一定使用便宜模型。

這種分工可能降低費用或減少主對話 context，卻不保證節省總 token。分身還要讀取背景、執行任務、回報，再由主模型整合；平行執行也要計入查核與重做時間。簡單到一輪就能完成的工作，通常不必拆分。見 [Claude Code 成本管理](https://code.claude.com/docs/en/costs#delegate-verbose-operations-to-subagents)。

## 不要拿它做什麼

需要你反覆查看中間過程、即時選擇方向，或高度依賴主對話隱含背景時，不適合直接派分身。分身也不代表結果自動正確；主 agent 仍要整合與驗證。

## 小型練習

把下面交辦句中的來源 ID、範圍與數量換成自己的任務，不必先學 dispatch 語法：

```text
請由主模型先規劃 D01、D03 的方法比較，定義欄位與驗收條件。
若工具支援指定模型，請確認後讓較低成本模型做以下子任務：
只讀指定版本的 Methods，擷取資料集、樣本數、切分方法與評估指標。
每項附頁碼；找不到就標缺漏，不從其他來源補猜。
只回傳最多 8 列比較表、疑點與來源位置，完整擷取結果放在我指定的位置。
遇到版本衝突、方法歧義，或必須擴大來源才能完成時，回報主模型決定。
主模型回查所有影響結論的數字與疑點，再完成解釋與驗收。
若無法指定子模型，請明說，改用兩段交接，不宣稱已降低模型費用。
```

這些升級條件讓分身知道何時停止擷取、交回判斷。也要確認實際使用模型與驗收結果，再用[使用習慣回顧模板](../../templates/usage-review/)比較用量與時間。前面的任務拆解可參考[規劃與追問指南](../../guides/research-skills/#plan)。

## 和其他工具的關係

Subagent 是這次任務的分工方式；Skill 是可重複使用的流程手冊；MCP 是連外部工具的協定。Subagent 可以使用 Skill 或 MCP，但本身不是其中任何一個。
