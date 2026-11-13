import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { EntityTag } from '../types';
import { EntityBadge } from './EntityBadge';
import { Calendar, Users, Check } from 'lucide-react';

export const UpcomingEventsList: React.FC = () => {
  const { events, activeEntityFilter, setSelectedEventModal, user, setRsvp } = useAppStore();
  const [addedCalendarIds, setAddedCalendarIds] = useState<Record<string, boolean>>({});

  const prefs = user.preferences;

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

  const heroEvent = filteredEvents.find((e) => e.isHero) || filteredEvents[0];
  const listEvents = filteredEvents.filter((e) => e.id !== heroEvent?.id).slice(0, 3);

  if (listEvents.length === 0) return null;

  const getDateBadgeStyle = (entityTag: EntityTag) => {
    switch (entityTag) {
      case 'kirke':
        return {
          box: 'bg-sky-100/90 border-sky-300/80',
          dayShort: 'text-sky-800',
          dayNumber: 'text-sky-950',
        };
      case 'bedehus':
        return {
          box: 'bg-emerald-100/90 border-emerald-300/80',
          dayShort: 'text-emerald-800',
          dayNumber: 'text-emerald-950',
        };
      case 'push':
        return {
          box: 'bg-purple-100/90 border-purple-300/80',
          dayShort: 'text-purple-800',
          dayNumber: 'text-purple-950',
        };
      default:
        return {
          box: 'bg-gray-100 border-gray-200/90',
          dayShort: 'text-gray-700',
          dayNumber: 'text-gray-900',
        };
    }
  };

  const toggleCalendar = (e: React.MouseEvent, eventId: string) => {
    e.stopPropagation();
    setAddedCalendarIds((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  return (
    <section className="px-5 mt-4 space-y-2.5">
      <h2 role="heading" aria-level={2} className="text-[12px] font-bold tracking-widest text-gray-600 uppercase mb-2">
        KOMMENDE ARRANGEMENTER
      </h2>
      {listEvents.map((event) => {
        const badgeStyle = getDateBadgeStyle(event.entityTag);
        const isRegistered = user.rsvps[event.id] === 'Ja';
        const isAddedToCalendar = !!addedCalendarIds[event.id];

        return (
          <div
            key={event.id}
            role="button"
            tabIndex={0}
            aria-label={`Vis arrangement ${event.title}, ${event.dayShort} ${event.dayNumber}, ${event.time}`}
            onClick={() => setSelectedEventModal(event)}
            className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-150 flex flex-col gap-2.5 cursor-pointer active:scale-[0.99]"
          >
            {/* Top Horizontal Row: Datopillen + Stedspillen + Meld på (lik 44px høyde, toppjustert) */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 min-w-0">
                {/* Two-line Stacked Date Pill (44x44px) */}
                <div
                  className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center border shrink-0 shadow-2xs ${badgeStyle.box}`}
                >
                  <span className={`text-[9px] font-black uppercase tracking-wider leading-none ${badgeStyle.dayShort}`}>
                    {event.dayShort}
                  </span>
                  <span className={`text-sm font-black tabular-nums leading-none mt-1 ${badgeStyle.dayNumber}`}>
                    {event.dayNumber}
                  </span>
                </div>

                {/* Entity / Place Pill matched to 44px height */}
                <EntityBadge tag={event.entityTag} size="tall" />
              </div>

              {/* Dynamic Primary Action Button matched to 44px height & top-aligned */}
              {event.requiresRSVP ? (
                <button
                  type="button"
                  aria-label={`Meld deg på ${event.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setRsvp(event.id, isRegistered ? null : 'Ja');
                  }}
                  className={`h-11 px-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-all cursor-pointer active:scale-95 ${
                    isRegistered
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                      : 'bg-orange-600 text-white hover:bg-orange-700 shadow-xs'
                  }`}
                >
                  {isRegistered ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Påmeldt</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span>Meld på</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  aria-label={`Legg til ${event.title} i kalender`}
                  onClick={(e) => toggleCalendar(e, event.id)}
                  className={`h-11 px-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-all cursor-pointer active:scale-95 ${
                    isAddedToCalendar
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200'
                  }`}
                >
                  {isAddedToCalendar ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>I kalender</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-3.5 h-3.5 text-gray-700 shrink-0" />
                      <span>Kalender</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Full-width Title & Info Text */}
            <div className="min-w-0">
              <h3 className="text-[13px] font-black text-gray-900 tracking-tight leading-snug">
                {event.title}
              </h3>
              <p className="text-[11px] font-semibold text-gray-600 mt-0.5 leading-snug">
                {event.time} · {event.location}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};


