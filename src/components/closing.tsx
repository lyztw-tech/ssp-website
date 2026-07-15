'use client';

/** 收尾區：導入三步、理念、合作方式、FAQ、CTA、Footer。 */
import Link from 'next/link';
import { Rv } from './reveal';
import { NavMark } from './nav-mark';

export function Deploy() {
  return (
    <section id="deploy">
      <div className="act wrap">
        <Rv>
          <span className="act-eyebrow">導入</span>
        </Rv>
        <Rv as="h2" delay={1}>
          接得上，裝得快，
          <br />
          守得住。
        </Rv>
        <Rv as="p" delay={2}>
          不用換掉現有設備，也不用工地停下來等系統。
        </Rv>
      </div>
      <div className="wrap" style={{ padding: '30px 0 40px' }}>
        <Rv className="deploy-grid">
          <div className="deploy-card" data-n="01">
            <i>STEP 1 · 勘場</i>
            <b>到你的工地走一圈</b>
            <p>盤點既有攝影機與網路，規劃監測點位與門禁動線。</p>
            <div className="dd">約 1 個工作天</div>
          </div>
          <div className="deploy-card" data-n="02">
            <i>STEP 2 · 佈點安裝</i>
            <b>裝上該裝的，接上已有的</b>
            <p>感測站、門禁、邊緣閘道定位安裝；既有攝影機直接串接。</p>
            <div className="dd">約 3–5 個工作天</div>
          </div>
          <div className="deploy-card" data-n="03">
            <i>STEP 3 · 上線陪跑</i>
            <b>開始 24/7 守望</b>
            <p>告警規則調校、人員教育訓練，上線後持續陪跑優化。</p>
            <div className="dd">上線即生效 · 全程支援</div>
          </div>
        </Rv>
      </div>
    </section>
  );
}

export function Belief() {
  return (
    <section className="belief" id="belief">
      <div className="wrap">
        <Rv>
          <div className="belief-eyebrow">我們相信</div>
        </Rv>
        <Rv as="h2" delay={1}>
          <u>安全是回家</u>
          <br />
          唯一的路。
        </Rv>
        <Rv as="p" delay={2}>
          這句話寫在每一座工地的圍籬上。我們做的，是把它做成一套真的在運作的系統——讓危險在發生之前，就被看見。
        </Rv>
      </div>
    </section>
  );
}

function PIc({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export function Plans() {
  return (
    <section id="plans">
      <div className="act wrap">
        <Rv>
          <span className="act-eyebrow">合作方式</span>
        </Rv>
        <Rv as="h2" delay={1}>
          三種方式，
          <br />
          把安全帶進你的案場。
        </Rv>
      </div>
      <div className="wrap" style={{ padding: '30px 0 30px' }}>
        <Rv className="plans-grid">
          <div className="plan">
            <i className="plan-ic">
              <PIc>
                <path d="M4 21h16M6 21V6l9-3v18" />
                <path d="M15 5.5h6M21 5.5v3.5" stroke="var(--teal)" />
                <path d="M18.5 9v2.2" stroke="var(--teal)" />
                <circle cx="18.5" cy="12.4" r="1" stroke="var(--teal)" />
              </PIc>
            </i>
            <b>單一工地導入</b>
            <p>按工地訂閱，工期結束即止。</p>
            <ul>
              <li>含設備安裝與平台使用</li>
              <li>免綁多年約</li>
              <li>撤場設備可移轉下個案場</li>
            </ul>
            <span className="tag">最快兩週上線</span>
          </div>
          <div className="plan hl">
            <i className="plan-ic">
              <PIc>
                <path d="M3 21h18M5 21V10h5v11M14 21V4h5v17" />
                <path d="M7 13h1M7 16h1M16 8h1M16 12h1M16 16h1" stroke="var(--teal)" />
              </PIc>
            </i>
            <b>集團企業方案</b>
            <p>多工地集中管理，總部看得到每一個案場。</p>
            <ul>
              <li>集團戰情室與跨案場報表</li>
              <li>與既有 ERP／門禁制度整合</li>
              <li>專屬客戶成功窗口</li>
            </ul>
            <span className="tag">適合營造廠 · 建設公司</span>
          </div>
          <div className="plan">
            <i className="plan-ic">
              <PIc>
                <circle cx="6" cy="6" r="2.5" />
                <circle cx="18" cy="8" r="2.5" />
                <circle cx="12" cy="18" r="2.5" stroke="var(--teal)" />
                <path d="M8.2 7.2l7.4 0M7.5 8.2l3 7.6M16.6 10.2l-3 5.6" />
              </PIc>
            </i>
            <b>經銷與整合商</b>
            <p>把平台帶進你的監控／弱電案場。</p>
            <ul>
              <li>白牌與分潤模式</li>
              <li>技術對接與教育訓練</li>
              <li>共同投標支援</li>
            </ul>
            <span className="tag">歡迎系統整合商洽談</span>
          </div>
        </Rv>
      </div>
    </section>
  );
}

export function Roi() {
  return (
    <section id="roi">
      <div className="act wrap">
        <Rv>
          <span className="act-eyebrow">值不值得</span>
        </Rv>
        <Rv as="h2" delay={1}>
          把它當保險算，
          <br />
          不要當軟體算。
        </Rv>
      </div>
      <div className="wrap">
        <Rv className="roi">
          <div className="roi-card bad">
            <b>一次重大職災的代價</b>
            <ul>
              <li>
                <i>罰鍰</i>
                <span>職安法罰鍰單件 3–30 萬，可按次連罰</span>
              </li>
              <li>
                <i>停工</i>
                <span>勒令停工期間，管銷照燒、機具照租</span>
              </li>
              <li>
                <i>賠償</i>
                <span>民事和解與職災補償，常見數百萬</span>
              </li>
              <li>
                <i>工期</i>
                <span>延誤違約金，加上招標信譽的隱形損失</span>
              </li>
            </ul>
            <div className="roi-sum">動輒數百萬起——還不含刑責。</div>
          </div>
          <div className="roi-vs" aria-hidden="true">
            vs
          </div>
          <div className="roi-card good">
            <b>平台一年的費用</b>
            <ul>
              <li>
                <i>計價</i>
                <span>按工地、按月訂閱，含設備安裝與平台使用</span>
              </li>
              <li>
                <i>量級</i>
                <span>單一工地通常落在每月數萬元的量級</span>
              </li>
              <li>
                <i>彈性</i>
                <span>免綁多年約，工期結束即止</span>
              </li>
              <li>
                <i>移轉</i>
                <span>撤場設備可帶到下一個案場繼續用</span>
              </li>
            </ul>
            <div className="roi-sum ok">是一次事故成本的零頭。</div>
          </div>
        </Rv>
        <Rv as="p" className="roi-note" delay={1}>
          精確報價依工地規模與模組組合，勘場後給你——預約示範時，現場就能先估。
        </Rv>
      </div>
    </section>
  );
}

const FAQS: { q: string; a: string; open?: boolean }[] = [
  {
    q: '既有的攝影機可以接嗎？',
    a: '可以。支援標準 RTSP／ONVIF 串流，勘場時會逐台確認；大多數工地的既有監視系統不用換機就能上平台。',
  },
  {
    q: '工地網路不穩、斷網怎麼辦？',
    a: '邊緣閘道會在現場先存、先判讀，網路恢復後自動續傳，資料不漏接；告警在現場端也能先觸發廣播。',
  },
  {
    q: '影像和人員資料放在哪裡？',
    a: '台灣機房、資料不出境。人臉特徵值加密儲存，僅用於進場管理，遵循個資法規範，離場即可申請刪除。',
  },
  {
    q: '需要派人駐點操作嗎？',
    a: '不用。系統 24/7 自動監測與告警，工務／工安人員用手機和戰情室看結果就好；我們提供教育訓練與陪跑。',
  },
  {
    q: '半夜的告警誰處理？',
    a: '可指定值班人與通知升級鏈——逾時未讀自動升級到下一位、必要時觸發語音通知；也能設定靜音時段與嚴重度分級。導入陪跑時，我們會和你一起把值班 SOP 建起來。',
    open: true,
  },
  {
    q: 'AI 誤報很多怎麼辦？',
    a: '告警可一鍵標記誤報，系統依現場回饋持續調整；也能按區域、時段設定觸發條件，讓告警只在該響的時候響。',
    open: true,
  },
  {
    q: '設備壞了、平台掛了怎麼辦？',
    a: '設備離線平台會自動告警，不會默默斷線；故障回報後 24 小時內回應，備品更換與到場時效在合約中明訂。平台端有異常監控與通報機制。',
  },
  {
    q: '刷臉和車牌辨識，會有個資問題嗎？',
    a: '資料存放台灣機房、僅專案授權人員可查詢，保存期限依專案設定，並提供進場告知與同意機制範本，符合個資法要求。',
    open: true,
  },
  {
    q: '不續約或工程結束，資料怎麼辦？',
    a: '告警紀錄、進出紀錄、施工日報可完整匯出（PDF／CSV）帶走；影像依保存政策交付；設備走標準協定不鎖廠；個資依約定期限刪除。你的資料是你的。',
  },
  {
    q: '這些紀錄能用在勞檢或工安查核嗎？',
    a: '可以。告警、門禁、環境數據都有完整時間戳並可匯出報表，可作為內部工安稽核與查核佐證文件。',
  },
  {
    q: '價格怎麼算？',
    a: '按工地、按月訂閱，含設備與安裝，免綁多年約；單一工地通常是每月數萬元的量級，精確金額依規模與模組勘場後報價。預約 15 分鐘導覽，現場估給你。',
    open: true,
  },
];

export function Faq() {
  return (
    <section className="wrap" id="faq" style={{ padding: '40px 0 20px' }}>
      <Rv className="faq">
        {FAQS.map((f) => (
          <details key={f.q} open={f.open}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </Rv>
    </section>
  );
}

/** 靜態站沒有後端可以收表單（GitHub Pages 只能放純靜態檔案），CTA 一律走 mailto。
 * TODO：CONTACT_EMAIL 目前是佔位符，上線前換成真的聯絡信箱。 */
const CONTACT_EMAIL = 'contact@CHANGE_ME.tw';
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('預約智慧職安平台現場示範')}`;

export function Cta() {
  return (
    <section className="cta" id="contact">
      <div className="wrap">
        <Rv>
          <span className="act-eyebrow">看得見 · 攔得住 · 說得清</span>
        </Rv>
        <Rv as="h2" delay={1}>
          來看一場
          <br />
          15 分鐘的現場示範。
        </Rv>
        <Rv as="p" delay={1}>
          帶你的工地平面圖來，我們直接用你的案場規劃給你看。
        </Rv>
        <Rv delay={2}>
          <a className="pill" href={CONTACT_MAILTO}>
            來信預約 · {CONTACT_EMAIL}
          </a>
          <div className="cta-note">
            不需綁約 · 不用先買設備 · 用你現有的攝影機也接得上
            <br />
            來信附上工地規模與聯絡方式，1 個工作天內由熟悉工地現場的工程師與你聯繫——不是業務電話轟炸。
          </div>
        </Rv>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-in">
          <span className="nav-logo">
            <NavMark gradId="nav-mark-grad-footer" />
            智慧職安平台
          </span>
          <nav className="footer-links">
            <a href="#modules">功能</a>
            <a href="#flow">運作方式</a>
            <a href="#plans">合作</a>
            <a href="#contact">預約示範</a>
            <Link href="/privacy">隱私權政策</Link>
            <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
          </nav>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} 智慧職安平台 SITE SAFETY OPS · 台灣開發 · 資料不出境
        </div>
      </div>
    </footer>
  );
}
