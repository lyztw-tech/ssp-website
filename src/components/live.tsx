'use client';

/**
 * 「真元件、假資料」活體展示：取代整張截圖的六個模組媒體。
 * 全部自包含、迴圈動畫、prefers-reduced-motion 時停在靜態一幀。
 */
import { useEffect, useState } from 'react';
import { asset } from '@/lib/asset-path';

function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    setTimeout(() => setR(window.matchMedia('(prefers-reduced-motion: reduce)').matches), 0);
  }, []);
  return r;
}

function useTick(ms: number, on = true) {
  const [n, setN] = useState(0);
  const reduced = useReduced();
  useEffect(() => {
    if (!on || reduced) return;
    const t = setInterval(() => setN((v) => v + 1), ms);
    return () => clearInterval(t);
  }, [ms, on, reduced]);
  return n;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/* ── 戰情室：live mini dashboard ── */
const DL_ALERTS = [
  { t: '偵測到人員 · 信心 0.87', z: 'B2 開挖區 · CAM-04 AI', sev: 'warn' },
  { t: '噪音 86.2 dB · 超標', z: '工區大門 · N-01 噪音計', sev: 'crit' },
  { t: '車輛進場 · TPH-0362', z: '南側大門 · 車牌辨識', sev: 'info' },
  { t: '未戴安全帽 · 信心 0.92', z: '塔吊區 · CAM-03 AI', sev: 'crit' },
  { t: '偵測到人員 · 信心 0.64', z: '南側大門 · CAM-01 AI', sev: 'warn' },
];

export function DashLive() {
  const tick = useTick(3200);
  const [clock, setClock] = useState('01:53:45');
  const reduced = useReduced();
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      const d = new Date();
      setClock(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    }, 1000);
    return () => clearInterval(t);
  }, [reduced]);
  const people = 27 + (tick % 3 === 2 ? 1 : 0);
  const feed = [0, 1, 2].map((i) => DL_ALERTS[(tick + i) % DL_ALERTS.length]);
  return (
    <div className="dl" role="img" aria-label="戰情室即時示意">
      <div className="dl-bar">
        <span className="dl-dot" />
        <b>總覽戰情室</b>
        <em>中壢 AXX 社宅新建工程</em>
        <span className="dl-clock">{clock}</span>
      </div>
      <div className="dl-body">
        <div className="dl-main">
          <div className="dl-kpis">
            <div className="dl-kpi">
              <span>目前在場人數</span>
              <b>
                {people}
                <i>人</i>
              </b>
            </div>
            <div className="dl-kpi">
              <span>在場車輛機具</span>
              <b>
                9<i>部</i>
              </b>
            </div>
            <div className="dl-kpi hot">
              <span>未處理告警</span>
              <b>
                {3 + (tick % 4 === 1 ? 1 : 0)}
                <i>件</i>
              </b>
            </div>
            <div className="dl-kpi">
              <span>工安巡檢達成</span>
              <b>
                92<i>%</i>
              </b>
            </div>
          </div>
          <div className="dl-env">
            <span>
              PM2.5 <b>{42 + (tick % 2)}</b>
            </span>
            <span>
              噪音 <b>{68 + ((tick * 3) % 5)}</b> dB
            </span>
            <span>
              風速 <b>{(2.8 + (tick % 4) * 0.3).toFixed(1)}</b> m/s
            </span>
            <span className="ok">● 感測器 16/17 在線</span>
          </div>
        </div>
        <div className="dl-feed">
          <div className="dl-feed-h">即時告警</div>
          {feed.map((a, i) => (
            <div key={`${a.t}-${tick}-${i}`} className={`dl-alert ${a.sev}${i === 0 ? ' new' : ''}`}>
              <b>{a.t}</b>
              <span>{a.z}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 即時影像：真夜視畫面裁切的 2×2 牆 + AI 掃描框 ── */
export const CW_TILES = [
  // cctv.webp（3200×2000）九宮格 LIVE tile 的實測座標（%），已內縮避開 app 內建標籤列
  { id: 'CAM-01', name: '南側大門', x0: 33.1, y0: 26.4, x1: 53.6, y1: 46.0, ai: true },
  { id: 'CAM-02', name: '東側周界', x0: 55.3, y0: 26.4, x1: 75.7, y1: 46.0 },
  { id: 'CAM-03', name: '塔吊區', x0: 77.4, y0: 26.4, x1: 97.9, y1: 46.0 },
  { id: 'CAM-04', name: 'B1 車道', x0: 33.1, y0: 50.2, x1: 53.6, y1: 69.8 },
];

export function CamWall() {
  const tick = useTick(2600);
  const [clock, setClock] = useState('01:53');
  const reduced = useReduced();
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      const d = new Date();
      setClock(`${pad(d.getHours())}:${pad(d.getMinutes())}`);
    }, 1000);
    return () => clearInterval(t);
  }, [reduced]);
  // AI 框在 tile 內緩慢換位
  const boxPos = [
    { left: '18%', top: '34%', width: '26%', height: '48%' },
    { left: '46%', top: '30%', width: '24%', height: '52%' },
    { left: '30%', top: '38%', width: '28%', height: '46%' },
  ][tick % 3];
  return (
    <div className="cw" role="img" aria-label="即時影像監看牆示意">
      {CW_TILES.map((c) => {
        const w = c.x1 - c.x0;
        const h = c.y1 - c.y0;
        return (
          <div key={c.id} className="cw-tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset('/shots/cctv.webp')}
              alt=""
              style={{
                width: `${(100 / w) * 100}%`,
                left: `${(-c.x0 / w) * 100}%`,
                top: `${(-c.y0 / h) * 100}%`,
              }}
            />
            <span className="cw-id">
              {c.id} {c.name}
            </span>
            <span className="cw-live">
              <i />
              LIVE
            </span>
            <span className="cw-ts">{clock}</span>
            {c.ai && (
              <span className="cw-box" style={boxPos}>
                <em>人員 0.9{tick % 3 + 1}</em>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── 環境監測：自畫儀表 + sparkline ── */
function Gauge({ label, value, max, unit, warn }: { label: string; value: number; max: number; unit: string; warn?: boolean }) {
  const R = 34;
  const C = Math.PI * R; // 半圓
  const p = Math.min(1, value / max);
  return (
    <div className={`ge${warn ? ' warn' : ''}`}>
      <svg viewBox="0 0 88 54" aria-hidden="true">
        <path d={`M 10 48 A ${R} ${R} 0 0 1 78 48`} fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="7" strokeLinecap="round" />
        <path
          d={`M 10 48 A ${R} ${R} 0 0 1 78 48`}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${C}`}
          strokeDashoffset={`${C * (1 - p)}`}
          className="ge-arc"
        />
      </svg>
      <b>
        {value}
        <i>{unit}</i>
      </b>
      <span>{label}</span>
    </div>
  );
}

export function EnvLive() {
  const tick = useTick(2800);
  const pm = 41 + (tick % 3);
  const db = 66 + ((tick * 2) % 6);
  const spark = Array.from({ length: 24 }, (_, i) => {
    const y = 26 - 10 * Math.abs(Math.sin(i * 0.55 + tick * 0.4)) - (i % 5);
    return `${i * 10},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <div className="el" role="img" aria-label="環境監測即時示意">
      <div className="el-gauges">
        <Gauge label="溫度 °C" value={33.4} max={45} unit="" />
        <Gauge label="PM2.5 μg/m³" value={pm} max={70} unit="" />
        <Gauge label="噪音 dB" value={db} max={90} unit="" warn={db >= 70} />
      </div>
      <div className="el-spark">
        <div className="el-spark-h">
          <span>噪音 · 過去 60 分鐘</span>
          <em className={db >= 70 ? 'warn' : ''}>{db >= 70 ? '● 接近閾值 85 dB' : '● 正常範圍'}</em>
        </div>
        <svg viewBox="0 0 230 30" preserveAspectRatio="none">
          <polyline points={spark} fill="none" stroke="var(--blue)" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <div className="el-note">超標自動告警 · 自動廣播 · 寫入日報</div>
      </div>
    </div>
  );
}

/* ── 門禁：車道閘門 + 人臉辨識 雙劇場（上下同演）+ 混合紀錄 ── */
const CARS = [
  { plate: 'TPH-0362', ok: true },
  { plate: '2AB-77', ok: false },
  { plate: 'KEA-1275', ok: true },
];
const PEOPLE = [
  { name: '陳大明', trade: '模板工' },
  { name: '林志成', trade: '鋼筋工' },
  { name: '王美華', trade: '電焊工' },
];

export function LprFlow() {
  const tick = useTick(1600);
  // 車道 4 拍循環；人臉錯開 2 拍
  const cs = tick % 4;
  const car = CARS[Math.floor(tick / 4) % CARS.length];
  const ps = (tick + 2) % 4;
  const person = PEOPLE[Math.floor((tick + 2) / 4) % PEOPLE.length];
  // 紀錄：車/人交錯，每 2 拍推進
  const li = Math.floor(tick / 2);
  const logs = [0, 1, 2].map((i) => {
    const k = li - i;
    const kk = ((k % 6) + 6) % 6;
    if (kk % 2 === 0) {
      const c = CARS[(kk / 2) % CARS.length];
      return { key: k, kind: 'car' as const, label: c.plate, ok: c.ok };
    }
    const p = PEOPLE[((kk - 1) / 2) % PEOPLE.length];
    return { key: k, kind: 'person' as const, label: `${p.name} · ${p.trade}`, ok: true };
  });
  return (
    <div className="lpr" role="img" aria-label="人臉與車牌進場管理示意">
      <div className="lpr-stages">
        <div className="lpr-stage row">
          <div className="lpr-gate sm">
            <i className="lpr-post" />
            <i className={`lpr-arm${cs >= 2 && car.ok ? ' up' : ''}${cs >= 2 && !car.ok ? ' deny' : ''}`} />
            <i className="lpr-post r" />
          </div>
          <div className="lpr-side">
            <b>車道閘門 · 車牌辨識</b>
            <div className={`lpr-plate sm${cs >= 1 ? ' on' : ''}`}>{car.plate}</div>
            <div className="lpr-status">
              {cs === 0 && <span className="dim">偵測車輛中…</span>}
              {cs === 1 && <span>白名單比對中…</span>}
              {cs >= 2 && car.ok && <span className="ok">✓ 已放行 · 閘門開啟</span>}
              {cs >= 2 && !car.ok && <span className="deny">✕ 未登記 · 攔阻並通知</span>}
            </div>
          </div>
        </div>
        <div className="lpr-stage row">
          <div className={`face${ps >= 1 ? ' on' : ''}${ps >= 2 ? ' ok' : ''}`}>
            <span className="face-frame" aria-hidden="true">
              <i className="fc tl" />
              <i className="fc tr" />
              <i className="fc bl" />
              <i className="fc br" />
              <b className="face-avatar">{person.name[0]}</b>
              <i className="face-scan" />
            </span>
          </div>
          <div className="lpr-side">
            <b>人臉辨識機 · 人員進場</b>
            <div className="face-name">{ps >= 1 ? `${person.name} · ${person.trade}` : '——'}</div>
            <div className="lpr-status">
              {ps === 0 && <span className="dim">人員接近 · 掃描中…</span>}
              {ps === 1 && <span>職安卡效期確認中…</span>}
              {ps >= 2 && <span className="ok">✓ 進場核可 · 已記錄工時</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="lpr-log">
        <div className="lpr-log-h">進出紀錄</div>
        {logs.map((l) => (
          <div key={l.key} className={`lpr-row${l.ok ? '' : ' deny'}`}>
            <i className={`lpr-kind${l.kind === 'person' ? ' p' : ''}`}>{l.kind === 'person' ? '人' : '車'}</i>
            <b>{l.label}</b>
            <span>{l.ok ? (l.kind === 'person' ? '進場' : '放行') : '攔阻'}</span>
          </div>
        ))}
        <div className="lpr-log-f">今日 27 人進場 · 36 車次 · 1 次攔阻</div>
      </div>
    </div>
  );
}

/* ── 廣播：快訊發送 + 等化器 + 播送紀錄 ── */
const BC_MSGS = ['安全帽配戴提醒', '高溫休息廣播', '吊裝作業淨空'];
const BC_LOG = [
  { t: '16:42', m: '安全帽配戴提醒', src: '告警自動' },
  { t: '15:00', m: '高溫休息廣播', src: '排程' },
  { t: '13:37', m: '吊裝作業淨空', src: '手動' },
  { t: '11:05', m: '噪音超標宣導', src: '告警自動' },
];

export function BroadcastLive() {
  const tick = useTick(2200);
  const cur = tick % BC_MSGS.length;
  const playing = tick % 2 === 1;
  const logs = [0, 1, 2].map((i) => BC_LOG[(Math.floor(tick / 2) + i) % BC_LOG.length]);
  return (
    <div className="bc" role="img" aria-label="廣播中心示意">
      <div className="bc-main">
        <div className="bc-chips">
          {BC_MSGS.map((m, i) => (
            <span key={m} className={i === cur && playing ? 'on' : ''}>
              {m}
            </span>
          ))}
        </div>
        <div className={`bc-stage${playing ? ' on' : ''}`}>
          <div className="eq" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <i key={i} style={{ animationDelay: `${i * 0.11}s` }} />
            ))}
          </div>
          <div className="bc-status">{playing ? `播送中 ·「${BC_MSGS[cur]}」` : '待命中 · 點選快訊或由告警自動觸發'}</div>
        </div>
        <div className="bc-zones">
          <span className="on">南側大門</span>
          <span className="on">塔吊區</span>
          <span className="on">B2 開挖</span>
          <span className="on">工務所</span>
          <em>6 支喇叭 · 全區在線</em>
        </div>
      </div>
      <div className="bc-log">
        <div className="lpr-log-h">播送紀錄</div>
        {logs.map((l, i) => (
          <div key={`${l.t}-${i}`} className="bc-row">
            <span className="t">{l.t}</span>
            <b>{l.m}</b>
            <span className={`src${l.src === '告警自動' ? ' auto' : ''}`}>{l.src}</span>
          </div>
        ))}
        <div className="lpr-log-f">今日播送 12 次 · 其中 5 次由告警自動觸發</div>
      </div>
    </div>
  );
}

/* ── 施工日報：自動書寫 + 鎖版章 + 歸檔紀錄 ── */
const RP_LINES = ['出工 27 人 · 車輛進出 36 車次', '環境 PM2.5 均值 42 · 噪音超標 1 次（已廣播）', '告警 3 件 · 全數結案 · 附照片存證', '塔吊吊裝 14 次 · 巡檢達成 92%'];
const RP_ARCH = [
  { d: '07/10（週五）', n: 18 },
  { d: '07/09（週四）', n: 22 },
  { d: '07/08（週三）', n: 16 },
];

export function ReportLive() {
  const tick = useTick(1300);
  // 循環 9 拍：至少常駐 1 行，4 拍寫滿、第 6 拍蓋章、只在換輪那一拍重來
  const c = tick % 9;
  const shown = Math.min(RP_LINES.length, 1 + c);
  const stamped = c >= 5;
  return (
    <div className="rp" role="img" aria-label="施工日報自動彙整示意">
      <div className="rp-doc">
        <div className="rp-h">
          <b>施工日報 · 2026/07/11</b>
          <span>中壢 AXX 社宅新建工程</span>
        </div>
        {RP_LINES.map((l, i) => (
          <div key={l} className={`rp-line${i < shown ? ' on' : ''}`}>
            {l}
          </div>
        ))}
        <div className={`rp-stamp${stamped ? ' on' : ''}`}>23:59 已鎖版</div>
      </div>
      <div className="rp-arch">
        <div className="lpr-log-h">歸檔紀錄</div>
        {RP_ARCH.map((a) => (
          <div key={a.d} className="rp-row">
            <b>{a.d}</b>
            <span className="n">{a.n} 項</span>
            <span className="ok">✓ 已鎖版</span>
            <span className="pdf">PDF</span>
          </div>
        ))}
        <div className="lpr-log-f">本月已自動歸檔 10 份 · 隨時可匯出備查</div>
      </div>
    </div>
  );
}
