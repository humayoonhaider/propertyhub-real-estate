import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, ChevronLeft, ChevronRight, Image as ImageIcon, X, Sparkles } from 'lucide-react';
import { OptimizedImage, preloadImage } from './OptimizedImage';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState<number>(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Ensure at least 1 image
  const gallery = images && images.length > 0 ? images : ['/images/prop_cedar_residence_1790454719011.jpg'];

  // Preload all gallery images immediately on mount so thumbnail switching is instant
  useEffect(() => {
    gallery.forEach((imgUrl) => {
      preloadImage(imgUrl, 'house');
    });
  }, [gallery]);

  // Subtle scroll-triggered parallax effect
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!galleryRef.current) return;
      const rect = galleryRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only calculate parallax if within or near viewport
      if (rect.bottom > 0 && rect.top < viewportHeight) {
        // Calculate relative position from center of screen (-1 to 1)
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = viewportHeight / 2;
        const distanceFromCenter = elementCenter - screenCenter;
        
        // Subtle, elegant parallax shift (max +- 24px)
        const offset = Math.max(-24, Math.min(24, distanceFromCenter * 0.08));
        setParallaxOffset(offset);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4" ref={galleryRef}>
      {/* Main Image with Progressive Shimmer & Parallax */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#ECEAE3] dark:bg-[#1A222C] cursor-pointer group shadow-xl border border-[#E5E3DC] dark:border-[#263341]"
      >
        <OptimizedImage
          src={gallery[activeIndex]}
          alt={`${title} - Photo ${activeIndex + 1}`}
          priority={true}
          fallbackType="house"
          parallaxOffsetY={parallaxOffset}
          containerClassName="w-full h-full"
          className="group-hover:scale-104 transition-transform duration-700"
        />

        {/* Ambient editorial gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Parallax Badge indicator */}
        <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white/90 text-[10px] font-bold uppercase tracking-wider border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="w-3 h-3 text-[#C49A6C] dark:text-[#E5B869]" />
          <span>Interactive Showcase</span>
        </div>

        {/* Navigation arrows */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-[#151C24]/90 backdrop-blur-md text-[#111827] dark:text-white flex items-center justify-center hover:bg-white dark:hover:bg-[#1E293B] shadow-lg transition-all active:scale-95 border border-black/5 dark:border-white/10 z-10"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-[#151C24]/90 backdrop-blur-md text-[#111827] dark:text-white flex items-center justify-center hover:bg-white dark:hover:bg-[#1E293B] shadow-lg transition-all active:scale-95 border border-black/5 dark:border-white/10 z-10"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Counter and Fullscreen badge */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="px-3.5 py-1.5 bg-black/70 backdrop-blur-md rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 tabular-nums border border-white/15">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{activeIndex + 1} / {gallery.length}</span>
          </div>

          <div className="px-3.5 py-1.5 bg-black/70 backdrop-blur-md rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 group-hover:bg-black/90 transition-colors border border-white/15">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand Photo</span>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Select photo ${idx + 1}`}
              className={`relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'border-[#143D36] dark:border-[#2DD4BF] shadow-md scale-98 ring-2 ring-[#143D36]/20 dark:ring-[#2DD4BF]/20'
                  : 'border-transparent opacity-70 hover:opacity-100 hover:scale-102'
              }`}
            >
              <OptimizedImage
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fallbackType="house"
                containerClassName="w-full h-full"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close image preview"
            className="absolute top-6 right-6 text-white/90 hover:text-white px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>

          <div
            className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl">
              <OptimizedImage
                src={gallery[activeIndex]}
                alt={`${title} enlarged`}
                priority={true}
                fallbackType="house"
                containerClassName="max-h-[80vh] max-w-full rounded-2xl"
                className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {gallery.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <p className="text-white/70 text-xs sm:text-sm mt-4 font-medium tracking-wide">
            {title} — Photo {activeIndex + 1} of {gallery.length}
          </p>
        </div>
      )}
    </div>
  );
};
