/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MediaProvider } from './context/MediaContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Section1_IndoorCommunal } from './components/Section1_IndoorCommunal';
import { Section2_3DStack } from './components/Section2_3DStack';
import { Section3_ExposedPipe } from './components/Section3_ExposedPipe';
import { Section4_Completion } from './components/Section4_Completion';
import { Section5_Aerial } from './components/Section5_Aerial';
import { FloatingCTA } from './components/FloatingCTA';
import { ContactModal } from './components/ContactModal';
import { AssetManagerModal } from './components/AssetManagerModal';
import { GitHubGuideModal } from './components/GitHubGuideModal';

export default function App() {
  return (
    <MediaProvider>
      <div className="min-h-screen bg-[#0b1120] text-slate-100 selection:bg-cyan-500 selection:text-white font-sans overflow-x-hidden">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Sections */}
        <main className="relative flex flex-col w-full">
          {/* 最上方：投影片1 Hero 開場 */}
          <HeroSection />

          {/* 第一區塊：戶內通管 (投影片2) & 共管洗管 (投影片3 / 投影片3.mp4) */}
          <Section1_IndoorCommunal />

          {/* 第二區塊：3D 樓層管線配置疊圖 (投影片4, 4_3F, 4_4F, 4_5F) */}
          <Section2_3DStack />

          {/* 第三區塊：接明管規劃與模擬 (疊圖比對 & 投影片5.mp4 / 投影片6.mp4) */}
          <Section3_ExposedPipe />

          {/* 第四區塊：完工驗收實錄 (投影片11.mp4) */}
          <Section4_Completion />

          {/* 第五區塊：全景空拍與片尾彩蛋 (投影片12.mp4) */}
          <Section5_Aerial />
        </main>

        {/* Floating CTA (免費諮詢 / 聯絡我們) */}
        <FloatingCTA />

        {/* Global Dialog Modals */}
        <ContactModal />
        <AssetManagerModal />
        <GitHubGuideModal />
      </div>
    </MediaProvider>
  );
}
