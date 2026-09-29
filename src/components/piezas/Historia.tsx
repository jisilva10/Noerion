import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChipEye } from '../marca/ChipEye';

/**
 * Antes y ahora, en un vistazo (JIS, 29/9/2026: «hazlo más simple y más
 * entendible»). Ya no es una historia de cinco pasos: son dos lados, tres
 * líneas cada uno. A la izquierda la noche, con el chip dormido; a la
 * derecha el día, con el chip despierto.
 *
 * Nace de la floristería de la ficha de la empresa (17) y de cómo se resolvió
 * de verdad, con la facturación; contado para cualquier negocio.
 */

type Glifo = 'cuaderno' | 'excel' | 'lupa' | 'factura' | 'baja' | 'celular';

const ANTES: { g: Glifo; t: string }[] = [
  { g: 'cuaderno', t: 'Cuentas a mano, de noche.' },
  { g: 'excel', t: 'Lo pasas a un Excel.' },
  { g: 'lupa', t: 'Al otro día, buscas qué falta.' },
];

const AHORA: { g: Glifo; t: string }[] = [
  { g: 'factura', t: 'Vendes y facturas, como siempre.' },
  { g: 'baja', t: 'El inventario se descuenta solo.' },
  { g: 'celular', t: 'A las 7:00 te llega qué falta.' },
];

const T = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function Dibujo({ g }: { g: Glifo }) {
  switch (g) {
    case 'cuaderno':
      return (
        <svg viewBox="0 0 32 32" {...T}>
          <rect x="7" y="4" width="19" height="24" rx="2" />
          <path d="M11 4v24" />
          <path d="M15 12v6M18 12v6M21 12v6M14 17l9-4" className="acento" />
        </svg>
      );
    case 'excel':
      return (
        <svg viewBox="0 0 32 32" {...T}>
          <rect x="5" y="6" width="22" height="20" rx="2" />
          <path d="M5 12h22M5 19h22M13 6v20M20 6v20" />
        </svg>
      );
    case 'lupa':
      return (
        <svg viewBox="0 0 32 32" {...T}>
          <circle cx="14" cy="14" r="8" />
          <path d="M20 20l7 7" />
          <path d="M12 11.5a2.3 2.3 0 1 1 3 2.2c-.7.3-1 .8-1 1.5M14 18.2v.1" className="acento" />
        </svg>
      );
    case 'factura':
      return (
        <svg viewBox="0 0 32 32" {...T}>
          <path d="M8 4h16v24l-3-2-2.7 2-2.3-2-2.3 2L11 26l-3 2z" />
          <path d="M12 11h8M12 15h8" />
          <path d="M12.5 20l2 2 4-4" className="acento" />
        </svg>
      );
    case 'baja':
      return (
        <svg viewBox="0 0 32 32" {...T}>
          <path d="M5 11l11-6 11 6v12l-11 6-11-6z" />
          <path d="M5 11l11 6 11-6M16 17v12" />
          <path d="M22 3h6" className="acento" />
        </svg>
      );
    case 'celular':
      return (
        <svg viewBox="0 0 32 32" {...T}>
          <rect x="9" y="3" width="14" height="26" rx="3" />
          <path d="M14 25h4" />
          <path d="M12 10h8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-5l-3 2v-2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" className="acento" />
        </svg>
      );
  }
}

function Lado({
  cual,
  lista,
  visto,
  retraso,
}: {
  cual: 'antes' | 'ahora';
  lista: { g: Glifo; t: string }[];
  visto: boolean;
  retraso: number;
}) {
  const ahora = cual === 'ahora';
  return (
    <div className={`lado lado-${cual}`}>
      <div className="lado-cabeza">
        <span className="lado-ojo">
          <ChipEye
            width="100%"
            height="100%"
            forceAsleep={!ahora || !visto}
            wakeDelay={1100}
            strokeScale={0.9}
          />
        </span>
        <span className="lado-rotulo">{ahora ? 'Ahora' : 'Antes'}</span>
        <span className="lado-hora">{ahora ? '7:00' : '21:47'}</span>
      </div>

      <h3 className="lado-titular">
        {ahora ? (
          <>
            Cada venta, <em>se descuenta sola.</em>
          </>
        ) : (
          <>
            Cada noche, <em>a mano.</em>
          </>
        )}
      </h3>

      <ol className="lado-lista">
        {lista.map((x, i) => (
          <motion.li
            key={x.g}
            initial={{ opacity: 0, y: 12 }}
            animate={visto ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 160, damping: 22, delay: retraso + i * 0.18 }}
          >
            <span className="lado-dibujo">
              <Dibujo g={x.g} />
            </span>
            {x.t}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export function Historia() {
  const ref = useRef<HTMLDivElement>(null);
  const visto = useInView(ref, { amount: 0.4, once: true });

  return (
    <div ref={ref} className="antes-ahora">
      <Lado cual="antes" lista={ANTES} visto={visto} retraso={0.15} />
      <motion.span
        className="antes-ahora-flecha"
        aria-hidden="true"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={visto ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.8 }}
      >
        <svg viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </motion.span>
      <Lado cual="ahora" lista={AHORA} visto={visto} retraso={1.05} />
    </div>
  );
}
