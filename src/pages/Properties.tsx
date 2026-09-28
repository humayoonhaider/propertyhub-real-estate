import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { PropertyCard } from '../components/PropertyCard';
import { FilterPanel, FilterState } from '../components/FilterPanel';
import { EmptyState } from '../components/EmptyState';
import { getAllProperties } from '../utils/storage';
import { Property } from '../data/properties';
import { SlidersHorizontal } from 'lucide-react';

export const Properties: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProperties, setAllProperties] = useState<Property[]>(getAllProperties());
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize filters from search params
  const initialFilters: FilterState = {
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || 'All',
    type: searchParams.get('type')
      ? searchParams.get('type')!.charAt(0).toUpperCase() + searchParams.get('type')!.slice(1)
      : 'All',
    purpose: (searchParams.get('purpose') as any) || 'All',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || 'All',
    bathrooms: searchParams.get('bathrooms') || 'All',
    minArea: searchParams.get('minArea') || '',
    maxArea: searchParams.get('maxArea') || '',
    sortBy: searchParams.get('sortBy') || 'featured',
  };

  const priceParam = searchParams.get('price');
  if (priceParam) {
    if (priceParam === 'under-5m') {
      initialFilters.maxPrice = '5000000';
    } else if (priceParam === '5m-15m') {
      initialFilters.minPrice = '5000000';
      initialFilters.maxPrice = '15000000';
    } else if (priceParam === '15m-30m') {
      initialFilters.minPrice = '15000000';
      initialFilters.maxPrice = '30000000';
    } else if (priceParam === '30m-plus') {
      initialFilters.minPrice = '30000000';
    }
  }

  const [filters, setFilters] = useState<FilterState>(initialFilters);

  useEffect(() => {
    const handleUpdate = () => setAllProperties(getAllProperties());
    window.addEventListener('listings-updated', handleUpdate);
    return () => window.removeEventListener('listings-updated', handleUpdate);
  }, []);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      const params = new URLSearchParams();
      if (next.search) params.set('search', next.search);
      if (next.city !== 'All') params.set('city', next.city);
      if (next.type !== 'All') params.set('type', next.type.toLowerCase());
      if (next.purpose !== 'All') params.set('purpose', next.purpose);
      if (next.minPrice) params.set('minPrice', next.minPrice);
      if (next.maxPrice) params.set('maxPrice', next.maxPrice);
      if (next.bedrooms !== 'All') params.set('bedrooms', next.bedrooms);
      if (next.bathrooms !== 'All') params.set('bathrooms', next.bathrooms);
      if (next.minArea) params.set('minArea', next.minArea);
      if (next.maxArea) params.set('maxArea', next.maxArea);
      if (next.sortBy !== 'featured') params.set('sortBy', next.sortBy);
      setSearchParams(params, { replace: true });
      return next;
    });
  };

  const handleResetFilters = () => {
    const reset: FilterState = {
      search: '',
      city: 'All',
      type: 'All',
      purpose: 'All',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'All',
      bathrooms: 'All',
      minArea: '',
      maxArea: '',
      sortBy: 'featured',
    };
    setFilters(reset);
    setSearchParams({}, { replace: true });
  };

  const filteredProperties = useMemo(() => {
    return allProperties
      .filter((prop) => {
        if (filters.search.trim()) {
          const q = filters.search.toLowerCase();
          const matchTitle = prop.title.toLowerCase().includes(q);
          const matchDesc = prop.description.toLowerCase().includes(q);
          const matchCity = prop.location.city.toLowerCase().includes(q);
          const matchArea = prop.location.area.toLowerCase().includes(q);
          const matchFeatures = prop.features.some((f) => f.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchCity && !matchArea && !matchFeatures) {
            return false;
          }
        }

        if (filters.city !== 'All' && prop.location.city.toLowerCase() !== filters.city.toLowerCase()) {
          return false;
        }

        if (filters.type !== 'All' && prop.type.toLowerCase() !== filters.type.toLowerCase()) {
          return false;
        }

        if (filters.purpose !== 'All' && prop.purpose !== filters.purpose) {
          return false;
        }

        if (filters.minPrice && prop.price < Number(filters.minPrice)) {
          return false;
        }

        if (filters.maxPrice && prop.price > Number(filters.maxPrice)) {
          return false;
        }

        if (filters.bedrooms !== 'All') {
          if (filters.bedrooms === '5+') {
            if (prop.bedrooms < 5) return false;
          } else {
            if (prop.bedrooms !== Number(filters.bedrooms)) return false;
          }
        }

        if (filters.bathrooms !== 'All') {
          if (filters.bathrooms === '4+') {
            if (prop.bathrooms < 4) return false;
          } else {
            if (prop.bathrooms !== Number(filters.bathrooms)) return false;
          }
        }

        if (filters.minArea && prop.areaSqFt < Number(filters.minArea)) {
          return false;
        }

        if (filters.maxArea && prop.areaSqFt > Number(filters.maxArea)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [allProperties, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#151C24] rounded-3xl sm:rounded-4xl border border-[#E5E3DC] dark:border-[#263341] p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-start md:items-end justify-between gap-6 transition-colors duration-200">
        <SectionHeading
          kicker="Curated Marketplace"
          title="Explore Properties"
          subtitle="Browse homes, apartments, villas, offices, and commercial spaces across prime metropolitan sectors."
        />
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden flex-1 md:flex-none py-2.5 px-4 bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({filteredProperties.length})</span>
          </button>
        </div>
      </div>

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filter Sidebar on Desktop */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <FilterPanel
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={filteredProperties.length}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="lg:hidden col-span-1">
            <FilterPanel
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              totalResults={filteredProperties.length}
            />
          </div>
        )}

        {/* Properties Results Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Bar with Results Count & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E3DC] dark:border-[#263341]">
            <div>
              <h3 className="text-base font-bold text-[#111827] dark:text-white">
                <span className="text-[#143D36] dark:text-[#2DD4BF] tabular-nums font-black">{filteredProperties.length}</span>{' '}
                {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
              </h3>
              <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
                Showing active listings matching your current criteria
              </p>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              <span className="text-xs text-[#6B7280] dark:text-[#94A3B8] whitespace-nowrap">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3.5 py-2 bg-white dark:bg-[#151C24] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs font-bold text-[#111827] dark:text-white focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Added</option>
              </select>
            </div>
          </div>

          {/* Cards Grid or Empty State */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No properties match your filter"
              description="Try broadening your search criteria, clearing price constraints, or selecting a different location."
              actionLabel="Reset All Filters"
              onAction={handleResetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
};
