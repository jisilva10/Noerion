import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChipEye } from "../ui/ChipEye";
import { ServiceScene, SCENES } from "./ServiceAnimations";

/* ══════════════════════════════════════════════════════════════
   El chip como personaje.

   parked    · todos dormidos en su repisa
   departing · el elegido rueda sobre su texto y cae al vacio
   onstage    · despierta y protagoniza la animacion del servicio
   returning · la escena se deconstruye y el chip vuelve a dormir
   ══════════════════════════════════════════════════════════════ */

type Phase = "parked" | "departing" | "onstage" | "returning";

interface Feature {
  step: string;
  title?: string;
  content: string;
  image?: string;
}

interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  /** milisegundos que la escena permanece en pantalla (sin contar el vuelo) */
  autoPlayInterval?: number;
}

const HOME = 36;      // tamano del chip dormido, en px
const PARK_MS = 170;
const OUT_MS = 2300;
const IN_MS = 2000;

type Geom = {
  slots: { x: number; y: number }[];
  rolls: number[];
  stage: { x: number; y: number; w: number; h: number };
};

function useIsMobile() {
  const [m, setM] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setM(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

const scaleFrames = (obj: Record<string, number[]>, s: number) => {
  const out: Record<string, number[]> = {};
  for (const k of Object.keys(obj)) {
    out[k] = k === "x" || k === "y" ? obj[k].map((v) => v * s) : obj[k];
  }
  return out;
};

export function FeatureSteps({ features, className, autoPlayInterval = 8000 }: FeatureStepsProps) {
  const [current, setCurrent] = useState(0);
  const [homeIndex, setHomeIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("parked");
  const [progress, setProgress] = useState(0);
  const [geom, setGeom] = useState<Geom | null>(null);
  const [gazeStep, setGazeStep] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const programmaticScrollRef = useRef(false);

  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const isInView = useInView(wrapRef, { amount: 0.25 });

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
    const id = window.setTimeout(measure, 350); // por si las fuentes reflowean
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
  }, [measure, isMobile]);

  // remedir justo antes de cada vuelo
  useLayoutEffect(() => {
    if (phase === "parked" || phase === "onstage") measure();
  }, [phase, measure]);

  /* ─── maquina de estados ───────────────────────────────────── */
  useEffect(() => {
    if (!geom) return;
    if (phase === "parked") {
      if (!isInView) return; // el primer vuelo espera a que la seccion aparezca
      const t = setTimeout(() => setPhase("departing"), PARK_MS);
      return () => clearTimeout(t);
    }
    if (phase === "departing") {
      const t = setTimeout(() => setPhase("onstage"), reduce ? 500 : OUT_MS);
      return () => clearTimeout(t);
    }
    if (phase === "returning") {
      const t = setTimeout(() => {
        setHomeIndex(current);
        setPhase("parked");
      }, reduce ? 420 : IN_MS);
      return () => clearTimeout(t);
    }
  }, [phase, geom, current, reduce, isInView]);

  // el usuario (o el reloj) eligio otro servicio
  useEffect(() => {
    if (phase === "onstage" && current !== homeIndex) {
      setPhase("returning");
      setProgress(0);
    }
  }, [current, phase, homeIndex]);

  /* ─── autoplay: solo corre mientras la escena esta viva ────── */
  useEffect(() => {
    if (!isInView || phase !== "onstage") return;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p < 100) return p + 100 / (autoPlayInterval / 100);
        programmaticScrollRef.current = true;
        setCurrent((c) => (c + 1) % features.length);
        return 0;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [isInView, phase, autoPlayInterval, features.length]);

  /* ─── mirada dirigida ──────────────────────────────────────── */
  useEffect(() => {
    if (phase !== "onstage") return;
    const cfg = SCENES[homeIndex] ?? SCENES[0];
    setGazeStep(0);
    const id = setInterval(() => setGazeStep((g) => g + 1), cfg.gazeMs);
    return () => clearInterval(id);
  }, [phase, homeIndex]);

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

  const select = (i: number, scroll = true) => {
    if (i === current) return;
    if (scroll) programmaticScrollRef.current = true;
    setCurrent(i);
    setProgress(0);
  };

  /* ─── geometria del vuelo ──────────────────────────────────── */
  const flight = useMemo(() => {
    if (!geom || !geom.slots[homeIndex]) return null;
    const cfg = SCENES[homeIndex] ?? SCENES[0];
    const { x: ox, y: oy } = geom.slots[homeIndex];
    const rollEnd = Math.max(geom.rolls[homeIndex], ox + 60);
    const d = rollEnd - ox;

    const s = Math.min(geom.stage.w / cfg.vb[0], geom.stage.h / cfg.vb[1]);
    const tx = geom.stage.x + (geom.stage.w - cfg.vb[0] * s) / 2 + cfg.anchor[0] * s;
    const ty = geom.stage.y + (geom.stage.h - cfg.vb[1] * s) / 2 + cfg.anchor[1] * s;
    const k = (cfg.chip * s) / HOME;
    // salto corto si cae hacia abajo, arco real si tiene que subir
    const apex = Math.max(Math.min(oy, ty) - (ty > oy ? 46 : 78), 14);

    return { ox, oy, rollEnd, d, tx, ty, k, s, apex, cfg };
  }, [geom, homeIndex]);

  const outFrames = useMemo(() => {
    if (!flight) return null;
    const { ox, oy, d, rollEnd, tx, ty, k, apex } = flight;
    if (reduce) {
      return {
        anim: { x: [ox, tx], y: [oy, ty], scale: [1, k], rotate: [0, 540], opacity: [1, 1] },
        t: { duration: 0.5, ease: "easeInOut" } as Transition,
      };
    }
    // rueda sobre su texto (6 vuelcos de 90 grados), salta y aterriza
    return {
      anim: {
        x: [
          ox,
          ox + d * 0.17,
          ox + d * 0.33,
          ox + d * 0.5,
          ox + d * 0.67,
          ox + d * 0.83,
          rollEnd,
          (rollEnd + tx) / 2,
          tx,
          tx,
        ],
        y: [oy, oy, oy, oy, oy, oy, oy, apex, ty + 13, ty],
        rotate: [0, 90, 180, 270, 360, 450, 540, 578, 534, 540],
        scale: [1, 1, 1, 1, 1, 1, 1, (1 + k) / 2, k * 1.06, k],
      },
      t: {
        duration: OUT_MS / 1000,
        times: [0, 0.075, 0.15, 0.225, 0.3, 0.375, 0.45, 0.66, 0.88, 1],
        ease: [
          "easeOut", "easeOut", "easeOut", "easeOut", "easeOut", "easeOut",
          "easeIn", "easeIn", "easeOut",
        ],
      } as Transition,
    };
  }, [flight, reduce]);

  const inFrames = useMemo(() => {
    if (!flight) return null;
    const { ox, oy, d, rollEnd, tx, ty, k, apex } = flight;
    if (reduce) {
      return {
        anim: { x: [tx, ox], y: [ty, oy], scale: [k, 1], rotate: [540, 0] },
        t: { duration: 0.42, ease: "easeInOut" } as Transition,
      };
    }
    // se levanta del escenario y rueda de vuelta a su repisa
    return {
      anim: {
        x: [
          tx,
          tx,
          (tx + rollEnd) / 2,
          rollEnd,
          ox + d * 0.83,
          ox + d * 0.67,
          ox + d * 0.5,
          ox + d * 0.33,
          ox + d * 0.17,
          ox,
        ],
        y: [ty, ty - 16, apex, oy, oy, oy, oy, oy, oy, oy],
        rotate: [540, 548, 540, 540, 450, 360, 270, 180, 90, 0],
        scale: [k, k * 1.04, (1 + k) / 2, 1, 1, 1, 1, 1, 1, 1],
      },
      t: {
        duration: IN_MS / 1000,
        delay: 0.12,
        times: [0, 0.08, 0.28, 0.48, 0.57, 0.66, 0.75, 0.84, 0.92, 1],
        ease: [
          "easeIn", "easeOut", "easeIn", "easeOut",
          "easeOut", "easeOut", "easeOut", "easeOut", "easeOut",
        ],
      } as Transition,
    };
  }, [flight, reduce]);

  const awake = phase === "onstage";
  const chipAway = (i: number) => i === homeIndex && phase !== "parked";

  const gaze = useMemo(() => {
    if (!awake) return null;
    const g = (SCENES[homeIndex] ?? SCENES[0]).gaze;
    return g[gazeStep % g.length];
  }, [awake, homeIndex, gazeStep]);

  const idleAnim = useMemo(() => {
    if (!flight) return { x: 0, y: 0, rotate: 0 };
    return awake ? scaleFrames(flight.cfg.idle, flight.s) : { x: 0, y: 0, rotate: 0 };
  }, [awake, flight]);

  const flyAnim =
    phase === "departing"
      ? outFrames?.anim
      : phase === "returning"
      ? inFrames?.anim
      : flight
      ? { x: flight.tx, y: flight.ty, rotate: 540, scale: flight.k }
      : undefined;

  const flyTrans: Transition =
    phase === "departing"
      ? outFrames?.t ?? {}
      : phase === "returning"
      ? inFrames?.t ?? {}
      : { duration: 0.45, ease: "easeInOut" };

  /* ─── piezas reutilizables ─────────────────────────────────── */
  const Slot = ({ i }: { i: number }) => (
    <div
      ref={(el) => {
        slotRefs.current[i] = el;
      }}
      className="w-9 h-9 relative flex items-center justify-center"
    >
      {chipAway(i) ? (
        <span className="block w-[18px] h-[18px] rounded-[5px] border border-dashed border-border" />
      ) : (
        <span className="transition-transform duration-500 group-hover:-translate-y-[3px]">
          <ChipEye forceAsleep width="36px" height="36px" />
        </span>
      )}
    </div>
  );

  const Stage = ({ h }: { h: string }) => (
    <div ref={stageRef} className={cn("relative w-full", h)}>
      <AnimatePresence>
        {phase === "onstage" && (
          <ServiceScene key={`scene-${homeIndex}`} index={homeIndex} compact={isMobile} />
        )}
      </AnimatePresence>
    </div>
  );

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
                  <Slot i={i} />
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
                    {active && (
                      <div
                        className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Stage h="h-[520px]" />
        </div>
      )}

      {/* ── MOBILE ──────────────────────────────────────────── */}
      {isMobile && (
        <div className="flex flex-col gap-8">
          <Stage h="h-[300px]" />

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
                <Slot i={i} />
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
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === current ? "w-6 bg-gold" : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── EL PERSONAJE ────────────────────────────────────── */}
      {flight && phase !== "parked" && (
        <motion.div
          className="absolute top-0 left-0 z-40 pointer-events-none"
          style={{ width: HOME, height: HOME, marginLeft: -HOME / 2, marginTop: -HOME / 2 }}
          initial={false}
          animate={flyAnim}
          transition={flyTrans}
        >
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            animate={idleAnim}
            transition={awake ? flight.cfg.idleT : { duration: 0.35, ease: "easeInOut" }}
          >
            {/* chispa de aterrizaje */}
            <AnimatePresence>
              {awake && (
                <motion.span
                  key={`spark-${homeIndex}`}
                  className="absolute rounded-full border border-gold"
                  style={{ width: HOME, height: HOME }}
                  initial={{ scale: 0.5, opacity: 0.7 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            <ChipEye
              width={`${HOME}px`}
              height={`${HOME}px`}
              disableInitialSleep
              disableMouseFollow
              forceAsleep={!awake}
              pupilOffset={gaze}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
