import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllProperties, isFavoriteId, toggleFavoriteId, formatPKR } from '../utils/storage';
import { Property } from '../data/properties';
import { agentsData } from '../data/agents';
import { PropertyGallery } from '../components/PropertyGallery';
import { InquiryForm } from '../components/InquiryForm';
import { PropertyCard } from '../components/PropertyCard';
import { OptimizedImage } from '../components/OptimizedImage';
import { useToast } from '../components/Toast';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Car,
  Heart,
  Share2,
  ArrowLeft,
  CheckCircle,
  Phone,
  Mail,
} from 'lucide-react';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const [properties, setProperties] = useState<Property[]>(getAllProperties());
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const list = getAllProperties();
    setProperties(list);
    if (id) {
      setIsFav(isFavoriteId(id));
    }
  }, [id]);

  const property = properties.find((p) => p.id === id);
  const agent = agentsData.find((a) => a.id === property?.agentId) || agentsData[0];

  const similarProperties = properties
    .filter((p) => p.id !== property?.id && (p.type === property?.type || p.location.city === property?.location.city))
    .slice(0, 3);

  if (!property) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#111827] dark:text-white">Property Not Found</h2>
        <p className="text-sm text-[#6B7280] dark:text-[#94A3B8]">
          The requested property demo listing could not be found or has been removed.
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] rounded-xl text-sm font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Properties</span>
        </Link>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    const added = toggleFavoriteId(property.id);
    setIsFav(added);
    if (added) {
      showToast('Saved to Favorites', `${property.title} has been added to your favorites.`);
    } else {
      showToast('Removed from Favorites', `${property.title} removed from favorites.`, 'info');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Property URL copied to clipboard.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6B7280] dark:text-[#94A3B8] hover:text-[#143D36] dark:hover:text-[#2DD4BF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all properties</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#151C24] border border-[#E5E3DC] dark:border-[#263341] text-xs font-bold text-[#111827] dark:text-white hover:bg-[#F8F8F6] dark:hover:bg-[#1E293B] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-[#143D36] dark:text-[#2DD4BF]" />
            <span>Share</span>
          </button>

          <button
            onClick={handleFavoriteClick}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs ${
              isFav
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900'
                : 'bg-white dark:bg-[#151C24] text-[#111827] dark:text-white border-[#E5E3DC] dark:border-[#263341] hover:bg-[#F8F8F6] dark:hover:bg-[#1E293B]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-rose-500' : 'text-[#6B7280] dark:text-[#94A3B8]'}`} />
            <span>{isFav ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Property Title & Price Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E5E3DC] dark:border-[#263341]">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 text-xs font-black rounded-lg uppercase tracking-wider ${
              property.purpose === 'Buy'
                ? 'bg-[#143D36] text-white dark:bg-[#2DD4BF] dark:text-[#08221D]'
                : 'bg-[#C49A6C] text-white dark:bg-[#E5B869] dark:text-[#111827]'
            }`}>
              For {property.purpose}
            </span>
            <span className="px-2.5 py-1 text-xs font-bold bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] text-[#111827] dark:text-white rounded-lg">
              {property.type}
            </span>
            {property.isNew && (
              <span className="px-2 py-0.5 text-[10px] font-black bg-emerald-500 text-white rounded-md uppercase tracking-wider">
                New
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#111827] dark:text-white tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#6B7280] dark:text-[#94A3B8]">
            <MapPin className="w-4 h-4 text-[#143D36] dark:text-[#2DD4BF] shrink-0" />
            <span>{property.location.fullAddress}</span>
          </div>
        </div>

        <div className="lg:text-right space-y-1">
          <p className="text-xs uppercase font-bold text-[#6B7280] dark:text-[#94A3B8]">Asking Price</p>
          <p className="text-2xl sm:text-4xl font-black text-[#143D36] dark:text-[#2DD4BF] font-display tabular-nums">
            {formatPKR(property.price, property.purpose)}
          </p>
          <p className="text-xs text-[#6B7280] dark:text-[#94A3B8]">Estimated transfer taxes apply (demo)</p>
        </div>
      </div>

      {/* Media & Key Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Gallery & Description (2 cols) */}
        <div className="lg:col-span-2 space-y-10">
          <PropertyGallery images={property.images} title={property.title} />

          {/* Key Specs Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white dark:bg-[#151C24] p-5 rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] shadow-xs">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] flex items-center justify-center shrink-0">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] font-medium block">Bedrooms</span>
                  <span className="text-sm font-bold text-[#111827] dark:text-white">{property.bedrooms} Beds</span>
                </div>
              </div>
            )}

            {property.bathrooms > 0 && (
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] flex items-center justify-center shrink-0">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] font-medium block">Bathrooms</span>
                  <span className="text-sm font-bold text-[#111827] dark:text-white">{property.bathrooms} Baths</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] flex items-center justify-center shrink-0">
                <Maximize className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] font-medium block">Covered Area</span>
                <span className="text-sm font-bold text-[#111827] dark:text-white tabular-nums">{property.areaSqFt.toLocaleString()} sq ft</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] font-medium block">Parking</span>
                <span className="text-sm font-bold text-[#111827] dark:text-white">{property.parkingSpaces} Vehicle{property.parkingSpaces !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-xl font-bold text-[#111827] dark:text-white">About this Property</h3>
            <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#94A3B8] leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Features Checklist */}
          <div className="bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-xl font-bold text-[#111827] dark:text-white">Property Amenities & Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {property.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#111827] dark:text-[#E2E8F0]">
                  <CheckCircle className="w-4 h-4 text-[#143D36] dark:text-[#2DD4BF] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="text-xl font-bold text-[#111827] dark:text-white">Property Specifications & Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.highlights.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] flex items-center justify-between">
                  <span className="text-xs text-[#6B7280] dark:text-[#94A3B8]">{item.label}</span>
                  <span className="text-xs font-bold text-[#111827] dark:text-white">{item.value}</span>
                </div>
              ))}
              <div className="p-3.5 rounded-xl bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] flex items-center justify-between">
                <span className="text-xs text-[#6B7280] dark:text-[#94A3B8]">Year Built / Completed</span>
                <span className="text-xs font-bold text-[#111827] dark:text-white">{property.yearBuilt}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] flex items-center justify-between">
                <span className="text-xs text-[#6B7280] dark:text-[#94A3B8]">Listing Status</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Active Demo Listing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Inquiry Form + Advisor info */}
        <div className="space-y-6 sticky top-28">
          <InquiryForm
            propertyId={property.id}
            propertyTitle={property.title}
            agentName={agent?.name}
          />

          {agent && (
            <div className="bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] p-6 space-y-4 shadow-xs">
              <span className="text-[11px] font-bold text-[#143D36] dark:text-[#2DD4BF] uppercase tracking-wider block">
                Dedicated Property Advisor
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#E5E3DC] dark:border-[#263341] shrink-0">
                  <OptimizedImage
                    src={agent.avatar}
                    alt={agent.name}
                    fallbackType="agent"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#111827] dark:text-white text-sm">{agent.name}</h4>
                  <p className="text-xs text-[#6B7280] dark:text-[#94A3B8]">{agent.role}</p>
                </div>
              </div>

              <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] leading-relaxed line-clamp-2">
                {agent.bio}
              </p>

              <div className="pt-2 border-t border-[#E5E3DC] dark:border-[#263341] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#6B7280] dark:text-[#94A3B8]">
                  <Phone className="w-3.5 h-3.5 text-[#143D36] dark:text-[#2DD4BF]" />
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7280] dark:text-[#94A3B8]">
                  <Mail className="w-3.5 h-3.5 text-[#143D36] dark:text-[#2DD4BF]" />
                  <span>{agent.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <div className="pt-12 border-t border-[#E5E3DC] dark:border-[#263341] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-[#111827] dark:text-white">Similar Properties You May Like</h3>
            <Link to="/properties" className="text-xs font-bold text-[#143D36] dark:text-[#2DD4BF] hover:underline">
              View All Properties →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
