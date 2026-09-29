import { motion } from 'framer-motion';
import { IconBrandInstagram } from '@tabler/icons-react';
import { ChipEye } from '../marca/ChipEye';
import { INSTAGRAM } from '../../datos';

/**
 * Quiénes somos: de dónde sale el nombre (brand book, «El origen del
 * nombre») y quién está detrás. Sección de noche: la foto de JIS está en una
 * mesa oscura y la mesa se funde con el fondo.
 */
export function Nosotros() {
  return (
    <section className="nosotros" id="nosotros" data-tema="noche">
      <div className="envoltura">
        <div className="nombre">
          {/* El título es suyo (JIS, 29/9/2026): primero entender, después
              que suceda. Las dos mitades del nombre dicen lo mismo. */}
          <h2 className="titular nombre-titular">
            Primero entender.
            <br />
            <em>Después, que suceda.</em>
          </h2>
          <div className="nombre-partes">
            <motion.div
              className="parte"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <span className="parte-palabra">noerós</span>
              <span className="parte-dice">lo que comprende</span>
            </motion.div>

            <span className="nombre-chip" aria-hidden="true">
              <ChipEye width="100%" height="100%" wakeDelay={600} strokeScale={0.9} />
            </span>

            <motion.div
              className="parte"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.12 }}
            >
              <span className="parte-palabra">-ion</span>
              <span className="parte-dice">lo que se hace</span>
            </motion.div>
          </div>
        </div>

        <div className="fundador">
          <motion.figure
            className="fundador-foto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 70, damping: 20 }}
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
            <p className="ceja clara">El fundador</p>
            <h2 className="fundador-nombre">José Ignacio Silva</h2>
            <p className="fundador-cargo">Fundador y consultor principal · Quito</p>

            <p className="fundador-cuerpo">
              Un negocio de Quito merece las mismas herramientas que usan las empresas
              grandes. Para eso existe Noerion.
            </p>

            <blockquote className="cita">
              «No implementamos inteligencia artificial porque esté de moda. La usamos
              donde entendimos que hace falta.»
            </blockquote>

            <a className="fundador-red" href={INSTAGRAM} target="_blank" rel="noreferrer">
              <IconBrandInstagram size={18} stroke={1.5} />
              @noerion.consulting
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
