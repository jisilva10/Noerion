/**
 * Contenido de las páginas de servicio: una por sistema y la consultoría
 * puntual (18/11/2026). Son las mismas cuatro cosas de la portada, contadas
 * un poco más, sin empresas, sin precios y solo con lo que se entrega hoy.
 *
 * Cada entrada se convierte, al hacer `npm run build`, en una página HTML
 * estática en `dist/<slug>/index.html`, más su línea en el sitemap. Las
 * direcciones viejas (automatizacion-de-procesos, inteligencia-artificial-
 * empresas) redirigen a las nuevas en `vercel.json`.
 */

const wa = (m) => `https://wa.me/593986145983?text=${encodeURIComponent(m)}`;

export const SITIO = {
  url: 'https://www.noerionconsulting.com',
  nombre: 'Noerion Consulting & Engineering',
  telefono: '+593986145983',
  email: 'jisignacio10@gmail.com',
  whatsapp: wa('Hola, vi la web y me gustaría saber más sobre lo que haces.'),
  ogImage: 'https://www.noerionconsulting.com/og-image.jpg',
};

export const PAGINAS = [
  {
    slug: 'inventario-automatico',
    // El <title> es lo que se ve en el resultado de búsqueda: Google corta
    // alrededor de los 60 caracteres, así que lo importante va adelante.
    metaTitle: 'Inventario automático para negocios | Noerion Quito',
    metaDescription:
      'Un inventario que se descuenta con cada venta y te avisa al celular cuando algo se acaba. Con una app, lector de códigos, balanza o cámara. Quito, Ecuador.',
    breadcrumb: 'Inventario que se cuenta solo',
    h1: 'Inventario que se cuenta solo',
    lead: 'Sabes lo que tienes sin contar. Y te avisa antes de que algo se acabe.',
    wa: wa('Hola, me interesa el inventario que se cuenta solo.'),
    servicioSchema: {
      name: 'Inventario automático',
      description:
        'Inventario que se descuenta con cada venta, suma la mercadería que llega y avisa al celular cuando algo se acaba, para negocios en Ecuador.',
    },
    secciones: [
      {
        h2: 'Cómo funciona',
        pasos: [
          { n: '01', t: 'Vendes', d: 'Cada venta se descuenta sola del inventario.' },
          { n: '02', t: 'Algo se acaba', d: 'Te llega un aviso al celular, antes de quedarte sin nada.' },
          { n: '03', t: 'Llega mercadería', d: 'Lo que entra se suma solo.' },
        ],
      },
      {
        h2: 'De dónde salen los números',
        lista: [
          '<strong>Una app.</strong> Tu equipo anota lo que sale, en el celular.',
          '<strong>Un lector de códigos.</strong> Pasas el producto y listo.',
          '<strong>Una balanza.</strong> Cuenta por peso lo que no se cuenta a mano.',
          '<strong>Una cámara.</strong> Cuenta lo que entra y sale de la bodega.',
        ],
      },
      {
        h2: 'Qué recibes',
        lista: [
          'Tu inventario al día, en una hoja de cálculo.',
          'Un aviso al celular con cada entrada y salida.',
          'Un aviso cuando algo está por acabarse.',
        ],
      },
    ],
    faq: [
      {
        p: '¿Tengo que cambiar mi sistema?',
        r: 'No. Lo monto sobre lo que ya usas.',
      },
      {
        p: '¿Sirve para mi negocio?',
        r: 'Si vendes cosas que se acaban, sí. El rubro no importa.',
      },
      {
        p: '¿Cuánto se demora?',
        r: 'Casi siempre, de dos a cuatro semanas. Si es más grande, te lo digo antes.',
      },
    ],
  },

  {
    slug: 'asistente-de-whatsapp-con-ia',
    metaTitle: 'Asistente de WhatsApp con IA para negocios | Noerion Quito',
    metaDescription:
      'Un asistente con inteligencia artificial que contesta tu WhatsApp al instante, pasa a una persona cuando no sabe y te muestra en un panel quién está interesado.',
    breadcrumb: 'Asistente que contesta tus mensajes',
    h1: 'Asistente que contesta tus mensajes',
    lead: 'Contesta tu WhatsApp con IA, de día y de noche. Tú ves todo en un panel.',
    wa: wa('Hola, me interesa el asistente que contesta los mensajes.'),
    servicioSchema: {
      name: 'Asistente de WhatsApp con inteligencia artificial',
      description:
        'Asistente con inteligencia artificial que contesta los mensajes de WhatsApp de un negocio, pasa a una persona cuando no sabe y muestra en un panel a los interesados.',
    },
    secciones: [
      {
        h2: 'Cómo funciona',
        pasos: [
          { n: '01', t: 'Te escriben', d: 'Contesta al instante, con lo que tú le enseñaste.' },
          { n: '02', t: 'No sabe algo', d: 'Lo dice, y da el WhatsApp de una persona de tu equipo.' },
          { n: '03', t: 'Hay un interesado', d: 'Aparece primero en tu panel.' },
        ],
      },
      {
        h2: 'Tu panel',
        lista: [
          '<strong>Cada conversación</strong>, completa.',
          '<strong>Quién está más interesado</strong>, primero.',
          '<strong>Atiendes tú</strong> cuando quieras, con un botón.',
          '<strong>Lo que sabe el asistente</strong> lo cambias tú, y lo pruebas antes.',
        ],
      },
      {
        h2: 'Instagram y Facebook',
        parrafos: [
          'Si te escriben por ahí, les responde con un botón que los lleva a tu WhatsApp.',
        ],
      },
    ],
    faq: [
      {
        p: '¿La IA se equivoca?',
        r: 'A veces, como una persona. Por eso solo contesta lo que sabe, y lo demás pasa a una persona.',
      },
      {
        p: '¿Necesito otro número?',
        r: 'Sí, un número nuevo para el asistente. Te ayudo a sacarlo.',
      },
      {
        p: '¿Guarda las fotos de mis clientes?',
        r: 'No. Las lee para contestar y no las guarda.',
      },
    ],
  },

  {
    slug: 'sistema-de-contenido',
    metaTitle: 'Sistema de contenido para redes con IA | Noerion Quito',
    metaDescription:
      'Revisa cada día qué funciona en tu rubro, te da ideas y la mejor hora, y arma tus carruseles y videos con tu marca. Tú solo grabas y publicas.',
    breadcrumb: 'Sistema para tu contenido',
    h1: 'Sistema para tu contenido',
    lead: 'Te dice qué publicar y arma tus publicaciones. Tú solo grabas y publicas.',
    wa: wa('Hola, me interesa el sistema para el contenido.'),
    servicioSchema: {
      name: 'Sistema de contenido para redes sociales',
      description:
        'Radar que revisa qué funciona en las cuentas de un rubro, propone ideas y horarios, y arma carruseles y videos con la marca del negocio.',
    },
    secciones: [
      {
        h2: 'Cómo funciona',
        pasos: [
          { n: '01', t: 'Mira', d: 'Cada día revisa qué funciona en las cuentas de tu rubro.' },
          { n: '02', t: 'Te propone', d: 'Tres ideas y la mejor hora para publicar.' },
          { n: '03', t: 'Lo arma', d: 'Tus carruseles y tus videos, con tu marca.' },
        ],
      },
      {
        h2: 'Qué recibes',
        lista: [
          '<strong>Tu radar.</strong> Una página en tu celular con lo que más funcionó.',
          '<strong>Carruseles</strong> con tu logo, tus colores y tu letra.',
          '<strong>Videos</strong> cortados y con subtítulos, listos para subir.',
        ],
      },
      {
        h2: 'Lo que haces tú',
        parrafos: ['Grabas con tu celular y publicas. Nada se sube solo a tus redes.'],
      },
    ],
    faq: [
      {
        p: '¿Tengo que saber editar?',
        r: 'No. Grabas, dejas el video en una carpeta y te llega listo.',
      },
      {
        p: '¿De qué cuentas aprende?',
        r: 'De las de tu rubro que tú elijas, y de las tuyas.',
      },
      {
        p: '¿Necesito algo más?',
        r: 'Una cuenta de Claude, la IA que lo hace funcionar. Te ayudo a abrirla.',
      },
    ],
  },

  {
    slug: 'consultoria-de-procesos',
    metaTitle: 'Consultoría puntual en automatización e IA | Noerion Quito',
    metaDescription:
      'Si lo que necesitas no es inventario, mensajes ni contenido: te escucho 30 minutos, sin costo, y te digo si se puede, cómo y cuánto tiempo toma.',
    breadcrumb: 'Consultoría para algo puntual',
    h1: 'Consultoría para algo puntual',
    lead: '¿Lo tuyo es otra cosa? Te escucho y te digo si se puede y cómo.',
    wa: wa('Hola, tengo algo puntual y quería ver si me puedes ayudar.'),
    servicioSchema: {
      name: 'Consultoría puntual en automatización e inteligencia artificial',
      description:
        'Revisión de una tarea concreta de un negocio para decir si se puede automatizar, cómo y en cuánto tiempo.',
    },
    secciones: [
      {
        h2: 'Cómo funciona',
        pasos: [
          { n: '01', t: 'Me cuentas', d: '30 minutos. Sin costo.' },
          { n: '02', t: 'Te digo', d: 'Si se puede, cómo y cuánto tiempo toma. Por escrito.' },
          { n: '03', t: 'Lo armamos juntos', d: 'Paso a paso, hasta que funcione.' },
        ],
      },
      {
        h2: 'Cuándo te digo que no',
        parrafos: [
          'Si no hace falta IA, te lo digo. Prefiero perder un trabajo a venderte algo que no vas a usar.',
        ],
      },
    ],
    faq: [
      {
        p: '¿Qué tipo de cosas?',
        r: 'Tareas que se repiten y que hoy alguien hace a mano.',
      },
      {
        p: '¿Y si es muy grande?',
        r: 'Te lo digo antes, con el tiempo que toma.',
      },
    ],
  },
];
