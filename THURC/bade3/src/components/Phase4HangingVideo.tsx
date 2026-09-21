import React, { useRef, useState, useEffect } from 'react';
import { 
  Video, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { PHASES_CONFIG } from '../data/projectData';
import { MouseEffectSettings } from '../types';

interface Phase4HangingVideoProps {
  settings: MouseEffectSettings;
}

export const Phase4HangingVideo: React.FC<Phase4HangingVideoProps> = ({ settings }) => {
  const phase = PHASES_CONFIG[3];
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // IntersectionObserver: auto-play video when scrolled to 50% view
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
      id="section4"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 bg-slate-950 border-t border-slate-900 blueprint-grid"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-xs mb-4">
            <Video className="w-3.5 h-3.5" />
            <span>{phase.step} • 高空吊掛施工實景錄影</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-4 text-shadow">
            {phase.title}
          </h2>
          <p className="text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            {phase.subtitle}
          </p>
          <p className="text-sm text-slate-400 mt-2">
            專業吊車高空作業車協同，進行外牆明管定位吊掛、耐候不銹鋼支架鎖固與完工通水驗收。
          </p>
        </div>

        {/* Video Player Container */}
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl mb-12">
          <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl group border border-slate-800">
            <video
              id="video-completion"
              ref={videoRef}
              playsInline
              muted={isMuted}
              preload="metadata"
              poster="/完工_poster.jpg"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              className="w-full max-h-[72vh] object-contain mx-auto cursor-pointer"
            >
              <source src="/投影片11.mp4" type="video/mp4" />
              <source src="/完工.mp4" type="video/mp4" />
              <source src="/完工.mov" type="video/quicktime" />
              您的瀏覽器不支援 HTML5 影片播放。
            </video>

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
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  {/* Sound Unmute Button */}
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

                  {/* Time indicator */}
                  <span className="font-mono text-[11px] text-slate-400">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-cyan-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    完工加壓通水測試通過
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

        {/* Engineering Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phase.metrics.map((m, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 text-center backdrop-blur-md"
            >
              <div className="text-3xl font-extrabold font-mono text-cyan-400 mb-1">
                {m.value}
                <span className="text-sm text-slate-400 ml-1">{m.unit}</span>
              </div>
              <div className="text-xs text-slate-300 font-semibold">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
