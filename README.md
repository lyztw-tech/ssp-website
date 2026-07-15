# ssp-marketing-site — 智慧職安平台宣傳官網

Apple 風格互動式行銷站（Next.js 16 App Router、`output: 'export'` 靜態輸出、無 CMS/後端）。

單頁 scrollytelling：Hero（真產品畫面滾動回正＋漂浮活卡＋載入進場）→ 對照區（現在的工地 vs 有平台的工地，互動切換）→ 四幕（看得見／攔得住／說得清／帶得走）→ 運作方式（資料流）→ 導入三步 → 理念 → 合作三卡 → FAQ → 信任帶 → 預約表單。

**深淺色主題**（2026-07-12 加入，供比較評估）：nav 右側「☀ 淺色／☾ 深色」切換，記憶在 `localStorage('ssp-theme')`，layout 有 boot script 防閃色（`<html suppressHydrationWarning>`）。淺色是完整 token 覆寫（`html[data-theme='light']`）；**產品展示框（`.mod-frame`）與夜間值班區（`.night`）在淺色下鎖回深色 token**——「淺色頁面、深色產品畫面」。坑：`color` 在 body 層就解析完，鎖 token 的區塊要重新宣告 `color: var(--text)`；hero 大標與 `.nav.on` 底色原本寫死，已 token 化（`--nav-bg/--nav-bg-on`、淺色版 hero 漸層另寫）。

**捲動驅動動效**（2026-07-12 加入）：CSS scroll-driven animations（`animation-timeline: view()/scroll()`，Chrome 115+/Safari 26+，不支援自動退回原 reveal、`prefers-reduced-motion` 全關）。產品展示框隨捲動從微傾立正、手機框上浮、頂部青綠捲動進度條；全部只動 `--fEnter` 自訂屬性再組 transform——不跟 `.mod-frame:hover` 與 `.rv.in` 的 transform 打架（這是坑）。看板區進視口自動 4.5 秒輪播四模式，使用者點過籤即停。

**全站字級調大**（2026-07-12，分兩輪）：使用者反饋「字不要太小，主管都有年紀了」，第一輪調升約 1–2px 後使用者說「還是要再大一些」，第二輪再加大一輪（body 基準 17→18px、nav/表單/方案/ROI 等關鍵文案再 +1~1.5px）。`globals.css` 逐行精準置換（每行先核對原值才換，非正規式亂改），共動了約 140 處 `font-size`（62+80）。**刻意排除**「六大模組活元件」（`DashLive`/`CamWall`/`EnvLive`/`LprFlow`/`BroadcastLive`/`ReportLive`，`globals.css` 1581–2223 行）與「門禁雙劇場」demo（2271–2347 行）——這兩處是刻意做成「縮小版真實產品 UI」，字本來就該小（跟截圖同理），兩輪都不在調整範圍內。

**Header 重新設計**（2026-07-12）：使用者反饋原本的 nav「有點醜」，要求「有點特色感」。原本 logo 是純 unicode `◉` 塞進一個純色圓角方塊，換成 `NavMark`（`src/components/nav-mark.tsx`，nav 與 footer 共用、`gradId` prop 避免同頁重複 SVG id）——同心圓「光圈」造型＋teal→blue 漸層核心＋一顆會 `blink` 的青色訊號點，外圈另有一圈 3.2 秒週期的雷達式 ping（`@keyframes mark-ping`，`prefers-reduced-motion` 關閉），呼應全站「即時監測／LIVE」的視覺語言，而不是憑空加裝飾。同時：nav 選單項 hover 時滑出 teal→blue 漸層底線（`::after` + `transform: scaleX()`）；捲動後 nav 底部從純色 hairline 改成同款漸層微光線；預約導覽按鈕加了箭頭圖示，hover 時箭頭右移＋按鈕上浮＋teal 光暈陰影。

**Header 手機版排版**（2026-07-12，同一批反饋接著發現的）：字級調大＋新 logo 造型後，窄螢幕（≤760px）原本會擠出三行爛版——logo「智慧職安平台」換行、深淺色切換鈕「深/色」換行、CTA「預約導覽」也換行。使用者說「有不需要的東西就移除」——深淺色切換鈕本來就是給桌機比較評估用的次要功能（見上面「深淺色主題」一節），**手機版直接隱藏**（`.theme-btn { display: none }`），騰出空間讓 logo／CTA 這兩個核心元素單行排好；`.nav-in` 縮小 gap、logo 縮字級＋`white-space:nowrap`、CTA 加 `white-space:nowrap`，＜400px 再把 CTA 箭頭藏起來。375/430/700/760/900px 都截圖驗證過（深淺色都測），760px 以上恢復完整桌機版（含切換鈕）。

**Bug 修復**（2026-07-12）：`ModWide`（全寬模組，戰情室 `#m-dash` 用這個）忘記像 `ModSplit` 一樣在傳 `media` 時加 `is-live` class（給內距），導致 `DashLive` 內容貼死邊框無 padding——已在 `showcase.tsx` 補上同款邏輯，兩者現在行為一致。全螢幕看板截圖（`.board-stage`）維持無內距，那是刻意做成「螢幕貼滿畫面」的效果，不是同類 bug。

**第 4 幕「帶得走」**（`src/components/field.tsx`，2026-07-12 加入）：
- 全螢幕看板：人員／車輛／環境／設備四鍵切換大圖（`public/shots/boards/`，無頭 Chrome 實拍；各板時鐘用 Date shim 凍在示範事件「之後」，數字才自洽）。
- 隨身戰情室 App：手機框＋影像牆即時縮圖實機截圖（`public/shots/app/`，模擬器統一 20:41／24h 狀態列、轉檔時裁掉 tab bar 避免測試告警數入鏡）。
- 一台陌生車三步放行：保全 QR（剩 4:46）→ 訪客手機表單（剩 4:13，倒數時間軸連貫）→ 核可放行；同車牌 BNH-2286 貫穿三步。

**步驟 2（訪客手機）瀏覽器外框，2026-07-12 重做**：第一版用 CSS 手畫一個半透明 `.browserbar`/`.pill` 蓋在截圖上，使用者截圖抓到「App 標題從半透明列後面透出來」直接說「很醜⋯不要自己在那邊瞎做，去用模擬器看真的長怎樣」。改法：`xcrun simctl` 開 iPhone 17 Pro 模擬器的**真的 Safari**（不是無頭 Chrome），實際觀察發現真的行動版 Safari 網址列是**底部**膠囊列（返回／分頁堆疊／網址+重新整理／⋯選單，四個獨立圓角區塊），不是我原本瞎猜的頂部單一膠囊——完全猜錯形狀和位置。做法改成：裁真實 Safari 底部列截圖（在模擬器開一個本機淺色空白頁取得淺色版真實列）＋裁真實 App 截圖的頂部狀態列（沿用 `app-visitor-qr.webp` already-approved 的乾淨版本，避開 `simctl openurl` 特有的「‹ 返回上個 App」殘留列）＋中間用真實表單截圖內容，三段疊成一張**真實像素合成**的 flatten 圖，只用 PIL 對「localhost」文字做局部重繪成 `xxxx.xxx`（遮蔽開發網域，其餘全部是真實擷取像素，非手畫）。已移除 `globals.css` 的 `.phone.web`/`.browserbar` 死 CSS 與 `field.tsx` 的 `web` 條件渲染，STORY 改成每筆各自帶 `w`/`h`。第一版合成圖含完整表單內容，780×1877 明顯比另兩張原生 App 截圖高，使用者回饋「太長了吧，要跟其他兩個要一樣」——把表單內容裁到「系統未能辨識⋯保全核可後即可放行。」段落結束的自然留白處收尾（不切在任何卡片/輸入框中間），最終 780×1511，跟另兩張 780×1526 幾乎等高。

**六大模組全部是「真元件假資料」活體展示**（`src/components/live.tsx`），不是整張截圖：
戰情室 live mini dashboard（KPI 跳動＋告警流）、即時影像牆（CSS 裁切真實夜視畫面＋AI 掃描框）、
環境監測（自畫儀表＋sparkline）、門禁（車牌放行/攔阻小劇場）、廣播（快訊＋等化器）、
施工日報（自動書寫＋23:59 鎖版章）。AI 偵測保留互動 demo（按鈕→時間軸→告警卡跳出）。
（「工地睡了，系統醒著」夜間值班區 2026-07-12 移除——使用者認為 24 小時監測是常態、不必特別講；`NightWatch` 元件保留未掛載。）

**動畫短片（已放棄，2026-07-12）**：`public/story/index.html`《工地的一天》與 `public/story/worker.html`《阿誠的一天》——分鏡動畫短片實驗，使用者評價「醜」且不再投入，**不要主動修改、驗證或提及**，除非使用者重新提起。檔案保留在 repo 內但不掛在主站導覽／nav 上。

## 開發

```bash
npm run dev -- --port 3300   # http://localhost:3300
npm run build                # 靜態輸出到 out/
npx tsc --noEmit && npx eslint src/
```

## 結構

- `src/app/globals.css` — 全站設計系統（近黑底、大字、hairline、品牌青綠只當 accent）
- `src/components/` — nav / nav-mark（品牌標記 SVG，nav+footer 共用）/ hero / showcase（三幕+模組+環測 ticker+模擬告警 demo）/ field（第 4 幕：看板切換＋App＋三步放行）/ flow / closing / reveal
- `public/shots/*.webp` — 真實產品截圖（由 smart-safety-platform localhost:3200 以 puppeteer 擷取）；`shots/boards/` 四看板、`shots/app/` App 實機＋訪客表單。拍攝坑：頁面時鐘要 Date-shim 到示範資料之後、要移除 `nextjs-portal`（dev 浮標）、App 截圖裁掉 tab bar（避免測試告警徽章）、模擬器要 `AppleICUForce24HourTime` + `status_bar override`。

## 上線前要補的資料

1. ~~表單送出~~ ✅ 已接 `/api/lead`（落檔 `data/leads.jsonl`；上線改送 email/webhook 只需改這一支）。**注意：已移除 `output: 'export'`，部署需 Node 執行環境**（Vercel 或 EC2 `next start`）。
2. **聯絡資訊／公司身分**：Footer 與 /privacy 的聯絡窗口仍缺公司名、統編、email——確認後補（客戶批判報告的頭號 deal-breaker，見 `docs/CRITIQUE.md`）。
3. **實績數據／社會證據**：客戶 logo、實績帶、成果數字，需真實資料。
4. ~~產品截圖~~ ✅ 已換白天、數字自洽版（dashboard.webp/alerts.webp；夜視原檔保留為 *-night.webp，夜間值班區續用 cctv.webp 夜視畫面）。
5. **SLA 數字確認**：FAQ 寫「故障 24 小時內回應」為保守佔位，需業務拍板。
6. **價格錨點**：ROI 區寫「每月數萬元量級」，有正式定價後精確化。
7. **網域與部署**：未定。
