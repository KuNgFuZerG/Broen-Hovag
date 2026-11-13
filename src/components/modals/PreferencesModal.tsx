import React from 'react';
import { X, Sliders, Check, EyeOff, Sparkles, Church, Users, ShieldAlert, HeartHandshake } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { ContentCategory, EntityTag } from '../../types';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({ isOpen, onClose }) => {
  const { user, toggleCategoryInterest, toggleEntityFollow, updateUserPreferences } = useAppStore();

  if (!isOpen) return null;

  const preferences = user.preferences || {
    followedEntities: { kirke: true, bedehus: true, push: true },
    followedCategories: {
      Gudstjeneste: true,
      Ungdom: true,
      Senior: true,
      Familie: true,
      Kultur: true,
      Bønn: true,
      Dugnad: true,
      Misjon: true,
      Konfirmant: true,
      Trosopplæring: true
    },
    hideSeniorContent: false,
    hideYouthContent: false
  };

  const categories: { key: ContentCategory; label: string; description: string; tagColor: string }[] = [
    {
      key: 'Gudstjeneste',
      label: 'Gudstjenester & Høymesser',
      description: 'Søndagssamlinger, nattverd, dåp og fellesgudstjenester',
      tagColor: 'bg-sky-100 text-sky-950 border-sky-300'
    },
    {
      key: 'Trosopplæring',
      label: 'Trosopplæring (0–18 år)',
      description: 'Babysamling, 4-årsbok, Tårnagenter, Lys Våken og Skattejakt',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300'
    },
    {
      key: 'Konfirmant',
      label: 'Konfirmasjon & Leir',
      description: 'Evjetun-leir, Passord-kvelder, hjemmegrupper og Påskespill',
      tagColor: 'bg-blue-100 text-blue-950 border-blue-300'
    },
    {
      key: 'Ungdom',
      label: 'Ungdom & PUSH (13–25 år)',
      description: 'Klubbkvelder, leir, game nights og ungdomsarrangementer',
      tagColor: 'bg-purple-100 text-purple-950 border-purple-300'
    },
    {
      key: 'Senior',
      label: 'Senior & Formiddagstreff (65+)',
      description: 'Eldretreff, salmekvelder, hyggestunder og formiddagsmøter',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300'
    },
    {
      key: 'Familie',
      label: 'Barn & Familie',
      description: 'Søndagsskole, tårnagenter, familiekor og familiedager',
      tagColor: 'bg-rose-100 text-rose-950 border-rose-300'
    },
    {
      key: 'Bønn',
      label: 'Bønnemøter & Tidebønn',
      description: 'Stille stunder, bønnesamlinger og faste bønnegrupper',
      tagColor: 'bg-emerald-100 text-emerald-950 border-emerald-300'
    },
    {
      key: 'Kultur',
      label: 'Konserter & Kulturkvelder',
      description: 'Korkonserter, foredrag og åpne kulturkvelder i bygda',
      tagColor: 'bg-indigo-100 text-indigo-950 border-indigo-300'
    },
    {
      key: 'Dugnad',
      label: 'Dugnad & Praktisk arbeid',
      description: 'Basarer, vedlikeholdsdager og praktiske oppgaver',
      tagColor: 'bg-orange-100 text-orange-950 border-orange-300'
    },
    {
      key: 'Misjon',
      label: 'Misjon & Håpløpet',
      description: 'Misjonsalliansen Ecuador, Stefanusalliansen og NMS',
      tagColor: 'bg-teal-100 text-teal-950 border-teal-300'
    }
  ];

  const entities: { key: EntityTag; label: string; sub: string; color: string }[] = [
    {
      key: 'kirke',
      label: 'Høvåg Kirke',
      sub: 'Den norske kirke (Høvåg sokn)',
      color: 'border-sky-500 bg-sky-50 text-sky-950'
    },
    {
      key: 'bedehus',
      label: 'Høvåg Bedehus',
      sub: 'Stiftelsen Høvåg Bedehus Sti (egen juridisk enhet)',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-950'
    },
    {
      key: 'push',
      label: 'PUSH Ungdom',
      sub: 'Ungdomsarbeid og fellesskap',
      color: 'border-purple-500 bg-purple-50 text-purple-950'
    }
  ];

  const activeCategoriesCount = Object.values(preferences.followedCategories).filter(Boolean).length;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="preferences-modal-title"
        className="bg-[#f8fafc] w-full max-w-lg rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl border border-gray-200/80 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 id="preferences-modal-title" className="text-lg font-black text-gray-900 tracking-tight">
                Mine interesser & Innhold
              </h2>
              <p className="text-xs text-gray-700 font-semibold">
                Skreddersy hva du vil se og få varsler om
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Lukk tilpasningspanel"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4.5 overflow-y-auto space-y-6 flex-1 bg-[#f8fafc]">
          {/* Quick Explanation Banner */}
          <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-sm flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              Her kan du velge vekk arrangementer og kunngjøringer som ikke er relevante for din
              livssituasjon eller aldersgruppe (f.eks. eldre- eller ungdomsstoff).
            </p>
          </div>

          {/* 1. Målgrupper / Kategorier */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                  Kategorier & Målgrupper
                </h3>
                <p className="text-[11px] text-gray-600 font-semibold">
                  Velg hvilke temaer som skal vises i feed og kalender
                </p>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-800">
                {activeCategoriesCount} av {categories.length} aktive
              </span>
            </div>

            <div className="space-y-2">
              {categories.map((cat) => {
                const isSelected = preferences.followedCategories[cat.key] ?? true;

                return (
                  <button
                    key={cat.key}
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    onClick={() => toggleCategoryInterest(cat.key)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-white border-gray-300 shadow-sm'
                        : 'bg-gray-100/70 border-gray-200 opacity-60 hover:opacity-80'
                    }`}
                  >
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-gray-900 leading-tight truncate">
                          {cat.label}
                        </span>
                        {!isSelected && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-gray-200 text-gray-700">
                            Skjult
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-600 font-medium line-clamp-1">
                        {cat.description}
                      </p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 transition-colors border ${
                        isSelected
                          ? 'bg-orange-600 border-orange-600 text-white'
                          : 'bg-white border-gray-300 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Enheter / Samarbeidspartnere */}
          <div className="space-y-3">
            <div className="px-1">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                Følg Menighetsgrener
              </h3>
              <p className="text-[11px] text-gray-600 font-semibold">
                Styrer hvilke enheter du primært følger i bygda
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {entities.map((ent) => {
                const isFollowed = preferences.followedEntities[ent.key] ?? true;

                return (
                  <button
                    key={ent.key}
                    type="button"
                    role="switch"
                    aria-checked={isFollowed}
                    onClick={() => toggleEntityFollow(ent.key)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isFollowed
                        ? `${ent.color} bg-white shadow-sm border-2`
                        : 'bg-gray-100 border-gray-200 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-black leading-tight text-gray-900">
                        {ent.label}
                      </div>
                      <div className="text-[11px] text-gray-600 font-medium">{ent.sub}</div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${
                        isFollowed
                          ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                          : 'bg-gray-200 text-gray-700 border-gray-300'
                      }`}
                    >
                      {isFollowed ? 'Aktiv' : 'Skjult'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              updateUserPreferences({
                followedEntities: { kirke: true, bedehus: true, push: true },
                followedCategories: {
                  Gudstjeneste: true,
                  Ungdom: true,
                  Senior: true,
                  Familie: true,
                  Kultur: true,
                  Bønn: true,
                  Dugnad: true,
                  Misjon: true,
                  Konfirmant: true,
                  Trosopplæring: true
                }
              });
            }}
            className="text-xs font-bold text-gray-600 hover:text-gray-900 py-2 px-3 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Tilbakestill alle
          </button>

          <button
            onClick={onClose}
            className="py-3 px-6 min-h-[44px] rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            Lagre innstillinger
          </button>
        </div>
      </div>
    </div>
  );
};
