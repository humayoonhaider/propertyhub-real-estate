import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { ListingModal } from './ListingModal';

export const Footer: React.FC = () => {
  const [isListingOpen, setIsListingOpen] = useState(false);

  return (
    <footer className="bg-[#111827] dark:bg-[#070A0E] text-white pt-16 pb-12 border-t border-neutral-800 dark:border-neutral-900 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800 dark:border-neutral-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#143D36] dark:bg-[#1E5249] flex items-center justify-center text-white">
                <Compass className="w-5 h-5 text-[#C49A6C] dark:text-[#E5B869]" />
              </div>
              <span className="font-display text-xl font-black tracking-tight text-white">
                PROPERTY<span className="text-[#C49A6C] dark:text-[#2DD4BF]">HUB</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Find a Place You'll Love to Call Home. Explore thoughtfully selected residential homes, executive apartments, and commercial spaces.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800/80 border border-neutral-700 text-xs text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-[#C49A6C] dark:text-[#2DD4BF]" />
              <span>Fictional Portfolio Showcase · SH Web Studio</span>
            </div>
          </div>

          {/* Explore Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">Explore</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/properties?purpose=Buy" className="hover:text-white transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link to="/properties?purpose=Rent" className="hover:text-white transition-colors">
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link to="/agents" className="hover:text-white transition-colors">
                  Meet the Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">Platform</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Concept
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Demo
                </Link>
              </li>
              <li>
                <Link to="/property-inquiry" className="hover:text-white transition-colors">
                  Property Inquiry
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsListingOpen(true)}
                  className="hover:text-white transition-colors text-left text-neutral-400 flex items-center gap-1 cursor-pointer"
                >
                  <span>List a Property</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C49A6C]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Demo Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">Demo Desk</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C49A6C] shrink-0 mt-0.5" />
                <a href="mailto:hello@propertyhub.demo" className="hover:text-white transition-colors">
                  hello@propertyhub.demo
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C49A6C] shrink-0 mt-0.5" />
                <span>+92 300 0000000</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C49A6C] shrink-0 mt-0.5" />
                <span>Islamabad, Pakistan — Demo Location</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 PropertyHub — Concept Project by SH Web Studio</p>
          <div className="flex items-center gap-4">
            <span className="px-2.5 py-1 rounded bg-neutral-800 dark:bg-neutral-900 text-neutral-400 text-[10px] font-mono tracking-wider border border-neutral-700/50">
              CONCEPT PROJECT
            </span>
            <span>Frontend-Only Portfolio Architecture</span>
          </div>
        </div>
      </div>

      <ListingModal
        isOpen={isListingOpen}
        onClose={() => setIsListingOpen(false)}
      />
    </footer>
  );
};
