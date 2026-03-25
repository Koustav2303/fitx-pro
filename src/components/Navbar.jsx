import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const tl = useRef(null);
  const progressRef = useRef(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Membership', path: '/membership' },
    { name: 'Contact', path: '/contact' },
  ];

  // --- 1. GLOBAL SCROLL PROGRESS BAR ---
  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      }
    });
  }, []);

  // --- 2. GLASSMORPHISM SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 3. MASTER MENU TIMELINE (Pre-compiled for zero lag) ---
  useGSAP(() => {
    // We create the timeline once and keep it paused. 
    // This avoids React state re-render glitches!
    tl.current = gsap.timeline({ paused: true })
      // 1. Reveal Background via Clip-Path (Wipes down from the top)
      .to(menuRef.current, { 
        clipPath: 'inset(0% 0% 0% 0%)', 
        duration: 0.8, 
        ease: "expo.inOut" 
      })
      // 2. Stagger in the links with a 3D rotate effect
      .fromTo('.mobile-nav-item', 
        { y: 100, rotateX: -45, opacity: 0 }, 
        { y: 0, rotateX: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "power3.out" }, 
        "-=0.4"
      )
      // 3. Fade in footer info
      .fromTo('.mobile-nav-footer',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );
  }, { scope: navRef });

  // --- 4. TOGGLE LOGIC ---
  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse(); // Play animation backward smoothly
      document.body.style.overflow = "auto"; // Unlock scrolling
    } else {
      tl.current.play(); // Play animation forward
      document.body.style.overflow = "hidden"; // Lock scrolling
    }
    setIsOpen(!isOpen);
  };

  // Close menu automatically when a route changes
  useEffect(() => {
    if (isOpen) {
      tl.current.reverse();
      document.body.style.overflow = "auto";
      setIsOpen(false);
    }
  }, [location.pathname]);

  // --- 5. MAGNETIC HOVER (DESKTOP) ---
  const handleMagneticHover = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
    gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
  };
  
  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <div ref={navRef}>
      
      {/* GLOBAL SCROLL PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-[120] pointer-events-none">
        <div ref={progressRef} className="h-full bg-neonGreen transform origin-left scale-x-0" />
      </div>

      {/* --- DESKTOP & MOBILE HEADER BAR --- */}
      <nav className={`fixed top-0 left-0 w-full z-[110] transition-all duration-500 ${scrolled ? 'py-4 bg-darkBg/90 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'}`}>
        <div className="max-w-[90rem] mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="text-3xl font-black tracking-widest uppercase text-white hover:text-neonGreen transition-colors relative z-20 mix-blend-difference">
            FITX
          </Link>

          {/* Desktop Links (Magnetic Glass Pill) */}
          <div className="hidden md:flex gap-2 items-center bg-black/40 p-2 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onMouseMove={handleMagneticHover}
                onMouseLeave={handleMagneticLeave}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 inline-block
                  ${location.pathname === link.path 
                    ? 'bg-neonGreen text-black shadow-[0_0_15px_rgba(57,255,20,0.3)]' 
                    : 'text-white hover:bg-white/10'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side: CTA & Hamburger */}
          <div className="flex items-center gap-4 relative z-20">
            <Link to="/membership" className="hidden md:flex px-8 py-3 bg-neonGreen text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-white transition-colors duration-300 items-center justify-center shadow-lg hover:shadow-neonGreen/50">
              Join Elite
            </Link>
            
            {/* Custom Animated Hamburger Button */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden w-14 h-14 bg-darkSurface border border-white/10 rounded-full flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50 group"
            >
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[8px] bg-neonGreen' : 'group-hover:bg-neonGreen'}`} />
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'group-hover:bg-neonGreen'}`} />
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[8px] bg-neonGreen' : 'group-hover:bg-neonGreen'}`} />
            </button>
          </div>

        </div>
      </nav>

      {/* --- PREMIUM MOBILE FULLSCREEN MENU --- */}
      {/* BUGFIX: We do NOT use conditional rendering (isOpen && <div/>). 
        We render it permanently but hide it with clipPath. This guarantees smooth GSAP animations.
      */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 bg-darkBg z-[100] flex flex-col justify-between pt-32 pb-10 px-6 overflow-hidden md:hidden"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }} // Starts hidden (rolled up to the top)
      >
        {/* Background Accent Element */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-neonGreen/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Massive Menu Links */}
        <div className="flex flex-col gap-2 mt-10 relative z-10" style={{ perspective: "1000px" }}>
          {navLinks.map((link, index) => (
            <div key={link.name} className="overflow-hidden py-2">
              <Link 
                to={link.path} 
                className="mobile-nav-item block text-[12vw] font-black uppercase tracking-tighter leading-none transition-colors"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-bold tracking-widest opacity-50 ${location.pathname === link.path ? 'text-neonGreen' : 'text-gray-500'}`}>
                    0{index + 1}
                  </span>
                  <span className={`${location.pathname === link.path ? 'text-neonGreen' : 'text-white hover:text-neonGreen'}`}>
                    {link.name}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Footer Info inside Menu */}
        <div className="mobile-nav-footer mt-auto pt-10 border-t border-white/10 relative z-10">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Initiate Protocol</p>
          <div className="flex flex-col gap-4">
            <Link to="/membership" className="w-full py-5 bg-neonGreen text-black font-black uppercase tracking-widest text-center rounded-xl">
              Become An Athlete
            </Link>
            <div className="flex justify-between text-white mt-4">
              <a href="#" className="text-xs font-bold tracking-widest uppercase hover:text-neonGreen transition-colors">Instagram</a>
              <a href="#" className="text-xs font-bold tracking-widest uppercase hover:text-neonGreen transition-colors">Twitter (X)</a>
              <a href="mailto:elite@fitxpro.com" className="text-xs font-bold tracking-widest uppercase hover:text-neonGreen transition-colors">Email</a>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}