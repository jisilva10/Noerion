import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Isotipo } from '../marca/Logo';

/**
 * Lo que diferencia a Noerion (ficha de la empresa, 20 y 24): balanzas,
 * cámaras que cuentan y lectores de código que hablan con el programa.
 * Se nombran así, con palabras de todos los días: nunca «sensor» ni «IoT».
 * Los colores son los del video 30: verde, azul y amarillo del sistema.
 */

function useContador(desde: number, hasta: number, cadaMs: number, activo: boolean) {
  const [n, setN] = useState(desde);
  useEffect(() => {
    if (!activo) return;
    setN(desde);
    const id = setInterval(() => setN((v) => (v >= hasta ? desde : v + 1)), cadaMs);
    return () => clearInterval(id);
  }, [desde, hasta, cadaMs, activo]);
  return n;
}

function Balanza({ activo }: { activo: boolean }) {
  const [kg, setKg] = useState(0);
  useEffect(() => {
    if (!activo) return;
    let raf = 0;
    let t0 = 0;
    const ciclo = 4200;
    const paso = (t: number) => {
      if (!t0) t0 = t;
      const f = ((t - t0) % ciclo) / ciclo;
      // El saco cae en el 18 % del ciclo; ahí la cifra sube y frena.
      const s = f < 0.2 ? 0 : Math.min(1, (f - 0.2) / 0.22);
      const e = 1 - Math.pow(1 - s, 3);
      setKg(f > 0.9 ? 0 : 24.5 * e);
      raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [activo]);

  return (
    <div className={`obj obj-balanza ${activo ? 'anda' : ''}`}>
      <div className="saco">
        <span>ARROZ</span>
      </div>
      <div className="bal-plato" />
      <div className="bal-base">
        <div className="bal-lcd">
          {kg.toFixed(1).replace('.', ',')}
          <small>kg</small>
        </div>
      </div>
    </div>
  );
}

function Camara({ activo }: { activo: boolean }) {
  const n = useContador(45, 48, 1100, activo);
  return (
    <div className={`obj obj-camara ${activo ? 'anda' : ''}`}>
      <div className="cam-cuerpo">
        <span className="cam-lente" />
      </div>
      <div className="cam-cono" />
      <div className="cinta">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="cajita" style={{ animationDelay: `${i * 1.1}s` }} />
        ))}
      </div>
      <div className="cam-cuenta">
        <b key={n} className="cam-n">
          {n}
        </b>
        <small>cajas</small>
      </div>
    </div>
  );
}

function Lector({ activo }: { activo: boolean }) {
  return (
    <div className={`obj obj-lector ${activo ? 'anda' : ''}`}>
      <div className="producto">
        <span className="producto-nombre">Aceite 1 L</span>
        <div className="barras">
          {[2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2].map((w, i) => (
            <i key={i} style={{ width: w * 1.6 }} />
          ))}
        </div>
      </div>
      <span className="laser" />
      <span className="lector-sale">
        <b>−1</b> aceite
      </span>
    </div>
  );
}

const APARATOS = [
  {
    id: 'balanza',
    nombre: 'Balanza',
    color: 'var(--c-balanza)',
    dice: 'Cuenta por peso.',
    Pieza: Balanza,
  },
  {
    id: 'camara',
    nombre: 'Cámara que cuenta',
    color: 'var(--c-camara)',
    dice: 'Cuenta lo que entra y sale.',
    Pieza: Camara,
  },
  {
    id: 'lector',
    nombre: 'Lector de códigos',
    color: 'var(--c-lector)',
    dice: 'Pasas el código y se descuenta.',
    Pieza: Lector,
  },
];

export function Aparatos() {
  const ref = useRef<HTMLDivElement>(null);
  const visto = useInView(ref, { amount: 0.3 });
  const quieto = useReducedMotion();
  const activo = visto && !quieto;
  // En el celular las tres tarjetas se deslizan de lado: los puntitos dicen
  // en cuál vas y se pueden tocar.
  const [actual, setActual] = useState(0);
  const alDeslizar = () => {
    const el = ref.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / (el.scrollWidth / APARATOS.length));
    if (i !== actual) setActual(Math.min(APARATOS.length - 1, Math.max(0, i)));
  };
  const irA = (i: number) => {
    const el = ref.current;
    const hijo = el?.children[i] as HTMLElement | undefined;
    if (el && hijo) el.scrollTo({ left: hijo.offsetLeft - el.offsetLeft - (el.clientWidth - hijo.clientWidth) / 2, behavior: 'smooth' });
  };

  return (
    <section className="aparatos" id="aparatos">
      <div className="envoltura">
        <div className="cabecera centrada">
          <h2 className="titular">
            No todo se mide con IA.
            <br />
            <em>Algunas cosas se cuentan solas.</em>
          </h2>
        </div>

        {/* La fila entra entera: en el celular las tarjetas de al lado están
            fuera de la pantalla, y si entraran una por una no se asomarían. */}
        <motion.div
          className="aparatos-fila"
          ref={ref}
          onScroll={alDeslizar}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 110, damping: 20 }}
        >
          {APARATOS.map(({ id, nombre, color, dice, Pieza }) => (
            <article key={id} className="vitrina" style={{ ['--c' as string]: color }}>
              <div className="vitrina-escena">
                <Pieza activo={activo} />
              </div>
              <h3>
                <span className="punto" />
                {nombre}
              </h3>
              <p>{dice}</p>
            </article>
          ))}
        </motion.div>

        <div className="puntos-deslizar" aria-hidden="true">
          {APARATOS.map((a, i) => (
            <button
              key={a.id}
              tabIndex={-1}
              className={i === actual ? 'activo' : ''}
              style={{ ['--c' as string]: a.color }}
              onClick={() => irA(i)}
            />
          ))}
        </div>

        <div className="aparatos-junta">
          <svg viewBox="0 0 600 90" className="hilos" aria-hidden="true">
            {[100, 300, 500].map((x, i) => (
              <path
                key={x}
                d={`M${x} 0 C ${x} 45, 300 30, 300 78`}
                className={`hilo hilo-${i}`}
              />
            ))}
          </svg>
          <div className="junta-fila">
            <span className="junta-chip">
              <Isotipo size={26} />
            </span>
            <p>
              Todo llega a un lugar. <b>Y te avisa.</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
