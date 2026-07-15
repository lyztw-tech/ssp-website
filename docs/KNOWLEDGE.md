# KNOWLEDGE.md — 知識點 / 坑與解法

> 記「踩過的坑、找到的解法、可重用的知識」。**最新的放最上面**。

---

## GitHub Pages 專案頁的 basePath，`<img src>`/`<a href>` 不會自動加
- **現象**：`next.config.ts` 設了 `basePath: '/ssp-website'` 後，`next/link` 的連結都正常加了前綴，但所有 `<img src="/shots/...">` 產品截圖跟頁尾用 `<a href="/privacy">` 寫的連結，部署到 GitHub Pages 後全部 404／連到錯的網域根目錄。
- **原因**：Next.js 只有 `next/link`、`next/image`、`next/script` 這些自己的元件會自動處理 `basePath`；純字串寫的 `<img src="/...">` 或 `<a href="/...">` 完全不知道 `basePath`的存在，會直接拿使用者網域根目錄去解析。
- **解法**：① 內部連結一律用 `next/link`（自動處理）；② 靜態圖片一律包一層 `asset()` helper（`src/lib/asset-path.ts`），從 `NEXT_PUBLIC_BASE_PATH` 這個 env 讀值組出正確路徑，本機 dev 沒設這個 env 就是 no-op。**新增任何 `<img src="/...">` 都要記得包這層，不要抄舊的寫死絕對路徑。**
- **怎麼抓漏的**：本機起一顆假的靜態伺服器、完整模擬 `<org>.github.io/<repo>/` 這個路徑結構跑一次，比在 `next dev`（沒有 basePath）下測快很多，dev 模式測不出這個問題。

## 鎖色區塊的 color 要重新宣告，不能只靠繼承
- **現象**：淺色模式下，被鎖定要維持深色 token 的區塊（產品展示框、夜間值班區）文字顏色沒有跟著鎖住。
- **原因**：`color` 在 `body` 這一層就已經解析完成（CSS custom property 的值在繼承時已定值），鎖 token 的子區塊光是換 `--text` 變數值不會生效。
- **解法**：鎖色區塊要**重新宣告** `color: var(--text)`（在該區塊的選擇器內重新指定一次，強迫它讀取當下作用域的 token 值）。

## 捲動驅動動效跟 hover transform 打架
- **現象**：產品展示框同時有捲動進場動效（隨捲動微傾立正）與 `:hover` 效果（`.mod-frame:hover`）、以及 `.rv.in` 進場效果，三者都想控制 `transform`，容易互相蓋掉。
- **原因**：CSS `transform` 一次只能有一個值，多個動效各自寫死 `transform` 會互相覆蓋。
- **解法**：只讓 scroll-driven animation 動一個自訂屬性（`--fEnter`），其餘效果（hover、進場）各自的 transform 再一起組合這個自訂屬性，避免三者搶同一個 `transform` 宣告。

## ModWide 忘記加 is-live class 導致內距消失
- **現象**：`ModWide`（全寬模組展示，戰情室 `#m-dash` 用這個）內容貼死邊框、沒有內距，跟 `ModSplit` 的行為不一致。
- **原因**：`ModSplit` 傳 `media` 時有加 `is-live` class 給內距，`ModWide` 漏加。
- **解法**：在 `showcase.tsx` 補上同款 `is-live` class 邏輯，兩者行為一致。全螢幕看板截圖（`.board-stage`）維持無內距則是刻意設計（螢幕貼滿效果），不是同類 bug。
