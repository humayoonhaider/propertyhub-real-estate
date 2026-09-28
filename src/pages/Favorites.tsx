import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { PropertyCard } from '../components/PropertyCard';
import { EmptyState } from '../components/EmptyState';
import { getFavoriteIds, getAllProperties } from '../utils/storage';
import { Property } from '../data/properties';
import { Heart, Trash2 } from 'lucide-react';
import { useToast } from '../components/Toast';

export const Favorites: React.FC = () => {
  const { showToast } = useToast();
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);

  const loadFavorites = () => {
    const ids = getFavoriteIds();
    const all = getAllProperties();
    setFavoriteProperties(all.filter((p) => ids.includes(p.id)));
  };

  useEffect(() => {
    loadFavorites();
    const handleUpdate = () => loadFavorites();
    window.addEventListener('favorites-updated', handleUpdate);
    return () => window.removeEventListener('favorites-updated', handleUpdate);
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem('propertyhub_favorites');
    window.dispatchEvent(new Event('favorites-updated'));
    showToast('Favorites Cleared', 'All saved properties have been removed.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#151C24] rounded-3xl sm:rounded-4xl border border-[#E5E3DC] dark:border-[#263341] p-8 sm:p-12 shadow-sm flex flex-col sm:flex-row sm:items-end justify-between gap-6 transition-colors duration-200">
        <SectionHeading
          kicker="Your Shortlist"
          title="Your Favorite Properties"
          subtitle="Review, compare, and manage your saved homes, apartments, and investments in one place."
        />
        {favoriteProperties.length > 0 && (
          <button
            onClick={handleClearAll}
            className="self-start sm:self-end px-4 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 rounded-xl flex items-center gap-1.5 transition-colors border border-rose-200 dark:border-rose-900 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Shortlist</span>
          </button>
        )}
      </div>

      {/* Grid or Empty */}
      {favoriteProperties.length > 0 ? (
        <div className="space-y-4">
          <p className="text-xs text-[#6B7280] dark:text-[#94A3B8]">
            You have <strong className="text-[#111827] dark:text-white font-bold">{favoriteProperties.length}</strong> saved {favoriteProperties.length === 1 ? 'property' : 'properties'}.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onFavoriteToggle={loadFavorites}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="No favorites yet"
          description="Save properties you like using the heart icon and they will appear here for easy comparison."
          actionLabel="Explore Properties"
          actionHref="/properties"
        />
      )}
    </div>
  );
};
