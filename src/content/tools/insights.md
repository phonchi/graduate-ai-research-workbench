---
title: /insights
summary: Claude Code 的使用回顧指令；共通做法是定期檢查自己的交辦習慣。
order: 10
kind: 功能
level: 入門
aliases: [insights command, 使用回顧, 交辦習慣回顧]
capabilities:
  localFiles: no
  commands: no
  sourceCitations: no
  webAccess: no
  backgroundTasks: no
  humanApproval: no
bestFor: [回顧常見模糊點, 找出重複摩擦, 決定哪些習慣值得固定]
avoidFor: [驗證研究結論, 取代本次成果檢查, 未審核就自動改寫工作守則]
firstStep: 先在目前工具確認是否支援；不支援就改用等價回顧 prompt。
platformNames: [Claude Code /insights]
officialUrl: https://code.claude.com/docs/en/commands
relatedLessons: [05-challenge-and-review, 06-build-your-toolbox]
lastVerified: 2026-07-10
draft: false
---

## 回顧自己怎麼交辦

`/insights` 是 Claude Code 的使用回顧指令。它可以作為檢討合作方式的入口：哪些條件經常漏說、哪裡讓 Agent 反覆猜、哪些要求下次值得提前交代。

完成幾次相似任務，或總卡在同一種誤解時，再回顧通常比較有收穫。例如論文比較表常混淆人數與影像數，就值得把「先分清計數單位」留下來。

## 可以先試

若目前工具沒有這個指令，也能直接問：

```text
回顧我們整理三篇論文的過程。
哪些要求已經清楚，哪些問題曾讓你猜測？
請指出值得保留的工作慣例，以及只適用於本次的資訊。
```

回顧後，選真正會重複的要求寫進 `AGENTS.md` 或 `CLAUDE.md`，不要照單全收。某類工作已有清楚步驟時，再考慮整理成 [Skill](../skill/)。成果本身是否正確，仍要回到原文與實際輸出檢查。
