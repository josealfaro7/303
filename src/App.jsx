import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Calendar, Ticket, IdCard, UserSearch, X, ChevronLeft, ChevronRight, MapPin, Clock, Music, ArrowUpRight } from 'lucide-react';

// 1. Navbar con animación de scroll (Fondo Glassmorphism + Logo 303!)
function Navbar() {
  const { scrollY } = useScroll();
  
  // A medida que se scrollea hacia abajo, los links se desvanecen
  const linksOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const linksPointerEvents = useTransform(scrollY, [0, 100], ['auto', 'none']);
  
  // A partir de 100px a 250px, aparece el texto 303
  const logoOpacity = useTransform(scrollY, [100, 250], [0, 1]);
  const logoPointerEvents = useTransform(scrollY, [150, 250], ['none', 'auto']);

  // El fondo de la navbar pasa de transparente a un cristal difuminado (Glassmorphism) usando var(--color-bg)
  // Como framer-motion no anima bien CSS vars en colores, usamos rgba negro genérico que queda bien en todos los temas
  const navBackground = useTransform(scrollY, [50, 150], ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.85)']);
  const navBorder = useTransform(scrollY, [50, 150], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.05)']);
  const navBackdrop = useTransform(scrollY, [50, 150], ['blur(0px)', 'blur(12px)']);

  return (
    <motion.nav 
      style={{ 
        backgroundColor: navBackground, 
        borderBottomColor: navBorder,
        borderBottomWidth: '1px',
        backdropFilter: navBackdrop,
        WebkitBackdropFilter: navBackdrop
      }}
      className="fixed top-0 w-full z-50 py-6 pointer-events-none transition-all"
    >
      <div className="container mx-auto px-8 md:px-16 w-full relative h-10 flex items-center justify-center">
        
        {/* Links que desaparecen al scrollear */}
        <motion.div 
          style={{ opacity: linksOpacity, pointerEvents: linksPointerEvents }}
          className="flex flex-row justify-between md:justify-evenly items-center w-full px-6 md:px-16 text-[9px] md:text-xs tracking-[0.18em] md:tracking-[0.4em] uppercase font-light text-textMain/70 absolute inset-0"
        >
          <a href="#servicios" className="hover:text-accentSecondary transition-colors duration-500">Servicios</a>
          <a href="#cartelera" className="hover:text-accentSecondary transition-colors duration-500">Cartelera</a>
          <a href="#equipo" className="hover:text-accentSecondary transition-colors duration-500">Equipo</a>
          <a href="#contacto" className="hover:text-accentSecondary transition-colors duration-500">Contacto</a>
          <a href="mailto:info.303.es@gmail.com" className="relative group text-textMain font-normal">
            Cotizar
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-textMain transition-all duration-500 group-hover:w-full"></span>
          </a>
        </motion.div>

        {/* Logo "303!" que aparece en el centro al scrollear */}
        <motion.div
          style={{ opacity: logoOpacity, pointerEvents: logoPointerEvents }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="select-none inline-block hover:scale-105 transition-transform duration-500 cursor-pointer" 
            style={{
              fontFamily: "'La Cavale Solitaire', sans-serif",
              color: 'var(--color-primary)',
              fontSize: "2.5rem", // Ligeramente más chico para encajar perfecto en la navbar
              lineHeight: 1,
            }}
          >
            303!
          </a>
        </motion.div>
      </div>
    </motion.nav>
  );
}

// --- COMPONENTES AUXILIARES ---

// Letra individual 2D con animación de caída y flotación
function FallingLetter2D({ char, index }) {
  return (
    <motion.div
      initial={{ y: -300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 12,
        stiffness: 40,
        delay: index * 0.25,
      }}
      className="inline-block"
    >
      <motion.span
        animate={{ y: [0, -20, 0] }} // Flotación constante tipo <Float>
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3, // Desfasaje entre letras
        }}
        className="inline-block select-none"
        style={{
          fontFamily: "'La Cavale Solitaire', sans-serif",
          color: 'var(--color-primary)',
          fontSize: "clamp(8rem, 25vw, 25rem)", // Tamaño responsivo gigante
          lineHeight: 1,
        }}
      >
        {char}
      </motion.span>
    </motion.div>
  );
}

// Logo 2D Animado
function Title2D() {
  const letters = ['3', '0', '3', '!'];
  
  return (
    <div className="flex flex-row items-center justify-center z-10 drop-shadow-2xl">
      {letters.map((char, i) => (
        <FallingLetter2D key={i} char={char} index={i} />
      ))}
    </div>
  );
}

// 3. Hero Section (2D Ligero)
function Hero() {
  return (
    <section className="h-screen w-full relative flex flex-col items-center justify-center pt-32 overflow-hidden bg-transparent">
      
      {/* TÍTULO 2D CON CAÍDA Y FLOTACIÓN */}
      <div className="absolute inset-0 z-0 flex items-center justify-center -mt-32 md:mt-0">
        <Title2D />
      </div>
      
      <div className="z-10 mt-auto mb-32 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="text-xl md:text-3xl font-light tracking-[0.4em] leading-loose text-textMain drop-shadow-lg"
        >
          CREAMOS EXPERIENCIAS, <br className="hidden md:block" />
          <span className="text-accentSecondary font-bold">NO SOLO EVENTOS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
          className="mt-6 text-[8px] md:text-[10px] font-semibold tracking-[0.5em] md:tracking-[0.8em] text-gray-300 uppercase"
        >
          Alicante <span className="text-accentSecondary">—</span> Altea <span className="text-accentSecondary">—</span> Benidorm <span className="text-accentSecondary">—</span> Murcia
        </motion.p>
      </div>
    </section>
  );
}

// 4. Sección Servicios (Tipográfica, Asimétrica, SIN TARJETAS)
function Services() {
  const servicesData = [
    { 
      title: "ESPACIOS", 
      desc: <>Acceso exclusivo a <strong className="text-textMain font-bold">locaciones únicas</strong>. Desde <strong className="text-textMain font-bold">rooftops panorámicos</strong> en el corazón de la ciudad hasta <strong className="text-textMain font-bold">villas privadas</strong> y entornos al aire libre diseñados para experiencias inmersivas.</> 
    },
    { 
      title: "MÚSICA", 
      desc: <>Curaduría sonora de primer nivel. Contamos con un <strong className="text-textMain font-bold">roster de DJs profesionales</strong> y selectores adaptados milimétricamente al estilo y la energía que requiere la <strong className="text-textMain font-bold">atmósfera de tu evento</strong>.</> 
    },
    { 
      title: "COCTELERÍA", 
      desc: <>Mixología de autor. <strong className="text-textMain font-bold">Bartenders especializados</strong> en crear tragos conceptuales con <strong className="text-textMain font-bold">destilados premium</strong>, aportando un verdadero espectáculo visual en la barra durante toda la noche.</> 
    },
    { 
      title: "FOTOGRAFÍA & VIDEO", 
      desc: <>Dirección de arte y registro cinematográfico. <strong className="text-textMain font-bold">Iluminación escénica</strong> y un <strong className="text-textMain font-bold">equipo audiovisual</strong> enfocado en capturar la esencia estética de cada momento para que perdure en la memoria.</> 
    }
  ];

  return (
    <section id="servicios" className="py-20 md:py-48 w-full flex flex-col justify-center bg-transparent relative z-10">
      <div className="container mx-auto px-8 max-w-5xl">
        <div className="flex flex-col gap-20 md:gap-32">
          {servicesData.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }} 
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
              className="flex flex-col items-start"
            >
              <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-textMain transition-colors duration-500 hover:text-accentMain cursor-default">
                {s.title}<span className="text-accentSecondary">.</span>
              </h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mt-4 text-xs md:text-sm font-normal tracking-[0.2em] text-gray-400 md:w-3/4 uppercase leading-relaxed"
              >
                {s.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4.5. Sección Cartelera (Próximos Eventos - Carrusel Horizontal + Modal)
const eventsData = [
  {
    id: "303-acid-warehouse",
    title: "303: ACID WAREHOUSE",
    date: "24 NOV",
    location: "Secret Warehouse, Alicante",
    schedule: "23:30 — 07:00 HRS",
    lineup: ["ANDREW (Extended Acid Set)", "JULIAN", "INVITADO ESPECIAL TBA"],
    description:
      "Una inmersión cruda en el sonido underground. Estrobos industriales, sistema de sonido cuadrafónico y una locación secreta revelada únicamente a los asistentes con entrada 12 horas antes del evento.",
    flyer:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=85",
    ticketUrl: "https://es.ra.co/",
  },
  {
    id: "mediterranean-rooftop",
    title: "SUNSET FREQUENCIES",
    date: "08 DIC",
    location: "Villa Panorámica, Altea",
    schedule: "18:00 — 03:00 HRS",
    lineup: ["ADRIAN (Deep House Sunset)", "JULIAN (Progressive Session)"],
    description:
      "Transición hipnótica desde el atardecer frente al Mediterráneo hasta la medianoche. Mixología de autor en vivo, aforo estrictamente reducido y curaduría sonora diseñada para fluir con el entorno.",
    flyer:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=900&q=85",
    ticketUrl: "https://fourvenues.com/",
  },
  {
    id: "nocturna-vip-session",
    title: "NOCTURNA // 303 CLUB",
    date: "21 DIC",
    location: "Skyline Penthouse, Benidorm",
    schedule: "00:00 — 06:30 HRS",
    lineup: ["ANDREW B2B ADRIAN", "VISUALS BY KINETIC LAB"],
    description:
      "Experiencia audiovisual en las alturas. Iluminación láser minimalista sobre vistas 360° de la costa, barra de destilados de colección y dresscode riguroso Total Black.",
    flyer:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=85",
    ticketUrl: "https://xceed.me/",
  },
  {
    id: "ny-underground-ritual",
    title: "GENESIS NYE 01.01",
    date: "31 DIC",
    location: "Finca Privada, Murcia",
    schedule: "23:59 — 10:00 HRS",
    lineup: ["FULL 303 ROSTER", "ANDREW", "JULIAN", "ADRIAN"],
    description:
      "El primer amanecer del año bajo el sello 303. Más de diez horas ininterrumpidas de música electrónica selecta, producción escénica de alto contraste y servicio premium toda la noche.",
    flyer:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=85",
    ticketUrl: "https://es.ra.co/",
  },
];

function Cartelera() {
  const carouselRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Desplazamiento horizontal exacto de 1 columna con botones en escritorio
  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.querySelector('article');
    const gap = window.innerWidth >= 768 ? 32 : 24; // md:gap-8 (32px) o gap-6 (24px)
    const scrollAmount = firstCard ? firstCard.offsetWidth + gap : 360;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Cerrar modal con tecla Escape y bloquear el scroll del body cuando está abierto
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null);
      }
    };

    if (selectedEvent) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedEvent]);

  return (
    <section id="cartelera" className="py-20 md:py-48 w-full flex flex-col justify-center bg-transparent relative z-10">
      <div className="container mx-auto px-8 max-w-6xl">
        {/* Cabecera de sección y controles del carrusel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="text-[10px] tracking-[0.4em] uppercase text-accentSecondary font-bold mb-3"
            >
              Próximos Eventos
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2 }}
              className="text-3xl md:text-6xl font-extrabold tracking-tighter uppercase text-textMain"
            >
              Cartelera<span className="text-accentSecondary">.</span>
            </motion.h2>
          </div>

          {/* Botones de navegación (Escritorio) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Anterior evento"
              className="p-3 border border-gray-800 hover:border-accentSecondary text-textMain hover:text-accentSecondary transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Siguiente evento"
              className="p-3 border border-gray-800 hover:border-accentSecondary text-textMain hover:text-accentSecondary transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Carrusel Horizontal de Flyers */}
        <div
          ref={carouselRef}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4"
        >
          {eventsData.map((ev, index) => (
            <motion.article
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setSelectedEvent(ev)}
              className="snap-start shrink-0 w-[82vw] sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-4rem)/3)] group cursor-pointer select-none"
            >
              {/* Flyer Poster 3:4 */}
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-gray-800 group-hover:border-accentMain transition-colors duration-500">
                <img
                  src={ev.flyer}
                  alt={ev.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Fecha flotante minimalista */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accentSecondary">
                    {ev.date}
                  </span>
                </div>

                {/* Indicador sutil de abrir modal */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-accentMain text-background p-2">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Pie tipográfico del Flyer */}
              <div className="mt-5 flex flex-col items-start">
                <h3 className="text-lg md:text-xl font-bold tracking-widest uppercase text-textMain group-hover:text-accentMain transition-colors duration-500">
                  {ev.title}
                </h3>
                <p className="mt-1.5 text-[10px] md:text-xs font-light tracking-[0.25em] uppercase text-gray-400">
                  {ev.location}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal Superpuesto de Detalle del Evento */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-background border border-gray-800 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Botón Cerrar */}
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                aria-label="Cerrar modal"
                className="absolute top-4 right-4 z-20 p-2 bg-black/70 text-gray-400 hover:text-textMain border border-gray-800 hover:border-textMain transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Columna Imagen del Flyer */}
              <div className="w-full md:w-5/12 relative bg-black shrink-0">
                <img
                  src={selectedEvent.flyer}
                  alt={selectedEvent.title}
                  className="w-full h-64 md:h-full object-cover contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
              </div>

              {/* Columna Información del Evento */}
              <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-accentSecondary">
                    {selectedEvent.date} // 303 OFFICIAL EVENT
                  </span>
                  <h3 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight uppercase text-textMain">
                    {selectedEvent.title}<span className="text-accentSecondary">.</span>
                  </h3>

                  {/* Metadatos: Lugar y Horario */}
                  <div className="mt-6 flex flex-col gap-3 border-y border-gray-800 py-4 text-xs tracking-[0.2em] uppercase text-gray-300">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-accentMain shrink-0" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-accentMain shrink-0" />
                      <span>{selectedEvent.schedule}</span>
                    </div>
                  </div>

                  {/* Lineup */}
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.35em] uppercase text-accentSecondary mb-3">
                      <Music className="w-3.5 h-3.5" />
                      <span>Lineup</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.lineup.map((artist, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 border border-gray-800 text-textMain"
                        >
                          {artist}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="mt-6 text-xs md:text-sm font-light tracking-wider text-gray-400 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* CTA Comprar Tickets */}
                <div className="mt-8 pt-4">
                  <a
                    href={selectedEvent.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 bg-accentMain text-background font-bold text-xs tracking-[0.35em] uppercase hover:opacity-90 transition-opacity duration-300"
                  >
                    <span>Comprar Tickets</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// 5. Equipo (Tipográfico Horizontal, Sin Fotos)
function Team() {
  // Datos reales del equipo
  const teamData = [
    { name: "ANDREW", role: "DJ MINIMAL" },
    { name: "JULIAN", role: "DJ PROGRESIVE / LATIN MUSIC" },
    { name: "ADRIAN", role: "DJ HOUSE" },
    { name: "DAVID", role: "BARTENDER" }
  ];

  return (
    <section id="equipo" className="py-20 md:py-48 w-full flex flex-col justify-center bg-transparent relative z-10">
      <div className="container mx-auto px-8 max-w-6xl">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5 }}
          className="text-2xl md:text-4xl font-light text-center mb-20 md:mb-32 tracking-[0.4em] uppercase text-textMain"
        >
          Conoce al equipo<span className="text-accentSecondary font-bold">.</span>
        </motion.h2>
        
        {/* En móvil se apilan verticalmente, en pantallas grandes (lg) horizontal */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-4 w-full">
          {teamData.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: i * 0.15 }}
              className="flex flex-col items-center text-center group cursor-default"
            >
              <h3 className="text-xl md:text-2xl font-bold tracking-widest text-textMain transition-colors duration-500 hover:text-accentMain">
                {member.name}
              </h3>
              <p className="mt-3 text-xs lg:text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. Footer / Contacto (Sin formularios)
function Footer() {
  const advantages = [
    { icon: Calendar, text: "Elige tu próxima fecha" },
    { icon: Ticket, text: "Facilidad de financiamiento" },
    { icon: IdCard, text: "Only for cool people" },
    { icon: UserSearch, text: "Guest Star" }
  ];

  return (
    <footer id="contacto" className="py-20 md:py-48 w-full flex flex-col justify-center relative z-10 bg-transparent">
      <div className="container mx-auto px-8 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5 }}
          className="text-4xl md:text-6xl font-light tracking-tighter mb-16 md:mb-24 text-textMain"
        >
          ¿Hablamos de tu evento<span className="text-accentSecondary">?</span>
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="w-full max-w-md flex flex-col gap-8 mb-16"
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const msg = e.target.message.value;
              window.location.href = `mailto:info.303.es@gmail.com?subject=Nuevo Contacto de ${email}&body=${encodeURIComponent(msg)}`;
            }}
            className="flex flex-col gap-10 text-left w-full"
          >
            {/* Input Correo con Floating Label */}
            <div className="relative group">
              <input 
                type="email" 
                name="email"
                required
                placeholder=" "
                className="peer bg-transparent border-b border-gray-600 py-3 text-textMain text-sm md:text-base focus:outline-none focus:border-textMain transition-colors duration-500 w-full"
              />
              <label className="absolute left-0 top-3 text-gray-500 text-xs md:text-sm tracking-widest uppercase transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-textMain peer-valid:-top-4 peer-valid:text-[9px] peer-valid:text-gray-400 pointer-events-none">
                Tu Correo
              </label>
            </div>
            
            {/* Input Mensaje con Floating Label */}
            <div className="relative group">
              <textarea 
                name="message"
                required
                rows="1"
                placeholder=" "
                className="peer bg-transparent border-b border-gray-600 py-3 text-textMain text-sm md:text-base focus:outline-none focus:border-textMain transition-colors duration-500 w-full resize-none h-12"
              ></textarea>
              <label className="absolute left-0 top-3 text-gray-500 text-xs md:text-sm tracking-widest uppercase transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-textMain peer-valid:-top-4 peer-valid:text-[9px] peer-valid:text-gray-400 pointer-events-none">
                Mensaje
              </label>
            </div>

            {/* Botón Enviar Minimalista */}
            <button 
              type="submit" 
              className="self-end mt-2 text-xs md:text-sm tracking-[0.3em] uppercase font-light text-gray-400 hover:text-textMain transition-colors duration-500 relative group"
            >
              Enviar
              <span className="absolute -bottom-2 right-0 w-0 h-[1px] bg-textMain transition-all duration-500 group-hover:w-full"></span>
            </button>
          </form>
        </motion.div>
        
        {/* Banner de Ventajas (Horizontal siempre) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="mt-32 md:mt-48 w-full max-w-5xl flex flex-col"
        >
          <div className="grid grid-cols-4 w-full mb-4 md:mb-6">
            {advantages.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <div key={i} className="flex justify-center items-center">
                  <Icon className="w-5 h-5 md:w-8 md:h-8 text-textMain" strokeWidth={1} />
                </div>
              );
            })}
          </div>
          
          <div className="w-full h-[1px] bg-gray-600 mb-4 md:mb-6"></div>
          
          <div className="grid grid-cols-4 w-full text-center items-start">
            {advantages.map((adv, i) => (
              <div key={i} className="flex justify-center px-0.5 md:px-2">
                <span className="text-[7.5px] leading-tight md:text-sm md:leading-normal font-normal text-textMain">
                  {adv.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

// --- APP ROOT ---
export default function App() {
  useEffect(() => {
    // Asegura que siempre quede fija la paleta original Deep Nightlife (Fucsia #E6005C y Dorado #D4AF37)
    document.documentElement.style.setProperty('--color-bg', '#000000');
    document.documentElement.style.setProperty('--color-text', '#FFFFFF');
    document.documentElement.style.setProperty('--color-primary', '#E6005C');
    document.documentElement.style.setProperty('--color-secondary', '#D4AF37');
    localStorage.removeItem('303-theme');
  }, []);

  return (
    <div className="w-full min-h-screen selection:bg-accentMain selection:text-background bg-background text-textMain transition-colors duration-500">
      <Navbar />
      <Hero />
      <Services />
      <Cartelera />
      <Team />
      <Footer />
    </div>
  );
}
