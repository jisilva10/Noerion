import { motion } from 'framer-motion';
import { DIEZ, type Glifo } from '../../datos';

/**
 * Diez cosas que hoy se hacen a mano (video 28, «Diez ideas que puedes
 * robarme»). Cada ficha dice solo lo que pasa sola: el dibujo cuenta el resto.
 * Los enlaces a las páginas de servicio van en el pie. Los dibujos son nuestros, de trazo fino: ningún icono de librería.
 */

const T = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Dibujo({ g }: { g: Glifo }) {
  switch (g) {
    case 'factura':
      return (
        <svg viewBox="0 0 40 40" {...T}>
          <path d="M11 5h14l6 6v24H11z" />
          <path d="M25 5v6h6M15 17h12M15 22h12M15 27h7" />
          <circle cx="29" cy="30" r="5" className="acento" />
          <path d="M26.8 30l1.6 1.6 3-3.2" className="acento" />
        </svg>
      );
    case 'viaja':
      return (
        <svg viewBox="0 0 40 40" {...T}>
          <rect x="4" y="9" width="13" height="16" rx="1.5" />
          <rect x="23" y="15" width="13" height="16" rx="1.5" />
          <path d="M4 14h13M23 20h13M10.5 9v16M29.5 15v16" />
          <path d="M14 30c4 4 11 3 13-2" className="acento" />
          <path d="M24 27l3 1 1-3" className="acento" />
        </svg>
      );
    case 'reloj':
      return (
        <svg viewBox="0 0 40 40" {...T}>
          <circle cx="20" cy="20" r="14" />
          <path d="M20 11v9l-6 4" className="acento" />
        </svg>
      );
    case 'pantalla':
      return (
        <svg viewBox="0 0 40 40" {...T}>
          <rect x="5" y="7" width="30" height="21" rx="2" />
          <path d="M15 33h10M20 28v5" />
          <path d="M10 22l6-6 5 4 8-8" className="acento" />
        </svg>
      );
    case 'caja':
      return (
        <svg viewBox="0 0 40 40" {...T}>
          <path d="M6 14l14-7 14 7v14l-14 7-14-7z" />
          <path d="M6 14l14 7 14-7M20 21v14" />
          <path d="M13 10.5l14 7" className="acento" />
        </svg>
      );
    case 'aviso':
      return (
        <svg viewBox="0 0 40 40" {...T}>
          <path d="M12 27V18a8 8 0 0 1 16 0v9l3 3H9z" />
          <path d="M17 33a3 3 0 0 0 6 0" />
          <circle cx="29" cy="10" r="3.2" className="acento relleno" />
        </svg>
      );
    case 'cobro':
      return (
        <svg viewBox="0 0 40 40" {...T}>
          <rect x="5" y="11" width="30" height="19" rx="2.5" />
          <circle cx="20" cy="20.5" r="4.5" />
          <path d="M9 16h2M29 25h2" />
          <path d="M26 6l4 4-4 4" className="acento" />
          <path d="M30 10H18" className="acento" />
        </svg>
      );
    case 'alta':
      return (
        <svg viewBox="0 0 40 40" {...T}>
          <circle cx="16" cy="14" r="6" />
          <path d="M5 33c1-6 5-9 11-9s10 3 11 9" />
          <path d="M31 12v10M26 17h10" className="acento" />
        </svg>
      );
    case 'chat':
      return (
        <svg viewBox="0 0 40 40" {...T}>
          <path d="M6 9h20a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H14l-6 5v-5H6a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3z" />
          <path d="M31 16h3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-1v4l-5-4h-8" className="acento" />
        </svg>
      );
    case 'resumen':
      return (
        <svg viewBox="0 0 40 40" {...T}>
          <rect x="9" y="5" width="9" height="16" rx="4.5" />
          <path d="M5 16a8.5 8.5 0 0 0 17 0M13.5 25v5" />
          <path d="M24 22h11M24 27h11M24 32h7" className="acento" />
        </svg>
      );
  }
}

export function DiezCosas() {
  return (
    <div className="diez">
      <h3 className="modulo-titular">
        Diez cosas que hoy haces a mano. <em>Pueden hacerse solas.</em>
      </h3>
      <ol className="diez-rejilla">
        {DIEZ.map((d, i) => (
          <motion.li
            key={d.glifo}
            className="ficha"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 130, damping: 20, delay: (i % 5) * 0.05 }}
          >
            <div className="ficha-cabeza">
              <span className="ficha-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="ficha-dibujo">
                <Dibujo g={d.glifo} />
              </span>
            </div>
            <p className="ficha-si">{d.si}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
