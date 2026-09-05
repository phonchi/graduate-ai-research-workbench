---
title: "Archify"
summary: "依程式或系統描述畫出架構與資料流，說明研究軟體如何運作。"
order: 90
categories: ["visualize"]
kind: "Skill・Node.js 工具"
aliases: ["Archify", "架構圖"]
tags: ["資料流", "架構", "系統圖", "SVG"]
platforms: ["Cursor", "Claude Code", "Codex CLI", "OpenCode"]
sourceUrl: "https://github.com/tt-a1i/archify"
draft: false
---

### 準備什麼

提供程式庫或清楚的系統描述，並指定圖要回答的問題。例如想讓新同學看懂分析專案，可以聚焦「原始資料經過哪些處理，最後存到哪裡」。需要 Node.js 繪圖工具；圖中的節點與關係會以結構化資料保存，便於之後修改。

### 試著這樣交辦

```text
請用 Archify 畫出這個分析專案從原始資料到結果檔的資料流。
先讀程式，再標示輸入、轉換、儲存位置與外部依賴。
只畫有依據的關係，未確認部分另列問題。
交付可單獨開啟的 HTML、SVG 與結構化來源。
```

### 完成後看什麼

完成後開啟 HTML 與匯出圖，沿著每個箭頭對照程式或系統說明，核對輸入、輸出、方向與標籤。把尚未確認的關係留成問題。保留圖面及結構化來源，之後程式改動時，就能一起更新相關節點。
