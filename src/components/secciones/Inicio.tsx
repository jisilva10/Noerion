import { motion } from 'framer-motion';
import { IconArrowDown, IconBrandWhatsapp } from '@tabler/icons-react';
import { Telefono } from '../piezas/Telefono';
import { WA_GENERAL } from '../../datos';

const entra = (d: number) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { type: 'spring' as const, stiffness: 120, damping: 22, delay: d },
});

/**
 * La primera pantalla. Papel con luz de ventana entrando por la persiana
 * (la misma luz del video 30, «Del cuaderno al sistema»), la promesa en
 * grande y el teléfono cumpliéndola al lado.
 */
export function Inicio() {
  return (
    <section className="inicio" id="inicio">
      <div className="luz-ventana" aria-hidden="true" />

      <div className="inicio-dentro envoltura">
        <div className="inicio-texto">
          <motion.p className="ceja" {...entra(0.05)}>
            IA y automatización · Quito
          </motion.p>

          <h1 className="inicio-titular">
            <motion.span className="linea" {...entra(0.12)}>
              Que lo repetitivo
            </motion.span>
            <motion.span className="linea" {...entra(0.22)}>
              <em>se haga solo.</em>
            </motion.span>
          </h1>

          <motion.p className="inicio-bajada" {...entra(0.34)}>
            Inventario, facturas, reportes y WhatsApp que funcionan solos.
          </motion.p>

          <motion.div className="inicio-acciones" {...entra(0.44)}>
            <a className="boton boton-tinta" href={WA_GENERAL} target="_blank" rel="noreferrer">
              <IconBrandWhatsapp size={20} stroke={1.6} />
              Escríbenos por WhatsApp
            </a>
            <a className="boton boton-aire solo-grande" href="#servicios">
              Mira cómo funciona
              <IconArrowDown size={16} stroke={1.6} />
            </a>
          </motion.div>

          <motion.p className="inicio-nota" {...entra(0.52)}>
            30 minutos. Sin costo.
          </motion.p>
        </div>

        <motion.div
          className="inicio-escena"
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.3 }}
        >
          <Telefono />
          <p className="pie-ejemplo">Cifras de ejemplo.</p>
        </motion.div>
      </div>
    </section>
  );
}
