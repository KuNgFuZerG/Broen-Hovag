import React from 'react';
import { X, Bell, Check, CheckCheck } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const NotificationsModal: React.FC = () => {
  const {
    isNotificationsModalOpen,
    setNotificationsModalOpen,
    announcements,
    markAnnouncementRead,
    markAllAnnouncementsRead
  } = useAppStore();

  if (!isNotificationsModalOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifications-title"
        className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-100 text-orange-700">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 id="notifications-title" role="heading" aria-level={2} className="text-lg font-black text-gray-900 tracking-tight">Varslinger</h2>
              <p className="text-xs text-gray-600 font-semibold">Siste oppdateringer fra Høvåg</p>
            </div>
          </div>

          <button
            onClick={() => setNotificationsModalOpen(false)}
            aria-label="Lukk varslinger"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick action bar */}
        <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs">
          <span className="font-bold text-gray-700">
            {announcements.filter((a) => a.isUnread).length} uleste
          </span>
          <button
            onClick={markAllAnnouncementsRead}
            className="text-orange-600 font-extrabold hover:text-orange-700 flex items-center gap-1.5 transition-colors cursor-pointer min-h-[44px] px-2"
            aria-label="Marker alle varslinger som lest"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Marker alle som lest</span>
          </button>
        </div>

        {/* Notifications list */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {announcements.length === 0 ? (
            <p className="text-xs text-gray-600 font-medium text-center py-8">Ingen varslinger</p>
          ) : (
            announcements.map((ann) => (
              <div
                key={ann.id}
                role="button"
                tabIndex={0}
                aria-label={`Varsel: ${ann.title}, ${ann.isUnread ? 'Ulest' : 'Lest'}`}
                onClick={() => markAnnouncementRead(ann.id)}
                className={`p-3.5 min-h-[44px] rounded-2xl border transition-all cursor-pointer ${
                  ann.isUnread
                    ? 'bg-orange-50/90 border-orange-300'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-extrabold text-gray-900 leading-snug">{ann.title}</h3>
                  <span className="text-[10px] text-gray-600 font-bold shrink-0">{ann.timeAgo}</span>
                </div>
                <p className="text-[11px] text-gray-700 mt-1 leading-relaxed">{ann.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
