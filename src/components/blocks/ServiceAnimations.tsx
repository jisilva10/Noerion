import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, BarChart3, TrendingUp, Users, Activity, Target } from "lucide-react";

interface ServiceAnimationProps {
  index: number;
}

export const ServiceAnimation: React.FC<ServiceAnimationProps> = ({ index }) => {
  // Shared animation container variants (0.8s delay to wait for chip landing)
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.8, staggerChildren: 0.2 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4 } }
  };

  if (index === 0) {
    // ----------------------------------------------------------------------
    // SCENARIO 1: AUTOMATIZACIÓN (Task Cards sorting themselves)
    // ----------------------------------------------------------------------
    return (
      <motion.div 
        className="absolute inset-0 w-full h-full p-8 flex items-center justify-around flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* We create floating task cards that "snap" into order */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`task-${i}`}
            className="w-[140px] bg-white rounded-xl shadow-lg border border-border p-4 flex flex-col gap-3 relative overflow-hidden"
            variants={itemVariants}
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, i % 2 === 0 ? 2 : -2, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3 + i, 
              ease: "easeInOut",
              delay: i * 0.2
            }}
          >
            {/* Fake skeleton UI inside the card */}
            <div className="w-8 h-8 rounded bg-[#FDFCF8] flex items-center justify-center text-[#B89A0A] mb-1">
              <CheckCircle2 size={18} />
            </div>
            <div className="h-2 w-full bg-stone-100 rounded-full" />
            <div className="h-2 w-2/3 bg-stone-100 rounded-full" />
            
            {/* Animated scanning line passing over the card */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-[2px] bg-[#B89A0A]"
              animate={{ y: [0, 100, 0], opacity: [0, 0.8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (index === 1) {
    // ----------------------------------------------------------------------
    // SCENARIO 2: ECOSISTEMA IA (Glassmorphic Dashboard)
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
          {/* Header */}
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
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-stone-200" />
              <div className="w-3 h-3 rounded-full bg-stone-200" />
            </div>
          </div>

          {/* Body: Charts */}
          <div className="flex-1 flex gap-6">
            {/* Bar Chart Area */}
            <div className="flex-1 flex items-end justify-between gap-2 h-full pb-2">
              {[40, 70, 45, 90, 60, 100].map((h, i) => (
                <motion.div 
                  key={`bar-${i}`}
                  className={`w-full rounded-t-sm ${i % 2 === 0 ? 'bg-[#B89A0A]' : 'bg-[#A39F93]'}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 1.2 + i * 0.1, 
                    type: "spring", 
                    bounce: 0.4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 2
                  }}
                />
              ))}
            </div>

            {/* Side stats */}
            <div className="w-1/3 flex flex-col gap-4">
              <motion.div className="bg-[#FDFCF8] p-4 rounded-xl border border-border" variants={itemVariants}>
                <TrendingUp size={24} className="text-[#B89A0A] mb-2" />
                <div className="text-2xl font-bold text-stone-800">+124%</div>
                <div className="text-xs text-stone-500">Rendimiento</div>
              </motion.div>
              <motion.div className="bg-[#FDFCF8] p-4 rounded-xl border border-border" variants={itemVariants}>
                <BarChart3 size={24} className="text-[#A39F93] mb-2" />
                <div className="text-2xl font-bold text-stone-800">8.4k</div>
                <div className="text-xs text-stone-500">Procesos</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (index === 2) {
    // ----------------------------------------------------------------------
    // SCENARIO 3: CONSULTORÍA (Network & Metrics)
    // ----------------------------------------------------------------------
    return (
      <motion.div 
        className="absolute inset-0 w-full h-full p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* SVG background for connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <motion.path 
            d="M 25% 30% L 50% 50% M 75% 30% L 50% 50% M 20% 70% L 50% 50% M 80% 70% L 50% 50%" 
            stroke="#B89A0A" 
            strokeWidth="2" 
            strokeDasharray="6 6"
            strokeLinecap="round"
            opacity="0.3"
            animate={{ strokeDashoffset: [24, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </svg>

        {/* Floating User / Metric Nodes */}
        <div className="relative w-full h-full z-10">
          {/* Top Left */}
          <motion.div className="absolute top-[15%] left-[15%] bg-white p-3 rounded-full shadow-lg border border-border" variants={itemVariants} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 0 }}>
            <Users size={24} className="text-[#A39F93]" />
            <motion.div 
              className="absolute -top-3 -right-6 bg-[#B89A0A] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md"
              initial={{ scale: 0 }} animate={{ scale: [0, 1.1, 1] }} transition={{ delay: 2, duration: 0.5 }}
            >
              Eficiente
            </motion.div>
          </motion.div>

          {/* Top Right */}
          <motion.div className="absolute top-[20%] right-[15%] bg-white p-3 rounded-full shadow-lg border border-border" variants={itemVariants} animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5, delay: 1 }}>
            <Target size={24} className="text-[#B89A0A]" />
            <motion.div 
              className="absolute -bottom-3 -left-8 bg-stone-800 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md"
              initial={{ scale: 0 }} animate={{ scale: [0, 1.1, 1] }} transition={{ delay: 2.5, duration: 0.5 }}
            >
              Optimizado
            </motion.div>
          </motion.div>

          {/* Bottom Left */}
          <motion.div className="absolute bottom-[20%] left-[10%] bg-white p-4 rounded-xl shadow-lg border border-border flex items-center gap-3" variants={itemVariants} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 0.5 }}>
            <div className="w-8 h-8 rounded-full bg-[#FDFCF8] flex items-center justify-center">
              <TrendingUp size={16} className="text-[#B89A0A]" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-800">+45% ROI</div>
              <div className="text-[10px] text-stone-500">Crecimiento</div>
            </div>
          </motion.div>

          {/* Bottom Right */}
          <motion.div className="absolute bottom-[25%] right-[10%] bg-white p-3 rounded-full shadow-lg border border-border" variants={itemVariants} animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 5.5, delay: 1.5 }}>
            <Activity size={24} className="text-[#A39F93]" />
          </motion.div>

          {/* Scanning Radar Ring rotating around center */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -mt-[150px] -ml-[150px] rounded-full border-t-2 border-[#B89A0A] opacity-20 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />
        </div>
      </motion.div>
    );
  }

  return null;
};
