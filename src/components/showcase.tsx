'use client';

/** 三幕模組展示：幕標題、模組圖卡（全寬/分欄）、環測 ticker、模擬告警 demo。 */
import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/asset-path';
import { Rv } from './reveal';

export function Act({ no, name, title, sub }: { no: string; name: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="act wrap">
      <Rv>
        <span className="act-eyebrow">
          第 {no} 幕 · {name}
        </span>
      </Rv>
      <Rv as="h2" delay={1}>
        {title}
      </Rv>
      {sub && (
        <Rv as="p" delay={2}>
          {sub}
        </Rv>
      )}
    </div>
  );
}

/** 全寬模組（shot 圖或 media 活元件擇一） */
export function ModWide({
  id,
  shot,
  alt,
  cap,
  live,
  media,
}: {
  id?: string;
  shot?: string;
  alt?: string;
  cap: React.ReactNode;
  live?: boolean;
  media?: React.ReactNode;
}) {
  return (
    <section className="mod wrap" id={id}>
      <Rv as="figure" className={`mod-frame${media ? ' is-live' : ''}`}>
        {live && (
          <span className="badge-live">
            <i />
            LIVE
          </span>
        )}
        {media ??
          (shot && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={asset(shot)} alt={alt ?? ''} loading="lazy" width={1600} height={1000} />
          ))}
      </Rv>
      <Rv as="p" className="mod-cap" delay={1}>
        {cap}
      </Rv>
    </section>
  );
}

/** 左右分欄模組（flip 換邊）；media 放活元件（優先於 shot）；extra 放互動元件。 */
export function ModSplit({
  id,
  shot,
  alt,
  title,
  desc,
  mini,
  flip,
  live,
  scan,
  extra,
  overlay,
  media,
}: {
  id?: string;
  shot?: string;
  alt?: string;
  title: React.ReactNode;
  desc: string;
  mini?: string;
  flip?: boolean;
  live?: boolean;
  scan?: boolean;
  extra?: React.ReactNode;
  overlay?: React.ReactNode;
  media?: React.ReactNode;
}) {
  return (
    <section className={`mod split${flip ? ' flip' : ''} wrap`} id={id}>
      <div className="mod-grid">
        <Rv className="mod-txt">
          <h3>{title}</h3>
          <p>{desc}</p>
          {extra}
          {mini && <div className="mini">{mini}</div>}
        </Rv>
        <Rv as="figure" className={`mod-frame${media ? ' is-live' : ''}`} delay={1}>
          {live && (
            <span className="badge-live">
              <i />
              LIVE
            </span>
          )}
          {scan && <span className="scanline" aria-hidden="true" />}
          {media ??
            (shot && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={asset(shot)} alt={alt ?? ''} loading="lazy" width={1600} height={1000} />
            ))}
          {overlay}
        </Rv>
      </div>
    </section>
  );
}

/** 環境監測即時數字（假資料小幅跳動，像真的） */
export function EnvTicker() {
  const [v, setV] = useState({ pm: 42, db: 68, wind: 3.2 });
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setV({
        pm: 40 + Math.round(4 * Math.abs(Math.sin(i * 0.7))),
        db: 66 + Math.round(5 * Math.abs(Math.sin(i * 0.45 + 1))),
        wind: Math.round((2.8 + 1.1 * Math.abs(Math.sin(i * 0.3 + 2))) * 10) / 10,
      });
    }, 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="env-ticker" aria-label="環境數據示意">
      <div className="env-item">
        <span>PM2.5</span>
        <b>
          {v.pm}
          <em>μg/m³</em>
        </b>
      </div>
      <div className={`env-item${v.db >= 70 ? ' warn' : ''}`}>
        <span>噪音</span>
        <b>
          {v.db}
          <em>dB</em>
        </b>
      </div>
      <div className="env-item">
        <span>風速</span>
        <b>
          {v.wind.toFixed(1)}
          <em>m/s</em>
        </b>
      </div>
    </div>
  );
}

/** 模擬告警 demo：按下 → 三步時間軸 → 圖上跳出產品同款告警。 */
export function AlertDemo({ onToast }: { onToast: (on: boolean) => void }) {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function run() {
    if (running) return;
    setRunning(true);
    setStep(0);
    onToast(false);
    const seq = [
      () => setStep(1),
      () => setStep(2),
      () => {
        setStep(3);
        onToast(true);
      },
      () => {
        setStep(4);
      },
      () => {
        setRunning(false);
        setStep(0);
        onToast(false);
      },
    ];
    const delays = [200, 1100, 1900, 2600, 7000];
    timers.current = seq.map((f, i) => setTimeout(f, delays[i]));
  }

  return (
    <div>
      <button className="demo-btn" onClick={run} disabled={running}>
        ▶ 模擬一次「未戴安全帽」偵測
      </button>
      <div className="demo-timeline" aria-live="polite">
        <div className={`demo-step${step >= 1 ? ' on' : ''}`}>
          <i>1</i>
          <span>
            塔吊區攝影機——<b>AI 辨識到未確實佩戴安全帽</b>
          </span>
          <span className="t">0.0s</span>
        </div>
        <div className={`demo-step${step >= 2 ? ' on' : ''}`}>
          <i>2</i>
          <span>
            平台建立告警、<b>附現場照片存證</b>
          </span>
          <span className="t">+0.9s</span>
        </div>
        <div className={`demo-step${step >= 3 ? ' on' : ''}`}>
          <i>3</i>
          <span>
            <b>工安主管手機收到通知</b>、戰情室跳卡
          </span>
          <span className="t">+1.7s</span>
        </div>
        <div className={`demo-done${step >= 4 ? ' on' : ''}`}>從偵測到通知，全程不到 3 秒。</div>
        {/* 手機版 payoff：桌機的告警卡跳在右側截圖上，窄螢幕改顯示在時間軸正下方 */}
        <div className={`demo-mini${step >= 3 ? ' on' : ''}`} aria-hidden="true">
          <div className="at-h">
            <i />
            未戴安全帽 · 危急
          </div>
          <div className="at-b">
            塔吊區 CAM-03 · 信心 <b>0.92</b> · 已附現場照片
          </div>
        </div>
      </div>
    </div>
  );
}

/** AI 偵測模組（組合 AlertDemo 與圖上 toast） */
export function AiModule() {
  const [toast, setToast] = useState(false);
  return (
    <ModSplit
      id="m-ai"
      shot="/shots/alerts.webp"
      alt="告警中心畫面"
      title={
        <>
          AI 偵測。
          <br />
          多一雙不眨眼的眼睛。
        </>
      }
      desc="未確實佩戴安全帽、闖入管制區、車牌辨識——AI 看到的那一刻，工安就收到，附照片存證。"
      mini="偵測項目照職安署寫法：安全帽 · 電子圍籬 · 人員異常"
      extra={<AlertDemo onToast={setToast} />}
      overlay={
        <div className={`alert-toast${toast ? ' on' : ''}`} role="status">
          <div className="at-h">
            <i />
            未戴安全帽 · 危急
          </div>
          <div className="at-b">
            塔吊區 CAM-03 · 信心 <b>0.92</b> · 已附現場照片
          </div>
        </div>
      }
    />
  );
}
