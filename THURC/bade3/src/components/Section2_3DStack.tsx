import React, { useState, useRef, useEffect } from 'react';
import {
  Layers,
  Eye,
  Rotate3d,
  Sliders,
  Maximize2,
  CheckCircle2,
  Info,
  Sparkles,
  ChevronRight,
  Upload,
} from 'lucide-react';
import { FLOOR_LAYERS } from '../data/mediaConfig';
import { useMedia } from '../context/MediaContext';

export const Section2_3DStack: React.FC = () => {
  const { getAssetSrc, setCustomFile } = useMedia();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress from 0 (entry) to 1 (exit) of the sticky container
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive controls
  const [selectedFloor, setSelectedFloor] = useState<string>('all'); // 'all' | 'base' | '3f' | '4f' | '5f'
  const [is3DMode, setIs3DMode] = useState<boolean>(true);
  const [explodeGap, setExplodeGap] = useState<number>(70); // px vertical separation
  const [tiltAngle, setTiltAngle] = useState<{ x: number; y: number }>({ x: 18, y: -12 });
  const [layerOpacity, setLayerOpacity] = useState<number>(0.92);

  // Measure scroll through the tall section (height: 250vh)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const progress = -rect.top / totalScrollable;
      const clamped = Math.min(Math.max(progress, 0), 1);
      setScrollProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute transform values for each layer based on scroll progress or manual floor selection
  const getLayerStyle = (layerIndex: number, floorId: string) => {
    // If a specific floor is selected, isolate it
    if (selectedFloor !== 'all') {
      if (selectedFloor === floorId) {
        return {
          opacity: 1,
          transform: 'translateY(0px) translateZ(60px) rotateX(0deg) rotateY(0deg) scale(1.02)',
          filter: 'drop-shadow(0 20px 30px rgba(56, 189, 248, 0.4))',
          zIndex: 50,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        };
      } else if (floorId === 'base') {
        return {
          opacity: 0.25,
          transform: 'translateY(40px) translateZ(-40px) scale(0.96)',
          filter: 'grayscale(80%) blur(1px)',
          zIndex: 5,
          transition: 'all 0.5s ease',
        };
      } else {
        return {
          opacity: 0.1,
          transform: 'translateY(60px) scale(0.9)',
          zIndex: 1,
          transition: 'all 0.5s ease',
        };
      }
    }

    // Default: 3D Stack driven by scroll progress
    // Layer 0 (Base): always visible
    if (floorId === 'base') {
      const rotX = is3DMode ? tiltAngle.x : 0;
      const rotY = is3DMode ? tiltAngle.y : 0;
      return {
        opacity: 1,
        transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0px)`,
        zIndex: 10,
        filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.8))',
        transition: 'transform 0.2s ease-out',
      };
    }

    // Floor 3F: appears around progress 0.15 -> 0.45
    // Floor 4F: appears around progress 0.40 -> 0.70
    // Floor 5F: appears around progress 0.65 -> 1.00
    let stepStart = 0;
    let stepEnd = 1;
    let targetZ = 0;
    let targetY = 0;

    if (floorId === '3f') {
      stepStart = 0.1;
      stepEnd = 0.4;
      targetZ = explodeGap * 1.2;
      targetY = -explodeGap * 0.4;
    } else if (floorId === '4f') {
      stepStart = 0.35;
      stepEnd = 0.65;
      targetZ = explodeGap * 2.3;
      targetY = -explodeGap * 0.8;
    } else if (floorId === '5f') {
      stepStart = 0.6;
      stepEnd = 0.95;
      targetZ = explodeGap * 3.4;
      targetY = -explodeGap * 1.2;
    }

    const stageProgress = Math.min(
      Math.max((scrollProgress - stepStart) / (stepEnd - stepStart), 0),
      1
    );

    // Smooth easing
    const eased = stageProgress * (2 - stageProgress);

    const currentY = (1 - eased) * 120 + targetY * eased;
    const currentZ = eased * targetZ;
    const rotX = is3DMode ? tiltAngle.x + (1 - eased) * 15 : 0;
    const rotY = is3DMode ? tiltAngle.y : 0;
    const currentOpacity = Math.max(0, eased * layerOpacity);

    return {
      opacity: currentOpacity,
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${currentY}px) translateZ(${currentZ}px)`,
      zIndex: 10 + layerIndex * 10,
      filter:
        eased > 0.5
          ? `drop-shadow(0 ${10 + layerIndex * 5}px ${20 + layerIndex * 8}px rgba(0,0,0,0.7))`
          : 'none',
      transition: 'transform 0.15s ease-out, opacity 0.25s ease-out',
      pointerEvents: currentOpacity > 0.2 ? ('auto' as const) : ('none' as const),
    };
  };

  const activeFloorData =
    selectedFloor === 'all'
      ? scrollProgress > 0.7
        ? FLOOR_LAYERS[3]
        : scrollProgress > 0.4
        ? FLOOR_LAYERS[2]
        : scrollProgress > 0.15
        ? FLOOR_LAYERS[1]
        : FLOOR_LAYERS[0]
      : FLOOR_LAYERS.find((l) => l.id === selectedFloor) || FLOOR_LAYERS[0];

  return (
    <div
      id="section2"
      ref={containerRef}
      className="relative w-full bg-[#080d1a] border-t border-slate-900"
      style={{ height: '260vh' }}
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between pt-16 pb-8 px-4 sm:px-6 overflow-hidden">
        {/* Stage Header & Status */}
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 z-30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2 shadow-lg">
              <Layers className="w-3.5 h-3.5" />
              <span>第二區塊 • 3D 平面立體疊圖分析</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight text-shadow">
              第二區塊：樓層管線配置 (3D疊圖)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              向下滾動可逐層展開 3F → 4F → 5F 明管路徑，展示主幹垂直貫穿與各層斜接順水工法。
            </p>
          </div>

          {/* Interactive Mode & Floor Filters */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setSelectedFloor('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedFloor === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              全部疊層
            </button>
            {FLOOR_LAYERS.map((fl) => (
              <button
                key={fl.id}
                onClick={() => setSelectedFloor(fl.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                  selectedFloor === fl.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: fl.accentHex }}
                />
                <span>{fl.floor}</span>
              </button>
            ))}

            <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

            {/* 3D Perspective Toggle */}
            <button
              onClick={() => setIs3DMode(!is3DMode)}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition ${
                is3DMode
                  ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
              title={is3DMode ? '切換為平面平視模式' : '切換為 3D 空間視角'}
            >
              <Rotate3d className="w-4 h-4" />
              <span className="hidden sm:inline">{is3DMode ? '3D視角' : '2D平視'}</span>
            </button>
          </div>
        </div>

        {/* 3D Stacking Canvas / Viewport */}
        <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center my-2 select-none">
          {/* Subtle Stage Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

          {/* Perspective Container */}
          <div
            className="relative w-full max-w-3xl aspect-[16/10] max-h-[58vh] flex items-center justify-center"
            style={{
              perspective: '1300px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            {/* Render Stacked Layers */}
            {FLOOR_LAYERS.map((layer, index) => {
              const src = getAssetSrc(
                layer.id === 'base'
                  ? 'floor_base'
                  : layer.id === '3f'
                  ? 'floor_3f'
                  : layer.id === '4f'
                  ? 'floor_4f'
                  : 'floor_5f'
              );
              const layerStyle = getLayerStyle(index, layer.id);

              return (
                <div
                  key={layer.id}
                  style={layerStyle}
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950/80 shadow-2xl transition-all cursor-pointer will-change-transform group"
                  onClick={() => setSelectedFloor(layer.id === selectedFloor ? 'all' : layer.id)}
                >
                  {/* Layer Image with Fallback */}
                  <img
                    src={src}
                    alt={layer.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // If image fails, replace with high-fidelity blueprint canvas simulation
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.blueprint-fallback')) {
                        const div = document.createElement('div');
                        div.className =
                          'blueprint-fallback w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-blue-950/60 to-slate-950';
                        div.innerHTML = `
                          <div class="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/30">
                            樓層管線圖層: ${layer.floor}
                          </div>
                          <h4 class="text-white font-bold text-lg mb-1">${layer.title}</h4>
                          <p class="text-xs text-slate-400 font-mono mb-3">對應檔名: ${layer.fileName}</p>
                          <div class="flex items-center gap-2 text-xs text-cyan-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                            <span>點擊素材管理可自訂上傳此樓層圖</span>
                          </div>
                        `;
                        parent.appendChild(div);
                      }
                    }}
                  />

                  {/* Floor Layer Tag Badge */}
                  <div className="absolute top-3 left-3 z-30 flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-700 shadow-md">
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: layer.accentHex }}
                    />
                    <span className="text-xs font-bold text-white tracking-wider font-mono">
                      {layer.floor}
                    </span>
                    <span className="text-[11px] text-slate-400 border-l border-slate-700 pl-2">
                      {layer.title.split(' ')[1] || layer.title}
                    </span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute bottom-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 text-[11px] backdrop-blur-sm">
                    <Eye className="w-3 h-3" />
                    <span>點擊單層檢視</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Inspector Bar & Floor Details */}
        <div className="max-w-6xl mx-auto w-full z-30">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Active Floor Description */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-lg shrink-0"
                style={{ backgroundColor: activeFloorData.accentHex }}
              >
                {activeFloorData.floor}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-bold text-sm sm:text-base">
                    {activeFloorData.title}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    ({activeFloorData.fileName})
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {activeFloorData.subtitle}
                </p>
              </div>
            </div>

            {/* Engineering Highlights for current layer */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-300">
              {activeFloorData.details.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* Explode Distance Slider (when in all floors) */}
            {selectedFloor === 'all' && (
              <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-800 shrink-0">
                <span className="text-[11px] text-slate-400 font-mono">展開間距:</span>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={explodeGap}
                  onChange={(e) => setExplodeGap(Number(e.target.value))}
                  className="w-20 accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-cyan-300 w-8">{explodeGap}px</span>
              </div>
            )}
          </div>

          {/* Scroll Progress Bar indicator */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
            <span>基底全區</span>
            <div className="flex-1 mx-3 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 transition-all duration-150"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <span>5F 頂層通氣端 ({Math.round(scrollProgress * 100)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
