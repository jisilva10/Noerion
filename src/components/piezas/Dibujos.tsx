import { AnimatePresence, motion } from 'framer-motion';
import { useCiclo } from './ciclo';

/**
 * Los dibujos de la galería. Sin palabras y formales (JIS, 18/11/2026: «no
 * tan dibujos animados»): línea fina de tinta, papel por dentro y un solo
 * acento por sistema. Cada uno cuenta su historia corta mientras su panel
 * está abierto.
 */

type Props = { activo: boolean };

const TINTA = '#18180F';
const PAPEL = '#FAFAF8';
const GRIS = '#CFCAC0';
const GRIS_2 = '#E3DFD6';
const L = { stroke: TINTA, strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const suave = { type: 'spring' as const, stiffness: 170, damping: 22 };
const ios = [0.32, 0.72, 0, 1] as const;

/* ── 01 · Inventario: sale una caja, llega el aviso, entra otra ── */

const BRONCE = '#9A6B32';

/** Una caja de cartón vista de tres cuartos: frente, tapa, costado y la cinta. */
function Caja({ x, y }: { x: number; y: number }) {
  const w = 52;
  const h = 38;
  const d = 13;
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M0 ${d} L${d} 0 H${w + d} L${w} ${d} Z`} fill="#F1E2C8" {...L} />
      <path d={`M${w} ${d} L${w + d} 0 V${h} L${w} ${h + d} Z`} fill="#D8BC93" {...L} />
      <rect y={d} width={w} height={h} fill="#E8D3B0" {...L} />
      <path d={`M${w / 2 - 6} ${d} L${w / 2 - 6 + d} 0 M${w / 2 - 6} ${d} V${d + 13}`} stroke={BRONCE} strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
}

const T_INV = [1200, 1300, 1800, 1500, 800];

export function DibujoInventario({ activo }: Props) {
  const { ref, paso } = useCiclo(T_INV, 2, activo);
  const fuera = paso === 1 || paso === 2;
  return (
    <div ref={ref} className="dibujo">
      <svg viewBox="0 0 320 240" aria-hidden="true">
        {/* el estante */}
        <path d="M44 34 V212 M276 34 V212 M44 122 H276 M44 210 H276" {...L} />
        <Caja x={56} y={71} />
        <Caja x={126} y={71} />
        <Caja x={56} y={159} />
        <Caja x={126} y={159} />
        <Caja x={196} y={159} />
        <motion.g
          initial={false}
          animate={
            fuera
              ? { y: -26, opacity: 0 }
              : paso === 3
                ? { y: [-40, 0], opacity: [0, 1] }
                : { y: 0, opacity: 1 }
          }
          transition={{ duration: 0.7, ease: ios }}
        >
          <Caja x={196} y={71} />
        </motion.g>

        <AnimatePresence>
          {paso === 2 && (
            <motion.g
              key="aviso"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={suave}
            >
              <rect x="150" y="14" width="150" height="46" rx="12" fill={PAPEL} {...L} />
              <motion.g
                animate={{ rotate: [0, -14, 12, -6, 0] }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ originX: '174px', originY: '26px' }}
              >
                <path
                  d="M166 44 h16 M168 44 v-9 a6 6 0 0 1 12 0 v9 M174 47 v1.5"
                  stroke={BRONCE}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.g>
              <rect x="194" y="28" width="84" height="6" rx="3" fill={GRIS} />
              <rect x="194" y="40" width="56" height="6" rx="3" fill={GRIS_2} />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

/* ── 02 · Mensajes: te escriben, contesta solo, el panel marca al interesado ── */

const VERDE = '#1F8A4C';
const T_MSJ = [1000, 1100, 1700, 1900, 800];
const entra = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: suave,
};

export function DibujoMensajes({ activo }: Props) {
  const { ref, paso } = useCiclo(T_MSJ, 3, activo);
  return (
    <div ref={ref} className="dibujo">
      <svg viewBox="0 0 320 240" aria-hidden="true">
        <g>
          <path d="M40 30 h150 a14 14 0 0 1 14 14 v22 a14 14 0 0 1 -14 14 h-138 l-12 10 z" fill={PAPEL} {...L} />
          <rect x="56" y="46" width="104" height="6" rx="3" fill={GRIS} />
          <rect x="56" y="58" width="66" height="6" rx="3" fill={GRIS_2} />
        </g>
        <AnimatePresence>
          {paso === 1 && (
            <motion.g key="escribe" {...entra}>
              <rect x="208" y="100" width="72" height="34" rx="17" fill={PAPEL} {...L} />
              {[230, 244, 258].map((cx, i) => (
                <motion.circle
                  key={cx}
                  cx={cx}
                  cy="117"
                  r="3.5"
                  fill={TINTA}
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
                />
              ))}
            </motion.g>
          )}
          {paso >= 2 && (
            <motion.g key="responde" {...entra}>
              <path d="M280 100 h-150 a14 14 0 0 0 -14 14 v22 a14 14 0 0 0 14 14 h138 l12 10 z" fill={VERDE} />
              <rect x="134" y="116" width="112" height="6" rx="3" fill="rgba(255,255,255,0.9)" />
              <rect x="134" y="128" width="72" height="6" rx="3" fill="rgba(255,255,255,0.6)" />
            </motion.g>
          )}
          {paso >= 3 && (
            <motion.g key="panel" {...entra} transition={{ ...suave, delay: 0.2 }}>
              <rect x="40" y="176" width="240" height="44" rx="12" fill={PAPEL} {...L} />
              <circle cx="62" cy="198" r="7" fill="none" {...L} />
              <rect x="78" y="195" width="96" height="6" rx="3" fill={GRIS} />
              <motion.rect
                x="216"
                y="189"
                height="18"
                rx="9"
                fill="#E0B021"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.6, delay: 0.45, ease: ios }}
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

/* ── 03 · Contenido: mira qué funciona, arma la publicación, sube ── */

const TERRACOTA = '#C4553A';
const T_CON = [800, 1500, 1300, 1100, 1800, 700];

export function DibujoContenido({ activo }: Props) {
  const { ref, paso } = useCiclo(T_CON, 4, activo);
  return (
    <div ref={ref} className="dibujo">
      <svg viewBox="0 0 320 240" aria-hidden="true">
        {/* lo que funciona en tu rubro: la línea que sube */}
        <path d="M30 200 H110 M30 200 V110" {...L} strokeWidth={1.6} opacity={0.5} />
        <motion.path
          d="M34 186 L56 170 L74 178 L94 140 L108 126"
          fill="none"
          stroke={TERRACOTA}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: paso >= 1 ? 1 : 0 }}
          transition={{ duration: 1.1, ease: ios }}
        />
        <motion.circle
          cx="108"
          cy="126"
          r="4.5"
          fill={TERRACOTA}
          initial={false}
          animate={{ scale: paso >= 1 ? 1 : 0 }}
          transition={{ ...suave, delay: paso >= 1 ? 0.9 : 0 }}
        />

        {/* el celular */}
        <rect x="140" y="16" width="120" height="210" rx="22" fill={PAPEL} {...L} />
        <path d="M186 28 h28" {...L} />
        <rect x="154" y="44" width="92" height="92" rx="8" fill="none" stroke={GRIS} strokeWidth="1.6" strokeDasharray="4 5" />

        <AnimatePresence>
          {paso >= 2 && (
            <motion.g
              key="foto"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={suave}
              style={{ originX: '200px', originY: '90px' }}
            >
              <rect x="154" y="44" width="92" height="92" rx="8" fill="#F3DDD3" />
              <circle cx="222" cy="66" r="8" fill="none" stroke={TERRACOTA} strokeWidth="2.2" />
              <path d="M154 128 L184 94 L204 114 L216 102 L246 128" fill="none" stroke={TERRACOTA} strokeWidth="2.2" strokeLinejoin="round" />
            </motion.g>
          )}
          {paso >= 3 && (
            <motion.g key="texto" {...entra}>
              <rect x="154" y="150" width="76" height="6" rx="3" fill={GRIS} />
              <rect x="154" y="162" width="52" height="6" rx="3" fill={GRIS_2} />
            </motion.g>
          )}
          {paso >= 4 && (
            <motion.g key="sube" {...entra}>
              <rect x="154" y="186" width="92" height="26" rx="13" fill="none" {...L} strokeWidth={1.8} />
              <path
                d="M172 204 c-5 -4 -8 -6.5 -8 -9.5 a3.5 3.5 0 0 1 8 -1.5 a3.5 3.5 0 0 1 8 1.5 c0 3 -3 5.5 -8 9.5 z"
                fill={TERRACOTA}
              />
              <motion.rect
                x="188"
                y="196"
                height="6"
                rx="3"
                fill={GRIS}
                initial={{ width: 8 }}
                animate={{ width: 46 }}
                transition={{ duration: 0.9, ease: ios }}
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

/* ── 04 · ¿Otra cosa?: las tres piezas y el hueco donde entra la cuarta ── */

export function DibujoOtra() {
  return (
    <div className="dibujo dibujo-otra" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <rect x="14" y="14" width="40" height="40" rx="8" fill={PAPEL} {...L} />
        <rect x="66" y="14" width="40" height="40" rx="8" fill={PAPEL} {...L} />
        <rect x="14" y="66" width="40" height="40" rx="8" fill={PAPEL} {...L} />
        <rect x="66" y="66" width="40" height="40" rx="8" fill="none" stroke={TINTA} strokeWidth="1.6" strokeDasharray="4 5" opacity="0.45" />
        <rect className="pieza" x="66" y="66" width="40" height="40" rx="8" fill="#B89A0A" />
      </svg>
    </div>
  );
}
