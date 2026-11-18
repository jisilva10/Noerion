import { MotionConfig } from 'framer-motion';
import { Barra } from './components/secciones/Barra';
import { Inicio } from './components/secciones/Inicio';
import { Sistemas } from './components/secciones/Sistemas';
import { Nosotros } from './components/secciones/Nosotros';
import { Cierre } from './components/secciones/Cierre';

/**
 * La portada, cuatro pantallas y nada más (JIS, 18/11/2026): el ojo, los tres
 * sistemas con la consultoría, quién soy y el pie.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="saltar" href="#sistemas">
        Saltar al contenido
      </a>
      <Barra />
      <main>
        <Inicio />
        <Sistemas />
        <Nosotros />
      </main>
      <Cierre />
    </MotionConfig>
  );
}
