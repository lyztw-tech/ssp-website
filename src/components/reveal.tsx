'use client';

/** 進場 reveal：共用一個 IntersectionObserver，元素進視口加 .in（一次性）。 */
import { useEffect, useRef } from 'react';

let io: IntersectionObserver | null = null;
function getIO() {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io?.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    );
  }
  return io;
}

export function Rv({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
}: {
  as?: 'div' | 'section' | 'h2' | 'h3' | 'p' | 'figure';
  className?: string;
  delay?: 0 | 1 | 2 | 3;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getIO();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  const d = delay ? ` d${delay}` : '';
  const El: React.ElementType = Tag;
  return (
    <El ref={ref} className={`rv${d} ${className}`.trim()}>
      {children}
    </El>
  );
}
