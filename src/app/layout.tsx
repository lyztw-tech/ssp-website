import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '智慧職安平台｜整座工地，一眼掌握',
  description:
    '台灣工地安全數位監測平台。即時影像、門禁管理、環境監測、AI 偵測、告警廣播、施工日報——一個平台，看住整個工地。',
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
