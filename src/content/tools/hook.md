---
title: Hook
summary: 在指定事件發生時執行動作，例如改檔後檢查，或工作結束時通知你。
order: 14
kind: 功能
level: 進階
aliases: [Hooks, 事件觸發, 自動通知]
capabilities:
  localFiles: depends
  commands: depends
  sourceCitations: no
  webAccess: depends
  backgroundTasks: depends
  humanApproval: depends
bestFor: [完成通知, 改檔後固定檢查, 減少重複操作]
avoidFor: [取代研究判斷, 執行來源不明的命令, 沒有明確觸發時機的流程]
firstStep: 先選一個簡單事件，例如 Agent 結束工作時發出本機通知，再用小任務確認。
platformNames: [Claude Code hooks]
officialUrl: https://code.claude.com/docs/en/hooks-guide
relatedLessons: [04-checkpoints-and-tools, 06-build-your-toolbox]
lastVerified: 2026-09-05
draft: false
---

## 事件發生時，自動做一件事

Hook 把事件和動作連起來。例如 Agent 改完檔案後執行既有格式檢查，或結束工作時通知你，省去反覆盯著畫面的時間。[Claude Code 的 Hook 指南](https://code.claude.com/docs/en/hooks-guide)提供事件、命令與通知的設定方式。

## 可以先試

```text
請幫這個練習專案設定一個 Hook：
當 Agent 結束工作時，發出本機通知。
先確認目前平台支援的事件與通知方式，說明要修改的設定。
設定後用一個小任務測試，確認收到通知。
```

通知只表示工作到了指定階段，內容是否正確仍要打開檔案看。改檔後自動檢查也適合已有固定命令的專案；先限制適用檔案，避免每改一行就重跑昂貴的完整實驗。

## 和規則、Skill、Subagent 的差別

規則告訴 Agent 要遵守什麼；Skill 說明某類工作怎麼做；Subagent 把工作交給另一個分身。Hook 則指定「什麼時候執行哪個動作」，四者可以搭配。

Hook 可以執行命令，也有呼叫模型判斷的類型，不能一概視為不使用模型額度。安裝前讀清楚它會執行什麼，以及能存取哪些資料；只採用你理解且需要的動作。
