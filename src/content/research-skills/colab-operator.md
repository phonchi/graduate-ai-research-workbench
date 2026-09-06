---
title: "colab-operator"
summary: "在 Google Colab 執行研究程式，將結果與執行紀錄存回本機。"
order: 60
categories: ["experiment"]
kind: "Skill・CLI"
aliases: ["Google Colab", "Colab CLI", "遠端運算"]
tags: ["GPU", "Notebook", "實驗", "執行紀錄"]
platforms: ["Linux", "macOS", "Google Colab"]
sourceUrl: "https://github.com/googlecolab/google-colab-cli/blob/main/skills/colab-operator/SKILL.md"
draft: false
---

### 準備什麼

先安裝 Colab CLI 並登入，準備要執行的程式、需要的套件、資料位置與結果資料夾。CLI 支援 Linux 與 macOS；可用的 GPU 或 TPU 依帳戶權限與配額而定。第一次可先交辦一個很小的試跑，確認資料與輸出都找得到。

### 試著這樣交辦

```text
請用 colab-operator 執行已核准的 smoke_test.py。
依我指定的運算資源建立本次 session，先核對環境和輸入資料。
將參數、執行紀錄、結果與輸出 Notebook 保存到本機 results/。
下載後確認檔案可讀，再停止本次建立的 session；失敗也保留紀錄。
```

### 完成後看什麼

完成後打開回存的結果與 Notebook，確認參數、輸入和執行環境能對得上。失敗時也要保存執行紀錄，方便定位問題。最後確認本次建立的運算環境已停止；程式結束後，仍在執行的運算環境會繼續使用計算資源。

延伸說明：[Colab CLI 平台與功能說明](https://github.com/googlecolab/google-colab-cli)。
