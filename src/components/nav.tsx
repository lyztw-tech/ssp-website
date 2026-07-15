'use client';

import { useEffect, useState } from 'react';
import { NavMark } from './nav-mark';

const LINKS = [
  { href: '#modules', label: '功能' },
  { href: '#field', label: '看板與 App' },
  { href: '#flow', label: '運作方式' },
  { href: '#deploy', label: '導入' },
  { href: '#plans', label: '合作' },
];

export function Nav() {
  const [on, setOn] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    const f = () => setOn(window.scrollY > 24);
    f();
    window.addEventListener('scroll', f, { passive: true });
    // SSR 一律先渲染深色，掛載後才讀 boot script 寫入的主題（只跑一次、只影響按鈕字樣）
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    return () => window.removeEventListener('scroll', f);
  }, []);
  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    if (next === 'light') document.documentElement.dataset.theme = 'light';
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem('ssp-theme', next);
    } catch {}
    setTheme(next);
  }
  return (
    <header className={`nav${on ? ' on' : ''}`}>
      <i className="scroll-progress" aria-hidden="true" />
      <div className="nav-in">
        <a href="#top" className="nav-logo">
          <NavMark gradId="nav-mark-grad-header" />
          智慧職安平台
        </a>
        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <button type="button" className="theme-btn" onClick={toggleTheme} aria-label="切換深淺色主題">
          {theme === 'dark' ? '☀ 淺色' : '☾ 深色'}
        </button>
        <a className="nav-cta" href="#contact">
          預約導覽<i aria-hidden="true">→</i>
        </a>
      </div>
    </header>
  );
}
