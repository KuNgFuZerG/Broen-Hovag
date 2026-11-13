import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, UserCheck, AlertCircle, ArrowLeftRight, Sparkles, Filter, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { EntityBadge } from '../EntityBadge';
import { EntityFilter } from '../../types';

export const ServiceRotaModal: React.FC = () => {
  const {
    activeExploreModal,
    setActiveExploreModal,
    serviceRotas,
    claimShift,
    takeOverSwapShift,
    requestSwapShift,
    releaseShift,
    user
  } = useAppStore();

  const [selectedEntity, setSelectedEntity] = useState<EntityFilter>('alle');
  const [filterMode, setFilterMode] = useState<'all' | 'swap' | 'vacant' | 'mine'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});

  if (activeExploreModal !== 'tjenester') return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleDescription = (shiftId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [shiftId]: !prev[shiftId]
    }));
  };

  const handleClaim = (rotaId: string, shiftId: string, roleName: string) => {
    claimShift(rotaId, shiftId);
    showToast(`Flott! Du har tatt vakten som ${roleName}.`);
  };

  const handleTakeOver = (rotaId: string, shiftId: string, roleName: string, fromName: string) => {
    takeOverSwapShift(rotaId, shiftId);
    showToast(`Tusen takk! Du har overtatt vakten som ${roleName} for ${fromName}.`);
  };

  const handleSwap = (rotaId: string, shiftId: string, currentSwapStatus?: boolean) => {
    requestSwapShift(rotaId, shiftId);
    if (!currentSwapStatus) {
      showToast('Vakten er lagt ut i "Søker avløser"-poolen for alle frivillige!');
    } else {
      showToast('Bytteforespørsel er avbrutt.');
    }
  };

  const handleRelease = (rotaId: string, shiftId: string, roleName: string) => {
    releaseShift(rotaId, shiftId);
    showToast(`Vakten som ${roleName} er frigitt.`);
  };

  // Filter rotas
  const filteredRotas = serviceRotas.filter((rota) => {
    if (selectedEntity !== 'alle' && rota.entityTag !== selectedEntity) {
      return false;
    }
    if (filterMode === 'swap') {
      return rota.shifts.some((s) => s.swapRequested);
    }
    if (filterMode === 'vacant') {
      return rota.shifts.some((s) => !s.assignedToName);
    }
    if (filterMode === 'mine') {
      return rota.shifts.some((s) => s.isCurrentUser);
    }
    return true;
  });

  // Calculate statistics
  const totalSwapCount = serviceRotas.reduce(
    (acc, r) => acc + r.shifts.filter((s) => s.swapRequested).length,
    0
  );
  const totalVacantCount = serviceRotas.reduce(
    (acc, r) => acc + r.shifts.filter((s) => !s.assignedToName).length,
    0
  );
  const myShiftsCount = serviceRotas.reduce(
    (acc, r) => acc + r.shifts.filter((s) => s.isCurrentUser).length,
    0
  );

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rota-modal-title"
        className="bg-[#f8fafc] w-full max-w-lg rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl border border-gray-200/80 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 id="rota-modal-title" className="text-lg font-black text-gray-900 tracking-tight">
                Tjenestelister & Vakter
              </h2>
              <p className="text-xs text-gray-700 font-semibold">Frivillige oppgaver og vaktbytte i Høvåg</p>
            </div>
          </div>
          <button
            onClick={() => setActiveExploreModal(null)}
            aria-label="Lukk tjenestelister"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-way Entity Filter Bar */}
        <div className="p-4 bg-white border-b border-gray-200 space-y-3 shrink-0">
          <div className="grid grid-cols-4 gap-2" role="group" aria-label="Enhetsfilter for vaktlister">
            {[
              { id: 'alle' as const, label: 'Alle', activeBg: 'bg-orange-600 text-white' },
              { id: 'kirke' as const, label: 'Kirke', activeBg: 'bg-sky-600 text-white' },
              { id: 'bedehus' as const, label: 'Bedehus', activeBg: 'bg-emerald-600 text-white' },
              { id: 'push' as const, label: 'PUSH', activeBg: 'bg-purple-600 text-white' }
            ].map((tab) => {
              const isActive = selectedEntity === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedEntity(tab.id)}
                  aria-pressed={isActive}
                  className={`py-2 px-1 min-h-[44px] rounded-xl text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                    isActive
                      ? `${tab.activeBg} shadow-sm scale-[1.02]`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200/80'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              Alle oppgaver
            </button>
            <button
              onClick={() => setFilterMode('swap')}
              className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                filterMode === 'swap'
                  ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-amber-600" />
              Søker avløser ({totalSwapCount})
            </button>
            <button
              onClick={() => setFilterMode('vacant')}
              className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                filterMode === 'vacant'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              Ledige vakter ({totalVacantCount})
            </button>
            <button
              onClick={() => setFilterMode('mine')}
              className={`px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                filterMode === 'mine'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Mine vakter ({myShiftsCount})
            </button>
          </div>
        </div>

        {/* Toast feedback */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="p-1 hover:bg-emerald-700 rounded text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Rotas List */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {filteredRotas.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 space-y-2">
              <Sparkles className="w-8 h-8 text-gray-400 mx-auto" />
              <h3 className="text-sm font-bold text-gray-800">Ingen vaktlister funnet</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                {filterMode === 'swap'
                  ? 'Ingen vakter søker avløser akkurat nå. Alt er i rute!'
                  : filterMode === 'vacant'
                  ? 'Ingen ledige vakter for dette filteret. Alle oppgaver er besatt!'
                  : filterMode === 'mine'
                  ? 'Du er foreløpig ikke satt opp på noen vakter her. Trykk på en ledig vakt for å bidra!'
                  : 'Det er ingen planlagte tjenester under dette valget.'}
              </p>
            </div>
          ) : (
            filteredRotas.map((rota) => {
              // Entity specific styling for DateBadge
              const dateStyles =
                rota.entityTag === 'kirke'
                  ? { bg: 'bg-sky-100/90 border-sky-300', dayText: 'text-sky-800', numText: 'text-sky-950' }
                  : rota.entityTag === 'bedehus'
                  ? { bg: 'bg-emerald-100/90 border-emerald-300', dayText: 'text-emerald-800', numText: 'text-emerald-950' }
                  : { bg: 'bg-purple-100/90 border-purple-300', dayText: 'text-purple-800', numText: 'text-purple-950' };

              return (
                <div
                  key={rota.id}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden"
                >
                  {/* Event Rota Header */}
                  <div className="p-3.5 border-b border-gray-100 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Standard Clean Date Badge */}
                      <div
                        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center border shrink-0 ${dateStyles.bg}`}
                      >
                        <span className={`text-[10px] font-black uppercase leading-tight ${dateStyles.dayText}`}>
                          {rota.dayShort}
                        </span>
                        <span className={`text-base font-black leading-none ${dateStyles.numText}`}>
                          {rota.dayNumber}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <EntityBadge entity={rota.entityTag} size="sm" />
                          <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            {rota.time}
                          </span>
                        </div>
                        <h3 className="text-sm font-extrabold text-gray-900">
                          {rota.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5 font-medium">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {rota.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Shifts List in Event */}
                  <div className="p-3 bg-gray-50/50 divide-y divide-gray-100 space-y-2.5">
                    {rota.shifts.map((shift) => {
                      const isVacant = !shift.assignedToName;
                      const isMine = shift.isCurrentUser;
                      const isDescExpanded = !!expandedDescriptions[shift.id];

                      return (
                        <div
                          key={shift.id}
                          className={`pt-2.5 first:pt-0 rounded-xl p-2 transition-colors ${
                            shift.swapRequested && !isMine
                              ? 'bg-amber-50/70 border border-amber-200'
                              : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-black text-gray-900 truncate">
                                  {shift.roleName}
                                </span>
                                {shift.swapRequested && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-200 text-amber-950 border border-amber-400 flex items-center gap-1 animate-pulse">
                                    <ArrowLeftRight className="w-2.5 h-2.5" />
                                    Søker avløser
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5 mt-0.5">
                                {isVacant ? (
                                  <span className="text-[11px] font-extrabold text-rose-700 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3 text-rose-600" />
                                    Ledig vakt – mangler frivillig
                                  </span>
                                ) : (
                                  <span className="text-[11px] font-semibold text-gray-600 flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full bg-gray-200 text-gray-800 text-[9px] font-bold flex items-center justify-center">
                                      {shift.assignedToAvatar || shift.assignedToName?.charAt(0)}
                                    </span>
                                    <span className={isMine ? 'font-bold text-sky-800' : ''}>
                                      {shift.assignedToName} {isMine && '(Deg)'}
                                    </span>
                                  </span>
                                )}
                              </div>

                              {/* 1-line Role Guidance Briefing */}
                              {shift.roleDescription && (
                                <p className="text-[11px] text-gray-500 font-medium leading-tight mt-1 flex items-start gap-1">
                                  <Info className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" />
                                  <span>{shift.roleDescription}</span>
                                </p>
                              )}
                            </div>

                            {/* Action Button */}
                            <div className="shrink-0 pt-0.5">
                              {isVacant ? (
                                <button
                                  onClick={() => handleClaim(rota.id, shift.id, shift.roleName)}
                                  className={`px-3 py-1.5 min-h-[40px] rounded-xl text-xs font-black text-white transition-transform active:scale-95 cursor-pointer flex items-center gap-1 shadow-sm ${
                                    rota.entityTag === 'kirke'
                                      ? 'bg-sky-600 hover:bg-sky-700'
                                      : rota.entityTag === 'bedehus'
                                      ? 'bg-emerald-600 hover:bg-emerald-700'
                                      : 'bg-purple-600 hover:bg-purple-700'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Ta vakten
                                </button>
                              ) : isMine ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleSwap(rota.id, shift.id, shift.swapRequested)}
                                    className={`px-2.5 py-1.5 min-h-[38px] rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                                      shift.swapRequested
                                        ? 'bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200'
                                        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                                    }`}
                                  >
                                    <ArrowLeftRight className="w-3.5 h-3.5 text-amber-700" />
                                    {shift.swapRequested ? 'Avbryt bytte' : 'Be om bytte'}
                                  </button>
                                  <button
                                    onClick={() => handleRelease(rota.id, shift.id, shift.roleName)}
                                    title="Frigi vakt"
                                    className="p-1.5 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:text-rose-600 hover:bg-rose-50 border border-gray-200 transition-colors cursor-pointer"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : shift.swapRequested ? (
                                <button
                                  onClick={() => handleTakeOver(rota.id, shift.id, shift.roleName, shift.assignedToName || 'medfrivillig')}
                                  className="px-3 py-1.5 min-h-[40px] rounded-xl text-xs font-black bg-amber-600 hover:bg-amber-700 text-white shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer ring-2 ring-amber-300"
                                >
                                  <ArrowLeftRight className="w-3.5 h-3.5" />
                                  Overtak vakt
                                </button>
                              ) : (
                                <span className="text-[11px] font-bold text-gray-400 px-2 py-1 bg-gray-100 rounded-lg">
                                  Besatt
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-white border-t border-gray-200 text-center text-xs text-gray-500 font-medium">
          Takk for at du bidrar som frivillig i Høvåg menighet!
        </div>
      </div>
    </div>
  );
};

