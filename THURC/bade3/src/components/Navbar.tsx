import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Layers,
  GitMerge,
  CheckCircle2,
  Plane,
  FolderOpen,
  Github,
  PhoneCall,
  Volume2,
  VolumeX,
  Menu,
  X,
} from 'lucide-react';
import { useMedia } from '../context/MediaContext';

export const Navbar: React.FC = () => {
  const {
    isMuted,
    setIsMuted,
    setOpenContactModal,
    setOpenAssetModal,
    setOpenGitHubModal,
  } = useMedia();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'section1', 'section2', 'section3', 'section4', 'section5'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'section1', label: '戶內與共管', icon: Wrench },
    { id: 'section2', label: '3D樓層疊圖', icon: Layers },
    { id: 'section3', label: '明管規劃', icon: GitMerge },
    { id: 'section4', label: '完工驗收', icon: CheckCircle2 },
    { id: 'section5', label: '全景空拍', icon: Plane },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-xl py-2.5'
          : 'bg-gradient-to-b from-slate-950/80 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo & Project Title */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition">
            <span className="font-extrabold text-base tracking-tighter">八3</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold text-white tracking-wide group-hover:text-cyan-400 transition">
                八德三號
              </span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 font-medium">
                排水接管工程實錄
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden md:block">
              工程實錄 • 3D 疊圖 • 明管規劃 • 完工空拍
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800/60 backdrop-blur-sm">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
            title={isMuted ? '全站靜音中 (點擊開啟聲音)' : '聲音播放中 (點擊靜音)'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Asset Manager Drawer / Modal */}
          <button
            onClick={() => setOpenAssetModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-medium border border-slate-800 transition"
            title="查看或匯入 Google 雲端投影片素材"
          >
            <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>素材管理</span>
          </button>

          {/* GitHub Ready Guide */}
          <button
            onClick={() => setOpenGitHubModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-800 transition"
            title="GitHub 部署指南與原始碼結構"
          >
            <Github className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">GitHub 指南</span>
          </button>

          {/* Free Contact CTA */}
          <button
            onClick={() => setOpenContactModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
            <span>免費諮詢</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-2 pb-5 mt-2.5 backdrop-blur-xl animate-in slide-in-from-top-3">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/90 text-left text-xs text-slate-200 hover:bg-cyan-950/40 hover:text-cyan-300 border border-slate-800"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setOpenAssetModal(true);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-900 text-xs text-slate-300 border border-slate-800"
            >
              <FolderOpen className="w-4 h-4 text-cyan-400" />
              <span>素材管理</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setOpenGitHubModal(true);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-900 text-xs text-slate-300 border border-slate-800"
            >
              <Github className="w-4 h-4 text-slate-300" />
              <span>GitHub 部署說明</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
