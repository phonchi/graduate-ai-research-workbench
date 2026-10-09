export const researchWorkflow = [
  {
    id: 'question',
    title: '探索研究問題',
    summary: '把初步興趣整理成有範圍、能查證的問題。',
    prepare: '先寫下你對問題的理解、想研究的對象，以及手上的時間與材料。不必等到想得很完整才開始。',
    assistance: '請 AI 反問模糊之處、提出可能的反例，幫你比較不同問題的範圍。',
    check: '研究價值與可行性由你判斷。回到文獻確認已知成果，不能把 AI 說「很少人研究」當成研究缺口的證據。',
    prompt: `我的初步研究問題是：[寫下問題]。
我目前的理解、研究對象與資源限制是：[填入背景]。
請先逐題反問我，釐清範圍、可驗證性與尚未確認的前提。
先不要替我改寫題目；把需要回到文獻查證的事項另外列出。
等條件釐清後，再比較兩種可行的問題範圍及各自取捨。`,
    links: [
      { label: 'grill-me：用追問釐清想法', route: '/guides/research-skills/', hash: 'skill-grill-me' },
      { label: '開工前先反問', route: '/templates/ask-before-action/' },
      { label: '六要素交辦單', route: '/templates/six-part-brief/' },
    ],
  },
  {
    id: 'search',
    title: '文獻檢索與來源驗證',
    summary: '拆解關鍵字，找回每筆書目與真正的全文。',
    prepare: '準備研究問題、主要概念、已知文獻與預計使用的資料庫。寫下搜尋日期、檢索式與篩選條件。',
    assistance: '請 AI 擴展中英文關鍵字、草擬檢索式，或依已確認的 DOI 取得有權使用的全文。',
    check: '在資料庫實際測試語法，核對篇名、作者、年份與 DOI。取得全文不代表它支持你的論點，還要閱讀相關段落。',
    prompt: `我的研究問題是：[填入問題]，預計使用的資料庫是：[填入名稱]。
已知的相關文獻與概念是：[填入已確認的來源]。
請拆解主要概念，列出中英文同義詞，並草擬檢索式。
標示需要依資料庫確認的語法，以及可能漏掉或誤收的研究。
提供搜尋紀錄欄位；尚未實際搜尋或驗證的書目請明說，不要捏造。`,
    links: [
      { label: 'paper-fetch：取得論文全文', route: '/guides/research-skills/', hash: 'skill-paper-fetch' },
      { label: '來源與位置筆記', route: '/templates/context-cache-index/' },
    ],
  },
  {
    id: 'reading',
    title: '文獻閱讀與知識整理',
    summary: '比較方法與限制，讓筆記能回到原文核對。',
    prepare: '選定可使用的全文，保留書目、版本與檔案位置，再決定比較欄位。先確認材料能否上傳到所選工具。',
    assistance: '請 AI 依欄位擷取內容、解釋陌生名詞，並整理不同研究之間的相同處與差異。',
    check: '親自回查重要段落、數值與單位。區分原文說法和你的推論，缺值與矛盾要保留，不能替作者補猜。',
    prompt: `請比較我提供的三篇公開論文：[填入檔案或來源]。
先確認是否讀得到全文，再依研究問題、資料來源、方法、結果與限制整理表格。
每項附檔名與頁碼或章節；原文未交代時註明，不自行補猜。
分開列出原文支持的內容、你的解釋，以及仍待我回查的問題。
不要在資料條件不同時直接替方法排名。`,
    links: [
      { label: 'NotebookLM：依指定來源問答', route: '/tools/notebooklm/' },
      { label: 'Context 與來源索引', route: '/learn/03-context-and-indexes/' },
      { label: '挑錯與獨立檢查', route: '/templates/independent-review/' },
    ],
  },
  {
    id: 'analysis',
    title: '研究設計、程式與分析',
    summary: '先訂方法與判準，再委派可檢查的分析工作。',
    prepare: '整理研究問題、資料取得方式、預定方法與分析假設。保留原始資料副本，練習或除錯可先提供合成資料。',
    assistance: '請 AI 檢查設計遺漏、協助除錯、整理分析程式，並留下參數、環境與執行紀錄。',
    check: '你要能說明方法為何適用、資料是否有偏誤，以及結果的限制。程式能跑完不等於分析正確；關鍵結果應重算或以另一種方法核對。',
    prompt: `我的研究問題、資料條件與分析設計如下：[填入摘要]。
請先檢查問題與方法的對應、資料偏誤、分析假設及可重現性。
這輪只提出疑點與需要我決定的事項，不修改資料或替我下結論。
若要示範程式，先使用合成資料，說明輸入、預期結果與檢查方式。
後續實作需保留原始資料、參數、環境與完整執行紀錄。`,
    links: [
      { label: '程式與實驗工具箱', route: '/guides/research-skills/', hash: 'experiment' },
      { label: '存檔與工具操作', route: '/learn/04-checkpoints-and-tools/' },
      { label: '挑錯、反例與成果驗證', route: '/learn/05-challenge-and-review/' },
    ],
  },
  {
    id: 'communication',
    title: '寫作、簡報與成果傳播',
    summary: '用合適的格式說明研究，保留證據與限制。',
    prepare: '準備自己的草稿、已核對的來源與圖表，說明讀者、用途和交付格式。只提供這次需要且允許分享的材料。',
    assistance: '請 AI 檢查論證與術語、修整語句，或把已核對的筆記整理成簡報及 HTML 閱讀頁。',
    check: '確認改寫未改變證據強度，圖表與引用仍正確，並依學校或目標期刊的最新規範揭露 AI 使用。分享前確認版本、對象與授權。',
    prompt: `請檢查這份研究草稿：[提供可分享的段落或檔案]。
用途、讀者與輸出格式是：[填入條件]。
指出論點不清楚、證據不足、術語不一致及需要補來源的位置。
保留我的語氣與研究限制，不新增事實、引用或研究結果。
若整理成簡報或 HTML，保留來源位置與待確認事項，完成後核對內容與呈現。`,
    links: [
      { label: 'academic-humanizer：修整學術草稿', route: '/guides/research-skills/', hash: 'skill-academic-humanizer' },
      { label: '製作簡報工具箱', route: '/guides/research-skills/', hash: 'present' },
      { label: 'html-visualizer：整理成 HTML 報告', route: '/guides/research-skills/', hash: 'skill-html-visualizer' },
      { label: 'Git 存檔與分享', route: '/templates/git-checkpoint-release/' },
    ],
  },
];
