import React from "react";
import { motion } from "framer-motion";

interface ServiceAnimationProps {
  index: number;
}

export const ServiceAnimation: React.FC<ServiceAnimationProps> = ({ index }) => {
  const gold = "#B89A0A";
  const grey = "#e5e5e5"; 
  const darkGrey = "#A39F93";

  // Shared variants with 0.8s delay (to wait for chip layout animation to land)
  const fadeIn: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.8 } }
  };

  if (index === 0) {
    // ----------------------------------------------------------------------
    // SCENARIO 1: INVENTORY & AUTOMATION (Scale 800x500)
    // Chip is at center (400,250). Boxes move on a conveyor belt below.
    // ----------------------------------------------------------------------
    return (
      <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none" initial="hidden" animate="visible" variants={fadeIn}>
        
        {/* Ground / Conveyor Belt */}
        <line x1="0" y1="420" x2="800" y2="420" stroke={grey} strokeWidth="4" strokeDasharray="16 16">
          <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1s" repeatCount="indefinite" />
        </line>

        {/* Telekinetic Laser from Chip */}
        <motion.path d="M 370 280 L 370 420 M 430 280 L 430 420" stroke={gold} strokeWidth="2" strokeDasharray="8 8" opacity="0.5"
          animate={{ strokeDashoffset: [16, 0], opacity: [0.2, 0.6, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} />
        
        {/* Scanning Box Area */}
        <rect x="360" y="340" width="80" height="80" stroke={gold} strokeWidth="2" strokeDasharray="4 4" fill="rgba(184,154,10,0.05)" />

        {/* Moving Boxes */}
        {/* Box 1 (Loops continuously) */}
        <motion.g animate={{ x: [800, 370, 150, 150], y: [350, 350, 270, 270], opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.4, 0.7, 1] }}>
          <rect x="0" y="0" width="60" height="70" rx="4" stroke={darkGrey} strokeWidth="3" fill="#FDFCF8" />
          <text x="12" y="42" fontSize="22" fill={darkGrey} fontFamily="sans-serif" fontWeight="bold">INV</text>
        </motion.g>

        {/* Box 2 (Delayed) */}
        <motion.g animate={{ x: [800, 370, 220, 220], y: [350, 350, 350, 350], opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.4, 0.7, 1], delay: 1.3 }}>
          <rect x="0" y="0" width="60" height="70" rx="4" stroke={darkGrey} strokeWidth="3" fill="#FDFCF8" />
          <line x1="15" y1="30" x2="45" y2="30" stroke={gold} strokeWidth="4" />
          <line x1="15" y1="45" x2="35" y2="45" stroke={gold} strokeWidth="4" />
        </motion.g>

        {/* Box 3 (Delayed) */}
        <motion.g animate={{ x: [800, 370, 150, 150], y: [350, 350, 350, 350], opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.4, 0.7, 1], delay: 2.6 }}>
          <rect x="0" y="0" width="60" height="70" rx="4" stroke={gold} strokeWidth="4" fill="#FDFCF8" />
          <text x="15" y="42" fontSize="22" fill={gold} fontFamily="sans-serif" fontWeight="bold">OK</text>
        </motion.g>

        {/* Static Sorted Grid Outlines in background */}
        <rect x="145" y="345" width="70" height="80" rx="4" stroke={grey} strokeWidth="2" strokeDasharray="4 4" />
        <rect x="225" y="345" width="70" height="80" rx="4" stroke={grey} strokeWidth="2" strokeDasharray="4 4" />
        <rect x="145" y="255" width="70" height="80" rx="4" stroke={grey} strokeWidth="2" strokeDasharray="4 4" />
      </motion.svg>
    );
  }

  if (index === 1) {
    // ----------------------------------------------------------------------
    // SCENARIO 2: DASHBOARD & PULSE
    // Dashboard behind chip. Chip emits pulse waves to swipe panels.
    // ----------------------------------------------------------------------
    return (
      <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none" initial="hidden" animate="visible" variants={fadeIn}>
        
        {/* Dashboard Window (Huge) */}
        <rect x="100" y="60" width="600" height="380" rx="12" stroke={darkGrey} strokeWidth="4" fill="#FDFCF8" />
        <line x1="100" y1="110" x2="700" y2="110" stroke={darkGrey} strokeWidth="2" />
        
        {/* Window controls */}
        <circle cx="130" cy="85" r="8" fill={grey} />
        <circle cx="160" cy="85" r="8" fill={grey} />
        <circle cx="190" cy="85" r="8" fill={grey} />

        {/* Dashboard Content Container (Clipping) */}
        <clipPath id="dash-clip">
          <rect x="110" y="120" width="580" height="310" />
        </clipPath>

        {/* Telekinetic Pulse Wave from center (400, 250) */}
        <motion.circle cx="400" cy="250" stroke={gold} strokeWidth="4" fill="none"
          animate={{ r: [60, 400], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} />
        <motion.circle cx="400" cy="250" stroke={gold} strokeWidth="2" fill="none"
          animate={{ r: [60, 300], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1.2 }} />

        <g clipPath="url(#dash-clip)">
          {/* Panel 1: Bar Charts (Slides left) */}
          <motion.g animate={{ x: [0, 0, -600, -600, 0] }} transition={{ repeat: Infinity, duration: 6, times: [0, 0.4, 0.5, 0.9, 1] }}>
            <rect x="200" y="350" width="40" height="0" fill={gold}>
               <animate attributeName="height" values="0;120;100;150;0" dur="6s" repeatCount="indefinite" />
               <animate attributeName="y" values="350;230;250;200;350" dur="6s" repeatCount="indefinite" />
            </rect>
            <rect x="280" y="350" width="40" height="0" fill={darkGrey}>
               <animate attributeName="height" values="0;180;220;200;0" dur="6s" repeatCount="indefinite" />
               <animate attributeName="y" values="350;170;130;150;350" dur="6s" repeatCount="indefinite" />
            </rect>
            <rect x="360" y="350" width="40" height="0" fill={gold} opacity="0.6">
               <animate attributeName="height" values="0;80;120;240;0" dur="6s" repeatCount="indefinite" />
               <animate attributeName="y" values="350;270;230;110;350" dur="6s" repeatCount="indefinite" />
            </rect>
            <rect x="440" y="350" width="40" height="0" fill={darkGrey} opacity="0.5">
               <animate attributeName="height" values="0;220;180;150;0" dur="6s" repeatCount="indefinite" />
               <animate attributeName="y" values="350;130;170;200;350" dur="6s" repeatCount="indefinite" />
            </rect>
            <rect x="520" y="350" width="40" height="0" fill={gold}>
               <animate attributeName="height" values="0;160;140;190;0" dur="6s" repeatCount="indefinite" />
               <animate attributeName="y" values="350;190;210;160;350" dur="6s" repeatCount="indefinite" />
            </rect>
          </motion.g>

          {/* Panel 2: Analytics Nodes (Slides in from right) */}
          <motion.g animate={{ x: [600, 600, 0, 0, 600] }} transition={{ repeat: Infinity, duration: 6, times: [0, 0.4, 0.5, 0.9, 1] }}>
            <polyline points="150,380 280,220 450,290 600,160 720,200" stroke={gold} strokeWidth="6" strokeLinejoin="round" fill="none" />
            <circle cx="280" cy="220" r="12" fill={darkGrey} />
            <circle cx="450" cy="290" r="12" fill={darkGrey} />
            <circle cx="600" cy="160" r="16" fill={gold} />
            
            <line x1="600" y1="160" x2="600" y2="420" stroke={gold} strokeWidth="3" strokeDasharray="8 8" />
          </motion.g>
        </g>
      </motion.svg>
    );
  }

  if (index === 2) {
    // ----------------------------------------------------------------------
    // SCENARIO 3: CONSULTING & RADAR SCAN
    // Chip emits a massive radar cone to scan the team nodes.
    // ----------------------------------------------------------------------
    return (
      <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" fill="none" initial="hidden" animate="visible" variants={fadeIn}>
        
        {/* Radar Cone (Sweeping Left to Right) */}
        <motion.path d="M 400 250 L 150 50 A 300 300 0 0 0 150 450 Z" 
          fill="url(#radar-grad)" opacity="0.4"
          style={{ transformOrigin: "400px 250px" }}
          animate={{ rotate: [-40, 40, -40] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <defs>
          <radialGradient id="radar-grad" cx="400" cy="250" r="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={gold} stopOpacity="0.8" />
            <stop offset="100%" stopColor={gold} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Abstract People / Team Nodes */}
        <g stroke={darkGrey} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {/* Person 1 (Top Left) */}
          <circle cx="200" cy="150" r="20" />
          <path d="M 150 220 Q 200 180 250 220" />
          {/* Person 2 (Bottom Left) */}
          <circle cx="250" cy="350" r="24" />
          <path d="M 190 440 Q 250 390 310 440" />
          
          {/* Person 3 (Top Right) */}
          <circle cx="600" cy="180" r="22" />
          <path d="M 540 260 Q 600 210 660 260" />
          {/* Person 4 (Bottom Right) */}
          <circle cx="580" cy="380" r="20" />
          <path d="M 530 450 Q 580 410 630 450" />
        </g>

        {/* Network connections between people and chip */}
        <motion.path d="M 200 150 L 400 250 M 250 350 L 400 250 M 600 180 L 400 250 M 580 380 L 400 250" 
          stroke={grey} strokeWidth="2" strokeDasharray="12 12"
          animate={{ strokeDashoffset: [48, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />

        {/* Highlight effect when radar passes over */}
        <motion.circle cx="200" cy="150" r="26" fill={gold} opacity="0" animate={{ opacity: [0, 0.6, 0] }} transition={{ repeat: Infinity, duration: 6, times: [0, 0.1, 0.2] }} />
        <motion.circle cx="250" cy="350" r="30" fill={gold} opacity="0" animate={{ opacity: [0, 0.6, 0] }} transition={{ repeat: Infinity, duration: 6, times: [0.1, 0.2, 0.3] }} />
        <motion.circle cx="600" cy="180" r="28" fill={gold} opacity="0" animate={{ opacity: [0, 0.6, 0] }} transition={{ repeat: Infinity, duration: 6, times: [0.5, 0.6, 0.7] }} />
        <motion.circle cx="580" cy="380" r="26" fill={gold} opacity="0" animate={{ opacity: [0, 0.6, 0] }} transition={{ repeat: Infinity, duration: 6, times: [0.7, 0.8, 0.9] }} />

      </motion.svg>
    );
  }

  return null;
};
