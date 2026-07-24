import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Users, Activity, Target, Search } from "lucide-react";
import { ChipEye } from "../ui/ChipEye";

interface ServiceAnimationProps {
  index: number;
  isMobile: boolean;
}

export const ServiceAnimation: React.FC<ServiceAnimationProps> = ({ index, isMobile }) => {
  // Shared animation container variants (0.8s delay to wait for chip landing)
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.8, staggerChildren: 0.2 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4 } }
  };

  const chipId = isMobile ? `chip-mobile-${index}` : `chip-desktop-${index}`;
  const chipSize = isMobile ? 100 : 120;

  if (index === 0) {
    // ----------------------------------------------------------------------
    // SCENARIO 1: AUTOMATIZACIÓN (The Organizer)
    // ----------------------------------------------------------------------
    return (
      <motion.div 
        className="absolute inset-0 w-full h-full p-8 flex items-end justify-around flex-wrap pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* We create floating task cards that "snap" into order */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`task-${i}`}
            className="w-[120px] bg-white rounded-xl shadow-lg border border-border p-3 flex flex-col gap-2 relative overflow-hidden"
            variants={itemVariants}
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, i % 2 === 0 ? 1 : -1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3 + i, 
              ease: "easeInOut",
              delay: i * 0.2
            }}
          >
            <div className="w-6 h-6 rounded bg-[#FDFCF8] flex items-center justify-center text-[#B89A0A] mb-1">
              <CheckCircle2 size={14} />
            </div>
            <div className="h-1.5 w-full bg-stone-100 rounded-full" />
            <div className="h-1.5 w-2/3 bg-stone-100 rounded-full" />
          </motion.div>
        ))}

        {/* The Character Chip */}
        <motion.div
          layoutId={chipId}
          className="absolute left-1/2 top-1/2 z-50 flex items-center justify-center"
          style={{ 
            width: chipSize, height: chipSize, 
            marginLeft: -chipSize / 2, marginTop: -chipSize / 2 
          }}
          transition={{ duration: 1.5, type: "tween", ease: "easeInOut" }}
        >
          <motion.div
            animate={{ 
              x: [0, -120, 120, 0], // Patrolling left and right
              y: [0, -60, -60, 0], // Floating up to oversee
              rotate: [0, -10, 10, 0] // Looking around
            }}
            transition={{ delay: 2, duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChipEye width={`${chipSize}px`} height={`${chipSize}px`} disableMouseFollow={true} wakeDelay={1500} />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  if (index === 1) {
    // ----------------------------------------------------------------------
    // SCENARIO 2: ECOSISTEMA IA (The Analyst)
    // ----------------------------------------------------------------------
    return (
      <motion.div 
        className="absolute inset-0 w-full h-full p-8 flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Dashboard Card */}
        <motion.div 
          className="w-full h-full max-w-[600px] max-h-[350px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 p-6 flex flex-col gap-6"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center border-b border-stone-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FDFCF8] flex items-center justify-center text-[#B89A0A]">
                <Activity size={20} />
              </div>
              <div>
                <div className="h-3 w-24 bg-stone-200 rounded-full mb-2" />
                <div className="h-2 w-16 bg-stone-100 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-6">
            <div className="flex-1 flex items-end justify-between gap-2 h-full pb-2">
              {[40, 70, 45, 90, 60, 100].map((h, i) => (
                <motion.div 
                  key={`bar-${i}`}
                  className={`w-full rounded-t-sm ${i % 2 === 0 ? 'bg-[#B89A0A]' : 'bg-[#A39F93]'}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ 
                    duration: 1.5, delay: 1.5 + i * 0.1, type: "spring", bounce: 0.4,
                    repeat: Infinity, repeatType: "reverse", repeatDelay: 2
                  }}
                />
              ))}
            </div>
            <div className="w-1/3 flex flex-col gap-4 pt-4">
              <motion.div className="bg-[#FDFCF8] p-3 rounded-xl border border-border" variants={itemVariants}>
                <TrendingUp size={20} className="text-[#B89A0A] mb-1" />
                <div className="text-xl font-bold text-stone-800">+124%</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* The Character Chip */}
        <motion.div
          layoutId={chipId}
          className="absolute left-1/2 top-1/2 z-50 flex items-center justify-center"
          style={{ 
            width: chipSize, height: chipSize, 
            marginLeft: -chipSize / 2, marginTop: -chipSize / 2 
          }}
          transition={{ duration: 1.5, type: "tween", ease: "easeInOut" }}
        >
          <motion.div
            animate={{ 
              x: [0, 160, 160, 0], // Move to top right corner
              y: [0, -80, -80, 0],
              scale: [1, 0.7, 0.7, 1] // Shrink a bit to look like a floating assistant widget
            }}
            transition={{ delay: 2, duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Pulse rings emitted by the chip while analyzing */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-[#B89A0A]"
              animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
              transition={{ delay: 3, duration: 2, repeat: Infinity }}
            />
            <ChipEye width={`${chipSize}px`} height={`${chipSize}px`} disableMouseFollow={true} wakeDelay={1500} />
          </motion.div>
        </motion.div>

      </motion.div>
    );
  }

  if (index === 2) {
    // ----------------------------------------------------------------------
    // SCENARIO 3: CONSULTORÍA (The Investigator)
    // ----------------------------------------------------------------------
    return (
      <motion.div 
        className="absolute inset-0 w-full h-full p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative w-full h-full z-10">
          {/* Top Left User */}
          <motion.div className="absolute top-[20%] left-[20%] bg-white p-4 rounded-full shadow-lg border border-border z-10" variants={itemVariants} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
            <Users size={32} className="text-[#A39F93]" />
            <motion.div 
              className="absolute -top-4 -right-8 bg-[#B89A0A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1, 0] }} transition={{ delay: 3, duration: 4, repeat: Infinity }}
            >
              Eficiente
            </motion.div>
          </motion.div>

          {/* Bottom Right User */}
          <motion.div className="absolute bottom-[20%] right-[20%] bg-white p-4 rounded-full shadow-lg border border-border z-10" variants={itemVariants} animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
            <Target size={32} className="text-[#B89A0A]" />
            <motion.div 
              className="absolute -bottom-4 -left-12 bg-stone-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1], opacity: [0, 0, 1, 1, 0] }} transition={{ delay: 3, duration: 4, repeat: Infinity }}
            >
              Optimizado
            </motion.div>
          </motion.div>
        </div>

        {/* The Character Chip */}
        <motion.div
          layoutId={chipId}
          className="absolute left-1/2 top-1/2 z-50 flex items-center justify-center"
          style={{ 
            width: chipSize, height: chipSize, 
            marginLeft: -chipSize / 2, marginTop: -chipSize / 2 
          }}
          transition={{ duration: 1.5, type: "tween", ease: "easeInOut" }}
        >
          <motion.div
            animate={{ 
              x: [0, -120, 120, 0], // Float to top-left user, then bottom-right user
              y: [0, -80, 80, 0],
              rotate: [0, -15, 15, 0]
            }}
            transition={{ delay: 2, duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <ChipEye width={`${chipSize}px`} height={`${chipSize}px`} disableMouseFollow={true} wakeDelay={1500} />
            
            {/* Magnifying Glass held by the chip! */}
            <motion.div
              className="absolute -right-4 -bottom-4 text-[#B89A0A] bg-white rounded-full p-2 shadow-lg border border-border"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 2.5, type: "spring", bounce: 0.5 }}
            >
              <Search size={24} strokeWidth={3} />
            </motion.div>
          </motion.div>
        </motion.div>

      </motion.div>
    );
  }

  return null;
};
