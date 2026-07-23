'use client';

/** 第 4 幕「帶得走」：全螢幕看板（四模式切換）＋ 隨身戰情室 App ＋ 陌生車三步放行。 */
import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/asset-path';
import { Rv } from './reveal';

// TODO：App 上架後換成真實 App Store 連結
const APP_STORE_URL = '#';

/* ---------- 全螢幕看板：人員/車輛/環境/設備 切換 ---------- */

const BOARDS = [
  {
    key: 'access',
    label: '人員',
    src: '/shots/boards/board-access.webp',
    alt: '門禁全螢幕看板：在場人數、最新進出、在場工班',
    cap: '在場人數、最新進出、各工班分布——大門警衛室掛一台電視就夠。',
  },
  {
    key: 'vehicles',
    label: '車輛',
    src: '/shots/boards/board-vehicles.webp',
    alt: '車輛全螢幕看板：在場車輛機具、今日車次、車種統計',
    cap: '在場機具、今日車次、攔阻紀錄——混凝土車進了幾趟，一眼就有數。',
  },
  {
    key: 'environment',
    label: '環境',
    src: '/shots/boards/board-environment.webp',
    alt: '環境監測全螢幕看板：八項環測即時值與熱危害等級',
    cap: '八項環測即時值加熱危害分級，超標的那一格自己會亮紅。',
  },
  {
    key: 'devices',
    label: '設備',
    src: '/shots/boards/board-devices.webp',
    alt: '設備全螢幕看板：全設備連線狀態與異常提示',
    cap: '人臉機、車牌機、感測器、廣播——誰斷線幾分鐘，標得清清楚楚。',
  },
] as const;

export function BoardShowcase() {
  const [cur, setCur] = useState(0);
  const secRef = useRef<HTMLElement>(null);
  const touchedRef = useRef(false); // 使用者點過就交還手動
  const b = BOARDS[cur];

  // 進入視口時自動輪播四模式（4.5 秒一格）；點過籤或 reduced-motion 就不自動
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = secRef.current;
    if (!el) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.45 });
    io.observe(el);
    const t = setInterval(() => {
      if (visible && !touchedRef.current) setCur((c) => (c + 1) % BOARDS.length);
    }, 4500);
    return () => {
      io.disconnect();
      clearInterval(t);
    };
  }, []);

  return (
    <section className="mod wrap" id="m-boards" ref={secRef}>
      <Rv className="board-tabs">
        {BOARDS.map((x, i) => (
          <button
            key={x.key}
            type="button"
            className={`board-tab${i === cur ? ' on' : ''}`}
            aria-pressed={i === cur}
            onClick={() => {
              touchedRef.current = true;
              setCur(i);
            }}
          >
            {x.label}
          </button>
        ))}
      </Rv>
      <Rv as="figure" className="mod-frame board-stage" delay={1}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={b.key} src={asset(b.src)} alt={b.alt} width={2400} height={1350} loading="lazy" />
      </Rv>
      <Rv as="p" className="mod-cap" delay={2}>
        <b>全螢幕看板。</b>
        {b.cap}
        <span className="board-mini">真實系統畫面 · 工務所電視、大門立牌，接上瀏覽器就能放</span>
      </Rv>
    </section>
  );
}

/* ---------- 隨身戰情室 App ---------- */

export function AppShowcase() {
  return (
    <section className="mod split wrap" id="m-app">
      <div className="mod-grid">
        <Rv className="mod-txt">
          <h3>
            隨身戰情室。
            <br />
            告警追著人走。
          </h3>
          <p>
            保全巡到哪，工地就跟到哪——現場影像即時縮圖、告警確認結案、訪客掃碼放行，都在口袋裡。前一秒發生的事，這一秒就在手機上。
          </p>
          <div className="mini">iOS App · 即時推送 · 畫面為產品介面示意</div>
          <a className="appstore-badge" href={APP_STORE_URL} aria-label="在 App Store 下載智慧職安 App">
            {/* Apple 官方徽章（繁中·白色深底版）— 取自 Apple Marketing Tools */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/badges/appstore-white-zh-tw.svg')} alt="從 App Store 下載" height={52} />
          </a>
          <div className="mini appstore-note">iOS 已推出 · Android 規劃中</div>
        </Rv>
        <Rv as="figure" className="phone-fig app-duo" delay={1}>
          <span className="phone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/shots/app/app-warroom.webp')} alt="智慧職安 App 戰情室主畫面" width={900} height={1761} loading="lazy" />
          </span>
          <span className="phone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/shots/app/app-wall.webp')} alt="智慧職安 App 現場影像即時縮圖" width={900} height={1761} loading="lazy" />
          </span>
        </Rv>
      </div>
    </section>
  );
}

/* ---------- 陌生車三步放行（手機 × 現場互動） ---------- */

const STORY = [
  {
    src: '/shots/app/app-visitor-qr.webp',
    w: 900,
    h: 1761,
    alt: '保全手機跳出未辨識車輛登記 QR',
    who: '保全的手機',
    t: '陌生車在大門停下',
    d: '車牌比對不到，保全手機當下跳出這一筆——畫面就是登記 QR，5 分鐘時效。',
  },
  {
    src: '/shots/app/web-visitor-form.webp',
    w: 780,
    h: 1511,
    alt: '訪客手機用瀏覽器開啟自助登記表單，含真實 Safari 網址列（已遮蔽網域）',
    who: '訪客的手機',
    t: '掃碼，自己填',
    d: '姓名、車牌、來訪事由，附上現場照片。用相機掃就開，不用下載任何 App。',
  },
  {
    src: '/shots/app/app-visitor-approve.webp',
    w: 900,
    h: 1761,
    alt: '保全手機核對訪客資料並核可放行',
    who: '保全的手機',
    t: '核對，放行',
    d: '填完即回到保全手機。核可放行或婉拒，一鍵完成，紀錄同步進訪客清單。',
  },
] as const;

export function VisitorStory() {
  return (
    <section className="mod wrap" id="m-visitor">
      <Rv className="story-head">
        <h3>一台陌生車，三步放行。</h3>
        <p>不用交涉、不用紙本登記——保全出示 QR，訪客自己填，核可即放行，全程留痕。</p>
      </Rv>
      <div className="story">
        {STORY.map((s, i) => (
          <Rv key={s.t} className="story-step" delay={(i + 1) as 1 | 2 | 3}>
            <div className="story-no">
              <b>{i + 1}</b>
              <span>{s.who}</span>
            </div>
            <span className="phone">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(s.src)} alt={s.alt} width={s.w} height={s.h} loading="lazy" />
            </span>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
          </Rv>
        ))}
      </div>
    </section>
  );
}
