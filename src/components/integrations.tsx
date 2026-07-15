'use client';

/**
 * 系統串接架構圖：中央平台 hub，六個現場系統輻射連線，
 * 資料光點沿線流向 hub；hover 高亮該路。窄螢幕退化為卡片格。
 */
import { useEffect, useRef, useState } from 'react';
import { Rv } from './reveal';

function Ic({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const SYSTEMS = [
  {
    key: 'face',
    name: '人臉門禁',
    desc: '辨識機 · 閘門連動 · 職安卡',
    icon: (
      <Ic>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <circle cx="12" cy="10.5" r="2.6" stroke="var(--teal)" />
        <path d="M7.5 17.5c1-2 2.6-3 4.5-3s3.5 1 4.5 3" stroke="var(--teal)" />
      </Ic>
    ),
  },
  {
    key: 'lpr',
    name: '車牌門禁',
    desc: 'LPR 攝影機 · 柵欄機',
    icon: (
      <Ic>
        <rect x="3" y="9" width="18" height="7" rx="1.6" />
        <path d="M6.2 12.7h2.4M10.4 12.7h7.4" stroke="var(--teal)" />
        <path d="M5 9V7.2A1.2 1.2 0 0 1 6.2 6h11.6A1.2 1.2 0 0 1 19 7.2V9" />
      </Ic>
    ),
  },
  {
    key: 'cctv',
    name: '工區監控',
    desc: '既有 CCTV · RTSP／ONVIF',
    icon: (
      <Ic>
        <path d="M3 8.5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7Z" />
        <path d="M16 12.5l5-2.5v7l-5-2.5" />
        <circle cx="8.5" cy="13" r="2.2" stroke="var(--teal)" />
      </Ic>
    ),
  },
  {
    key: 'env',
    name: '環境感測',
    desc: 'PM2.5 · 噪音 · 風速 · 水位',
    icon: (
      <Ic>
        <path d="M12 3v10" />
        <circle cx="12" cy="17" r="3.4" stroke="var(--teal)" />
        <path d="M6 6.5h3M5 10.5h4M15 6.5h4M15 10.5h3" />
      </Ic>
    ),
  },
  {
    key: 'pa',
    name: '廣播系統',
    desc: 'IP 喇叭 · 分區播送',
    icon: (
      <Ic>
        <path d="M4 10v4h4l6 4V6l-6 4H4Z" />
        <path d="M17.5 9.5a4 4 0 0 1 0 5M19.8 7.5a7 7 0 0 1 0 9" stroke="var(--teal)" />
      </Ic>
    ),
  },
  {
    key: 'fence',
    name: '電子圍籬',
    desc: '周界入侵 · 越界告警',
    icon: (
      <Ic>
        <path d="M5 20V7l2-2 2 2v13M15 20V7l2-2 2 2v13M3 20h18" />
        <path d="M9 10.5h6M9 15h6" stroke="var(--teal)" />
      </Ic>
    ),
  },
];

export function Integrations() {
  const boxRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const [lines, setLines] = useState<{ key: string; x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    function measure() {
      const b = box!.getBoundingClientRect();
      const hub = hubRef.current?.getBoundingClientRect();
      if (!hub || hub.width === 0) {
        setLines([]);
        return;
      }
      const hx = hub.left - b.left + hub.width / 2;
      const hy = hub.top - b.top + hub.height / 2;
      const out: { key: string; x1: number; y1: number; x2: number; y2: number }[] = [];
      for (const s of SYSTEMS) {
        const el = nodeRefs.current.get(s.key);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cy = r.top - b.top + r.height / 2;
        // 從卡片靠 hub 的一側出線
        const onLeft = r.left - b.left + r.width / 2 < hx;
        const cx = onLeft ? r.right - b.left : r.left - b.left;
        out.push({ key: s.key, x1: cx, y1: cy, x2: hx, y2: hy });
      }
      setLines(out);
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="integrations">
      <div className="act wrap">
        <Rv>
          <span className="act-eyebrow">系統串接</span>
        </Rv>
        <Rv as="h2" delay={1}>
          工地裡的系統，
          <br />
          接進同一個平台。
        </Rv>
        <Rv as="p" delay={2}>
          已經在用的設備大多直接串——資料進得來，指令出得去。
        </Rv>
      </div>
      <div className="wrap">
        <Rv>
          <div className="ig" ref={boxRef}>
            <svg className="ig-lines" aria-hidden="true">
              {lines.map((l) => (
                <g key={l.key} className={active && active !== l.key ? 'dim' : active === l.key ? 'hot' : ''}>
                  <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
                  <circle r="3">
                    <animateMotion dur="2.6s" repeatCount="indefinite" path={`M ${l.x1} ${l.y1} L ${l.x2} ${l.y2}`} />
                  </circle>
                </g>
              ))}
            </svg>
            <div className="ig-col left">
              {SYSTEMS.slice(0, 3).map((s) => (
                <div
                  key={s.key}
                  className={`ig-node${active === s.key ? ' on' : ''}`}
                  ref={(el) => {
                    if (el) nodeRefs.current.set(s.key, el);
                  }}
                  onMouseEnter={() => setActive(s.key)}
                  onMouseLeave={() => setActive(null)}
                >
                  <span className="ig-ic">{s.icon}</span>
                  <div>
                    <b>{s.name}</b>
                    <span>{s.desc}</span>
                  </div>
                  <i className="ig-ok">● 已串接</i>
                </div>
              ))}
            </div>
            <div className="ig-hub-wrap">
              <div className="ig-hub" ref={hubRef}>
                <i className="ig-hub-ring" aria-hidden="true" />
                <b>智慧職安平台</b>
                <span>戰情室 · 告警 · 日報</span>
              </div>
            </div>
            <div className="ig-col right">
              {SYSTEMS.slice(3).map((s) => (
                <div
                  key={s.key}
                  className={`ig-node${active === s.key ? ' on' : ''}`}
                  ref={(el) => {
                    if (el) nodeRefs.current.set(s.key, el);
                  }}
                  onMouseEnter={() => setActive(s.key)}
                  onMouseLeave={() => setActive(null)}
                >
                  <span className="ig-ic">{s.icon}</span>
                  <div>
                    <b>{s.name}</b>
                    <span>{s.desc}</span>
                  </div>
                  <i className="ig-ok">● 已串接</i>
                </div>
              ))}
            </div>
          </div>
        </Rv>
        <Rv as="p" className="ig-note" delay={1}>
          陸續擴充：塔吊感測、AI 攝影機、穿戴裝置——只要能出訊號，就接得進來。
        </Rv>
      </div>
    </section>
  );
}
