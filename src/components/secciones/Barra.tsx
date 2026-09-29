import { useEffect, useRef, useState } from 'react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { Logo } from '../marca/Logo';
import { WA_GENERAL } from '../../datos';

const ENLACES = [
  { href: '#servicios', t: 'Qué hacemos' },
  { href: '#proceso', t: 'Cómo trabajamos' },
  { href: '#nosotros', t: 'Nosotros' },
  { href: '#preguntas', t: 'Preguntas' },
];

/**
 * La barra de arriba. Es cristal: toma el tono de lo que tiene debajo. Cuando
 * pasa por encima de una sección de noche (`data-tema="noche"`) se vuelve
 * oscura y el logo pasa a crema, para no desaparecer.
 */
export function Barra() {
  const [noche, setNoche] = useState(false);
  const [bajo, setBajo] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const mirar = () => {
      raf.current = 0;
      setBajo(window.scrollY > 12);
      const debajo = document
        .elementsFromPoint(window.innerWidth / 2, 36)
        .find((el) => !el.closest('.barra'));
      setNoche(!!debajo?.closest('[data-tema="noche"]'));
    };
    const alMover = () => {
      if (!raf.current) raf.current = requestAnimationFrame(mirar);
    };
    mirar();
    window.addEventListener('scroll', alMover, { passive: true });
    window.addEventListener('resize', alMover);
    return () => {
      window.removeEventListener('scroll', alMover);
      window.removeEventListener('resize', alMover);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : '';
    if (!abierto) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [abierto]);

  return (
    <header
      className={`barra ${noche ? 'es-noche' : ''} ${bajo ? 'bajo' : ''} ${abierto ? 'abierta' : ''}`}
    >
      <div className="barra-dentro">
        <a className="barra-logo" href="#inicio" aria-label="Noerion, ir al inicio">
          <Logo tinta={noche && !abierto ? '#F4F1EB' : '#18180F'} />
        </a>

        <nav className="barra-enlaces" aria-label="Secciones">
          {ENLACES.map((e) => (
            <a key={e.href} href={e.href}>
              {e.t}
            </a>
          ))}
        </nav>

        <a className="barra-cta" href={WA_GENERAL} target="_blank" rel="noreferrer">
          <IconBrandWhatsapp size={17} stroke={1.6} />
          <span>Escríbenos</span>
        </a>

        <button
          className="barra-menu"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          onClick={() => setAbierto((a) => !a)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="barra-hoja" aria-hidden={!abierto} inert={!abierto}>
        <nav aria-label="Secciones">
          {ENLACES.map((e, i) => (
            <a
              key={e.href}
              href={e.href}
              style={{ transitionDelay: `${60 + i * 45}ms` }}
              onClick={() => setAbierto(false)}
            >
              {e.t}
            </a>
          ))}
        </nav>
        <a className="boton boton-tinta" href={WA_GENERAL} target="_blank" rel="noreferrer">
          <IconBrandWhatsapp size={20} stroke={1.6} />
          Escríbenos por WhatsApp
        </a>
      </div>
    </header>
  );
}
