import { motion } from 'framer-motion';
import { IconBrandInstagram } from '@tabler/icons-react';
import { LogoPartido } from '../marca/LogoPartido';
import { INSTAGRAM } from '../../datos';

const entra = (d: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { type: 'spring' as const, stiffness: 100, damping: 20, delay: d },
});

/**
 * Quién soy, en una sola pantalla (JIS, 18/11/2026: «me gusta mucho el que
 * tengo, solo mejóralo»). La foto de la mesa oscura se funde con la noche;
 * al lado, su frase, el logo que se parte en noerós e -ion y quién es. Nada
 * se mueve solo aquí: el ojo vivo es solo el del inicio.
 */
export function Nosotros() {
  return (
    <section className="nosotros" id="nosotros" data-tema="noche">
      <div className="envoltura nosotros-dentro">
        <motion.figure
          className="fundador-foto"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1] }}
        >
          <img
            src="/fundador-jis.jpg"
            alt="José Ignacio Silva, fundador de Noerion, sentado en una mesa"
            width={900}
            height={1598}
            loading="lazy"
            decoding="async"
          />
        </motion.figure>

        <div className="fundador-texto">
          <motion.p className="ceja clara" {...entra(0)}>
            Quién soy
          </motion.p>
          <motion.h2 className="nosotros-titular" {...entra(0.06)}>
            Primero entender.
            <em>Después, que suceda.</em>
          </motion.h2>

          <motion.div className="nombre-logo" {...entra(0.14)}>
            <LogoPartido />
          </motion.div>

          <motion.div className="fundador-firma" {...entra(0.22)}>
            <p className="fundador-nombre">José Ignacio Silva</p>
            <p className="fundador-cargo">Fundador · Quito</p>
          </motion.div>

          <motion.blockquote className="cita" {...entra(0.3)}>
            «No implemento inteligencia artificial porque esté de moda. La uso donde entiendo que
            hace falta.»
          </motion.blockquote>

          <motion.a className="fundador-red" href={INSTAGRAM} target="_blank" rel="noreferrer" {...entra(0.36)}>
            <IconBrandInstagram size={18} stroke={1.5} />
            @noerion.consulting
          </motion.a>
        </div>
      </div>
    </section>
  );
}
