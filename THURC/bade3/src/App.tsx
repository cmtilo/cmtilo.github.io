/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { Phase1Indoor } from './components/Phase1Indoor';
import { Phase2JetWash } from './components/Phase2JetWash';
import { Phase3Stack3D } from './components/Phase3Stack3D';
import { Phase4HangingVideo } from './components/Phase4HangingVideo';
import { Phase5DroneEnding } from './components/Phase5DroneEnding';
import { MouseFollower } from './components/MouseFollower';
import { SlideGalleryModal } from './components/SlideGalleryModal';
import { MouseEffectSettings } from './types';
import { PROJECT_METADATA } from './data/projectData';
import { Building2, ExternalLink, ShieldCheck, Heart, Layers, ArrowUp } from 'lucide-react';

export default function App() {
  const [mouseSettings, setMouseSettings] = useState<MouseEffectSettings>({
    tiltEnabled: true,
    spotlightEnabled: true,
    waterTrailEnabled: true,
    exploded3D: true,
  });

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [initialSlideSrc, setInitialSlideSrc] = useState<string | null>(null);

  const handleOpenImage = (imgSrc: string, title: string) => {
    setInitialSlideSrc(imgSrc);
    setGalleryOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden font-sans">
      {/* Global Interactive Mouse Glow & Trail Follower */}
      <MouseFollower settings={mouseSettings} />

      {/* Top Header & Floating Trackers */}
      <Navigation
        settings={mouseSettings}
        onUpdateSettings={setMouseSettings}
        onOpenGallery={() => {
          setInitialSlideSrc(null);
          setGalleryOpen(true);
        }}
      />

      <main>
        {/* Hero Cover (投影片1) with 3D Mouse Parallax */}
        <HeroSection
          settings={mouseSettings}
          onExploreClick={() => scrollToSection('section1')}
          onView3DClick={() => scrollToSection('section3')}
        />

        {/* Phase 1: 戶內通管作業 (投影片4) */}
        <Phase1Indoor
          settings={mouseSettings}
          onOpenImage={handleOpenImage}
        />

        {/* Phase 2: 水刀清洗共管 (投影片5) */}
        <Phase2JetWash
          settings={mouseSettings}
          onOpenImage={handleOpenImage}
        />

        {/* Phase 3: 接明管規劃與模擬 (3D 疊圖視差 投影片11, 6, 7, 8) */}
        <Phase3Stack3D
          settings={mouseSettings}
          onOpenImage={handleOpenImage}
        />

        {/* Phase 4: 高空吊掛與接管完工 (完工.mov / 完工.mp4) */}
        <Phase4HangingVideo
          settings={mouseSettings}
        />

        {/* Phase 5: 社區整體全景空拍 (片尾彩蛋.mov / 片尾彩蛋.mp4) */}
        <Phase5DroneEnding
          settings={mouseSettings}
          onOpenGallery={() => {
            setInitialSlideSrc(null);
            setGalleryOpen(true);
          }}
        />
      </main>

      {/* Engineering Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-16 px-4 blueprint-grid">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
                八德3
              </div>
              <span className="font-bold text-white text-lg">
                八德三號 排水接管工程實錄
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-lg">
              {PROJECT_METADATA.objective}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <a
              href="https://drive.google.com/drive/folders/15bmDPL6hapmT013G5bnBXiU1_41pwfm6?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>雲端工程檔案原檔 (Google Drive)</span>
            </a>

            <button
              onClick={() => {
                setInitialSlideSrc(null);
                setGalleryOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>9 頁工程簡報圖冊</span>
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
              title="回到頁首"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} {PROJECT_METADATA.projectName} • 施工紀錄與互動展示
          </div>
          <div className="flex items-center gap-2">
            <span>滑鼠動態視差追蹤</span>
            <span>•</span>
            <span>3D 圖層分解</span>
            <span>•</span>
            <span>4K 影音串流實錄</span>
          </div>
        </div>
      </footer>

      {/* Slide Inspection Lightbox Gallery Modal */}
      <SlideGalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialSlideSrc={initialSlideSrc}
      />
    </div>
  );
}
