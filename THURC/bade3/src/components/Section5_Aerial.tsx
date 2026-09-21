import React, { useState, useRef, useEffect } from 'react';
import {
  Plane,
  Sparkles,
  PhoneCall,
  Calendar,
  ShieldCheck,
  Building2,
  ExternalLink,
  ChevronUp,
} from 'lucide-react';
import { SmartMedia } from './SmartMedia';
import { useMedia } from '../context/MediaContext';

export const Section5_Aerial: React.FC = () => {
  const { setOpenContactModal, setOpenAssetModal, setOpenGitHubModal } = useMedia();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = (windowHeight - rect.top) / (rect.height + windowHeight);
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Zoom-out effect on scroll: start slightly larger and scale to normal 1.0
  const zoomScale = Math.max(1.0, 1.15 - scrollProgress * 0.15);

  return (
    <section
      id="section5"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 bg-slate-950 border-t border-slate-900 overflow-hidden flex flex-col justify-between"
    >
      {/* Ambience glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full my-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono mb-3 shadow-lg">
            <Plane className="w-3.5 h-3.5" />
            <span>第五區塊 • 片尾彩蛋</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 text-shadow">
            社區全景空拍
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            以 4K 無人機航拍八德三號外牆整體管線美學、立體落水路徑與天際線輪廓。
            外牆明管整齊劃一，兼顧排污效能與建築外觀整體感。
          </p>
        </div>

        {/* Aerial Survey Video Frame with Zoom-Out Motion */}
        <div
          className="relative rounded-3xl overflow-hidden border border-slate-700/60 bg-slate-900/90 shadow-2xl transition-transform duration-300 will-change-transform max-w-5xl mx-auto"
          style={{ transform: `scale(${zoomScale})` }}
        >
          <SmartMedia
            assetId="aerial_video"
            aspectRatio="aspect-[16/9]"
            autoPlayWhenInView={true}
            loop={true}
            caption="投影片12.mp4 • 4K 空拍片尾彩蛋：八德三號社區外觀與高空管線巡禮"
          />
        </div>

        {/* Project Closing Card & Consultation CTA Box */}
        <div className="mt-16 max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 via-cyan-950/40 to-slate-900/90 border border-cyan-500/30 shadow-2xl backdrop-blur-md text-center relative overflow-hidden">
          {/* Subtle animated water flow line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-4 shadow-inner">
            <Building2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            老舊管線漏水、倒灌、惡臭困擾？
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
            八德三號實證經驗：專業管線內視鏡勘查、250bar 高壓水刀逆噴、外牆明管 3D 規劃施工。
            歡迎各大管委會與業主洽詢現場勘驗與評估規劃！
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Primary CTA button with Pulse effect */}
            <button
              onClick={() => setOpenContactModal(true)}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-base shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all transform hover:-translate-y-1 active:translate-y-0 animate-pulse hover:animate-none"
            >
              <PhoneCall className="w-5 h-5" />
              <span>免費諮詢 / 預約現勘</span>
            </button>

            <button
              onClick={() => setOpenGitHubModal(true)}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition"
            >
              <span>獲取 GitHub 專案原始碼</span>
              <ExternalLink className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 text-center text-xs text-slate-500 border-t border-slate-900 mt-12 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>© 八德三號 排水接管工程完整實錄 • 專業工務團隊敬製</div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpenAssetModal(true)}
            className="hover:text-cyan-400 transition"
          >
            雲端素材檢視
          </button>
          <button
            onClick={() => setOpenGitHubModal(true)}
            className="hover:text-cyan-400 transition"
          >
            GitHub 部署文件
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 hover:text-white transition"
          >
            <span>返回頂部</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </section>
  );
};
