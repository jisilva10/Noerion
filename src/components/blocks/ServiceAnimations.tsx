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

/* barrido compartido de la escena 03 (chip y lupa deben ir juntos) */
const SWEEP = 290;
const SWEEP_T: Transition = {
  duration: 8,
  times: [0, 0.45, 0.8, 1],
  repeat: Infinity,
  ease: "easeInOut",
};

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
    anchor: [110, 150],
    chip: 84,
    idle: { x: [0, SWEEP, SWEEP, 0], y: [0, -5, 0, 5] },
    idleT: SWEEP_T,
    gaze: [
      { x: -0.1, y: 0.9 },
      { x: 0.15, y: 0.85 },
      { x: 0.3, y: 0.9 },
      { x: 0, y: 0.8 },
    ],
    gazeMs: 1250,
  },
];

/* ══════════════════════════════════════════════════════════════
   VARIANTES · entra dibujandose, sale deconstruyendose
   ══════════════════════════════════════════════════════════════ */
const rootV: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
  exit: { opacity: 1, transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const lineV: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.85, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2 } },
  },
  exit: {
    pathLength: 0,
    pathOffset: 1,
    opacity: 0,
    transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
  },
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
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 5, times: [0, 0.5, 0.86, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx={464}
        cy={108}
        r={5}
        fill={GOLD}
        style={popStyle}
        animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 5, times: [0, 0.48, 0.56, 0.9, 0.96], repeat: Infinity, ease: "easeOut" }}
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
        animate={{ pathLength: [0, 0.78, 0.78, 0] }}
        transition={{ duration: 5, times: [0, 0.42, 0.88, 1], repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.g>
    <motion.line x1={432} y1={383} x2={470} y2={383} stroke={SOFT} strokeWidth={2.4} strokeLinecap="round" variants={lineV} />
    <motion.line x1={432} y1={397} x2={462} y2={397} stroke={SOFT} strokeWidth={2.4} strokeLinecap="round" variants={lineV} />
    <motion.line x1={432} y1={411} x2={452} y2={411} stroke={GOLD} strokeWidth={2.4} strokeLinecap="round" variants={lineV} />
  </>
);

/* ══════════════════════════════════════════════════════════════
   03 · CONSULTORIA Y OPTIMIZACION
   El chip recorre el proceso con la lupa, marca los bucles que
   se repiten y el enredo se endereza en un camino limpio.
   ══════════════════════════════════════════════════════════════ */
const MESSY =
  "M 56 318 C 120 318 150 292 200 294 C 250 296 250 250 216 252 C 186 254 194 302 238 314 C 278 324 300 324 328 318 C 372 308 384 266 350 266 C 320 266 320 312 364 324 C 404 334 434 320 464 318";

const Repeat: React.FC<{ x: number; times: number[] }> = ({ x, times }) => (
  <motion.g variants={fadeV}>
    <motion.g
      style={popStyle}
      animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.4, 0.4, 1, 1, 0.85] }}
      transition={{ duration: 8, times, repeat: Infinity, ease: "easeOut" }}
    >
      <path
        d={`M ${x - 13} 232 A 13 13 0 1 1 ${x - 2} 245`}
        stroke={GOLD}
        strokeWidth={1.9}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M ${x - 8} 239 L ${x - 2} 245 L ${x - 9} 250`}
        stroke={GOLD}
        strokeWidth={1.9}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.g>
  </motion.g>
);

const SceneConsulting: React.FC = () => (
  <>
    {/* Proceso enredado: se dibuja, se sostiene y se repliega */}
    <motion.g variants={fadeV}>
      <motion.path
        d={MESSY}
        stroke={SOFT}
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
        animate={{ pathLength: [0, 1, 1, 0, 0] }}
        transition={{ duration: 8, times: [0, 0.1, 0.5, 0.6, 1], repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.g>

    <Repeat x={224} times={[0, 0.09, 0.15, 0.46, 0.52]} />
    <Repeat x={352} times={[0, 0.29, 0.35, 0.46, 0.52]} />

    {/* Camino limpio */}
    <motion.g variants={fadeV}>
      <motion.path
        d="M 56 318 L 448 318"
        stroke={GOLD}
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
        animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 8, times: [0, 0.48, 0.64, 0.88, 0.95], repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 440 310 L 460 318 L 440 326"
        stroke={GOLD}
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 8, times: [0, 0.62, 0.68, 0.88, 0.95], repeat: Infinity, ease: "easeOut" }}
      />
      {[158, 256, 354].map((cx, i) => (
        <motion.circle
          key={`ms-${i}`}
          cx={cx}
          cy={318}
          r={4.5}
          fill={GOLD}
          style={popStyle}
          animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: 8,
            times: [0, 0.52 + i * 0.03, 0.6 + i * 0.03, 0.88, 0.94],
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Antes / despues */}
      <motion.rect
        x={340}
        y={414}
        width={124}
        height={8}
        rx={4}
        fill={SOFT}
        style={{ transformBox: "fill-box", transformOrigin: "left center" }}
        animate={{ scaleX: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 8, times: [0, 0.62, 0.7, 0.88, 0.94], repeat: Infinity, ease: "easeOut" }}
      />
      <motion.rect
        x={340}
        y={432}
        width={48}
        height={8}
        rx={4}
        fill={GOLD}
        style={{ transformBox: "fill-box", transformOrigin: "left center" }}
        animate={{ scaleX: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 8, times: [0, 0.66, 0.74, 0.88, 0.94], repeat: Infinity, ease: "easeOut" }}
      />
      <motion.text
        x={464}
        y={470}
        textAnchor="end"
        fill={MUTED}
        style={useLabelStyle()}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 8, times: [0, 0.68, 0.76, 0.88, 0.94], repeat: Infinity }}
      >
        MENOS PASOS
      </motion.text>
    </motion.g>

    {/* Etiquetas que se relevan */}
    <motion.g variants={fadeV}>
      <motion.text
        x={56}
        y={404}
        fill={MUTED}
        style={useLabelStyle()}
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{ duration: 8, times: [0, 0.46, 0.54, 0.92, 0.98], repeat: Infinity }}
      >
        PROCESO ACTUAL
      </motion.text>
      <motion.text
        x={56}
        y={404}
        fill={GOLD}
        style={useLabelStyle()}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 8, times: [0, 0.56, 0.66, 0.88, 0.94], repeat: Infinity }}
      >
        OPTIMIZADO
      </motion.text>
      <motion.text
        x={464}
        y={404}
        textAnchor="end"
        fill={GOLD}
        style={useLabelStyle()}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 8, times: [0, 0.13, 0.19, 0.46, 0.52], repeat: Infinity }}
      >
        TAREAS REPETITIVAS
      </motion.text>
    </motion.g>

    {/* Lupa · viaja pegada al chip */}
    <motion.g variants={fadeV}>
      <motion.g animate={{ x: [0, SWEEP, SWEEP, 0] }} transition={SWEEP_T}>
        <line x1={156} y1={240} x2={156} y2={306} stroke={GOLD} strokeWidth={1.1} strokeDasharray="3 6" opacity={0.55} />
        <circle cx={156} cy={212} r={27} stroke={GOLD} strokeWidth={2} fill="none" />
        <line x1={137} y1={231} x2={120} y2={248} stroke={GOLD} strokeWidth={3} strokeLinecap="round" />
      </motion.g>
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
