import type { Metadata, Viewport } from 'next';
import { absoluteAsset, SITE_ORIGIN, SITE_URL } from '@/lib/asset-path';
import './globals.css';

const TITLE = '智慧職安平台｜整座工地，一眼掌握';
const DESCRIPTION =
  '台灣工地安全數位監測平台。即時影像、門禁管理、環境監測、AI 偵測、告警廣播、施工日報——一個平台，看住整個工地。';
// 分享預覽圖用 hero 的真實系統截圖（3200×2000），不是另外設計的 OG 卡片圖。
// 用 absoluteAsset() 而不是 metadataBase 相對路徑解析——爬蟲直接抓網址字串，
// 若相對路徑用 `/` 開頭，Next 會忽略 metadataBase 裡的 basePath、只從網域根目錄解析，
// 組出來的網址會漏掉 /ssp-website 這段，圖抓不到。
const OG_IMAGE = absoluteAsset('/shots/dashboard.webp');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: '智慧職安平台',
    locale: 'zh_TW',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 3200, height: 2000, alt: '智慧職安平台戰情室畫面' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: '#05070b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning：boot script 會在水合前寫入 data-theme，<html> 屬性差異是預期行為
  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning>
      <body>
        {/* 主題開機腳本：首次繪製前套用 localStorage 的主題，避免閃色 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('ssp-theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
