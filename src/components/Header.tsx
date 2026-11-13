import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { EntityFilterBar } from './EntityFilterBar';

export const Header: React.FC = () => {
  const { user, announcements, setNotificationsModalOpen, setDrawerOpen } = useAppStore();
  const unreadCount = announcements.filter((a) => a.isUnread).length;

  return (
    <header className="px-5 pt-4 pb-3 bg-white border-b border-gray-100 flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2">
        {/* Hamburger Drawer Menu Button */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Åpne meny og verktøy"
          role="button"
          className="min-h-[44px] min-w-[44px] p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 text-amber-900 transition-all active:scale-95 cursor-pointer flex items-center justify-center shrink-0 shadow-2xs"
        >
          <Menu className="w-5 h-5 stroke-[2.3]" />
        </button>

        {/* Centered Congregation Name & User Greeting */}
        <div className="flex-1 min-w-0 text-center px-1">
          <p className="text-[11px] font-bold tracking-widest text-gray-600 uppercase truncate">
            HØVÅG MENIGHET
          </p>
          <h1 role="heading" aria-level={1} className="text-xl font-black text-gray-900 tracking-tight mt-0.5 truncate">
            {user.greeting}
          </h1>
        </div>

        <button
          onClick={() => setNotificationsModalOpen(true)}
          className="relative min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-all text-gray-700 active:scale-95 cursor-pointer flex items-center justify-center shrink-0"
          aria-label={`Varslinger (${unreadCount} uleste)`}
          role="button"
        >
          <Bell className="w-5 h-5 text-gray-800" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-orange-600 ring-2 ring-white animate-pulse" />
          )}
        </button>
      </div>

      {/* Multi-Entity Segmented Filter Bar */}
      <EntityFilterBar />
    </header>
  );
};

