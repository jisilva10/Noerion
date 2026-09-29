import { ChipEye } from './ChipEye';
import {
  CHIP_ESCALA,
  CHIP_X,
  CHIP_Y,
  LETRAS,
  LETRAS_TRANSFORM,
  VIEWBOX,
} from './glifos';

type Props = {
  /** Color de las letras. El chip es siempre #B89A0A (brand book 6.2). */
  tinta?: string;
  className?: string;
  /** El ojo sigue al cursor y parpadea. Si no, es el logo quieto del manual. */
  vivo?: boolean;
  /** Arranca dormido y se despierta a los `despierta` ms. */
  despierta?: number;
  titulo?: string;
};

/**
 * El logotipo horizontal, con las letras del manual trazo a trazo y el chip
 * en su sitio exacto. Cuando va vivo, el chip es el mismo `ChipEye` de la
 * web anterior: se despierta, abre el ojo y mira.
 */
export function Logo({
  tinta = '#18180F',
  className,
  vivo = false,
  despierta = 1200,
  titulo = 'Noerion',
}: Props) {
  return (
    <svg
      viewBox={VIEWBOX}
      className={className}
      role="img"
      aria-label={titulo}
      style={{ overflow: 'visible', display: 'block' }}
    >
      <g transform={LETRAS_TRANSFORM} fill={tinta}>
        {LETRAS.map((l) => (
          <path key={l.x} transform={`translate(${l.x},0)`} d={l.d} />
        ))}
      </g>
      <g transform={`translate(${CHIP_X},${CHIP_Y})`}>
        {vivo ? (
          <ChipEye
            width={String(22 * CHIP_ESCALA)}
            height={String(16 * CHIP_ESCALA)}
            wakeDelay={despierta}
            strokeScale={0.92}
          />
        ) : (
          <g
            transform={`scale(${CHIP_ESCALA})`}
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
      </g>
    </svg>
  );
}

/** El isotipo solo: el chip dorado, para espacios chicos. */
export function Isotipo({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 22 16"
      width={size}
      height={(size * 16) / 22}
      className={className}
      fill="none"
      stroke="#B89A0A"
      strokeWidth={1.1}
      strokeLinecap="round"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <rect x="5" y="2" width="12" height="12" rx="1.5" />
      <path d="M5 5.5H2M5 10.5H2M17 5.5h3M17 10.5h3M8 2V0M11 2V0M14 2V0M8 14v2M11 14v2M14 14v2" />
      <circle cx="11" cy="8" r="2" fill="#B89A0A" stroke="none" />
    </svg>
  );
}
