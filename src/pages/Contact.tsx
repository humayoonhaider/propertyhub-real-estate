import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { useToast } from '../components/Toast';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const agentParam = searchParams.get('agent');
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: agentParam ? `Inquiry regarding advisor ${agentParam}` : 'General Property Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Please provide your full name';
    if (!form.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!form.phone.trim()) errs.phone = 'Please provide a contact phone number';
    if (!form.subject.trim()) errs.subject = 'Please enter a subject';
    if (!form.message.trim()) errs.message = 'Please provide your message';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Message Sent Successfully', 'Demo contact message logged in session.');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#151C24] rounded-3xl sm:rounded-4xl border border-[#E5E3DC] dark:border-[#263341] p-8 sm:p-12 shadow-sm transition-colors duration-200">
        <SectionHeading
          kicker="Demo Inquiry Desk"
          title="Let's Talk About Property."
          subtitle="Have questions about our fictional listings, searching criteria, or platform architecture? We'd love to connect."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] p-6 sm:p-7 space-y-6 shadow-sm">
            <h3 className="font-bold text-lg text-[#111827] dark:text-white">Demo Contact Details</h3>
            <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
              These details are provided for demonstration purposes within this portfolio concept.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] uppercase font-bold block">Email</span>
                  <a href="mailto:hello@propertyhub.demo" className="font-bold text-[#111827] dark:text-white hover:text-[#143D36] dark:hover:text-[#2DD4BF] transition-colors">
                    hello@propertyhub.demo
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] uppercase font-bold block">Phone</span>
                  <span className="font-bold text-[#111827] dark:text-white">+92 300 0000000</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] uppercase font-bold block">Location</span>
                  <span className="font-bold text-[#111827] dark:text-white">Islamabad, Pakistan — Demo Location</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#143D36]/10 dark:bg-[#2DD4BF]/15 text-[#143D36] dark:text-[#2DD4BF] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#6B7280] dark:text-[#94A3B8] uppercase font-bold block">Demo Support Hours</span>
                  <span className="font-bold text-[#111827] dark:text-white">Monday – Saturday, 9:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#F8F8F6] dark:bg-[#0E1318] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] space-y-2 text-xs text-[#6B7280] dark:text-[#94A3B8]">
            <div className="flex items-center gap-2 font-bold text-[#111827] dark:text-white">
              <ShieldCheck className="w-4 h-4 text-[#143D36] dark:text-[#2DD4BF]" />
              <span>Concept Disclaimer</span>
            </div>
            <p className="leading-relaxed">
              This contact form is a client-side simulation. No personal data is transmitted across external networks.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white dark:bg-[#151C24] rounded-3xl sm:rounded-4xl border border-[#E5E3DC] dark:border-[#263341] p-8 shadow-sm">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#111827] dark:text-white">Message Sent Successfully</h3>
              <p className="text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
                Thank you for testing the contact interface. Your demo submission has been received.
              </p>
              <div className="p-4 bg-[#F8F8F6] dark:bg-[#0E1318] rounded-2xl border border-[#E5E3DC] dark:border-[#263341] text-xs text-[#6B7280] dark:text-[#94A3B8]">
                <strong>Notice:</strong> This is a demo contact form.
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setForm({
                    name: '',
                    email: '',
                    phone: '',
                    subject: 'General Property Inquiry',
                    message: '',
                  });
                }}
                className="px-6 py-2.5 bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] text-xs sm:text-sm font-bold rounded-xl cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Asad Farooq"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] ${
                      errors.name ? 'border-rose-400' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] ${
                      errors.email ? 'border-rose-400' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 300 0000000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] ${
                      errors.phone ? 'border-rose-400' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Schedule a viewing or acquisition inquiry"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] ${
                      errors.subject ? 'border-rose-400' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
                    }`}
                  />
                  {errors.subject && <p className="text-[11px] text-rose-500 mt-1">{errors.subject}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your property requirements, budget range..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`w-full p-3.5 bg-[#F8F8F6] dark:bg-[#0E1318] border rounded-xl text-xs sm:text-sm text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] resize-none ${
                    errors.message ? 'border-rose-400' : 'border-[#E5E3DC] dark:border-[#263341] focus:border-[#143D36] dark:focus:border-[#2DD4BF]'
                  }`}
                />
                {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-8 bg-[#143D36] hover:bg-[#0E2E29] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] disabled:opacity-50 text-white dark:text-[#08221D] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting Message...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
