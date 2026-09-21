import React, { useState } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Layers, 
  Image as ImageIcon,
  Video,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { SLIDES_DATA } from '../data/projectData';
import { SlideItem } from '../types';

interface SlideGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlideSrc?: string | null;
}

export const SlideGalleryModal: React.FC<SlideGalleryModalProps> = ({
  isOpen,
  onClose,
  initialSlideSrc,
}) => {
  const [selectedSlide, setSelectedSlide] = useState<SlideItem>(() => {
    if (initialSlideSrc) {
      const found = SLIDES_DATA.find((s) => s.filename === initialSlideSrc);
      if (found) return found;
    }
    return SLIDES_DATA[0];
  });

  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [modalMode, setModalMode] = useState<'image' | 'video'>('image');

  if (!isOpen) return null;

  const filteredSlides = activeCategory === 'all'
    ? SLIDES_DATA
    : SLIDES_DATA.filter((s) => s.category === activeCategory);

  const currentIndex = SLIDES_DATA.findIndex((s) => s.id === selectedSlide.id);

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + SLIDES_DATA.length) % SLIDES_DATA.length;
    setSelectedSlide(SLIDES_DATA[nextIdx]);
    setZoomLevel(1);
    setModalMode('image');
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % SLIDES_DATA.length;
    setSelectedSlide(SLIDES_DATA[nextIdx]);
    setZoomLevel(1);
    setModalMode('image');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-2 sm:p-6 overflow-hidden animate-fadeIn">
      {/* Container Card */}
      <div className="relative w-full max-w-7xl h-[94vh] bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                <span>八德三號 排水工程全案簡報圖冊</span>
                <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {currentIndex + 1} / {SLIDES_DATA.length}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                點擊縮圖快速切換 • 支援高解析簡報圖放大與現場施工實錄影片聯動
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle Video if Available */}
            {selectedSlide.videoUrl && (
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-950 border border-slate-700">
                <button
                  onClick={() => setModalMode('image')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    modalMode === 'image'
                      ? 'bg-cyan-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>簡報圖面</span>
                </button>
                <button
                  onClick={() => setModalMode('video')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    modalMode === 'video'
                      ? 'bg-cyan-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-cyan-300" />
                  <span>實況影片</span>
                </button>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Viewing Stage */}
        <div className="relative flex-1 bg-slate-950 flex items-center justify-center p-4 overflow-hidden select-none">
          {modalMode === 'video' && selectedSlide.videoUrl ? (
            <div className="w-full max-w-4xl max-h-full flex items-center justify-center">
              <video
                key={selectedSlide.videoUrl}
                src={selectedSlide.videoUrl}
                poster={selectedSlide.videoPoster || selectedSlide.filename}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-[60vh] rounded-2xl shadow-2xl border border-cyan-500/40"
              />
            </div>
          ) : (
            /* Active Large Slide Image */
            <div className="relative max-w-full max-h-full flex items-center justify-center overflow-auto">
              <img
                src={selectedSlide.filename}
                alt={selectedSlide.title}
                className="max-w-full max-h-[60vh] object-contain transition-transform duration-200 shadow-2xl rounded-xl"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </div>
          )}

          {/* Prev / Next Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-cyan-950 border border-slate-700 text-slate-200 hover:text-cyan-400 backdrop-blur-md shadow-xl transition-all z-20"
            title="上一張"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-cyan-950 border border-slate-700 text-slate-200 hover:text-cyan-400 backdrop-blur-md shadow-xl transition-all z-20"
            title="下一張"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Floating Zoom Toolbar (Only for Image Mode) */}
          {modalMode === 'image' && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md text-xs text-slate-300 shadow-xl z-20">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
                className="p-1 hover:text-cyan-400"
                title="縮小"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-cyan-400 text-xs px-1">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                className="p-1 hover:text-cyan-400"
                title="放大"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px]"
              >
                重設
              </button>
            </div>
          )}
        </div>

        {/* Slide Info & Thumbnail Reel Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 shrink-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <div>
              <div className="font-bold text-white text-sm flex items-center gap-2">
                <span className="text-cyan-400 font-mono">{selectedSlide.phase}</span>
                <span>{selectedSlide.title}</span>
                {selectedSlide.videoUrl && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    <Video className="w-3 h-3" /> 含現場影片
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{selectedSlide.description}</p>
            </div>
            <a
              href={selectedSlide.filename}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-500/40 text-xs text-slate-200 hover:text-cyan-300 transition-colors shrink-0"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>原圖分頁開啟</span>
            </a>
          </div>

          {/* Thumbnail Reel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            {SLIDES_DATA.map((slide) => {
              const isSelected = slide.id === selectedSlide.id;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    setSelectedSlide(slide);
                    setZoomLevel(1);
                    setModalMode('image');
                  }}
                  className={`relative shrink-0 w-20 sm:w-24 h-14 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    isSelected
                      ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/30'
                      : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                  }`}
                >
                  <img
                    src={slide.filename}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {slide.videoUrl && (
                    <div className="absolute top-1 right-1 p-0.5 rounded bg-black/70 text-cyan-400">
                      <Video className="w-2.5 h-2.5" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 text-[9px] font-mono text-cyan-300 truncate px-1 text-center">
                    {slide.phase.replace('階段', 'P')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
