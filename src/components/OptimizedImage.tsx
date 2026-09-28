import React, { useState, useEffect, useRef } from 'react';
import { Building2, User } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  zoomOnHover?: boolean;
  parallaxOffsetY?: number; // Subtle scroll-triggered parallax offset (in px)
  fallbackType?: 'house' | 'apartment' | 'villa' | 'office' | 'hero' | 'agent' | 'general';
  onClick?: () => void;
}

// In-memory cache for fast instant rendering across route changes & galleries
const loadedImagesCache = new Set<string>();

// Curated high-res reliable architectural CDN fallbacks
const FALLBACK_IMAGES: Record<string, string> = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
  house: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  apartment: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  villa: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  agent: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  general: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
};

// Normalize path to ensure it works on Vercel production deployment
export const resolveImagePath = (path: string, fallbackType: string = 'general'): string => {
  if (!path) return FALLBACK_IMAGES[fallbackType] || FALLBACK_IMAGES.general;
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  if (path.startsWith('/src/assets/images/')) {
    const filename = path.replace('/src/assets/images/', '');
    return `/images/${filename}`;
  }

  return path;
};

// Preload utility to warm browser image cache instantly
export const preloadImage = (src: string, fallbackType: string = 'general') => {
  if (!src) return;
  const resolved = resolveImagePath(src, fallbackType);
  if (loadedImagesCache.has(resolved)) return;
  
  const img = new Image();
  img.src = resolved;
  img.onload = () => loadedImagesCache.add(resolved);
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  zoomOnHover = false,
  parallaxOffsetY = 0,
  fallbackType = 'general',
  onClick,
}) => {
  const resolvedInitial = resolveImagePath(src, fallbackType);
  const [currentSrc, setCurrentSrc] = useState<string>(resolvedInitial);
  const [isLoaded, setIsLoaded] = useState<boolean>(() => loadedImagesCache.has(resolvedInitial));
  const [hasError, setHasError] = useState<boolean>(false);
  const [retryStage, setRetryStage] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resolved = resolveImagePath(src, fallbackType);
    setCurrentSrc(resolved);
    const cached = loadedImagesCache.has(resolved);
    setIsLoaded(cached);
    setHasError(false);
    setRetryStage(0);

    // Timeout safety: if image is extremely slow (>3500ms), fallback to reliable CDN/local
    if (!cached && !priority) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsLoaded((loaded) => {
          if (!loaded) {
            // Switch to fast fallback
            const fallback = FALLBACK_IMAGES[fallbackType] || FALLBACK_IMAGES.general;
            if (currentSrc !== fallback) {
              setCurrentSrc(fallback);
            }
          }
          return loaded;
        });
      }, 3500);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [src, fallbackType]);

  const handleError = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (retryStage === 0) {
      if (currentSrc.startsWith('/images/')) {
        const assetName = currentSrc.replace('/images/', '');
        setRetryStage(1);
        setCurrentSrc(`/src/assets/images/${assetName}`);
        return;
      }
    }
    
    if (retryStage <= 1) {
      setRetryStage(2);
      const cdnFallback = FALLBACK_IMAGES[fallbackType] || FALLBACK_IMAGES.general;
      if (currentSrc !== cdnFallback) {
        setCurrentSrc(cdnFallback);
        return;
      }
    }

    setHasError(true);
    setIsLoaded(true);
  };

  const handleLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    loadedImagesCache.add(currentSrc);
    setIsLoaded(true);
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#ECEAE3] dark:bg-[#1A222C] ${containerClassName}`}
      onClick={onClick}
    >
      {/* Skeleton Shimmer Pulse */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 animate-pulse" />
      )}

      {/* Actual Image with Optional Scroll Parallax Transform */}
      {!hasError ? (
        <div
          className="w-full h-full will-change-transform"
          style={
            parallaxOffsetY !== 0
              ? {
                  transform: `translate3d(0, ${parallaxOffsetY}px, 0) scale(1.08)`,
                  transition: 'transform 0.1s cubic-bezier(0,0,0.2,1)',
                }
              : undefined
          }
        >
          <img
            src={currentSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            referrerPolicy="no-referrer"
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-xs'
            } ${zoomOnHover ? 'group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform' : ''} ${className}`}
          />
        </div>
      ) : (
        /* Designed Fallback Component */
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#143D36]/10 to-[#C49A6C]/10 dark:from-[#2DD4BF]/10 dark:to-[#E5B869]/10 text-[#143D36] dark:text-[#2DD4BF] p-4 text-center">
          {fallbackType === 'agent' ? (
            <User className="w-12 h-12 stroke-1 mb-2 opacity-50" />
          ) : (
            <Building2 className="w-12 h-12 stroke-1 mb-2 opacity-50" />
          )}
          <span className="text-[11px] font-semibold tracking-wider uppercase opacity-75">
            {alt || 'PropertyHub Showcase'}
          </span>
        </div>
      )}
    </div>
  );
};
