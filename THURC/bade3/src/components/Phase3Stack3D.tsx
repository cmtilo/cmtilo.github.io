import React, { useState, useEffect, useRef } from 'react';
import { 
  Layers, 
  Rotate3d, 
  Sliders, 
  Maximize2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Move, 
  RefreshCw, 
  Info,
  CheckCircle2,
  ChevronDown,
  Video,
  FileSpreadsheet,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { PHASES_CONFIG } from '../data/projectData';
import { MouseEffectSettings } from '../types';

interface Phase3Stack3DProps {
  settings: MouseEffectSettings;
  onOpenImage: (imgSrc: string, title: string) => void;
}

interface LayerItem {
  id: string;
  name: string;
  sub: string;
  src: string;
  defaultZ: number;
  visible: boolean;
  opacity: number;
  highlightColor: string;
}

export const Phase3Stack3D: React.FC<Phase3Stack3DProps> = ({
  settings,
  onOpenImage,
}) => {
  const phase = PHASES_CONFIG[2];
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Tilt angles driven by mouse movement or drag
  const [rotation, setRotation] = useState({ x: 12, y: -15, z: 0 });
  const [isMouseActive, setIsMouseActive] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 12, rotY: -15 });

  // Stacking explosion distance multiplier (0 = flat, 1 = normal, 2 = deep explosion)
  const [explodeDistance, setExplodeDistance] = useState(1.2);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);
  const [blendMode, setBlendMode] = useState<'normal' | 'screen'>('normal');

  // Scroll scrub progression (0 to 1)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Video 6 preview modal state
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const video6Ref = useRef<HTMLVideoElement>(null);

  // Material comparison modal state
  const [showMaterialModal, setShowMaterialModal] = useState(false);

  // Layers list matching user template + engineering blueprints
  const [layers, setLayers] = useState<LayerItem[]>([
    {
      id: 'layer-bg',
      name: '基底圖：透明管模擬底圖',
      sub: '投影片 11 • 建築既有結構與透明立管位',
      src: '/投影片11.jpg',
      defaultZ: 0,
      visible: true,
      opacity: 1,
      highlightColor: 'border-slate-700',
    },
    {
      id: 'layer-6',
      name: '疊層一：外牆接明管規劃圖',
      sub: '投影片 6 • 剖面管線配置與高空固定架',
      src: '/投影片6.jpg',
      defaultZ: 45,
      visible: true,
      opacity: 0.95,
      highlightColor: 'border-cyan-500',
    },
    {
      id: 'layer-7',
      name: '疊層二：管材比對與轉折圖',
      sub: '投影片 7 • 管材選用規範 (PVC vs 透明PC)',
      src: '/投影片7.jpg',
      defaultZ: 90,
      visible: true,
      opacity: 0.92,
      highlightColor: 'border-sky-400',
    },
    {
      id: 'layer-8',
      name: '疊層三：三層立體配置透視圖',
      sub: '投影片 8 • 雨污分流綜合 3D 套繪驗證',
      src: '/投影片8.jpg',
      defaultZ: 135,
      visible: true,
      opacity: 0.9,
      highlightColor: 'border-blue-400',
    },
  ]);

  // Handle Scroll scrubbing within the 300vh sticky container
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse Move: Tilts the 3D plane when hovering over the container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!settings.tiltEnabled || !isMouseActive || isDragging) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Smooth subtle tilt
    setRotation({
      x: 10 + y * -28,
      y: -12 + x * 32,
      z: x * -6,
    });
  };

  // Drag to rotate handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
  };

  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setRotation({
      x: Math.max(-45, Math.min(45, dragStartRef.current.rotX - dy * 0.3)),
      y: Math.max(-60, Math.min(60, dragStartRef.current.rotY + dx * 0.3)),
      z: 0,
    });
  };

  const handleGlobalMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  const toggleLayerVisibility = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  const isolateLayer = (id: string | null) => {
    setActiveLayerIndex(id === null ? null : layers.findIndex((l) => l.id === id));
  };

  const reset3DView = () => {
    setRotation({ x: 12, y: -15, z: 0 });
    setExplodeDistance(1.2);
    setActiveLayerIndex(null);
  };

  return (
    <section
      id="section3"
      ref={sectionRef}
      className="relative w-full min-h-[260vh] bg-slate-950 border-t border-slate-900"
    >
      {/* Sticky Content Wrapper pinned while user scrolls through 260vh */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between py-12 px-4 overflow-hidden blueprint-grid-dense">
        {/* Atmosphere Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-br from-cyan-600/10 via-blue-700/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Top Section Header */}
        <div className="relative z-20 text-center max-w-4xl mx-auto shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-xs mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{phase.step} • 3D 疊圖視差模擬</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide mb-1 text-shadow">
            {phase.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            外牆接明管路徑模擬 • 依據滾動深度或滑鼠滑動展開 4 層工程套繪圖
          </p>

          {/* Quick Toolbar: Mouse tracking toggle, Reset, Explode Slider */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3">
            {/* Mouse Tracking Toggle */}
            <button
              onClick={() => setIsMouseActive(!isMouseActive)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                isMouseActive
                  ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5 text-cyan-400" />
              <span>滑鼠角度跟隨: {isMouseActive ? '開啟' : '鎖定'}</span>
            </button>

            {/* Reset View */}
            <button
              onClick={reset3DView}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>重設視角</span>
            </button>

            {/* Explode Distance Slider */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] text-slate-400">3D 分解間距:</span>
              <input
                type="range"
                min="0"
                max="2.5"
                step="0.1"
                value={explodeDistance}
                onChange={(e) => setExplodeDistance(Number(e.target.value))}
                className="w-20 sm:w-28 accent-cyan-400 h-1.5 cursor-pointer bg-slate-800"
              />
              <span className="font-mono text-cyan-400 text-[11px] w-8">
                {Math.round(explodeDistance * 100)}%
              </span>
            </div>

            {/* Video 6 Preview Button */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 transition-colors shadow"
            >
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              <span>外牆走線實錄 (4.5秒)</span>
            </button>

            {/* Material Spec Button */}
            <button
              onClick={() => setShowMaterialModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-sky-400" />
              <span>管材比對分析 (PVC vs PC)</span>
            </button>
          </div>
        </div>

        {/* Central 3D Stacking Viewport */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          className={`relative z-10 w-full max-w-4xl h-[42vh] sm:h-[48vh] md:h-[54vh] mx-auto my-auto flex items-center justify-center cursor-grab ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
          style={{ perspective: '1200px' }}
        >
          {/* Rotatable 3D Stage Container */}
          <div
            className="relative w-full h-full max-w-[780px] max-h-[480px] transition-transform duration-150 ease-out preserve-3d"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
            }}
          >
            {layers.map((layer, index) => {
              const isSolo = activeLayerIndex !== null;
              const isSelected = activeLayerIndex === index;

              // Calculate dynamic Z offset based on defaultZ, explodeDistance, and scrollProgress
              // When scrolling down, layers float forward progressively (scrub)
              const scrollExtraZ = index * (scrollProgress * 60);
              const zOffset = (layer.defaultZ * explodeDistance + scrollExtraZ);
              const yOffset = (index * 14 * explodeDistance);

              // Calculate opacity: layer-6, 7, 8 fade in with scroll progress if scroll driven
              const layerOpacity = isSolo
                ? isSelected ? 1 : 0.08
                : layer.visible ? layer.opacity : 0.05;

              return (
                <div
                  key={layer.id}
                  onClick={() => onOpenImage(layer.src, layer.name)}
                  className={`absolute inset-0 rounded-xl overflow-hidden border-2 shadow-2xl transition-all duration-300 preserve-3d group cursor-pointer ${
                    layer.highlightColor
                  } ${
                    isSelected ? 'ring-4 ring-cyan-400 ring-offset-4 ring-offset-slate-950 scale-105' : ''
                  }`}
                  style={{
                    transform: `translate3d(0px, ${yOffset}px, ${zOffset}px)`,
                    opacity: layerOpacity,
                    mixBlendMode: blendMode === 'screen' && index > 0 ? 'screen' : 'normal',
                    backgroundColor: '#090d16',
                  }}
                >
                  {/* Slide Image */}
                  <img
                    src={layer.src}
                    alt={layer.name}
                    className="w-full h-full object-contain pointer-events-none"
                  />

                  {/* Corner Engineering Tag Badge */}
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>{layer.name}</span>
                    <span className="text-slate-500 ml-1">Z: +{Math.round(zOffset)}px</span>
                  </div>

                  {/* Top Right Zoom Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenImage(layer.src, layer.name);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-900/80 hover:bg-cyan-900 border border-slate-700 text-slate-200 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                    title="放大檢視"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Bottom Info Bar on Hover */}
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-slate-950/90 to-transparent text-[11px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                    <span>{layer.sub}</span>
                    <span className="text-cyan-400 font-mono">點擊放大檢視</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Interactive Layer Switcher Bar */}
        <div className="relative z-20 max-w-4xl mx-auto w-full shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {layers.map((layer, index) => {
              const isSelected = activeLayerIndex === index;
              return (
                <div
                  key={layer.id}
                  className={`p-2.5 rounded-xl border transition-all duration-200 text-left cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                      : layer.visible
                      ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600'
                  }`}
                  onClick={() => isolateLayer(isSelected ? null : layer.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-cyan-400">
                      LAYER {index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLayerVisibility(layer.id);
                        }}
                        className="p-1 hover:text-cyan-300 transition-colors"
                        title={layer.visible ? '隱藏此圖層' : '顯示此圖層'}
                      >
                        {layer.visible ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="text-xs font-semibold truncate">{layer.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {layer.sub.split('•')[0]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Instructions Hint */}
          <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Move className="w-3 h-3 text-cyan-400" />
              滑鼠在畫面上移動即傾斜角度，按住滑鼠左鍵可 3D 自由旋轉
            </span>
            <span className="hidden sm:inline text-cyan-400/80">
              向下滾動觸發圖層展開 • 點擊卡片可單獨獨立檢視
            </span>
          </div>
        </div>
      </div>

      {/* Video 6 Modal: 外牆走線高空實錄 (4.5秒) */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden bg-slate-900 border border-cyan-500/50 shadow-2xl shadow-cyan-950/80">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-sm text-white">
                  外牆明管裝配走線與高空視角 (投影片6 實錄)
                </span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative bg-black">
              <video
                ref={video6Ref}
                src="/投影片6.mp4"
                poster="/投影片6_poster.jpg"
                playsInline
                autoPlay
                loop
                muted={isVideoMuted}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                className="w-full h-auto max-h-[60vh] object-contain mx-auto"
              />
            </div>

            {/* Video Controls Footer */}
            <div className="flex items-center justify-between p-4 bg-slate-950 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (!video6Ref.current) return;
                    if (isVideoPlaying) {
                      video6Ref.current.pause();
                      setIsVideoPlaying(false);
                    } else {
                      video6Ref.current.play();
                      setIsVideoPlaying(true);
                    }
                  }}
                  className="p-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
                >
                  {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  onClick={() => {
                    if (!video6Ref.current) return;
                    video6Ref.current.muted = !isVideoMuted;
                    setIsVideoMuted(!isVideoMuted);
                  }}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                </button>
                <span className="text-xs font-mono text-slate-400 ml-2">時長：4.5秒 • 外牆高空視角循環</span>
              </div>

              <button
                onClick={() => {
                  setShowVideoModal(false);
                  onOpenImage('/投影片6.jpg', '外牆接明管規劃圖 - 剖面配置');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors"
              >
                檢視剖面圖底圖
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Material Comparison Modal (Slide 7) */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-slate-900 border border-sky-500/40 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-sky-400" />
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    第三階段：管材選用規範比較 (投影片 7)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    耐候厚件 PVC 管 VS 高透視 PC 聚碳酸酯管全方位工程評估
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMaterialModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body: Image Thumbnail + Comparison Matrix */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              {/* Slide 7 Image Preview Banner */}
              <div
                onClick={() => onOpenImage('/投影片7.jpg', '管材選用規範比較')}
                className="group relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer"
              >
                <img
                  src="/投影片7.jpg"
                  alt="投影片7 管材選用規範比較"
                  className="w-full h-auto max-h-[260px] object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs text-cyan-300 font-mono flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    點擊放大檢視完整高解析投影片 7 原圖
                  </span>
                </div>
              </div>

              {/* Comparison Matrix Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3">評估項目</th>
                      <th className="p-3 text-cyan-300">耐候 PVC-U 排水管</th>
                      <th className="p-3 text-sky-300">透明 PC 聚碳酸酯管</th>
                      <th className="p-3 text-emerald-300">工程結論與採用標準</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-white">耐候抗紫外線</td>
                      <td className="p-3">優異 (添加抗 UV 劑)</td>
                      <td className="p-3">長期日曬易黃化變脆</td>
                      <td className="p-3 text-emerald-400">外牆立管全面採用抗 UV PVC-U</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-white">防火阻燃性</td>
                      <td className="p-3">具自熄性 (CNS 符合)</td>
                      <td className="p-3">燃點較低，遇高溫熔融</td>
                      <td className="p-3 text-emerald-400">完全符合社宅公共消防防焰法規</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-white">管內透視性</td>
                      <td className="p-3">不透明 (不易滋生青苔)</td>
                      <td className="p-3">全透明 (陽光直射生青苔)</td>
                      <td className="p-3 text-emerald-400">不透光防止管內藻類青苔孳生堵塞</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-white">耐衝擊與韌性</td>
                      <td className="p-3">厚件耐震度高，不易裂</td>
                      <td className="p-3">高透性但表面易磨損刮花</td>
                      <td className="p-3 text-emerald-400">承重外牆高空吊掛抗震能力卓越</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-white">施工維護成本</td>
                      <td className="p-3">成熟標準件，維修配件齊全</td>
                      <td className="p-3">專用接頭昂貴且採購期長</td>
                      <td className="p-3 text-emerald-400">維護經濟性高，社宅永續保固</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end px-6 py-3 border-t border-slate-800 bg-slate-950/80">
              <button
                onClick={() => setShowMaterialModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white transition-colors"
              >
                關閉說明
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
