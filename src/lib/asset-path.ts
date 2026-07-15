/**
 * GitHub Pages 專案頁跑在 /ssp-website/ 這個子路徑下（repo 名稱，見 next.config.ts），
 * 但 next/link 以外的東西（<img src="/...">、CSS url()）都不會自動加上 basePath。
 * 所有指向 public/ 底下靜態檔案的 <img src> 一律要包這層，不要直接寫死絕對路徑。
 *
 * NEXT_PUBLIC_BASE_PATH 由 .github/workflows/deploy.yml 在 build 時注入；
 * 本機 dev/build 沒設這個 env，asset() 就是 no-op（回傳原路徑）。
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
