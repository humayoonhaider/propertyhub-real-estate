import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  return (
    <div className={`space-y-2.5 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}>
      {kicker && (
        <p className="text-xs font-bold tracking-widest text-[#143D36] dark:text-[#2DD4BF] uppercase">
          {kicker}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111827] dark:text-white [text-wrap:balance]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#94A3B8] leading-relaxed [text-wrap:balance]">
          {subtitle}
        </p>
      )}
    </div>
  );
};
