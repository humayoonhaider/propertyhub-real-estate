import React from 'react';
import { Property } from '../data/properties';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  onFavoriteToggle?: (id: string, isFav: boolean) => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, onFavoriteToggle }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};
