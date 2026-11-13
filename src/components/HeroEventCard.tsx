import React from 'react';
import { Calendar, MapPin, Users, ChevronRight, Check, UserCheck } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { EntityBadge } from './EntityBadge';

export const HeroEventCard: React.FC = () => {
  const { events, serviceRotas, activeEntityFilter, setSelectedEventModal, setActiveTab, user } = useAppStore();

  const prefs = user.preferences;

  // Filter events according to active top tabs & user preferences
  const filteredEvents = events.filter((e) => {
    // 1. Entity filter from top tabs
    if (activeEntityFilter !== 'alle' && e.entityTag !== activeEntityFilter) {
      return false;
    }
    // 2. User entity preferences (if in 'alle' view)
    if (prefs?.followedEntities && activeEntityFilter === 'alle' && !prefs.followedEntities[e.entityTag]) {
      return false;
    }
    // 3. User category preferences
    if (prefs?.followedCategories && !prefs.followedCategories[e.categoryTag]) {
      return false;
    }
    return true;
  });

  // 1. Priority A: User has RSVP "Ja" to an upcoming event in this view
  const myRsvpEvent = filteredEvents.find((e) => user.rsvps[e.id] === 'Ja');

  // 2. Priority B: User has a volunteer shift on an upcoming event
  const myShiftEvent = filteredEvents.find((e) => {
    const rota = serviceRotas.find((r) => r.dayNumber === e.dayNumber && r.entityTag === e.entityTag);
    return rota?.shifts.some((s) => s.isCurrentUser);
  });

  // 3. Priority C: Pre-defined / Featured by church colleagues/staff (isFeaturedByChurch or isHero)
  const featuredByChurchEvent = filteredEvents.find((e) => e.isFeaturedByChurch || e.isHero);

  // Determine final chosen hero event
  const heroEvent = myRsvpEvent || myShiftEvent || featuredByChurchEvent || filteredEvents[0];

  if (!heroEvent) {
    return (
      <section className="px-5 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 role="heading" aria-level={2} className="text-[12px] font-bold tracking-widest text-gray-600 uppercase">
            NESTE ARRANGEMENT
          </h2>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-gray-200 text-center text-gray-600 text-xs font-medium">
          Ingen kommende arrangementer registrert for denne enheten.
        </div>
      </section>
    );
  }

  // Find the exact shift role for current user if applicable
  const matchingRota = serviceRotas.find((r) => r.dayNumber === heroEvent.dayNumber && r.entityTag === heroEvent.entityTag);
  const userShift = matchingRota?.shifts.find((s) => s.isCurrentUser);

  // Convert dayShort to full Norwegian day name
  const dayNameMap: Record<string, string> = {
    SØN: 'Søndag',
    ONS: 'Onsdag',
    FRE: 'Fredag',
    TIR: 'Tirsdag',
    LØR: 'Lørdag',
    TOR: 'Torsdag',
    MAN: 'Mandag',
  };
  const fullDay = dayNameMap[heroEvent.dayShort] || 'Søndag';
  const proximityDateLine = `${fullDay} ${heroEvent.dayNumber}. juni · ${heroEvent.time}`;

  const isUserGoing = user.rsvps[heroEvent.id] === 'Ja';
  const isUserOnShift = Boolean(userShift);
  const isUserNextEvent = isUserGoing || isUserOnShift;

  return (
    <section className="px-5 mt-4">
      {/* Clean section header without distracting labels */}
      <div className="flex items-center justify-between mb-2.5">
        <h2 role="heading" aria-level={2} className="text-[12px] font-black tracking-widest text-gray-700 uppercase">
          {isUserNextEvent ? 'DITT NESTE ARRANGEMENT' : 'NESTE ARRANGEMENT'}
        </h2>
        <button
          onClick={() => setActiveTab('kalender')}
          className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-0.5 transition-colors cursor-pointer min-h-[44px] px-1"
          aria-label="Se alle arrangementer i kalenderen"
          role="button"
        >
          Se alle <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Featured Hero Card */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Vis detaljer for arrangementet ${heroEvent.title}`}
        onClick={() => setSelectedEventModal(heroEvent)}
        className="relative bg-gradient-to-br from-[#c85002] via-[#b84300] to-[#963400] text-white p-5 rounded-[24px] shadow-lg shadow-orange-950/15 overflow-hidden cursor-pointer group transform transition-all duration-200 active:scale-[0.99] border border-orange-700/50"
      >
        {/* Subtle Decorative Backdrop Circles */}
        <div className="absolute -right-8 -bottom-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-12 -top-12 w-32 h-32 rounded-full bg-orange-300/20 blur-lg pointer-events-none" />

        <div className="flex items-start gap-4 relative z-10">
          {/* Neutral Light-Gray Date Badge */}
          <div className="bg-white text-gray-950 flex flex-col items-center justify-center w-14 h-14 rounded-2xl border border-gray-200 shrink-0 shadow-sm">
            <span className="text-[10px] font-black tracking-wider uppercase text-gray-600">
              {heroEvent.dayShort}
            </span>
            <span className="text-xl font-black leading-none mt-0.5 text-gray-950">
              {heroEvent.dayNumber}
            </span>
          </div>

          {/* Event Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <EntityBadge tag={heroEvent.entityTag} size="sm" />
              <span className="px-2 py-0.5 rounded-md bg-white/20 text-white border border-white/30 text-[10px] font-extrabold uppercase tracking-wider">
                {heroEvent.categoryTag}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2 leading-snug">
              {heroEvent.title}
            </h3>

            {/* Proximity Line for Date and Time */}
            <div className="space-y-1.5 text-xs font-bold text-orange-100">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span className="tracking-tight">{proximityDateLine}</span>
              </div>

              <div className="flex items-center gap-3 text-white/90 font-medium pt-0.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-white/90 shrink-0" />
                  <span>{heroEvent.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-white/90 shrink-0" />
                  <span>{heroEvent.attendeesCount} kommer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar - shown only when user is registered or has a volunteer shift */}
        {(isUserOnShift || isUserGoing) && (
          <>
            <div className="border-t border-white/20 my-3.5 relative z-10" />

            <div className="relative z-10">
              {isUserOnShift ? (
                /* User has a specific shift/role on this event */
                <div className="w-full py-2.5 px-3.5 rounded-xl bg-black/25 backdrop-blur-sm border border-white/20 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
                    </div>
                    <div className="text-xs font-extrabold text-white truncate">
                      Din oppgave: <span className="text-emerald-300 font-black">{userShift?.roleName || 'Tjenestevakt'}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-orange-200 group-hover:text-white flex items-center gap-0.5 shrink-0">
                    <span>Detaljer</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ) : (
                /* User is registered / attending */
                <div className="w-full py-2.5 px-3.5 rounded-xl bg-black/25 backdrop-blur-sm border border-white/20 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      Påmeldt · I din kalender
                    </span>
                  </div>
                  <span className="text-xs font-bold text-orange-200 group-hover:text-white flex items-center gap-0.5 shrink-0">
                    <span>Detaljer</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

