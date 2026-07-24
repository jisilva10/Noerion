import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChipEye } from './ui/ChipEye';

const FrenaSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: 'Procesos',
      quote: '"Tu equipo hace en 4 horas lo que podría hacerse en 20 minutos."',
      response: 'Mapeamos dónde se pierde el tiempo y construimos los flujos que lo resuelven. Tu equipo deja de operar en modo supervivencia.'
    },
    {
      title: 'Datos',
      quote: '"Tienes datos pero nadie los lee ni los entiende."',
      response: 'Convertimos esa información en dashboards claros y reportes automáticos. Las decisiones se toman con certeza, no con el estómago.'
    },
    {
      title: 'Inteligencia Artificial',
      quote: '"Escuchaste hablar de IA pero no sabes por dónde empezar."',
      response: 'Identificamos dónde la IA genera impacto real en tu operación y la implementamos sin fricción. Sin curvas de aprendizaje eternas.'
    },
    {
      title: 'Competencia',
      quote: '"Tu competencia ya está automatizando. Tú todavía no."',
      response: 'Diagnóstico en menos de una semana. Primeros sistemas funcionando en menos de un mes. Sin compromisos innecesarios.'
    }
  ];

  return (
    <section className="frena" id="diagnostico">
      <div className="frena-header fade-up-scroll">
        <h2 className="reveal-text"><span>Lo que frena a tu empresa.</span></h2>
        <p>Lo identificamos. Lo resolvemos. Lo medimos.</p>
      </div>

      {/* Pill-style Segmented Control */}
      <div className="stagger-parent relative flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar w-full max-w-full" style={{ gap: '8px', paddingTop: '32px', paddingBottom: '6px', paddingLeft: '6px', paddingRight: '6px', borderRadius: '999px', border: 'none', marginBottom: '80px' }}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className="relative outline-none border-none cursor-pointer flex-shrink-0 whitespace-nowrap stagger-item flex items-center justify-center transition-colors duration-300"
              style={{
                height: '44px',
                padding: '0 24px',
                borderRadius: '999px',
                backgroundColor: 'transparent',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--cream)' : 'var(--mid)',
                fontWeight: isActive ? 600 : 500
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicatorFrena"
                  className="absolute inset-0 shadow-md"
                  style={{ backgroundColor: 'var(--dark)', borderRadius: '999px' }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none" style={{ top: '-22px' }}>
                    <ChipEye disableInitialSleep disableEyeAnimation width="28px" height="20px" />
                  </div>
                </motion.div>
              )}
              <span className="relative z-10 block" style={{ color: isActive ? 'var(--cream)' : 'var(--mid)' }}>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content with Absolute Positioning to prevent layout jumps */}
      <div className="relative w-full h-[380px] sm:h-[280px]">
        <AnimatePresence>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 w-full"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '40px',
              alignItems: 'start'
            }}
          >
            <p className="panel-quote text-[28px] font-cormorant leading-tight text-dark m-0 border-l-[1.5px] border-gold pl-6 italic">
              {tabs[activeTab].quote}
            </p>
            <div className="flex flex-col justify-start pt-2">
              <p className="text-gold text-[9px] tracking-[0.35em] uppercase mb-4 m-0">Nuestra respuesta</p>
              <p className="text-mid text-base leading-relaxed m-0">{tabs[activeTab].response}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FrenaSection;
