import * as THREE from 'three';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Text3D, Center, Float, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

// --- CONFIGURACIÓN DE TEMAS ---
const themes = [
  { id: 'dark', name: 'Deep Nightlife', color: '#000000', accent: '#E6005C' },
  { id: 'alt', name: 'Alternative', color: '#050505', accent: '#00E676' }
];

// 1. Navbar Ultra Minimalista
function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 py-12">
      <div className="container mx-auto px-4 md:px-16 w-full">
        <div className="flex flex-row justify-between md:justify-evenly items-center w-full text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase font-light text-gray-300">
          <a href="#servicios" className="hover:text-white transition-colors duration-500">Servicios</a>
          <a href="#equipo" className="hover:text-white transition-colors duration-500">Equipo</a>
          <a href="#contacto" className="hover:text-white transition-colors duration-500">Contacto</a>
          <a href="mailto:info.303.es@gmail.com" className="relative group text-white font-normal">
            Cotizar
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// 2. Elemento 3D Refinado
function Logo3D({ themeColor }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t / 3) / 6;
    meshRef.current.rotation.x = Math.sin(t / 4) / 12;
    meshRef.current.position.x = (state.pointer.x * state.viewport.width) / 40;
    meshRef.current.position.y = (state.pointer.y * state.viewport.height) / 40;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <Center>
        <Text3D
          ref={meshRef}
          font="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json" 
          size={5}
          height={2} // Extremely thick
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.3}
          bevelSize={0.2}
          bevelOffset={0}
          bevelSegments={16} // Very rounded, polished block / balloon look
        >
          303
          <meshPhysicalMaterial 
            color={themeColor} 
            emissive={themeColor} 
            emissiveIntensity={0.25}
            roughness={0.05} // High reflectiveness
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

// --- COMPONENTES AUXILIARES ---

// --- COMPONENTES AUXILIARES ---

// Letra individual con animación de caída física
function FallingLetter({ char, index, xOffset, customColor }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Delay de 0.25s entre cada letra
    const delay = index * 0.25;
    if (state.clock.elapsedTime > delay) {
      // Suavizado manual (lerp) para evitar errores de referencia con la librería THREE
      groupRef.current.position.y += (0 - groupRef.current.position.y) * (delta * 4);
    }
  });

  return (
    // Empieza 15 unidades por encima de la pantalla
    <group ref={groupRef} position={[xOffset, 15, 0]}>
      
      {/* Texto Frontal Principal */}
      <Text
        font="/fuentes/lacavale.ttf"
        fontSize={5.3} // Escala fijada a 5.3 como solicitaste
        outlineWidth={0.03}
        outlineColor={customColor}
      >
        {char}
        <meshStandardMaterial 
          color={customColor}
          emissive={customColor}
          emissiveIntensity={0.3} 
          roughness={0.15} 
          metalness={0.3} 
        />
      </Text>
      
      {/* Aura Trasera / Glow */}
      <Text
        font="/fuentes/lacavale.ttf"
        fontSize={5.5} 
        position={[0, 0, -0.6]}
        fillOpacity={1}
      >
        {char}
        <meshBasicMaterial 
          color={customColor} 
          toneMapped={false}
        />
      </Text>
    </group>
  );
}

// Logo Animado (R3F) con Letras Independientes
function Title3D({ customColor }) {
  // Distancias relativas. Ancho total aprox: 8.8. La mitad es 4.4.
  const letters = [
    { char: '3', x: 0 },
    { char: '0', x: 3.2 },
    { char: '3', x: 6.4 },
    { char: '!', x: 8.8 },
  ];

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.4} 
      floatIntensity={0.6}
    >
      {/* Grupo centrador manual para evitar conflictos del componente Center con las posiciones iniciales */}
      <group position={[-4.4, 0, 0]} rotation={[0, 0, -0.1]}>
        {letters.map((l, i) => (
          <FallingLetter 
            key={i} 
            char={l.char} 
            index={i} 
            xOffset={l.x} 
            customColor={customColor} 
          />
        ))}
      </group>
    </Float>
  );
}

// 3. Hero Section (3D R3F)
function Hero({ themeColor }) {
  const [customColor, setCustomColor] = useState('#FF0055');

  return (
    <section className="h-screen w-full relative flex flex-col items-center justify-center pt-32 overflow-hidden bg-black cursor-grab active:cursor-grabbing">
      
      {/* PANEL DE CONTROL (Color) */}
      <div className="absolute top-32 left-8 z-50 flex flex-col gap-5 bg-[#111] p-5 rounded-xl border border-white/10 w-72 shadow-2xl">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 border-b border-gray-800 pb-2">Ajustes 3D</p>
        
        {/* Selector de Color */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase text-gray-500 tracking-wider">Color del Neón</label>
          <div className="flex items-center gap-3">
            <input 
              type="color" 
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
            />
            <span className="text-white text-xs font-mono">{customColor}</span>
          </div>
        </div>
      </div>

      {/* TÍTULO 3D OSCILANTE CON ILUMINACIÓN AJUSTADA */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <Suspense fallback={null}>
            <color attach="background" args={['#000000']} />
            
            <ambientLight intensity={1.5} />
            
            <spotLight 
              position={[0, 5, 12]} 
              angle={0.6} 
              penumbra={0.8} 
              intensity={8} 
              color="white" 
            />
            
            <spotLight 
              position={[-10, -5, 5]} 
              angle={0.5} 
              penumbra={0.5} 
              intensity={12} 
              color={customColor} 
            />

            <spotLight 
              position={[10, 10, -5]} 
              angle={0.6} 
              penumbra={1} 
              intensity={10} 
              color="white" 
            />
            
            <Title3D customColor={customColor} />
            
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="z-10 mt-auto mb-32 text-center pointer-events-none px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="text-xl md:text-3xl font-light tracking-[0.4em] leading-loose text-white drop-shadow-lg"
        >
          CREAMOS EXPERIENCIAS, <br className="hidden md:block" />
          <span className="text-accentSecondary font-semibold">NO SOLO EVENTOS</span>
        </motion.h1>
      </div>
    </section>
  );
}

// 4. Sección Servicios (Tipográfica, Asimétrica, SIN TARJETAS)
function Services() {
  const servicesData = [
    { 
      title: "ESPACIOS", 
      desc: <>Acceso exclusivo a <strong className="text-white font-bold">locaciones únicas</strong>. Desde <strong className="text-white font-bold">rooftops panorámicos</strong> en el corazón de la ciudad hasta <strong className="text-white font-bold">villas privadas</strong> y entornos al aire libre diseñados para experiencias inmersivas.</> 
    },
    { 
      title: "MÚSICA", 
      desc: <>Curaduría sonora de primer nivel. Contamos con un <strong className="text-white font-bold">roster de DJs profesionales</strong> y selectores adaptados milimétricamente al estilo y la energía que requiere la <strong className="text-white font-bold">atmósfera de tu evento</strong>.</> 
    },
    { 
      title: "COCTELERÍA", 
      desc: <>Mixología de autor. <strong className="text-white font-bold">Bartenders especializados</strong> en crear tragos conceptuales con <strong className="text-white font-bold">destilados premium</strong>, aportando un verdadero espectáculo visual en la barra durante toda la noche.</> 
    },
    { 
      title: "FOTOGRAFÍA & VIDEO", 
      desc: <>Dirección de arte y registro cinematográfico. <strong className="text-white font-bold">Iluminación escénica</strong> y un <strong className="text-white font-bold">equipo audiovisual</strong> enfocado en capturar la esencia estética de cada momento para que perdure en la memoria.</> 
    }
  ];

  return (
    <section id="servicios" className="py-32 md:py-48 w-full flex flex-col justify-center bg-transparent relative z-10">
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
              <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-white transition-colors duration-500 hover:text-accentMain cursor-default">
                {s.title}
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

// 5. Equipo (Minimalista, Placeholder único)
function Team() {
  return (
    <section id="equipo" className="py-32 md:py-48 w-full flex flex-col justify-center bg-transparent relative z-10">
      <div className="container mx-auto px-8 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5 }}
          className="text-2xl md:text-4xl font-light text-center mb-16 md:mb-24 tracking-[0.4em] uppercase text-white"
        >
          Conoce al equipo
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#0A0A0A] flex items-center justify-center group overflow-hidden"
        >
           <span className="text-[#1A1A1A] tracking-[0.5em] text-xs uppercase group-hover:text-gray-600 transition-colors duration-1000">
             [ Team Photo Placeholder ]
           </span>
        </motion.div>
      </div>
    </section>
  );
}

// 6. Footer / Contacto (Sin formularios)
function Footer() {
  return (
    <footer id="contacto" className="py-32 md:py-48 w-full flex flex-col justify-center relative z-10 bg-transparent">
      <div className="container mx-auto px-8 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5 }}
          className="text-4xl md:text-6xl font-light tracking-tighter mb-16 md:mb-24 text-white"
        >
          ¿Hablamos de tu evento?
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="flex flex-col gap-12"
        >
          <a href="mailto:info.303.es@gmail.com" className="text-xl md:text-5xl font-bold tracking-widest text-white hover:text-accentMain transition-colors duration-700">
            info.303.es@gmail.com
          </a>
          <a href="tel:+34614929109" className="text-lg md:text-2xl font-light tracking-[0.3em] text-accentSecondary hover:text-white transition-colors duration-700">
            +34 614 929 109
          </a>
        </motion.div>
        
        <div className="mt-32 md:mt-48 text-[9px] font-bold tracking-[0.6em] uppercase text-gray-800">
          only for cool people
        </div>
      </div>
    </footer>
  );
}

// 7. Selector Flotante de Temas (Discreto)
function ThemeSelector({ currentTheme, setTheme }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <div className="fixed bottom-12 right-12 z-50 flex gap-6">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`w-2 h-2 rounded-full transition-all duration-700 ${currentTheme === t.id ? 'scale-[2.5] ring-1 ring-offset-4 ring-offset-black ring-gray-700' : 'opacity-20 hover:opacity-100 hover:scale-150'}`}
          style={{ backgroundColor: t.accent }}
          title={t.name}
        />
      ))}
    </div>
  );
}

// --- APP ROOT ---
export default function App() {
  const [theme, setTheme] = useState('dark');

  const currentAccent = themes.find(t => t.id === theme)?.accent || '#E6005C';

  return (
    <div className="w-full min-h-screen selection:bg-accentMain selection:text-white bg-black">
      <Navbar />
      <Hero themeColor={currentAccent} />
      <Services />
      <Team />
      <Footer />
      <ThemeSelector currentTheme={theme} setTheme={setTheme} />
    </div>
  );
}
