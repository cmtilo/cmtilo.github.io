import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  Play,
  FileSpreadsheet,
} from 'lucide-react';
import { useMedia } from '../context/MediaContext';

export const HeroSection: React.FC = () => {
  const { getAssetSrc, setOpenAssetModal } = useMedia();
  const heroImgSrc = getAssetSrc('hero');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToNext = () => {
    document.getElementById('section1')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollTo3D = () => {
    document.getElementById('section2')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Parallax Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out will-change-transform"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 17, 32, 0.65), rgba(11, 17, 32, 0.92)), url('${heroImgSrc}')`,
          transform: `translateY(${scrollY * 0.35}px) scale(${1 + scrollY * 0.0003})`,
        }}
      />

      {/* Fallback procedural glow if image is pending */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Blueprint Grid Lines Overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Project Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-medium mb-6 shadow-xl shadow-cyan-950/40 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-700">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>八德三號 • 建築排水現代化改造實錄</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight md:leading-none mb-6 text-shadow">
          八德三號
          <span className="block text-2xl sm:text-4xl md:text-5xl mt-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
            排水接管工程完整實錄
          </span>
        </h1>

        {/* Hero Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal mb-8 text-shadow">
          針對老舊共管回堵、油脂硬化結石與落水衝擊噪聲，採用
          <strong className="text-cyan-300 font-semibold"> 250bar 高壓水刀洗管</strong>、
          <strong className="text-sky-300 font-semibold">外牆懸吊式明管重構</strong>與
          <strong className="text-emerald-300 font-semibold"> 3D 樓層立體分流規劃</strong>，建立長治久安的順暢排水系統。
        </p>

        {/* Fast Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          <button
            onClick={scrollToNext}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>開始瀏覽工程紀錄</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={scrollTo3D}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700/80 shadow-lg backdrop-blur-sm transition"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>檢視 3D 樓層疊圖</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('section4');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700/80 shadow-lg backdrop-blur-sm transition"
          >
            <Play className="w-4 h-4 text-emerald-400" />
            <span>完工驗收實測</span>
          </button>
        </div>

        {/* Quick Engineering Key Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/70 backdrop-blur-sm text-left">
            <div className="text-xs text-slate-400 mb-1">施工標的</div>
            <div className="text-sm font-bold text-white">八德三號全區</div>
            <div className="text-[11px] text-cyan-400 mt-0.5">立管與外牆重整</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/70 backdrop-blur-sm text-left">
            <div className="text-xs text-slate-400 mb-1">水刀洗管壓力</div>
            <div className="text-sm font-bold text-cyan-300">250 bar</div>
            <div className="text-[11px] text-slate-400 mt-0.5">360° 全周向逆洗</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/70 backdrop-blur-sm text-left">
            <div className="text-xs text-slate-400 mb-1">管材與工法</div>
            <div className="text-sm font-bold text-white">PVC-U 厚管</div>
            <div className="text-[11px] text-emerald-400 mt-0.5">抗震雙螺帽吊架</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/70 backdrop-blur-sm text-left">
            <div className="text-xs text-slate-400 mb-1">驗收通水率</div>
            <div className="text-sm font-bold text-emerald-400">100% 暢通</div>
            <div className="text-[11px] text-slate-400 mt-0.5">大水量瞬間落水</div>
          </div>
        </div>

        {/* Bottom Scroll Down Bouncing Hint */}
        <button
          onClick={scrollToNext}
          aria-label="向下滾動"
          className="mt-12 inline-flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition animate-bounce cursor-pointer"
        >
          <span className="text-xs font-mono tracking-widest uppercase">向下滾動探索</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
