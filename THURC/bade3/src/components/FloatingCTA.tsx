import React, { useState, useEffect } from 'react';
import { PhoneCall, MessageSquare, ChevronUp } from 'lucide-react';
import { useMedia } from '../context/MediaContext';

export const FloatingCTA: React.FC = () => {
  const { setOpenContactModal } = useMedia();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal when scrolled past 40% of the document or near the bottom
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const ratio = scrollHeight > 0 ? currentScroll / scrollHeight : 0;

      // When past 35% of page, reveal the floating action button
      setIsVisible(ratio > 0.35);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 animate-in fade-in slide-in-from-bottom-5 duration-500">
      {/* Scroll to Top Small Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-lg backdrop-blur-md transition"
        title="回到最上方"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      {/* Floating CTA Button with Pulse animation */}
      <button
        onClick={() => setOpenContactModal(true)}
        className="group relative flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/60 transition-all transform hover:scale-105 active:scale-95 animate-pulse hover:animate-none"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
        </span>
        <PhoneCall className="w-4 h-4 text-slate-950" />
        <span className="tracking-wide">免費諮詢 / 聯絡我們</span>
      </button>
    </div>
  );
};
