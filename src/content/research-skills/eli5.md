---
title: "eli5"
summary: "用大圖與少量文字，向其他領域的同學解釋陌生概念。"
order: 110
categories: ["visualize"]
kind: "Claude Plugin・Skill"
aliases: ["Explain Like I’m Five", "圖解入門"]
tags: ["視覺解說", "跨領域", "教學", "HTML"]
platforms: ["Claude Code"]
sourceUrl: "https://github.com/anthropics/claude-plugins-community/tree/main/eli5"
draft: false
---

### 準備什麼

準備一個要解釋的概念、讀者背景與可信的參考材料。例如要向沒有機器學習背景的同學介紹過度擬合，就先附上課堂筆記。這個來源提供 Claude 社群 plugin 與 /eli5 入口，可交辦以圖像為主的 HTML 解說。

### 試著這樣交辦

```text
請用 eli5 向沒有機器學習背景的同學解釋過度擬合。
依附上的課堂筆記做一份大圖、少字的 HTML。
用一個生活比喻幫助理解，並簡短指出比喻在哪裡不適用。
若用示意曲線，請明確標成示意，不要假裝是實驗結果。
```

### 完成後看什麼

完成後請一位新手看圖，再用自己的話說出核心概念。檢查生活比喻是否造成誤解，以及示意圖是否清楚標示。若讀者還需要推導或正式定義，可以在圖解後附上課堂材料，讓他從看懂圖像接著讀完整說明。
