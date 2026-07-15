'use client';

/** 亮點元件：Before/After 對照、夜間值班簽名區、信任帶、模組卡游標光暈。 */
import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/asset-path';
import { Rv } from './reveal';
import { CW_TILES } from './live';

/* ── 現在的工地 vs 有平台的工地（互動對照） ── */
const BA = [
  {
    without: { t: '巡檢靠兩條腿', d: '幾萬坪的工地人力巡不完，危險行為總發生在沒人看到的角落。' },
    with: { t: 'AI 全天候盯著', d: '每一路畫面 24 小時判讀——未戴安全帽、闖管制區，看到就通報。' },
  },
  {
    without: { t: '五套系統五個視窗', d: '監視器、門禁、環測各一套，要拼出全貌得開五個視窗。' },
    with: { t: '一個戰情室', d: '影像、門禁、環境、告警，同一個畫面說完。' },
  },
  {
    without: { t: '出事才收到回報', d: '等訊息一層層傳上來，黃金處置時間已經過了。' },
    with: { t: '3 秒推到手機', d: '異常發生那一刻，工安主管的手機先響。' },
  },
];

export function BeforeAfter() {
  const [on, setOn] = useState(false);
  return (
    <section className="ba wrap" id="why">
      <Rv>
        <div className="ba-head">
          <span className="act-eyebrow">為什麼需要它</span>
          <h2 className="ba-h">工地那麼大，人只有一雙眼睛。</h2>
          <div className="ba-toggle" role="tablist" aria-label="對照切換">
            <button role="tab" aria-selected={!on} className={on ? '' : 'on'} onClick={() => setOn(false)}>
              現在的工地
            </button>
            <button role="tab" aria-selected={on} className={on ? 'on' : ''} onClick={() => setOn(true)}>
              有平台的工地
            </button>
          </div>
        </div>
      </Rv>
      <Rv delay={1}>
        <div className={`ba-grid${on ? ' good' : ''}`}>
          {BA.map((p, i) => {
            const c = on ? p.with : p.without;
            return (
              <div key={`${i}-${on ? 'w' : 'o'}`} className="ba-card">
                <i>{on ? '✓' : '✕'}</i>
                <b>{c.t}</b>
                <p>{c.d}</p>
              </div>
            );
          })}
        </div>
      </Rv>
    </section>
  );
}

/* ── 夜間值班（簽名區：真實夜視畫面拼成的監看牆背景） ── */
export function NightWatch() {
  return (
    <section className="night" role="img" aria-label="凌晨的工地即時影像監看牆">
      <div className="night-grid" aria-hidden="true">
        {CW_TILES.map((c) => {
          const w = c.x1 - c.x0;
          const h = c.y1 - c.y0;
          return (
            <div key={c.id} className="ng-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset('/shots/cctv.webp')}
                alt=""
                loading="lazy"
                style={{
                  width: `${(100 / w) * 100}%`,
                  left: `${(-c.x0 / w) * 100}%`,
                  top: `${(-c.y0 / h) * 100}%`,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="night-veil" aria-hidden="true" />
      <div className="night-in wrap">
        <Rv>
          <span className="night-chip">
            <i />
            01:53 AM · 紅外線夜視 · 真實系統畫面
          </span>
        </Rv>
        <Rv as="h2" delay={1}>
          工地睡了，
          <br />
          系統醒著。
        </Rv>
        <Rv as="p" delay={2}>
          背景這四路畫面，是凌晨從真實運作中的系統擷取的。夜裡的工地沒有人——但沒有一秒，沒人看著。
        </Rv>
      </div>
    </section>
  );
}

/* ── 信任帶 ── */
const TRUST = ['台灣開發 · 資料不出境', '接既有攝影機 · 免換設備', '斷網續傳 · 資料不漏接', '承攬商進場管理 · 對接臺灣職安卡'];

export function TrustStrip() {
  return (
    <div className="trust">
      <Rv className="trust-in wrap">
        {TRUST.map((t) => (
          <span key={t}>
            <i />
            {t}
          </span>
        ))}
      </Rv>
    </div>
  );
}

/* ── 全站氛圍背景：藍圖網格 + 漂移光暈 ── */
export function Ambient() {
  return (
    <div className="amb" aria-hidden="true">
      <i className="amb-g1" />
      <i className="amb-g2" />
    </div>
  );
}

/* ── 回到最上面 ── */
export function ToTop() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > 700);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  function up() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }
  return (
    <button type="button" className={`totop${on ? ' on' : ''}`} onClick={up} aria-label="回到最上面" tabIndex={on ? 0 : -1}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V6M6 12l6-6 6 6" />
      </svg>
    </button>
  );
}

/* ── 模組卡游標光暈（事件委派，一次掛全站） ── */
export function FrameGlow() {
  const raf = useRef(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: PointerEvent) => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const f = (e.target as HTMLElement | null)?.closest?.('.mod-frame') as HTMLElement | null;
        if (!f) return;
        const r = f.getBoundingClientRect();
        f.style.setProperty('--gx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
        f.style.setProperty('--gy', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);
  return null;
}
