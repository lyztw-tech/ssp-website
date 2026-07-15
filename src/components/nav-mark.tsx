/** 品牌標記：掃描光圈＋活動偵測藍點，呼應「一眼掌握」與全站 LIVE／掃描視覺語言。 */
export function NavMark({ gradId }: { gradId: string }) {
  return (
    <span className="nav-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="23" height="23">
        <circle className="nav-mark-ring" cx="12" cy="12" r="9.4" fill="none" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" fill={`url(#${gradId})`} />
        <circle className="nav-mark-blip" cx="12" cy="2.3" r="1.5" fill="var(--teal)" />
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--teal)" />
            <stop offset="100%" stopColor="var(--blue)" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
