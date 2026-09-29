import { motion } from 'framer-motion';
import { IconBrandInstagram, IconBrandWhatsapp, IconMail } from '@tabler/icons-react';
import { Logo } from '../marca/Logo';
import { EMAIL, INSTAGRAM, MAILTO, SERVICIOS, WA_GENERAL } from '../../datos';

/**
 * El cierre: el logotipo a todo el ancho, con el ojo del chip vivo mirando
 * al cursor, y la invitación. Después, el pie.
 */
export function Cierre() {
  return (
    <>
      <section className="cierre" id="contacto">
        <div className="luz-ventana suave" aria-hidden="true" />
        <div className="envoltura cierre-dentro">
          <motion.div
            className="cierre-logo"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
          >
            <Logo vivo despierta={1400} titulo="Noerion Consulting & Engineering" />
          </motion.div>
          <p className="cierre-lema">Comprensión antes de la acción.</p>

          <h2 className="cierre-titular">
            Cuéntanos qué se repite en tu negocio.
            <em>Te decimos qué puede hacerse solo.</em>
          </h2>

          <div className="cierre-acciones">
            <a className="boton boton-tinta grande" href={WA_GENERAL} target="_blank" rel="noreferrer">
              <IconBrandWhatsapp size={22} stroke={1.6} />
              Escríbenos por WhatsApp
            </a>
            <a className="boton boton-aire" href={MAILTO}>
              <IconMail size={18} stroke={1.5} />
              {EMAIL}
            </a>
          </div>
          <p className="inicio-nota centrada">30 minutos. Sin costo.</p>
        </div>
      </section>

      <footer className="pie">
        <div className="envoltura pie-dentro">
          <div className="pie-marca">
            <Logo className="pie-logo" />
            <p>Consulting &amp; Engineering · Quito, Ecuador</p>
          </div>
          <nav className="pie-enlaces" aria-label="Servicios">
            {SERVICIOS.map((s) => (
              <a key={s.url} href={s.url}>
                {s.nombre}
              </a>
            ))}
          </nav>
          <div className="pie-redes">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram de Noerion: @noerion.consulting">
              <IconBrandInstagram size={20} stroke={1.5} />
            </a>
            <a href={WA_GENERAL} target="_blank" rel="noreferrer" aria-label="WhatsApp de Noerion">
              <IconBrandWhatsapp size={20} stroke={1.5} />
            </a>
            <a href={MAILTO} aria-label={`Correo: ${EMAIL}`}>
              <IconMail size={20} stroke={1.5} />
            </a>
          </div>
          <p className="pie-legal">© {new Date().getFullYear()} Noerion Consulting &amp; Engineering</p>
        </div>
      </footer>
    </>
  );
}
