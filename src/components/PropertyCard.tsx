import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Maximize, ArrowUpRight, Building2 } from 'lucide-react';
import { Property } from '../data/properties';
import { isFavoriteId, toggleFavoriteId, formatPKR } from '../utils/storage';
import { useToast } from './Toast';
import { OptimizedImage } from './OptimizedImage';

interface PropertyCardProps {
  property: Property;
  onFavoriteToggle?: (id: string, isFav: boolean) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onFavoriteToggle }) => {
  const { showToast } = useToast();
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    setIsFav(isFavoriteId(property.id));
    const handleUpdate = () => setIsFav(isFavoriteId(property.id));
    window.addEventListener('favorites-updated', handleUpdate);
    return () => window.removeEventListener('favorites-updated', handleUpdate);
  }, [property.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleFavoriteId(property.id);
    setIsFav(added);
    if (added) {
      showToast('Saved to Favorites', `${property.title} added to your shortlist.`);
    } else {
      showToast('Removed from Favorites', `${property.title} removed from favorites.`, 'info');
    }
    if (onFavoriteToggle) {
      onFavoriteToggle(property.id, added);
    }
  };

  const getFallbackType = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('house')) return 'house';
    if (t.includes('apartment')) return 'apartment';
    if (t.includes('villa')) return 'villa';
    if (t.includes('office') || t.includes('commercial')) return 'office';
    return 'general';
  };

  return (
    <div className="group bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] overflow-hidden flex flex-col transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_28px_60px_-15px_rgba(0,0,0,0.16),0_0_0_1px_rgba(20,61,54,0.12)] dark:hover:shadow-[0_28px_60px_-15px_rgba(0,0,0,0.75),0_0_0_1px_rgba(45,212,191,0.25)] hover:border-[#143D36]/30 dark:hover:border-[#2DD4BF]/40">
      {/* Image Container with Optimized Progressive Loading */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECEAE3] dark:bg-[#1A222C]">
        <OptimizedImage
          src={property.images[0]}
          alt={property.title}
          fallbackType={getFallbackType(property.type)}
          zoomOnHover={true}
          containerClassName="w-full h-full"
          className="transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
        />

        {/* Ambient top vignette for badge contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <span className={`px-2.5 py-1 text-[11px] font-black rounded-lg uppercase tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105 ${
            property.purpose === 'Buy' 
              ? 'bg-[#143D36] text-white dark:bg-[#2DD4BF] dark:text-[#08221D]' 
              : 'bg-[#C49A6C] text-white dark:bg-[#E5B869] dark:text-[#1F2937]'
          }`}>
            For {property.purpose}
          </span>
          <span className="px-2.5 py-1 text-[11px] font-bold bg-white/95 dark:bg-[#151C24]/90 backdrop-blur-md text-[#111827] dark:text-white rounded-lg shadow-xs border border-black/5 dark:border-white/10">
            {property.type}
          </span>
          {property.isNew && (
            <span className="px-2 py-0.5 text-[10px] font-black bg-emerald-500 text-white rounded-md uppercase tracking-wider shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFav ? 'Remove from favorites' : 'Save to favorites'}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer z-10 ${
            isFav
              ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-500 shadow-md scale-105 border border-rose-200 dark:border-rose-900'
              : 'bg-white/95 dark:bg-[#151C24]/90 text-[#4B5563] dark:text-[#94A3B8] hover:text-rose-500 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-[#1E293B] shadow-sm border border-black/5 dark:border-white/10 hover:scale-110 active:scale-95'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform ${isFav ? 'fill-current scale-110' : ''}`} />
        </button>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white z-10">
          <span className="text-base sm:text-lg font-black font-display px-3 py-1.5 bg-black/80 dark:bg-[#0E1318]/95 backdrop-blur-md rounded-xl tabular-nums border border-white/15 dark:border-white/10 tracking-wide shadow-lg transition-transform duration-300 group-hover:scale-103">
            {formatPKR(property.price, property.purpose)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280] dark:text-[#94A3B8] mb-1.5 tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-[#143D36] dark:text-[#2DD4BF] shrink-0" />
            <span className="truncate font-medium">{property.location.area}, {property.location.city}</span>
          </div>

          <Link to={`/properties/${property.id}`} className="group/title block">
            <h3 className="text-lg font-bold text-[#111827] dark:text-white group-hover/title:text-[#143D36] dark:group-hover/title:text-[#2DD4BF] transition-colors line-clamp-1 leading-snug">
              {property.title}
            </h3>
          </Link>

          <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-2 line-clamp-2 leading-relaxed font-normal">
            {property.tagline || property.description}
          </p>
        </div>

        {/* Specifications row */}
        <div className="pt-3.5 border-t border-[#E5E3DC] dark:border-[#263341] flex items-center justify-between text-xs text-[#6B7280] dark:text-[#94A3B8]">
          {property.bedrooms > 0 ? (
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-[#143D36] dark:text-[#2DD4BF]" />
              <span><strong className="text-[#111827] dark:text-white font-bold">{property.bedrooms}</strong> Beds</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#143D36] dark:text-[#2DD4BF]" />
              <span>Commercial</span>
            </div>
          )}

          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[#143D36] dark:text-[#2DD4BF]" />
              <span><strong className="text-[#111827] dark:text-white font-bold">{property.bathrooms}</strong> Baths</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-[#143D36] dark:text-[#2DD4BF]" />
            <span><strong className="text-[#111827] dark:text-white font-bold tabular-nums">{property.areaSqFt.toLocaleString()}</strong> sq ft</span>
          </div>
        </div>

        {/* Action button */}
        <Link
          to={`/properties/${property.id}`}
          className="w-full mt-2 py-2.5 px-4 bg-[#F8F8F6] dark:bg-[#0E1318] hover:bg-[#143D36] dark:hover:bg-[#2DD4BF] text-[#111827] dark:text-[#E2E8F0] hover:text-white dark:hover:text-[#08221D] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 border border-[#E5E3DC] dark:border-[#263341] hover:border-transparent cursor-pointer tracking-wider group/btn shadow-2xs hover:shadow-md"
        >
          <span>View Property</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
};
