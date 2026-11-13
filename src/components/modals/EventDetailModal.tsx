import React, { useState } from 'react';
import { X, Clock, MapPin, Users, Calendar, Share2, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { RsvpStatus } from '../../types';
import { EntityBadge } from '../EntityBadge';

export const EventDetailModal: React.FC = () => {
  const { selectedEventModal, setSelectedEventModal, user, setRsvp } = useAppStore();
  const [copied, setCopied] = useState(false);

  if (!selectedEventModal) return null;

  const currentRsvp: RsvpStatus = user.rsvps[selectedEventModal.id] || null;

  const dayNameMap: Record<string, string> = {
    SØN: 'Søndag',
    ONS: 'Onsdag',
    FRE: 'Fredag',
    TIR: 'Tirsdag',
    LØR: 'Lørdag',
    TOR: 'Torsdag',
    MAN: 'Mandag',
  };
  const fullDay = dayNameMap[selectedEventModal.dayShort] || 'Søndag';
  const proximityDateLine = `${fullDay} ${selectedEventModal.dayNumber}. juni · ${selectedEventModal.time}`;

  const handleRsvp = (status: RsvpStatus) => {
    setRsvp(selectedEventModal.id, status === currentRsvp ? null : status);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${selectedEventModal.title} - ${proximityDateLine} i ${selectedEventModal.location}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-title"
        className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col"
      >
        {/* Header Image / Pattern */}
        <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-amber-800 p-5 text-white flex flex-col justify-between min-h-[170px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 flex-wrap">
              <EntityBadge tag={selectedEventModal.entityTag} size="sm" />
              <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider border border-white/20">
                {selectedEventModal.categoryTag}
              </span>
            </div>
            <button
              onClick={() => setSelectedEventModal(null)}
              aria-label="Lukk arrangementvisning"
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-100 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{proximityDateLine}</span>
            </div>
            <h2 id="event-title" role="heading" aria-level={2} className="text-2xl font-black text-white tracking-tight">
              {selectedEventModal.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Key Info Grid */}
          <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3.5 rounded-2xl border border-gray-100 text-center">
            <div className="flex flex-col items-center">
              <Clock className="w-4 h-4 text-orange-600 mb-1" />
              <span className="text-[11px] font-bold text-gray-900">Tid</span>
              <span className="text-xs text-gray-700 font-semibold">{selectedEventModal.time}</span>
            </div>
            <div className="flex flex-col items-center border-x border-gray-200 px-1">
              <MapPin className="w-4 h-4 text-orange-600 mb-1" />
              <span className="text-[11px] font-bold text-gray-900">Sted</span>
              <span className="text-xs text-gray-700 font-semibold truncate max-w-[90px]">
                {selectedEventModal.location}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-4 h-4 text-orange-600 mb-1" />
              <span className="text-[11px] font-bold text-gray-900">Påmeldt</span>
              <span className="text-xs text-gray-700 font-semibold">{selectedEventModal.attendeesCount} pers</span>
            </div>
          </div>

          {/* Speaker / Host */}
          {selectedEventModal.speaker && (
            <div className="text-xs text-gray-700 font-semibold">
              <span className="font-extrabold text-gray-900">Ansvarlig/Leder:</span> {selectedEventModal.speaker}
            </div>
          )}

          {/* Description */}
          <div>
            <h3 role="heading" aria-level={3} className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Om arrangementet
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed font-normal">
              {selectedEventModal.description ||
                'Velkommen til et trivelig og inspirerende arrangement i Høvåg menighet! Ta gjerne med deg en venn eller nabo.'}
            </p>
          </div>

          {/* Dynamic Rule Engine RSVP or Open Entry Banner */}
          {selectedEventModal.requiresRSVP ? (
            <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-100 space-y-2">
              <span className="block text-xs font-extrabold text-orange-950 text-center">
                Meld deg på (RSVP):
              </span>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Svar på arrangement">
                {(['Ja', 'Kanskje', 'Nei'] as const).map((opt) => {
                  const isSelected = currentRsvp === opt;
                  return (
                    <button
                      key={opt}
                      role="button"
                      aria-pressed={isSelected}
                      aria-label={`Svar ${opt} på ${selectedEventModal.title}`}
                      onClick={() => handleRsvp(opt)}
                      className={`py-2.5 min-h-[44px] rounded-xl text-xs font-extrabold flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                        isSelected
                          ? 'bg-orange-600 text-white shadow-md shadow-orange-950/20'
                          : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-sky-50/80 p-3.5 rounded-2xl border border-sky-100 flex items-center gap-2 text-sky-950 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Ingen påmelding kreves. Åpent for alle uten registrering!</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleShare}
              aria-label="Del arrangement informasjon"
              className="flex-1 py-3 px-3 min-h-[44px] rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800 font-extrabold">Kopiert!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-gray-700" />
                  <span>Del</span>
                </>
              )}
            </button>
            {selectedEventModal.canAddToCalendar && (
              <button
                onClick={() => alert(`Lagt til "${selectedEventModal.title}" i din kalender!`)}
                aria-label="Legg til arrangementet i kalenderen"
                className="flex-1 py-3 px-3 min-h-[44px] rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Legg i kalender</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
