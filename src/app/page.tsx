import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Act, ModWide, ModSplit, AiModule } from '@/components/showcase';
import { DashLive, CamWall, EnvLive, LprFlow, BroadcastLive, ReportLive } from '@/components/live';
import { BeforeAfter, TrustStrip, FrameGlow, Ambient, ToTop } from '@/components/extras';
import { Integrations } from '@/components/integrations';
import { BoardShowcase, AppShowcase, VisitorStory } from '@/components/field';
import { Flow } from '@/components/flow';
import { Deploy, Belief, Plans, Roi, Faq, Cta, Footer } from '@/components/closing';

export default function Home() {
  return (
    <>
      <Nav />
      <FrameGlow />
      <Ambient />
      <main>
        <Hero />
        <BeforeAfter />

        {/* 第 1 幕 · 看得見 */}
        <div id="modules">
          <Act
            no="1"
            name="看得見"
            title={
              <>
                整個工地的狀況，
                <br />
                此刻就在眼前。
              </>
            }
            sub="人數、車輛、環境、告警——開早會前，先看這一眼。"
          />
        </div>
        <ModWide
          id="m-dash"
          media={<DashLive />}
          cap={
            <>
              <b>戰情室。</b>全工地即時狀態，一個畫面說完——上面這塊是活的，數字正在跳。
            </>
          }
        />
        <ModSplit
          id="m-cctv"
          media={<CamWall />}
          title={
            <>
              即時影像。
              <br />
              塔吊區和大門，同時盯。
            </>
          }
          desc="4／9 宮格加平面圖點位，雙擊開浮動視窗。夜間紅外線畫面照樣看得清，AI 同步在畫面上圈人。"
          mini="畫面為真實系統夜視影像 · 支援既有攝影機 RTSP／ONVIF"
        />
        <ModSplit
          id="m-env"
          media={<EnvLive />}
          flip
          title={
            <>
              環境監測。
              <br />
              超標的那一刻就告警。
            </>
          }
          desc="PM2.5、噪音、風速即時上雲，超標自動告警與廣播——不用等人去看儀表。"
        />

        {/* 第 2 幕 · 攔得住 */}
        <Act
          no="2"
          name="攔得住"
          title={
            <>
              異常發生的那一秒，
              <br />
              系統已經開始動作。
            </>
          }
          sub="不是事後看紀錄，是當下就攔。"
        />
        <ModSplit
          id="m-access"
          media={<LprFlow />}
          title={
            <>
              門禁管理。
              <br />
              誰進來過，說得清楚。
            </>
          }
          desc="人臉進場、車牌放行，白名單外的車直接攔。承攬商進場管理，一筆一筆都有紀錄。"
          mini="對接臺灣職安卡進場管理情境"
        />
        <AiModule />

        {/* 第 3 幕 · 說得清 */}
        <Act
          no="3"
          name="說得清"
          title={
            <>
              每一件事的來龍去脈，
              <br />
              都留得下紀錄。
            </>
          }
          sub="從告警、處置到歸檔一條龍留痕——勞檢來的那天，一秒調出來。"
        />
        <ModSplit
          id="m-broadcast"
          media={<BroadcastLive />}
          title={
            <>
              告警與廣播。
              <br />
              一鍵讓全工地聽見。
            </>
          }
          desc="告警集中處理、快捷訊息一鍵播送。事件從發生到結案，全程留痕。"
        />
        <ModSplit
          id="m-report"
          media={<ReportLive />}
          flip
          title={
            <>
              施工日報。
              <br />
              每天自動寫好。
            </>
          }
          desc="人流、車輛、環境、告警自動彙整成日報，可匯出 PDF——主管機關備查，隨時拿得出來。"
        />

        {/* 第 4 幕 · 帶得走 */}
        <div id="field">
          <Act
            no="4"
            name="帶得走"
            title={
              <>
                掛上牆是看板，
                <br />
                放進口袋是戰情室。
              </>
            }
            sub="工務所的電視、大門的立牌、保全的手機——現場在哪，掌握就在哪。"
          />
        </div>
        <BoardShowcase />
        <AppShowcase />
        <VisitorStory />

        <Flow />
        <Integrations />
        <Deploy />
        <Belief />
        <Plans />
        <Roi />
        <Faq />
        <TrustStrip />
        <Cta />
      </main>
      <Footer />
      <ToTop />
    </>
  );
}
