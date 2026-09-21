import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  ShieldAlert,
  Award,
  Sparkles,
  Droplet,
  Volume2,
  Check,
  Maximize2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SmartMedia } from './SmartMedia';
import { useMedia } from '../context/MediaContext';

export const Section4_Completion: React.FC = () => {
  const { getAssetSrc } = useMedia();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (!hasCelebrated) {
              setHasCelebrated(true);
              confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#38bdf8', '#3b82f6', '#10b981', '#ffffff'],
              });
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasCelebrated]);

  const fireConfettiAgain = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#38bdf8', '#3b82f6', '#10b981', '#fbbf24'],
    });
  };

  return (
    <section
      id="section4"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 bg-gradient-to-b from-slate-950 via-[#071120] to-slate-950 border-t border-slate-900 overflow-hidden flex flex-col justify-center"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Animated Slide-in Headline from Left to Right per spec */}
        <div className="mb-10 text-center sm:text-left overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4 shadow-lg">
            <Award className="w-3.5 h-3.5" />
            <span>第四區塊 • 全案完工驗收</span>
          </div>

          <div
            className={`transition-all duration-1000 ease-out transform ${
              inView ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
            }`}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                順利完工・排水順暢
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg mt-3 max-w-2xl">
              接管工程全線告捷！大水量連續洩水測試通過，無積水、無冒泡、無水錘回震，全面升級八德三號排水品質。
            </p>
          </div>
        </div>

        {/* Hero Video Container (投影片11.mp4) */}
        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-slate-900/90 shadow-[0_25px_60px_-15px_rgba(16,185,129,0.25)] p-2 sm:p-4 backdrop-blur-md">
          {/* Top Verification Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 border-b border-slate-800/80 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                完工播放影片 (投影片11.mp4)
              </span>
              <span className="text-xs text-emerald-400 font-mono hidden sm:inline">
                [驗收合格 Pass]
              </span>
            </div>

            <button
              onClick={fireConfettiAgain}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium border border-emerald-500/40 transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>慶祝完工特效</span>
            </button>
          </div>

          {/* Video Player */}
          <div className="rounded-2xl overflow-hidden">
            <SmartMedia
              assetId="completion_video"
              aspectRatio="aspect-[16/9]"
              autoPlayWhenInView={true}
              loop={true}
              caption="投影片11.mp4 • 完工大水量排水實測：暢通流洩至公共地下沉砂排污箱涵"
            />
          </div>

          {/* 4 Quantitative Verification Inspection Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">大水量沖水測試</div>
                <div className="text-[11px] text-emerald-400">100% 順流無積塞</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">氣密防臭防逆流</div>
                <div className="text-[11px] text-emerald-400">存水封存率 100%</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">水錘消音檢驗</div>
                <div className="text-[11px] text-cyan-400">音量降至 ≤ 32dB</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">結構抗震拉力</div>
                <div className="text-[11px] text-cyan-400">耐 7 級強震標準</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
