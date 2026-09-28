import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export interface FilterState {
  search: string;
  city: string;
  type: string;
  purpose: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minArea: string;
  maxArea: string;
  sortBy: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
}) => {
  const cities = ['All', 'Islamabad', 'Lahore', 'Karachi', 'Rawalpindi', 'Abbottabad'];
  const types = ['All', 'House', 'Apartment', 'Villa', 'Office', 'Commercial', 'Land'];
  const sortOptions = [
    { value: 'featured', label: 'Featured Listings' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Added' },
  ];

  const hasActiveFilters =
    filters.search ||
    filters.city !== 'All' ||
    filters.type !== 'All' ||
    filters.purpose !== 'All' ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.bedrooms !== 'All' ||
    filters.bathrooms !== 'All' ||
    filters.minArea ||
    filters.maxArea ||
    filters.sortBy !== 'featured';

  return (
    <div className="bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] p-5 lg:p-6 space-y-6 shadow-sm">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E3DC] dark:border-[#263341]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#143D36] dark:text-[#2DD4BF]" />
          <h3 className="font-bold text-[#111827] dark:text-white text-base">Filter Properties</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs font-bold text-[#143D36] dark:text-[#2DD4BF] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Keyword Search */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1]">Keyword Search</label>
        <input
          type="text"
          placeholder="e.g. Cedar, DHA, Margalla..."
          value={filters.search}
          onChange={(e) => onChange('search', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF]"
        />
      </div>

      {/* Purpose (Buy / Rent) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1]">Purpose</label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F8F8F6] dark:bg-[#0E1318] rounded-xl border border-[#E5E3DC] dark:border-[#263341]">
          {['All', 'Buy', 'Rent'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onChange('purpose', p)}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filters.purpose === p
                  ? 'bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] shadow-xs'
                  : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* City / Location */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1]">City / Region</label>
        <select
          value={filters.city}
          onChange={(e) => onChange('city', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF] cursor-pointer font-medium"
        >
          {cities.map((c) => (
            <option key={c} value={c}>
              {c === 'All' ? 'All Cities' : c}
            </option>
          ))}
        </select>
      </div>

      {/* Property Type */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1]">Property Type</label>
        <select
          value={filters.type}
          onChange={(e) => onChange('type', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF] cursor-pointer font-medium"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === 'All' ? 'All Types' : t}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range (PKR) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1]">Price Range (PKR)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => onChange('minPrice', e.target.value)}
            className="w-full px-3.5 py-2 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF]"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => onChange('maxPrice', e.target.value)}
            className="w-full px-3.5 py-2 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF]"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1]">Bedrooms</label>
        <div className="flex gap-1">
          {['All', '1', '2', '3', '4', '5+'].map((bed) => (
            <button
              key={bed}
              type="button"
              onClick={() => onChange('bedrooms', bed)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                filters.bedrooms === bed
                  ? 'bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] border-[#143D36] dark:border-[#2DD4BF]'
                  : 'bg-[#F8F8F6] dark:bg-[#0E1318] text-[#6B7280] dark:text-[#94A3B8] border-[#E5E3DC] dark:border-[#263341] hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              {bed}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1]">Bathrooms</label>
        <div className="flex gap-1">
          {['All', '1', '2', '3', '4+'].map((bath) => (
            <button
              key={bath}
              type="button"
              onClick={() => onChange('bathrooms', bath)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                filters.bathrooms === bath
                  ? 'bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] border-[#143D36] dark:border-[#2DD4BF]'
                  : 'bg-[#F8F8F6] dark:bg-[#0E1318] text-[#6B7280] dark:text-[#94A3B8] border-[#E5E3DC] dark:border-[#263341] hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              {bath}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Order */}
      <div className="space-y-1.5 pt-2 border-t border-[#E5E3DC] dark:border-[#263341]">
        <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1]">Sort Properties</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange('sortBy', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF] cursor-pointer font-medium"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Footer */}
      <div className="pt-2 text-center text-xs text-[#6B7280] dark:text-[#94A3B8]">
        Showing <strong className="text-[#111827] dark:text-white tabular-nums">{totalResults}</strong> properties
      </div>
    </div>
  );
};
