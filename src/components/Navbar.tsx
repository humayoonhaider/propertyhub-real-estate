import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, PlusCircle, Menu, X, Compass, Sun, Moon } from 'lucide-react';
import { getFavoriteIds } from '../utils/storage';
import { ListingModal } from './ListingModal';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const updateCount = () => {
      setFavoriteCount(getFavoriteIds().length);
    };
    updateCount();
    window.addEventListener('favorites-updated', updateCount);
    return () => window.removeEventListener('favorites-updated', updateCount);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'Agents', path: '/agents' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top concept announcement bar */}
      <div className="bg-[#111827] dark:bg-[#070A0E] text-neutral-300 dark:text-neutral-400 py-1.5 px-4 text-center text-[11px] border-b border-neutral-800 dark:border-neutral-900 transition-colors">
        <span className="font-semibold text-[#C49A6C] dark:text-[#E5B869]">Concept Project</span> by SH Web Studio · Fictional Demo Experience
      </div>

      <header className="sticky top-0 z-40 bg-[#F8F8F6]/90 dark:bg-[#0E1318]/90 backdrop-blur-xl border-b border-[#E5E3DC] dark:border-[#263341] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#143D36] dark:bg-[#1E5249] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all">
              <Compass className="w-5 h-5 text-[#C49A6C] dark:text-[#E5B869]" />
            </div>
            <span className="font-display text-xl font-black tracking-tight text-[#111827] dark:text-white">
              PROPERTY<span className="text-[#143D36] dark:text-[#2DD4BF]">HUB</span>
            </span>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors hover:text-[#143D36] dark:hover:text-[#2DD4BF] relative py-1.5 ${
                    isActive
                      ? 'text-[#143D36] dark:text-[#2DD4BF] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#143D36] dark:after:bg-[#2DD4BF] after:rounded-full'
                      : 'text-[#6B7280] dark:text-[#94A3B8]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Actions & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2.5 rounded-xl text-[#374151] dark:text-[#CBD5E1] bg-white dark:bg-[#151C24] hover:bg-[#EAE8E3] dark:hover:bg-[#1E293B] border border-[#E5E3DC] dark:border-[#263341] transition-all cursor-pointer shadow-2xs"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-[#143D36] transition-transform -rotate-12 hover:rotate-0" />
              )}
            </button>

            {/* Favorites Icon */}
            <Link
              to="/favorites"
              className="relative p-2.5 rounded-xl text-[#374151] dark:text-[#CBD5E1] bg-white dark:bg-[#151C24] hover:bg-[#EAE8E3] dark:hover:bg-[#1E293B] hover:text-[#143D36] dark:hover:text-[#2DD4BF] transition-all border border-[#E5E3DC] dark:border-[#263341] shadow-2xs"
              aria-label={`Favorites, ${favoriteCount} saved`}
            >
              <Heart className="w-4 h-4" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] text-[10px] font-extrabold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* List Property Button */}
            <button
              onClick={() => setIsListingModalOpen(true)}
              className="py-2.5 px-5 bg-[#143D36] hover:bg-[#0E2E29] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] text-white dark:text-[#08221D] text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#C49A6C] dark:text-[#08221D]" />
              <span>List a Property</span>
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-[#374151] dark:text-[#CBD5E1] bg-white dark:bg-[#151C24] border border-[#E5E3DC] dark:border-[#263341]"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#143D36]" />
              )}
            </button>

            <Link
              to="/favorites"
              className="relative p-2 rounded-xl text-[#374151] dark:text-[#CBD5E1] bg-white dark:bg-[#151C24] border border-[#E5E3DC] dark:border-[#263341]"
              aria-label={`Favorites, ${favoriteCount} saved`}
            >
              <Heart className="w-4 h-4" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] text-[9px] font-extrabold rounded-full flex items-center justify-center tabular-nums">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-[#111827] dark:text-white bg-white dark:bg-[#151C24] border border-[#E5E3DC] dark:border-[#263341]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#151C24] border-b border-[#E5E3DC] dark:border-[#263341] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF]'
                        : 'text-[#111827] dark:text-white hover:bg-[#F8F8F6] dark:hover:bg-[#1E293B]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF]'
                      : 'text-[#111827] dark:text-white hover:bg-[#F8F8F6] dark:hover:bg-[#1E293B]'
                  }`
                }
              >
                <span>Favorites</span>
                <span className="text-xs bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] px-2 py-0.5 rounded-full tabular-nums font-bold">
                  {favoriteCount}
                </span>
              </NavLink>
            </div>

            <div className="pt-2 border-t border-[#E5E3DC] dark:border-[#263341]">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsListingModalOpen(true);
                }}
                className="w-full py-3 px-4 bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <PlusCircle className="w-4 h-4 text-[#C49A6C] dark:text-[#08221D]" />
                <span>List a Property</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Listing Modal */}
      <ListingModal
        isOpen={isListingModalOpen}
        onClose={() => setIsListingModalOpen(false)}
      />
    </>
  );
};
