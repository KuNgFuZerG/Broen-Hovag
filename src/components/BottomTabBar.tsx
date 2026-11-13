import React from 'react';
import { Home, Calendar, Users, MessageSquare, User } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { TabType } from '../types';

export const BottomTabBar: React.FC = () => {
  const { activeTab, setActiveTab, announcements } = useAppStore();
  const unreadCount = announcements.filter((a) => a.isUnread).length;

  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'hjem', label: 'Hjem', icon: Home },
    { id: 'kalender', label: 'Kalender', icon: Calendar },
    { id: 'grupper', label: 'Grupper', icon: Users },
    { id: 'meldinger', label: 'Meldinger', icon: MessageSquare },
    { id: 'profil', label: 'Profil', icon: User }
  ];

  return (
    <nav
      role="tablist"
      aria-label="Hovednavigasjon"
      className="absolute bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-1 flex items-center justify-around shadow-lg shadow-gray-200/50"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-label={`${tab.label} fane${tab.id === 'meldinger' && unreadCount > 0 ? `, ${unreadCount} uleste kunngjøringer` : ''}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 min-h-[44px] min-w-[44px] rounded-2xl transition-all duration-150 cursor-pointer active:scale-95 ${
              isActive ? 'text-orange-600 font-extrabold' : 'text-gray-600 hover:text-gray-900 font-semibold'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
              {tab.id === 'meldinger' && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-orange-600 rounded-full ring-2 ring-white" />
              )}
            </div>
            <span
              className={`text-[10px] tracking-tight ${
                isActive ? 'font-black text-orange-600' : 'font-bold text-gray-700'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
