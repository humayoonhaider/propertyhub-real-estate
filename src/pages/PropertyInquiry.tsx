import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { InquiryForm } from '../components/InquiryForm';
import { getAllProperties } from '../utils/storage';
import { ShieldCheck, Building2 } from 'lucide-react';

export const PropertyInquiry: React.FC = () => {
  const [searchParams] = useSearchParams();
  const properties = getAllProperties();
  const initialPropId = searchParams.get('id') || properties[0]?.id || '';
  const [selectedPropertyId, setSelectedPropertyId] = useState(initialPropId);

  const currentProperty = properties.find((p) => p.id === selectedPropertyId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#151C24] rounded-3xl sm:rounded-4xl border border-[#E5E3DC] dark:border-[#263341] p-8 sm:p-12 shadow-sm transition-colors duration-200">
        <SectionHeading
          kicker="Direct Inquiry Hub"
          title="Property Inquiry Portal"
          subtitle="Select a property from the collection or request general consultation regarding your buying or leasing preferences."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Property Selector & Summary */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-base text-[#111827] dark:text-white">Select Target Property</h3>
            <div>
              <label className="text-xs text-[#6B7280] dark:text-[#94A3B8] block mb-1.5 font-medium">Choose from active demo listings:</label>
              <select
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF] cursor-pointer font-medium"
              >
                <option value="">General Platform Consultation (No Specific Property)</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.location.city} — {p.priceFormatted})
                  </option>
                ))}
              </select>
            </div>

            {currentProperty ? (
              <div className="pt-4 border-t border-[#E5E3DC] dark:border-[#263341] space-y-3">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={currentProperty.images[0]}
                    alt={currentProperty.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#143D36] dark:text-[#2DD4BF]">
                    {currentProperty.type} · For {currentProperty.purpose}
                  </span>
                  <h4 className="font-bold text-[#111827] dark:text-white text-sm line-clamp-1">{currentProperty.title}</h4>
                  <p className="text-xs font-bold text-[#143D36] dark:text-[#2DD4BF] mt-0.5">{currentProperty.priceFormatted}</p>
                  <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-1">{currentProperty.location.fullAddress}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#F8F8F6] dark:bg-[#0E1318] rounded-xl text-xs text-[#6B7280] dark:text-[#94A3B8] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#143D36] dark:text-[#2DD4BF] shrink-0" />
                <span>You are submitting a general property requirement inquiry.</span>
              </div>
            )}
          </div>

          <div className="p-6 bg-[#F8F8F6] dark:bg-[#0E1318] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] space-y-2 text-xs text-[#6B7280] dark:text-[#94A3B8]">
            <div className="flex items-center gap-2 font-bold text-[#111827] dark:text-white">
              <ShieldCheck className="w-4 h-4 text-[#143D36] dark:text-[#2DD4BF]" />
              <span>Client-Side Demo Guarantee</span>
            </div>
            <p className="leading-relaxed">
              Inquiries are stored safely in local browser memory and never distributed. You may test submitting inquiries with any fictional contact info.
            </p>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-2">
          <InquiryForm
            propertyId={currentProperty?.id}
            propertyTitle={currentProperty?.title}
          />
        </div>
      </div>
    </div>
  );
};
