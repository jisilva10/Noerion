import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Historia } from '../piezas/Historia';
import { Niveles } from '../piezas/Niveles';
import { DiezCosas } from '../piezas/DiezCosas';
import { Calculadora } from '../piezas/Calculadora';

/**
 * Qué hacemos, en un solo lugar (JIS, 29/9/2026: «el simulador, las 10
 * cosas, el malo bueno excelente y el caso real deberían vivir juntos y no
 * depender del scroll»).
 *
 * Cuatro pestañas y un solo escenario: se cambia de pieza sin moverse de
 * sitio. Cada pieza trae su propio fondo; el escenario solo le da el marco.
 */

const PESTAÑAS = [
  { id: 'historia', t: 'Antes y ahora', Pieza: Historia },
  { id: 'niveles', t: 'Tu nivel', Pieza: Niveles },
  { id: 'diez', t: 'Qué automatizar', Pieza: DiezCosas },
  { id: 'cuenta', t: 'Haz la cuenta', Pieza: Calculadora },
] as const;

export function Explora() {
  const [actual, setActual] = useState(0);
  const { id, Pieza } = PESTAÑAS[actual];

  return (
    <section className="explora" id="servicios">
      <div className="envoltura">
        <div className="cabecera centrada">
          <h2 className="titular">
            Así se ve <em>en tu negocio.</em>
          </h2>
        </div>

        <div className="pestañas" role="tablist" aria-label="Qué quieres ver">
          {PESTAÑAS.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              id={`pestaña-${p.id}`}
              aria-selected={i === actual}
              aria-controls="escenario"
              className={i === actual ? 'activo' : ''}
              onClick={(e) => {
                setActual(i);
                // En el celular las pestañas se deslizan: la elegida se centra.
                e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
              }}
            >
              {i === actual && (
                <motion.span
                  layoutId="pestaña-activa"
                  className="pestaña-fondo"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="pestaña-txt">{p.t}</span>
            </button>
          ))}
        </div>

        <div
          className={`escenario escenario-${id}`}
          id="escenario"
          role="tabpanel"
          aria-labelledby={`pestaña-${id}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={id}
              className="escenario-pieza"
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            >
              <Pieza />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
