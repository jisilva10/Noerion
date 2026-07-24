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
}

export const ChipEye: React.FC<ChipEyeProps> = ({ 
  className = '', 
  width = "0.9em", 
  height = "0.65em", 
  disableInitialSleep = false,
  disableEyeAnimation = false,
  forceAsleep = false,
  wakeDelay = 2800,
  disableMouseFollow = false
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

  useEffect(() => {
    if (!isAlive || disableEyeAnimation || disableMouseFollow) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      // Calculate distance to normalize the movement
      const distance = Math.sqrt(x * x + y * y);
      const maxDist = 15; // Max pixels the eye can move from center
      
      if (distance > 0) {
        setMousePos({
          x: (x / distance) * Math.min(distance, maxDist),
          y: (y / distance) * Math.min(distance, maxDist)
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAlive, disableEyeAnimation, disableMouseFollow]);

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
  
  const pupilX = 11 + (isAlive ? mousePos.x * pupilRangeX : 0);
  const pupilY = 8 + (isAlive ? mousePos.y * pupilRangeY : 0);

  const greyColor = "#A39F93"; // Soft grey for sleeping state
  const goldColor = "#B89A0A";

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
      <g stroke={greyColor} strokeWidth="1" strokeLinecap="round" clipPath={`url(#sleep-${clipId})`}>
        {/* Main Body */}
        <rect x="5" y="2" width="12" height="12" rx="1.5" strokeWidth="1.2" fill="none" />
        
        {/* Closed Eye (Line) */}
        <line x1="8.5" y1="8" x2="13.5" y2="8" strokeWidth="1.5" />

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

      {/* --- AWAKE LAYER (Gold, open eye, alive) --- */}
      <g clipPath={`url(#wake-${clipId})`}>
        {/* Gold Pins */}
        <g stroke={goldColor} strokeWidth="1" strokeLinecap="round">
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

        {/* Gold Body & Eye (with blink transform) */}
        <g style={{
          transformOrigin: '11px 8px',
          transform: isBlinking ? 'scaleY(0.05)' : 'scaleY(1)',
          transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <rect x="5" y="2" width="12" height="12" rx="1.5" stroke={goldColor} strokeWidth="1.2" fill={isAlive ? "rgba(184, 154, 10, 0.05)" : "none"}/>
          
          <circle cx={pupilX} cy={pupilY} r="2" fill={goldColor} />
        </g>
      </g>
    </svg>
  );
};
