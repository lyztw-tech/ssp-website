# KNOWLEDGE.md — 知識點 / 坑與解法

> 記「踩過的坑、找到的解法、可重用的知識」。**最新的放最上面**。

---

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
