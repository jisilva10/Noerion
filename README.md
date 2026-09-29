# noerionconsulting.com

La web de Noerion. React + Vite; se publica en Vercel.

## La portada

| Sección | Qué cuenta | De dónde sale |
|---|---|---|
| Inicio | «Que lo repetitivo se haga solo» y el teléfono al que le llega el reporte de las 7:00 | video 34 |
| Qué hacemos | **un solo módulo con cuatro pestañas** que cabe entero en la pantalla (JIS, 29/9: «deberían vivir juntos y no depender del scroll»): *Antes y ahora*, dos lados de tres líneas (de noche, a mano; de día, cada venta se descuenta sola); *Tu nivel*, malo/bueno/excelente con la lista de negocios vertical (en el celular, «Tengo una tienda ▾»); *Qué automatizar*, las diez cosas; y *Haz la cuenta*, la calculadora | ficha de la empresa (17), videos 28 y 35, carrusel 12 |
| Aparatos | «No todo se mide con IA. Algunas cosas se cuentan solas.»: balanza, cámara que cuenta y lector de códigos, lo que diferencia a Noerion | ficha de la empresa (20 y 24), colores del video 30 |
| Proceso | conversación, diagnóstico, lo montamos (2 a 4 semanas), te acompañamos | |
| Nosotros | «Primero entender. Después, que suceda.», noerós + -ion y el fundador | brand book |
| Preguntas | las seis que le hacen a JIS antes de contratar | ficha de la empresa (15) |
| Cierre | el logotipo con el ojo vivo, «Comprensión antes de la acción» y la invitación | |

La historia es de cualquier negocio: el cuaderno mezcla arroz, tornillos y
rosas a propósito (con una sola floristería, la gente creía que era solo para
floristerías).

Todo el texto vive en `src/datos.ts`. Reglas que se cumplen ahí: «tú», frases
cortas, cero jerga, ningún precio, ninguna ley ni multa, y las cifras del
teléfono y de la planilla dicen que son de ejemplo. Las seis preguntas también
van en el JSON-LD de `index.html`: si se cambia una, se cambia en los dos.

La marca sale de `1Contenido/3 Marca`: las letras del logotipo están copiadas
trazo a trazo en `src/components/marca/glifos.ts`, y los SVG oficiales en
`public/marca/`.

## En el celular

No es la misma página en chico: va al grano y todo va centrado. Las pestañas
de «Qué hacemos» se deslizan y la elegida se centra sola. Balanza, cámara y lector se deslizan de lado
con puntitos; las diez cosas son fichas chicas; el WhatsApp está solo en la
barra de arriba (JIS, 29/9: «con ese es suficiente»); todo lo que se toca mide al menos 44 px; y la luz de
la ventana queda quieta para no gastar batería. Todo está en el bloque
«EL CELULAR» de `src/estilos.css`.

## Las páginas de servicio

`scripts/build-pages.mjs` genera tres páginas estáticas (el contenido está en
`scripts/paginas.mjs`) y el sitemap, para que Google las lea sin ejecutar
JavaScript. Tienen la misma barra, letras y colores que la portada.

## Comandos

```bash
npm run dev      # la portada en localhost:5173
npm run build    # portada + páginas de servicio + sitemap en dist/
```
