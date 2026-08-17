/**
 * Contenido de las páginas de servicio.
 *
 * Cada entrada de acá se convierte, al hacer `npm run build`, en una página
 * HTML completa y estática en `dist/<slug>/index.html`, más su línea en el
 * sitemap. El buscador la recibe ya escrita: no depende de que el navegador
 * ejecute React para poder leerla.
 *
 * Para agregar una página nueva basta con sumar un objeto a esta lista.
 */

export const SITIO = {
  url: 'https://www.noerionconsulting.com',
  nombre: 'Noerion Consulting & Engineering',
  telefono: '+593986145983',
  email: 'jisignacio10@gmail.com',
  whatsapp:
    'https://wa.me/593986145983?text=Hola%2C%20vi%20la%20web%20y%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20lo%20que%20hacen.',
  ogImage: 'https://www.noerionconsulting.com/og-image.jpg',
};

export const PAGINAS = [
  {
    slug: 'automatizacion-de-procesos',
    // El <title> es lo que se ve en el resultado de búsqueda: Google corta
    // alrededor de los 60 caracteres, así que lo importante va adelante.
    metaTitle: 'Automatización de Procesos para Empresas | Noerion Ecuador',
    metaDescription:
      'Automatizamos inventarios, pagos y tareas repetitivas con n8n e integraciones a medida. Diagnóstico de 30 minutos, sin compromiso. Ecuador.',
    breadcrumb: 'Automatización de procesos',
    h1: 'Automatización de procesos',
    lead: 'Tu equipo hace en cuatro horas lo que podría hacerse en veinte minutos. Mapeamos dónde se pierde el tiempo y construimos los flujos que lo devuelven.',
    servicioSchema: {
      name: 'Automatización de procesos',
      description:
        'Diseño e implementación de flujos automatizados para inventarios, pagos, reportería y tareas administrativas repetitivas en empresas de Ecuador.',
    },
    secciones: [
      {
        h2: 'Qué automatizamos',
        parrafos: [
          'No empezamos por la herramienta. Empezamos por encontrar en qué se va el día de tu equipo, que casi nunca es donde crees.',
        ],
        lista: [
          '<strong>Inventarios.</strong> Stock que se actualiza solo, alertas antes de que falte, sin nadie cuadrando hojas de cálculo a fin de mes.',
          '<strong>Pagos y cobranza.</strong> Facturación, recordatorios y conciliación corriendo sin que alguien tenga que acordarse.',
          '<strong>Reportería.</strong> Los números que hoy alguien arma a mano cada lunes, listos solos y siempre iguales.',
          '<strong>Entrada de datos.</strong> Información que hoy se copia de un sistema a otro a mano, moviéndose sola y sin errores de tipeo.',
          '<strong>Seguimiento comercial.</strong> Que ningún contacto se enfríe porque nadie se acordó de responderle.',
        ],
      },
      {
        h2: 'Cómo lo hacemos',
        pasos: [
          {
            n: '01',
            t: 'Conversación',
            d: 'Treinta minutos para entender tu operación. Sin costo y sin compromiso.',
          },
          {
            n: '02',
            t: 'Diagnóstico',
            d: 'Mapeamos el proceso completo y te mostramos, por escrito, dónde está la fuga y cuánto pesa.',
          },
          {
            n: '03',
            t: 'Ejecución',
            d: 'Construimos el flujo, lo ponemos a correr y acompañamos a tu equipo hasta que lo usa solo.',
          },
        ],
      },
      {
        h2: 'Con qué lo construimos',
        parrafos: [
          'Trabajamos con <strong>n8n</strong> para orquestar los flujos, con modelos de lenguaje donde hace falta criterio y no solo reglas, y con integraciones directas a los sistemas que ya usas.',
          'La regla es simple: si tu operación ya funciona sobre una herramienta, construimos encima de ella. Cambiar de sistema es caro, lento y casi nunca es lo que resuelve el problema real.',
        ],
      },
      {
        h2: 'Señales de que lo necesitas',
        lista: [
          'Alguien de tu equipo dedica horas cada semana a copiar información entre sistemas.',
          'Los reportes llegan tarde, o llegan distintos según quién los arme.',
          'Los errores aparecen siempre en el mismo punto del proceso.',
          'Creciste y la respuesta fue contratar más gente para sostener la misma tarea manual.',
        ],
      },
    ],
    faq: [
      {
        p: '¿Cuánto tarda una automatización?',
        r: 'Depende del proceso, pero la mayoría de los flujos que construimos entran en operación entre dos y seis semanas desde el diagnóstico. Priorizamos que algo esté funcionando pronto antes que entregar todo de golpe al final.',
      },
      {
        p: '¿Tengo que cambiar el sistema que ya uso?',
        r: 'Casi nunca. Construimos sobre las herramientas que tu empresa ya tiene y que tu equipo ya sabe usar. Proponemos un cambio de sistema solo cuando el que tienes es la causa directa del problema.',
      },
      {
        p: '¿Sirve si mi equipo no es técnico?',
        r: 'Es justamente el caso para el que diseñamos. Una automatización que solo funciona si hay alguien técnico vigilándola no sirve de nada. Entregamos los flujos andando y acompañamos al equipo hasta que los opera sin ayuda.',
      },
      {
        p: '¿Trabajan con empresas fuera de Ecuador?',
        r: 'Sí. El trabajo es remoto en su mayor parte, así que la ubicación no es un límite. En Ecuador además hacemos sesiones presenciales cuando el proyecto lo pide.',
      },
    ],
  },

  {
    slug: 'inteligencia-artificial-empresas',
    metaTitle: 'Inteligencia Artificial para Empresas | Noerion Ecuador',
    metaDescription:
      'Implementamos IA donde de verdad hace falta: tableros, asistentes internos y decisiones con datos. Diagnóstico de 30 minutos, sin compromiso.',
    breadcrumb: 'Inteligencia artificial para empresas',
    h1: 'Inteligencia artificial para empresas',
    lead: 'No implementamos inteligencia artificial porque esté de moda. La usamos donde entendimos que hace falta, y decimos que no cuando no hace falta.',
    servicioSchema: {
      name: 'Inteligencia artificial para empresas',
      description:
        'Implementación de inteligencia artificial aplicada a operaciones empresariales: tableros de control, asistentes internos y análisis de datos para empresas en Ecuador.',
    },
    secciones: [
      {
        h2: 'Dónde la inteligencia artificial rinde de verdad',
        parrafos: [
          'La mayoría de proyectos de IA fallan por el mismo motivo: se elige la tecnología antes de entender el problema. Nosotros hacemos el recorrido al revés.',
        ],
        lista: [
          '<strong>Tableros de control.</strong> Ver el rendimiento del negocio sin esperar a que alguien arme el reporte.',
          '<strong>Asistentes internos.</strong> Que tu equipo pregunte en lenguaje normal y obtenga la respuesta de tus propios documentos y datos.',
          '<strong>Clasificación y lectura de documentos.</strong> Facturas, contratos y correos que hoy alguien abre y ordena uno por uno.',
          '<strong>Apoyo a la decisión.</strong> Detectar patrones en tus datos históricos que a simple vista no se ven.',
        ],
      },
      {
        h2: 'Software especializado',
        parrafos: [
          'Cuando ninguna herramienta del mercado hace exactamente lo que tu operación necesita, la construimos. Software hecho para tu proceso, no un producto genérico al que tu equipo tenga que adaptarse.',
          'Eso incluye los tableros donde ves el negocio completo y las integraciones que conectan lo que hoy vive en islas separadas.',
        ],
      },
      {
        h2: 'Cuándo te vamos a decir que no',
        parrafos: [
          'Si tu problema se resuelve ordenando un proceso, con una automatización simple o con una conversación difícil que nadie ha tenido, te lo vamos a decir. Meter inteligencia artificial encima de un proceso roto solo hace que se rompa más rápido y más caro.',
          'Preferimos perder un proyecto a entregarte algo que no vas a usar.',
        ],
      },
    ],
    faq: [
      {
        p: '¿Mi empresa es demasiado pequeña para usar inteligencia artificial?',
        r: 'El tamaño importa menos que el volumen de tareas repetitivas. Una empresa de diez personas con mucho trabajo manual suele ganar más, y más rápido, que una de doscientas con procesos ya ordenados.',
      },
      {
        p: '¿Mis datos quedan expuestos?',
        r: 'Es la primera pregunta que definimos, antes de escribir una línea. Según lo sensible que sea la información se elige la arquitectura: modelos con acuerdos de confidencialidad, aislamiento de datos o procesamiento local. La decisión se toma contigo y queda por escrito.',
      },
      {
        p: '¿Cuánto cuesta implementar IA en una empresa?',
        r: 'Depende del alcance, y no damos un número antes de entender el problema. El diagnóstico inicial de treinta minutos no tiene costo, y de ahí sale una propuesta concreta con precio cerrado.',
      },
      {
        p: '¿Qué pasa si mi equipo se resiste al cambio?',
        r: 'Es lo normal, y es parte del trabajo. Un sistema que el equipo no adopta es un sistema que no existe. Por eso la gestión del talento y el acompañamiento entran en el proyecto, no se venden aparte.',
      },
    ],
  },

  {
    slug: 'consultoria-de-procesos',
    metaTitle: 'Consultoría de Procesos y Estrategia | Noerion Ecuador',
    metaDescription:
      'Diagnosticamos dónde tu empresa pierde tiempo y dinero, y construimos la solución. Consultoría de procesos en Ecuador. Primera conversación gratuita.',
    breadcrumb: 'Consultoría de procesos',
    h1: 'Consultoría de procesos',
    lead: 'No entregamos diagnósticos que terminan en un cajón. Entregamos sistemas claros que tu equipo adopta y resultados que se pueden medir.',
    servicioSchema: {
      name: 'Consultoría de procesos y estrategia empresarial',
      description:
        'Diagnóstico organizacional, rediseño de procesos, estrategia empresarial y gestión del talento para empresas en Ecuador.',
    },
    secciones: [
      {
        h2: 'El problema con la consultoría tradicional',
        parrafos: [
          'La consultoría clásica entrega un informe y se va. El informe describe con precisión un problema que en la empresa ya se conocía, propone un modelo que nadie sabe cómo aplicar un lunes por la mañana, y termina archivado.',
          'Nuestro trabajo no se acaba en el diagnóstico. Se acaba cuando el proceso nuevo está corriendo y el equipo lo usa sin que nadie tenga que recordárselo.',
        ],
      },
      {
        h2: 'Qué cubre',
        lista: [
          '<strong>Diagnóstico organizacional.</strong> Dónde se pierde el tiempo, el dinero y la información, con evidencia y no con impresiones.',
          '<strong>Rediseño de procesos.</strong> El camino más corto entre lo que entra y lo que el cliente recibe.',
          '<strong>Estrategia empresarial.</strong> Decidir qué se hace y, sobre todo, qué se deja de hacer.',
          '<strong>Gestión del talento.</strong> Roles, responsabilidades y adopción real del cambio por parte del equipo.',
        ],
      },
      {
        h2: 'Estrategia, talento e inteligencia artificial en una sola conversación',
        parrafos: [
          'Lo habitual es contratar tres proveedores distintos: uno que piensa la estrategia, otro que trabaja el talento humano y otro que implementa la tecnología. Después nadie se hace cargo de que las tres cosas encajen.',
          'Acá se resuelven en la misma conversación, porque casi siempre son el mismo problema visto desde tres ángulos.',
        ],
      },
    ],
    faq: [
      {
        p: '¿Cómo empieza el trabajo?',
        r: 'Con una conversación de treinta minutos, sin costo y sin compromiso. Sale de ahí con claridad sobre qué está frenando su empresa, contrate o no.',
      },
      {
        p: '¿Cuánto dura una consultoría?',
        r: 'El diagnóstico toma entre dos y cuatro semanas según el tamaño de la operación. La implementación depende de lo que el diagnóstico encuentre, y siempre se define con un alcance y un plazo por escrito antes de empezar.',
      },
      {
        p: '¿Qué diferencia tienen frente a una consultora grande?',
        r: 'Trabaja directamente con quien hace el análisis, no con un equipo junior supervisado a distancia. Y la implementación viene incluida: no hay que contratar aparte a alguien que ejecute lo que se recomendó.',
      },
      {
        p: '¿Qué tipo de empresas atienden?',
        r: 'Empresas medianas y pequeñas con operación real: cosas que entran, se procesan y salen. El sector importa menos que el hecho de tener procesos que hoy se sostienen a pulso.',
      },
    ],
  },
];
