import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconBrandWhatsapp, IconPlus, IconX } from '@tabler/icons-react';
import { CONSULTORIA, SISTEMAS, type IdSistema } from '../../datos';
import { DibujoContenido, DibujoInventario, DibujoMensajes, DibujoOtra } from '../piezas/Dibujos';

const DIBUJOS: Record<IdSistema, (p: { activo: boolean }) => React.JSX.Element> = {
  inventario: DibujoInventario,
  asistente: DibujoMensajes,
  contenido: DibujoContenido,
};

/** Lo que muestra la ventana: uno de los tres sistemas o la consultoría. */
type Ficha = {
  id: IdSistema | 'otra';
  n: string;
  corto: string;
  linea: string;
  pasos: { t: string; d: string }[];
  wa: string;
};
const OTRA: Ficha = { id: 'otra', ...CONSULTORIA };

const conCursor = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Los tres sistemas como una galería (JIS, 18/11/2026). El panel que tocas
 * (o al que llega el cursor) se abre; si lo vuelves a tocar, en cualquier
 * parte, se abre una ventana con cómo funciona y «Quiero este», sin cambiar
 * de página. El cuarto, más angosto, es la consultoría.
 */
export function Sistemas() {
  const [abierto, setAbierto] = useState(0);
  const [ficha, setFicha] = useState<Ficha | null>(null);
  const cerrar = useCallback(() => setFicha(null), []);

  return (
    <section className="sistemas-sec" id="sistemas">
      <div className="envoltura sistemas-dentro">
        <h2 className="sistemas-titulo">Toca el que te sirve.</h2>

        <div className="galeria">
          {SISTEMAS.map((s, i) => {
            const Dibujo = DIBUJOS[s.id];
            const on = abierto === i;
            return (
              <button
                type="button"
                key={s.id}
                className={`panel panel-${s.id} ${on ? 'abierto' : ''}`}
                aria-expanded={on}
                aria-label={on ? `${s.corto}: ver cómo funciona` : s.corto}
                onMouseEnter={() => conCursor() && setAbierto(i)}
                onClick={() => (on ? setFicha(s) : setAbierto(i))}
              >
                <span className="panel-mas-icono" aria-hidden="true">
                  <IconPlus size={18} stroke={1.6} />
                </span>
                <Dibujo activo={on} />
                <span className="panel-pie">
                  <span className="panel-n">{s.n}</span>
                  <span className="panel-nombre">{s.corto}</span>
                  <span className="panel-linea">{s.linea}</span>
                </span>
              </button>
            );
          })}

          <button type="button" className="panel panel-otra" onClick={() => setFicha(OTRA)}>
            <span className="panel-mas-icono" aria-hidden="true">
              <IconPlus size={18} stroke={1.6} />
            </span>
            <DibujoOtra />
            <span className="panel-pie">
              <span className="panel-n">{CONSULTORIA.n}</span>
              <span className="panel-nombre">{CONSULTORIA.corto}</span>
              <span className="panel-linea">{CONSULTORIA.linea}</span>
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>{ficha && <Ventana ficha={ficha} cerrar={cerrar} />}</AnimatePresence>
    </section>
  );
}

/** La ventana: el dibujo moviéndose, cómo funciona en tres pasos y el botón. */
function Ventana({ ficha, cerrar }: { ficha: Ficha; cerrar: () => void }) {
  const boton = useRef<HTMLButtonElement>(null);
  const Dibujo = ficha.id === 'otra' ? null : DIBUJOS[ficha.id];

  useEffect(() => {
    const antes = document.activeElement as HTMLElement | null;
    boton.current?.focus();
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && cerrar();
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
      antes?.focus();
    };
  }, [cerrar]);

  return (
    <motion.div
      className="ventana-fondo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={cerrar}
    >
      <motion.div
        className={`ventana ventana-${ficha.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ventana-titulo"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="ventana-cerrar" ref={boton} onClick={cerrar} aria-label="Cerrar">
          <IconX size={20} stroke={1.6} />
        </button>

        <div className="ventana-dibujo">{Dibujo ? <Dibujo activo /> : <DibujoOtra />}</div>

        <div className="ventana-texto">
          <p className="panel-n">{ficha.n}</p>
          <h3 id="ventana-titulo" className="ventana-nombre">
            {ficha.corto}
          </h3>
          <p className="ventana-linea">{ficha.linea}</p>
          <ol className="ventana-pasos">
            {ficha.pasos.map((p, i) => (
              <li key={p.t}>
                <span className="paso-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="paso-t">{p.t}</span>
                <span className="paso-d">{p.d}</span>
              </li>
            ))}
          </ol>
          <a className="boton boton-tinta" href={ficha.wa} target="_blank" rel="noreferrer">
            <IconBrandWhatsapp size={18} stroke={1.6} />
            {ficha.id === 'otra' ? 'Cuéntame' : 'Quiero este'}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
