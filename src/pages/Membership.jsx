import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Check, X, Zap, Crown, Rocket, ShieldCheck, ArrowRight, Info } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  { 
    id: "basic", name: "Recruit", monthly: 29, yearly: 290, 
    tagline: "Forge the Foundation",
    desc: "The essentials to begin your physical transformation.",
    features: ["Access to gym floor", "Locker room access", "1 Group class / month", "Basic Progress Tracking"], 
    disabled: ["Personal training", "Recovery sauna", "Custom meal plan", "24/7 VIP Access"],
    accent: "#94a3b8"
  },
  { 
    id: "pro", name: "Warrior", monthly: 59, yearly: 590, featured: true, 
    tagline: "The Gold Standard",
    desc: "Our most popular tier for dedicated athletes pushing limits.",
    features: ["All Recruit features", "Unlimited group classes", "Recovery sauna access", "1 PT session / month", "Nutrition Workshop"], 
    disabled: ["Custom meal plan", "24/7 VIP support", "Private Lounge"],
    accent: "#39FF14"
  },
  { 
    id: "elite", name: "Legend", monthly: 99, yearly: 990, 
    tagline: "Absolute Domination",
    desc: "The ultimate arsenal for those seeking limitless potential.",
    features: ["All Warrior features", "Weekly PT sessions", "Custom meal plan", "24/7 VIP support", "Exclusive lounge access", "Biometric Screening"], 
    disabled: [],
    accent: "#ffffff"
  }
];

export default function Membership() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const pricesRef = useRef([]);
  const auraRef = useRef(null);
  const [isYearly, setIsYearly] = useState(false);

  // --- 1. GLOBAL AMBIENCE & MOUSE TRACKING ---
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(auraRef.current, {
        x: clientX,
        y: clientY,
        duration: 1.5,
        ease: "power2.out"
      });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // --- 2. INITIAL ENTRANCE ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo('.mem-header-stagger', 
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.1, ease: "expo.out" }
    );

    tl.fromTo(cardsRef.current,
      { opacity: 0, y: 100, rotateX: -15, scale: 0.9 },
      { opacity: 1, y: 0, rotateX: 0, scale: (i) => pricingPlans[i].featured ? 1.05 : 1, stagger: 0.15, duration: 1.2, ease: "power4.out" },
      "-=0.6"
    );

    // Continuous floating animation for the featured card
    gsap.to('.featured-card', {
      y: "-=15",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  // --- 3. PRICE TOGGLE LOGIC ---
  useGSAP(() => {
    pricesRef.current.forEach((priceEl, index) => {
      if (!priceEl) return;
      const targetPrice = isYearly ? pricingPlans[index].yearly : pricingPlans[index].monthly;
      const currentPrice = parseFloat(priceEl.innerText) || 0;
      
      gsap.to(priceEl, {
        innerText: targetPrice,
        duration: 0.8,
        snap: { innerText: 1 },
        ease: "expo.out",
      });
    });
  }, { dependencies: [isYearly], scope: containerRef });

  // --- 4. INTERACTIVE CARD LOGIC ---
  const handleCardEnter = (i) => {
    cardsRef.current.forEach((card, idx) => {
      if (idx === i) {
        gsap.to(card, { scale: 1.08, zIndex: 50, duration: 0.5, ease: "power3.out", boxShadow: "0 20px 80px rgba(57,255,20,0.15)" });
      } else {
        gsap.to(card, { scale: 0.92, opacity: 0.4, filter: "grayscale(1) blur(2px)", duration: 0.5, ease: "power3.out" });
      }
    });
  };

  const handleCardLeave = () => {
    cardsRef.current.forEach((card, idx) => {
      const isFeatured = pricingPlans[idx].featured;
      gsap.to(card, { 
        scale: isFeatured ? 1.05 : 1, 
        opacity: 1, 
        filter: "grayscale(0) blur(0px)",
        zIndex: isFeatured ? 20 : 10,
        duration: 0.5, 
        ease: "power3.out",
        boxShadow: "0 0 0px rgba(0,0,0,0)"
      });
    });
  };

  const handleSpotlight = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  return (
    <div ref={containerRef} className="bg-darkBg text-white min-h-screen font-sans pt-32 pb-40 overflow-x-hidden relative selection:bg-neonGreen selection:text-black">
      
      {/* Dynamic Background Aura */}
      <div ref={auraRef} className="fixed w-[600px] h-[600px] bg-neonGreen/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 will-change-transform" />
      
      {/* 1. CINEMATIC HEADER */}
      <section className="text-center max-w-5xl mx-auto px-6 mb-24 relative z-10">
        <div className="mem-header-stagger inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neonGreen/30 bg-neonGreen/5 text-neonGreen text-xs font-black uppercase tracking-[0.3em] mb-8">
          <ShieldCheck size={14} /> Membership Protocols
        </div>
        <h1 className="mem-header-stagger text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
          Choose Your <br/> <span className="text-transparent [-webkit-text-stroke:1.5px_#39FF14] drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]">Tier of Power</span>
        </h1>
        <p className="mem-header-stagger text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
          Whether you're a new recruit or a seasoned legend, we have the specialized arsenal required for your evolution.
        </p>

        {/* PRO TOGGLE */}
        <div className="mem-header-stagger flex flex-col items-center gap-6">
          <div className="flex items-center gap-6 bg-darkSurface/50 backdrop-blur-xl p-3 rounded-full border border-white/10 shadow-2xl">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 ${!isYearly ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-gray-500 hover:text-white'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 flex items-center gap-2 ${isYearly ? 'bg-neonGreen text-black shadow-[0_0_20px_rgba(57,255,20,0.3)]' : 'text-gray-500 hover:text-white'}`}
            >
              Yearly <span className={`text-[10px] px-2 py-0.5 rounded-full border ${isYearly ? 'border-black/20 bg-black/10' : 'border-neonGreen/30 text-neonGreen'}`}>-20%</span>
            </button>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Info size={12} /> Secure 256-bit encrypted checkout
          </div>
        </div>
      </section>

      {/* 2. THE PRICING GRID (Mobile Optimized Swipeable) */}
      <section className="relative z-10 px-4 md:px-10">
        {/* Mobile View Scroll Container */}
        <div className="flex overflow-x-auto lg:overflow-visible pb-10 lg:pb-0 gap-6 lg:gap-8 no-scrollbar snap-x snap-mandatory lg:justify-center items-stretch">
          
          {pricingPlans.map((plan, i) => (
            <div 
              key={plan.id}
              ref={(el) => cardsRef.current[i] = el}
              onMouseEnter={() => handleCardEnter(i)}
              onMouseLeave={handleCardLeave}
              onMouseMove={(e) => handleSpotlight(e, cardsRef.current[i])}
              className={`snap-center shrink-0 w-[85vw] md:w-[400px] lg:w-[420px] rounded-[2.5rem] p-1 shadow-2xl transition-all duration-500 relative group
                ${plan.featured ? 'featured-card z-20' : 'z-10'}
              `}
              style={{
                background: plan.featured 
                  ? 'linear-gradient(135deg, rgba(57,255,20,0.4) 0%, rgba(0,0,0,0) 50%, rgba(57,255,20,0.1) 100%)' 
                  : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 100%)'
              }}
            >
              {/* Inner Card Content */}
              <div className="bg-[#0a0a0a] rounded-[2.3rem] h-full p-8 md:p-12 relative overflow-hidden flex flex-col border border-white/5">
                
                {/* Spotlight Overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{ background: `radial-gradient(400px circle at var(--x) var(--y), rgba(57,255,20,0.08), transparent 80%)` }}
                />

                {/* Header Logic */}
                <div className="relative z-10 mb-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 text-white transition-colors duration-500 group-hover:border-neonGreen/50 group-hover:text-neonGreen`}>
                      {plan.id === 'basic' && <Rocket size={24} />}
                      {plan.id === 'pro' && <Crown size={24} />}
                      {plan.id === 'elite' && <Zap size={24} />}
                    </div>
                    {plan.featured && (
                      <span className="bg-neonGreen text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(57,255,20,0.4)]">
                        Best Value
                      </span>
                    )}
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">{plan.name}</h3>
                  <p className="text-neonGreen text-[10px] font-black uppercase tracking-[0.3em] mb-4">{plan.tagline}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{plan.desc}</p>
                </div>

                {/* Price Display */}
                <div className="relative z-10 flex items-baseline gap-1 mb-10 group-hover:scale-105 transition-transform duration-500 origin-left">
                  <span className="text-3xl font-bold text-gray-400">$</span>
                  <span ref={(el) => pricesRef.current[i] = el} className="text-7xl md:text-8xl font-black tracking-tighter leading-none">
                    {isYearly ? plan.yearly : plan.monthly}
                  </span>
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">/{isYearly ? 'yr' : 'mo'}</span>
                </div>

                {/* Feature List */}
                <div className="relative z-10 flex-grow">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                    <div className="h-px flex-grow bg-white/5" /> What's Included <div className="h-px flex-grow bg-white/5" />
                  </div>
                  <ul className="space-y-5 mb-12">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-4 group/item">
                        <div className="w-5 h-5 rounded-full bg-neonGreen/10 flex items-center justify-center border border-neonGreen/20 group-hover/item:bg-neonGreen group-hover/item:border-neonGreen transition-colors duration-300">
                          <Check size={12} className="text-neonGreen group-hover/item:text-black transition-colors" strokeWidth={4} />
                        </div>
                        <span className="text-sm font-semibold text-gray-300 group-hover/item:text-white transition-colors">{feature}</span>
                      </li>
                    ))}
                    {plan.disabled.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-4 opacity-20">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <X size={12} className="text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-500 line-through tracking-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action */}
                <button className={`relative z-10 w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden group/btn
                  ${plan.featured 
                    ? 'bg-neonGreen text-black hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]' 
                    : 'bg-white/5 border border-white/10 hover:border-neonGreen hover:text-neonGreen'
                  }
                `}>
                  <span className="relative z-10">Initialize {plan.name}</span>
                  <ArrowRight size={16} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500" />
                </button>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 3. THE "HIDDEN" DETAILED COMPARISON (HUGE CODE ADDITION) */}
      <section className="mt-40 max-w-6xl mx-auto px-6 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter">Detailed Comparison</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">A side-by-side technical breakdown of our protocols</p>
        </div>

        <div className="bg-darkSurface/30 backdrop-blur-3xl rounded-[2rem] border border-white/5 overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-10 text-gray-500 uppercase tracking-widest text-[10px] font-black">Capabilities</th>
                {pricingPlans.map(p => (
                  <th key={p.id} className="p-10 text-center">
                    <span className={`text-xl font-black uppercase italic ${p.featured ? 'text-neonGreen' : 'text-white'}`}>{p.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {[
                { label: "24/7 Facility Access", values: [true, true, true] },
                { label: "Guest Passes (Monthly)", values: ["0", "2", "Unlimited"] },
                { label: "Cryotherapy Sessions", values: [false, "1/mo", "Unlimited"] },
                { label: "Personal Training", values: [false, "1/mo", "4/mo"] },
                { label: "Custom Diet Protocol", values: [false, false, true] },
                { label: "VIP Locker Room", values: [false, true, true] },
                { label: "Biometric Reports", values: [false, "Monthly", "Weekly"] }
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-8 text-gray-400 font-bold tracking-tight">{row.label}</td>
                  {row.values.map((v, idx) => (
                    <td key={idx} className="p-8 text-center">
                      {typeof v === 'boolean' ? (
                        v ? <Check className="mx-auto text-neonGreen" size={20} /> : <X className="mx-auto text-white/10" size={20} />
                      ) : (
                        <span className="text-white font-black uppercase text-xs tracking-widest opacity-80">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. PROFESSIONAL CTA */}
      <section className="mt-40 max-w-5xl mx-auto px-6 relative z-10">
        <div className="relative rounded-[3rem] p-12 md:p-20 overflow-hidden group bg-darkSurface border border-white/5">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left max-w-xl">
              <h4 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight tracking-tighter">Are you an <br/> <span className="text-neonGreen">Elite Competitor?</span></h4>
              <p className="text-gray-400 text-lg font-medium">For IFBB pros, professional athletes, or high-performance teams, we offer custom private protocols and closed-facility training hours.</p>
            </div>
            <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-neonGreen hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] transition-all duration-500 shrink-0">
              Corporate & Pro Inquiries
            </button>
          </div>
        </div>
      </section>

      {/* Global CSS for custom styling */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}