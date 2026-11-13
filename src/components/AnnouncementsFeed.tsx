import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { EntityBadge } from './EntityBadge';

export const AnnouncementsFeed: React.FC = () => {
  const { announcements, activeEntityFilter, markAnnouncementRead, setActiveTab, user } = useAppStore();

  const prefs = user.preferences;

  const filteredAnnouncements = announcements.filter((a) => {
    // 1. Top tabs filter
    if (activeEntityFilter !== 'alle' && a.entityTag !== activeEntityFilter) {
      return false;
    }
    // 2. User entity preference when 'alle'
    if (prefs?.followedEntities && activeEntityFilter === 'alle' && !prefs.followedEntities[a.entityTag]) {
      return false;
    }
    return true;
  });

  return (
    <section className="px-5 mt-6 mb-24">
      <div className="flex items-center justify-between mb-3">
        <h2 role="heading" aria-level={2} className="text-[12px] font-bold tracking-widest text-gray-600 uppercase">
          KUNNGJØRINGER
        </h2>
        <button
          onClick={() => setActiveTab('meldinger')}
          className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-0.5 transition-colors cursor-pointer min-h-[44px] px-1"
          aria-label="Se alle kunngjøringer"
          role="button"
        >
          Se alle <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {filteredAnnouncements.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center text-gray-600 text-xs font-medium">
          Ingen kunngjøringer for denne enheten enda.
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              role="button"
              tabIndex={0}
              aria-label={`Kunngjøring: ${ann.title}, fra ${ann.authorName}`}
              onClick={() => markAnnouncementRead(ann.id)}
              className="bg-white p-4.5 min-h-[44px] rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-150 relative cursor-pointer active:scale-[0.99]"
            >
              {/* Unread Orange Dot Badge */}
              {ann.isUnread && (
                <div
                  className="absolute top-4.5 right-4.5 w-2.5 h-2.5 rounded-full bg-orange-600 ring-4 ring-orange-100"
                  aria-label="Ulest kunngjøring"
                />
              )}

              {/* Entity Badge */}
              <div className="mb-2">
                <EntityBadge tag={ann.entityTag} size="sm" />
              </div>

              {/* Title */}
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight pr-6 mb-2 leading-snug">
                {ann.title}
              </h3>

              {/* Description */}
              <p className="text-xs font-normal text-gray-700 leading-relaxed mb-3.5">
                {ann.content}
              </p>

              {/* Divider */}
              <div className="border-t border-gray-100 my-3" />

              {/* Author Row */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-[11px] shadow-sm shrink-0">
                    {ann.authorName.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-800">
                    {ann.authorName}{' '}
                    <span className="text-gray-600 font-medium">· {ann.authorRole}</span>
                  </span>
                </div>

                <span className="text-gray-600 font-semibold text-[11px]">
                  {ann.timeAgo}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
