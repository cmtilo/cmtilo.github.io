import React, { useRef, useState, useEffect } from 'react';
import { 
  Eye, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Compass, 
  Building2, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { PHASES_CONFIG } from '../data/projectData';
import { MouseEffectSettings } from '../types';

interface Phase5DroneEndingProps {
  settings: MouseEffectSettings;
  onOpenGallery: () => void;
}

export const Phase5DroneEnding: React.FC<Phase5DroneEndingProps> = ({
  settings,
  onOpenGallery,
}) => {
  const phase = PHASES_CONFIG[4];
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // IntersectionObserver: auto-play drone video when scrolled into view
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            videoEl.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current || !duration) return;
    const newTime = (Number(e.target.value) / 100) * duration;
    videoRef.current.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section
      id="section5"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 bg-slate-950 border-t border-slate-900 blueprint-grid"
    >
      {/* Aerial Atmosphere Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/10 to-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-xs mb-4">
            <Eye className="w-3.5 h-3.5" />
            <span>{phase.step} • 航拍俯瞰社區全景</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-4 text-shadow">
            {phase.title}
          </h2>
          <p className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            {phase.subtitle}
          </p>
          <p className="text-sm text-slate-400 mt-2">
            片尾彩蛋航拍視野，高空俯瞰八德三號社區建築整體外觀與新設明管系統融合成果。
          </p>
        </div>

        {/* Video Box */}
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl mb-12">
          <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl group border border-slate-800">
            <video
              id="video-ending"
              ref={videoRef}
              playsInline
              muted={isMuted}
              preload="metadata"
              poster="/片尾彩蛋_poster.jpg"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              className="w-full max-h-[72vh] object-contain mx-auto cursor-pointer"
            >
              <source src="/投影片12.mp4" type="video/mp4" />
              <source src="/片尾彩蛋.mp4" type="video/mp4" />
              <source src="/片尾彩蛋.mov" type="video/quicktime" />
              您的瀏覽器不支援 HTML5 影片播放。
            </video>

            {/* Drone Telemetry HUD Overlay in Top Left */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-xs text-cyan-400 backdrop-blur-md pointer-events-none">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              <span>DRONE 4K AERIAL CAM • 八德三號</span>
            </div>

            {/* Custom Overlay Control Bar */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent flex flex-col gap-2 opacity-90 transition-opacity">
              {/* Progress Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full accent-cyan-400 h-1.5 cursor-pointer bg-slate-700/80 rounded-lg"
              />

              <div className="flex items-center justify-between text-xs text-slate-200">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                      isMuted
                        ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{isMuted ? '解除靜音' : '靜音'}</span>
                  </button>

                  <span className="font-mono text-[11px] text-slate-400">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-cyan-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    片尾彩蛋全景空拍
                  </span>

                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors"
                    title="全螢幕播放"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Project Gallery Prompt */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-cyan-500/30 text-center backdrop-blur-md">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            完整 9 頁工程簡報圖冊全覽
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            包含施工立面圖、水力計算分析、管路耐震固定節點等所有高解析度投影片。
          </p>
          <button
            onClick={onOpenGallery}
            className="px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            開啟工程圖冊全覽 (9張)
          </button>
        </div>
      </div>
    </section>
  );
};
