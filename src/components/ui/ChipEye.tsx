import React, { useEffect, useState, useRef } from 'react';

export const ChipEye: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 150);

      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(blink, nextBlink);
    };

    const initialTimeout = setTimeout(blink, 2000);
    return () => clearTimeout(initialTimeout);
  }, []);

  const pupilRangeX = 1.5; 
  const pupilRangeY = 1.5; 
  
  const pupilX = 11 + mousePos.x * pupilRangeX;
  const pupilY = 8 + mousePos.y * pupilRangeY;

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 22 16" 
        fill="none" 
        className="max-w-[200px] max-h-[145px] w-full"
        style={{ overflow: 'visible' }}
      >
        <g style={{
          transformOrigin: '11px 8px',
          transform: isBlinking ? 'scaleY(0.05)' : 'scaleY(1)',
          transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* Main Chip Body */}
          <rect x="5" y="2" width="12" height="12" rx="1.5" stroke="#B89A0A" strokeWidth="1.2" fill="rgba(184, 154, 10, 0.05)"/>
          
          {/* Pupil */}
          <circle cx={pupilX} cy={pupilY} r="2" fill="#B89A0A" 
            style={{ transition: 'cx 0.1s ease-out, cy 0.1s ease-out' }} 
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
    </div>
  );
};
