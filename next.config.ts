import type { NextConfig } from 'next';

/**
 * 靜態輸出給 GitHub Pages（純靜態檔案，沒有 Node 伺服器）。
 * 專案頁（project page）網址是 https://<org>.github.io/<repo>/，所以要加
 * basePath/assetPrefix；值來自 NEXT_PUBLIC_BASE_PATH（.github/workflows/deploy.yml
 * 在 build 時注入，本機 dev/build 沒設這個 env 就不受影響）。同一顆 env 也是
 * src/lib/asset-path.ts 給 <img src> 用的，改路徑只要改那一個地方。
 * 之後若換成自訂網域（從根目錄 serve），deploy.yml 那行 env 拿掉即可，不用改這個檔案。
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : '',
};

export default nextConfig;
