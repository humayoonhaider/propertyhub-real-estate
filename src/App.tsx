import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastProvider } from './components/Toast';
import { ThemeProvider } from './context/ThemeContext';

import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetails } from './pages/PropertyDetails';
import { Agents } from './pages/Agents';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Favorites } from './pages/Favorites';
import { PropertyInquiry } from './pages/PropertyInquiry';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#F8F8F6] dark:bg-[#0E1318] text-[#1F2937] dark:text-[#F3F4F6] transition-colors duration-200">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties/:id" element={<PropertyDetails />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/property-inquiry" element={<PropertyInquiry />} />
                {/* Fallback route */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}
