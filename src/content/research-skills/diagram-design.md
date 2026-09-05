---
title: "diagram-design"
summary: "將方法步驟與概念關係整理成可直接開啟的 HTML 與 SVG 圖。"
order: 100
categories: ["visualize"]
kind: "Skill"
aliases: ["流程圖設計", "概念圖"]
tags: ["流程圖", "方法圖", "HTML", "SVG", "Mermaid"]
platforms: ["Claude Code", "Codex", "Pi"]
sourceUrl: "https://github.com/cathrynlavery/diagram-design"
draft: false
---

### 準備什麼

提供方法文字、既有圖稿或明確的關係清單，再說明讀者與使用尺寸。若圖要放入講義，可以指定白底與印刷大小；已有 Mermaid 或 draw.io 圖時，也能作為重繪材料。先確認要表達的內容，再讓技能安排版面。

### 試著這樣交辦

```text
請用 diagram-design 將這份方法說明畫成流程圖。
每個節點都需對應原文步驟，保留分支條件與回到前一步的路徑。
圖會放在白底講義，請交付可直接開啟的靜態 HTML＋SVG，
並列出原文仍不清楚、需要作者確認的關係。
```

### 完成後看什麼

完成後在瀏覽器開啟 HTML，縮到預定尺寸檢查文字是否可讀。沿著箭頭走過各條分支，確認條件、順序與回到前一步的路徑都符合原文。未說清楚的關係應列出來請作者補充，讓圖面與方法敘述保持一致。
