import React, { useState, useRef } from 'react';
import { 
  Wrench, 
  Maximize2, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Layers,
  Video,
  FileText
} from 'lucide-react';
import { PHASES_CONFIG } from '../data/projectData';
import { MouseEffectSettings } from '../types';

interface Phase1IndoorProps {
  settings: MouseEffectSettings;
  onOpenImage: (imgSrc: string, title: string) => void;
}

export const Phase1Indoor: React.FC<Phase1IndoorProps> = ({
  settings,
  onOpenImage,
}) => {
  const phase = PHASES_CONFIG[0];
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Tab mode: Video investigation vs Blueprint Floorplans
  const [viewMode, setViewMode] = useState<'video' | 'floorplans'>('floorplans');
  
  // Floorplan selector for Slide 4, 4_3F, 4_4F, 4_5F
  const [selectedFloor, setSelectedFloor] = useState<'all' | '3F' | '4F' | '5F'>('all');

  // Video 2 playback state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const floorPlans = {
    all: {
      src: '/投影片4.jpg',
      title: '第一階段：戶內通管作業與各樓層配置圖',
      desc: '整體戶內暗管疏通作業、施工機具配置與各樓層轉折綜覽。',
    },
    '3F': {
      src: '/投影片4_3F.jpg',
      title: 'C棟 452-03F-03 (3樓前陽台排水明管配置圖)',
      desc: '3樓前陽台落水頭改接、2"RP / 1-1/2"ACP 明管走向、避震固定夾具。',
    },
    '4F': {
      src: '/投影片4_4F.jpg',
      title: 'C棟 452-04F-03 (4樓前陽台排水明管配置圖)',
      desc: '4樓陽台立管銜接點、2"RP 配管走位與防逆流防臭水封節點。',
    },
    '5F': {
      src: '/投影片4_5F.jpg',
      title: 'C棟 452-05F-03 戴玉娟戶 (5樓前陽台排水明管配置圖)',
      desc: '5樓陽台排水明管關鍵轉折處，配合樑位避震吊架與清潔檢修口 (Clean-out)。',
    },
  };

  const currentFloorData = floorPlans[selectedFloor];

  const hotspots = [
    {
      id: 1,
      x: '38%',
      y: '62%',
      title: '機械通管動力主機',
      detail: '高扭力可調速驅動馬達，提供穩定的鋼索旋轉動力，避免卡死或扭斷管身。',
    },
    {
      id: 2,
      x: '58%',
      y: '48%',
      title: '特製疏通彈簧鋼索',
      detail: '特殊耐磨錳鋼絞合彈簧，能輕鬆穿過 90 度彎頭與 S 型水封，刮除管壁內結垢。',
    },
    {
      id: 3,
      x: '25%',
      y: '78%',
      title: '地面防水防汙防護層',
      detail: '全室雙層防污墊鋪設，施工時完全防止泥水噴濺，確保住戶原有地坪無損。',
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!settings.tiltEnabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 15, y: y * 15 });
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <section
      id="section1"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 bg-slate-950 border-t border-slate-900"
    >
      {/* Parallax Background with Mouse Shift */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-300 ease-out will-change-transform scale-110"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.95)), url('${currentFloorData.src}')`,
          transform: `translate3d(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px, 0px)`,
        }}
      />

      {/* Decorative Grid and Lighting */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-4">
            <Wrench className="w-3.5 h-3.5" />
            <span>{phase.step} • 暗管清疏與各戶配管調查</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-4 text-shadow">
            {phase.title}
          </h2>
          <p className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            {phase.subtitle}
          </p>
          <p className="text-sm text-slate-400 mt-2">
            深入廚衛既有暗管探測淤塞成因，實施機械高扭力通管清淤，並逐戶勘驗 3F~5F 前陽台明管改管路徑。
          </p>

          {/* View Mode Switcher: Video vs Floorplans */}
          <div className="inline-flex items-center p-1 mt-6 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg">
            <button
              onClick={() => setViewMode('floorplans')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                viewMode === 'floorplans'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>各樓層配管圖說 (3F / 4F / 5F)</span>
            </button>
            <button
              onClick={() => {
                setViewMode('video');
                if (videoRef.current && !isPlaying) {
                  videoRef.current.play().catch(() => {});
                  setIsPlaying(true);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                viewMode === 'video'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>管路探測現場實錄 (17秒影片)</span>
            </button>
          </div>
        </div>

        {/* Content & Interactive Photo/Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Floorplans or Video Player */}
          <div className="lg:col-span-7">
            {viewMode === 'floorplans' ? (
              <div className="space-y-3">
                {/* Floor Selection Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {(['all', '3F', '4F', '5F'] as const).map((floor) => (
                    <button
                      key={floor}
                      onClick={() => setSelectedFloor(floor)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border shrink-0 ${
                        selectedFloor === floor
                          ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-sm'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                      }`}
                    >
                      {floor === 'all' ? '投影片 4 • 通管總圖' : `C棟 ${floor} 陽台圖說`}
                    </button>
                  ))}
                </div>

                {/* Main Blueprint Display with 3D Tilt */}
                <div
                  className="group relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl shadow-cyan-950/40 transition-all duration-300 hover:border-cyan-500/60"
                  style={{
                    transform: `rotateY(${mouseOffset.x * 0.3}deg) rotateX(${-mouseOffset.y * 0.3}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={currentFloorData.src}
                    alt={currentFloorData.title}
                    className="w-full h-auto object-contain max-h-[520px] mx-auto transition-transform duration-500 group-hover:scale-102"
                  />

                  {/* Gradient Bottom Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Interactive Hotspots only on All Overview */}
                  {selectedFloor === 'all' &&
                    hotspots.map((spot) => (
                      <div
                        key={spot.id}
                        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{ left: spot.x, top: spot.y }}
                        onClick={() =>
                          setActiveHotspot(activeHotspot === spot.id ? null : spot.id)
                        }
                      >
                        <div className="relative flex items-center justify-center">
                          <span className="absolute w-7 h-7 rounded-full bg-cyan-400/40 animate-ping" />
                          <button className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center shadow-lg shadow-cyan-500/50 hover:scale-125 transition-transform">
                            {spot.id}
                          </button>
                        </div>

                        {/* Popover Bubble */}
                        {activeHotspot === spot.id && (
                          <div className="absolute left-1/2 bottom-8 -translate-x-1/2 w-64 p-3 rounded-xl bg-slate-900/95 border border-cyan-400/50 text-left shadow-2xl backdrop-blur-md z-30 animate-fadeIn">
                            <div className="text-xs font-bold text-cyan-300 flex items-center justify-between mb-1">
                              <span>{spot.title}</span>
                              <span className="font-mono text-[10px] text-slate-400">點擊關閉</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">{spot.detail}</p>
                          </div>
                        )}
                      </div>
                    ))}

                  {/* Top Bar with Expand */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                    <button
                      onClick={() => onOpenImage(currentFloorData.src, currentFloorData.title)}
                      className="p-2 rounded-lg bg-slate-900/80 hover:bg-cyan-900/80 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-200 transition-colors backdrop-blur-md shadow"
                      title="全螢幕放大檢視"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Caption */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-slate-300 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800">
                    <div>
                      <div className="font-mono text-cyan-400 font-semibold">{currentFloorData.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{currentFloorData.desc}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Video Player for Video 2: 既有管路現場探測 (17.6s) */
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-900 shadow-2xl shadow-cyan-950/40">
                <video
                  ref={videoRef}
                  src="/投影片2.mp4"
                  poster="/投影片2_poster.jpg"
                  playsInline
                  loop
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-auto object-cover max-h-[520px]"
                />

                {/* Video HUD Overlay */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-slate-900/80 border border-cyan-500/30 font-mono text-[11px] text-cyan-400 flex items-center gap-2 backdrop-blur">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>投影片 2 現場實錄 • 17秒</span>
                </div>

                {/* Floating Video Controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-3 rounded-xl bg-slate-950/85 border border-slate-800 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow"
                      title={isPlaying ? '暫停' : '播放'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <button
                      onClick={restartVideo}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                      title="重播"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                      title={isMuted ? '開啟聲音' : '靜音'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenImage('/投影片2.jpg', '既有管路現場調查與問題探測')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>檢視簡報底圖</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Engineering Highlights & Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>工程施作核心工法</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {phase.summary}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-slate-800">
                {phase.metrics.map((m, i) => (
                  <div key={i} className="text-center p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400">
                      {m.value}
                      <span className="text-xs text-slate-400 ml-0.5">{m.unit}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                {phase.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Next Cue */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400">
              <span>下一階段：公共共管超高壓水刀清洗 (115.08.19)</span>
              <a
                href="#section2"
                className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
              >
                前往階段二 <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
