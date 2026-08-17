/**
 * Genera las páginas de servicio como HTML estático, y reescribe el sitemap.
 *
 * Corre después de `vite build`. La home la sigue armando React en el
 * navegador; estas páginas no. Salen del build ya escritas, con su título,
 * su descripción y sus datos estructurados dentro del HTML, que es lo que
 * el buscador lee cuando pasa. Si tuvieran que esperar a que se ejecute
 * JavaScript, dependerían de que el rastreador decida volver a renderizar,
 * y esa segunda pasada no siempre llega.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGINAS, SITIO } from './paginas.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(RAIZ, 'dist');

const HOY = new Date().toISOString().slice(0, 10);

const FUENTES =
  'https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@200;300;400;500&display=swap';

/** Texto plano para los datos estructurados: el JSON-LD no admite etiquetas. */
const plano = (s) => s.replace(/<[^>]+>/g, '');

/** Escape para atributos y para JSON embebido en un <script>. */
const attr = (s) =>
  plano(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const json = (obj) =>
  JSON.stringify(obj, null, 2).replace(/</g, '\\u003c');

/* ══════════════════════════════════════════
   ESTILOS
   Van dentro del HTML y no como archivo aparte: son pocos y así la página
   pinta en el primer viaje, sin una segunda petición de por medio.
══════════════════════════════════════════ */
const ESTILOS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--cream:#F4F1EB;--white:#FAFAF8;--dark:#18180F;--mid:#40403A;--light:#8A8679;--gold:#B89A0A;--border:#E2DDD5}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{background:var(--cream);color:var(--dark);font-family:'DM Sans',system-ui,sans-serif;font-weight:300;line-height:1.6;overflow-x:hidden}
a{color:inherit}
img{max-width:100%;height:auto}

/* La barra es la misma de la portada, valor por valor. Una página de
   servicio que se sintiera «otro sitio» rompería la confianza justo donde
   hace falta sostenerla. */
nav.barra{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:flex-start;justify-content:space-between;padding:28px 56px;background:rgba(244,241,235,.92);backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:border-color .3s}
nav.barra.scrolled{border-bottom-color:var(--border)}
.nav-logo{display:inline-flex;align-items:center;font-family:'Cormorant',serif;font-weight:600;font-size:28px;color:var(--dark);letter-spacing:.06em;line-height:1;gap:0;text-decoration:none}
.nav-links{display:flex;align-items:center;gap:40px;padding-top:6px}
.nav-links a{font-family:'DM Sans',sans-serif;font-weight:300;font-size:11px;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;color:var(--dark);transition:color .2s}
.nav-links a:hover{color:var(--gold)}
.nav-links a.cta{color:var(--gold);border-bottom:1px solid var(--gold);padding-bottom:2px}
.menu-toggle{display:none;flex-direction:column;gap:6px;cursor:pointer;z-index:200;padding:8px;margin-right:-8px}
.menu-toggle span{width:24px;height:1.5px;background:var(--dark);transition:.4s cubic-bezier(.22,1,.36,1);transform-origin:center}
.menu-toggle.active span:nth-child(1){transform:translateY(7.5px) rotate(45deg)}
.menu-toggle.active span:nth-child(2){transform:translateY(-7.5px) rotate(-45deg)}

.wrap{max-width:820px;margin:0 auto;padding:0 56px}

.migas{padding:136px 0 0;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--light)}
.migas a{text-decoration:none;color:var(--light)}
.migas a:hover{color:var(--gold)}
.migas span{margin:0 8px;opacity:.5}

.cabecera{padding:32px 0 56px;border-bottom:1px solid var(--border)}
h1{font-family:'Cormorant',serif;font-weight:400;font-size:clamp(2.6rem,7vw,4.2rem);line-height:1.05;letter-spacing:-.01em;margin-bottom:28px}
.lead{font-family:'Cormorant',serif;font-size:clamp(1.25rem,2.6vw,1.6rem);line-height:1.5;color:var(--mid);font-style:italic;max-width:38ch}

section.bloque{padding:56px 0;border-bottom:1px solid var(--border)}
h2{font-family:'Cormorant',serif;font-weight:400;font-size:clamp(1.7rem,4vw,2.4rem);line-height:1.15;margin-bottom:24px}
h3{font-family:'DM Sans',sans-serif;font-weight:500;font-size:15px;letter-spacing:.02em;margin-bottom:6px}
p{margin-bottom:18px;color:var(--mid);max-width:64ch}
p:last-child{margin-bottom:0}
strong{font-weight:500;color:var(--dark)}

ul.puntos{list-style:none;display:grid;gap:16px;margin-top:8px}
ul.puntos li{position:relative;padding-left:26px;color:var(--mid);max-width:64ch}
ul.puntos li::before{content:"";position:absolute;left:0;top:11px;width:10px;height:1px;background:var(--gold)}

ol.pasos{list-style:none;display:grid;gap:28px;margin-top:8px}
ol.pasos li{display:grid;grid-template-columns:56px 1fr;gap:20px;align-items:start}
.paso-n{font-family:'Cormorant',serif;font-size:26px;color:var(--gold);line-height:1}
.paso-d{color:var(--mid);margin:0}

.faq details{border-bottom:1px solid var(--border);padding:20px 0}
.faq details:first-of-type{border-top:1px solid var(--border)}
.faq summary{cursor:pointer;list-style:none;font-weight:400;font-size:1.02rem;display:flex;justify-content:space-between;gap:20px;align-items:center}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";color:var(--gold);font-size:20px;line-height:1;flex:none}
.faq details[open] summary::after{content:"–"}
.faq details p{margin:14px 0 0}

.cierre{padding:72px 0 88px;text-align:center}
.cierre h2{margin-bottom:14px}
.cierre p{margin:0 auto 32px;color:var(--mid)}
.acciones{display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
.btn{display:inline-flex;align-items:center;gap:10px;padding:15px 30px;border-radius:2px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;transition:background .2s,color .2s,border-color .2s}
.btn-principal{background:var(--dark);color:var(--cream)}
.btn-principal:hover{background:var(--gold)}
.btn-secundario{border:1px solid var(--border);color:var(--mid)}
.btn-secundario:hover{border-color:var(--gold);color:var(--gold)}

.pie{padding:44px 48px;border-top:1px solid var(--border);text-align:center;font-size:12px;color:var(--light);display:grid;gap:14px}
.pie-links{display:flex;flex-wrap:wrap;gap:22px;justify-content:center}
.pie-links a{font-size:11px;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--light)}
.pie-links a:hover{color:var(--gold)}

@media (max-width:900px){
  nav.barra,nav.barra.scrolled{padding:0;background:transparent;backdrop-filter:none;border-bottom:none;pointer-events:none}
  .nav-logo{display:none}
  .menu-toggle{display:flex;position:fixed;top:24px;right:24px;pointer-events:auto;margin:0;padding:12px}
  .nav-links{position:fixed;top:0;right:-100%;width:100%;height:100vh;background:rgba(244,241,235,.98);backdrop-filter:blur(12px);flex-direction:column;justify-content:center;align-items:center;gap:48px;transition:right .5s cubic-bezier(.22,1,.36,1);z-index:100;pointer-events:auto;padding-top:0}
  .nav-links.active{right:0}
  .nav-links a{font-size:16px;letter-spacing:.25em}
  .wrap{padding:0 24px}
  .migas{padding-top:96px}
  .pie{padding:36px 24px}
  ol.pasos li{grid-template-columns:40px 1fr;gap:14px}
}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}
`.trim();

/* ══════════════════════════════════════════
   PARTES DE LA PÁGINA
══════════════════════════════════════════ */

/* El chip que reemplaza la O del logotipo. Va como SVG dentro del HTML —
   no como imagen— para que se pinte junto con el texto y no haya un salto
   mientras carga. */
const CHIP = `<svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <rect x="5" y="2" width="12" height="12" rx="1.5" stroke="#B89A0A" stroke-width="1.2" fill="none"/>
      <line x1="5" y1="5.5" x2="2" y2="5.5" stroke="#B89A0A" stroke-width="1" stroke-linecap="round"/>
      <line x1="5" y1="10.5" x2="2" y2="10.5" stroke="#B89A0A" stroke-width="1" stroke-linecap="round"/>
      <line x1="17" y1="5.5" x2="20" y2="5.5" stroke="#B89A0A" stroke-width="1" stroke-linecap="round"/>
      <line x1="17" y1="10.5" x2="20" y2="10.5" stroke="#B89A0A" stroke-width="1" stroke-linecap="round"/>
      <line x1="8" y1="2" x2="8" y2="0" stroke="#B89A0A" stroke-width="1" stroke-linecap="round"/>
      <line x1="11" y1="2" x2="11" y2="0" stroke="#B89A0A" stroke-width="1" stroke-linecap="round"/>
      <line x1="14" y1="2" x2="14" y2="0" stroke="#B89A0A" stroke-width="1" stroke-linecap="round"/>
      <line x1="8" y1="14" x2="8" y2="16" stroke="#B89A0A" stroke-width="1" stroke-linecap="round"/>
      <line x1="11" y1="14" x2="11" y2="16" stroke="#B89A0A" stroke-width="1" stroke-linecap="round"/>
      <line x1="14" y1="14" x2="14" y2="16" stroke="#B89A0A" stroke-width="1" stroke-linecap="round"/>
      <circle cx="11" cy="8" r="2" fill="#B89A0A"/>
    </svg>`;

const barra = () => `
<nav class="barra" id="navbar">
  <a class="nav-logo" href="/" aria-label="Noerion — inicio">NOERI${CHIP}N</a>
  <div class="menu-toggle" id="menuToggle" role="button" tabindex="0" aria-label="Abrir menú" aria-expanded="false">
    <span></span><span></span>
  </div>
  <div class="nav-links" id="navLinks">
    <a href="/#servicios">Servicios</a>
    <a href="/#nosotros">Quiénes somos</a>
    <a href="/#contacto" class="cta">Contacto</a>
  </div>
</nav>`;

const pie = () => `
<footer class="pie">
  <div class="pie-links">
    <a href="/">Inicio</a>
    ${PAGINAS.map((p) => `<a href="/${p.slug}/">${attr(p.breadcrumb)}</a>`).join('\n    ')}
  </div>
  <p>© ${new Date().getFullYear()} Noerion Consulting &amp; Engineering — Ecuador</p>
</footer>`;

const seccion = (s) => {
  const partes = [`<h2>${s.h2}</h2>`];
  if (s.parrafos) partes.push(...s.parrafos.map((t) => `<p>${t}</p>`));
  if (s.lista)
    partes.push(
      `<ul class="puntos">${s.lista.map((li) => `<li>${li}</li>`).join('')}</ul>`
    );
  if (s.pasos)
    partes.push(
      `<ol class="pasos">${s.pasos
        .map(
          (p) =>
            `<li><span class="paso-n">${p.n}</span><div><h3>${p.t}</h3><p class="paso-d">${p.d}</p></div></li>`
        )
        .join('')}</ol>`
    );
  return `<section class="bloque">${partes.join('\n    ')}</section>`;
};

const faq = (items) => `
<section class="bloque faq">
  <h2>Preguntas frecuentes</h2>
  ${items
    .map(
      (f) =>
        `<details><summary>${f.p}</summary><p>${f.r}</p></details>`
    )
    .join('\n  ')}
</section>`;

/* ══════════════════════════════════════════
   DATOS ESTRUCTURADOS
   Tres cosas distintas y separadas: qué servicio es, dónde está la página
   dentro del sitio, y qué preguntas responde.
══════════════════════════════════════════ */
const datosEstructurados = (p) => {
  const url = `${SITIO.url}/${p.slug}/`;
  return json({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: p.servicioSchema.name,
        description: p.servicioSchema.description,
        serviceType: p.servicioSchema.name,
        provider: { '@id': `${SITIO.url}/#organization` },
        areaServed: { '@type': 'Country', name: 'Ecuador' },
        url,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITIO.url}/` },
          { '@type': 'ListItem', position: 2, name: p.breadcrumb, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: p.faq.map((f) => ({
          '@type': 'Question',
          name: plano(f.p),
          acceptedAnswer: { '@type': 'Answer', text: plano(f.r) },
        })),
      },
    ],
  });
};

/* ══════════════════════════════════════════
   LA PÁGINA COMPLETA
══════════════════════════════════════════ */
const construirPagina = (p) => {
  const url = `${SITIO.url}/${p.slug}/`;
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${attr(p.metaTitle)}</title>
<meta name="description" content="${attr(p.metaDescription)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="author" content="José Ignacio Silva">
<meta name="geo.region" content="EC">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${attr(SITIO.nombre)}">
<meta property="og:locale" content="es_EC">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${attr(p.metaTitle)}">
<meta property="og:description" content="${attr(p.metaDescription)}">
<meta property="og:image" content="${SITIO.ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(p.metaTitle)}">
<meta name="twitter:description" content="${attr(p.metaDescription)}">
<meta name="twitter:image" content="${SITIO.ogImage}">

<meta name="theme-color" content="#F4F1EB">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="256x256" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FUENTES}">

<style>${ESTILOS}</style>

<script type="application/ld+json">
${datosEstructurados(p)}
</script>
</head>
<body>
${barra()}

<main class="wrap">
  <nav class="migas" aria-label="Ruta de navegación">
    <a href="/">Inicio</a><span>/</span>${attr(p.breadcrumb)}
  </nav>

  <header class="cabecera">
    <h1>${p.h1}</h1>
    <p class="lead">${p.lead}</p>
  </header>

  ${p.secciones.map(seccion).join('\n\n  ')}

  ${faq(p.faq)}

  <section class="cierre">
    <h2>Hablemos treinta minutos</h2>
    <p>Sin compromiso. Sale de ahí con claridad sobre qué está frenando su empresa y cómo resolverlo.</p>
    <div class="acciones">
      <a class="btn btn-principal" href="${SITIO.whatsapp}" target="_blank" rel="noopener">Escribir por WhatsApp</a>
      <a class="btn btn-secundario" href="mailto:${SITIO.email}?subject=Consulta%20sobre%20${encodeURIComponent(p.breadcrumb)}">${SITIO.email}</a>
    </div>
  </section>
</main>

${pie()}

<script>
// Lo mínimo para que la barra se comporte como en la portada: el borde
// que aparece al bajar y el menú de móvil. Nada más corre en estas páginas.
(function(){
  var barra = document.getElementById('navbar');
  var boton = document.getElementById('menuToggle');
  var menu  = document.getElementById('navLinks');

  addEventListener('scroll', function(){
    barra.classList.toggle('scrolled', scrollY > 10);
  }, { passive: true });

  function alternar(){
    var abierto = menu.classList.toggle('active');
    boton.classList.toggle('active', abierto);
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  }

  boton.addEventListener('click', alternar);
  boton.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alternar(); }
  });
  menu.addEventListener('click', function(e){
    if (e.target.tagName === 'A' && menu.classList.contains('active')) alternar();
  });
})();
</script>
</body>
</html>
`;
};

/* ══════════════════════════════════════════
   SITEMAP
══════════════════════════════════════════ */
const construirSitemap = () => {
  const urls = [
    { loc: `${SITIO.url}/`, priority: '1.0' },
    ...PAGINAS.map((p) => ({ loc: `${SITIO.url}/${p.slug}/`, priority: '0.8' })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${HOY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
};

/* ══════════════════════════════════════════
   ESCRITURA
══════════════════════════════════════════ */
for (const p of PAGINAS) {
  const carpeta = join(DIST, p.slug);
  mkdirSync(carpeta, { recursive: true });
  writeFileSync(join(carpeta, 'index.html'), construirPagina(p), 'utf8');
  console.log(`  ✓ /${p.slug}/`);
}

writeFileSync(join(DIST, 'sitemap.xml'), construirSitemap(), 'utf8');
console.log(`  ✓ sitemap.xml (${PAGINAS.length + 1} URLs)`);
