import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import { ShoppingBag, Star, Plus, Minus, Trash2, X, ArrowRight, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, Flip);

// --- MOCK DATABASE ---
const products = [
  { id: 101, name: "FITX Iso-Whey", category: "Supplements", price: 59.99, rating: 5, reviews: 128, badge: "Best Seller", img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=800&auto=format&fit=crop" },
  { id: 102, name: "Surge Pre-Workout", category: "Energy", price: 39.99, rating: 4.8, reviews: 84, badge: "High Stim", img: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800&auto=format&fit=crop" },
  { id: 103, name: "Heavyweight Pump Cover", category: "Apparel", price: 34.99, rating: 4.9, reviews: 210, badge: "New Drop", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop" },
  { id: 104, name: "Elite Lifting Belt", category: "Equipment", price: 89.99, rating: 5, reviews: 45, badge: "Pro Gear", img: "data:image/jpeg;base64,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" },
  { id: 105, name: "Zero-Sugar Nootropic Energy", category: "Energy", price: 29.99, rating: 4.7, reviews: 312, badge: "12 Pack", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop" },
  { id: 106, name: "Tactical Gym Duffel", category: "Equipment", price: 119.99, rating: 4.9, reviews: 67, badge: "Restocked", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop" },
  { id: 107, name: "Compression Rashguard", category: "Apparel", price: 45.00, rating: 4.6, reviews: 92, badge: "", img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop" },
  { id: 108, name: "BCAA Recovery Matrix", category: "Supplements", price: 49.99, rating: 4.8, reviews: 156, badge: "", img: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop" },
];

const categories = ["All", "Supplements", "Apparel", "Equipment", "Energy"];

export default function Shop() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  
  // State
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart Logic
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true); // Auto-open cart on add
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // --- 1. ENTRANCE ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo('.shop-hero-text', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 }
    );
  }, { scope: containerRef });

  // --- 2. GSAP FLIP FILTER LOGIC ---
  useGSAP(() => {
    const currentHeight = gridRef.current.offsetHeight;
    gridRef.current.style.minHeight = `${currentHeight}px`;

    const state = Flip.getState('.product-card');
    const cards = gsap.utils.toArray('.product-card');
    
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      card.style.display = (activeCategory === "All" || activeCategory === cat) ? "flex" : "none";
    });

    Flip.from(state, {
      duration: 0.5,
      ease: "power3.inOut",
      scale: true,
      absolute: true,
      stagger: 0.05,
      onEnter: els => gsap.fromTo(els, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4 }),
      onLeave: els => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }),
      onComplete: () => { gridRef.current.style.minHeight = "auto"; }
    });
  }, { dependencies: [activeCategory], scope: containerRef });

  // --- 3. CART DRAWER ANIMATIONS ---
  useGSAP(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();
      tl.fromTo('.cart-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
      tl.fromTo('.cart-panel', { x: '100%' }, { x: '0%', duration: 0.5, ease: "expo.out" }, 0);
      tl.fromTo('.cart-item', { opacity: 0, x: 20 }, { opacity: 1, x: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" }, 0.2);
    } else {
      document.body.style.overflow = "auto";
    }
  }, { dependencies: [isCartOpen] });

  const closeCart = () => {
    const tl = gsap.timeline({ onComplete: () => setIsCartOpen(false) });
    tl.to('.cart-panel', { x: '100%', duration: 0.4, ease: "expo.in" }, 0)
      .to('.cart-backdrop', { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.1);
  };

  return (
    <div ref={containerRef} className="bg-darkBg text-white min-h-screen font-sans pt-32 pb-40 overflow-hidden relative selection:bg-neonGreen selection:text-black">
      
      {/* Floating Cart Button (Global Access) */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-neonGreen text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(57,255,20,0.4)] hover:scale-110 transition-transform duration-300"
      >
        <ShoppingBag size={24} />
        {cartItemCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-darkBg">
            {cartItemCount}
          </div>
        )}
      </button>

      {/* --- HERO SECTION --- */}
      <section className="px-6 pb-20 text-center max-w-5xl mx-auto relative z-10">
        <div className="shop-hero-text inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neonGreen/30 bg-neonGreen/5 text-neonGreen text-xs font-black uppercase tracking-[0.3em] mb-8">
          <Zap size={14} /> Official Supply
        </div>
        <h1 className="shop-hero-text text-6xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter mb-6 leading-[0.85]">
          Fuel Your <br/><span className="text-transparent [-webkit-text-stroke:2px_#39FF14] drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]">Evolution</span>
        </h1>
        <p className="shop-hero-text text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed border-l-2 border-neonGreen pl-6 text-left md:text-center md:border-l-0 md:pl-0">
          Premium supplements, tactical apparel, and elite equipment engineered specifically for high-performance athletes.
        </p>
      </section>

      {/* --- FILTER BAR --- */}
      <section className="px-6 max-w-[95rem] mx-auto mb-16 relative z-10">
        <div className="sticky top-20 z-50 bg-darkBg/90 backdrop-blur-xl border-y border-white/5 py-4 -mx-6 px-6 md:mx-0 md:bg-transparent md:backdrop-blur-none md:border-none md:static md:p-0 flex justify-start md:justify-center overflow-x-auto hide-scrollbar">
          <div className="flex gap-4 min-w-max pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-neonGreen text-black shadow-[0_0_20px_rgba(57,255,20,0.3)]' 
                    : 'bg-darkSurface text-white hover:border-neonGreen border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCT GRID --- */}
      <section className="px-6 max-w-[95rem] mx-auto relative z-10">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {products.map(product => (
            <div 
              key={product.id} 
              data-category={product.category}
              className="product-card flex flex-col bg-darkSurface rounded-[2rem] overflow-hidden border border-white/5 group hover:border-neonGreen/30 transition-colors duration-500"
            >
              {/* Image Container */}
              <div className="w-full aspect-square relative overflow-hidden bg-black/50 p-6 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-neonGreen/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <img src={product.img} alt={product.name} className="w-full h-full object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-luminosity group-hover:mix-blend-normal" />
                
                {/* Badges */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-20 bg-neonGreen text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    {product.badge}
                  </div>
                )}
                
                {/* Quick Add Overlay (Desktop) */}
                <div className="absolute inset-x-4 bottom-4 z-20 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
                  <button onClick={() => addToCart(product)} className="w-full py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-neonGreen transition-colors flex items-center justify-center gap-2">
                    <ShoppingBag size={14}/> Quick Add
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{product.category}</p>
                  <div className="flex items-center gap-1 text-neonGreen">
                    <Star size={12} fill="currentColor" />
                    <span className="text-white text-xs font-bold">{product.rating}</span>
                    <span className="text-gray-600 text-[10px]">({product.reviews})</span>
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-neonGreen transition-colors line-clamp-2">{product.name}</h3>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-2xl font-black">${product.price}</span>
                  {/* Mobile Add Button */}
                  <button onClick={() => addToCart(product)} className="md:hidden w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-neonGreen hover:text-black transition-colors">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SHOPPING CART DRAWER --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop */}
          <div className="cart-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" onClick={closeCart} />
          
          {/* Sliding Panel */}
          <div className="cart-panel relative w-full md:w-[450px] h-full bg-darkSurface border-l border-white/10 shadow-2xl flex flex-col z-10">
            
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-darkBg">
              <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                <ShoppingBag className="text-neonGreen" /> Your Supply
              </h2>
              <button onClick={closeCart} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-neonGreen hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <ShoppingBag size={64} className="mb-6 opacity-20" />
                  <p className="text-xl font-bold uppercase tracking-widest mb-2">Cart is Empty</p>
                  <p className="text-sm text-gray-400">Time to re-up your inventory.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item flex gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                    <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-tight line-clamp-1">{item.name}</h4>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.category}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-black text-neonGreen">${(item.price * item.qty).toFixed(2)}</span>
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-darkSurface rounded-full px-2 py-1 border border-white/10">
                          <button onClick={() => updateQty(item.id, -1)} className="hover:text-neonGreen"><Minus size={14}/></button>
                          <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="hover:text-neonGreen"><Plus size={14}/></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-darkBg">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="text-3xl font-black">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-5 bg-neonGreen text-black font-black uppercase tracking-[0.2em] text-sm rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all duration-300 flex items-center justify-center gap-3 group">
                  Secure Checkout <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}