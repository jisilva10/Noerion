# noerionconsulting.com

La web de Noerion. React + Vite; se publica en Vercel.

## La portada

Cuatro pantallas y nada más (JIS, 18/11/2026: «minimalismo puro»). Cada una
cabe entera, sin bajar, y la página se detiene en cada una al hacer scroll.

| Pantalla | Qué tiene |
|---|---|
| Inicio | «Tres sistemas para tu negocio.», la señal para bajar (una línea por la que cae una gota, sin palabras) y el chip del logo en grande dentro de un círculo de tinta. Entra dormido, abre el ojo, sigue el cursor o el dedo, mira lo que señalas, mira a su alrededor si nadie se mueve (a veces hacia la señal para bajar) y se duerme cuando te vas. Si lo tocas, salta. El titular va con «difference»: tinta sobre el papel, papel sobre el círculo |
| Sistemas | una galería: Inventario, Mensajes y Contenido son paneles en fila; el que tocas (o pasas el cursor) se abre con su dibujo moviéndose y una línea; si lo vuelves a tocar, en cualquier parte, se abre una ventana (sin cambiar de página) con tres pasos y «Quiero este». El cuarto, «¿Otra cosa?», es angosto y abre su propia ventana. En el celular se abre hacia abajo |
| Quién soy | la foto de la mesa oscura, «Primero entender. Después, que suceda.», el logotipo entero como una suma, «NOERION = noerós + -ion» (lo que comprende, lo que se hace), el nombre, la cita e Instagram |
| Cierre y pie | el logotipo quieto (el único ojo que se mueve es el del inicio), «Dime cuál necesitas» y el pie |

Los dibujos (`piezas/Dibujos.tsx`) no llevan palabras y son formales: línea
fina de tinta, papel por dentro y un solo acento por sistema. Se fueron cómo trabajo, las preguntas y las demos con texto.

Todo el texto vive en `src/datos.ts` (`SISTEMAS`, `CONSULTORIA`). Reglas:
«tú», primera persona del singular, frases cortas, cero jerga, ningún precio,
nada de facturas ni cobros como servicio, y solo lo que se entrega hoy.

La marca sale de `1Contenido/3 Marca`: las letras del logotipo están copiadas
trazo a trazo en `src/components/marca/glifos.ts`, y los SVG oficiales en
`public/marca/`. El titular del inicio y los nombres de la galería van en DM
Sans 700; las frases de marca siguen en Cormorant.

Se prueba en 1280×800, 390×844 y 360×740.

## Las páginas de servicio

`scripts/build-pages.mjs` genera cuatro páginas estáticas (una por sistema y la consultoría; las dos direcciones viejas redirigen en `vercel.json`) (el contenido está en
`scripts/paginas.mjs`) y el sitemap, para que Google las lea sin ejecutar
JavaScript. Tienen la misma barra, letras y colores que la portada.

## Comandos

```bash
npm run dev      # la portada en localhost:5173
npm run build    # portada + páginas de servicio + sitemap en dist/
```
