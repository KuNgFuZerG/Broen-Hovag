import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { EntityBadge } from '../components/EntityBadge';
import { EntityFilterBar } from '../components/EntityFilterBar';
import { EventItem, EntityTag } from '../types';

export const CalendarScreen: React.FC = () => {
  const { events, activeEntityFilter, setSelectedEventModal, user } = useAppStore();
  const [selectedDayNumber, setSelectedDayNumber] = useState<string>('15'); // Default to 15th
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date(2026, 6, 1)); // July 2026

  const prefs = user.preferences;

  // Entity and category filter application
  const entityFilteredEvents = events.filter((e) => {
    // 1. Top bar entity filter
    if (activeEntityFilter !== 'alle' && e.entityTag !== activeEntityFilter) {
      return false;
    }
    // 2. User entity preference when 'alle'
    if (prefs?.followedEntities && activeEntityFilter === 'alle' && !prefs.followedEntities[e.entityTag]) {
      return false;
    }
    // 3. User category preference
    if (prefs?.followedCategories && !prefs.followedCategories[e.categoryTag]) {
      return false;
    }
    return true;
  });

  // Month navigation
  const monthNames = [
    'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
  ];

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  const year = currentMonthDate.getFullYear();
  const monthIndex = currentMonthDate.getMonth();
  const monthLabel = `${monthNames[monthIndex]} ${year}`;

  // Helper to generate days grid for current month
  // For July 2026: 31 days, starts on Wednesday (index 2 for Mon=0, Tue=1, Wed=2, etc.)
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay(); // 0 is Sunday, 1 is Monday...
  const startingOffset = (firstDayOfWeek + 6) % 7; // Convert to Mon=0, Sun=6
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // Map events to day numbers for easy indicator lookup
  const eventsByDayNumber = entityFilteredEvents.reduce<Record<string, EventItem[]>>((acc, event) => {
    const day = event.dayNumber;
    if (!acc[day]) acc[day] = [];
    acc[day].push(event);
    return acc;
  }, {});

  // Agenda events filtered by selected day
  const agendaEvents = selectedDayNumber
    ? entityFilteredEvents.filter((e) => e.dayNumber === selectedDayNumber)
    : entityFilteredEvents;

  return (
    <div className="bg-[#f4f5f8] min-h-full pb-28 pt-4 px-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-widest text-gray-600 uppercase">
            HØVÅG MENIGHET
          </p>
          <h1 role="heading" aria-level={1} className="text-2xl font-black text-gray-900 tracking-tight">
            Kalender & Tjenester
          </h1>
        </div>
        <div className="p-2.5 rounded-2xl bg-orange-100 text-orange-700">
          <CalendarIcon className="w-5 h-5" />
        </div>
      </div>

      {/* Multi-Entity Filter Bar */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200/80 shadow-2xs">
        <EntityFilterBar />
      </div>

      {/* Monthly Calendar Grid Card */}
      <div className="bg-white rounded-3xl p-4 border border-gray-200/80 shadow-sm space-y-3">
        {/* Month Navigation */}
        <div className="flex items-center justify-between px-1">
          <button
            onClick={handlePrevMonth}
            aria-label="Forrige måned"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-base font-black text-gray-900 tracking-tight">
            {monthLabel}
          </span>
          <button
            onClick={handleNextMonth}
            aria-label="Neste måned"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].map((d) => (
            <div key={d} className="text-[11px] font-extrabold text-gray-700 py-1 uppercase">
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for offset */}
          {Array.from({ length: startingOffset }).map((_, i) => (
            <div key={`offset-${i}`} className="h-10 min-h-[44px]" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = String(i + 1);
            const isSelected = selectedDayNumber === dayNum;
            const dayEvents = eventsByDayNumber[dayNum] || [];
            const hasEvents = dayEvents.length > 0;

            return (
              <button
                key={`day-${dayNum}`}
                role="button"
                aria-label={`Dato ${dayNum}. juli ${hasEvents ? `- ${dayEvents.length} arrangementer` : ''}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedDayNumber(isSelected ? '' : dayNum)}
                className={`h-11 min-h-[44px] rounded-xl flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-600 text-white font-black shadow-md shadow-orange-950/20 scale-105 z-10'
                    : hasEvents
                    ? 'bg-orange-50 text-orange-950 font-bold hover:bg-orange-100 border border-orange-200/60'
                    : 'text-gray-800 hover:bg-gray-100 font-semibold'
                }`}
              >
                <span className="text-xs leading-none">{dayNum}</span>

                {/* Event indicator dots */}
                {hasEvents && (
                  <div className="flex items-center gap-0.5 mt-1">
                    {dayEvents.slice(0, 3).map((evt, idx) => {
                      let dotColor = 'bg-orange-600';
                      if (evt.entityTag === 'bedehus') dotColor = 'bg-amber-700';
                      if (evt.entityTag === 'push') dotColor = 'bg-purple-600';
                      if (isSelected) dotColor = 'bg-white';
                      return (
                        <span
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
                        />
                      );
                    })}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Agenda Card List Header */}
      <div className="flex items-center justify-between pt-1">
        <h2 role="heading" aria-level={2} className="text-sm font-extrabold text-gray-900 tracking-tight">
          {selectedDayNumber
            ? `Arrangementer for ${selectedDayNumber}. ${monthNames[monthIndex].toLowerCase()}`
            : 'Alle kommende arrangementer'}
        </h2>
        {selectedDayNumber && (
          <button
            onClick={() => setSelectedDayNumber('')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 px-2 py-1 min-h-[44px] flex items-center cursor-pointer"
          >
            Vis alle
          </button>
        )}
      </div>

      {/* Agenda Card List */}
      <div className="space-y-3.5">
        {agendaEvents.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center text-gray-700 text-xs font-semibold space-y-1">
            <p className="font-bold text-gray-900">Ingen arrangementer funnet for denne datoen.</p>
            <p className="text-gray-600">Trykk på en annen dato med indikatorprikk eller "Vis alle".</p>
          </div>
        ) : (
          agendaEvents.map((event) => {
            const userRsvp = user.rsvps[event.id];

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
            const badgeStyle = getDateBadgeStyle(event.entityTag);

            return (
              <div
                key={event.id}
                role="button"
                tabIndex={0}
                aria-label={`Vis detaljer for ${event.title}, ${event.dayShort} ${event.dayNumber}`}
                onClick={() => setSelectedEventModal(event)}
                className="bg-white p-4.5 min-h-[44px] rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99] space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 border mt-0.5 shadow-2xs ${badgeStyle.box}`}>
                      <span className={`text-[10px] font-black uppercase ${badgeStyle.dayShort}`}>
                        {event.dayShort}
                      </span>
                      <span className={`text-base font-black leading-none mt-0.5 ${badgeStyle.dayNumber}`}>
                        {event.dayNumber}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        <EntityBadge tag={event.entityTag} size="sm" />
                        <span className="px-2.5 py-0.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200 text-[10px] font-extrabold uppercase tracking-wider">
                          {event.categoryTag}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-gray-900 tracking-tight leading-snug">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {event.requiresRSVP ? (
                    userRsvp ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-950 text-[10px] font-extrabold shrink-0 border border-emerald-300">
                        Påmeldt ({userRsvp})
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-orange-600 text-white text-[10px] font-extrabold shrink-0 shadow-xs">
                        Meld deg på
                      </span>
                    )
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-900 border border-gray-200 text-[10px] font-extrabold shrink-0">
                      Legg i kalender
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-800 font-semibold pt-1 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Users className="w-3.5 h-3.5 text-orange-600" />
                    <span>{event.attendeesCount} pers</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

