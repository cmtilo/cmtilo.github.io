import React, { useEffect, useState, useRef } from 'react';
import { MouseEffectSettings } from '../types';

interface MouseFollowerProps {
  settings: MouseEffectSettings;
}

export const MouseFollower: React.FC<MouseFollowerProps> = ({ settings }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState(0);
  const [isPointer, setIsPointer] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(1, now - lastPosRef.current.time);
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = Math.min(100, Math.round((dist / dt) * 50));

      setVelocity(speed);
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('button, a, input, video, [role="button"], .interactive-target');
        setIsPointer(isClickable);
      }

      // Add fluid ripple if moving fast and water trail enabled
      if (settings.waterTrailEnabled && speed > 25 && Math.random() > 0.6) {
        setRipples((prev) => [
          ...prev.slice(-12),
          { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY },
        ]);
      }

      lastPosRef.current = { x: e.clientX, y: e.clientY, time: now };
    };

    const handleMouseDown = (e: MouseEvent) => {
      setRipples((prev) => [
        ...prev.slice(-12),
        { id: Date.now(), x: e.clientX, y: e.clientY },
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    // Smooth lerp follow for cursor aura
    const updateCursor = () => {
      setCursorPos((prev) => {
        const factor = 0.22;
        return {
          x: prev.x + (mousePos.x - prev.x) * factor,
          y: prev.y + (mousePos.y - prev.y) * factor,
        };
      });
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos.x, mousePos.y, settings.waterTrailEnabled]);

  // Clean up ripples after animation
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.filter((r) => Date.now() - r.id < 900));
    }, 200);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!settings.spotlightEnabled && !settings.waterTrailEnabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Dynamic Cursor Spotlight */}
      {settings.spotlightEnabled && (
        <>
          <div
            className="absolute rounded-full transition-transform duration-75 ease-out"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
              width: `${Math.max(260, Math.min(500, 300 + velocity * 2))}px`,
              height: `${Math.max(260, Math.min(500, 300 + velocity * 2))}px`,
              background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 70%)',
              mixBlendMode: 'screen',
            }}
          />
          {/* Central Precise Reticle */}
          <div
            className="absolute w-6 h-6 -ml-3 -mt-3 border border-cyan-400/40 rounded-full transition-transform duration-100 ease-out flex items-center justify-center"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              transform: isPointer ? 'scale(1.6)' : 'scale(1)',
              borderColor: isPointer ? '#38bdf8' : 'rgba(56, 189, 248, 0.5)',
              backgroundColor: isPointer ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
            }}
          >
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          </div>
        </>
      )}

      {/* Fluid Water Pressure Ripples */}
      {settings.waterTrailEnabled &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/60 animate-ping pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '40px',
              height: '40px',
              animationDuration: '0.8s',
            }}
          />
        ))}

      {/* Floating HUD in Bottom Right */}
      <div className="hidden lg:flex fixed bottom-3 right-4 z-50 items-center gap-3 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/20 text-[11px] font-mono text-cyan-300/80 shadow-lg pointer-events-auto select-none">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          滑鼠動態視差
        </span>
        <span className="text-slate-600">|</span>
        <span>X: {Math.max(0, mousePos.x)}</span>
        <span>Y: {Math.max(0, mousePos.y)}</span>
        <span className="text-slate-600">|</span>
        <span className="text-cyan-400 font-semibold">VEL: {velocity}px/s</span>
      </div>
    </div>
  );
};
