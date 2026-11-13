import React, { useState } from 'react';
import { X, Sparkles, BookOpen, MapPin, Clock, User, Compass, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { TROSOPPLAERING_STAGES } from '../../data/mockData';
import { TrosopplaeringStage } from '../../types';

export const TrosopplaeringModal: React.FC = () => {
  const { activeExploreModal, setActiveExploreModal } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [selectedStage, setSelectedStage] = useState<TrosopplaeringStage | null>(null);

  if (activeExploreModal !== 'trosopplaering') return null;

  const categories = ['Alle', 'Småbarn', 'Skolebarn', 'Konfirmant', 'Ungdom', 'Leder'];

  const filteredStages =
    selectedCategory === 'Alle'
      ? TROSOPPLAERING_STAGES
      : TROSOPPLAERING_STAGES.filter((s) => s.category === selectedCategory);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trosopplaering-modal-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden border border-gray-100">
        {/* Sticky Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                Høvåg menighet · 0–18 år
              </p>
              <h2 id="trosopplaering-modal-title" className="text-lg font-black text-gray-900 tracking-tight">
                Trosopplæringsplan & Årshjul
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveExploreModal(null);
              setSelectedStage(null);
            }}
            aria-label="Lukk trosopplæringsvisning"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-4 flex-1">
          {/* Vision Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-700" />
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-900">
                Motto: «Hele mennesket, hele menigheten, hele bygda»
              </span>
            </div>
            <p className="text-xs text-gray-700 font-medium leading-relaxed">
              Trosopplæringen i Høvåg bygger på <strong>Korsveis 4 veivisere</strong>: Søke Jesus Kristus, bygge fellesskap, leve enklere og fremme rettferdighet.
            </p>
          </div>

          {/* Age Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedStage(null);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gray-900 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Selected Stage Detail Drawer OR Stages List */}
          {selectedStage ? (
            <div className="bg-white rounded-2xl border-2 border-amber-500/80 p-4 shadow-sm space-y-3.5 animate-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                    {selectedStage.ageRange} · {selectedStage.category}
                  </span>
                  <h3 className="text-base font-extrabold text-gray-900 mt-1">
                    {selectedStage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedStage(null)}
                  className="text-xs font-bold text-gray-500 hover:text-gray-900 px-2 py-1"
                >
                  Tilbake
                </button>
              </div>

              {/* Scope & Details */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{selectedStage.scope}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  <span className="truncate">{selectedStage.responsible}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 text-gray-700 font-semibold pt-1 border-t border-gray-200/60">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{selectedStage.location}</span>
                </div>
              </div>

              {/* Goal */}
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Formål & Mål
                </p>
                <p className="text-xs text-gray-800 font-medium leading-relaxed">
                  {selectedStage.goal}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Sentrale høydepunkter & innhold
                </p>
                <div className="space-y-1">
                  {selectedStage.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert(`Påmelding/info for «${selectedStage.title}» er registrert.`)}
                  className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
                >
                  <span>Meld på barn / Få info om dette tiltaket</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredStages.map((stage) => (
                <div
                  key={stage.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedStage(stage)}
                  className="p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/80 text-[10px] font-black uppercase">
                        {stage.ageRange}
                      </span>
                      <span className="text-[11px] text-gray-500 font-bold truncate">
                        {stage.location}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 truncate group-hover:text-amber-800 transition-colors">
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-gray-600 line-clamp-1 mt-0.5">
                      {stage.goal}
                    </p>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0 group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact Footer */}
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center space-y-1">
            <p className="text-[11px] text-gray-700 font-bold">
              Spørsmål om dåp, tårnagenter eller konfirmasjonstid i Høvåg?
            </p>
            <p className="text-[11px] text-gray-600 font-medium">
              Kontakt trosopplærer Raimond Bruseland eller ungdomsleder Monica Gislefoss på menighetskontoret.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
