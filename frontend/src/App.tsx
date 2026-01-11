import { useEffect, useState } from 'react';
import MainLayout from './layouts/MainLayout';
import MarketData from './components/MarketData';

// --- DATA HARDCODEADA (Contenido Estático) ---
const PROFILE_DATA = {
  name: "Leonardo Lama",
  role: "Fullstack Developer",
  location: "Bogotá, Colombia",
  bio: [
    "Ingeniero en Computación con experiencia sólida trabajando remotamente para empresas en Argentina, México y España.",
    "Me especializo en el stack TALL (Tailwind, Alpine, Laravel, Livewire) y frameworks modernos de JS como Vue y React. Mi pasión no es solo escribir código, sino diseñar sistemas que puedan escalar sin romperse.",
    "Actualmente estoy profundizando en arquitectura Cloud con AWS (EC2, S3, Lambda) para llevar mis habilidades Fullstack al siguiente nivel."
  ],
  skills: ['PHP', 'JavaScript', 'Laravel', 'React', 'Vue.js', 'Node.js', 'Docker', 'AWS', 'TypeScript', 'SQL']
};

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  githubUrl?: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch a tu Backend (Solo proyectos por ahora)
  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => console.error("Error conectando al backend:", err));
  }, []);

  return (
    <MainLayout>
      {/* HERO SECTION */}
      <section className="min-h-[85vh] flex flex-col justify-center pt-10 pb-20 max-w-4xl">
        <span className="text-emerald-500 font-mono text-sm tracking-widest mb-4 block">
          HOLA, MI NOMBRE ES LEONARDO
        </span>
        
        {/* Tipografía ajustada: De 8xl bajamos a 5xl/6xl */}
        <h1 className="text-5xl md:text-7xl font-bold text-zinc-100 tracking-tight leading-tight mb-6">
          Fullstack Developer <br />
          <span className="text-zinc-600">expert in scalability.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10">
          Transformo ideas complejas en arquitecturas robustas usando <strong>Laravel, PHP y el ecosistema JavaScript</strong>. 
          Enfocado en soluciones Cloud y E-commerce de alto rendimiento.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#projects" className="text-center bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20">
            Ver Portafolio
          </a>
          <a href="/tu-cv.pdf" target="_blank" className="text-center border border-zinc-700 text-zinc-300 px-8 py-3 rounded-lg font-medium hover:border-emerald-500 hover:text-emerald-400 transition-all">
            Descargar CV
          </a>
        </div>
      </section>

      {/* PROJECT SECTION */}
      <section id="projects" className="py-24 border-t border-zinc-900/50">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
            Proyectos <span className="text-emerald-500">.</span>
          </h2>
          <span className="hidden md:inline-block text-zinc-500 font-mono text-sm">SELECTED WORKS 2022-2026</span>
        </div>

        {loading ? (
          <div className="text-zinc-500 font-mono">Cargando proyectos desde API...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group relative block bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 md:p-8 hover:bg-zinc-900 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-emerald-400 text-[10px] font-bold font-mono uppercase tracking-wider border border-emerald-500/20 px-2 py-1 rounded bg-emerald-500/5">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-zinc-100 mb-3 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-zinc-400 text-base leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs font-medium text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SOBRE MÍ SECTION */}
      <section id="about" className="py-24 border-t border-zinc-900/50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-8">
              Sobre mí <span className="text-emerald-500">.</span>
            </h2>
            <div className="space-y-4 text-lg text-zinc-400 leading-relaxed">
              {/* Renderizamos los párrafos desde el objeto PROFILE_DATA */}
              {PROFILE_DATA.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="mt-10">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Tech Arsenal</h3>
              <div className="flex flex-wrap gap-3">
                {PROFILE_DATA.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-zinc-300 text-sm bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tarjeta decorativa de Perfil */}
          <div className="relative h-full min-h-[350px] bg-zinc-900 rounded-2xl border border-zinc-800 p-8 flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="text-center relative z-10">
              <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300">👨‍💻</div>
              <p className="text-zinc-100 font-bold text-xl">{PROFILE_DATA.name}</p>
              <p className="text-emerald-500 text-sm font-medium">{PROFILE_DATA.role}</p>
              <p className="text-zinc-500 text-xs mt-1">{PROFILE_DATA.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-zinc-100">
          Hablemos
        </h2>
        <p className="text-lg text-zinc-400 mb-10">
          ¿Tienes un proyecto en mente? Envíame un mensaje y conectemos.
        </p>
        
        <form className="space-y-4 text-left bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">Tu Email</label>
            <input 
              type="email" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-1">Mensaje</label>
            <textarea 
              rows={4}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
              placeholder="Hola Leonardo..."
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:-translate-y-1">
            Enviar Mensaje
          </button>
        </form>
      </section>
      <section id="live-demo" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Live System Integration</h2>
          <MarketData />
        </div>
      </section>
    </MainLayout>
  );
}

export default App;