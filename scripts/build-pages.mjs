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

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGINAS, SITIO } from './paginas.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(RAIZ, 'dist');

const HOY = new Date().toISOString().slice(0, 10);

const FUENTES =
  'https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap';

/** Texto plano para los datos estructurados: el JSON-LD no admite etiquetas. */
const plano = (s) => s.replace(/<[^>]+>/g, '');

/** Escape para atributos y para JSON embebido en un <script>. */
const attr = (s) =>
  plano(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const json = (obj) =>
  JSON.stringify(obj, null, 2).replace(/</g, '\\u003c');

/* El logotipo del manual, tal cual, metido en el HTML para que se pinte con
   el texto y no haya un salto mientras carga. */
const LOGO = readFileSync(join(RAIZ, 'public/marca/noerion-positivo.svg'), 'utf8')
  .replace(/<\?xml[^>]*>/, '')
  .trim()
  .replace('<svg ', '<svg class="logo" role="img" aria-label="Noerion" ');

const WA_ICONO = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>`;

/* ══════════════════════════════════════════
   ESTILOS
   Los mismos de la portada, valor por valor: crema, tinta y oro; Cormorant
   para titulares y DM Sans para el resto. Van dentro del HTML y no como
   archivo aparte: son pocos y así la página pinta en el primer viaje.
══════════════════════════════════════════ */
const ESTILOS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--crema:#F4F1EB;--papel:#FAFAF8;--tinta:#18180F;--grafito:#40403A;--piedra:#6C685C;--arena:#E2DDD5;--oro:#B89A0A;--oro-texto:#7D6906;--ios:cubic-bezier(.32,.72,0,1);--gutter:clamp(16px,5vw,56px)}
html{-webkit-text-size-adjust:100%;scroll-padding-top:84px}
body{background:var(--crema);color:var(--tinta);font-family:'DM Sans','Helvetica Neue',Arial,sans-serif;font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
img,svg{display:block;max-width:100%}
:focus-visible{outline:2px solid var(--oro);outline-offset:3px;border-radius:6px}

.barra{position:fixed;inset:0 0 auto 0;z-index:100;border-bottom:1px solid transparent;transition:background-color .45s var(--ios),border-color .45s}
.barra.bajo{background:rgba(244,241,235,.74);backdrop-filter:blur(18px) saturate(160%);-webkit-backdrop-filter:blur(18px) saturate(160%);border-bottom-color:rgba(24,24,15,.06)}
.barra-dentro{position:relative;z-index:2;max-width:1240px;margin:0 auto;height:72px;padding-inline:var(--gutter);display:flex;align-items:center;gap:32px}
.barra .logo{width:150px;height:auto}
.barra-enlaces{display:flex;gap:30px;margin-left:auto}
.barra-enlaces a{font-size:14px;color:var(--grafito);transition:color .3s}
.barra-enlaces a:hover{color:var(--tinta)}
.barra-cta{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 18px;border-radius:999px;background:var(--tinta);color:var(--crema);font-size:14px;font-weight:500}
.barra-cta svg{color:#3ddc84}
.barra-menu{display:none;width:44px;height:44px;margin-right:-10px;position:relative;background:none;border:0;cursor:pointer;color:var(--tinta)}
.barra-menu span{position:absolute;left:12px;right:12px;height:1.5px;background:currentColor;transition:transform .45s var(--ios)}
.barra-menu span:first-child{top:18px}.barra-menu span:last-child{top:25px}
.abierta .barra-menu span:first-child{transform:translateY(3.5px) rotate(45deg)}
.abierta .barra-menu span:last-child{transform:translateY(-3.5px) rotate(-45deg)}
.barra-hoja{position:fixed;inset:0;z-index:1;background:var(--crema);padding:110px var(--gutter) 40px;display:flex;flex-direction:column;gap:8px;opacity:0;pointer-events:none;transition:opacity .4s var(--ios)}
.abierta .barra-hoja{opacity:1;pointer-events:auto}
.barra-hoja a{font-family:'Cormorant',Georgia,serif;font-size:clamp(2.2rem,9vw,3rem);line-height:1.25}

.wrap{max-width:820px;margin:0 auto;padding:0 var(--gutter)}
.migas{padding:128px 0 0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--piedra)}
.migas a:hover{color:var(--tinta)}
.migas span{margin:0 8px;opacity:.5}
.cabecera{padding:26px 0 56px;border-bottom:1px solid var(--arena)}
h1{font-family:'Cormorant',Georgia,serif;font-weight:400;font-size:clamp(2.8rem,7.4vw,5rem);line-height:1;letter-spacing:-.02em;margin-bottom:26px;text-wrap:balance}
.lead{font-family:'Cormorant',Georgia,serif;font-size:clamp(1.3rem,2.6vw,1.7rem);line-height:1.4;color:var(--oro-texto);font-style:italic;max-width:40ch}
section.bloque{padding:56px 0;border-bottom:1px solid var(--arena)}
h2{font-family:'Cormorant',Georgia,serif;font-weight:400;font-size:clamp(1.9rem,4vw,2.6rem);line-height:1.1;margin-bottom:22px;text-wrap:balance}
h3{font-family:'Cormorant',Georgia,serif;font-weight:500;font-size:1.45rem;line-height:1.15;margin-bottom:6px}
p{margin-bottom:18px;color:var(--grafito);max-width:64ch}
p:last-child{margin-bottom:0}
strong{font-weight:500;color:var(--tinta)}
ul.puntos{list-style:none;display:grid;gap:16px;margin-top:8px}
ul.puntos li{position:relative;padding-left:26px;color:var(--grafito);max-width:64ch}
ul.puntos li::before{content:"";position:absolute;left:0;top:12px;width:12px;height:1px;background:var(--oro)}
ol.pasos{list-style:none;display:grid;gap:28px;margin-top:8px}
ol.pasos li{display:grid;grid-template-columns:56px 1fr;gap:20px;align-items:start}
.paso-n{font-family:'Cormorant',Georgia,serif;font-size:1.6rem;color:var(--oro-texto);line-height:1}
.paso-d{color:var(--grafito);margin:0}
.faq details{border-bottom:1px solid var(--arena);padding:22px 0}
.faq details:first-of-type{border-top:1px solid var(--arena)}
.faq summary{cursor:pointer;list-style:none;font-family:'Cormorant',Georgia,serif;font-weight:500;font-size:1.4rem;line-height:1.2;display:flex;justify-content:space-between;gap:20px;align-items:center}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";flex:none;width:32px;height:32px;border-radius:50%;border:1px solid rgba(24,24,15,.14);display:grid;place-items:center;font-family:'DM Sans',sans-serif;font-size:18px;font-weight:300}
.faq details[open] summary::after{content:"–";background:var(--tinta);color:var(--crema);border-color:var(--tinta)}
.faq details p{margin:14px 0 0}
.cierre{padding:80px 0 96px;text-align:center}
.cierre h2{margin-bottom:14px}
.cierre h2 em{color:var(--oro-texto)}
.cierre p{margin:0 auto 32px;color:var(--grafito)}
.acciones{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.btn{display:inline-flex;align-items:center;gap:10px;min-height:52px;padding:0 26px;border-radius:999px;font-size:15px;font-weight:500;transition:transform .5s var(--ios),border-color .3s,box-shadow .5s var(--ios)}
.btn-principal{background:var(--tinta);color:var(--crema);box-shadow:0 10px 30px -12px rgba(24,24,15,.55)}
.btn-principal svg{color:#3ddc84}
.btn-principal:hover{transform:translateY(-2px);box-shadow:0 0 0 4px rgba(184,154,10,.18),0 18px 40px -14px rgba(24,24,15,.6)}
.btn-secundario{border:1px solid rgba(24,24,15,.16);color:var(--tinta)}
.btn-secundario:hover{border-color:var(--tinta);transform:translateY(-2px)}
.pie{border-top:1px solid var(--arena);padding:44px 0 36px}
.pie-dentro{max-width:1240px;margin:0 auto;padding:0 var(--gutter);display:grid;grid-template-columns:1fr auto;gap:24px 48px;align-items:center}
.pie .logo{width:140px;height:auto}
.pie-marca p{margin:10px 0 0;font-size:13px;color:var(--piedra)}
.pie-links{display:flex;flex-wrap:wrap;gap:8px 24px;font-size:14px;color:var(--grafito)}
.pie-links a:hover{color:var(--tinta);text-decoration:underline;text-underline-offset:4px}
.pie-legal{grid-column:1/-1;font-size:12.5px;color:var(--piedra);margin:0}
@media (max-width:900px){
  .barra-enlaces{display:none}
  .barra-cta{margin-left:auto}
  .barra-menu{display:block}
  .barra-dentro{height:64px;gap:12px}
  .barra .logo{width:140px}
  .migas{padding-top:100px}
  ol.pasos li{grid-template-columns:40px 1fr;gap:14px}
  .pie-dentro{grid-template-columns:1fr}
}
@media (max-width:560px){
  .barra-cta span{display:none}
  .barra-cta{width:40px;padding:0;justify-content:center}
  .acciones .btn{width:100%;justify-content:center}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
`.trim();

/* ══════════════════════════════════════════
   PARTES DE LA PÁGINA
══════════════════════════════════════════ */

const ENLACES = [
  ['/#servicios', 'Qué hago'],
  ['/#proceso', 'Cómo trabajo'],
  ['/#nosotros', 'Quién soy'],
  ['/#preguntas', 'Preguntas'],
];

const barra = () => `
<header class="barra" id="navbar">
  <div class="barra-dentro">
    <a href="/" aria-label="Noerion, ir al inicio">${LOGO}</a>
    <nav class="barra-enlaces" aria-label="Secciones">
      ${ENLACES.map(([h, t]) => `<a href="${h}">${t}</a>`).join('\n      ')}
    </nav>
    <a class="barra-cta" href="${SITIO.whatsapp}" target="_blank" rel="noopener">${WA_ICONO}<span>Escríbeme</span></a>
    <button class="barra-menu" id="menuToggle" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span></button>
  </div>
  <nav class="barra-hoja" id="navLinks" aria-label="Secciones">
    ${ENLACES.map(([h, t]) => `<a href="${h}">${t}</a>`).join('\n    ')}
  </nav>
</header>`;

const pie = () => `
<footer class="pie">
  <div class="pie-dentro">
    <div class="pie-marca">
      <a href="/" aria-label="Noerion, ir al inicio">${LOGO}</a>
      <p>Consulting &amp; Engineering · Quito, Ecuador</p>
    </div>
    <nav class="pie-links" aria-label="Servicios">
      <a href="/">Inicio</a>
      ${PAGINAS.map((p) => `<a href="/${p.slug}/">${attr(p.breadcrumb)}</a>`).join('\n      ')}
    </nav>
    <p class="pie-legal">© ${new Date().getFullYear()} Noerion Consulting &amp; Engineering</p>
  </div>
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
    <h2>Hablemos treinta minutos. <em>Sin costo.</em></h2>
    <p>Sin compromiso. Sales de ahí con claridad sobre qué está frenando tu negocio y cómo resolverlo.</p>
    <div class="acciones">
      <a class="btn btn-principal" href="${SITIO.whatsapp}" target="_blank" rel="noopener">${WA_ICONO}Escríbeme por WhatsApp</a>
      <a class="btn btn-secundario" href="mailto:${SITIO.email}?subject=Consulta%20sobre%20${encodeURIComponent(p.breadcrumb)}">${SITIO.email}</a>
    </div>
  </section>
</main>

${pie()}

<script>
// Lo mínimo para que la barra se comporte como en la portada: el cristal que
// aparece al bajar y el menú del celular. Nada más corre en estas páginas.
(function(){
  var barra = document.getElementById('navbar');
  var boton = document.getElementById('menuToggle');
  var menu  = document.getElementById('navLinks');

  addEventListener('scroll', function(){
    barra.classList.toggle('bajo', scrollY > 12);
  }, { passive: true });

  function alternar(){
    var abierto = barra.classList.toggle('abierta');
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = abierto ? 'hidden' : '';
  }

  boton.addEventListener('click', alternar);
  menu.addEventListener('click', function(e){
    if (e.target.tagName === 'A' && barra.classList.contains('abierta')) alternar();
  });
})();
</script>
<!-- Vercel Analytics: el mismo contador que la portada, sin React. -->
<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
<script defer src="/_vercel/insights/script.js"></script>
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
