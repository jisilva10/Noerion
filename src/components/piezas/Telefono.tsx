import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { REPORTE } from '../../datos';
import { Isotipo } from '../marca/Logo';

/**
 * El teléfono del hero: el reporte que llega solo a las 7:00 (video 34).
 *
 * Es una secuencia en bucle, no un video: la pantalla de bloqueo marca las
 * 6:59, pasa a las 7:00, cae el aviso de «Tu negocio», se abre el chat y cada
 * renglón del reporte se enciende a su turno. Solo corre mientras se ve.
 */

type Fase = 'bloqueo' | 'hora' | 'aviso' | 'chat';

const RESORTE = { type: 'spring', stiffness: 380, damping: 32 } as const;
const SUAVE = { type: 'spring', stiffness: 170, damping: 26 } as const;

function fechaDeHoy() {
  try {
    const f = new Intl.DateTimeFormat('es-EC', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(new Date());
    return f.charAt(0).toUpperCase() + f.slice(1);
  } catch {
    return 'Lunes, 28 de septiembre';
  }
}

export function Telefono() {
  const ref = useRef<HTMLDivElement>(null);
  const visto = useInView(ref, { amount: 0.35 });
  const quieto = useReducedMotion();

  const [fase, setFase] = useState<Fase>(quieto ? 'chat' : 'bloqueo');
  const [renglones, setRenglones] = useState(quieto ? REPORTE.length : 0);
  const [escribiendo, setEscribiendo] = useState(false);
  // Después del reporte: 1 = el dueño contesta, 2 = responde el negocio,
  // 3 = el remate. Es el mismo diálogo que se aprobó para el video del brag.
  const [despues, setDespues] = useState(quieto ? 3 : 0);
  const fecha = useRef(fechaDeHoy()).current;

  useEffect(() => {
    if (quieto || !visto) return;
    const t: ReturnType<typeof setTimeout>[] = [];
    const en = (ms: number, fn: () => void) => t.push(setTimeout(fn, ms));

    const ciclo = () => {
      setFase('bloqueo');
      setRenglones(0);
      setDespues(0);
      setEscribiendo(false);
      en(1300, () => setFase('hora'));
      en(2100, () => setFase('aviso'));
      en(4300, () => setFase('chat'));
      en(4700, () => setEscribiendo(true));
      en(5600, () => {
        setEscribiendo(false);
        setRenglones(1);
      });
      en(6300, () => setRenglones(2));
      en(6900, () => setRenglones(3));
      en(8300, () => setDespues(1));
      en(9100, () => setEscribiendo(true));
      en(10000, () => {
        setEscribiendo(false);
        setDespues(2);
      });
      en(10900, () => setDespues(3));
      en(16500, ciclo);
    };
    ciclo();
    return () => t.forEach(clearTimeout);
  }, [visto, quieto]);

  const hora = fase === 'bloqueo' ? '6:59' : '7:00';

  return (
    <div ref={ref} className="telefono" aria-hidden="true">
      <div className="tel-marco">
        <div className="tel-pantalla">
          <div className="tel-isla" />

          <AnimatePresence initial={false} mode="popLayout">
            {fase !== 'chat' ? (
              <motion.div
                key="bloqueo"
                className="tel-bloqueo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              >
                <p className="tel-fecha">{fecha}</p>
                <div className="tel-hora">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={hora}
                      initial={{ y: '0.5em', opacity: 0, filter: 'blur(4px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: '-0.5em', opacity: 0, filter: 'blur(4px)' }}
                      transition={SUAVE}
                    >
                      {hora}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {fase === 'aviso' && (
                    <motion.div
                      className="tel-aviso"
                      initial={{ y: -40, opacity: 0, scale: 0.96 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={RESORTE}
                    >
                      <span className="tel-app">
                        <Isotipo size={20} />
                      </span>
                      <span className="tel-aviso-txt">
                        <b>Tu negocio</b>
                        <span>Buenos días. Así cerró ayer…</span>
                      </span>
                      <span className="tel-ahora">ahora</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                className="tel-chat"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={SUAVE}
              >
                <div className="chat-cabeza">
                  <span className="tel-app pequeña">
                    <Isotipo size={17} />
                  </span>
                  <span>
                    <b>Tu negocio</b>
                    <small>{escribiendo ? 'escribiendo…' : 'en línea'}</small>
                  </span>
                </div>

                <div className="chat-cuerpo">
                  <span className="chat-dia">Hoy · 7:00</span>



                  {renglones > 0 && (
                    <motion.div
                      className="burbuja reporte"
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={RESORTE}
                    >
                      <p className="rep-saludo">Buenos días. Así cerró ayer:</p>
                      {REPORTE.map((r, i) => (
                        <div
                          key={r.etiqueta}
                          className={`rep-fila ${renglones > i ? 'encendida' : ''}`}
                        >
                          <span>{r.etiqueta}</span>
                          <b>{r.valor}</b>
                        </div>
                      ))}
                      <span className="burbuja-hora">7:00</span>
                    </motion.div>
                  )}

                  {despues >= 1 && (
                    <motion.div
                      className="burbuja mia"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={RESORTE}
                    >
                      Pide 20 sacos de arroz.
                      <span className="burbuja-hora">7:02 ✓✓</span>
                    </motion.div>
                  )}

                  {despues >= 2 && (
                    <motion.div
                      className="burbuja corta"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={RESORTE}
                    >
                      Listo. Pedido enviado.
                      <span className="burbuja-hora">7:02</span>
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {escribiendo && (
                      <motion.div
                        className="burbuja escribe"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={RESORTE}
                      >
                        <i />
                        <i />
                        <i />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {despues >= 3 && (
                      <motion.p
                        className="chat-remate"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={SUAVE}
                      >
                        Sin abrir un solo Excel.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="tel-sombra" />
    </div>
  );
}
