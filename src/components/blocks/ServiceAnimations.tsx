import React from "react";
import { motion } from "framer-motion";

interface ServiceAnimationProps {
  index: number;
}

export const ServiceAnimation: React.FC<ServiceAnimationProps> = ({ index }) => {
  const gold = "#B89A0A";
  const grey = "#e5e5e5"; // Light grey for subtle lines
  const darkGrey = "#A39F93";

  // Shared animation config for drawing lines
  const drawLine: any = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 0.3 + i * 0.15;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.1 }
        }
      };
    }
  };

  const drawNode: any = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 0.8 + i * 0.15;
      return {
        scale: 1,
        opacity: 1,
        transition: {
          delay, type: "spring", duration: 0.6, bounce: 0.4
        }
      };
    }
  };

  if (index === 0) {
    // Automatización Operativa: Process flows, branching lines, nodes
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none">
        {/* Horizontal main axis */}
        <motion.line x1="0" y1="50" x2="35" y2="50" stroke={grey} strokeWidth="0.5" variants={drawLine} custom={0} initial="hidden" animate="visible" />
        <motion.line x1="65" y1="50" x2="100" y2="50" stroke={grey} strokeWidth="0.5" variants={drawLine} custom={1} initial="hidden" animate="visible" />
        
        {/* Branch top left */}
        <motion.path d="M 35 50 L 35 25 L 20 25" stroke={gold} strokeWidth="0.5" variants={drawLine} custom={2} initial="hidden" animate="visible" />
        <motion.circle cx="20" cy="25" r="1.5" fill={gold} variants={drawNode} custom={2} initial="hidden" animate="visible" />
        
        {/* Branch bottom right */}
        <motion.path d="M 65 50 L 65 75 L 80 75" stroke={gold} strokeWidth="0.5" variants={drawLine} custom={3} initial="hidden" animate="visible" />
        <motion.circle cx="80" cy="75" r="1.5" fill={gold} variants={drawNode} custom={3} initial="hidden" animate="visible" />

        {/* Small decorative nodes */}
        <motion.circle cx="10" cy="50" r="1" fill={darkGrey} variants={drawNode} custom={4} initial="hidden" animate="visible" />
        <motion.circle cx="90" cy="50" r="1" fill={darkGrey} variants={drawNode} custom={5} initial="hidden" animate="visible" />
        
        {/* Moving data packets (looping) */}
        <motion.circle cx="0" cy="50" r="0.8" fill={gold} 
          animate={{ cx: [0, 35], opacity: [0, 1, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }} 
        />
        <motion.circle cx="65" cy="50" r="0.8" fill={gold} 
          animate={{ cx: [65, 100], opacity: [0, 1, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 2 }} 
        />
      </svg>
    );
  }

  if (index === 1) {
    // Ecosistemas de IA: Neural network / Constellation
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none">
        {/* Connections to center chip */}
        <motion.line x1="50" y1="50" x2="30" y2="20" stroke={grey} strokeWidth="0.5" variants={drawLine} custom={0} initial="hidden" animate="visible" />
        <motion.line x1="50" y1="50" x2="70" y2="20" stroke={gold} strokeWidth="0.5" variants={drawLine} custom={1} initial="hidden" animate="visible" />
        <motion.line x1="50" y1="50" x2="20" y2="60" stroke={gold} strokeWidth="0.5" variants={drawLine} custom={2} initial="hidden" animate="visible" />
        <motion.line x1="50" y1="50" x2="75" y2="70" stroke={grey} strokeWidth="0.5" variants={drawLine} custom={3} initial="hidden" animate="visible" />
        <motion.line x1="50" y1="50" x2="50" y2="85" stroke={gold} strokeWidth="0.5" variants={drawLine} custom={4} initial="hidden" animate="visible" />

        {/* Nodes */}
        <motion.circle cx="30" cy="20" r="1.5" fill={darkGrey} variants={drawNode} custom={0} initial="hidden" animate="visible" />
        <motion.circle cx="70" cy="20" r="2" fill={gold} variants={drawNode} custom={1} initial="hidden" animate="visible" />
        <motion.circle cx="20" cy="60" r="1.5" fill={gold} variants={drawNode} custom={2} initial="hidden" animate="visible" />
        <motion.circle cx="75" cy="70" r="1.5" fill={darkGrey} variants={drawNode} custom={3} initial="hidden" animate="visible" />
        <motion.circle cx="50" cy="85" r="2" fill={gold} variants={drawNode} custom={4} initial="hidden" animate="visible" />

        {/* Interconnections */}
        <motion.line x1="30" y1="20" x2="70" y2="20" stroke={grey} strokeWidth="0.2" strokeDasharray="1 1" variants={drawLine} custom={5} initial="hidden" animate="visible" />
        <motion.line x1="20" y1="60" x2="30" y2="20" stroke={grey} strokeWidth="0.2" strokeDasharray="1 1" variants={drawLine} custom={6} initial="hidden" animate="visible" />
        <motion.line x1="70" y1="20" x2="75" y2="70" stroke={grey} strokeWidth="0.2" strokeDasharray="1 1" variants={drawLine} custom={7} initial="hidden" animate="visible" />

        {/* Pulsing signals on lines */}
        <motion.circle cx="50" cy="50" r="1" fill={gold} 
          animate={{ x: [0, 20], y: [0, -30], opacity: [0, 1, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
        />
        <motion.circle cx="50" cy="50" r="1" fill={gold} 
          animate={{ x: [0, -30], y: [0, 10], opacity: [0, 1, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} 
        />
      </svg>
    );
  }

  if (index === 2) {
    // Consultoría y Optimización: Scanning rings / Target / Metrics
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none">
        {/* Concentric rings */}
        <motion.circle cx="50" cy="50" r="20" stroke={grey} strokeWidth="0.5" strokeDasharray="2 2" variants={drawLine} custom={0} initial="hidden" animate="visible" />
        <motion.circle cx="50" cy="50" r="35" stroke={grey} strokeWidth="0.5" variants={drawLine} custom={1} initial="hidden" animate="visible" />
        
        {/* Target axis lines */}
        <motion.line x1="50" y1="5" x2="50" y2="15" stroke={gold} strokeWidth="1" variants={drawLine} custom={2} initial="hidden" animate="visible" />
        <motion.line x1="50" y1="85" x2="50" y2="95" stroke={gold} strokeWidth="1" variants={drawLine} custom={2} initial="hidden" animate="visible" />
        <motion.line x1="5" y1="50" x2="15" y2="50" stroke={gold} strokeWidth="1" variants={drawLine} custom={2} initial="hidden" animate="visible" />
        <motion.line x1="85" y1="50" x2="95" y2="50" stroke={gold} strokeWidth="1" variants={drawLine} custom={2} initial="hidden" animate="visible" />

        {/* Analytical charts forming in background */}
        <motion.rect x="30" y="60" width="4" height="0" fill={gold} opacity="0.3" 
          animate={{ height: 15, y: 45 }} transition={{ delay: 1, duration: 1 }} />
        <motion.rect x="38" y="60" width="4" height="0" fill={gold} opacity="0.5" 
          animate={{ height: 25, y: 35 }} transition={{ delay: 1.2, duration: 1 }} />
        <motion.rect x="46" y="60" width="4" height="0" fill={gold} opacity="0.7" 
          animate={{ height: 20, y: 40 }} transition={{ delay: 1.4, duration: 1 }} />
        
        {/* Scanning line rotating */}
        <motion.line x1="50" y1="50" x2="50" y2="15" stroke={gold} strokeWidth="0.5" opacity="0.5"
          style={{ transformOrigin: "50px 50px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    );
  }

  return null;
};
