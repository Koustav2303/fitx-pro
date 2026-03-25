import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef(null);
  const formRef = useRef(null);

  // --- ENTRANCE ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Hero Text Stagger
    tl.fromTo('.contact-hero-text', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 }
    );

    // 2. Contact Info Items Reveal
    tl.fromTo('.contact-info-item',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // 3. Form Elements Stagger
    const formElements = formRef.current.children;
    tl.fromTo(formElements,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-darkBg text-white min-h-screen font-sans pt-32 pb-40 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 right-0 w-[300px] md:w-[600px] h-[600px] bg-neonGreen/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* --- LEFT SIDE: INFORMATION --- */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h1 className="contact-hero-text text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">
            Initiate <br/><span className="text-neonGreen">Protocol</span>
          </h1>
          <p className="contact-hero-text text-gray-400 text-lg mb-16 max-w-lg leading-relaxed border-l-2 border-neonGreen pl-6">
            Ready to completely rewrite your physical reality? Secure your spot, ask about private coaching, or request exclusive facility access.
          </p>

          <div className="space-y-10">
            {/* Info Item 1 */}
            <div className="contact-info-item flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-darkSurface border border-white/10 flex items-center justify-center group-hover:border-neonGreen group-hover:text-neonGreen transition-all duration-300 shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase mb-1 tracking-wider">The Facility</h4>
                <p className="text-gray-400">100 Evolution Way<br/>District 9, Neo-City 40992</p>
              </div>
            </div>

            {/* Info Item 2 */}
            <div className="contact-info-item flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-darkSurface border border-white/10 flex items-center justify-center group-hover:border-neonGreen group-hover:text-neonGreen transition-all duration-300 shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase mb-1 tracking-wider">Direct Comms</h4>
                <a href="mailto:elite@fitxpro.com" className="text-gray-400 hover:text-white transition-colors">elite@fitxpro.com</a>
              </div>
            </div>

            {/* Info Item 3 */}
            <div className="contact-info-item flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-full bg-darkSurface border border-white/10 flex items-center justify-center group-hover:border-neonGreen group-hover:text-neonGreen transition-all duration-300 shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase mb-1 tracking-wider">VIP Line</h4>
                <a href="tel:+1800555FITX" className="text-gray-400 hover:text-white transition-colors">+1 (800) 555-FITX</a>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: THE FORM --- */}
        <div className="lg:w-1/2 flex items-center w-full">
          <div className="w-full bg-darkSurface/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
            
            {/* Top Green Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neonGreen to-transparent opacity-70" />
            
            <h3 className="text-3xl font-black uppercase mb-10 tracking-wider">Send Transmissions</h3>
            
            <form ref={formRef} className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neonGreen focus:ring-1 focus:ring-neonGreen transition-all placeholder:text-gray-600" 
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neonGreen focus:ring-1 focus:ring-neonGreen transition-all placeholder:text-gray-600" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-2">Primary Objective</label>
                <div className="relative">
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neonGreen transition-all appearance-none cursor-pointer">
                    <option value="membership">Membership Inquiry</option>
                    <option value="pt">Private Training</option>
                    <option value="athlete">Athlete Sponsorship</option>
                    <option value="other">General Question</option>
                  </select>
                  {/* Custom Dropdown Arrow */}
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-2">Message</label>
                <textarea 
                  rows="4" 
                  placeholder="How can we help you dominate?" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neonGreen focus:ring-1 focus:ring-neonGreen transition-all placeholder:text-gray-600 resize-none" 
                />
              </div>

              <button className="w-full mt-4 py-5 bg-neonGreen text-black font-black uppercase tracking-[0.2em] text-sm rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 group">
                Submit Protocol <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}