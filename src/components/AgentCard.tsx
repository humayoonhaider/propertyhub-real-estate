import React from 'react';
import { Agent } from '../data/agents';
import { Mail, Phone, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from './OptimizedImage';

interface AgentCardProps {
  agent: Agent;
  onContactAgent?: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onContactAgent }) => {
  return (
    <div className="bg-white dark:bg-[#151C24] rounded-2xl sm:rounded-3xl border border-[#E5E3DC] dark:border-[#263341] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group">
      <div>
        {/* Avatar header with progressive image loading */}
        <div className="relative h-56 bg-[#ECEAE3] dark:bg-[#1A222C] overflow-hidden">
          <OptimizedImage
            src={agent.avatar}
            alt={agent.name}
            fallbackType="agent"
            zoomOnHover={true}
            containerClassName="w-full h-full"
            className="object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
          
          <div className="absolute top-3.5 left-3.5 bg-white/95 dark:bg-[#151C24]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider text-[#143D36] dark:text-[#2DD4BF] uppercase shadow-xs border border-black/5 dark:border-white/10 z-10">
            Demo Advisor
          </div>

          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white z-10">
            <div>
              <h3 className="font-bold text-lg leading-tight text-white drop-shadow-sm">{agent.name}</h3>
              <p className="text-xs text-neutral-300 font-medium mt-0.5">{agent.role}</p>
            </div>
            <div className="flex items-center gap-1 bg-black/60 dark:bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold border border-white/10">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="tabular-nums">{agent.rating}</span>
            </div>
          </div>
        </div>

        {/* Details body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280] dark:text-[#94A3B8]">
            <MapPin className="w-3.5 h-3.5 text-[#143D36] dark:text-[#2DD4BF] shrink-0" />
            <span>{agent.location}</span>
          </div>

          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed line-clamp-3 font-normal">
            {agent.bio}
          </p>

          <div className="pt-3 border-t border-[#E5E3DC] dark:border-[#263341] grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#F8F8F6] dark:bg-[#0E1318] p-2.5 rounded-xl border border-[#E5E3DC]/60 dark:border-[#263341]/60">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] dark:text-[#94A3B8] block tracking-wider">Specialization</span>
              <span className="font-bold text-[#111827] dark:text-white truncate block mt-0.5">{agent.specialization}</span>
            </div>
            <div className="bg-[#F8F8F6] dark:bg-[#0E1318] p-2.5 rounded-xl border border-[#E5E3DC]/60 dark:border-[#263341]/60">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] dark:text-[#94A3B8] block tracking-wider">Portfolio</span>
              <span className="font-bold text-[#111827] dark:text-white block tabular-nums mt-0.5">{agent.propertiesCount} Listings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 sm:p-6 pt-0">
        <div className="flex items-center gap-2">
          {onContactAgent ? (
            <button
              onClick={() => onContactAgent(agent)}
              className="flex-1 py-2.5 px-4 bg-[#143D36] hover:bg-[#0E2E29] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] text-white dark:text-[#08221D] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer tracking-wider"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Advisor</span>
            </button>
          ) : (
            <Link
              to={`/contact?agent=${encodeURIComponent(agent.name)}`}
              className="flex-1 py-2.5 px-4 bg-[#143D36] hover:bg-[#0E2E29] dark:bg-[#2DD4BF] dark:hover:bg-[#14B8A6] text-white dark:text-[#08221D] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 tracking-wider"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Advisor</span>
            </Link>
          )}
          <a
            href={`tel:${agent.phone}`}
            aria-label={`Call ${agent.name}`}
            className="w-10 h-10 rounded-xl bg-[#F8F8F6] dark:bg-[#0E1318] hover:bg-[#EAE8E3] dark:hover:bg-[#1E293B] text-[#111827] dark:text-white flex items-center justify-center transition-colors border border-[#E5E3DC] dark:border-[#263341]"
          >
            <Phone className="w-4 h-4 text-[#143D36] dark:text-[#2DD4BF]" />
          </a>
        </div>
      </div>
    </div>
  );
};
