import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './estilos.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Las páginas de servicio enlazan a /#servicios, /#nosotros… Como la portada
// la arma React, el ancla todavía no existe cuando el navegador intenta
// saltar: se salta a mano en cuanto el contenido está puesto.
if (window.location.hash) {
  const destino = decodeURIComponent(window.location.hash.slice(1));
  requestAnimationFrame(() =>
    requestAnimationFrame(() => document.getElementById(destino)?.scrollIntoView())
  );
}
