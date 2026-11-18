/**
 * Todo lo que dice la portada, en un solo sitio.
 *
 * Desde el 18/11/2026 Noerion hace tres sistemas y una consultoría puntual,
 * y la web lo dice tal cual (JIS: «literal y textualmente mostrar qué es lo
 * que hago»). Cada sistema sale de un proyecto real, pero ninguna empresa se
 * nombra.
 *
 * Reglas que se cumplen en todo el archivo: «tú», primera persona del
 * singular, frases de doce palabras o menos, cero jerga, ningún precio,
 * ninguna ley ni multa, nada de facturas ni cobros como servicio, y solo lo
 * que de verdad se entrega hoy.
 */

export const TELEFONO = '+593986145983';
export const EMAIL = 'jisignacio10@gmail.com';
export const INSTAGRAM = 'https://www.instagram.com/noerion.consulting/';

/** Un enlace de WhatsApp con el mensaje ya escrito. */
export const whatsapp = (mensaje: string) =>
  `https://wa.me/593986145983?text=${encodeURIComponent(mensaje)}`;

export const WA_GENERAL = whatsapp(
  'Hola, vi la web y me gustaría saber más sobre lo que haces.'
);

export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  'Consulta desde noerionconsulting.com'
)}`;

/* ─────────────────────────────────────────────
   Los tres sistemas. En la portada cada uno es
   un dibujo, un nombre y una línea (JIS, 18/11:
   «mucho más visual»). Lo largo vive en sus
   páginas (scripts/paginas.mjs).
───────────────────────────────────────────── */
export type IdSistema = 'inventario' | 'asistente' | 'contenido';

export const SISTEMAS: {
  id: IdSistema;
  n: string;
  corto: string;
  nombre: string;
  linea: string;
  pasos: { t: string; d: string }[];
  url: string;
  wa: string;
}[] = [
  {
    id: 'inventario',
    n: '01',
    corto: 'Inventario',
    nombre: 'Inventario que se cuenta solo',
    linea: 'Te avisa antes de que se acabe.',
    pasos: [
      { t: 'Vendes', d: 'Cada venta se descuenta sola del inventario.' },
      { t: 'Algo se acaba', d: 'Te llega un aviso al celular, antes de quedarte sin nada.' },
      { t: 'Llega mercadería', d: 'Lo que entra se suma solo.' },
    ],
    url: '/inventario-automatico/',
    wa: whatsapp('Hola, me interesa el inventario que se cuenta solo.'),
  },
  {
    id: 'asistente',
    n: '02',
    corto: 'Mensajes',
    nombre: 'Asistente que contesta tus mensajes',
    linea: 'Contesta tu WhatsApp solo, de día y de noche.',
    pasos: [
      { t: 'Te escriben', d: 'Contesta al instante, con lo que tú le enseñaste.' },
      { t: 'No sabe algo', d: 'Lo dice, y da el WhatsApp de una persona de tu equipo.' },
      { t: 'Hay un interesado', d: 'Aparece primero en tu panel.' },
    ],
    url: '/asistente-de-whatsapp-con-ia/',
    wa: whatsapp('Hola, me interesa el asistente que contesta los mensajes.'),
  },
  {
    id: 'contenido',
    n: '03',
    corto: 'Contenido',
    nombre: 'Sistema para tu contenido',
    linea: 'Te dice qué publicar y lo arma.',
    pasos: [
      { t: 'Mira', d: 'Cada día revisa qué funciona en las cuentas de tu rubro.' },
      { t: 'Te propone', d: 'Tres ideas y la mejor hora para publicar.' },
      { t: 'Lo arma', d: 'Tus carruseles y tus videos, con tu marca.' },
    ],
    url: '/sistema-de-contenido/',
    wa: whatsapp('Hola, me interesa el sistema para el contenido.'),
  },
];

/* La cuarta opción: algo que no es ninguno de los tres. */
export const CONSULTORIA = {
  n: '04',
  nombre: 'Consultoría para algo puntual',
  corto: '¿Otra cosa?',
  linea: 'Lo vemos juntos.',
  pasos: [
    { t: 'Me cuentas', d: 'Qué necesitas y cómo lo haces hoy.' },
    { t: 'Te digo', d: 'Si se puede, cómo y cuánto tiempo toma.' },
    { t: 'Lo armamos juntos', d: 'Paso a paso, hasta que funcione.' },
  ],
  url: '/consultoria-de-procesos/',
  wa: whatsapp('Hola, tengo algo puntual y quería ver si me puedes ayudar.'),
};

/* Para el pie y las páginas de cada sistema. */
export const SERVICIOS = [
  ...SISTEMAS.map((s) => ({ nombre: s.nombre, url: s.url })),
  { nombre: CONSULTORIA.nombre, url: CONSULTORIA.url },
];
