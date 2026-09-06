---
title: 今天先做到這裡：讓下一次對話接得上
summary: 用一張交接便條留下研究目標、完成事項、檔案位置與下一步，換個對話也能接著做。
order: 7
part: 實作
difficulty: 入門
estimatedMinutes: 20
learningOutcomes:
  - 用交接便條記錄研究進度、已做的決定與下一步。
  - 使用 handoff Skill 整理對話，並將交接文件保存在自己的工作資料夾。
  - 在新對話中核對檔案與待辦事項，接續完成一個小任務。
prerequisites:
  - 03-context-and-indexes
  - 04-checkpoints-and-tools
references:
  - title: Matt Pocock handoff Skill
    url: https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md
    type: official
    note: 將目前對話整理成給下一個 Agent 的交接文件，引用既有成果並聚焦下次工作。
  - title: Matt Pocock Skills
    url: https://github.com/mattpocock/skills
    type: official
    note: handoff 所在的技能集合，提供技能用途與安裝入口。
keyTerms:
  - handoff
  - 交接便條
  - 檔案位置
  - 下一步
relatedTools:
  - codex
  - claude-code
  - skill
relatedCases: []
lastVerified: 2026-09-05
draft: false
featured: true
---

## 一、今天先停在這裡，明天從哪裡接？

前幾課已練過比較與檢查。這一課回到只讀完前兩篇、準備暫停的時刻：D01、D02 已整理在比較表，D03 留到明天，練習怎麼讓下次接得上。

如果最後只說「明天繼續」，下次開新對話時，你還得重新解釋：比較什麼、讀到哪裡、表格存在哪裡，以及有哪些問題尚未確認。第3課談過，[對話中的 context 不是可靠的永久記憶](../03-context-and-indexes/)。

**交接（handoff）就是把下一次工作需要的資訊留下來。** 接手的可以是明天的自己、同學，或新對話裡的 Agent。一張短便條就能開始，重點是讓對方找到材料，知道下一步要做什麼。

## 二、留下能找到檔案的交接便條

下面是一個教學情境。假設你的工作資料夾已有這些檔案；實際練習時，換成自己的論文與檔名：

```text
papers/
  D01.pdf
  D02.pdf
  D03.pdf
notes/
  sources.md
  comparison.md
HANDOFF.md
```

`papers/D03.pdf` 表示 `papers` 資料夾裡的 D03.pdf；`notes/sources.md` 是來源清單，記錄三篇論文的標題與檔案位置；`notes/comparison.md` 是正在填寫的比較表。`.md` 是可以用文字編輯器開啟的 Markdown 文件。

交接便條可以寫成這樣：

```markdown
# 三篇論文比較：交接便條

目標：比較三篇論文使用的資料、研究方法與主要限制。

已完成：D01、D02 已讀完，整理在 notes/comparison.md。
來源位置：notes/sources.md；原文在 papers/D01.pdf、D02.pdf、D03.pdf。
已做的決定：比較表分開記錄受試者人數與影像張數，避免混用。
待確認：D02 的排除條件還需要回原文核對；D03 尚未閱讀。
下一步：先讀 papers/D03.pdf，在比較表補上 D03，附原文頁碼。
```

這份便條引用已有的比較表，不必把整張表重貼一次。寫完後打開所列檔案，確認位置正確；「已完成」與「待確認」也要符合實際進度。

## 三、請 Agent 幫忙整理收尾

不必每次從空白頁開始。準備結束工作時，可以直接交辦：

```text
今天先做到這裡。請依目前對話與現有檔案整理交接便條，
寫入工作資料夾的 HANDOFF.md：
留下目標、完成事項、已做的決定、待確認問題、檔案位置與下一步。
已有內容請引用檔案位置，不要整段重抄；不確定的事標成待確認。
下次先讀 D03，補齊 notes/comparison.md。
完成後告訴我交接文件存在哪裡。
```

讀一下產出的便條，尤其看 Agent 有沒有把「討論過」寫成「做完了」，或把你的暫定想法寫成已確認的決定。下一步最好小到能立刻開始，例如「讀 D03 並補一列表格」，而不是「繼續研究」。

## 四、用 handoff Skill 整理一次交接

上一節是直接交辦的寫法，這一節介紹現成技能，兩種方式擇一即可。Skill 是供 Agent 讀取的工作指引。Matt Pocock 的 [handoff](../../guides/research-skills/#skill-handoff) 專門把目前對話整理成給下一個 Agent 的交接文件。安裝並讓工具載入這份技能後，可以指定下次的工作重點，例如：

```text
請使用 handoff，整理這次三篇論文比較的進度。
下次對話先閱讀 D03，再補齊比較表。
```

在提供斜線指令入口的環境，也可使用 `/handoff 下次先閱讀 D03，再補齊比較表`。想了解如何選用現成技能，可回看[第6課](../06-build-your-toolbox/)。

這份技能會把文件寫到**作業系統的暫存目錄**，引用已有文件或成果的位置，並列出建議下一個 Agent 使用的技能。它也會移除密鑰、密碼與個人識別資訊。[handoff 原始說明](https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md)

為了下次容易找到，本課再加一個保存動作：

```text
請把剛才產生的交接文件另存到目前工作資料夾的 HANDOFF.md，
並回報完整位置。若已有舊交接便條，另存新檔並告訴我檔名。
```

暫存目錄可能被清理；保存後開啟文件，確認內容完整，也確認列出的技能適合下一步工作。

## 五、開新對話，真的接一次

在同一個工作資料夾開新對話，把下面的方括號換成剛才回報的實際位置。若另存了新檔，使用新的檔名，避免讀到舊便條：

```text
請先讀 [貼上最新交接文件的完整位置]，以及它引用的來源清單與比較表。
用三句話說明研究目標、目前進度與下一步。
確認檔案都找得到後，先閱讀 papers/D03.pdf，
在 notes/comparison.md 補上 D03 的資料、方法與限制，附原文頁碼。
若交接便條與檔案內容不一致，先指出差異。
```

這次練習只看三件事：新對話能否找到材料、能否分清完成與待確認事項，以及能否接著完成 D03 那一列。完成後，更新交接便條，讓下一次看到的是新的進度。

可以從[交接便條範本](../../templates/handoff/)開始填寫。要整理更多文獻時，沿用[第 3 課的來源表與索引](../03-context-and-indexes/)，讓接手者找得到原文。

**今天留下目標、檔案位置與下一步，明天就能從做過的地方繼續。**
