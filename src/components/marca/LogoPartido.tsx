import { motion } from 'framer-motion';
import { CHIP_ESCALA, CHIP_X, CHIP_Y, LETRAS, LETRAS_TRANSFORM } from './glifos';

/**
 * El nombre como una suma (JIS, 18/11/2026: «el logo real: noerion = noerós +
 * ion»): el logotipo entero del manual, un «=» y sus dos raíces, cada una con
 * lo que quiere decir. El chip va quieto: el ojo que se mueve es solo el del
 * inicio.
 */

const ANCHO = 5052;

function Mitad({ desde, hasta, tinta, chip, todo }: { desde: number; hasta: number; tinta: string; chip?: boolean; todo?: boolean }) {
  return (
    <svg
      className="partido-svg"
      viewBox={`${desde} 0 ${hasta - desde} 800`}
      style={{ aspectRatio: `${hasta - desde} / 800` }}
      aria-hidden="true"
    >
      <g transform={LETRAS_TRANSFORM} fill={tinta}>
        {LETRAS.filter((l) => todo || (chip ? l.x >= 2814 : l.x < 2814)).map((l) => (
          <path key={l.x} transform={`translate(${l.x},0)`} d={l.d} />
        ))}
      </g>
      {(chip || todo) && (
        <g
          transform={`translate(${CHIP_X},${CHIP_Y}) scale(${CHIP_ESCALA})`}
          stroke="#B89A0A"
          strokeWidth={1.1}
          fill="none"
          strokeLinecap="round"
        >
          <rect x="5" y="2" width="12" height="12" rx="1.5" />
          <path d="M5 5.5H2M5 10.5H2M17 5.5h3M17 10.5h3M8 2V0M11 2V0M14 2V0M8 14v2M11 14v2M14 14v2" />
          <circle cx="11" cy="8" r="2" fill="#B89A0A" stroke="none" />
        </g>
      )}
    </svg>
  );
}

export function LogoPartido({ tinta = '#F4F1EB' }: { tinta?: string }) {
  const dice = (d: number) => ({
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: 0.6, delay: d },
  });

  return (
    <div className="formula" role="img" aria-label="Noerion es igual a noerós, lo que comprende, más -ion, lo que se hace">
      <motion.span className="formula-logo" {...dice(0.2)}>
        <Mitad desde={0} hasta={ANCHO} tinta={tinta} todo />
      </motion.span>
      <span className="formula-salto" aria-hidden="true" />
      <motion.span className="formula-signo" aria-hidden="true" {...dice(0.7)}>
        =
      </motion.span>
      <motion.span className="formula-raiz" {...dice(0.95)}>
        <span className="parte-palabra">noerós</span>
        <span className="parte-dice">lo que comprende</span>
      </motion.span>
      <motion.span className="formula-signo" aria-hidden="true" {...dice(1.2)}>
        +
      </motion.span>
      <motion.span className="formula-raiz" {...dice(1.45)}>
        <span className="parte-palabra">-ion</span>
        <span className="parte-dice">lo que se hace</span>
      </motion.span>
    </div>
  );
}
