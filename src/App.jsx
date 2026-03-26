import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Global Components
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Programs from './pages/Programs';
import Trainers from './pages/Trainers';
import Membership from './pages/Membership';
import Shop from './pages/Shop'; // The new Pro Shop
import Contact from './pages/Contact';

// Utility to snap to the top of the page on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      
      {/* Global Navbar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="min-h-screen bg-darkBg flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
      
    </Router>
  );
}

export default App;