'use client';

/** 運作方式：現場 → 邊緣 → 雲端 → 手機，節點卡 + 流動光點。圖示為自製 1.5px 線性 SVG（不用 emoji）。 */
import { Rv } from './reveal';

function Ic({ d, extra }: { d: string; extra?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
      {extra}
    </svg>
  );
}

const NODES = [
  {
    icon: <Ic d="M3 8.5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7Z" extra={<><path d="M16 12.5l5-2.5v7l-5-2.5" /><circle cx="8.5" cy="13" r="2.2" stroke="var(--teal)" /></>} />,
    name: '現場設備',
    desc: '攝影機、感測站、門禁——既有攝影機也接得上',
    tag: '免換設備',
  },
  {
    icon: <Ic d="M6 6h12v12H6Z" extra={<><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /><circle cx="12" cy="12" r="2" stroke="var(--teal)" /></>} />,
    name: '邊緣閘道',
    desc: '現場先處理、斷網續傳，資料不漏接',
    tag: '斷網續傳',
  },
  {
    icon: <Ic d="M6.5 18a3.5 3.5 0 0 1-.4-6.98A5.5 5.5 0 0 1 16.7 9.6 4.2 4.2 0 0 1 17 18Z" extra={<path d="M9 21h.01M13 21h.01M17 21h.01" stroke="var(--teal)" />} />,
    name: '雲端平台',
    desc: 'AI 判讀、告警派送、紀錄歸檔',
    tag: '台灣機房',
  },
  {
    icon: <Ic d="M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3Z" extra={<><path d="M11 17.5h2" /><path d="M12 8.5l2.5 3h-5l2.5 3" stroke="var(--teal)" /></>} />,
    name: '你的手機',
    desc: '告警即時推播，戰情室隨身帶著走',
    tag: '< 3 秒',
  },
];

export function Flow() {
  return (
    <section id="flow">
      <div className="act wrap">
        <Rv>
          <span className="act-eyebrow">運作方式</span>
        </Rv>
        <Rv as="h2" delay={1}>
          現場到手機，
          <br />
          一條線。
        </Rv>
      </div>
      <div className="flow wrap">
        <Rv className="flow-grid">
          {NODES.map((n, i) => (
            <div key={n.name} style={{ display: 'contents' }}>
              <div className="flow-node">
                <div className="fi">{n.icon}</div>
                <b>{n.name}</b>
                <span>{n.desc}</span>
                <span className="tag">{n.tag}</span>
              </div>
              {i < NODES.length - 1 && (
                <div
                  className="flow-link"
                  aria-hidden="true"
                  style={{ left: `${(i + 1) * 25 - 3.2}%`, width: '6.4%' }}
                >
                  <span className="flow-dot" style={{ animationDelay: `${i * 0.8}s` }} />
                </div>
              )}
            </div>
          ))}
        </Rv>
      </div>
    </section>
  );
}
