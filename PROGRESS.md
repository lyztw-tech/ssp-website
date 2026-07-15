# PROGRESS.md — 目前進度

> 智慧職安平台（SSP）宣傳官網。Apple 風格互動式行銷站，Next.js App Router + `output: 'export'` 靜態輸出，無 CMS/後端。
> 產品本身的進度記在 `smart-safety-platform`；本檔只記官網自己的事。

---

## 最後更新
- 日期:2026-07-15
- 摘要:第一次真正 commit + 上線！改成純靜態輸出部署到 GitHub Pages（`https://lyztw-tech.github.io/ssp-website/`），拿掉伺服器依賴的預約表單，換成 mailto CTA（`dev@lyztw.com`）。

---

## 目前狀態
- 階段：進行中（已上線，收尾中）
- 正在做:補分享預覽圖（OG/Twitter meta）
- 進度:單頁內容與視覺打磨已完成並上線；下一步是行銷面的收尾（分享圖、自訂網域、聯絡管道評估）

---

## 下一步(待辦，由上而下是優先序)
- [ ] **DNS 待你設定**：`about.smart-safety-platform.lyztw.com` 要加一筆 CNAME 記錄指到 `lyztw-tech.github.io`（在管理 `lyztw.com` 的 DNS 服務商那邊設，我這邊看不到）
- [ ] 到 repo Settings → Pages → Custom domain 填 `about.smart-safety-platform.lyztw.com`（DNS 生效後才能存成功，GitHub 會驗證）
- [ ] 重新評估聯絡信箱：`dev@lyztw.com` 是工程信箱，客戶開發窗口可能要換成 `sales@`/`contact@` 類的
- [ ] 評估要不要把 mailto CTA 換回真正的表單（例如 Formspree 這類免費第三方服務）——拿掉伺服器表單後，現在完全沒有名單/轉換率數據
- [ ] 補 `robots.txt`/`sitemap.xml`

---

## 卡住 / 待釐清
- 自訂網域程式碼面已設定完成，等 DNS 生效（見上方下一步兩項，非程式碼問題）

---

## 本階段已完成
- 深淺色主題切換（`localStorage` 記憶＋防閃色 boot script），產品展示框/夜間值班區刻意鎖深色 token
- CSS scroll-driven animations（捲動進場動效，含 reduced-motion 與不支援瀏覽器退回方案）
- 全站字級兩輪調大（依使用者「主管都有年紀了」的回饋），刻意排除六大模組活元件與門禁雙劇場的縮小版 UI
- Header 重新設計（`NavMark` 同心圓漸層 logo + 雷達 ping 動效）＋手機版排版修正（隱藏次要的深淺色切換鈕）
- `ModWide`/`ModSplit` 內距不一致的 bug 修正
- **上線**:改 `output: 'export'` 純靜態輸出；`src/lib/asset-path.ts` 集中處理 `basePath`（`next/link` 以外的 `<img src>`、頁尾連結都要手動補，不會自動加）；`.github/workflows/deploy.yml` push `main` 自動部署
- 拿掉伺服器依賴的 `/api/lead` 與表單，CTA 改 mailto；隱私權政策同步改用詞（不再提表單蒐集）
- OG/Twitter 分享預覽圖（`metadataBase` 對開頭 `/` 相對路徑會忽略 basePath 的坑，改用組好的絕對網址繞開）
- 自訂網域 `about.smart-safety-platform.lyztw.com`：`public/CNAME` + `deploy.yml` 環境變數改根目錄 serve（不用 basePath 了）
- repo 建成 `lyztw-tech/ssp-website`（Public，GitHub Pages 免費方案的前提）
