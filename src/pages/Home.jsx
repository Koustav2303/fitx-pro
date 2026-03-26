import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Carousel } from 'react-bootstrap';
import { ArrowRight, Play, ChevronRight, Quote, Zap, Target, Activity } from 'lucide-react';

// Register Core Plugins
gsap.registerPlugin(ScrollTrigger);

// --- 1. UTILITY: TEXT SPLITTER ---
const SplitTextFree = ({ text, className = "" }) => (
  <span aria-label={text} className={`inline-block overflow-hidden ${className}`}>
    {text.split('').map((char, index) => (
      <span key={index} className="char inline-block translate-y-full opacity-0">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
);

// --- 2. UTILITY: MAGNETIC BUTTON ---
const MagneticButton = ({ children, className, ...props }) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(buttonRef.current, { x: x * 0.4, y: y * 0.4, duration: 1, ease: "power3.out" });
    gsap.to(textRef.current, { x: x * 0.15, y: y * 0.15, duration: 1, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    gsap.to(textRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center ${className}`}
      {...props}
    >
      <span ref={textRef} className="pointer-events-none relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

// --- MAIN HOME COMPONENT ---
export default function Home() {
  const mainRef = useRef(null);
  const horizontalRef = useRef(null);
  const horizontalContainerRef = useRef(null);
  const storyTextRef = useRef(null);
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- MASTER ANIMATION PIPELINE ---
  useGSAP(() => {
    // 0. CINEMATIC PRELOADER
    let progress = { value: 0 };
    const loaderTl = gsap.timeline({
      onComplete: () => {
        setIsLoaded(true);
        initMainAnimations();
      }
    });

    loaderTl.to(progress, {
      value: 100,
      duration: 3,
      ease: "expo.inOut",
      onUpdate: () => setLoadingProgress(Math.round(progress.value))
    })
    .to('.preloader-text', { opacity: 0, y: -20, duration: 0.5 }, "-=0.5")
    .to('.preloader-bg-top', { yPercent: -100, duration: 1, ease: "power4.inOut" }, "-=0.2")
    .to('.preloader-bg-bottom', { yPercent: 100, duration: 1, ease: "power4.inOut" }, "<");

    const initMainAnimations = () => {
      // 1. HERO DOLLY ZOOM REVEAL
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-bg-wrapper', 
              { scale: 1.3, filter: "brightness(0) blur(10px)" }, 
              { scale: 1, filter: "brightness(1) blur(0px)", duration: 2.5, ease: "power3.out" }, 0)
            .to('.hero-title .char', { y: 0, opacity: 1, stagger: 0.03, duration: 1.2, ease: "expo.out" }, 0.5)
            .fromTo('.hero-btn', { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "elastic.out(1, 0.4)" }, 1.5);

      // 2. DUAL-AXIS INFINITE MARQUEE
      gsap.to('.marquee-track-1', { xPercent: -50, ease: "none", duration: 15, repeat: -1 });
      gsap.to('.marquee-track-2', { xPercent: 50, ease: "none", duration: 15, repeat: -1 });

      // 3. STORY TEXT ILLUMINATION
      const words = storyTextRef.current.querySelectorAll('.story-word');
      gsap.fromTo(words, 
        { opacity: 0.15, color: "#fff" },
        { 
          opacity: 1, 
          color: "#39FF14", 
          stagger: 0.1, 
          scrollTrigger: {
            trigger: '.story-section',
            start: "top 60%",
            end: "center center",
            scrub: true,
          }
        }
      );

      // 4. TRANSFORMATION EXPANDING CIRCLE REVEAL
      const transTl = gsap.timeline({
        scrollTrigger: { trigger: '.transform-section', start: "top top", end: "+=150%", pin: true, scrub: 1 }
      });
      transTl.fromTo('.after-image-wrapper', 
        { clipPath: "circle(5% at 50% 50%)" }, 
        { clipPath: "circle(150% at 50% 50%)", ease: "power2.inOut" }
      )
      .fromTo('.transform-text-reveal', { y: 100, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, "-=0.3");

      // 5. STATS SCRAMBLE & COUNT
      gsap.utils.toArray('.stat-number').forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        gsap.fromTo(stat, 
          { innerText: 0 },
          {
            innerText: target,
            duration: 3,
            snap: { innerText: 1 },
            ease: "expo.out",
            scrollTrigger: { trigger: '.stats-section', start: "top 80%" },
            onUpdate: function() { stat.innerText = Math.ceil(this.targets()[0].innerText) + (stat.getAttribute('data-suffix') || ''); }
          }
        );
      });

      // 6. BULLETPROOF HORIZONTAL SCROLL
      const updateScrollAmount = () => {
        const containerWidth = horizontalContainerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(containerWidth - viewportWidth);
      };

      let hTween = gsap.to(horizontalContainerRef.current, {
        x: updateScrollAmount,
        ease: "none"
      });
      
      ScrollTrigger.create({
        trigger: horizontalRef.current,
        start: "top top",
        end: () => `+=${Math.abs(updateScrollAmount())}`,
        pin: true,
        animation: hTween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      // 7. PROGRAMS 3D STAGGER ENTRANCE
      gsap.fromTo('.program-card-wrapper',
        { opacity: 0, y: 150, rotateX: 20, scale: 0.9 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, stagger: 0.15, duration: 1.5, ease: "power4.out", scrollTrigger: { trigger: '.programs-section', start: "top 70%" } }
      );
    };
  }, { scope: mainRef });

  // --- 3D TILT LOGIC ---
  const handleCardMouseMove = (e, index) => {
    const card = document.querySelectorAll('.program-card-wrapper')[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, { rotateX, rotateY, scale: 1.02, transformPerspective: 1500, duration: 0.4, ease: "power2.out" });

    const img = card.querySelector('.card-parallax-img');
    if (img) gsap.to(img, { x: (x - centerX) * -0.05, y: (y - centerY) * -0.05, scale: 1.1, duration: 0.4, ease: "power2.out" });
  };

  const handleCardMouseLeave = (index) => {
    const card = document.querySelectorAll('.program-card-wrapper')[index];
    if (!card) return;
    gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    
    const img = card.querySelector('.card-parallax-img');
    if (img) gsap.to(img, { x: 0, y: 0, scale: 1.05, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div ref={mainRef} className="bg-darkBg text-white min-h-screen font-sans overflow-hidden selection:bg-neonGreen selection:text-black">
      
      {/* --- 0. SLICING PRELOADER --- */}
      <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
        <div className="preloader-bg-top w-full h-1/2 bg-black flex items-end justify-center overflow-hidden">
          <h1 className="preloader-text text-[15vw] font-black leading-none text-transparent [-webkit-text-stroke:2px_#39FF14] translate-y-1/2">FITX</h1>
        </div>
        <div className="preloader-bg-bottom w-full h-1/2 bg-black flex items-start justify-center overflow-hidden">
          <h1 className="preloader-text text-[15vw] font-black leading-none text-neonGreen -translate-y-1/2">FITX</h1>
        </div>
        <div className="preloader-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-mono text-xl md:text-2xl mt-20 z-10 flex flex-col items-center">
          <span>INITIALIZING</span>
          <span className="text-neonGreen mt-2 font-black text-4xl">{loadingProgress}%</span>
        </div>
      </div>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full hero-bg-wrapper transform-gpu">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-darkBg z-10" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-20 pointer-events-none" />
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" alt="Gym Core" className="w-full h-full object-cover" />
        </div>
        
        <div className="relative z-30 text-center flex flex-col items-center px-4 hero-title mt-20 md:mt-0">
          <h1 className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-8 flex flex-col items-center mix-blend-difference drop-shadow-2xl">
            <SplitTextFree text="TRANSFORM" />
            <span className="text-neonGreen mt-2 [-webkit-text-stroke:2px_black]">
              <SplitTextFree text="REALITY." />
            </span>
          </h1>
          
          <div className="hero-btn opacity-0 mt-8">
            <MagneticButton className="px-10 py-5 md:px-14 md:py-6 bg-neonGreen text-black font-black uppercase tracking-[0.3em] text-xs md:text-sm rounded-full hover:bg-white hover:shadow-[0_0_50px_rgba(57,255,20,0.5)] transition-all duration-500">
              Enter The Arena <ChevronRight size={20} className="ml-2" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* --- 2. SKEWED DUAL MARQUEE --- */}
      <div className="w-full bg-neonGreen py-6 overflow-hidden flex flex-col gap-2 z-20 relative -skew-y-3 origin-left -mt-10 border-y-4 border-black">
        <div className="flex whitespace-nowrap marquee-track-1 text-black font-black uppercase tracking-widest text-3xl md:text-5xl w-max">
          {[...Array(6)].map((_, i) => (
            <div key={`track1-${i}`} className="flex gap-10 px-10 items-center">
              <span>NO EXCUSES</span> <Zap size={32} className="fill-current"/> <span>DEFY GRAVITY</span> <Zap size={32} className="fill-current"/>
            </div>
          ))}
        </div>
        <div className="flex whitespace-nowrap marquee-track-2 text-black/50 font-black uppercase tracking-widest text-3xl md:text-5xl w-max -ml-[50vw]">
          {[...Array(6)].map((_, i) => (
            <div key={`track2-${i}`} className="flex gap-10 px-10 items-center">
              <span>PUSH LIMITS</span> <Target size={32} className="fill-current"/> <span>EMBRACE PAIN</span> <Target size={32} className="fill-current"/>
            </div>
          ))}
        </div>
      </div>

      {/* --- 3. DYNAMIC STORY ILLUMINATION --- */}
      <section className="story-section min-h-[80vh] flex items-center justify-center py-40 px-6 relative z-10 bg-darkBg overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.05)_0%,transparent_50%)] pointer-events-none" />
        
        <div className="max-w-6xl text-center relative z-10">
          <h2 ref={storyTextRef} className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-[1.1] tracking-tight">
            {"We don't just build muscle. We forge resilience. Welcome to the sanctuary where excuses die and absolute legends are born.".split(' ').map((word, i) => (
              <span key={i} className="story-word inline-block mr-[0.2em] md:mr-[0.3em] font-black uppercase transition-colors duration-300">
                {word}
              </span>
            ))}
          </h2>
        </div>
      </section>

      {/* --- 4. CINEMATIC CIRCULAR CLIP-PATH TRANSFORMATION --- */}
      <section className="transform-section relative h-screen w-full bg-darkSurface overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src="https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?q=80&w=2070&auto=format&fit=crop" alt="Before" className="w-full h-full object-cover grayscale opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
             <h3 className="text-6xl md:text-9xl font-black text-white/20 uppercase tracking-tighter">The Before</h3>
          </div>
        </div>

        <div className="after-image-wrapper absolute inset-0 w-full h-full z-20">
          <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" alt="After" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end justify-center pb-20 md:pb-32 px-6">
             <div className="text-center">
               <div className="transform-text-reveal inline-flex px-6 py-2 border border-neonGreen text-neonGreen font-bold uppercase tracking-widest text-xs rounded-full mb-6 backdrop-blur-md bg-black/50">
                 The Evolution
               </div>
               <h3 className="transform-text-reveal text-5xl md:text-8xl lg:text-[9rem] font-black text-white uppercase leading-[0.8] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                 Absolute <br/><span className="text-transparent [-webkit-text-stroke:2px_#39FF14]">Domination</span>
               </h3>
             </div>
          </div>
        </div>
      </section>

      {/* --- 5. STATS SCRAMBLE SECTION --- */}
      <section className="stats-section py-32 bg-black relative z-10 border-y border-white/5">
        <div className="max-w-[90rem] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { target: 150, suffix: "K+", label: "Active Athletes" },
            { target: 50, suffix: "+", label: "Elite Coaches" },
            { target: 10, suffix: "M+", label: "Pounds Lifted" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center pt-10 md:pt-0">
              <div className="text-[5rem] md:text-[7rem] font-black leading-none mb-2 text-transparent [-webkit-text-stroke:2px_white] hover:[-webkit-text-stroke:2px_#39FF14] transition-colors duration-500">
                <span className="stat-number" data-target={stat.target} data-suffix={stat.suffix}>0</span>
              </div>
              <div className="text-neonGreen uppercase tracking-[0.3em] font-bold text-xs md:text-sm bg-neonGreen/10 px-6 py-2 rounded-full border border-neonGreen/20">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 6. HORIZONTAL PINNING (FACILITIES) --- */}
      <section ref={horizontalRef} className="h-screen w-full bg-darkBg overflow-hidden flex flex-col justify-center relative">
        <div className="absolute top-20 left-6 md:left-16 z-20 mix-blend-difference">
          <h2 className="text-5xl md:text-8xl font-black uppercase text-white leading-[0.9]">
            The <br/><span className="text-transparent [-webkit-text-stroke:2px_#39FF14]">Facilities</span>
          </h2>
        </div>
        
        <div ref={horizontalContainerRef} className="flex gap-8 md:gap-16 px-6 md:px-16 w-max h-[60vh] items-center mt-20">
          {[
            { title: "Iron Sanctuary", desc: "Olympic lifting platforms and calibrated plates.", img: "1534438327276-14e5300c3a48" },
            { title: "The Crucible", desc: "Turf, sleds, and high-intensity metabolic conditioning.", img: "1571019614242-c5c5dee9f50b" },
            { title: "Recovery Lab", desc: "Cold plunges, infrared saunas, and hyperbaric chambers.", img: "1583454110551-21f2fa2afe61" },
            { title: "Combative Ring", desc: "Professional grade striking and grappling arenas.", img: "1599058917212-d750089bc07e" }
          ].map((item, index) => (
            <div key={index} className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-full rounded-[2rem] overflow-hidden group shrink-0 shadow-2xl">
              <div className="absolute inset-0 bg-neonGreen/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src={`https://images.unsplash.com/photo-${item.img}?q=80&w=1600&auto=format&fit=crop`} 
                alt={item.title} 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                 <div className="text-neonGreen font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                   <div className="w-2 h-2 bg-neonGreen rounded-full animate-pulse" /> Zone 0{index + 1}
                 </div>
                 <h3 className="text-4xl md:text-5xl font-black uppercase mb-3 text-white">{item.title}</h3>
                 <p className="text-gray-300 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-sm">
                   {item.desc}
                 </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 7. PROGRAMS GRID (3D TILT) --- */}
      <section className="programs-section py-32 md:py-48 px-6 max-w-[100rem] mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-neonGreen/5 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.9]">
            Choose Your <br/><span className="text-neonGreen">Weapon</span>
          </h2>
          <MagneticButton className="px-8 py-4 border border-white/20 rounded-full hover:border-neonGreen hover:text-neonGreen transition-colors uppercase tracking-widest text-xs font-bold shrink-0 bg-darkSurface/50 backdrop-blur-md">
            View All Protocols
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12" style={{ perspective: "2000px" }}>
          {[
            { title: "Strength & Power", desc: "Build raw muscle mass.", img: "1581009146145-b5ef050c2e1e" },
            { title: "HIIT Inferno", desc: "Melt fat rapidly.", img: "1541534741688-6078c6bfb5c5" },
            { title: "Elite Mobility", desc: "Bulletproof your joints.", img: "1518611012118-696072aa579a" },
          ].map((prog, i) => (
            <div 
              key={i} 
              className="program-card-wrapper relative group cursor-none rounded-[2rem] bg-darkSurface border border-white/5 shadow-2xl h-[500px]"
              onMouseMove={(e) => handleCardMouseMove(e, i)}
              onMouseLeave={() => handleCardMouseLeave(i)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] z-0">
                <img 
                  src={`https://images.unsplash.com/photo-${prog.img}?q=80&w=800&auto=format&fit=crop`} 
                  alt={prog.title} 
                  className="card-parallax-img absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%] object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 will-change-transform" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 rounded-[2rem]" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-20 translate-z-[60px]">
                <div className="w-12 h-1 bg-neonGreen mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <h3 className="text-3xl md:text-4xl font-black mb-2 uppercase leading-none">{prog.title}</h3>
                <p className="text-gray-400 mb-8 font-medium">{prog.desc}</p>
                
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-md group-hover:bg-neonGreen group-hover:border-neonGreen group-hover:text-black transition-all duration-300">
                  <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 8. CUSTOM STYLED TESTIMONIALS --- */}
      <section className="py-40 bg-black relative overflow-hidden border-y border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/5 whitespace-nowrap pointer-events-none select-none">
          LEGENDS
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <Quote size={60} className="text-neonGreen/20 mx-auto mb-12 rotate-180" />
          
          <Carousel fade indicators={false} controls={false} interval={4000} pause={false} className="fitx-custom-carousel">
            {[
              { text: "FITX PRO completely rewired my approach to fitness. The trainers don't just guide you; they systematically dismantle your perceived limits.", author: "Sarah Jenkins", tag: "-40lbs / Elite Member" },
              { text: "The atmosphere, the cinematic energy, the state-of-the-art equipment. This isn't a gym. It's an evolution facility.", author: "Mike T.", tag: "Competitive Powerlifter" },
            ].map((test, i) => (
              <Carousel.Item key={i}>
                <h3 className="text-2xl md:text-5xl font-medium leading-tight md:leading-snug italic text-white mb-10 max-w-4xl mx-auto px-4">
                  "{test.text}"
                </h3>
                <div className="inline-flex flex-col items-center">
                  <h4 className="text-xl md:text-2xl font-black uppercase text-neonGreen mb-2 tracking-wider">{test.author}</h4>
                  <p className="text-gray-500 uppercase tracking-[0.3em] font-bold text-[10px] md:text-xs border border-white/10 px-4 py-2 rounded-full bg-darkSurface/50 backdrop-blur-md">{test.tag}</p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>

      {/* --- 9. MASSIVE FINAL CTA --- */}
      <section className="relative py-48 flex items-center justify-center text-center px-6 overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-30 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/80 to-transparent" />
        
        <div className="relative z-10 max-w-4xl w-full">
          <div className="w-20 h-20 bg-neonGreen/10 border border-neonGreen/30 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce">
            <Activity size={32} className="text-neonGreen" />
          </div>
          <h2 className="text-6xl md:text-[8rem] font-black uppercase mb-8 text-white leading-[0.85] tracking-tighter">
            Ready to <br/><span className="text-neonGreen drop-shadow-[0_0_50px_rgba(57,255,20,0.4)]">Dominate?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-16 font-medium max-w-2xl mx-auto">
            Stop waiting for tomorrow. Claim your free 3-day VIP pass and experience the revolution today.
          </p>
          
          <MagneticButton className="w-full md:w-auto px-16 py-6 bg-neonGreen text-black text-sm md:text-base font-black uppercase tracking-[0.3em] rounded-full hover:bg-white hover:shadow-[0_0_80px_rgba(57,255,20,0.6)] transition-all duration-500 mx-auto group">
            Join The Elite <Play size={20} className="ml-3 fill-current transform group-hover:scale-125 transition-transform" />
          </MagneticButton>
        </div>
      </section>

    </div>
  );
}