import React, { useState, useRef, useEffect } from 'react';
import {
  GitMerge,
  Layers,
  Play,
  Pause,
  Sliders,
  Sparkles,
  ArrowRight,
  Maximize2,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { SmartMedia } from './SmartMedia';
import { useMedia } from '../context/MediaContext';

export const Section3_ExposedPipe: React.FC = () => {
  const { getAssetSrc } = useMedia();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll tracking inside section 3
  const [scrollProgress, setScrollProgress] = useState(0);

  // Stage 1 Overlay slider / Wipe comparison
  const [wipePosition, setWipePosition] = useState<number>(50); // 0 to 100%
  const [activeStage, setActiveStage] = useState<'compare' | 'simulation'>('compare');
  const [activeSimulation, setActiveSimulation] = useState<'A' | 'B'>('A');

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const progress = -rect.top / totalScrollable;
      const clamped = Math.min(Math.max(progress, 0), 1);
      setScrollProgress(clamped);

      // Transition stages automatically based on scroll
      if (clamped > 0.45) {
        setActiveStage('simulation');
      } else {
        setActiveStage('compare');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="section3"
      ref={sectionRef}
      className="relative w-full bg-slate-950 border-t border-slate-900"
      style={{ height: '220vh' }}
    >
      {/* Sticky Stage Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between pt-16 pb-8 px-4 sm:px-6 overflow-hidden">
        {/* Header Navigation & Stage Switcher */}
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2 shadow-lg">
              <GitMerge className="w-3.5 h-3.5" />
              <span>第三區塊 • 外牆明管規劃與水流模擬</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight text-shadow">
              第三區塊：接明管規劃與模擬
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              階段 1：牆面與管線路徑疊圖比對 ➔ 階段 2：透明觀測管內部水流流體動力學模擬。
            </p>
          </div>

          {/* Interactive Mode Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setActiveStage('compare')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeStage === 'compare'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>階段 1: 施工疊圖比對</span>
            </button>
            <button
              onClick={() => setActiveStage('simulation')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeStage === 'simulation'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>階段 2: 水流模擬 (投影片5/6)</span>
            </button>
          </div>
        </div>

        {/* Central Dynamic Viewport */}
        <div className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-3 select-none">
          {activeStage === 'compare' ? (
            /* STAGE 1: Interactive Wipe / Opacity Overlay Comparison */
            <div className="relative w-full max-w-4xl aspect-[16/10] max-h-[58vh] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
              {/* Layer 1: 原始外牆現況底圖 (投影片4 / 原牆面) */}
              <div className="absolute inset-0">
                <img
                  src={getAssetSrc('floor_base')}
                  alt="原始外牆"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-slate-950/85 border border-slate-700 text-xs font-mono text-slate-300">
                  【施工前】原始外牆與既有暗管走勢
                </div>
              </div>

              {/* Layer 2: 規劃明管位置圖層 (Wipe Clipped or Opacity Stacking) */}
              <div
                className="absolute inset-0 overflow-hidden transition-all duration-75"
                style={{
                  clipPath: `polygon(0 0, ${wipePosition}% 0, ${wipePosition}% 100%, 0 100%)`,
                }}
              >
                <img
                  src={getAssetSrc('floor_3f')}
                  alt="明管規劃疊圖"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-cyan-900/10 pointer-events-none" />
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-500/50 text-xs font-mono text-cyan-300 shadow-lg">
                  【施工規劃】明管走向、防震吊架與順水斜度 1:50
                </div>
              </div>

              {/* Wipe Divider Line & Draggable Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-sky-300 to-blue-500 cursor-ew-resize z-30 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                style={{ left: `${wipePosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-xl font-bold text-xs pointer-events-none">
                  ↔
                </div>
              </div>

              {/* Interactive Wipe Slider Bar */}
              <div className="absolute bottom-4 right-4 z-40 flex items-center gap-2 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-700 backdrop-blur-md">
                <span className="text-[11px] font-mono text-slate-400">左右滑動比對:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={wipePosition}
                  onChange={(e) => setWipePosition(Number(e.target.value))}
                  className="w-28 accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-cyan-300">{wipePosition}%</span>
              </div>
            </div>
          ) : (
            /* STAGE 2: Expanding Flow Simulation Videos (投影片5.mp4 & 投影片6.mp4) */
            <div className="w-full max-w-5xl transition-all duration-700 animate-in zoom-in-95">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Simulation Video A: 投影片5.mp4 */}
                <div
                  className={`flex flex-col bg-slate-900/80 rounded-2xl p-4 border transition-all duration-300 ${
                    activeSimulation === 'A'
                      ? 'border-cyan-500/60 shadow-2xl shadow-cyan-500/20'
                      : 'border-slate-800 opacity-80 hover:opacity-100'
                  }`}
                  onClick={() => setActiveSimulation('A')}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-xs font-bold font-mono">
                        SIM-A
                      </span>
                      <h4 className="text-white font-bold text-sm">
                        明管設計模擬 A (投影片5.mp4)
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">落水重力自流</span>
                  </div>

                  <SmartMedia
                    assetId="exposed_pipe_a"
                    aspectRatio="aspect-video"
                    autoPlayWhenInView={true}
                    loop={true}
                    caption="外牆厚管不鏽鋼吊架配管與落水斜度 1:50 實測模擬"
                  />

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    透過外牆垂直明管設計，各樓層支管以 45° 順水彎匯入，大幅削弱管壁直衝摩擦與渦流阻抗。
                  </p>
                </div>

                {/* Simulation Video B: 投影片6.mp4 */}
                <div
                  className={`flex flex-col bg-slate-900/80 rounded-2xl p-4 border transition-all duration-300 ${
                    activeSimulation === 'B'
                      ? 'border-blue-500/60 shadow-2xl shadow-blue-500/20'
                      : 'border-slate-800 opacity-80 hover:opacity-100'
                  }`}
                  onClick={() => setActiveSimulation('B')}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold font-mono">
                        SIM-B
                      </span>
                      <h4 className="text-white font-bold text-sm">
                        明管設計模擬 B (投影片6.mp4)
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">透明管內部流速</span>
                  </div>

                  <SmartMedia
                    assetId="exposed_pipe_b"
                    aspectRatio="aspect-video"
                    autoPlayWhenInView={true}
                    loop={true}
                    caption="透明觀測管內部水流流體動力學與消音排水動態"
                  />

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    透明管實驗證實：水流沿管壁形成環狀螺旋下墜，中央保持空氣通氣心，防止存水彎虹吸破封。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Technical Specifications Card */}
        <div className="max-w-6xl mx-auto w-full z-30">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <Compass className="w-4 h-4" />
              <span>接明管關鍵工法標準：</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-slate-300">
              <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800">
                • 洩水坡度嚴格要求 <strong>1:50</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800">
                • 間距 1.5m 雙點固定防風震吊架
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800">
                • 各層匯流處均預留 <strong>螺紋密封檢修 CO 孔</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800">
                • 抗紫外線外層塗裝保固 10 年
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
