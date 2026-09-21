import React, { useState, useRef, useEffect } from 'react';
import {
  Wrench,
  Droplets,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Maximize2,
  Sliders,
} from 'lucide-react';
import { SmartMedia } from './SmartMedia';
import { useMedia } from '../context/MediaContext';

export const Section1_IndoorCommunal: React.FC = () => {
  const { getAssetSrc } = useMedia();
  const [isPlayingVideo3, setIsPlayingVideo3] = useState(false);
  const [isManualPlay, setIsManualPlay] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height + windowHeight;
      const currentProgress = (windowHeight - rect.top) / totalScrollable;
      setScrollProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="section1"
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 bg-slate-950 border-t border-slate-900 overflow-hidden"
    >
      {/* Background Ambience & Water Wave Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute -top-40 right-0 w-96 h-96 bg-cyan-600/30 blur-[120px] rounded-full transition-transform duration-700"
          style={{ transform: `translateY(${scrollProgress * 80}px)` }}
        />
        <div
          className="absolute -bottom-40 left-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full transition-transform duration-700"
          style={{ transform: `translateY(${-scrollProgress * 60}px)` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title Header with Fade-in & Translation */}
        <div
          className="text-center max-w-3xl mx-auto mb-16 transition-all duration-700"
          style={{
            opacity: scrollProgress > 0.1 ? 1 : 0.4,
            transform: `translateY(${Math.max(0, (1 - scrollProgress) * 30)}px)`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3 shadow-md">
            <Wrench className="w-3.5 h-3.5" />
            <span>第一階段施工 • 根源疏通</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 text-shadow">
            第一區塊：戶內通管與水刀洗共管
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            徹底解決長年陳舊排水管油脂沉積、鈣化結石及異味問題。由各戶廚房、陽台支管深入通管，再動用
            <span className="text-cyan-400 font-semibold"> 超高壓 250bar 水刀逆噴頭</span>
            對公共立管進行全周向 360° 剝離式清洗。
          </p>
        </div>

        {/* 2-Column Grid matching user's prototype layout + enhanced interactive features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Card A: 戶內專業通管 (投影片2.JPG) */}
          <div
            className="flex flex-col bg-slate-900/60 rounded-2xl p-4 sm:p-6 border border-slate-800/80 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/40 group"
            style={{
              transform: `translateY(${(1 - scrollProgress) * 20}px) scale(${0.97 + scrollProgress * 0.03})`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
                  1A
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                    戶內支管通管作業
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">投影片2.JPG • 各戶支管疏通</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-mono text-cyan-400 border border-slate-700">
                深入 8~12m
              </span>
            </div>

            {/* Parallax Image Media */}
            <div className="overflow-hidden rounded-xl">
              <SmartMedia
                assetId="indoor_cleaning"
                aspectRatio="aspect-[4/3]"
                className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                caption="師傅以彈性鋼索與專用刀頭破除各戶陳年油脂硬化結石"
              />
            </div>

            {/* Engineering Highlights */}
            <div className="mt-5 space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>多彎道通過技術：</strong>採用進口旋轉軟軸通管機，順利通過 S 存水彎與 90 度雙彎曲角。
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>無損管壁探測：</strong>避免暴力硬捅導致老舊鑄鐵或 PVC 暗管破裂滲水。
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>內視鏡檢驗：</strong>疏通完畢即以光纖管道鏡複驗確認無殘留阻礙物。
                </span>
              </div>
            </div>
          </div>

          {/* Card B: 共管水刀洗管 (投影片3.JPG -> 投影片3.mp4) */}
          <div
            className="flex flex-col bg-slate-900/60 rounded-2xl p-4 sm:p-6 border border-slate-800/80 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/40 group"
            style={{
              transform: `translateY(${(1 - scrollProgress) * 35}px) scale(${0.97 + scrollProgress * 0.03})`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  1B
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition">
                    水刀洗共管（點擊或滾動播放）
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    投影片3.JPG / 投影片3.mp4 • 公共主幹管
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-xs font-mono text-cyan-400 border border-cyan-800 animate-pulse">
                250 bar 逆噴
              </span>
            </div>

            {/* Video Player / Poster Toggle */}
            <div className="relative rounded-xl overflow-hidden">
              <SmartMedia
                assetId="communal_washing_video"
                aspectRatio="aspect-[4/3]"
                autoPlayWhenInView={true}
                loop={true}
                caption="超高壓旋轉水刀頭於共用立管內全方位粉碎油脂壁垢，恢復原管徑出水截面"
                onPlayStateChange={setIsPlayingVideo3}
              />
            </div>

            {/* Engineering Highlights */}
            <div className="mt-5 space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <Droplets className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>自驅式旋轉水刀：</strong>利用 4 道後推噴嘴牽引水刀前進，3 道前向側噴粉碎硬質油垢。
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>管徑復原率 98%：</strong>消除積存數十年的皂化油磚，徹底解除二樓及低樓層回冒惡夢。
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>環境低污染：</strong>純物理純水加壓清洗，絕不使用腐蝕性強酸強鹼傷害管道與下水道。
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transitional Banner between Section 1 & 2 */}
        <div className="mt-16 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">
                單點洗通只能治標，明管重構方能治本
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm">
                洗管後發現部分樓層暗管因老舊震動產生微裂縫，以下進入 3D
                樓層管線配置與外牆明管重組方案。
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              document.getElementById('section2')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0 transition"
          >
            <span>檢視 3D 疊圖</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
