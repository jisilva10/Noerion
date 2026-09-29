import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PREGUNTAS } from '../../datos';

/**
 * Las seis preguntas que le hacen a JIS antes de contratar, contestadas.
 * Se abre una a la vez; la primera viene abierta.
 */
export function Preguntas() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section className="preguntas" id="preguntas">
      <div className="envoltura preguntas-dentro">
        <div className="cabecera">
          <h2 className="titular">
            Lo que nos preguntan
            <br />
            <em>siempre.</em>
          </h2>
        </div>

        <div className="acordeon">
          {PREGUNTAS.map((q, i) => {
            const abre = abierta === i;
            return (
              <div key={q.p} className={`pregunta ${abre ? 'abierta' : ''}`}>
                <h3>
                  <button
                    aria-expanded={abre}
                    aria-controls={`r-${i}`}
                    id={`p-${i}`}
                    onClick={() => setAbierta(abre ? null : i)}
                  >
                    <span>{q.p}</span>
                    <span className="mas" aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {abre && (
                    <motion.div
                      id={`r-${i}`}
                      role="region"
                      aria-labelledby={`p-${i}`}
                      className="respuesta"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                    >
                      <p>{q.r}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
