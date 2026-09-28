import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { Property } from '../data/properties';
import { saveUserListing, formatPKR } from '../utils/storage';
import { useToast } from './Toast';

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ListingModal: React.FC<ListingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    type: 'House' as Property['type'],
    purpose: 'Buy' as Property['purpose'],
    city: 'Islamabad' as Property['location']['city'],
    area: '',
    fullAddress: '',
    price: '',
    bedrooms: '3',
    bathrooms: '3',
    areaSqFt: '2250',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = 'Property Title is required';
    if (!formData.area.trim()) errs.area = 'Area/Sector is required';
    if (!formData.price.trim() || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errs.price = 'Valid price in PKR is required';
    }
    if (!formData.areaSqFt.trim() || isNaN(Number(formData.areaSqFt)) || Number(formData.areaSqFt) <= 0) {
      errs.areaSqFt = 'Valid area in sq ft is required';
    }
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.contactName.trim()) errs.contactName = 'Contact Name is required';
    if (!formData.contactEmail.trim() || !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      errs.contactEmail = 'Valid contact email is required';
    }
    if (!formData.contactPhone.trim()) errs.contactPhone = 'Contact phone is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const numericPrice = Number(formData.price);
    const newProp: Property = {
      id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title: formData.title.trim(),
      tagline: `Newly listed ${formData.type.toLowerCase()} in ${formData.area}, ${formData.city}`,
      type: formData.type,
      purpose: formData.purpose,
      price: numericPrice,
      priceFormatted: formatPKR(numericPrice, formData.purpose),
      location: {
        city: formData.city,
        area: formData.area.trim(),
        fullAddress: formData.fullAddress.trim() || `${formData.area.trim()}, ${formData.city}, Pakistan (Demo Listing)`,
      },
      bedrooms: Number(formData.bedrooms) || 0,
      bathrooms: Number(formData.bathrooms) || 0,
      areaSqFt: Number(formData.areaSqFt) || 1500,
      parkingSpaces: 2,
      yearBuilt: 2026,
      isFeatured: false,
      isNew: true,
      images: [
        formData.type === 'Apartment' 
          ? '/images/prop_skyline_apartment_1790454732612.jpg'
          : formData.type === 'Office' || formData.type === 'Commercial'
          ? '/images/prop_urban_office_1790454758204.jpg'
          : formData.type === 'Villa'
          ? '/images/prop_emerald_villa_1790454745096.jpg'
          : '/images/prop_cedar_residence_1790454719011.jpg',
        '/images/hero_property_banner_1790454702504.jpg',
      ],
      description: formData.description.trim(),
      features: [
        'Prime Neighborhood',
        'Modern Construction',
        'Secure Access',
        'All Utilities Connected',
        'Spacious Layout',
      ],
      highlights: [
        { label: 'Listed By', value: formData.contactName.trim() },
        { label: 'City', value: formData.city },
        { label: 'Purpose', value: `For ${formData.purpose}` },
        { label: 'Listed Date', value: 'Today (Demo)' },
      ],
      agentId: 'daniel-morgan',
      createdAt: new Date().toISOString().split('T')[0],
    };

    saveUserListing(newProp);
    setIsSubmitted(true);
    showToast('Property Submitted', 'Your property has been added to this demo experience.');
    if (onSuccess) onSuccess();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="bg-white dark:bg-[#151C24] rounded-3xl border border-[#E5E3DC] dark:border-[#263341] max-w-2xl w-full my-auto overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E3DC] dark:border-[#263341] bg-[#F8F8F6] dark:bg-[#0E1318]">
          <div>
            <h3 className="text-xl font-extrabold text-[#111827] dark:text-white">List a Property (Demo)</h3>
            <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-0.5">
              Submit your property details to showcase it across the PropertyHub discovery platform.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white dark:bg-[#1E293B] text-[#111827] dark:text-white flex items-center justify-center transition-colors border border-[#E5E3DC] dark:border-[#263341] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-[#111827] dark:text-white">Property Submitted</h4>
            <p className="text-sm text-[#6B7280] dark:text-[#94A3B8] max-w-md mx-auto leading-relaxed">
              Your property has been added to this demo experience. You can now browse, filter, or view it on the Properties page.
            </p>
            <div className="p-4 bg-[#F8F8F6] dark:bg-[#0E1318] rounded-2xl border border-[#E5E3DC] dark:border-[#263341] text-xs text-[#6B7280] dark:text-[#94A3B8] max-w-md mx-auto">
              <strong>Demo Disclaimer:</strong> Data is saved in your browser's localStorage for demonstration.
            </div>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
              >
                Done & View Properties
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Title */}
            <div>
              <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
                Property Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Modern Sunset Penthouse or Pine Valley Villa"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] ${
                  errors.title ? 'border-rose-400' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
                }`}
              />
              {errors.title && <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>}
            </div>

            {/* Type & Purpose */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">Property Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF] font-medium"
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Office">Office</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land / Plot</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">Purpose</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Buy', 'Rent'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, purpose: p })}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        formData.purpose === p
                          ? 'bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] border-[#143D36] dark:border-[#2DD4BF]'
                          : 'bg-[#F8F8F6] dark:bg-[#0E1318] text-[#6B7280] dark:text-[#94A3B8] border-[#E5E3DC] dark:border-[#263341]'
                      }`}
                    >
                      For {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">City</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF] font-medium"
                >
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Abbottabad">Abbottabad</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
                  Area / Sector <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sector F-10, DHA Phase 5"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className={`w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] ${
                    errors.area ? 'border-rose-400' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
                  }`}
                />
                {errors.area && <p className="text-[11px] text-rose-500 mt-1">{errors.area}</p>}
              </div>
            </div>

            {/* Price & Area */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
                  Price (PKR) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 25000000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className={`w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] ${
                    errors.price ? 'border-rose-400' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
                  }`}
                />
                {errors.price && <p className="text-[11px] text-rose-500 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">Bedrooms</label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none focus:border-[#143D36] dark:focus:border-[#2DD4BF] font-medium"
                >
                  <option value="0">0 (Commercial / Land)</option>
                  <option value="1">1 Bed</option>
                  <option value="2">2 Beds</option>
                  <option value="3">3 Beds</option>
                  <option value="4">4 Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
                  Area (Sq Ft) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 2250"
                  value={formData.areaSqFt}
                  onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                  className={`w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] ${
                    errors.areaSqFt ? 'border-rose-400' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
                  }`}
                />
                {errors.areaSqFt && <p className="text-[11px] text-rose-500 mt-1">{errors.areaSqFt}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Detailed summary of property layout, key features, orientation..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full p-3 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] resize-none ${
                  errors.description ? 'border-rose-400' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
                }`}
              />
              {errors.description && <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>}
            </div>

            {/* Contact Details */}
            <div className="pt-3 border-t border-[#E5E3DC] dark:border-[#263341] space-y-3">
              <h4 className="text-xs font-bold text-[#111827] dark:text-white uppercase tracking-wider">
                Seller / Listing Agent Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#6B7280] dark:text-[#94A3B8] block mb-1">
                    Contact Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tariq Mehmood"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318]"
                  />
                  {errors.contactName && <p className="text-[10px] text-rose-500 mt-0.5">{errors.contactName}</p>}
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#6B7280] dark:text-[#94A3B8] block mb-1">
                    Contact Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="tariq@email.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318]"
                  />
                  {errors.contactEmail && <p className="text-[10px] text-rose-500 mt-0.5">{errors.contactEmail}</p>}
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#6B7280] dark:text-[#94A3B8] block mb-1">
                    Contact Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 300 0000000"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318]"
                  />
                  {errors.contactPhone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.contactPhone}</p>}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#E5E3DC] dark:border-[#263341] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#E5E3DC] dark:border-[#263341] text-xs font-bold text-[#6B7280] dark:text-[#94A3B8] hover:bg-[#F8F8F6] dark:hover:bg-[#0E1318] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#143D36] dark:bg-[#2DD4BF] hover:bg-[#0E2E29] dark:hover:bg-[#14B8A6] text-white dark:text-[#08221D] rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Submit Property
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
