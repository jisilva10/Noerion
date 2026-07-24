import React from "react";
import { motion } from "framer-motion";

interface ServiceAnimationProps {
  index: number;
}

export const ServiceAnimation: React.FC<ServiceAnimationProps> = ({ index }) => {
  const gold = "#B89A0A";
  const grey = "#e5e5e5"; 
  const darkGrey = "#A39F93";

  // Shared variants
  const fadeIn: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } }
  };

  if (index === 0) {
    // ----------------------------------------------------------------------
    // SCENARIO 1: INVENTORY & AUTOMATION
    // Chip is walking, boxes move from right, get sorted and stacked.
    // ----------------------------------------------------------------------
    return (
      <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none" initial="hidden" animate="visible" variants={fadeIn}>
        
        {/* Ground / Conveyor Belt */}
        <line x1="0" y1="70" x2="100" y2="70" stroke={grey} strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
        </line>
        
        {/* Little Chip Legs (Simulating walking) */}
        <motion.line x1="47" y1="65" x2="47" y2="70" stroke={gold} strokeWidth="1.5" strokeLinecap="round"
          animate={{ y2: [70, 66, 70], x2: [47, 44, 47] }} transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }} />
        <motion.line x1="53" y1="65" x2="53" y2="70" stroke={gold} strokeWidth="1.5" strokeLinecap="round"
          animate={{ y2: [66, 70, 66], x2: [53, 56, 53] }} transition={{ repeat: Infinity, duration: 0.6, ease: "linear", delay: 0.3 }} />

        {/* Moving Boxes getting sorted */}
        {/* Box 1 */}
        <motion.g animate={{ x: [80, 50, 20, 20], y: [60, 60, 45, 45], opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.4, 0.7, 1] }}>
          <rect x="0" y="0" width="10" height="10" rx="1" stroke={darkGrey} strokeWidth="0.8" fill="#FDFCF8" />
          <text x="2" y="7" fontSize="4" fill={darkGrey} fontFamily="sans-serif" fontWeight="bold">INV</text>
        </motion.g>

        {/* Box 2 */}
        <motion.g animate={{ x: [80, 50, 32, 32], y: [60, 60, 45, 45], opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.4, 0.7, 1], delay: 1.3 }}>
          <rect x="0" y="0" width="10" height="10" rx="1" stroke={darkGrey} strokeWidth="0.8" fill="#FDFCF8" />
          <line x1="2" y1="4" x2="8" y2="4" stroke={gold} strokeWidth="1" />
          <line x1="2" y1="7" x2="6" y2="7" stroke={gold} strokeWidth="1" />
        </motion.g>

        {/* Box 3 */}
        <motion.g animate={{ x: [80, 50, 20, 20], y: [60, 60, 33, 33], opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.4, 0.7, 1], delay: 2.6 }}>
          <rect x="0" y="0" width="10" height="10" rx="1" stroke={gold} strokeWidth="0.8" fill="#FDFCF8" />
          <text x="2" y="7" fontSize="4" fill={gold} fontFamily="sans-serif" fontWeight="bold">OK</text>
        </motion.g>

        {/* Static sorted stack outline in background */}
        <rect x="19" y="44" width="12" height="12" rx="1" stroke={grey} strokeWidth="0.5" strokeDasharray="1 1" />
        <rect x="31" y="44" width="12" height="12" rx="1" stroke={grey} strokeWidth="0.5" strokeDasharray="1 1" />
        <rect x="19" y="32" width="12" height="12" rx="1" stroke={grey} strokeWidth="0.5" strokeDasharray="1 1" />
      </motion.svg>
    );
  }

  if (index === 1) {
    // ----------------------------------------------------------------------
    // SCENARIO 2: DASHBOARD & SWIPE
    // Dashboard window above chip, chip arm swipes left/right to change panels
    // ----------------------------------------------------------------------
    return (
      <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none" initial="hidden" animate="visible" variants={fadeIn}>
        
        {/* Dashboard Window */}
        <rect x="15" y="10" width="70" height="35" rx="3" stroke={darkGrey} strokeWidth="1" fill="#FDFCF8" />
        <line x1="15" y1="16" x2="85" y2="16" stroke={darkGrey} strokeWidth="0.5" />
        <circle cx="19" cy="13" r="1" fill={grey} />
        <circle cx="22" cy="13" r="1" fill={grey} />
        <circle cx="25" cy="13" r="1" fill={grey} />

        {/* Dashboard Content Container (Clipping) */}
        <clipPath id="dash-clip">
          <rect x="16" y="17" width="68" height="27" />
        </clipPath>

        <g clipPath="url(#dash-clip)">
          {/* Panel 1: Bar Charts (Slides left) */}
          <motion.g animate={{ x: [0, 0, -80, -80, 0] }} transition={{ repeat: Infinity, duration: 6, times: [0, 0.3, 0.4, 0.8, 0.9] }}>
            <rect x="25" y="35" width="8" height="0" fill={gold}>
               <animate attributeName="height" values="0;12;10;15;0" dur="6s" repeatCount="indefinite" />
               <animate attributeName="y" values="35;23;25;20;35" dur="6s" repeatCount="indefinite" />
            </rect>
            <rect x="38" y="35" width="8" height="0" fill={darkGrey}>
               <animate attributeName="height" values="0;18;22;20;0" dur="6s" repeatCount="indefinite" />
               <animate attributeName="y" values="35;17;13;15;35" dur="6s" repeatCount="indefinite" />
            </rect>
            <rect x="51" y="35" width="8" height="0" fill={gold} opacity="0.6">
               <animate attributeName="height" values="0;8;12;24;0" dur="6s" repeatCount="indefinite" />
               <animate attributeName="y" values="35;27;23;11;35" dur="6s" repeatCount="indefinite" />
            </rect>
            <rect x="64" y="35" width="8" height="0" fill={darkGrey} opacity="0.5">
               <animate attributeName="height" values="0;22;18;15;0" dur="6s" repeatCount="indefinite" />
               <animate attributeName="y" values="35;13;17;20;35" dur="6s" repeatCount="indefinite" />
            </rect>
          </motion.g>

          {/* Panel 2: Line Graph & Nodes (Slides in from right) */}
          <motion.g animate={{ x: [80, 80, 0, 0, 80] }} transition={{ repeat: Infinity, duration: 6, times: [0, 0.3, 0.4, 0.8, 0.9] }}>
            <polyline points="20,38 35,25 50,30 65,18 80,22" stroke={gold} strokeWidth="1.5" fill="none" />
            <circle cx="35" cy="25" r="2" fill={darkGrey} />
            <circle cx="50" cy="30" r="2" fill={darkGrey} />
            <circle cx="65" cy="18" r="2" fill={gold} />
            
            <line x1="65" y1="18" x2="65" y2="38" stroke={gold} strokeWidth="0.5" strokeDasharray="2 2" />
          </motion.g>
        </g>

        {/* Swiping Arm from Chip */}
        <motion.g animate={{ x: [0, 0, -15, -15, 0] }} transition={{ repeat: Infinity, duration: 6, times: [0, 0.3, 0.4, 0.8, 0.9] }}>
          <path d="M 50 48 Q 50 38 55 35" stroke={gold} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Hand/Cursor */}
          <circle cx="55" cy="35" r="2" fill={darkGrey} />
          <motion.circle cx="55" cy="35" r="4" stroke={gold} strokeWidth="0.5" fill="none" 
            animate={{ scale: [1, 2], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
        </motion.g>

      </motion.svg>
    );
  }

  if (index === 2) {
    // ----------------------------------------------------------------------
    // SCENARIO 3: CONSULTING & OPTIMIZATION
    // Chip works with abstract people, using a magnifying glass to scan
    // ----------------------------------------------------------------------
    return (
      <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none" initial="hidden" animate="visible" variants={fadeIn}>
        
        {/* Abstract People / Team Nodes */}
        <g stroke={darkGrey} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          {/* Person 1 */}
          <circle cx="20" cy="40" r="3" />
          <path d="M 15 50 Q 20 45 25 50" />
          {/* Person 2 */}
          <circle cx="35" cy="30" r="3" />
          <path d="M 30 40 Q 35 35 40 40" />
          {/* Person 3 */}
          <circle cx="70" cy="35" r="3" />
          <path d="M 65 45 Q 70 40 75 45" />
          {/* Person 4 */}
          <circle cx="85" cy="45" r="3" />
          <path d="M 80 55 Q 85 50 90 55" />
        </g>

        {/* Network connections between people and chip */}
        <motion.path d="M 20 40 L 50 50 M 35 30 L 50 50 M 70 35 L 50 50 M 85 45 L 50 50" 
          stroke={grey} strokeWidth="0.5" strokeDasharray="2 2"
          animate={{ strokeDashoffset: [10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />

        {/* Magnifying Glass scanning */}
        <motion.g animate={{ x: [-25, -10, 20, 35, -25], y: [-5, -15, -10, 0, -5] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}>
          {/* Arm holding the glass */}
          <path d="M 50 50 L 45 45" stroke={gold} strokeWidth="1.5" strokeLinecap="round" />
          {/* Glass */}
          <circle cx="42" cy="42" r="7" stroke={gold} strokeWidth="1.5" fill="rgba(184, 154, 10, 0.1)" />
          <line x1="40" y1="44" x2="44" y2="40" stroke={gold} strokeWidth="0.5" />
          
          {/* Scanning beam under glass */}
          <motion.line x1="42" y1="49" x2="42" y2="65" stroke={gold} strokeWidth="0.5" strokeDasharray="1 1"
            animate={{ y2: [65, 80, 65], opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} />
        </motion.g>

        {/* Highlight effect when glass passes over (fake reaction) */}
        <motion.circle cx="20" cy="40" r="4" fill={gold} opacity="0" animate={{ opacity: [0, 0.5, 0] }} transition={{ repeat: Infinity, duration: 8, times: [0, 0.05, 0.15] }} />
        <motion.circle cx="35" cy="30" r="4" fill={gold} opacity="0" animate={{ opacity: [0, 0.5, 0] }} transition={{ repeat: Infinity, duration: 8, times: [0.1, 0.25, 0.35] }} />
        <motion.circle cx="70" cy="35" r="4" fill={gold} opacity="0" animate={{ opacity: [0, 0.5, 0] }} transition={{ repeat: Infinity, duration: 8, times: [0.4, 0.6, 0.7] }} />
        <motion.circle cx="85" cy="45" r="4" fill={gold} opacity="0" animate={{ opacity: [0, 0.5, 0] }} transition={{ repeat: Infinity, duration: 8, times: [0.7, 0.85, 0.95] }} />

      </motion.svg>
    );
  }

  return null;
};
