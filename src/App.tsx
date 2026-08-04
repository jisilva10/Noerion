import { useState } from 'react';
import FrenaSection from "./components/FrenaSection";
import { useLegacyAnimations } from "@/hooks/useLegacyAnimations";
import { FeatureSteps } from './components/blocks/feature-section';
import { IconBrandInstagram, IconBrandWhatsapp, IconMail } from '@tabler/icons-react';
import { ChipEye } from './components/ui/ChipEye';

const demoFeatures = [
  { 
    step: '01', 
    title: 'Automatización Operativa',
    content: 'Sistemas inteligentes para el control de inventarios y gestión de pagos automatizada. Garantizamos que tu operación diaria fluya sin interrupciones.', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    step: '02',
    title: 'Ecosistemas de IA y Software Especializado',
    content: 'Creamos software especializado y tableros de control con Inteligencia Artificial que te dan visión absoluta sobre el rendimiento de tu negocio.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    step: '03',
    title: 'Consultoría y Optimización a Medida',
    content: 'Cada empresa tiene fugas de tiempo y dinero distintas. Diagnosticamos tus procesos, detectamos las tareas repetitivas y construimos la herramienta exacta para erradicar el problema.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop'
  },
];

export default function App() {
  useLegacyAnimations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>



<nav id="navbar">
  <a className="nav-logo" href="#">
    KAYR
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
      <rect x="5" y="2" width="12" height="12" rx="1.5" stroke="#B89A0A" strokeWidth="1.2" fill="none"/>
      <line x1="5" y1="5.5" x2="2" y2="5.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="5" y1="10.5" x2="2" y2="10.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="17" y1="5.5" x2="20" y2="5.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="17" y1="10.5" x2="20" y2="10.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="8" y1="2" x2="8" y2="0" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="11" y1="2" x2="11" y2="0" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="14" y1="2" x2="14" y2="0" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="8" y1="14" x2="8" y2="16" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="11" y1="14" x2="11" y2="16" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="14" y1="14" x2="14" y2="16" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="11" cy="8" r="2" fill="#B89A0A"/>
    </svg>
    N
  </a>
  <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
    <span></span><span></span>
  </div>
  <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
    <a href="#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a>
    <a href="#nosotros" onClick={() => setIsMenuOpen(false)}>Quiénes somos</a>
    <a href="#contacto" className="cta" onClick={() => setIsMenuOpen(false)}>Contacto</a>
  </div>
</nav>


<section className="hero" id="inicio">

  <div className="hero-left">
    <div className="hero-wordmark">
      KAYR
      <ChipEye className="chip-bounce" />
      N
    </div>
    <div className="hero-rule"></div>
    <div className="hero-sub">Consulting &amp; Engineering</div>
    <p className="hero-definition">
      kayr·on &nbsp;|&nbsp; del griego. (kairós) el momento exacto &nbsp;/&nbsp; (-on) fuerza que activa
    </p>
  </div>

  <div className="hero-right">
    <div className="hero-copy">
      <h1>
        Activamos tu<br />
        <em>momento.</em>
      </h1>
      <p>
        Optimizamos tus procesos con inteligencia artificial y automatización. Resultados reales, sistemas que funcionan, equipos que los adoptan.
      </p>
    </div>
    <div className="hero-chips-wrap">
      <a href="https://wa.me/593986145983" target="_blank" rel="noreferrer" className="contact-chip">
        <IconBrandWhatsapp size={20} stroke={1.5} />
        <span>WhatsApp</span>
      </a>
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jisignacio10@gmail.com" target="_blank" rel="noreferrer" className="contact-chip">
        <IconMail size={20} stroke={1.5} />
        <span>Email</span>
      </a>
      <a href="https://www.instagram.com/kayron.consulting/" target="_blank" rel="noreferrer" className="contact-chip">
        <IconBrandInstagram size={20} stroke={1.5} />
        <span>Instagram</span>
      </a>
    </div>
    <div className="grid-wrap">
      <canvas id="gridCanvas" />
    </div>
  </div>

</section>


      <FrenaSection />


<section className="process" id="proceso">
  <div className="process-header">
    <h2>Cómo trabajamos</h2>
    <p>Eliminamos la fricción. Un camino claro desde el primer contacto hasta el resultado final.</p>
  </div>

  <div className="track" id="track">
    <div className="track-line-bg"></div>
    <div className="track-line-gold" id="goldLine"></div>

    <div className="step" id="step1">
      <div className="step-node"></div>
      <span className="step-index">/ 01</span>
      <h3 className="step-title">Conversación</h3>
      <p className="step-body">Hablamos 30 minutos, entendemos tu situación sin compromiso.</p>
    </div>
    <div className="step" id="step2">
      <div className="step-node"></div>
      <span className="step-index">/ 02</span>
      <h3 className="step-title">Diagnóstico</h3>
      <p className="step-body">Mapeamos tus procesos y te presentamos un plan concreto.</p>
    </div>
    <div className="step" id="step3">
      <div className="step-node"></div>
      <span className="step-index">/ 03</span>
      <h3 className="step-title">Ejecución</h3>
      <p className="step-body">Implementamos, medimos y ajustamos contigo.</p>
    </div>
  </div>
</section>

<section className="services" id="servicios">
  <div className="block-header" style={{ paddingBottom: '40px' }}>
    <div className="section-index parallax" data-speed="0.15">02</div>
    <div className="header-content fade-up-scroll">
      <div>
        <div className="header-label" style={{ fontSize: '12px', letterSpacing: '0.3em', marginBottom: '20px' }}>NUESTROS SERVICIOS</div>
      </div>
    </div>
  </div>
  <FeatureSteps 
    features={demoFeatures}
    autoPlayInterval={12000}
  />
</section>

<section className="about" id="nosotros">

  <div className="block-header">
    <div className="section-index parallax" data-speed="0.15">03</div>
    <div className="header-content fade-up-scroll">
      <div>
        <div className="header-label">El Origen</div>
        <h2 className="header-title reveal-text" style={{ fontSize: '3rem', lineHeight: '1.1', marginBottom: '1rem' }}>
          <span>¿QUÉ SIGNIFICA<br />
          <em>KAYR·ON?</em></span>
        </h2>
      </div>
      <div>
        <p className="header-pull">
          Kairós era la comprensión griega del tiempo que importa. No el que se mide en relojes, sino el instante preciso en que actuar marca la diferencia entre avanzar o quedarse.
        </p>
        <p className="header-body">
          Le sumamos <strong>-on</strong>, el sufijo de las partículas que mueven el universo. El electrón. El fotón. No solo el momento. La fuerza que lo activa.
        </p>
      </div>
    </div>
  </div>

  <div className="block-founder">
    <div className="founder-photo-col creative-reveal">
      <div className="founder-photo-frame">
        <img
          src="founder-portrait.jpg"
          alt="José Ignacio Silva, fundador y consultor principal de Kayron Consulting &amp; Engineering"
          width="1086"
          height="1448"
          loading="lazy"
          decoding="async"
        />
        <div className="photo-name-tag">
          <h3>José Ignacio Silva</h3>
          <p>Fundador &amp; Consultor Principal</p>
        </div>
      </div>
    </div>

    <div className="founder-text-col fade-up-scroll">
      <div>
        <p className="ft-label">El fundador</p>
        <h3 className="ft-intro reveal-text">
          <span>Estrategia, talento humano<br />
          e <em>inteligencia artificial</em><br />
          en una sola conversación.</span>
        </h3>
        <p className="ft-body">
          Mi enfoque combina análisis organizacional profundo con implementación real. No entrego diagnósticos que terminan en un cajón, sino sistemas claros que tu equipo adopta, generando resultados medibles desde el primer mes de trabajo.
        </p>
        <div className="ft-tags">
          <span className="ft-tag gold">Inteligencia Artificial</span>
          <span className="ft-tag">Automatización</span>
          <span className="ft-tag">Estrategia Empresarial</span>
          <span className="ft-tag">Gestión del Talento</span>
          <span className="ft-tag gold">N8n · LLMs</span>
          <span className="ft-tag">Consultoría de Procesos</span>
        </div>
      </div>
      <div className="ft-quote">
        <blockquote>"Tu momento de transformación ya existe dentro de tu empresa. Nosotros somos la fuerza que lo activa."</blockquote>
        <cite>José Ignacio Silva, Fundador de Kayron</cite>
      </div>
    </div>
  </div>
</section>


<section className="footer-cta fade-up-scroll" id="contacto">
  <h2 className="reveal-text">
    <span>Tu momento<br />
    KAYR
    <svg width="1.05em" height="0.75em" viewBox="0 0 22 16" fill="none" style={{ display: 'inline-block', margin: '0 0.05em', transform: 'translateY(-0.15em)' }}>
      <rect x="5" y="2" width="12" height="12" rx="1.5" stroke="#B89A0A" strokeWidth="1.2" fill="none"/>
      <line x1="5" y1="5.5" x2="2" y2="5.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="5" y1="10.5" x2="2" y2="10.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="17" y1="5.5" x2="20" y2="5.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="17" y1="10.5" x2="20" y2="10.5" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="8" y1="2" x2="8" y2="0" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="11" y1="2" x2="11" y2="0" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="14" y1="2" x2="14" y2="0" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="8" y1="14" x2="8" y2="16" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="11" y1="14" x2="11" y2="16" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <line x1="14" y1="14" x2="14" y2="16" stroke="#B89A0A" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="11" cy="8" r="2" fill="#B89A0A"/>
    </svg>
    N<br />
    es <em>ahora.</em></span>
  </h2>
  <p style={{ marginBottom: '32px' }}>Sin compromiso. Con claridad sobre qué está frenando tu empresa y cómo resolverlo.</p>
  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
    <a href="https://wa.me/593986145983" target="_blank" rel="noreferrer" className="contact-chip">
      <IconBrandWhatsapp size={20} stroke={1.5} />
      <span>WhatsApp</span>
    </a>
    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jisignacio10@gmail.com" target="_blank" rel="noreferrer" className="contact-chip">
      <IconMail size={20} stroke={1.5} />
      <span>Email</span>
    </a>
    <a href="https://www.instagram.com/kayron.consulting/" target="_blank" rel="noreferrer" className="contact-chip">
      <IconBrandInstagram size={20} stroke={1.5} />
      <span>Instagram</span>
    </a>
  </div>
</section>

<footer>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%' }}>
    <p>© 2026 Kayron Consulting &amp; Engineering</p>
    <p>Ecuador</p>
  </div>
</footer>





    </>
  );
}
