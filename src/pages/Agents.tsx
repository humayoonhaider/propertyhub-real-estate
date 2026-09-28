import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { AgentCard } from '../components/AgentCard';
import { agentsData, Agent } from '../data/agents';
import { ShieldCheck, X, CheckCircle2 } from 'lucide-react';
import { useToast } from '../components/Toast';

export const Agents: React.FC = () => {
  const { showToast } = useToast();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [modalForm, setModalForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleOpenContact = (agent: Agent) => {
    setSelectedAgent(agent);
    setModalForm({
      name: '',
      email: '',
      phone: '',
      message: `Hello ${agent.name}, I would like to consult with you regarding properties in your specialization.`,
    });
    setIsSent(false);
  };

  const handleSendAdvisorMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalForm.name.trim() || !modalForm.email.trim()) {
      showToast('Validation Error', 'Please provide your name and email.', 'error');
      return;
    }
    setIsSent(true);
    showToast('Message Sent', `Demo message to ${selectedAgent?.name} recorded.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-white dark:bg-[#151C24] rounded-3xl sm:rounded-4xl border border-[#E5E3DC] dark:border-[#263341] p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-start md:items-end justify-between gap-6 transition-colors duration-200">
        <SectionHeading
          kicker="Fictional Advisor Directory"
          title="Meet the PropertyHub Team"
          subtitle="A dedicated group of demo consultants specializing in high-end residential, penthouses, executive leases, and commercial development."
        />
        <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#F8F8F6] dark:bg-[#0E1318] rounded-xl border border-[#E5E3DC] dark:border-[#263341] text-xs font-medium text-[#6B7280] dark:text-[#94A3B8]">
          <ShieldCheck className="w-4 h-4 text-[#143D36] dark:text-[#2DD4BF]" />
          <span>Fictional demo profiles</span>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {agentsData.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onContactAgent={handleOpenContact}
          />
        ))}
      </div>

      {/* Advisor Contact Modal */}
      {selectedAgent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
        >
          <div
            className="bg-white dark:bg-[#151C24] rounded-3xl border border-[#E5E3DC] dark:border-[#263341] max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#E5E3DC] dark:border-[#263341] flex items-center justify-between bg-[#F8F8F6] dark:bg-[#0E1318]">
              <div className="flex items-center gap-3">
                <img
                  src={selectedAgent.avatar}
                  alt={selectedAgent.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover object-top border border-[#E5E3DC] dark:border-[#263341]"
                />
                <div>
                  <h3 className="font-bold text-[#111827] dark:text-white text-base">{selectedAgent.name}</h3>
                  <p className="text-xs text-[#6B7280] dark:text-[#94A3B8]">{selectedAgent.role}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="w-8 h-8 rounded-full bg-white dark:bg-[#1E293B] text-[#111827] dark:text-white flex items-center justify-center border border-[#E5E3DC] dark:border-[#263341] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSent ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-[#111827] dark:text-white">Message Sent Successfully</h4>
                <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
                  Your message to advisor <strong className="text-[#111827] dark:text-white">{selectedAgent.name}</strong> has been logged in demo state.
                </p>
                <div className="p-3 bg-[#F8F8F6] dark:bg-[#0E1318] rounded-xl text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                  This is a fictional demo experience.
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="px-5 py-2.5 bg-[#143D36] dark:bg-[#2DD4BF] text-white dark:text-[#08221D] rounded-xl text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendAdvisorMessage} className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={modalForm.name}
                    onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={modalForm.email}
                    onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+92 300 0000000"
                    value={modalForm.phone}
                    onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#374151] dark:text-[#CBD5E1] block mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    value={modalForm.message}
                    onChange={(e) => setModalForm({ ...modalForm, message: e.target.value })}
                    className="w-full p-3 bg-[#F8F8F6] dark:bg-[#0E1318] border border-[#E5E3DC] dark:border-[#263341] rounded-xl text-xs text-[#111827] dark:text-white focus:outline-none focus:bg-white dark:focus:bg-[#0E1318] resize-none"
                  />
                </div>
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAgent(null)}
                    className="px-4 py-2 border border-[#E5E3DC] dark:border-[#263341] text-xs font-bold text-[#6B7280] dark:text-[#94A3B8] rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#143D36] hover:bg-[#0E2E29] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] text-white dark:text-[#08221D] text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
