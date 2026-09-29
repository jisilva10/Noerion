import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PASOS } from '../../datos';

/** Cómo trabajamos: cuatro pasos, y la línea de oro que los va uniendo. */
export function Proceso() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const avance = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="proceso" id="proceso">
      <div className="envoltura">
        <div className="cabecera centrada">
          <h2 className="titular">
            De la primera conversación
            <br />
            <em>a que funcione solo.</em>
          </h2>
        </div>

        <ol className="pasos" ref={ref}>
          <div className="pasos-riel" aria-hidden="true">
            {/* El avance va en una variable: en escritorio la línea crece a lo
                ancho y en el celular hacia abajo, y eso lo decide el CSS. */}
            <motion.div className="pasos-oro" style={{ ['--a' as string]: avance }} />
          </div>
          {PASOS.map((p, i) => (
            <motion.li
              key={p.t}
              className="paso"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: i * 0.08 }}
            >
              <span className="paso-nodo" />
              <span className="paso-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
