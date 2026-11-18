import { useEffect, useRef, useState } from 'react';

/**
 * El paso en que va una mini demo. Avanza solo, vuelve a empezar y se detiene
 * mientras la demo no se ve (para no gastar batería en el celular). Con
 * «reducir movimiento», o mientras su panel está cerrado, se queda quieta en
 * `quieto`, el paso que mejor la resume.
 */
export function useCiclo(pasos: number[], quieto: number, activo = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [paso, setPaso] = useState(0);
  const [visible, setVisible] = useState(false);
  const [calma] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    if (calma || !visible || !activo) {
      setPaso(0);
      return;
    }
    const t = window.setTimeout(() => setPaso((p) => (p + 1) % pasos.length), pasos[paso]);
    return () => window.clearTimeout(t);
  }, [paso, visible, calma, pasos, activo]);

  return { ref, paso: calma || !activo ? quieto : paso };
}
