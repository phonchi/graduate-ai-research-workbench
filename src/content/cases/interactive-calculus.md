---
title: 3D 曲面與導數反例互動教材
summary: 把抽象微積分概念轉成可操作的 3D 曲面與反例頁面，並以數學驗算和跨裝置測試守住正確性。
order: 10
stage: 驗證
difficulty: 技術
estimatedMinutes: 90
skills:
  - 任務規格
  - 反例檢查
  - 視覺驗證
tools:
  - 檔案型 Agent
  - Git
  - CLI
outputs:
  - 3D 曲面互動頁
  - 導數概念反例頁
  - 人工驗證紀錄
lastVerified: 2026-07-10
draft: false
sourceUrl: https://phonchi.github.io/nsysu-calculus2/static_files/presentations/surfaces_3d.html#sec-surfaces
sourceLicense: 本頁截圖由原互動頁作者 phonchi 提供並以 CC BY 4.0 收錄；原頁使用的第三方程式庫與素材仍依各自授權。
privacyReview: 案例只描述公開頁面與通用製作流程，不包含助教姓名、電子郵件、未公開題目或學生資料。
coverImage: /graduate-ai-research-workbench/images/cases/interactive-calculus.webp
evidence:
  - 公開 3D 曲面頁可操作並呈現曲面相關概念
  - 公開導數頁提供概念成立條件與反例的視覺對照
  - 來源清單明確將兩頁列為 Agent 製作互動教材與人工驗證案例
---

## 研究痛點

跨領域研究常需要呈現空間模型、參數變化與方法成立條件。靜態圖難以顯示這些關係；若只要求 AI「做一個漂亮動畫」，常會得到能動但數學敘述不精確的頁面，研究者也可能把單一示意狀態誤當成一般證據。本案例用微積分頁示範如何把互動視覺化當成可驗證的研究溝通產物。

## 授權輸入

輸入限於研究者可公開的定義、合成例題、公開頁面連結，以及自行撰寫的圖形規格。未取得授權的論文圖片、資料集與參與者紀錄不交給 Agent，也不放進公開成品。

## 任務規格

先列出每個互動元件要支援的學習目標、可調參數、初始狀態、數學不變量與錯誤狀態。3D 頁必須能讓使用者改變視角或參數；反例頁必須同時寫出命題、缺少的條件，以及反例如何推翻錯誤推論。

## 做法

1. 將定義、圖形、互動與文字解釋拆成獨立驗收項目。
2. 請 Agent 先做最小可用頁面，再逐一加入控制項與狀態提示。
3. 對代表性參數手算或用 CAS 交叉檢查，確認圖形與公式一致。
4. 以真實瀏覽器測試滑鼠、觸控、鍵盤與窄螢幕版面。

## 人工檢查點

研究者需確認符號定義、方法條件、反例邏輯與圖形範圍。尤其要檢查拖曳到邊界值時是否出現除以零、錯誤切線或誤導性的平滑連接；互動結果不能取代推導、統計檢驗或正式證明。

## 成果與證據

[3D 曲面互動教材](https://phonchi.github.io/nsysu-calculus2/static_files/presentations/surfaces_3d.html#sec-surfaces)提供公開可操作成品；[導數概念反例頁](https://phonchi.github.io/nsysu-calculus2/static_files/presentations/derivatives.html)則展示成立條件與反例的視覺對照。可將頁面載入、控制項反應、公式抽查與行動版截圖納入驗收紀錄。

## 常見失敗

- 只測預設參數，極端值一操作就破圖。
- 圖形正確但文字把必要條件說成充分條件。
- 3D 畫布在桌機正常，手機卻無法旋轉或遮住正文。
- 把動畫流暢度當成數學正確性的證據。

## 隱私與授權

本站只重製原作者授權的案例截圖，不搬運原頁全文或第三方素材。部署前移除參與者識別資訊、內部資料連結與分析追蹤識別碼，並確認外部字型、圖片和 JavaScript 套件的使用條款。

## 延伸挑戰

為反例頁加入「先預測、再顯示」模式與無障礙文字描述；為 3D 頁建立可重現的參數測試表，讓每次改版都能自動比對關鍵狀態。
