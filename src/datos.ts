/**
 * Todo lo que dice la portada, en un solo sitio.
 *
 * Las frases no son de relleno: salen de lo que JIS ya dijo en cámara y en
 * los carruseles (guías de los videos 28, 34 y 35, carrusel 12, la ficha de
 * la empresa y el brand book). Reglas que se cumplen en todo el archivo:
 * «tú», frases de doce palabras o menos, cero jerga, ningún precio, ninguna
 * ley ni multa, y ninguna cifra inventada presentada como real (las del
 * teléfono son de ejemplo y lo dicen).
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
   El reporte de las 7:00 (video 34). Cifras de
   ejemplo: una tienda cualquiera de Quito.
───────────────────────────────────────────── */
export const REPORTE = [
  { etiqueta: 'Ayer vendiste', valor: '$2.380' },
  { etiqueta: 'Se acabó', valor: 'arroz y aceite' },
  { etiqueta: 'Te deben', valor: '4 clientes · $615' },
];

/* ─────────────────────────────────────────────
   La escalera (video 35). Cinco negocios de
   Quito, sin nombre. La floristería es la real, y va al final: la web no
   puede parecer de un solo rubro (JIS, 28/9/2026). La tienda va primero.
───────────────────────────────────────────── */
export type Aparato = 'balanza' | 'camara' | 'lector' | 'factura';

export const ESCALERAS: {
  negocio: string;
  quien: string;
  malo: string;
  bueno: string;
  excelente: string;
  aparato: Aparato;
}[] = [
  {
    negocio: 'Tienda',
    quien: 'una tienda',
    malo: 'Anotar en el cuaderno.',
    bueno: 'Anotar en el Excel.',
    excelente: 'Pasas el código y se descuenta.',
    aparato: 'lector',
  },
  {
    negocio: 'Ferretería',
    quien: 'una ferretería',
    malo: 'Contar tornillos uno por uno.',
    bueno: 'Contarlos por cajas.',
    excelente: 'La balanza los cuenta por peso.',
    aparato: 'balanza',
  },
  {
    negocio: 'Cocina',
    quien: 'un restaurante',
    malo: 'Calcular el arroz a ojo.',
    bueno: 'Pesarlo los lunes.',
    excelente: 'La balanza avisa cuando se acaba.',
    aparato: 'balanza',
  },
  {
    negocio: 'Bodega',
    quien: 'una bodega',
    malo: 'Contar las cajas a ojo.',
    bueno: 'Llevar una planilla.',
    excelente: 'La cámara cuenta las que entran.',
    aparato: 'camara',
  },
  {
    negocio: 'Floristería',
    quien: 'una floristería',
    malo: 'Contar las flores cada noche, a mano.',
    bueno: 'Pasarlas a un Excel.',
    excelente: 'Cada factura las descuenta sola.',
    aparato: 'factura',
  },
];

export const NOMBRE_APARATO: Record<Aparato, string> = {
  balanza: 'Balanza',
  camara: 'Cámara que cuenta',
  lector: 'Lector de códigos',
  factura: 'Tu facturación',
};

/* ─────────────────────────────────────────────
   Diez cosas que pueden hacerse solas (video 28).
   Cada una es «no hagas esto / que pase esto».
───────────────────────────────────────────── */
export type Glifo =
  | 'factura'
  | 'viaja'
  | 'reloj'
  | 'pantalla'
  | 'caja'
  | 'aviso'
  | 'cobro'
  | 'alta'
  | 'chat'
  | 'resumen';

export const DIEZ: { no: string; si: string; glifo: Glifo }[] = [
  { no: 'Teclear facturas', si: 'Les tomas foto y se leen solas.', glifo: 'factura' },
  { no: 'Copiar de un Excel a otro', si: 'El dato viaja solo.', glifo: 'viaja' },
  { no: 'Abrir reportes', si: 'Te llega a las ocho, al celular.', glifo: 'reloj' },
  { no: 'Buscar entre mil números', si: 'Todo en una sola pantalla.', glifo: 'pantalla' },
  { no: 'Contar la bodega a mano', si: 'Se cuenta sola.', glifo: 'caja' },
  { no: 'Revisar si falta algo', si: 'Te avisa si hay un error.', glifo: 'aviso' },
  { no: 'Perseguir al que te debe', si: 'Se cobra solo.', glifo: 'cobro' },
  { no: 'Anotar al cliente nuevo', si: 'Se inscribe solo.', glifo: 'alta' },
  { no: 'Contestar lo mismo diez veces', si: 'Se contesta solo.', glifo: 'chat' },
  { no: 'Tomar notas en la reunión', si: 'Te llega el resumen.', glifo: 'resumen' },
];

export const SERVICIOS = [
  { nombre: 'Automatización de procesos', url: '/automatizacion-de-procesos/' },
  { nombre: 'Inteligencia artificial para empresas', url: '/inteligencia-artificial-empresas/' },
  { nombre: 'Consultoría de procesos', url: '/consultoria-de-procesos/' },
];

/* ─────────────────────────────────────────────
   Cómo trabajo.
───────────────────────────────────────────── */
export const PASOS = [
  {
    t: 'Conversación',
    d: '30 minutos. Sin costo.',
  },
  {
    t: 'Diagnóstico',
    d: 'Dónde se va el tiempo, por escrito.',
  },
  {
    t: 'Lo monto',
    d: 'Sobre lo que ya usas. En dos a cuatro semanas.',
  },
  {
    t: 'Te acompaño',
    d: 'Tu equipo aprende. Si algo falla, lo arreglo.',
  },
];

/* ─────────────────────────────────────────────
   Las seis preguntas que le hacen a JIS antes
   de contratar (ficha de la empresa, 15). El
   precio no aparece: no estaba entre ellas.
   Las mismas van en el JSON-LD de index.html:
   si se cambia una, se cambia allá también.
───────────────────────────────────────────── */
export const PREGUNTAS = [
  {
    p: '¿Cuánto se demora?',
    r: 'Casi siempre, de dos a cuatro semanas. Si es más grande, te lo digo antes.',
  },
  {
    p: '¿Y si se daña?',
    r: 'Hay soporte cada mes. Si algo falla, lo arreglo yo.',
  },
  {
    p: '¿Mis datos están seguros?',
    r: 'Tus datos se quedan en tus cuentas o en un servidor tuyo. No en los míos.',
  },
  {
    p: '¿Mi gente lo va a saber usar?',
    r: 'Enseñarles es parte del trabajo. Termino cuando lo usan solos.',
  },
  {
    p: '¿La IA se equivoca?',
    r: 'A veces, como una persona. Por eso la pongo solo donde ayuda.',
  },
  {
    p: '¿Qué pasa si dejo de trabajar contigo?',
    r: 'Todo queda en tus cuentas y es tuyo. Sigue funcionando.',
  },
];
