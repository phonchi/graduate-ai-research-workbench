---
title: 先存檔再放手：守則、Git 與安全更新
summary: 把 AGENTS.md／CLAUDE.md 當工作守則，用 Git 建存檔點，再透過 GitHub 留下可協作、可追溯與可回復的修改歷史。
order: 4
part: 實作
difficulty: 實作
estimatedMinutes: 25
slideRefs: [8, 9, 17, 23, 24, 25, 32]
keyTerms:
  - AGENTS.md
  - CLAUDE.md
  - Git
  - GitHub
  - commit
  - push
  - 存檔點
relatedTools:
  - codex
  - claude-code
  - gemini-cli
  - agents-md
  - claude-md
  - git-github
relatedCases:
  - course-site-pages
  - programmatic-slides
lastVerified: 2026-07-10
draft: false
featured: true
---

## 研究生日常

口試前兩天，你請 Agent 更新研究網站和簡報。它確實改快了，但一次動了 20 個檔案；同門也剛更新資料說明；最後誰覆蓋了誰、公開站現在是哪一版，全都說不清楚。

讓 Agent 動手之前，先準備兩樣東西：一張工作守則，以及一個能回去的存檔點。前者告訴它怎麼做，後者讓你在做錯時能救回來。

## 投影片的核心比喻

**AGENTS.md／CLAUDE.md 像新助理的入職須知**：寫一次，之後每個任務沿用。內容不是程式語法，而是你的研究慣例，例如只改副本、數字需回到來源、動多個檔案前先報告範圍。

**Git 像遊戲存檔點與時光機**：每完成一段就留下版本，改壞時能回到先前狀態。**GitHub 像共享的版本歷史與發布入口**：把本機存檔推上去，合作者能在同一條歷史接力，網站也能依設定自動更新。

## 正式工具名詞

- **AGENTS.md**：Codex 等 Agent 可讀取的工作區指令檔，通常放在專案或上層資料夾。
- **CLAUDE.md**：Claude Code 使用的專案指令檔，目的同樣是保存長期慣例與邊界。
- **Git**：在本機記錄檔案版本。一次有意義的存檔稱為 **commit**。
- **GitHub**：託管 Git 儲存庫與協作流程的平台。把本機提交送到遠端稱為 **push**。

Git 與 GitHub 不是同一個東西；沒有上網也能先用 Git 存版本。也別把「推送成功」當成「公開成果正確」，部署後仍要打開真正網址檢查。

## 直接試一次

先請 Agent 讀狀態，不要立刻發布：

```text
請先讀取 AGENTS.md 或 CLAUDE.md，並檢查目前 Git 狀態。
先回報：
1. 哪些是我原本尚未提交的修改；
2. 這次任務預計修改哪些檔案；
3. 會執行哪些檢查。
不要覆蓋既有修改，也不要推送。等我確認後再動工。
```

完成一個小段落後，再給清楚的發布指令：

```text
請檢視這次差異，只提交與「更新方法頁」有關的檔案。
提交前執行既有建置與連結檢查；若失敗就停止並回報。
提交訊息要說清楚改了什麼。推送後等待部署完成，
最後打開公開網址抽查方法頁、導覽與圖片。
```

第一次練習請用不含未公開資料的小專案，或建立副本。密鑰、受試者資料、審稿文件與未公開結果不要放進公開儲存庫。

## 真實案例怎麼看

[從課程網站到研究專案發布](/graduate-ai-research-workbench/cases/course-site-pages/)完整呈現存檔、推送、自動部署與公開網址抽查的接力；[程式化簡報](/graduate-ai-research-workbench/cases/programmatic-slides/)則示範把簡報來源也納入版本歷史，避免手工複製出現多個真相版本。

## 先避開三個坑

1. **看到工作區有修改就全部提交**：先分清楚哪些是使用者原本的工作。
2. **把 Git 當雲端備份按鈕**：commit 要小而有意義，訊息要能說明這一版完成什麼。
3. **部署綠燈就收工**：從公開網址再查頁面、資產與子路徑。

## 一句帶走

**工作守則讓 Agent 知道界線，Git 讓每一步能回頭，GitHub 讓團隊安全接力與發布。**
