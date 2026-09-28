import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, Phone } from 'lucide-react';
import { saveInquiry } from '../utils/storage';
import { useToast } from './Toast';

interface InquiryFormProps {
  propertyId?: string;
  propertyTitle?: string;
  agentName?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  propertyId,
  propertyTitle,
  agentName,
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: propertyTitle
      ? `Hello, I would like more information regarding "${propertyTitle}". Please get in touch with me.`
      : 'Hello, I would like more information regarding available listings on PropertyHub.',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 7) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) errs.message = 'Please provide a message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      saveInquiry({
        propertyId,
        propertyTitle,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Inquiry Sent Successfully', 'Demo inquiry recorded in local state.');
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] p-6 sm:p-8 text-center space-y-4 shadow-sm animate-in fade-in">
        <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#111827] dark:text-white">Inquiry Sent Successfully</h3>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
          Thank you, <strong className="text-[#111827] dark:text-white">{formData.fullName}</strong>. Your inquiry regarding{' '}
          <strong className="text-[#111827] dark:text-white">{propertyTitle || 'PropertyHub'}</strong> has been simulated.
        </p>
        <div className="p-3 bg-[#F8F8F6] dark:bg-[#0E1318] rounded-xl border border-[#E5E3DC] dark:border-[#263341] text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
          <strong>Notice:</strong> This is a demo inquiry experience. No real message has been sent.
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData((prev) => ({ ...prev, message: '' }));
          }}
          className="text-xs font-bold text-[#143D36] dark:text-[#2DD4BF] hover:underline cursor-pointer"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] p-6 sm:p-8 shadow-sm space-y-5">
      <div>
        <h3 className="text-lg font-bold text-[#111827] dark:text-white">Interested in this Property?</h3>
        <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-1">
          {agentName
            ? `Submit your details to connect with advisor ${agentName}.`
            : 'Fill out the form below to receive full property specifications.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#9CA3AF] dark:text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. Asad Farooq"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full pl-10 pr-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] transition-all ${
                errors.fullName ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
              }`}
            />
          </div>
          {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#9CA3AF] dark:text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              placeholder="name@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full pl-10 pr-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] transition-all ${
                errors.email ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
              }`}
            />
          </div>
          {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#9CA3AF] dark:text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              placeholder="+92 300 0000000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full pl-10 pr-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] transition-all ${
                errors.phone ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
              }`}
            />
          </div>
          {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
            Message <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us what you are looking for..."
              className={`w-full p-3 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white placeholder:text-[#9CA3AF] dark:placeholder:text-[#64748B] focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] transition-all resize-none ${
                errors.message ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
              }`}
            />
          </div>
          {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-5 bg-[#143D36] hover:bg-[#0E2E29] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] disabled:opacity-60 text-white dark:text-[#08221D] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Sending Demo Inquiry...' : 'Send Inquiry'}</span>
        </button>
      </form>
    </div>
  );
};
