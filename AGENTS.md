# ssp-marketing-site

智慧職安平台（SSP）的宣傳官網。純靜態 Next.js 16，繁體中文，Apple 式深色設計。

- 文案語感規範：見 smart-safety-platform repo `docs/marketing-site/REFERENCES.md`（「智慧」不是「智能」、工安/職安分工、法定詞照抄、避免翻譯腔）。
- 設計規範：字少圖大；品牌青綠 #2dd4bf 只當 accent；每屏最多一個主角動效；全站尊重 prefers-reduced-motion。
- 品質閘門：`npx tsc --noEmit`、`npx eslint src/`、`npm run build` 都要過；改視覺要實際開 preview 截圖驗證（注意：Browser pane 在此站捲動後截圖會黑屏——用無頭 Chrome script 驗證，見 README）。
- 產品截圖：`public/shots/`，來源是本機跑著的 smart-safety-platform（admin/admin1234，port 3200）。
- 進度/決策記在本 repo，不要寫進 SSP 或後端 repo。
