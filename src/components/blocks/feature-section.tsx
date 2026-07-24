import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChipEye } from "../ui/ChipEye";
import { ServiceScene, SCENES } from "./ServiceAnimations";
import type { SceneConfig } from "./ServiceAnimations";

/* ══════════════════════════════════════════════════════════════
   El chip como personaje.

   Cada servicio tiene su chip dormido en la repisa, encima de su
   texto. El elegido rueda sobre el texto, cae al marco de la
   derecha y despierta. Al cambiar de servicio el que estaba
   vuelve a su sitio y el nuevo ya salio: los dos se cruzan.
   ══════════════════════════════════════════════════════════════ */

const BASE = 100;   // caja del chip volador; siempre se escala hacia abajo, nunca se pixela
const HOME_PX = 36; // tamano del chip dormido
const H = HOME_PX / BASE;

const PARK_MS = 160;
const OUT_MS = 2400;
const IN_MS = 2200;
const OVERLAP_MS = 650; // lo que espera el nuevo antes de salir

type Mode = "hidden" | "out" | "stage" | "in";

type Geo = {
  ox: number;
  oy: number;
  rollEnd: number;
  d: number;
  tx: number;
  ty: number;
  k: number;
  s: number;
  apex: number;
  cfg: SceneConfig;
};

interface Feature {
  step: string;
  title?: string;
  content: string;
  image?: string;
}

interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  /** ms que la escena permanece en pantalla, sin contar los vuelos */
  autoPlayInterval?: number;
}

const T = (x: number, y: number, r: number, sc: number) => ({ x, y, rotate: r, scale: sc });

function outFrames(g: Geo, reduce: boolean) {
  const { ox, oy, d, rollEnd, tx, ty, k, apex } = g;
  if (reduce) {
    return {
      anim: { x: [ox, tx], y: [oy, ty], rotate: [0, 360], scale: [H, k], opacity: [1, 1] },
      t: { duration: 0.5, ease: "easeInOut" } as Transition,
    };
  }
  return {
    anim: {
      x: [ox, ox + d * 0.5, rollEnd, (rollEnd + tx) / 2, tx, tx],
      y: [oy, oy, oy, apex, ty + 6, ty],
      rotate: [0, 180, 360, 384, 354, 360],
      scale: [H, H, H, (H + k) / 2, k * 1.02, k],
      opacity: [1, 1, 1, 1, 1, 1],
    },
    t: {
      duration: OUT_MS / 1000,
      times: [0, 0.24, 0.48, 0.71, 0.91, 1],
      ease: ["easeIn", "linear", "easeIn", "easeIn", "easeOut"],
    } as Transition,
  };
}

function inFrames(g: Geo, reduce: boolean) {
  const { ox, oy, d, rollEnd, tx, ty, k, apex } = g;
  if (reduce) {
    return {
      anim: { x: [tx, ox], y: [ty, oy], rotate: [360, 0], scale: [k, H], opacity: [1, 1] },
      t: { duration: 0.42, ease: "easeInOut" } as Transition,
    };
  }
  return {
    anim: {
      x: [tx, tx, (tx + rollEnd) / 2, rollEnd, ox + d * 0.5, ox],
      y: [ty, ty - 10, apex, oy, oy, oy],
      rotate: [360, 372, 360, 360, 180, 0],
      scale: [k, k * 1.02, (H + k) / 2, H, H, H],
      opacity: [1, 1, 1, 1, 1, 1],
    },
    t: {
      duration: IN_MS / 1000,
      times: [0, 0.1, 0.35, 0.58, 0.8, 1],
      ease: ["easeOut", "easeIn", "easeOut", "linear", "easeOut"],
    } as Transition,
  };
}

const scaleFrames = (obj: Record<string, number[]>, s: number) => {
  const out: Record<string, number[]> = {};
  for (const k of Object.keys(obj)) out[k] = k === "x" || k === "y" ? obj[k].map((v) => v * s) : obj[k];
  return out;
};

/* ─── el personaje ──────────────────────────────────────────── */
const Flyer: React.FC<{ g: Geo; mode: Mode; reduce: boolean }> = ({ g, mode, reduce }) => {
  const [wake, setWake] = useState(mode === "in");
  const [gz, setGz] = useState(0);

  useEffect(() => {
    if (mode === "stage") {
      setWake(true);
      return;
    }
    if (mode === "in") {
      setWake(true);
      const t = setTimeout(() => setWake(false), 90);
      return () => clearTimeout(t);
    }
    setWake(false);
  }, [mode]);

  useEffect(() => {
    if (mode !== "stage") return;
    setGz(0);
    const id = setInterval(() => setGz((v) => v + 1), g.cfg.gazeMs);
    return () => clearInterval(id);
  }, [mode, g.cfg]);

  const out = useMemo(() => outFrames(g, reduce), [g, reduce]);
  const back = useMemo(() => inFrames(g, reduce), [g, reduce]);

  const anim =
    mode === "out"
      ? out.anim
      : mode === "in"
      ? back.anim
      : mode === "stage"
      ? { ...T(g.tx, g.ty, 360, g.k), opacity: 1 }
      : { ...T(g.ox, g.oy, 0, H), opacity: 0 };

  const trans: Transition =
    mode === "out" ? out.t : mode === "in" ? back.t : { duration: mode === "stage" ? 0.3 : 0 };

  const gaze = mode === "stage" ? g.cfg.gaze[gz % g.cfg.gaze.length] : null;
  const idle = mode === "stage" ? scaleFrames(g.cfg.idle, g.s) : { x: 0, y: 0, rotate: 0 };

  return (
    <motion.div
      className="absolute top-0 left-0 z-40 pointer-events-none"
      style={{ width: BASE, height: BASE, marginLeft: -BASE / 2, marginTop: -BASE / 2, willChange: "transform" }}
      initial={mode === "in" ? { ...T(g.tx, g.ty, 360, g.k), opacity: 1 } : false}
      animate={anim}
      transition={trans}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={idle}
        transition={mode === "stage" ? g.cfg.idleT : { duration: 0.35, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {mode === "stage" && (
            <motion.span
              key="spark"
              className="absolute rounded-full border border-gold"
              style={{ width: BASE * 0.6, height: BASE * 0.6 }}
              initial={{ scale: 0.5, opacity: 0.7 }}
              animate={{ scale: 2.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
        <ChipEye width={`${BASE}px`} height={`${BASE}px`} disableInitialSleep disableMouseFollow forceAsleep={!wake} pupilOffset={gaze} />
      </motion.div>
    </motion.div>
  );
};

/* ─── marco del escenario ───────────────────────────────────── */
const StageFrame = () => (
  <>
    <div className="absolute inset-0 rounded-[20px] border border-border/70 bg-white/50" />
    {[
      "left-4 top-4 border-l border-t",
      "right-4 top-4 border-r border-t",
      "left-4 bottom-4 border-l border-b",
      "right-4 bottom-4 border-r border-b",
    ].map((c, i) => (
      <span key={i} className={cn("absolute w-3 h-3 border-gold/60", c)} />
    ))}
  </>
);

function useIsMobile() {
  const [m, setM] = useState(() => (typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false));
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setM(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

type RawGeom = {
  slots: { x: number; y: number }[];
  rolls: number[];
  stage: { x: number; y: number; w: number; h: number };
};

export function FeatureSteps({ features, className, autoPlayInterval = 12000 }: FeatureStepsProps) {
  const [current, setCurrent] = useState(0);
  const [stageIdx, setStageIdx] = useState<number | null>(null);
  const [outIdx, setOutIdx] = useState<number | null>(null);
  const [backIdx, setBackIdx] = useState<number | null>(null);
  const [geom, setGeom] = useState<RawGeom | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const programmaticScrollRef = useRef(false);
  const currentRef = useRef(0);
  currentRef.current = current;

  const isMobile = useIsMobile();
  const reduce = !!useReducedMotion();
  const isInView = useInView(wrapRef, { amount: 0.45 });

  /* ─── medicion ─────────────────────────────────────────────── */
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;
    const W = wrap.getBoundingClientRect();
    const S = stage.getBoundingClientRect();
    const slots: { x: number; y: number }[] = [];
    const rolls: number[] = [];
    for (let i = 0; i < features.length; i++) {
      const sl = slotRefs.current[i];
      const rw = rowRefs.current[i];
      if (!sl || !rw) return;
      const r = sl.getBoundingClientRect();
      const rr = rw.getBoundingClientRect();
      slots.push({ x: r.left - W.left + r.width / 2, y: r.top - W.top + r.height / 2 });
      rolls.push(rr.left - W.left + rr.width * 0.74);
    }
    setGeom({ slots, rolls, stage: { x: S.left - W.left, y: S.top - W.top, w: S.width, h: S.height } });
  }, [features.length]);

  useLayoutEffect(() => {
    measure();
    const id = window.setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
  }, [measure, isMobile]);

  const geos = useMemo<Geo[] | null>(() => {
    if (!geom) return null;
    return features.map((_, i) => {
      const cfg = SCENES[i] ?? SCENES[0];
      const slot = geom.slots[i] ?? { x: 0, y: 0 };
      const rollEnd = Math.max(geom.rolls[i] ?? 0, slot.x + 60);
      const s = Math.min(geom.stage.w / cfg.vb[0], geom.stage.h / cfg.vb[1]);
      const tx = geom.stage.x + (geom.stage.w - cfg.vb[0] * s) / 2 + cfg.anchor[0] * s;
      const ty = geom.stage.y + (geom.stage.h - cfg.vb[1] * s) / 2 + cfg.anchor[1] * s;
      const apex = Math.max(Math.min(slot.y, ty) - (ty > slot.y ? 32 : 56), 12);
      return {
        ox: slot.x,
        oy: slot.y,
        rollEnd,
        d: rollEnd - slot.x,
        tx,
        ty,
        k: (cfg.chip * s) / BASE,
        s,
        apex,
        cfg,
      };
    });
  }, [geom, features.length]);

  /* ─── coreografia ──────────────────────────────────────────── */
  useEffect(() => {
    if (!geos || !isInView) return;
    if (stageIdx !== null || outIdx !== null || backIdx !== null) return;
    const t = setTimeout(() => setOutIdx(currentRef.current), PARK_MS);
    return () => clearTimeout(t);
  }, [geos, isInView, stageIdx, outIdx, backIdx]);

  useEffect(() => {
    if (outIdx === null) return;
    const t = setTimeout(() => {
      setStageIdx(outIdx);
      setOutIdx(null);
    }, reduce ? 520 : OUT_MS);
    return () => clearTimeout(t);
  }, [outIdx, reduce]);

  // el que estaba se va; el nuevo sale un poco despues, sin esperar a que llegue
  useEffect(() => {
    if (backIdx === null) return;
    const t1 = setTimeout(() => setOutIdx(currentRef.current), reduce ? 120 : OVERLAP_MS);
    const t2 = setTimeout(() => setBackIdx(null), (reduce ? 440 : IN_MS) + 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [backIdx, reduce]);

  useEffect(() => {
    if (stageIdx === null || current === stageIdx) return;
    setBackIdx(stageIdx);
    setStageIdx(null);
  }, [current, stageIdx]);

  useEffect(() => {
    if (stageIdx === null || !isInView) return;
    const t = setTimeout(() => {
      programmaticScrollRef.current = true;
      setCurrent((c) => (c + 1) % features.length);
    }, autoPlayInterval);
    return () => clearTimeout(t);
  }, [stageIdx, isInView, autoPlayInterval, features.length]);

  /* ─── slider movil ─────────────────────────────────────────── */
  useEffect(() => {
    if (!programmaticScrollRef.current || !isMobile) return;
    const el = document.getElementById(`svc-card-${current}`);
    const slider = sliderRef.current;
    if (el && slider) {
      slider.scrollTo({
        left: el.offsetLeft - slider.offsetLeft - slider.clientWidth / 2 + el.clientWidth / 2,
        behavior: "smooth",
      });
    }
    programmaticScrollRef.current = false;
  }, [current, isMobile]);

  const select = (i: number, scroll = true) => {
    if (i === current) return;
    if (scroll) programmaticScrollRef.current = true;
    setCurrent(i);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    const c = e.currentTarget;
    let closest = 0;
    let min = Infinity;
    Array.from(c.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const center = el.offsetLeft - c.offsetLeft + el.clientWidth / 2;
      const diff = Math.abs(center - (c.scrollLeft + c.clientWidth / 2));
      if (diff < min) {
        min = diff;
        closest = i;
      }
    });
    if (closest !== current) select(closest, false);
    requestAnimationFrame(measure);
  };

  const away = (i: number) => i === stageIdx || i === outIdx || i === backIdx;
  const actorIdx = outIdx ?? stageIdx;
  const actorMode: Mode = outIdx !== null ? "out" : stageIdx !== null ? "stage" : "hidden";
  const scene = stageIdx;

  return (
    <div ref={wrapRef} className={cn("relative w-full max-w-[1400px] mx-auto", className)}>
      {/* ── DESKTOP ─────────────────────────────────────────── */}
      {!isMobile && (
        <div className="grid grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] gap-20 items-center">
          <div className="flex flex-col gap-10">
            {features.map((f, i) => {
              const active = i === current;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  onClick={() => select(i)}
                  className="group cursor-pointer select-none"
                >
                  <div
                    ref={(el) => {
                      slotRefs.current[i] = el;
                    }}
                    className="w-9 h-9 relative flex items-center justify-center"
                  >
                    {away(i) ? (
                      <span className="block w-[18px] h-[18px] rounded-[5px] border border-dashed border-border" />
                    ) : (
                      <span className="transition-transform duration-500 group-hover:-translate-y-[3px]">
                        <ChipEye forceAsleep width={`${HOME_PX}px`} height={`${HOME_PX}px`} />
                      </span>
                    )}
                  </div>
                  <h3
                    className={cn(
                      "text-2xl font-semibold font-cormorant mt-3 transition-colors duration-500",
                      active ? "text-dark" : "text-mid group-hover:text-dark/80"
                    )}
                  >
                    {f.title || f.step}
                  </h3>
                  <p
                    className={cn(
                      "text-base font-sans mt-2.5 leading-relaxed transition-colors duration-500",
                      active ? "text-mid" : "text-mid/55"
                    )}
                  >
                    {f.content}
                  </p>
                  <div className="mt-4 h-px w-full bg-border/70 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gold"
                      initial={{ width: "0%" }}
                      animate={{ width: active && stageIdx === i ? "100%" : "0%" }}
                      transition={{ duration: active && stageIdx === i ? autoPlayInterval / 1000 : 0.3, ease: "linear" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={stageRef} className="relative w-full h-[520px]">
            <StageFrame />
            <AnimatePresence>
              {scene !== null && <ServiceScene key={`scene-${scene}`} index={scene} compact={false} />}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ── MOBILE ──────────────────────────────────────────── */}
      {isMobile && (
        <div className="flex flex-col gap-8">
          <div ref={stageRef} className="relative w-full h-[320px]">
            <StageFrame />
            <AnimatePresence>
              {scene !== null && <ServiceScene key={`scene-${scene}`} index={scene} compact />}
            </AnimatePresence>
          </div>

          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 px-1"
            onScroll={handleScroll}
          >
            {features.map((f, i) => (
              <div
                key={i}
                id={`svc-card-${i}`}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                onClick={() => select(i)}
                className="group flex flex-col w-[85%] shrink-0 snap-center cursor-pointer"
              >
                <div
                  ref={(el) => {
                    slotRefs.current[i] = el;
                  }}
                  className="w-9 h-9 relative flex items-center justify-center"
                >
                  {away(i) ? (
                    <span className="block w-[18px] h-[18px] rounded-[5px] border border-dashed border-border" />
                  ) : (
                    <ChipEye forceAsleep width={`${HOME_PX}px`} height={`${HOME_PX}px`} />
                  )}
                </div>
                <h3 className="text-xl font-semibold font-cormorant text-dark mt-3">{f.title || f.step}</h3>
                <p
                  className={cn(
                    "text-[15px] font-sans mt-2 leading-relaxed transition-opacity duration-300",
                    i === current ? "text-mid opacity-100" : "text-mid opacity-45"
                  )}
                >
                  {f.content}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 w-full">
            {features.map((_, i) => (
              <div key={i} className={cn("h-1.5 rounded-full transition-all duration-500", i === current ? "w-6 bg-gold" : "w-1.5 bg-border")} />
            ))}
          </div>
        </div>
      )}

      {/* ── los dos chips ───────────────────────────────────── */}
      {geos && actorIdx !== null && <Flyer g={geos[actorIdx]} mode={actorMode} reduce={reduce} />}
      {geos && backIdx !== null && <Flyer key={`back-${backIdx}`} g={geos[backIdx]} mode="in" reduce={reduce} />}
    </div>
  );
}
