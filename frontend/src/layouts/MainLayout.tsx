import React, { useState, useEffect } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Controlar scroll y botón BackToTop
  useEffect(() => {
    const handleScroll = () => {
      // Mostrar botón si bajamos más de 300px
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Bloquear scroll cuando el menú está abierto
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-white relative">
      {/* NAVBAR */}
      <nav className="w-full py-6 px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto relative z-40">
        <div className="font-bold text-2xl tracking-tighter shrink-0 select-none z-50">
          Leonardo<span className="text-emerald-500">.Dev</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-sm font-medium text-zinc-400">
          <a href="#projects" className="hover:text-emerald-400 transition-colors">Proyectos</a>
          <a href="#about" className="hover:text-emerald-400 transition-colors">Sobre mí</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contacto</a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-zinc-100 focus:outline-none p-2 z-50 relative"
          onClick={() => setIsMenuOpen(true)} // Solo abre, la X cierra
        >
          <div className="space-y-1.5">
            <span className="block w-8 h-0.5 bg-current"></span>
            <span className="block w-6 h-0.5 bg-current ml-auto"></span>
            <span className="block w-8 h-0.5 bg-current"></span>
          </div>
        </button>
      </nav>

      {/* MOBILE DRAWER MENU */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        
        {/* Backdrop (Click afuera cierra) */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>

        {/* Panel Lateral */}
        <div className={`
            relative w-[85%] max-w-sm h-full bg-zinc-900 border-l border-zinc-800 shadow-2xl 
            flex flex-col p-8 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          {/* Botón Cerrar (X) dentro del menú */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mt-20 flex flex-col space-y-8 items-center text-center">
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-zinc-300 hover:text-emerald-400 transition-colors">Proyectos</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-zinc-300 hover:text-emerald-400 transition-colors">Sobre mí</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-zinc-300 hover:text-emerald-400 transition-colors">Contacto</a>
          </div>
          
          <div className="mt-auto text-center text-zinc-600 text-xs">
            © 2026 Leonardo Lama
          </div>
        </div>
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 relative z-0">
        {children}
      </main>

      {/* BOTÓN BACK TO TOP */}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-8 right-8 bg-emerald-600 text-white p-3 rounded-full shadow-lg shadow-emerald-900/40 
          hover:bg-emerald-500 hover:-translate-y-1 transition-all duration-300 z-40
          ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      <footer className="py-12 text-center text-zinc-600 text-sm border-t border-zinc-900 mt-24 bg-zinc-950 relative z-10">
        <p>Diseñado y desarrollado con <span className="text-emerald-500">React, Node.js & Laravel</span></p>
      </footer>
    </div>
  );
};

export default MainLayout;