import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black pt-32 pb-10 px-6 border-t border-white/5 relative overflow-hidden">
      
      {/* Huge Background Typography */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-5 select-none">
        <h2 className="text-[15vw] font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap">
          FITX PRO
        </h2>
      </div>

      <div className="max-w-[90rem] mx-auto relative z-10">
        
        {/* Top Section: Newsletter & Brand */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24 border-b border-white/10 pb-20">
          <div className="lg:w-1/2">
            <h3 className="text-4xl md:text-5xl font-black uppercase mb-6">Join The <span className="text-neonGreen">Vanguard</span></h3>
            <p className="text-gray-400 mb-8 max-w-md">Subscribe to our comms for advanced training protocols, exclusive facility drops, and elite recovery tactics.</p>
            <div className="flex w-full max-w-md relative">
              <input 
                type="email" 
                placeholder="ENTER EMAIL" 
                className="w-full bg-darkSurface border border-white/10 rounded-l-xl px-6 py-4 text-white text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-neonGreen transition-colors placeholder:text-gray-600"
              />
              <button className="bg-neonGreen text-black px-6 rounded-r-xl hover:bg-white transition-colors flex items-center justify-center">
                <ArrowRight size={20} className="stroke-[3]"/>
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-10 w-full">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Navigation</h4>
              <Link to="/" className="text-gray-400 hover:text-neonGreen text-sm font-medium transition-colors">Home</Link>
              <Link to="/programs" className="text-gray-400 hover:text-neonGreen text-sm font-medium transition-colors">Programs</Link>
              <Link to="/trainers" className="text-gray-400 hover:text-neonGreen text-sm font-medium transition-colors">Trainers</Link>
              <Link to="/membership" className="text-gray-400 hover:text-neonGreen text-sm font-medium transition-colors">Membership</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Socials</h4>
              <a href="#" className="text-gray-400 hover:text-neonGreen text-sm font-medium transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-neonGreen text-sm font-medium transition-colors">YouTube</a>
              <a href="#" className="text-gray-400 hover:text-neonGreen text-sm font-medium transition-colors">Twitter (X)</a>
              <a href="#" className="text-gray-400 hover:text-neonGreen text-sm font-medium transition-colors">TikTok</a>
            </div>

            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Inquiries</h4>
              <Link to="/contact" className="text-gray-400 hover:text-neonGreen text-sm font-medium transition-colors">Contact Us</Link>
              <a href="#" className="text-gray-400 hover:text-neonGreen text-sm font-medium transition-colors">Careers</a>
              <a href="#" className="text-gray-400 hover:text-neonGreen text-sm font-medium transition-colors">Press Kit</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-3xl font-black tracking-widest uppercase text-white">FITX</div>
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest text-center">
            &copy; {new Date().getFullYear()} FITX PRO. All Rights Reserved.|Coded By Koustav
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}