import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { whatsapp } from '../../datos';

/**
 * Haz la cuenta (carrusel 12): «El tamaño no decide si automatizar. Decide
 * cuántas veces repites la misma tarea.» Dos perillas, y la respuesta en
 * horas y en días de trabajo. El dibujo cuenta lo mismo que la cifra: un
 * cuadrito por día de trabajo del mes. Sin plata: esto no es un precio.
 */

const DIAS_DEL_MES = 22;
const HORAS_DIA = 8;
const SEMANAS_MES = 52 / 12;

const coma = (n: number, dec = 1) =>
  n.toLocaleString('es-EC', { minimumFractionDigits: dec, maximumFractionDigits: dec });

function Cifra({ valor }: { valor: number }) {
  const mv = useMotionValue(valor);
  const texto = useTransform(mv, (v) => coma(v));
  useEffect(() => {
    const c = animate(mv, valor, { type: 'spring', stiffness: 120, damping: 20 });
    return c.stop;
  }, [valor, mv]);
  return <motion.span>{texto}</motion.span>;
}

export function Calculadora() {
  const [veces, setVeces] = useState(6);
  const [minutos, setMinutos] = useState(20);

  const horasMes = (veces * minutos * SEMANAS_MES) / 60;
  const dias = horasMes / HORAS_DIA;
  const candidata = horasMes > 2;

  const veredicto = !candidata
    ? 'Todavía no. Mira otra tarea que repitas más.'
    : dias >= DIAS_DEL_MES
      ? 'Es un sueldo entero haciendo lo mismo.'
      : dias >= 1.5
        ? `Son ${coma(dias)} días de trabajo al mes, en una sola tarea.`
        : dias >= 1
          ? 'Es un día de trabajo al mes, en una sola tarea.'
          : 'Ya vale la pena. Pasa de dos horas al mes.';

  const mensaje = whatsapp(
    `Hola, tengo una tarea que hago ${veces} ${veces === 1 ? 'vez' : 'veces'} por semana y me toma ${minutos} minutos. Son unas ${coma(horasMes)} horas al mes. ¿Vale la pena automatizarla?`
  );

  return (
    <div className="calc">
        <div className="cuenta-texto">
          <h3 className="modulo-titular">
            El tamaño de tu empresa no decide. <em>Lo que repites, sí.</em>
          </h3>
          <p className="modulo-bajada">Piensa en una tarea que haces igual cada semana.</p>

          <div className="perillas">
            <label className="perilla">
              <span className="perilla-cabeza">
                <span>Veces por semana</span>
                <b>{veces}</b>
              </span>
              <input
                type="range"
                min={1}
                max={30}
                value={veces}
                onChange={(e) => setVeces(+e.target.value)}
                style={{ ['--p' as string]: `${((veces - 1) / 29) * 100}%` }}
              />
            </label>
            <label className="perilla">
              <span className="perilla-cabeza">
                <span>Minutos cada vez</span>
                <b>{minutos}</b>
              </span>
              <input
                type="range"
                min={5}
                max={90}
                step={5}
                value={minutos}
                onChange={(e) => setMinutos(+e.target.value)}
                style={{ ['--p' as string]: `${((minutos - 5) / 85) * 100}%` }}
              />
            </label>
          </div>
        </div>

        <div className="cuenta-resultado" aria-live="polite">
          <p className="resultado-rotulo">Horas al mes · un cuadrito es un día</p>
          <p className="resultado-cifra">
            <Cifra valor={horasMes} />
            <span className="resultado-unidad">horas</span>
          </p>

          <div className="mes" aria-label={`${coma(dias)} de ${DIAS_DEL_MES} días de trabajo del mes`}>
            {Array.from({ length: DIAS_DEL_MES }).map((_, i) => {
              const lleno = Math.max(0, Math.min(1, dias - i));
              return (
                <span key={i} className="dia">
                  <motion.i
                    initial={false}
                    animate={{ scaleY: lleno }}
                    transition={{ type: 'spring', stiffness: 200, damping: 24, delay: i * 0.012 }}
                  />
                </span>
              );
            })}
          </div>

          <p className={`veredicto ${candidata ? 'si' : ''}`}>
            <span className="veredicto-marca">{candidata ? '✓' : '·'}</span>
            {veredicto}
          </p>

          <a className="boton boton-crema" href={mensaje} target="_blank" rel="noreferrer">
            <IconBrandWhatsapp size={20} stroke={1.6} />
            Mándanos esta tarea
          </a>
        </div>
    </div>
  );
}
