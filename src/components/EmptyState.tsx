import React from 'react';
import { LucideIcon, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Home,
  title,
  description,
  actionLabel = 'Explore Properties',
  actionHref = '/properties',
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white dark:bg-[#151C24] rounded-3xl border border-[#E5E3DC] dark:border-[#263341] max-w-md mx-auto my-8 shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-[#111827] dark:text-white mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#94A3B8] mb-6 leading-relaxed">{description}</p>
      {onAction ? (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-[#143D36] hover:bg-[#0E2E29] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] text-white dark:text-[#08221D] text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
        >
          {actionLabel}
        </button>
      ) : (
        <Link
          to={actionHref}
          className="px-5 py-2.5 bg-[#143D36] hover:bg-[#0E2E29] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] text-white dark:text-[#08221D] text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};
