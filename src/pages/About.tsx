import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Link } from 'react-router-dom';
import { Compass, CheckCircle2, Layers, Smartphone, Eye, ArrowRight, ShieldAlert } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'Visual Simplicity',
      description: 'Clean typographic hierarchy, generous whitespace, and distraction-free layouts that put architectural photography at the forefront.',
    },
    {
      icon: Layers,
      title: 'Effortless Discoverability',
      description: 'Dynamic multi-parameter filtering across cities, budgets, property styles, and room counts with instant zero-lag feedback.',
    },
    {
      icon: Smartphone,
      title: 'Fluid Responsive Design',
      description: 'Tested across mobile, tablet, laptop, and ultra-wide viewports to deliver consistent touch targets and layout stability.',
    },
    {
      icon: CheckCircle2,
      title: 'Transparent Information Architecture',
      description: 'Unambiguous property specifications, structured highlights, verified dimensions, and straightforward inquiry pathways.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Banner */}
      <div className="bg-white dark:bg-[#151C24] rounded-3xl sm:rounded-4xl border border-[#E5E3DC] dark:border-[#263341] p-8 sm:p-14 shadow-sm relative overflow-hidden transition-colors duration-200">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>Concept Project by SH Web Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] dark:text-white tracking-tight leading-tight [text-wrap:balance]">
            Property Discovery, Made Simpler.
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
            PropertyHub is a fictional concept platform designed to demonstrate how a modern property discovery experience can bring listings, search tools, property details, favorites, and inquiries together in one clean, unified interface.
          </p>

          <div className="pt-2 flex flex-wrap gap-3.5">
            <Link
              to="/properties"
              className="px-6 py-3.5 bg-[#143D36] hover:bg-[#0E2E29] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] text-white dark:text-[#08221D] text-xs sm:text-sm font-extrabold rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Explore the Demo Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-[#F8F8F6] dark:bg-[#0E1318] hover:bg-[#EAE8E3] dark:hover:bg-[#1E293B] text-[#111827] dark:text-white text-xs sm:text-sm font-bold rounded-xl transition-all border border-[#E5E3DC] dark:border-[#263341] cursor-pointer"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Decorative background image */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block pointer-events-none opacity-20 dark:opacity-10">
          <img
            src="/images/hero_property_banner_1790454702504.jpg"
            alt="Architecture preview"
            className="w-full h-full object-cover object-left"
          />
        </div>
      </div>

      {/* Philosophy & Pillars */}
      <div className="space-y-8">
        <SectionHeading
          kicker="Core Philosophy"
          title="Designed for Modern Property Seekers"
          subtitle="How modern frontend engineering and thoughtful design principles create a frictionless property search experience."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#151C24] border border-[#E5E3DC] dark:border-[#263341] shadow-xs space-y-3.5 transition-all hover:border-[#143D36]/40 dark:hover:border-[#2DD4BF]/40"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] dark:text-white">{pillar.title}</h3>
                <p className="text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Portfolio Scope */}
      <div className="p-8 sm:p-10 bg-[#F8F8F6] dark:bg-[#0E1318] rounded-3xl border border-[#E5E3DC] dark:border-[#263341] space-y-4">
        <div className="flex items-center gap-2.5 text-[#143D36] dark:text-[#2DD4BF]">
          <ShieldAlert className="w-5 h-5" />
          <h3 className="text-base font-bold text-[#111827] dark:text-white">Portfolio & Demonstration Scope</h3>
        </div>
        <p className="text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
          PropertyHub was conceptualized and crafted by <strong>SH Web Studio</strong> as a showcase of high-end frontend architecture, client-side data filtering, local persistence, responsive typography, and accessibility best practices. All properties, pricing figures, architectural photographs, and agent biographies are strictly fictional and intended for demonstration purposes.
        </p>
      </div>
    </div>
  );
};
