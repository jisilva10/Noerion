import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, GitMerge, FileText, Database, Network, BrainCircuit, Cpu, Zap, LayoutDashboard, Settings, LineChart } from "lucide-react";

interface ServiceAnimationProps {
  index: number;
  isMobile: boolean;
}

export const ServiceAnimation: React.FC<ServiceAnimationProps> = ({ index }) => {
  // Shared animation container variants (delay matches chip flight)
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
    // SCENARIO 1: AUTOMATIZACIÓN (The Kanban / Pipeline)
    // ----------------------------------------------------------------------
    return (
      <motion.div 
        className="absolute inset-0 w-full h-full p-8 flex items-start justify-center pt-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex gap-4 w-full max-w-[600px] h-[220px]">
          {/* Column 1: Input */}
          <motion.div className="flex-1 bg-white/50 backdrop-blur-sm rounded-xl border border-white p-3 flex flex-col gap-3 shadow-lg" variants={itemVariants}>
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Entrada</div>
            {[...Array(2)].map((_, i) => (
              <motion.div key={`in-${i}`} className="bg-white p-2 rounded shadow-sm border border-border flex items-center gap-2" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}>
                <FileText size={16} className="text-[#A39F93]" />
                <div className="h-1.5 w-16 bg-stone-200 rounded-full" />
              </motion.div>
            ))}
          </motion.div>

          {/* Arrow / Processor */}
          <motion.div className="w-12 flex flex-col items-center justify-center gap-2" variants={itemVariants}>
            <div className="w-1 h-12 bg-gradient-to-b from-stone-200 to-[#B89A0A] rounded-full" />
            <Settings size={24} className="text-[#B89A0A]" />
            <div className="w-1 h-12 bg-gradient-to-b from-[#B89A0A] to-stone-200 rounded-full" />
          </motion.div>

          {/* Column 2: Output (Automated) */}
          <motion.div className="flex-1 bg-[#FDFCF8]/80 backdrop-blur-sm rounded-xl border border-[#B89A0A]/30 p-3 flex flex-col gap-3 shadow-lg" variants={itemVariants}>
            <div className="text-xs font-bold text-[#B89A0A] uppercase tracking-wider mb-2">Automatizado</div>
            {[...Array(3)].map((_, i) => (
              <motion.div key={`out-${i}`} className="bg-white p-2 rounded shadow-sm border border-[#B89A0A]/40 flex items-center gap-2" animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}>
                <CheckCircle2 size={16} className="text-[#B89A0A]" />
                <div className="h-1.5 w-16 bg-stone-200 rounded-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (index === 1) {
    // ----------------------------------------------------------------------
    // SCENARIO 2: ECOSISTEMA IA (Neural Network)
    // ----------------------------------------------------------------------
    return (
      <motion.div 
        className="absolute inset-0 w-full h-full p-8 flex items-start justify-end pt-12 pr-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative w-[400px] h-[250px]">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <motion.path 
              d="M 50 150 L 200 100 M 50 150 L 150 220 M 200 100 L 350 80 M 200 100 L 300 200 M 150 220 L 300 200" 
              stroke="#B89A0A" 
              strokeWidth="2" 
              strokeDasharray="8 8"
              opacity="0.3"
              animate={{ strokeDashoffset: [32, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </svg>

          {/* Nodes */}
          <motion.div className="absolute top-[120px] left-[30px] bg-white p-3 rounded-xl shadow-lg border border-border z-10 flex items-center justify-center" variants={itemVariants} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
            <Database size={24} className="text-[#A39F93]" />
          </motion.div>

          <motion.div className="absolute top-[80px] left-[180px] bg-stone-800 p-4 rounded-xl shadow-2xl border border-border z-10 flex flex-col items-center justify-center" variants={itemVariants} animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
            <BrainCircuit size={32} className="text-[#B89A0A]" />
            <div className="text-[10px] text-white mt-1 font-bold">NÚCLEO IA</div>
          </motion.div>

          <motion.div className="absolute top-[200px] left-[130px] bg-white p-3 rounded-xl shadow-lg border border-border z-10 flex items-center justify-center" variants={itemVariants} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
            <Cpu size={24} className="text-[#A39F93]" />
          </motion.div>

          <motion.div className="absolute top-[60px] left-[330px] bg-white p-3 rounded-xl shadow-lg border border-border z-10 flex items-center justify-center" variants={itemVariants} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4.5 }}>
            <Network size={24} className="text-[#A39F93]" />
          </motion.div>

          <motion.div className="absolute top-[180px] left-[280px] bg-white p-3 rounded-xl shadow-lg border border-border z-10 flex items-center justify-center" variants={itemVariants} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}>
            <Zap size={24} className="text-[#B89A0A]" />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (index === 2) {
    // ----------------------------------------------------------------------
    // SCENARIO 3: CONSULTORÍA (The Blueprint / Process Map)
    // ----------------------------------------------------------------------
    return (
      <motion.div 
        className="absolute inset-0 w-full h-full p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full h-full bg-[#0F172A] rounded-2xl p-6 relative overflow-hidden shadow-inner border border-stone-800">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#B89A0A 1px, transparent 1px), linear-gradient(90deg, #B89A0A 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="text-white/50 text-xs font-mono tracking-widest absolute top-4 left-4 z-10">SYSTEM_BLUEPRINT_V2.0</div>
          
          <div className="relative z-10 w-full h-[200px] mt-6 flex justify-between items-center px-12">
            
            <motion.div className="flex flex-col items-center gap-2" variants={itemVariants}>
              <div className="w-16 h-16 rounded border-2 border-blue-400/30 flex items-center justify-center bg-blue-900/20">
                <LayoutDashboard size={24} className="text-blue-400" />
              </div>
              <div className="text-[10px] text-blue-400 font-mono">ESTADO ACTUAL</div>
            </motion.div>

            <svg className="w-[100px] h-[40px] opacity-50">
              <motion.path d="M 0 20 L 100 20" stroke="#60A5FA" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [20, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
              <polygon points="100,20 90,15 90,25" fill="#60A5FA" />
            </svg>

            <motion.div className="flex flex-col items-center gap-2" variants={itemVariants}>
              <div className="w-20 h-20 rounded border-2 border-[#B89A0A]/50 flex items-center justify-center bg-[#B89A0A]/10 shadow-[0_0_15px_rgba(184,154,10,0.2)]">
                <GitMerge size={32} className="text-[#B89A0A]" />
              </div>
              <div className="text-[10px] text-[#B89A0A] font-mono font-bold">OPTIMIZACIÓN KAYRON</div>
            </motion.div>

            <svg className="w-[100px] h-[40px] opacity-80">
              <motion.path d="M 0 20 L 100 20" stroke="#B89A0A" strokeWidth="2" strokeDasharray="4 4" animate={{ strokeDashoffset: [20, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
              <polygon points="100,20 90,15 90,25" fill="#B89A0A" />
            </svg>

            <motion.div className="flex flex-col items-center gap-2" variants={itemVariants}>
              <div className="w-16 h-16 rounded border-2 border-emerald-400/30 flex items-center justify-center bg-emerald-900/20">
                <LineChart size={24} className="text-emerald-400" />
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">RESULTADO</div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};
