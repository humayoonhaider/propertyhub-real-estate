import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2, DollarSign, Sparkles, ArrowRight, Check } from 'lucide-react';

export interface SearchFilters {
  search?: string;
  type?: string;
  purpose?: 'All' | 'Buy' | 'Rent';
  price?: string;
}

export interface SearchBarProps {
  compact?: boolean;
  className?: string;
  initialValues?: SearchFilters;
  onSearch?: (filters: SearchFilters) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  compact = false,
  className = '',
  initialValues,
  onSearch,
}) => {
  const navigate = useNavigate();
  const [locationQuery, setLocationQuery] = useState(initialValues?.search || '');
  const [propertyType, setPropertyType] = useState(initialValues?.type || 'All');
  const [purpose, setPurpose] = useState<'All' | 'Buy' | 'Rent'>(initialValues?.purpose || 'All');
  const [priceRange, setPriceRange] = useState(initialValues?.price || 'All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters: SearchFilters = {
      search: locationQuery.trim() || undefined,
      type: propertyType !== 'All' ? propertyType : undefined,
      purpose: purpose !== 'All' ? purpose : undefined,
      price: priceRange !== 'All' ? priceRange : undefined,
    };

    if (onSearch) {
      onSearch(filters);
      return;
    }

    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.type) params.set('type', filters.type.toLowerCase());
    if (filters.purpose) params.set('purpose', filters.purpose);
    if (filters.price) params.set('price', filters.price);

    navigate({
      pathname: '/properties',
      search: params.toString(),
    });
  };

  const handleQuickLocation = (loc: string) => {
    setLocationQuery(loc);
  };

  return (
    <div
      className={`w-full bg-white/95 dark:bg-[#151C24]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] border border-[#E5E3DC] dark:border-[#263341] p-4 sm:p-7 ${
        compact ? 'max-w-4xl' : 'max-w-5xl'
      } mx-auto transition-all duration-300 ${className}`}
    >
      {/* Purpose Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-[#E5E3DC]/70 dark:border-[#263341]/80">
        <div className="inline-flex p-1 bg-[#F1EFEA] dark:bg-[#0E1318] rounded-xl border border-[#E5E3DC] dark:border-[#263341]">
          {(['All', 'Buy', 'Rent'] as const).map((tab) => {
            const isActive = purpose === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setPurpose(tab)}
                className={`relative px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#0A2621] shadow-md'
                    : 'text-[#6B7280] dark:text-[#94A3B8] hover:text-[#111827] dark:hover:text-white'
                }`}
              >
                {tab === 'All' ? 'All Purpose' : `For ${tab}`}
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#94A3B8]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time catalog search</span>
        </div>
      </div>

      {/* Main Form Fields */}
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
        {/* 1. Location Input (4 cols) */}
        <div className="lg:col-span-4 space-y-1.5">
          <label className="text-xs font-bold tracking-wide uppercase text-[#374151] dark:text-[#CBD5E1] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#143D36] dark:text-[#2DD4BF]" />
            Location / Area
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search city, sector or area..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full pl-3.5 pr-4 py-3 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF] focus:bg-white dark:focus:bg-[#0E1318] focus:ring-2 focus:ring-[#143D36]/10 dark:focus:ring-[#2DD4BF]/20 transition-all font-medium"
            />
          </div>
        </div>

        {/* 2. Property Type (3 cols) */}
        <div className="lg:col-span-3 space-y-1.5">
          <label className="text-xs font-bold tracking-wide uppercase text-[#374151] dark:text-[#CBD5E1] flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#143D36] dark:text-[#2DD4BF]" />
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-3.5 py-3 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF] focus:bg-white dark:focus:bg-[#0E1318] focus:ring-2 focus:ring-[#143D36]/10 dark:focus:ring-[#2DD4BF]/20 transition-all cursor-pointer font-medium"
          >
            <option value="All">All Property Types</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Office">Office</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>

        {/* 3. Price Range (3 cols) */}
        <div className="lg:col-span-3 space-y-1.5">
          <label className="text-xs font-bold tracking-wide uppercase text-[#374151] dark:text-[#CBD5E1] flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#143D36] dark:text-[#2DD4BF]" />
            Price Bracket
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full px-3.5 py-3 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF] focus:bg-white dark:focus:bg-[#0E1318] focus:ring-2 focus:ring-[#143D36]/10 dark:focus:ring-[#2DD4BF]/20 transition-all cursor-pointer font-medium"
          >
            <option value="All">Any Budget</option>
            <option value="under-5m">Under PKR 5M</option>
            <option value="5m-15m">PKR 5M – 15M</option>
            <option value="15m-30m">PKR 15M – 30M</option>
            <option value="30m-plus">PKR 30M+</option>
          </select>
        </div>

        {/* 4. Search Button (2 cols) */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#143D36] hover:bg-[#0E2E29] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] text-white dark:text-[#08221D] rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl active:scale-95 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span className="whitespace-nowrap">Search</span>
          </button>
        </div>
      </form>

      {/* Quick Location Pills */}
      <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 text-xs text-[#6B7280] dark:text-[#94A3B8]">
        <span className="font-semibold text-[#111827] dark:text-[#E2E8F0] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C49A6C] dark:text-[#FBBF24]" />
          Popular:
        </span>
        {['Islamabad', 'Lahore', 'Karachi', 'Rawalpindi', 'Abbottabad'].map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => handleQuickLocation(city)}
            className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
              locationQuery.toLowerCase() === city.toLowerCase()
                ? 'bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 border-[#143D36] dark:border-[#2DD4BF] text-[#143D36] dark:text-[#2DD4BF] font-bold'
                : 'bg-[#F8F8F6] dark:bg-[#0E1318] border-[#E5E3DC] dark:border-[#263341] hover:border-[#143D36] dark:hover:border-[#2DD4BF] text-[#4B5563] dark:text-[#94A3B8]'
            }`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};
