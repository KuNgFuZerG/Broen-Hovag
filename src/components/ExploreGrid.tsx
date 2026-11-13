import React, { useState } from 'react';
import {
  Heart,
  Mic,
  HandHeart,
  UserCheck,
  HeartHandshake,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Menu,
  ArrowRight
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const ExploreGrid: React.FC = () => {
  const { setActiveExploreModal, setDrawerOpen } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const primaryItems = [
    {
      id: 'trosopplaering' as const,
      label: 'Tro 0–18 år',
      subtitle: 'Plan & årshjul',
      icon: Sparkles,
      bgColor: 'bg-amber-100 text-amber-900 border border-amber-200'
    },
    {
      id: 'diakoni' as const,
      label: 'Omsorg & Diakoni',
      subtitle: 'Besøk & prat',
      icon: HeartHandshake,
      bgColor: 'bg-rose-100 text-rose-800 border border-rose-200'
    },
    {
      id: 'tjenester' as const,
      label: 'Frivillige vakter',
      subtitle: 'Kirke & basar',
      icon: UserCheck,
      bgColor: 'bg-sky-100 text-sky-800 border border-sky-200'
    },
    {
      id: 'gi' as const,
      label: 'Gi et offer',
      subtitle: 'Vipps #12 12 18',
      icon: Heart,
      bgColor: 'bg-orange-100 text-orange-800 border border-orange-200'
    }
  ];

  const secondaryItems = [
    {
      id: 'bonn' as const,
      label: 'Bønnevegg',
      subtitle: 'Del bønneemne',
      icon: HandHeart,
      bgColor: 'bg-emerald-100 text-emerald-800 border border-emerald-200'
    },
    {
      id: 'podkast' as const,
      label: 'Presten & montøren',
      subtitle: 'Lokal podkast',
      icon: Mic,
      bgColor: 'bg-purple-100 text-purple-800 border border-purple-200'
    }
  ];

  const displayedItems = isExpanded
    ? [...primaryItems, ...secondaryItems]
    : primaryItems;

  return (
    <section className="px-5 mt-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 role="heading" aria-level={2} className="text-[12px] font-extrabold tracking-widest text-gray-600 uppercase">
            HURTIGVALG & VERKTØY
          </h2>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gray-200 text-gray-700">
            {isExpanded ? '6 verktøy' : '4 utvalgte'}
          </span>
        </div>

        {/* Action link to open Drawer or Toggle expand */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-bold text-orange-700 hover:text-orange-800 flex items-center gap-0.5 transition-colors cursor-pointer py-1 px-1.5 rounded-lg hover:bg-orange-50"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Vis færre knapper' : 'Vis alle 6 verktøy'}
          >
            {isExpanded ? (
              <>
                <span>Skjul</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Flere</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          <span className="text-gray-300">|</span>

          <button
            onClick={() => setDrawerOpen(true)}
            className="text-[11px] font-extrabold text-gray-600 hover:text-amber-900 flex items-center gap-1 transition-colors cursor-pointer py-1 px-1.5 rounded-lg hover:bg-gray-100"
            aria-label="Åpne full skuff med alle verktøy"
          >
            <Menu className="w-3 h-3 text-amber-800" />
            <span>Skuff</span>
          </button>
        </div>
      </div>

      {/* Button Grid with clean spacing */}
      <div className="grid grid-cols-2 gap-2.5">
        {displayedItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              role="button"
              aria-label={`Åpne ${item.label}`}
              onClick={() => setActiveExploreModal(item.id)}
              className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs hover:shadow-xs hover:border-gray-300 transition-all duration-150 flex items-center gap-3 cursor-pointer active:scale-98 text-left group"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${item.bgColor}`}
              >
                <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-extrabold text-gray-900 tracking-tight block truncate group-hover:text-amber-800 transition-colors">
                  {item.label}
                </span>
                <span className="text-[10.5px] font-medium text-gray-500 block truncate leading-tight">
                  {item.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Subtle Drawer trigger banner if collapsed */}
      {!isExpanded && (
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-full mt-2.5 py-2 px-3 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/60 text-amber-900 text-[11px] font-bold flex items-center justify-between transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Menu className="w-3.5 h-3.5 text-amber-800" />
            <span>Trenger du bønn, podkast eller menighetsinfo?</span>
          </div>
          <span className="flex items-center gap-0.5 text-amber-950 font-black group-hover:translate-x-0.5 transition-transform">
            Åpne skuff <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      )}
    </section>
  );
};
