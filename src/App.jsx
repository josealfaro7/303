import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Ticket, IdCard, UserSearch, Settings, X } from 'lucide-react';

// --- CONFIGURACIÓN DE TEMAS ---
const themes = [
  { id: 'dark', name: 'Deep Nightlife', color: '#000000', accent: '#E6005C' },
  { id: 'alt', name: 'Alternative', color: '#050505', accent: '#00E676' }
];

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
          className="flex flex-row justify-between md:justify-evenly items-center w-full px-8 md:px-16 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase font-light text-textMain/70 absolute inset-0"
        >
          <a href="#servicios" className="hover:text-accentSecondary transition-colors duration-500">Servicios</a>
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

// --- COMPONENTES AUXILIARES ---

// Letra individual 2D con animación de caída y flotación
function FallingLetter2D({ char, index, customColor }) {
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

// 7. ThemeSwitcher Desplegable (Framer Motion)
const palettes = [
  { id: 'deep-nightlife', name: 'Deep Nightlife', bg: '#000000', text: '#FFFFFF', primary: '#E6005C', secondary: '#D4AF37' },
  { id: 'acid-minimal', name: 'Acid Minimal', bg: '#0D0D0D', text: '#F2F2F2', primary: '#CCFF00', secondary: '#4A4A4A' },
  { id: 'mediterranean', name: 'Mediterranean Midnight', bg: '#040914', text: '#FDFAF2', primary: '#FF6B00', secondary: '#FF9E79' },
  { id: 'brutalism', name: 'Brutalismo Industrial', bg: '#000000', text: '#FFFFFF', primary: '#E0E0E0', secondary: '#FF1A1A' }
];

function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('deep-nightlife');

  const applyTheme = (theme) => {
    document.documentElement.style.setProperty('--color-bg', theme.bg);
    document.documentElement.style.setProperty('--color-text', theme.text);
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-secondary', theme.secondary);
    localStorage.setItem('303-theme', theme.id);
    setActiveTheme(theme.id);
  };

  useEffect(() => {
    const saved = localStorage.getItem('303-theme');
    const themeToApply = palettes.find(t => t.id === saved) || palettes[0];
    applyTheme(themeToApply);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-accentMain text-background shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-24 right-8 z-[100] w-72 bg-[#111] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Temas</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-textMain transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-2 flex flex-col gap-1">
            {palettes.map(theme => (
              <button 
                key={theme.id}
                onClick={() => applyTheme(theme)}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${activeTheme === theme.id ? 'bg-gray-800' : 'hover:bg-gray-900'}`}
              >
                <span className="text-xs font-medium text-textMain">{theme.name}</span>
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full border border-gray-700" style={{ backgroundColor: theme.bg }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }} />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}

// --- APP ROOT ---
export default function App() {
  return (
    <div className="w-full min-h-screen selection:bg-accentMain selection:text-background bg-background text-textMain transition-colors duration-500">
      <Navbar />
      <Hero />
      <Services />
      <Team />
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
