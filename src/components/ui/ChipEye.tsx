import React, { useEffect, useState, useRef } from 'react';

interface ChipEyeProps {
  className?: string;
  width?: string;
  height?: string;
}

export const ChipEye: React.FC<ChipEyeProps> = ({ className = '', width = "0.9em", height = "0.65em" }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isAlive, setIsAlive] = useState(false);

  // Wait for bounce animation to complete before coming alive
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlive(true);
    }, 2800); // 2.5s tumble + 0.2s delay + small buffer
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAlive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (window.innerWidth / 2);
      const y = (e.clientY - centerY) / (window.innerHeight / 2);
      
      setMousePos({ 
        x: Math.max(-1, Math.min(1, x)), 
        y: Math.max(-1, Math.min(1, y)) 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isAlive]);

  useEffect(() => {
    if (!isAlive) return;

    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 150);

      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(blink, nextBlink);
    };

    const initialTimeout = setTimeout(blink, 500); // blink shortly after waking up
    return () => clearTimeout(initialTimeout);
  }, [isAlive]);

  // Increased pupil range for more noticeable movement
  const pupilRangeX = 3.5; 
  const pupilRangeY = 3.5; 
  
  const pupilX = 11 + (isAlive ? mousePos.x * pupilRangeX : 0);
  const pupilY = 8 + (isAlive ? mousePos.y * pupilRangeY : 0);

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
      <g style={{
        transformOrigin: '11px 8px',
        transform: isBlinking ? 'scaleY(0.05)' : 'scaleY(1)',
        transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {/* Main Chip Body */}
        <rect x="5" y="2" width="12" height="12" rx="1.5" stroke="#B89A0A" strokeWidth="1.2" fill={isAlive ? "rgba(184, 154, 10, 0.05)" : "none"} style={{ transition: 'fill 1s ease' }}/>
        
        {/* Pupil */}
        <circle cx={pupilX} cy={pupilY} r="2" fill="#B89A0A" 
          style={{ transition: 'cx 0.15s ease-out, cy 0.15s ease-out' }} 
        />
      </g>

      {/* Pins - exact from logo */}
      <line x1="5" y1="5.5" x2="2" y2="5.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="5" y1="10.5" x2="2" y2="10.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="17" y1="5.5" x2="20" y2="5.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="17" y1="10.5" x2="20" y2="10.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="8" y1="2" x2="8" y2="0" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="11" y1="2" x2="11" y2="0" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="14" y1="2" x2="14" y2="0" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="8" y1="14" x2="8" y2="16" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="11" y1="14" x2="11" y2="16" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="14" y1="14" x2="14" y2="16" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
};
