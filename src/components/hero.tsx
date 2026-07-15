'use client';

import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/asset-path';

/** 滾動時 hero 產品畫面由後傾回正（Apple 式）。 */
function useHeroTilt() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 進度 0（剛出現在下方）→ 1（頂部貼近視口 1/4 處）
      const p = Math.max(0, Math.min(1, 1 - (r.top - vh * 0.12) / (vh * 0.55)));
      const rot = 16 * (1 - p);
      const sc = 0.94 + 0.06 * p;
      el.style.transform = `rotateX(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

/** 進視口後 count-up 一次。 */
function CountUp({ to, suffix, decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = requestAnimationFrame(() => setV(to));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setV(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <b ref={ref}>
      {v.toFixed(decimals)}
      {suffix && <em>{suffix}</em>}
    </b>
  );
}

function FloatCards() {
  const [pm, setPm] = useState(42);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0;
    const t = setInterval(() => setPm(41 + ++i % 3), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      <div className="hf hf-alert" aria-hidden="true">
        <div className="hf-h">
          <i />
          未戴安全帽 · 危急
        </div>
        <div className="hf-b">
          塔吊區 CAM-03 · 信心 <b>0.92</b>
        </div>
        <div className="hf-t">已通知工安主管 · 3 秒前</div>
      </div>
      <div className="hf hf-env" aria-hidden="true">
        <span>PM2.5</span>
        <b>
          {pm}
          <i>μg/m³</i>
        </b>
        <em>● 正常 · 自動監測中</em>
      </div>
    </>
  );
}

export function Hero() {
  const tiltRef = useHeroTilt();
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-eyebrow hi hi1">SITE SAFETY OPS</div>
        <h1 className="hi hi2">
          整座工地，
          <br />
          一眼掌握。
        </h1>
        <p className="hero-sub hi hi3">影像、門禁、環境、AI 偵測——一個平台，看住整個工地。</p>
        <div className="hero-ctas hi hi4">
          <a className="pill" href="#contact">
            預約 15 分鐘導覽
          </a>
          <a className="tlink" href="#modules">
            看它怎麼運作 ›
          </a>
        </div>
        <p className="hero-note hi hi5">不需綁約 · 用你現有的攝影機也接得上</p>
      </div>
      <div className="hero-stage hi hi6">
        <div className="hero-shot" ref={tiltRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset('/shots/dashboard.webp')} alt="智慧職安平台戰情室畫面" fetchPriority="high" width={1600} height={1000} />
        </div>
        <FloatCards />
      </div>
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="stats">
          <div className="stat">
            <CountUp to={3} suffix="秒內" />
            <span>從偵測到通知</span>
          </div>
          <div className="stat">
            <b>24/7</b>
            <span>全天候連續監測</span>
          </div>
          <div className="stat">
            <CountUp to={30} suffix="路畫面" />
            <span>一個人就看得住</span>
          </div>
        </div>
        <p className="stats-proof">本頁所有產品畫面，皆擷取自真實運行中的工地系統。</p>
      </div>
    </section>
  );
}
