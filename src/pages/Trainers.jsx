import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, X, Activity, Award, Crosshair } from 'lucide-react';

const trainersData = [
  { 
    id: 1, name: "Marcus R.", role: "Head of Strength", 
    img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop",
    bio: "Former Olympic weightlifter turned elite coach. Marcus strips away the noise and focuses on raw, biomechanically perfect movement. If you want to move heavy weight safely, he is your architect.",
    stats: { clients: "500+", experience: "12 Yrs", specialty: "Powerlifting" },
    socials: { ig: "#", tw: "#" }
  },
  { 
    id: 2, name: "Elena V.", role: "HIIT & Conditioning", 
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    bio: "Elena's sessions are infamous. A former tactical athlete, she designs high-intensity metabolic conditioning circuits that will test your physical and mental breaking points.",
    stats: { clients: "800+", experience: "8 Yrs", specialty: "MetCon" },
    socials: { ig: "#", tw: "#" }
  },
  { 
    id: 3, name: "David K.", role: "Hypertrophy Specialist", 
    img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    bio: "Science meets muscle. David uses evidence-based periodization and precise nutritional timing to help clients build dense, aesthetic physiques without the guesswork.",
    stats: { clients: "300+", experience: "10 Yrs", specialty: "Bodybuilding" },
    socials: { ig: "#", tw: "#" }
  },
  { 
    id: 4, name: "Sarah J.", role: "Mobility & Recovery", 
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    bio: "You can't train hard if you are broken. Sarah specializes in functional range conditioning, injury prevention, and athletic longevity.",
    stats: { clients: "1000+", experience: "15 Yrs", specialty: "Kinesiology" },
    socials: { ig: "#", tw: "#" }
  }
];

export default function Trainers() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // --- 1. PAGE LOAD ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo('.reveal-text', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 }
    );

    tl.fromTo(cardsRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: containerRef });

  // --- 2. DRAWER ANIMATION LOGIC ---
  useGSAP(() => {
    if (selectedTrainer) {
      const tl = gsap.timeline();
      
      // Fade in backdrop
      tl.fromTo('.drawer-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      
      // Slide in drawer from the right
      tl.fromTo('.drawer-panel', 
        { x: '100%' }, 
        { x: '0%', duration: 0.6, ease: "expo.out" }, 
        0
      );

      // Stagger text and elements inside
      tl.fromTo('.drawer-element',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" },
        0.3
      );
    }
  }, { dependencies: [selectedTrainer] });

  const handleCloseDrawer = () => {
    const tl = gsap.timeline({
      onComplete: () => setSelectedTrainer(null)
    });
    
    tl.to('.drawer-panel', { x: '100%', duration: 0.5, ease: "expo.in" }, 0)
      .to('.drawer-backdrop', { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.1);
  };

  return (
    <div ref={containerRef} className="bg-darkBg text-white min-h-screen font-sans pt-32 pb-40 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="px-6 mb-24 max-w-[90rem] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div>
            <h1 className="reveal-text text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              Meet The <br/><span className="text-neonGreen">Architects</span>
            </h1>
          </div>
          <div className="md:max-w-md">
            <p className="reveal-text text-gray-400 text-base md:text-lg">
              World-class coaching requires absolute obsession. Meet the experts who will systematically forge your new reality through science and discipline.
            </p>
          </div>
        </div>
      </section>

      {/* --- MINIMAL GRID --- */}
      <section className="px-6 max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trainersData.map((trainer, i) => (
            <div 
              key={trainer.id}
              ref={(el) => cardsRef.current[i] = el}
              onClick={() => setSelectedTrainer(trainer)}
              className="group cursor-pointer"
            >
              {/* Image Container (Responsive Aspect Ratio) */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-darkSurface mb-6">
                <img 
                  src={trainer.img} 
                  alt={trainer.name} 
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0" 
                />
                
                {/* Minimal Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="bg-neonGreen text-black rounded-full p-4 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                     <ArrowUpRight size={24} className="stroke-[3]" />
                   </div>
                </div>
              </div>

              {/* Typography / Info below the image */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-wide mb-1 transition-colors group-hover:text-neonGreen">
                    {trainer.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                    {trainer.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SLEEK SIDE DRAWER (MODAL) --- */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          
          {/* Backdrop (Click to close) */}
          <div 
            className="drawer-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" 
            onClick={handleCloseDrawer} 
          />
          
          {/* Sliding Panel */}
          <div className="drawer-panel relative w-full md:w-[500px] lg:w-[600px] h-full bg-darkBg border-l border-white/10 shadow-2xl flex flex-col overflow-y-auto">
            
            {/* Close Header */}
            <div className="drawer-element sticky top-0 bg-darkBg/90 backdrop-blur-md z-10 p-6 flex justify-between items-center border-b border-white/5">
              <span className="font-bold uppercase tracking-widest text-xs text-gray-400">Profile / {selectedTrainer.id}</span>
              <button 
                onClick={handleCloseDrawer} 
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-neonGreen hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-10 flex-1 flex flex-col">
              
              {/* Hero Image inside Drawer */}
              <div className="drawer-element w-full aspect-square md:aspect-video rounded-2xl overflow-hidden mb-8 bg-darkSurface">
                <img src={selectedTrainer.img} alt={selectedTrainer.name} className="w-full h-full object-cover" />
              </div>

              <h2 className="drawer-element text-4xl md:text-5xl font-black uppercase mb-2">{selectedTrainer.name}</h2>
              <p className="drawer-element text-neonGreen font-bold tracking-widest uppercase text-sm mb-8">{selectedTrainer.role}</p>

              <p className="drawer-element text-gray-300 text-lg leading-relaxed mb-12">
                {selectedTrainer.bio}
              </p>

              {/* Minimal Stats Table */}
              <div className="drawer-element border-t border-white/10 pt-8 mb-12">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-xs"><Activity size={16}/> Athletes Built</span>
                    <span className="text-xl font-black text-white">{selectedTrainer.stats.clients}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-xs"><Award size={16}/> Experience</span>
                    <span className="text-xl font-black text-white">{selectedTrainer.stats.experience}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-xs"><Crosshair size={16}/> Discipline</span>
                    <span className="text-xl font-black text-neonGreen">{selectedTrainer.stats.specialty}</span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="drawer-element mt-auto pt-8 flex gap-4">
                <button className="flex-1 py-4 bg-neonGreen text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors">
                  Book Protocol
                </button>
                <a href={selectedTrainer.socials.ig} className="w-14 h-14 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}