import React from 'react';
import { Link } from 'react-router-dom';
import { PropertyCategory } from '../data/categories';
import { Home, Building2, Castle, Briefcase, Store, Trees, ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: PropertyCategory;
}

const iconMap: Record<string, any> = {
  Home,
  Building2,
  Castle,
  Briefcase,
  Store,
  Trees,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const IconComponent = iconMap[category.iconName] || Home;

  return (
    <Link
      to={`/properties?type=${encodeURIComponent(category.slug)}`}
      className="group relative bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#143D36]/40 dark:hover:border-[#2DD4BF]/40 hover:-translate-y-1.5"
    >
      {/* Subtle ambient gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#143D36]/10 dark:from-[#2DD4BF]/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125" />

      <div>
        <div className="w-13 h-13 rounded-2xl bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] flex items-center justify-center mb-5 transition-all group-hover:bg-[#143D36] dark:group-hover:bg-[#2DD4BF] group-hover:text-white dark:group-hover:text-[#08221D] shadow-xs">
          <IconComponent className="w-6 h-6" />
        </div>

        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-[#111827] dark:text-white group-hover:text-[#143D36] dark:group-hover:text-[#2DD4BF] transition-colors">
            {category.name}
          </h3>
          <span className="text-[11px] font-bold text-[#143D36] dark:text-[#2DD4BF] bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 px-2.5 py-1 rounded-lg">
            {category.countText}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed line-clamp-2">
          {category.description}
        </p>
      </div>

      <div className="mt-6 pt-3.5 border-t border-[#E5E3DC] dark:border-[#263341] flex items-center justify-between text-xs font-bold text-[#143D36] dark:text-[#2DD4BF]">
        <span>Browse {category.name}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};
