import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { PropertyCard } from '../components/PropertyCard';
import { CategoryCard } from '../components/CategoryCard';
import { SectionHeading } from '../components/SectionHeading';
import { ListingModal } from '../components/ListingModal';
import { getAllProperties } from '../utils/storage';
import { propertyCategories } from '../data/categories';
import { agentsData } from '../data/agents';
import { AgentCard } from '../components/AgentCard';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  BookmarkCheck,
  Send,
  Sparkles,
  Smartphone,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

export const Home: React.FC = () => {
  const [properties, setProperties] = useState(getAllProperties());
  const [isListingOpen, setIsListingOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => setProperties(getAllProperties());
    window.addEventListener('listings-updated', handleUpdate);
    return () => window.removeEventListener('listings-updated', handleUpdate);
  }, []);

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 4);

  const features = [
    {
      icon: Search,
      title: 'Curated Listings',
      description: 'Explore thoughtfully organized property listings with verified dimensions, floor plans, and architectural photography.',
    },
    {
      icon: SlidersHorizontal,
      title: 'Powerful Search',
      description: 'Filter properties dynamically by city, type, price brackets, bedrooms, bathrooms, and ownership purpose.',
    },
    {
      icon: CheckCircle2,
      title: 'Detailed Property Specs',
      description: 'Review structural highlights, amenities, parking capacity, and orientation before initiating an inquiry.',
    },
    {
      icon: BookmarkCheck,
      title: 'Save Your Favorites',
      description: 'Bookmark homes and executive apartments locally to build your personalized shortlist across sessions.',
    },
    {
      icon: Send,
      title: 'Simple Inquiry Flow',
      description: 'Directly simulate inquiries with advisors without leaving the platform or submitting sensitive payment data.',
    },
    {
      icon: Smartphone,
      title: 'Responsive Experience',
      description: 'Browse fluidly across desktop, tablet, and mobile devices with fast load times and zero layout shifts.',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between p-6 sm:p-12 lg:p-16 border border-[#E5E3DC] dark:border-[#263341] shadow-2xl">
            {/* Background Image with Overlays */}
            <OptimizedImage
              src="/images/hero_property_banner_1790454702504.jpg"
              alt="Modern architectural luxury residence"
              priority={true}
              fallbackType="hero"
              containerClassName="absolute inset-0 w-full h-full"
              className="scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

            {/* Hero Content */}
            <div className="relative z-10 max-w-2xl space-y-6 pt-4 sm:pt-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#C49A6C] dark:text-[#E5B869]" />
                <span>Next-Generation Real Estate Discovery</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] [text-wrap:balance]">
                Find a Place You'll Love to Call Home.
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-neutral-200 font-normal leading-relaxed max-w-xl">
                Discover modern homes, apartments, villas, and commercial spaces through a simple and intuitive property search experience.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/properties"
                  className="px-6 sm:px-7 py-3.5 bg-[#143D36] hover:bg-[#0E2E29] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] text-white dark:text-[#08221D] text-xs sm:text-sm font-extrabold rounded-xl flex items-center gap-2 transition-all shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setIsListingOpen(true)}
                  className="px-6 sm:px-7 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 text-xs sm:text-sm font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  List a Property
                </button>
              </div>
            </div>

            {/* Hero Bottom Trust Note */}
            <div className="relative z-10 pt-8 flex items-center gap-3 text-xs text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-[#C49A6C] dark:text-[#E5B869]" />
              <span>Thoughtfully curated demo portfolio · 100% Client-side React Architecture</span>
            </div>
          </div>
        </div>

        {/* Search Bar (Selected Element Target) */}
        <div className="max-w-6xl mx-auto mt-20 sm:mt-[80px] relative z-20 px-2 sm:px-4">
          <SearchBar className="mt-[80px]" />
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeading
            kicker="Standout Collection"
            title="Featured Properties"
            subtitle="Explore a selection of standout properties from the PropertyHub collection across major metropolitan sectors."
          />
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#143D36] dark:text-[#2DD4BF] hover:underline transition-colors self-start md:self-end"
          >
            <span>View All Properties</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Property Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionHeading
            kicker="Browse by Category"
            title="Explore Architectural Styles & Spaces"
            subtitle="From private gated residences to high-yield commercial floors, find spaces calibrated to your requirements."
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Why PropertyHub Feature Section */}
      <section className="bg-white dark:bg-[#151C24] border-y border-[#E5E3DC] dark:border-[#263341] py-20 sm:py-24 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="The PropertyHub Advantage"
            title="A Smarter Way to Explore Property"
            subtitle="Designed to provide clarity, high visual fidelity, and seamless navigation for modern property seekers."
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl sm:rounded-3xl bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] transition-all duration-300 hover:bg-white dark:hover:bg-[#18212B] hover:shadow-lg hover:border-[#143D36]/30 dark:hover:border-[#2DD4BF]/30 hover:-translate-y-1"
                >
                  <div className="w-13 h-13 rounded-2xl bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] flex items-center justify-center mb-5 shadow-md">
                    <Icon className="w-6 h-6 text-[#C49A6C] dark:text-[#08221D]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team / Advisor Spotlight Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeading
            kicker="Advisory Network"
            title="Consult with Sector Advisors"
            subtitle="Connect with dedicated property specialists for residential acquisitions, leases, and commercial portfolios."
          />
          <Link
            to="/agents"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#143D36] dark:text-[#2DD4BF] hover:underline transition-colors self-start md:self-end"
          >
            <span>View All Advisors</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agentsData.slice(0, 3).map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl sm:rounded-4xl bg-[#143D36] dark:bg-[#123831] text-white p-8 sm:p-14 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#143D36] dark:border-[#263341]">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C49A6C]/20 dark:bg-[#2DD4BF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-xl space-y-3 text-center md:text-left">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C49A6C] dark:text-[#2DD4BF]">
              Demo Listing Portal
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight [text-wrap:balance]">
              Have a property to showcase in this demo?
            </h2>
            <p className="text-sm text-neutral-200 leading-relaxed">
              Experience our frontend listing workflow. Add your own property specs and see it instantly appear in the marketplace.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => setIsListingOpen(true)}
              className="px-6 py-3.5 bg-[#C49A6C] hover:bg-[#B08759] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] text-[#111827] dark:text-[#08221D] text-xs sm:text-sm font-black rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              List a Property Demo
            </button>
            <Link
              to="/properties"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      <ListingModal
        isOpen={isListingOpen}
        onClose={() => setIsListingOpen(false)}
      />
    </div>
  );
};
