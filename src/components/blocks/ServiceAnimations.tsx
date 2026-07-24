import React from "react";
import { motion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";

/* ══════════════════════════════════════════════════════════════
   PALETA KAYRON
   ══════════════════════════════════════════════════════════════ */
const GOLD = "#B89A0A";
const SOFT = "#CFC8BA";
const MUTED = "#8A8679";

/* ══════════════════════════════════════════════════════════════
   CONFIG
   El chip viaja en una capa por encima del SVG. Aqui solo se
   declara donde aterriza, como respira una vez vivo y a donde
   mira. anchor / idle van en unidades del viewBox.
   ══════════════════════════════════════════════════════════════ */
export type SceneConfig = {
  vb: [number, number];
  anchor: [number, number];
  chip: number;
  idle: Record<string, number[]>;
  idleT: Transition;
  gaze: { x: number; y: number }[];
  gazeMs: number;
};

/* la escena 03 narra una sola vez por seleccion */
const L = 12;
const loop = (times: number[]): Transition => ({ duration: L, times, repeat: Infinity, ease: "easeInOut" });

export const SCENES: SceneConfig[] = [
  {
    // 01 · Automatizacion Operativa
    vb: [520, 500],
    anchor: [256, 330],
    chip: 96,
    idle: { y: [0, -7, 0] },
    idleT: { duration: 3.4, repeat: Infinity, ease: "easeInOut" },
    gaze: [
      { x: -0.85, y: 0.1 },
      { x: -0.3, y: 0.15 },
      { x: 0.85, y: 0.1 },
      { x: 0.5, y: -0.85 },
      { x: 0, y: 0.6 },
    ],
    gazeMs: 1150,
  },
  {
    // 02 · Ecosistemas de IA y Software
    vb: [520, 500],
    anchor: [112, 372],
    chip: 88,
    idle: { y: [0, -8, 0], rotate: [0, 1.6, 0, -1.6, 0] },
    idleT: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
    gaze: [
      { x: 0.85, y: -0.8 },
      { x: 0.45, y: -0.45 },
      { x: 0.95, y: -0.55 },
      { x: 0.8, y: 0.3 },
      { x: -0.7, y: -0.55 },
    ],
    gazeMs: 1350,
  },
  {
    // 03 · Consultoria y Optimizacion
    vb: [520, 500],
    anchor: [100, 272],
    chip: 84,
    idle: { y: [0, -6, 0] },
    idleT: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
    gaze: [
      { x: 0.25, y: 0.05 },
      { x: 0.6, y: 0.05 },
      { x: 0.9, y: 0.05 },
      { x: 0.75, y: -0.6 },
      { x: 0.65, y: 0.1 },
    ],
    gazeMs: 2400,
  },
];

/* ══════════════════════════════════════════════════════════════
   VARIANTES · entra dibujandose, sale deconstruyendose
   ══════════════════════════════════════════════════════════════ */
const rootV: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.045, delayChildren: 0.06 } },
  exit: { opacity: 1, transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const lineV: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.32, ease: [0.65, 0, 0.35, 1] } },
};

const popV: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.45, duration: 0.6 } },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.28 } },
};

const fadeV: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55 } },
  exit: { opacity: 0, transition: { duration: 0.28 } },
};

const popStyle: React.CSSProperties = { transformBox: "fill-box", transformOrigin: "center" };
const CompactCtx = React.createContext(false);
const useLabelStyle = (): React.CSSProperties => {
  const compact = React.useContext(CompactCtx);
  return {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: compact ? 16 : 11,
    letterSpacing: compact ? 3 : 2.2,
    fontWeight: 500,
  };
};

const Label: React.FC<{
  x: number;
  y: number;
  text: string;
  gold?: boolean;
  anchor?: "start" | "middle" | "end";
}> = ({ x, y, text, gold, anchor = "start" }) => (
  <motion.text x={x} y={y} variants={fadeV} textAnchor={anchor} fill={gold ? GOLD : MUTED} style={useLabelStyle()}>
    {text}
  </motion.text>
);

/* ══════════════════════════════════════════════════════════════
   01 · AUTOMATIZACION OPERATIVA
   La bodega alimenta una cinta que nunca para. Lo que entra
   suelto sale contado, con su visto, y el cobro se dispara solo.
   ══════════════════════════════════════════════════════════════ */
const SceneAutomation: React.FC = () => (
  <>
    <Label x={40} y={86} text="INVENTARIO" />
    <Label x={480} y={86} text="PAGOS" anchor="end" />
    <Label x={256} y={486} text="OPERACION SIN PAUSAS" gold anchor="middle" />

    {/* Estanteria */}
    <motion.rect x={40} y={104} width={112} height={122} stroke={SOFT} strokeWidth={1.5} fill="none" variants={lineV} />
    <motion.line x1={40} y1={145} x2={152} y2={145} stroke={SOFT} strokeWidth={1.2} variants={lineV} />
    <motion.line x1={40} y1={186} x2={152} y2={186} stroke={SOFT} strokeWidth={1.2} variants={lineV} />
    {[
      [52, 116],
      [86, 116],
      [52, 157],
      [118, 157],
      [86, 198],
    ].map(([x, y], i) => (
      <motion.rect
        key={`sh-${i}`}
        x={x}
        y={y}
        width={24}
        height={22}
        rx={2}
        stroke={SOFT}
        strokeWidth={1.3}
        fill="none"
        variants={popV}
        style={popStyle}
      />
    ))}

    {/* Bajada a la cinta */}
    <motion.path d="M 96 226 C 96 268 84 282 84 294" stroke={SOFT} strokeWidth={1.3} fill="none" strokeDasharray="4 6" variants={lineV} />
    <motion.path d="M 78 286 L 84 296 L 90 286" stroke={SOFT} strokeWidth={1.3} fill="none" strokeLinecap="round" strokeLinejoin="round" variants={lineV} />

    {/* Cinta */}
    <motion.line x1={34} y1={330} x2={486} y2={330} stroke={SOFT} strokeWidth={1.4} variants={lineV} />
    <motion.line x1={34} y1={364} x2={486} y2={364} stroke={SOFT} strokeWidth={1} opacity={0.6} variants={lineV} />
    <motion.line x1={34} y1={314} x2={34} y2={380} stroke={SOFT} strokeWidth={1.4} variants={lineV} />
    <motion.g variants={fadeV}>
      <motion.line
        x1={34}
        y1={330}
        x2={486}
        y2={330}
        stroke={GOLD}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeDasharray="5 19"
        opacity={0.5}
        animate={{ strokeDashoffset: [0, -48] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </motion.g>

    {/* Cajas sueltas que entran (pasan por detras del chip) */}
    {[0, 1, 2].map((i) => (
      <motion.g key={`in-${i}`} variants={fadeV}>
        <motion.g
          animate={{ x: [0, 172], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: i * 1.5,
            x: { ease: "linear" },
            opacity: { times: [0, 0.08, 0.78, 1], ease: "linear" },
          }}
        >
          <rect x={70} y={300} width={32} height={30} rx={2.5} stroke={SOFT} strokeWidth={1.5} fill="none" />
          <line x1={70} y1={310} x2={102} y2={310} stroke={SOFT} strokeWidth={1.2} />
          <line x1={86} y1={300} x2={86} y2={310} stroke={SOFT} strokeWidth={1.2} />
        </motion.g>
      </motion.g>
    ))}

    {/* Latido del chip procesando */}
    <motion.g variants={fadeV}>
      <motion.circle
        cx={256}
        cy={330}
        r={62}
        stroke={GOLD}
        strokeWidth={1.4}
        fill="none"
        style={popStyle}
        animate={{ scale: [0.7, 1.3], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.g>

    {/* Cajas contadas que salen */}
    {[0, 1, 2].map((i) => (
      <motion.g key={`out-${i}`} variants={fadeV}>
        <motion.g
          animate={{ x: [0, 130], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: i * 1.5 + 0.8,
            x: { ease: "linear" },
            opacity: { times: [0, 0.14, 0.86, 1], ease: "linear" },
          }}
        >
          <rect x={312} y={300} width={32} height={30} rx={2.5} stroke={GOLD} strokeWidth={1.5} fill="none" />
          <path
            d="M 320 316 L 326 322 L 337 309"
            stroke={GOLD}
            strokeWidth={1.8}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.g>
    ))}

    {/* Bandeja de salida */}
    <motion.path
      d="M 440 296 L 440 372 L 486 372 L 486 296"
      stroke={GOLD}
      strokeWidth={1.5}
      fill="none"
      strokeLinejoin="round"
      opacity={0.8}
      variants={lineV}
    />

    {/* Comprobante */}
    <motion.path
      d="M 408 106 L 408 196 L 420 188 L 432 196 L 444 188 L 456 196 L 468 188 L 480 196 L 480 106 Z"
      stroke={GOLD}
      strokeWidth={1.5}
      fill="none"
      strokeLinejoin="round"
      variants={lineV}
    />
    <motion.line x1={420} y1={126} x2={468} y2={126} stroke={SOFT} strokeWidth={1.4} strokeLinecap="round" variants={lineV} />
    <motion.line x1={420} y1={142} x2={468} y2={142} stroke={SOFT} strokeWidth={1.4} strokeLinecap="round" variants={lineV} />
    <motion.line x1={420} y1={158} x2={452} y2={158} stroke={SOFT} strokeWidth={1.4} strokeLinecap="round" variants={lineV} />

    {/* Cobros que se disparan solos */}
    {[0, 1].map((i) => (
      <motion.g key={`coin-${i}`} variants={fadeV}>
        <motion.g
          style={popStyle}
          animate={{ x: [0, 88, 154], y: [0, -100, -152], opacity: [0, 1, 0], scale: [0.5, 1, 0.7] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeOut",
            opacity: { times: [0, 0.3, 1], ease: "linear" },
          }}
        >
          <circle cx={290} cy={296} r={12} stroke={GOLD} strokeWidth={1.5} fill="none" />
          <line x1={290} y1={288} x2={290} y2={304} stroke={GOLD} strokeWidth={1.5} strokeLinecap="round" />
        </motion.g>
      </motion.g>
    ))}

    {/* Reloj: la operacion no se detiene */}
    <motion.circle cx={256} cy={432} r={24} stroke={SOFT} strokeWidth={1.5} fill="none" variants={lineV} />
    <motion.g variants={fadeV}>
      <motion.line
        x1={256}
        y1={432}
        x2={256}
        y2={414}
        stroke={GOLD}
        strokeWidth={1.8}
        strokeLinecap="round"
        style={{ transformOrigin: "256px 432px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.line
        x1={256}
        y1={432}
        x2={256}
        y2={420}
        stroke={SOFT}
        strokeWidth={1.8}
        strokeLinecap="round"
        style={{ transformOrigin: "256px 432px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />
    </motion.g>
  </>
);

/* ══════════════════════════════════════════════════════════════
   02 · ECOSISTEMAS DE IA Y SOFTWARE
   El chip es el nucleo: se traga las fuentes dispersas y las
   devuelve como un tablero que se lee de un vistazo.
   ══════════════════════════════════════════════════════════════ */
const FEEDS: { from: [number, number]; delay: number }[] = [
  { from: [72, 182], delay: 0 },
  { from: [84, 300], delay: 0.7 },
  { from: [240, 446], delay: 1.4 },
];
const CORE: [number, number] = [112, 372];

const SceneEcosystem: React.FC = () => (
  <>
    <Label x={28} y={96} text="DATOS" />
    <Label x={188} y={44} text="TABLERO IA" gold />
    <Label x={492} y={478} text="TIEMPO REAL" anchor="end" />

    {/* Fuente · base de datos */}
    <motion.ellipse cx={72} cy={128} rx={30} ry={10} stroke={SOFT} strokeWidth={1.5} fill="none" variants={lineV} />
    <motion.path d="M 42 128 L 42 172 A 30 10 0 0 0 102 172 L 102 128" stroke={SOFT} strokeWidth={1.5} fill="none" variants={lineV} />
    <motion.path d="M 42 150 A 30 10 0 0 0 102 150" stroke={SOFT} strokeWidth={1.1} fill="none" opacity={0.7} variants={lineV} />

    {/* Fuente · documento */}
    <motion.path d="M 36 232 L 66 232 L 78 244 L 78 300 L 36 300 Z" stroke={SOFT} strokeWidth={1.5} fill="none" strokeLinejoin="round" variants={lineV} />
    <motion.line x1={46} y1={256} x2={68} y2={256} stroke={SOFT} strokeWidth={1.3} strokeLinecap="round" variants={lineV} />
    <motion.line x1={46} y1={270} x2={68} y2={270} stroke={SOFT} strokeWidth={1.3} strokeLinecap="round" variants={lineV} />
    <motion.line x1={46} y1={284} x2={60} y2={284} stroke={SOFT} strokeWidth={1.3} strokeLinecap="round" variants={lineV} />

    {/* Fuente · app */}
    <motion.rect x={218} y={416} width={44} height={62} rx={7} stroke={SOFT} strokeWidth={1.5} fill="none" variants={lineV} />
    <motion.line x1={232} y1={428} x2={248} y2={428} stroke={SOFT} strokeWidth={1.3} strokeLinecap="round" variants={lineV} />
    <motion.circle cx={240} cy={466} r={3.2} stroke={SOFT} strokeWidth={1.3} fill="none" variants={lineV} />

    {/* Cableado */}
    {FEEDS.map((f, i) => (
      <motion.line
        key={`fl-${i}`}
        x1={f.from[0]}
        y1={f.from[1]}
        x2={CORE[0]}
        y2={CORE[1]}
        stroke={SOFT}
        strokeWidth={1.2}
        strokeLinecap="round"
        variants={lineV}
      />
    ))}
    {FEEDS.map((f, i) => (
      <motion.g key={`fd-${i}`} variants={fadeV}>
        <motion.circle
          cx={f.from[0]}
          cy={f.from[1]}
          r={3.6}
          fill={GOLD}
          animate={{ x: [0, CORE[0] - f.from[0]], y: [0, CORE[1] - f.from[1]], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: f.delay,
            ease: "easeIn",
            opacity: { times: [0, 0.12, 0.8, 1], ease: "linear" },
          }}
        />
      </motion.g>
    ))}

    {/* Salida hacia los tableros */}
    <motion.path d="M 112 372 C 146 344 164 322 188 300" stroke={GOLD} strokeWidth={1.3} fill="none" opacity={0.5} variants={lineV} />
    <motion.path d="M 112 372 C 200 408 276 408 340 396" stroke={GOLD} strokeWidth={1.3} fill="none" opacity={0.5} variants={lineV} />
    {[0, 1].map((i) => (
      <motion.g key={`up-${i}`} variants={fadeV}>
        <motion.circle
          cx={112}
          cy={372}
          r={3.4}
          fill={GOLD}
          animate={i === 0 ? { x: [0, 76], y: [0, -72], opacity: [0, 1, 0] } : { x: [0, 228], y: [0, 24], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.9,
            repeat: Infinity,
            delay: 0.4 + i * 0.6,
            ease: "easeOut",
            opacity: { times: [0, 0.25, 1], ease: "linear" },
          }}
        />
      </motion.g>
    ))}

    {/* Tablero principal */}
    <motion.rect x={188} y={60} width={304} height={242} rx={16} stroke={GOLD} strokeWidth={1.6} fill="none" variants={lineV} />
    <motion.line x1={210} y1={92} x2={280} y2={92} stroke={SOFT} strokeWidth={3} strokeLinecap="round" variants={lineV} />
    <motion.circle cx={468} cy={92} r={3.4} fill={GOLD} variants={popV} style={popStyle} />
    <motion.line x1={210} y1={114} x2={210} y2={270} stroke={SOFT} strokeWidth={1.2} variants={lineV} />
    <motion.line x1={210} y1={270} x2={470} y2={270} stroke={SOFT} strokeWidth={1.2} variants={lineV} />

    <motion.g variants={fadeV}>
      <motion.path
        d="M 210 250 L 252 218 L 294 236 L 336 176 L 378 190 L 420 132 L 464 108"
        stroke={GOLD}
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={340}
        animate={{ strokeDashoffset: [340, 0, 0, 340] }}
        transition={{ duration: 6, times: [0, 0.5, 0.86, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx={464}
        cy={108}
        r={5}
        fill={GOLD}
        style={popStyle}
        animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 6, times: [0, 0.48, 0.56, 0.9, 0.96], repeat: Infinity, ease: "easeOut" }}
      />
    </motion.g>

    {/* Tablero secundario */}
    <motion.rect x={340} y={340} width={152} height={114} rx={12} stroke={GOLD} strokeWidth={1.4} fill="none" opacity={0.85} variants={lineV} />
    <motion.circle cx={390} cy={397} r={28} stroke={SOFT} strokeWidth={3} fill="none" variants={lineV} />
    <motion.g variants={fadeV}>
      <motion.circle
        cx={390}
        cy={397}
        r={28}
        stroke={GOLD}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        transform="rotate(-90 390 397)"
        strokeDasharray={176}
        animate={{ strokeDashoffset: [176, 39, 39, 176] }}
        transition={{ duration: 6, times: [0, 0.42, 0.88, 1], repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.g>
    <motion.line x1={432} y1={383} x2={470} y2={383} stroke={SOFT} strokeWidth={2.4} strokeLinecap="round" variants={lineV} />
    <motion.line x1={432} y1={397} x2={462} y2={397} stroke={SOFT} strokeWidth={2.4} strokeLinecap="round" variants={lineV} />
    <motion.line x1={432} y1={411} x2={452} y2={411} stroke={GOLD} strokeWidth={2.4} strokeLinecap="round" variants={lineV} />
  </>
);

/* ══════════════════════════════════════════════════════════════
   03 · CONSULTORIA Y OPTIMIZACION
   El chip se queda quieto y observa. Un escaner recorre el
   proceso, marca los pasos repetidos, esos pasos desaparecen y
   en su lugar encaja una herramienta hecha a medida.
   ══════════════════════════════════════════════════════════════ */
const ROW = 272;
const STEPS = [190, 254, 318, 382, 446];
const BOX = 36;

const Connector: React.FC<{ x: number }> = ({ x }) => (
  <line x1={x - 28} y1={ROW} x2={x} y2={ROW} stroke={SOFT} strokeWidth={1.4} strokeLinecap="round" />
);

const StepBox: React.FC<{ x: number; flagged?: boolean }> = ({ x, flagged }) => (
  <>
    <motion.rect
      x={x}
      y={ROW - BOX / 2}
      width={BOX}
      height={BOX}
      rx={4}
      stroke={SOFT}
      strokeWidth={1.5}
      fill="none"
      animate={flagged ? { stroke: [SOFT, SOFT, GOLD, GOLD] } : { stroke: [SOFT, SOFT] }}
      transition={
        flagged
          ? { duration: L, times: [0, 0.15, 0.2, 1], repeat: Infinity }
          : { duration: L, repeat: Infinity }
      }
    />
    <line x1={x + 9} y1={ROW - 6} x2={x + 27} y2={ROW - 6} stroke={SOFT} strokeWidth={1.2} strokeLinecap="round" />
    <line x1={x + 9} y1={ROW + 6} x2={x + 21} y2={ROW + 6} stroke={SOFT} strokeWidth={1.2} strokeLinecap="round" />
  </>
);

const Ghosts: React.FC<{ x: number; at: number }> = ({ x, at }) => (
  <motion.g animate={{ opacity: [0, 0, 1, 1, 0, 0] }} transition={loop([0, at, at + 0.04, 0.44, 0.48, 1])}>
    {[1, 2].map((n) => (
      <motion.rect
        key={n}
        x={x - n * 7}
        y={ROW - BOX / 2 - n * 7}
        width={BOX}
        height={BOX}
        rx={4}
        stroke={GOLD}
        strokeWidth={1.3}
        fill="none"
        opacity={n === 1 ? 0.5 : 0.24}
        style={popStyle}
        animate={{ scale: [0.86, 1] }}
        transition={{ duration: 0.5, delay: at * L, ease: "easeOut" }}
      />
    ))}
  </motion.g>
);

const SceneConsulting: React.FC = () => (
  <>
    {/* Paso 1 · queda en su sitio */}
    <motion.g variants={fadeV}>
      <motion.g animate={{ opacity: [0, 1, 1, 0] }} transition={loop([0, 0.05, 0.93, 1])}>
        <StepBox x={STEPS[0]} />
      </motion.g>
    </motion.g>

    {/* Pasos repetidos · se marcan y se eliminan */}
    {[1, 3].map((i, n) => (
      <motion.g key={`rep-${i}`} variants={fadeV}>
        <motion.g
          style={popStyle}
          animate={{ opacity: [0, 1, 1, 0, 0], scale: [0.7, 1, 1, 0.2, 0.2] }}
          transition={loop([0, 0.05, 0.44, 0.5, 1])}
        >
          <Connector x={STEPS[i]} />
          <StepBox x={STEPS[i]} flagged />
        </motion.g>
        <Ghosts x={STEPS[i]} at={n === 0 ? 0.15 : 0.27} />
      </motion.g>
    ))}

    {/* Pasos utiles · se juntan */}
    {[2, 4].map((i) => (
      <motion.g key={`keep-${i}`} variants={fadeV}>
        <motion.g
          animate={{ x: [0, 0, -64 * (i === 2 ? 1 : 2), -64 * (i === 2 ? 1 : 2), 0], opacity: [0, 1, 1, 0, 0] }}
          transition={{
            duration: L,
            repeat: Infinity,
            ease: "easeInOut",
            x: { times: [0, 0.5, 0.62, 0.95, 1] },
            opacity: { times: [0, 0.05, 0.93, 0.99, 1] },
          }}
        >
          <Connector x={STEPS[i]} />
          <StepBox x={STEPS[i]} />
        </motion.g>
      </motion.g>
    ))}

    {/* La herramienta a medida · cae y encaja */}
    <motion.g variants={fadeV}>
      <motion.g
        animate={{ y: [-96, -96, 8, 0, 0, -96], opacity: [0, 0, 1, 1, 1, 0] }}
        transition={{
          duration: L,
          repeat: Infinity,
          ease: "easeOut",
          y: { times: [0, 0.6, 0.7, 0.74, 0.93, 1] },
          opacity: { times: [0, 0.6, 0.66, 0.7, 0.93, 1] },
        }}
      >
        <line x1={354} y1={ROW} x2={382} y2={ROW} stroke={GOLD} strokeWidth={1.4} strokeLinecap="round" />
        <rect x={382} y={ROW - BOX / 2} width={BOX} height={BOX} rx={4} stroke={GOLD} strokeWidth={2} fill="none" />
        <circle cx={400} cy={ROW} r={7} stroke={GOLD} strokeWidth={1.8} fill="none" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <line
            key={deg}
            x1={400 + 7.5 * Math.cos((deg * Math.PI) / 180)}
            y1={ROW + 7.5 * Math.sin((deg * Math.PI) / 180)}
            x2={400 + 10.5 * Math.cos((deg * Math.PI) / 180)}
            y2={ROW + 10.5 * Math.sin((deg * Math.PI) / 180)}
            stroke={GOLD}
            strokeWidth={3}
            strokeLinecap="round"
          />
        ))}
      </motion.g>
    </motion.g>

    {/* Escaner de diagnostico */}
    <motion.g variants={fadeV}>
      <motion.g
        animate={{ x: [0, 0, 330, 330, 0], opacity: [0, 1, 1, 0, 0] }}
        transition={{
          duration: L,
          repeat: Infinity,
          ease: "easeInOut",
          x: { times: [0, 0.08, 0.4, 0.46, 1] },
          opacity: { times: [0, 0.09, 0.4, 0.45, 1] },
        }}
      >
        <line x1={172} y1={232} x2={172} y2={312} stroke={GOLD} strokeWidth={1.3} strokeDasharray="4 6" strokeLinecap="round" />
        <circle cx={172} cy={228} r={2.6} fill={GOLD} />
      </motion.g>
    </motion.g>

    {/* Medida del proceso */}
    <motion.g variants={fadeV}>
      <motion.g animate={{ opacity: [0, 1, 1, 0, 0] }} transition={loop([0, 0.06, 0.5, 0.56, 1])}>
        <line x1={190} y1={350} x2={482} y2={350} stroke={SOFT} strokeWidth={1.2} />
        <line x1={190} y1={344} x2={190} y2={356} stroke={SOFT} strokeWidth={1.2} strokeLinecap="round" />
        <line x1={482} y1={344} x2={482} y2={356} stroke={SOFT} strokeWidth={1.2} strokeLinecap="round" />
      </motion.g>
      <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={loop([0, 0.62, 0.7, 0.93, 1])}>
        <line x1={190} y1={350} x2={418} y2={350} stroke={GOLD} strokeWidth={1.4} />
        <line x1={190} y1={344} x2={190} y2={356} stroke={GOLD} strokeWidth={1.4} strokeLinecap="round" />
        <line x1={418} y1={344} x2={418} y2={356} stroke={GOLD} strokeWidth={1.4} strokeLinecap="round" />
        <text x={304} y={382} textAnchor="middle" fill={GOLD} style={useLabelStyle()}>
          MENOS PASOS
        </text>
      </motion.g>
    </motion.g>

    {/* Etiquetas */}
    <motion.g variants={fadeV}>
      <motion.text x={56} y={150} fill={MUTED} style={useLabelStyle()} animate={{ opacity: [0, 1, 1, 0] }} transition={loop([0, 0.06, 0.93, 1])}>
        DIAGNOSTICO
      </motion.text>
      <motion.text
        x={490}
        y={150}
        textAnchor="end"
        fill={GOLD}
        style={useLabelStyle()}
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={loop([0, 0.12, 0.18, 0.5, 0.56, 1])}
      >
        TAREAS REPETITIVAS
      </motion.text>
      <motion.text
        x={490}
        y={150}
        textAnchor="end"
        fill={GOLD}
        style={useLabelStyle()}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={loop([0, 0.64, 0.72, 0.93, 1])}
      >
        HERRAMIENTA A MEDIDA
      </motion.text>
    </motion.g>
  </>
);

/* ══════════════════════════════════════════════════════════════ */
const BODIES = [SceneAutomation, SceneEcosystem, SceneConsulting];

export const ServiceScene: React.FC<{ index: number; compact?: boolean }> = ({ index, compact = false }) => {
  const cfg = SCENES[index] ?? SCENES[0];
  const Body = BODIES[index] ?? BODIES[0];
  return (
    <CompactCtx.Provider value={compact}>
    <motion.svg
      className="absolute inset-0 w-full h-full overflow-visible"
      viewBox={`0 0 ${cfg.vb[0]} ${cfg.vb[1]}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      variants={rootV}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-hidden
    >
      <Body />
    </motion.svg>
    </CompactCtx.Provider>
  );
};

/* alias retrocompatible */
export const ServiceAnimation: React.FC<{ index: number; isMobile?: boolean }> = ({ index }) => (
  <ServiceScene index={index} />
);
