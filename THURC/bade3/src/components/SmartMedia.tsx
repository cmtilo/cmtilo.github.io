import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Upload, HardDriveDownload, Sparkles, Activity } from 'lucide-react';
import { useMedia } from '../context/MediaContext';

interface SmartMediaProps {
  assetId: string;
  className?: string;
  aspectRatio?: string;
  autoPlayWhenInView?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  caption?: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
  renderOverlay?: React.ReactNode;
}

export const SmartMedia: React.FC<SmartMediaProps> = ({
  assetId,
  className = '',
  aspectRatio = 'aspect-video',
  autoPlayWhenInView = false,
  controls = true,
  muted = true,
  loop = true,
  caption,
  onPlayStateChange,
  renderOverlay,
}) => {
  const { assets, getAssetSrc, setCustomFile, isMuted: globalMuted, setIsMuted } = useMedia();
  const asset = assets[assetId];
  const src = getAssetSrc(assetId);

  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset error if src changes (e.g., custom file uploaded)
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  // Handle in-view autoplay using IntersectionObserver
  useEffect(() => {
    if (!autoPlayWhenInView || asset?.type !== 'video' || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasError && videoRef.current) {
            videoRef.current.play().then(() => {
              setIsPlaying(true);
              onPlayStateChange?.(true);
            }).catch(() => {
              // Browser autoplay policy might require mute
            });
          } else if (!entry.isIntersecting && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
            onPlayStateChange?.(false);
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoPlayWhenInView, asset?.type, hasError, onPlayStateChange]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      onPlayStateChange?.(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      onPlayStateChange?.(false);
    }
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFile(assetId, file);
    }
  };

  const isVideo = asset?.type === 'video';

  return (
    <div
      ref={containerRef}
      className={`relative group overflow-hidden rounded-xl bg-slate-900 border border-slate-800 shadow-2xl transition-all duration-300 ${aspectRatio} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={isVideo ? 'video/*' : 'image/*'}
        className="hidden"
        onChange={handleManualUpload}
      />

      {/* Actual Media Content or Fallback */}
      {!hasError ? (
        isVideo ? (
          <video
            ref={videoRef}
            src={src}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-90'}`}
            muted={muted ?? globalMuted}
            loop={loop}
            playsInline
            preload="metadata"
            onLoadedData={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            onPlay={() => {
              setIsPlaying(true);
              onPlayStateChange?.(true);
            }}
            onPause={() => {
              setIsPlaying(false);
              onPlayStateChange?.(false);
            }}
          />
        ) : (
          <img
            src={src}
            alt={asset?.name || '工程實錄照片'}
            className={`w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-90 scale-105'}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        )
      ) : (
        /* Procedural Interactive Blueprint/Simulation when local file is pending */
        <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-900 via-[#0d1627] to-slate-950 select-none">
          {/* Engineering Blueprint Grid Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Animated Water/Signal Waves */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-60" />
            <div className="absolute -top-10 -bottom-10 left-1/4 w-12 bg-cyan-500/10 blur-xl transform -skew-x-12 animate-pulse" />
          </div>

          <div className="relative z-10 text-center max-w-md px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-mono mb-3 shadow-lg shadow-cyan-950/50">
              <Activity className="w-3.5 h-3.5 animate-spin" />
              <span>工程管線動態圖層模擬</span>
            </div>

            <h4 className="text-lg font-bold text-white tracking-wide mb-1">
              {asset?.name || '實錄影像'}
            </h4>
            <p className="text-xs text-slate-400 font-mono mb-4">
              目標檔案: <span className="text-cyan-300">{asset?.originalFileName}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition shadow-md hover:shadow-cyan-500/30"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>點此匯入雲端下載檔案</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              提示: 將 Google 雲端檔案放進專案 <code className="text-slate-400">public/</code> 即自動匹配
            </p>
          </div>
        </div>
      )}

      {/* Video Overlay Play/Pause & Sound Controls */}
      {isVideo && !hasError && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isPlaying && !isHovered ? 'opacity-0' : 'opacity-100'
          } bg-black/25 pointer-events-none`}
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? '暫停影片' : '播放影片'}
            className="pointer-events-auto p-4 rounded-full bg-cyan-500/80 hover:bg-cyan-400 text-white shadow-xl shadow-cyan-500/40 transform hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-sm"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-0.5" />}
          </button>
        </div>
      )}

      {/* Audio Mute Badge for Video */}
      {isVideo && !hasError && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (videoRef.current) {
              videoRef.current.muted = !videoRef.current.muted;
              setIsMuted(videoRef.current.muted);
            }
          }}
          className="absolute bottom-3 right-3 z-20 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white text-xs backdrop-blur-md border border-slate-700/60 shadow-lg transition"
          title={globalMuted ? '開啟聲音' : '靜音'}
        >
          {globalMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>
      )}

      {/* Quick Replace Button in top corner */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        className={`absolute top-3 right-3 z-20 px-2 py-1 rounded-md bg-slate-900/80 hover:bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700/60 backdrop-blur-md transition opacity-0 group-hover:opacity-100 flex items-center gap-1 shadow-lg`}
        title={`替換 ${asset?.originalFileName}`}
      >
        <Upload className="w-3 h-3 text-cyan-400" />
        <span>替換素材</span>
      </button>

      {/* Custom Overlay render */}
      {renderOverlay}

      {/* Caption bar */}
      {caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 py-2.5 text-xs text-slate-200 font-medium z-10">
          {caption}
        </div>
      )}
    </div>
  );
};
