import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons-react';
import { ChipEye } from '../marca/ChipEye';
import { INSTAGRAM, WA_GENERAL } from '../../datos';

type Mirada = { x: number; y: number };

const sube = (d: number) => ({
  initial: { opacity: 0, y: '0.6em' },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 140, damping: 20, delay: d },
});

const aparece = (d: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, delay: d },
});

/** Hacia dónde está `el` desde el ojo, en el rango de la pupila (-1..1). */
function haciaElemento(ojo: DOMRect, el: Element): Mirada {
  const r = el.getBoundingClientRect();
  const dx = r.left + r.width / 2 - (ojo.left + ojo.width / 2);
  const dy = r.top + r.height / 2 - (ojo.top + ojo.height / 2);
  const largo = Math.hypot(dx, dy) || 1;
  return { x: dx / largo, y: dy / largo };
}

/**
 * La primera pantalla, sin foto (JIS, 18/11/2026): el chip del logo en grande,
 * dentro de un círculo de tinta. Entra dormido, abre el ojo y desde ahí mira:
 * sigue el cursor o el dedo, mira lo que señalas, mira a su alrededor si nadie
 * se mueve (a veces hacia abajo, a la señal para bajar) y se duerme cuando te
 * vas.
 */
export function Inicio() {
  const ojo = useRef<HTMLButtonElement>(null);
  const bajar = useRef<HTMLAnchorElement>(null);
  const [mira, setMira] = useState<Mirada>({ x: 0, y: 0 });
  const [duerme, setDuerme] = useState(false);
  const [yaDesperto, setYaDesperto] = useState(false);
  const fija = useRef(false);
  const ultimo = useRef(0);
  const chip = useAnimationControls();

  useEffect(() => {
    const t = window.setTimeout(() => setYaDesperto(true), 1400);
    ultimo.current = Date.now();

    const alMover = (e: PointerEvent) => {
      ultimo.current = Date.now();
      setDuerme(false);
      if (fija.current || !ojo.current) return;
      const r = ojo.current.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      setMira({ x: Math.max(-1, Math.min(1, x * 1.4)), y: Math.max(-1, Math.min(1, y * 1.4)) });
    };

    // Si nadie se mueve, mira a su alrededor (en el celular es casi siempre).
    const curioso = window.setInterval(() => {
      if (fija.current || Date.now() - ultimo.current < 3500) return;
      // Una de cada tres veces mira hacia abajo, a la señal para bajar:
      // invita a seguir sin decirlo.
      const azar = Math.random();
      if (azar < 0.35 && ojo.current && bajar.current) {
        setMira(haciaElemento(ojo.current.getBoundingClientRect(), bajar.current));
      } else if (azar < 0.55) {
        setMira({ x: 0, y: 0 });
      } else {
        setMira({ x: Math.random() * 1.8 - 0.9, y: Math.random() * 1.2 - 0.6 });
      }
    }, 2300);

    // Se duerme cuando el cursor sale de la ventana o cambias de pestaña.
    let sueño = 0;
    const alSalir = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      sueño = window.setTimeout(() => setDuerme(true), 1200);
    };
    const alVolver = () => {
      window.clearTimeout(sueño);
      setDuerme(false);
    };
    const alOcultar = () => (document.hidden ? setDuerme(true) : setDuerme(false));

    window.addEventListener('pointermove', alMover, { passive: true });
    window.addEventListener('pointerdown', alMover, { passive: true });
    document.addEventListener('mouseout', alSalir);
    document.addEventListener('mouseover', alVolver);
    document.addEventListener('visibilitychange', alOcultar);
    return () => {
      window.clearTimeout(t);
      window.clearInterval(curioso);
      window.clearTimeout(sueño);
      window.removeEventListener('pointermove', alMover);
      window.removeEventListener('pointerdown', alMover);
      document.removeEventListener('mouseout', alSalir);
      document.removeEventListener('mouseover', alVolver);
      document.removeEventListener('visibilitychange', alOcultar);
    };
  }, []);

  /** Mientras señalas algo, el ojo lo mira a eso. */
  const señala = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (!ojo.current) return;
      fija.current = true;
      setMira(haciaElemento(ojo.current.getBoundingClientRect(), e.currentTarget));
    },
    onPointerLeave: () => {
      fija.current = false;
    },
  };

  /** Si lo tocas, se sorprende: se encoge, salta y te mira de frente. */
  const tocar = () => {
    setMira({ x: 0, y: 0 });
    chip.start({
      scale: [1, 0.86, 1.08, 1],
      transition: { duration: 0.55, times: [0, 0.25, 0.65, 1] },
    });
  };

  return (
    <section className="inicio" id="inicio">
      <div className="luz-ventana suave" aria-hidden="true" />

      <div className="envoltura heroe">
        <div className="heroe-centro">
          <motion.div
            className="heroe-circulo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.1 }}
          />
          <motion.button
            type="button"
            className="heroe-ojo"
            ref={ojo}
            aria-label="El ojo de Noerion"
            onClick={tocar}
            initial={{ y: '-60%', opacity: 0, rotate: -8 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.35 }}
          >
            <motion.span className="heroe-chip" animate={chip}>
              <ChipEye
                width="100%"
                height="100%"
                strokeScale={0.62}
                wakeDelay={yaDesperto ? 250 : 1300}
                forceAsleep={duerme}
                pupilOffset={mira}
              />
            </motion.span>
          </motion.button>
        </div>

        <h1 className="heroe-titulo">
          {['Tres', 'sistemas', 'para tu', 'negocio.'].map((p, i) => (
            <span key={p} className="heroe-linea" {...señala}>
              <motion.span {...sube(0.5 + i * 0.09)}>{p}</motion.span>
            </span>
          ))}
        </h1>
      </div>

      <motion.div className="envoltura heroe-pie" {...aparece(1.4)}>
        <div className="heroe-redes">
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram de Noerion">
            <IconBrandInstagram size={20} stroke={1.5} />
          </a>
          <a href={WA_GENERAL} target="_blank" rel="noreferrer" aria-label="WhatsApp de Noerion">
            <IconBrandWhatsapp size={20} stroke={1.5} />
          </a>
        </div>
        <a className="heroe-bajar" href="#sistemas" ref={bajar} aria-label="Bajar" {...señala}>
          <span />
        </a>
        <p>Quito, Ecuador</p>
      </motion.div>
    </section>
  );
}
