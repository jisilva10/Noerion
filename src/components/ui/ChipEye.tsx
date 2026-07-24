import React, { useEffect, useState, useRef, useId } from 'react';

interface ChipEyeProps {
  className?: string;
  width?: string;
  height?: string;
  disableInitialSleep?: boolean;
  disableEyeAnimation?: boolean;
  forceAsleep?: boolean;
  wakeDelay?: number;
  disableMouseFollow?: boolean;
  pupilOffset?: { x: number; y: number } | null;
  strokeScale?: number;
}

export const ChipEye: React.FC<ChipEyeProps> = ({ 
  className = '', 
  width = "0.9em", 
  height = "0.65em", 
  disableInitialSleep = false,
  disableEyeAnimation = false,
  forceAsleep = false,
  wakeDelay = 2800,
  disableMouseFollow = false,
  pupilOffset = null,
  strokeScale = 1
}) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isAlive, setIsAlive] = useState(disableInitialSleep && !forceAsleep);
  const clipId = useId().replace(/:/g, "");

  // Wait for bounce animation to complete before coming alive
  useEffect(() => {
    if (forceAsleep) {
      setIsAlive(false);
      return;
    }
    if (disableInitialSleep) {
      setIsAlive(true);
      return;
    }
    const timer = setTimeout(() => {
      setIsAlive(true);
    }, wakeDelay);
    return () => clearTimeout(timer);
  }, [disableInitialSleep, forceAsleep, wakeDelay]);

  const directed = pupilOffset != null;

  useEffect(() => {
    if (!isAlive || disableEyeAnimation || disableMouseFollow || directed) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (window.innerWidth / 2);
      const y = (e.clientY - centerY) / (window.innerHeight / 2);
      
      rafId = requestAnimationFrame(() => {
        setMousePos({ 
          x: Math.max(-1, Math.min(1, x)), 
          y: Math.max(-1, Math.min(1, y)) 
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isAlive, disableEyeAnimation, disableMouseFollow, directed]);

  useEffect(() => {
    if (!isAlive || disableEyeAnimation) return;

    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 150);

      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(blink, nextBlink);
    };

    const initialTimeout = setTimeout(blink, 1000); 
    return () => clearTimeout(initialTimeout);
  }, [isAlive, disableEyeAnimation]);

  const pupilRangeX = 3.5;
  const pupilRangeY = 3.5;

  const gaze = directed ? pupilOffset! : (disableMouseFollow ? { x: 0, y: 0 } : mousePos);
  const gx = (isAlive ? gaze.x : 0) * pupilRangeX;
  const gy = (isAlive ? gaze.y : 0) * pupilRangeY;

  const greyColor = "#A39F93"; // Soft grey for sleeping state
  const goldColor = "#B89A0A";

  const sw = (n: number) => n * strokeScale;

  return (
    <svg 
      ref={containerRef}
      className={className} 
      width={width} 
      height={height} 
      viewBox="0 0 22 16" 
      fill="none"
      style={{ overflow: 'visible', verticalAlign: 'baseline', display: 'inline-block' }}
    >
      <defs>
        <clipPath id={`wake-${clipId}`}>
          <rect 
            x="-2" y="-2" width="26" height="20" 
            style={{ 
              transformOrigin: "center bottom", 
              transform: isAlive ? "scaleY(1)" : "scaleY(0)", 
              transition: "transform 0.8s cubic-bezier(0.2, 0, 0, 1)" 
            }} 
          />
        </clipPath>
        <clipPath id={`sleep-${clipId}`}>
          <rect 
            x="-2" y="-2" width="26" height="20" 
            style={{ 
              transformOrigin: "center top", 
              transform: isAlive ? "scaleY(0)" : "scaleY(1)", 
              transition: "transform 0.8s cubic-bezier(0.2, 0, 0, 1)" 
            }} 
          />
        </clipPath>
      </defs>

      {/* --- ASLEEP LAYER (Grey, closed eye) --- */}
      <g stroke={greyColor} strokeWidth={sw(1)} strokeLinecap="round" clipPath={`url(#sleep-${clipId})`}>
        {/* Main Body */}
        <rect x="5" y="2" width="12" height="12" rx="1.5" strokeWidth={sw(1.2)} fill="none" />
        
        {/* Closed Eye (Line) */}
        <line x1="8.5" y1="8" x2="13.5" y2="8" strokeWidth={sw(1.5)} />

        {/* Pins */}
        <line x1="5" y1="5.5" x2="2" y2="5.5" />
        <line x1="5" y1="10.5" x2="2" y2="10.5" />
        <line x1="17" y1="5.5" x2="20" y2="5.5" />
        <line x1="17" y1="10.5" x2="20" y2="10.5" />
        <line x1="8" y1="2" x2="8" y2="0" />
        <line x1="11" y1="2" x2="11" y2="0" />
        <line x1="14" y1="2" x2="14" y2="0" />
        <line x1="8" y1="14" x2="8" y2="16" />
        <line x1="11" y1="14" x2="11" y2="16" />
        <line x1="14" y1="14" x2="14" y2="16" />
      </g>

      {/* --- AWAKE LAYER (Gold, open eye) --- */}
      <g stroke={goldColor} strokeWidth={sw(1)} strokeLinecap="round" clipPath={`url(#wake-${clipId})`}>
        {/* Main Body */}
        <rect x="5" y="2" width="12" height="12" rx="1.5" strokeWidth={sw(1.2)} fill={isAlive ? "rgba(184, 154, 10, 0.05)" : "none"} />

        {/* The Eye */}
        <g style={{ 
          transformOrigin: "11px 8px", 
          transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)", 
          transition: isBlinking ? "none" : "transform 0.15s cubic-bezier(0.2, 0, 0, 1)" 
        }}>
          {/* Sclera */}
          <path d="M 6.5 8 C 8 5 14 5 15.5 8 C 14 11 8 11 6.5 8 Z" fill="none" strokeWidth={sw(1.2)} />
          
          {/* Pupil */}
          <circle 
            cx="11" cy="8" r="1.5" fill={goldColor}
            style={{ 
              transform: `translate(${gx}px, ${gy}px)`,
              transition: "transform 0.1s ease-out" 
            }} 
          />
        </g>

        {/* Pins */}
        <line x1="5" y1="5.5" x2="2" y2="5.5" />
        <line x1="5" y1="10.5" x2="2" y2="10.5" />
        <line x1="17" y1="5.5" x2="20" y2="5.5" />
        <line x1="17" y1="10.5" x2="20" y2="10.5" />
        <line x1="8" y1="2" x2="8" y2="0" />
        <line x1="11" y1="2" x2="11" y2="0" />
        <line x1="14" y1="2" x2="14" y2="0" />
        <line x1="8" y1="14" x2="8" y2="16" />
        <line x1="11" y1="14" x2="11" y2="16" />
        <line x1="14" y1="14" x2="14" y2="16" />
      </g>
    </svg>
  );
};
