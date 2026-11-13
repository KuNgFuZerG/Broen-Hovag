import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { EntityFilter } from '../types';

export const EntityFilterBar: React.FC = () => {
  const { activeEntityFilter, setActiveEntityFilter } = useAppStore();

  const options: { id: EntityFilter; label: string }[] = [
    { id: 'alle', label: 'Alle' },
    { id: 'kirke', label: 'Kirke' },
    { id: 'bedehus', label: 'Bedehus' },
    { id: 'push', label: 'PUSH' },
  ];

  const isAllSelected = activeEntityFilter === 'alle';

  const getButtonStyle = (id: EntityFilter, isActive: boolean) => {
    switch (id) {
      case 'kirke':
        if (isActive) {
          return 'bg-sky-600 text-white border-sky-600 shadow-sm shadow-sky-950/20';
        }
        return isAllSelected
          ? 'bg-sky-100 text-sky-950 border-sky-400 ring-1 ring-sky-300/70 hover:bg-sky-200/80'
          : 'bg-white text-sky-900/75 border-sky-200 hover:bg-sky-50';
      case 'bedehus':
        if (isActive) {
          return 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-950/20';
        }
        return isAllSelected
          ? 'bg-emerald-100 text-emerald-950 border-emerald-400 ring-1 ring-emerald-300/70 hover:bg-emerald-200/80'
          : 'bg-white text-emerald-900/75 border-emerald-200 hover:bg-emerald-50';
      case 'push':
        if (isActive) {
          return 'bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-950/20';
        }
        return isAllSelected
          ? 'bg-purple-100 text-purple-950 border-purple-400 ring-1 ring-purple-300/70 hover:bg-purple-200/80'
          : 'bg-white text-purple-900/75 border-purple-200 hover:bg-purple-50';
      case 'alle':
      default:
        return isActive
          ? 'bg-orange-600 text-white border-orange-600 shadow-sm shadow-orange-950/20'
          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50';
    }
  };

  const getDotColor = (id: EntityFilter, isActive: boolean) => {
    if (isActive || !isAllSelected || id === 'alle') return null;
    if (id === 'kirke') return 'bg-sky-600';
    if (id === 'bedehus') return 'bg-emerald-600';
    if (id === 'push') return 'bg-purple-600';
    return null;
  };

  return (
    <div
      role="tablist"
      aria-label="Filtrer enheter i menigheten"
      className="w-full grid grid-cols-4 gap-2"
    >
      {options.map((opt) => {
        const isActive = activeEntityFilter === opt.id;
        const colorClasses = getButtonStyle(opt.id, isActive);
        const dotColor = getDotColor(opt.id, isActive);

        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={isActive}
            aria-label={`Filtrer innhold etter ${opt.label}`}
            onClick={() => setActiveEntityFilter(opt.id)}
            className={`px-1.5 py-2 min-h-[44px] rounded-2xl border text-xs font-extrabold transition-all duration-150 cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 text-center shadow-2xs ${colorClasses}`}
          >
            {dotColor && <span className={`w-2 h-2 rounded-full ${dotColor} shrink-0`} />}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};


