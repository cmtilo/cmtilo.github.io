import React, { useState, useRef } from 'react';
import { 
  ChevronDown, 
  Layers, 
  ShieldCheck, 
  Wrench, 
  Sparkles, 
  Building2, 
  Eye
} from 'lucide-react';
import { MouseEffectSettings } from '../types';

interface HeroSectionProps {
  settings: MouseEffectSettings;
  onExploreClick: () => void;
  onView3DClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  onExploreClick,
  onView3DClick,
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!settings.tiltEnabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 blueprint-grid perspective-1000"
    >
      {/* Background Image Parallax with Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-300 ease-out scale-105"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.85) 75%, rgba(2, 6, 23, 0.98)), url('/投影片1.jpg')`,
          transform: settings.tiltEnabled && isHovering
            ? `scale(1.08) translate3d(${tilt.x * -0.6}px, ${tilt.y * -0.6}px, 0px)`
            : 'scale(1.05)',
        }}
      />

      {/* Atmospheric Engineering Lighting Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main 3D Tilted Content Container */}
      <div
        className="relative z-10 max-w-5xl w-11/12 mx-auto text-center transition-transform duration-200 ease-out preserve-3d"
        style={{
          transform: settings.tiltEnabled && isHovering
            ? `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(10px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
        }}
      >
        {/* Project Label Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg shadow-cyan-950/50 mb-6 animate-pulse">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span>八德三號社會住宅 • 現代化排水系統升級</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>

        {/* Hero Main Titles with 3D Depth */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wider mb-4 drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] font-sans">
          八德三號
        </h1>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-sky-100 to-blue-400 bg-clip-text text-transparent tracking-wide mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
          排水接管工程實錄
        </h2>

        {/* Narrative Subtitle */}
        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-10 font-normal text-balance drop-shadow-md">
          從戶內暗管機械通管、公共主管超高壓旋轉水刀清淤，到外牆 3D 接明管立管規劃與耐震高空吊掛施工，以全方位工程工法記錄排水系統新生。
        </p>

        {/* Quick Highlights / Stats Grid with 3D Depth */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-left">
          {[
            { label: '階段一', title: '戶內機械通管', desc: '100% 支管清疏', icon: Wrench },
            { label: '階段二', title: '超高壓水刀洗管', desc: '250 BAR 徹底除垢', icon: Sparkles },
            { label: '階段三', title: '3D 疊圖模擬明管', desc: '1/50 最佳坡度設計', icon: Layers },
            { label: '階段四五', title: '吊掛完工 & 空拍', desc: '全景高空驗收記錄', icon: ShieldCheck },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="group p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                style={{
                  transform: settings.tiltEnabled && isHovering
                    ? `translateZ(${(i + 1) * 8}px)`
                    : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-semibold text-cyan-400">
                    {card.label}
                  </span>
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div className="font-semibold text-slate-100 text-sm">{card.title}</div>
                <div className="text-xs text-slate-400 mt-1">{card.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>開始觀看實錄</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>

          <button
            onClick={onView3DClick}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-cyan-300 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>體驗 3D 疊圖視差</span>
          </button>
        </div>

        {/* Mouse Interaction Instruction Hint */}
        <div className="mt-8 text-xs text-cyan-300/70 font-mono flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>滑鼠於畫面中移動可觸發 3D 空間角度視差跟隨</span>
        </div>
      </div>

      {/* Down Arrow Floating Indicator */}
      <button
        onClick={onExploreClick}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 hover:text-cyan-300 transition-colors p-2"
        aria-label="向下滾動"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  );
};
