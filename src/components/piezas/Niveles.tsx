import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconBrandWhatsapp, IconChevronDown } from '@tabler/icons-react';
import { ESCALERAS, NOMBRE_APARATO, whatsapp } from '../../datos';

/**
 * Tu nivel: la escalera del video 35, malo, bueno y excelente. Eliges tu
 * negocio y los tres escalones se dan la vuelta como las paletas de un
 * aeropuerto: se ve, sin leer, que la escalera es la misma en cualquiera.
 *
 * El negocio no se elige con pastillas, para no repetir las pestañas de
 * arriba (JIS, 29/9/2026): en escritorio es una lista vertical a la
 * izquierda, con una línea de oro que se desliza; en el celular, una frase
 * con el selector del propio teléfono: «Tengo una tienda».
 */

const NIVELES = [
  { k: 'malo', t: 'Malo' },
  { k: 'bueno', t: 'Bueno' },
  { k: 'excelente', t: 'Excelente' },
] as const;

export function Niveles() {
  const [i, setI] = useState(0);
  const e = ESCALERAS[i];

  return (
    <div className="niveles">
      <h3 className="modulo-titular">
        ¿Tu inventario es malo, bueno <em>o excelente?</em>
      </h3>

      <div className="niveles-cuerpo">
        <div
          className="negocios-lista"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Tu negocio"
        >
          <span className="negocios-rotulo">Tu negocio</span>
          {ESCALERAS.map((x, k) => (
            <button
              key={x.negocio}
              role="tab"
              aria-selected={k === i}
              className={k === i ? 'activo' : ''}
              onClick={() => setI(k)}
            >
              {k === i && (
                <motion.span
                  layoutId="negocio-marca"
                  className="negocio-marca"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              {x.negocio}
            </button>
          ))}
        </div>

        <label className="negocio-frase">
          <span>Tengo</span>
          <span className="negocio-select">
            <select value={i} onChange={(ev) => setI(+ev.target.value)} aria-label="Tu negocio">
              {ESCALERAS.map((x, k) => (
                <option key={x.negocio} value={k}>
                  {x.quien}
                </option>
              ))}
            </select>
            <IconChevronDown size={18} stroke={1.8} aria-hidden="true" />
          </span>
        </label>

        <div className="niveles-escalera">
          <div className="peldaños" role="tabpanel" aria-live="polite">
            {NIVELES.map((n, k) => (
              <div key={n.k} className={`peldaño peldaño-${n.k}`} style={{ ['--k' as string]: k }}>
                <span className="peldaño-nivel">
                  <i />
                  {n.t}
                </span>
                <div className="paleta">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.p
                      key={e.negocio + n.k}
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: 90, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 24, delay: k * 0.07 }}
                    >
                      {e[n.k]}
                    </motion.p>
                  </AnimatePresence>
                </div>
                {n.k === 'excelente' && (
                  <span className={`insignia insignia-${e.aparato}`}>
                    <i />
                    {NOMBRE_APARATO[e.aparato]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Abajo a la derecha del cuadro, con aire (JIS, 29/9/2026) */}
      <div className="escalera-cta">
        <a
          className="boton boton-tinta"
          href={whatsapp(
            `Hola, tengo ${e.quien} y quiero que mi inventario llegue al excelente. ¿Cómo lo hacemos?`
          )}
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandWhatsapp size={20} stroke={1.6} />
          Quiero llegar al excelente
        </a>
      </div>
    </div>
  );
}
