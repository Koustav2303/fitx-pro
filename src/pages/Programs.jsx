import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import { Play, Clock, Flame, ArrowRight, Zap, TrendingUp, Target } from 'lucide-react';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, Flip);

// Enhanced Mock Data
const programsData = [
  { id: 1, title: "Foundation Zero", category: "Beginner", duration: "4 Weeks", burn: "High", intensity: "Level 1", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Hypertrophy Core", category: "Intermediate", duration: "8 Weeks", burn: "Medium", intensity: "Level 3", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Apex Predator", category: "Advanced", duration: "12 Weeks", burn: "Extreme", intensity: "Level 5", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Mobility Flow", category: "Beginner", duration: "2 Weeks", burn: "Low", intensity: "Level 1", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop" },
  { id: 5, title: "Shred Protocol", category: "Intermediate", duration: "6 Weeks", burn: "Extreme", intensity: "Level 4", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop" },
  { id: 6, title: "Titan Strength", category: "Advanced", duration: "10 Weeks", burn: "High", intensity: "Level 5", img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop" },
];

const filters = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Programs() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const filterContainerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // --- 1. MASTER PAGE ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline();

    // Hero Reveal
    tl.fromTo('.prog-hero-line', 
      { opacity: 0, rotateX: -90, y: 50 }, 
      { opacity: 1, rotateX: 0, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.1 }
    );
    tl.fromTo('.prog-hero-desc', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 
      "-=0.6"
    );

    // Parallax floating background numbers
    gsap.utils.toArray('.parallax-bg-text').forEach(text => {
      gsap.to(text, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Premium Clip-Path Wipes for Alternating Sections
    const alternatingSections = gsap.utils.toArray('.alt-section');
    alternatingSections.forEach((section, index) => {
      const isEven = index % 2 === 0;
      const imgTarget = section.querySelector('.alt-img-wrapper');
      const textElements = section.querySelectorAll('.alt-text-reveal');

      // Cinematic Image Wipe
      gsap.fromTo(imgTarget,
        { clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", scale: 1.1 },
        { 
          clipPath: "inset(0 0% 0 0)", 
          scale: 1,
          duration: 1.5, 
          ease: "power4.inOut", 
          scrollTrigger: { trigger: section, start: "top 70%" } 
        }
      );

      // Staggered Text Entrance
      gsap.fromTo(textElements,
        { opacity: 0, x: isEven ? 50 : -50 },
        { 
          opacity: 1, x: 0, 
          stagger: 0.1, duration: 1, 
          ease: "power3.out", 
          scrollTrigger: { trigger: section, start: "top 60%" } 
        }
      );
    });

  }, { scope: containerRef });

  // --- 2. GSAP FLIP LOGIC (Bulletproof for Mobile) ---
  useGSAP(() => {
    // Ensure the grid container doesn't collapse to 0 height during the flip
    const currentHeight = gridRef.current.offsetHeight;
    gridRef.current.style.minHeight = `${currentHeight}px`;

    const state = Flip.getState('.filter-card');

    const cards = gsap.utils.toArray('.filter-card');
    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (activeFilter === "All" || activeFilter === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    Flip.from(state, {
      duration: 0.6,
      ease: "power3.inOut",
      scale: true,
      absolute: true,
      stagger: 0.05,
      onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5 }),
      onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.4 }),
      onComplete: () => {
        // Remove the fixed min-height so it responds to mobile orientation changes
        gridRef.current.style.minHeight = "auto";
      }
    });
  }, { dependencies: [activeFilter], scope: containerRef });

  return (
    <div ref={containerRef} className="bg-darkBg text-white min-h-screen font-sans pb-32 pt-32 md:pt-40 overflow-hidden relative">
      
      {/* Deep Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-neonGreen/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="parallax-bg-text absolute top-40 left-10 text-[20vw] font-black text-white/5 whitespace-nowrap pointer-events-none -z-10 select-none">
        EVOLVE
      </div>

      {/* --- 1. HERO SECTION --- */}
      <section className="px-6 pb-20 text-center max-w-5xl mx-auto relative z-10" style={{ perspective: "1000px" }}>
        <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter mb-6 leading-[0.85]">
          <div className="prog-hero-line text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">Choose Your</div>
          <div className="prog-hero-line text-neonGreen drop-shadow-[0_0_30px_rgba(57,255,20,0.3)] [-webkit-text-stroke:0px]">Discipline</div>
        </h1>
        <p className="prog-hero-desc text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed border-l-2 border-neonGreen pl-6 text-left md:text-center md:border-l-0 md:pl-0">
          Whether you are stepping into the arena for the first time or looking to shatter your plateau, we have a scientifically-backed blueprint designed to push your limits.
        </p>
      </section>

      {/* --- 2. DYNAMIC FILTER GRID --- */}
      <section className="px-6 max-w-[95rem] mx-auto mb-40 relative z-10">
        
        {/* Sticky Mobile-Friendly Filter Bar */}
        <div className="sticky top-20 z-50 bg-darkBg/90 backdrop-blur-xl border-y border-white/5 py-4 mb-16 -mx-6 px-6 md:mx-0 md:bg-transparent md:backdrop-blur-none md:border-none md:static md:p-0 flex justify-start md:justify-center overflow-x-auto hide-scrollbar">
          <div className="flex gap-4 min-w-max pb-2 md:pb-0">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-neonGreen text-black shadow-[0_0_20px_rgba(57,255,20,0.3)] transform scale-105' 
                    : 'bg-darkSurface text-white hover:border-neonGreen border border-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 relative">
          {programsData.map(prog => (
            <div 
              key={prog.id} 
              data-category={prog.category}
              className="filter-card bg-darkSurface rounded-[2rem] overflow-hidden border border-white/5 group shadow-xl hover:shadow-neonGreen/10 transition-shadow duration-500 flex flex-col h-full"
            >
              {/* Image Container with responsive aspect ratio */}
              <div className="w-full aspect-video md:aspect-[4/3] overflow-hidden relative shrink-0">
                <div className="absolute inset-0 bg-neonGreen/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img src={prog.img} alt={prog.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-out" />
                
                {/* Floating Badges */}
                <div className="absolute top-6 right-6 z-20 flex flex-col gap-2 items-end">
                  <div className="bg-black/80 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-neonGreen backdrop-blur-md border border-white/10 shadow-lg">
                    {prog.category}
                  </div>
                  <div className="bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    {prog.intensity}
                  </div>
                </div>
              </div>

              {/* Card Content - flex-1 pushes button to bottom */}
              <div className="p-8 md:p-10 flex-1 flex flex-col relative z-20 bg-darkSurface">
                <h3 className="text-3xl font-black uppercase mb-6 group-hover:text-neonGreen transition-colors">{prog.title}</h3>
                
                <div className="grid grid-cols-2 gap-y-4 mb-8 text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Clock size={16} className="text-neonGreen"/> {prog.duration}</span>
                  <span className="flex items-center gap-2"><Flame size={16} className="text-neonGreen"/> {prog.burn} Burn</span>
                  <span className="flex items-center gap-2"><Target size={16} className="text-neonGreen"/> Form Focus</span>
                </div>
                
                <button className="mt-auto w-full py-5 bg-black border border-white/10 rounded-xl hover:bg-neonGreen hover:text-black hover:border-neonGreen transition-all duration-300 font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 overflow-hidden group/btn">
                  <span className="relative z-10 flex items-center gap-2">Explore Protocol <ArrowRight size={16} className="transform group-hover/btn:translate-x-2 transition-transform" /></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. ALTERNATING CONTENT SECTIONS (MOBILE BULLETPROOF) --- */}
      <section className="overflow-hidden relative z-10 pb-20">
        
        {/* Section 1 */}
        <div className="alt-section flex flex-col lg:flex-row items-center max-w-[95rem] mx-auto px-6 mb-32 md:mb-48 gap-12 lg:gap-24">
          
          {/* Mobile-Responsive Image Container */}
          <div className="w-full lg:w-1/2 alt-img-wrapper rounded-[2.5rem] overflow-hidden aspect-[4/3] relative shadow-2xl">
            <div className="absolute inset-0 bg-neonGreen/10 mix-blend-overlay z-10" />
            <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600&auto=format&fit=crop" alt="Training" className="w-full h-full object-cover" />
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="alt-text-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Zap size={14} className="text-neonGreen" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Phase 01</span>
            </div>
            <h2 className="alt-text-reveal text-5xl md:text-7xl font-black uppercase mb-8 leading-[0.9]">Science-Backed <br/><span className="text-neonGreen">Method</span></h2>
            <p className="alt-text-reveal text-gray-400 text-lg mb-10 leading-relaxed max-w-xl">
              We don't do guesswork. Every program is meticulously crafted using advanced biomechanics and periodization principles to ensure you break through plateaus and achieve maximum adaptation safely.
            </p>
            <ul className="space-y-6 mb-10 text-gray-300 text-sm font-bold uppercase tracking-wider">
              <li className="alt-text-reveal flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-neonGreen/10 flex items-center justify-center"><Play size={14} className="text-neonGreen fill-current"/></div> Data-driven progression</li>
              <li className="alt-text-reveal flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-neonGreen/10 flex items-center justify-center"><TrendingUp size={14} className="text-neonGreen"/></div> Customized macros</li>
              <li className="alt-text-reveal flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-neonGreen/10 flex items-center justify-center"><Target size={14} className="text-neonGreen"/></div> 24/7 Form check support</li>
            </ul>
          </div>
        </div>

        {/* Section 2 (Reversed logic using flex-col-reverse on mobile) */}
        <div className="alt-section flex flex-col-reverse lg:flex-row items-center max-w-[95rem] mx-auto px-6 gap-12 lg:gap-24">
          
          <div className="w-full lg:w-1/2">
             <div className="alt-text-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Zap size={14} className="text-neonGreen" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Phase 02</span>
            </div>
            <h2 className="alt-text-reveal text-5xl md:text-7xl font-black uppercase mb-8 leading-[0.9]">Elite <br/><span className="text-neonGreen">Recovery</span></h2>
            <p className="alt-text-reveal text-gray-400 text-lg mb-10 leading-relaxed max-w-xl">
              Muscle isn't built in the gym; it's built during recovery. Our programs integrate advanced mobility work, active recovery days, and nervous system reset protocols to keep you operating at 100%.
            </p>
            <button className="alt-text-reveal px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-neonGreen transition-colors duration-300 shadow-xl hover:shadow-neonGreen/30">
              Explore Recovery
            </button>
          </div>

          <div className="w-full lg:w-1/2 alt-img-wrapper rounded-[2.5rem] overflow-hidden aspect-[4/3] relative shadow-2xl">
            <div className="absolute inset-0 bg-neonGreen/10 mix-blend-overlay z-10" />
            <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1600&auto=format&fit=crop" alt="Recovery" className="w-full h-full object-cover" />
          </div>
          
        </div>
      </section>

    </div>
  );
}