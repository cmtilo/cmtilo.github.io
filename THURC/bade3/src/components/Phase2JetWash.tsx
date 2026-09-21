import React, { useState, useRef } from 'react';
import { 
  Droplets, 
  Maximize2, 
  Gauge, 
  Sparkles, 
  CheckCircle2, 
  ZoomIn, 
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Calendar,
  Video,
  FileImage
} from 'lucide-react';
import { PHASES_CONFIG } from '../data/projectData';
import { MouseEffectSettings } from '../types';

interface Phase2JetWashProps {
  settings: MouseEffectSettings;
  onOpenImage: (imgSrc: string, title: string) => void;
}

export const Phase2JetWash: React.FC<Phase2JetWashProps> = ({
  settings,
  onOpenImage,
}) => {
  const phase = PHASES_CONFIG[1];
  const [activeTab, setActiveTab] = useState<'stage3' | 'stage5'>('stage5');
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [pressureValue, setPressureValue] = useState(250);
  const imageBoxRef = useRef<HTMLDivElement>(null);

  // Video player controls
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const stageData = {
    stage3: {
      id: 'stage3',
      title: '共管水刀洗管作業規劃 (115年8月19日)',
      subtitle: '水刀機具進場 • 幹管前置規劃佈線',
      slideSrc: '/投影片3.jpg',
      videoSrc: '/投影片3.mp4',
      posterSrc: '/投影片3_poster.jpg',
      duration: '20秒',
      date: '115年8月19日',
      desc: '重型清洗機具進場，架設引導喉管與安全警戒線，進行公共幹管沖洗前置準備。',
    },
    stage5: {
      id: 'stage5',
      title: '超高壓水刀共管清洗實錄',
      subtitle: '360° 旋轉噴頭 • 逆向牽引粉碎油垢',
      slideSrc: '/投影片5.jpg',
      videoSrc: '/投影片5.mp4',
      posterSrc: '/投影片5_poster.jpg',
      duration: '14秒',
      date: '清洗施作階段',
      desc: '250 BAR 超高壓逆噴旋轉水刀，強力打散長年硬化油垢與管壁鈣化結晶。',
    },
  };

  const currentStage = stageData[activeTab];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageBoxRef.current) return;
    const rect = imageBoxRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
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
      id="section2"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 bg-slate-950/95 border-t border-slate-900 blueprint-grid"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-400 font-mono text-xs mb-4">
            <Droplets className="w-3.5 h-3.5" />
            <span>{phase.step} • {phase.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-4 text-shadow">
            {phase.title}
          </h2>
          <p className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            {phase.subtitle}
          </p>
          <p className="text-sm text-slate-400 mt-2">
            引進工業級超高壓自旋水刀機具，以 250 BAR 高速衝擊水壓徹底粉碎剝離公共共管長年頑垢。
          </p>

          {/* Tab Switcher: Stage 3 (115.08.19) vs Stage 5 */}
          <div className="inline-flex items-center p-1 mt-6 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-lg">
            <button
              onClick={() => {
                setActiveTab('stage3');
                setIsPlaying(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'stage3'
                  ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>115.08.19 洗管進場規劃 (投影片3)</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('stage5');
                setIsPlaying(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'stage5'
                  ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>超高壓水刀共管清洗 (投影片5)</span>
            </button>
          </div>
        </div>

        {/* Content Box with Slide / Video */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Display (Video or Blueprint with Magnifier) */}
          <div className="lg:col-span-7 space-y-3">
            {/* View Mode Switcher: Video vs Static Blueprint */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMediaType('video')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    mediaType === 'video'
                      ? 'bg-blue-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>現場影片 ({currentStage.duration})</span>
                </button>
                <button
                  onClick={() => setMediaType('image')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    mediaType === 'image'
                      ? 'bg-blue-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <FileImage className="w-3.5 h-3.5" />
                  <span>簡報圖說放大鏡</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/60">
                {currentStage.date}
              </div>
            </div>

            {mediaType === 'video' ? (
              /* Video Player for Video 3 or Video 5 */
              <div className="relative rounded-2xl overflow-hidden border border-blue-500/40 bg-slate-900 shadow-2xl shadow-blue-950/40">
                <video
                  key={currentStage.videoSrc}
                  ref={videoRef}
                  src={currentStage.videoSrc}
                  poster={currentStage.posterSrc}
                  playsInline
                  loop
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-auto object-cover max-h-[500px]"
                />

                {/* Video HUD Label */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-slate-900/85 border border-blue-500/30 font-mono text-[11px] text-blue-300 flex items-center gap-2 backdrop-blur">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>{currentStage.title}</span>
                </div>

                {/* Floating Video Controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-3 rounded-xl bg-slate-950/85 border border-slate-800 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-lg bg-blue-500 text-slate-950 hover:bg-blue-400 transition-colors shadow"
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
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenImage(currentStage.slideSrc, currentStage.title)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>檢視簡報底圖</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Image Box with Interactive Magnifier */
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl">
                <div
                  ref={imageBoxRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZooming(true)}
                  onMouseLeave={() => setIsZooming(false)}
                  className="group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 cursor-crosshair"
                >
                  <img
                    src={currentStage.slideSrc}
                    alt={currentStage.title}
                    className="w-full max-h-[500px] object-contain mx-auto transition-transform duration-200"
                  />

                  {/* Interactive Zoom Lens Follower */}
                  {isZooming && (
                    <div
                      className="absolute pointer-events-none w-36 h-36 rounded-full border-2 border-cyan-400/80 shadow-2xl overflow-hidden bg-slate-950 hidden sm:block z-30"
                      style={{
                        left: `${zoomPos.x}%`,
                        top: `${zoomPos.y}%`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)',
                      }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-no-repeat"
                        style={{
                          backgroundImage: `url('${currentStage.slideSrc}')`,
                          backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                          backgroundSize: '350%',
                        }}
                      />
                      <div className="absolute inset-0 border border-white/20 rounded-full" />
                    </div>
                  )}

                  {/* Top Control Bar */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur text-[11px] font-mono text-cyan-400 border border-slate-700">
                      <ZoomIn className="w-3 h-3" />
                      滑鼠懸停放大檢視
                    </span>
                    <button
                      onClick={() => onOpenImage(currentStage.slideSrc, currentStage.title)}
                      className="p-2 rounded-lg bg-slate-900/80 hover:bg-cyan-900/80 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-200 transition-colors backdrop-blur-md shadow"
                      title="全螢幕放大檢視"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Tag */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                    <span className="font-mono text-cyan-400">{currentStage.title}</span>
                    <span className="text-[11px] text-slate-400">水刀壓力 200~300 BAR 自動旋轉牽引</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Engineering Water Jet Parameters & Specs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Pressure Simulator Gauge */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <Gauge className="w-5 h-5 text-cyan-400" />
                  <span>水刀噴射水壓監測</span>
                </div>
                <span className="font-mono text-xs text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                  即時可調測試
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">施工設定壓力：</span>
                  <span className="text-cyan-400 font-mono font-bold text-lg">
                    {pressureValue} BAR
                  </span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="320"
                  step="5"
                  value={pressureValue}
                  onChange={(e) => setPressureValue(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>150 BAR (一般疏通)</span>
                  <span>250 BAR (標準除油)</span>
                  <span>320 BAR (極限粉碎)</span>
                </div>
              </div>

              {/* Water Jet Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-slate-800">
                {phase.metrics.map((m, i) => (
                  <div key={i} className="text-center p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-lg sm:text-xl font-bold font-mono text-sky-400">
                      {m.value}
                      <span className="text-xs text-slate-400 ml-0.5">{m.unit}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                {phase.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Link to Phase 3 3D Stacking */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400">
              <span>下一階段：接明管規劃與 3D 疊圖視差</span>
              <a
                href="#section3"
                className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
              >
                前往階段三 (3D疊圖) <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

