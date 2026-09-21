import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Layers, 
  Eye, 
  Video, 
  Sparkles, 
  ChevronRight, 
  Droplets,
  Images,
  Rotate3d
} from 'lucide-react';
import { MouseEffectSettings } from '../types';

interface NavigationProps {
  settings: MouseEffectSettings;
  onUpdateSettings: (updater: (prev: MouseEffectSettings) => MouseEffectSettings) => void;
  onOpenGallery: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  settings,
  onUpdateSettings,
  onOpenGallery,
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: '首頁概覽', icon: Compass, badge: '總覽' },
    { id: 'section1', label: '戶內通管', icon: Droplets, badge: '階段一' },
    { id: 'section2', label: '水刀共管', icon: Droplets, badge: '階段二' },
    { id: 'section3', label: '明管規劃 3D', icon: Layers, badge: '階段三' },
    { id: 'section4', label: '吊掛完工', icon: Video, badge: '階段四' },
    { id: 'section5', label: '全景空拍', icon: Eye, badge: '階段五' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      setScrolled(window.scrollY > 40);

      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Main Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3'
            : 'bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Title */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-black text-cyan-400 text-sm">八德3</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-wide text-base sm:text-lg group-hover:text-cyan-300 transition-colors">
                  八德三號
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                  排水接管工程實錄
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                外牆接明管 • 高壓水刀 • 3D 疊圖視差 • 完工影音實錄
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800 backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools & Mouse Controls */}
          <div className="flex items-center gap-2">
            {/* Gallery Button */}
            <button
              onClick={onOpenGallery}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/40 transition-colors"
              title="查看全部 9 張工程投影片"
            >
              <Images className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">工程圖冊</span>
            </button>

            {/* Mouse 3D Tilt Toggle */}
            <button
              onClick={() =>
                onUpdateSettings((prev) => ({
                  ...prev,
                  tiltEnabled: !prev.tiltEnabled,
                }))
              }
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                settings.tiltEnabled
                  ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="開關滑鼠 3D 視差傾斜跟隨動效"
            >
              <Rotate3d className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">滑鼠 3D 動效</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <ChevronRight
                className={`w-5 h-5 transition-transform duration-200 ${
                  mobileMenuOpen ? 'rotate-90' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-4 bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl mt-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-cyan-400/80">{item.badge}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Floating Vertical Step Tracker on Right Edge (Desktop) */}
      <aside className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 p-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 shadow-2xl">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 text-center pb-1 border-b border-slate-800">
          工程進程
        </div>
        {navItems.map((item, idx) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative flex items-center justify-center w-8 h-8 rounded-xl transition-all"
              title={`${item.badge}: ${item.label}`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-6 h-6 bg-cyan-500 text-[10px] text-slate-950 font-bold flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.7)]'
                    : 'bg-slate-700 group-hover:bg-cyan-400/60 group-hover:scale-125'
                }`}
              >
                {isActive && idx}
              </div>

              {/* Tooltip on Hover */}
              <div className="absolute right-10 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-lg">
                <span className="text-cyan-400 font-mono mr-1.5">{item.badge}</span>
                {item.label}
              </div>
            </button>
          );
        })}
      </aside>
    </>
  );
};
