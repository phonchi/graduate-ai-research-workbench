---
title: "paper-fetch"
summary: "依 DOI 取得可用的論文全文，留下逐篇下載狀態。"
order: 50
categories: ["read"]
kind: "Python 工具・Skill"
aliases: ["DOI 下載", "論文下載"]
tags: ["全文PDF", "DOI", "文獻取得"]
platforms: ["Python", "Agent Skills"]
sourceUrl: "https://github.com/drpwchen/paper-fetch"
draft: false
---

### 準備什麼

準備 DOI 清單、PDF 存放資料夾與 Python 環境。開放取得管道需要聯絡 email；若要使用出版社 API 或機構代理，也要提供已設定好的存取方式。工具會依序嘗試可用管道，無法取得全文時留下可供自行查找全文的連結。

### 試著這樣交辦

```text
請用 paper-fetch 處理 dois.txt，將取得的全文存到 papers/。
先嘗試開放取得來源；只使用我已設定且有權使用的管道。
逐篇記錄 DOI、來源與成功或失敗原因，無法取得時留下手動連結。
不要把摘要網頁當成 PDF，也不要替未下載的論文寫摘要。
```

### 完成後看什麼

完成後逐篇查看取得狀態，抽查 PDF 能否開啟、標題與 DOI 是否相符。未下載的論文要繼續保留在清單，方便後續處理。取得全文後，再交辦摘要與比較，讓每項閱讀成果都能回到真正拿到的文件。
