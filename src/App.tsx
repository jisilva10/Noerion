import { MotionConfig } from 'framer-motion';
import { Barra } from './components/secciones/Barra';
import { Inicio } from './components/secciones/Inicio';
import { Aparatos } from './components/secciones/Aparatos';
import { Explora } from './components/secciones/Explora';
import { Proceso } from './components/secciones/Proceso';
import { Preguntas } from './components/secciones/Preguntas';
import { Nosotros } from './components/secciones/Nosotros';
import { Cierre } from './components/secciones/Cierre';

/**
 * La portada: la promesa (el reporte de las 7:00), qué hacemos en un solo
 * módulo con pestañas, lo que nos diferencia, cómo trabajamos, quién está
 * detrás, las preguntas y la invitación. Nada depende del scroll.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="saltar" href="#servicios">
        Saltar al contenido
      </a>
      <Barra />
      <main>
        <Inicio />
        <Explora />
        <Aparatos />
        <Proceso />
        <Nosotros />
        <Preguntas />
      </main>
      <Cierre />
    </MotionConfig>
  );
}
