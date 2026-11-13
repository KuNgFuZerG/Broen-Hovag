import React from 'react';
import { Plus } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const FAB: React.FC = () => {
  const { activeTab, activeEntityFilter, canPublishAnnouncement, setNewAnnouncementModalOpen } = useAppStore();

  // 1. Only show on 'hjem' tab
  if (activeTab !== 'hjem') {
    return null;
  }

  // 2. Role-based check: Users without LEADER or ADMIN role shall NOT see the announcement FAB
  const currentEntity = activeEntityFilter === 'alle' ? undefined : activeEntityFilter;
  const canPublish = canPublishAnnouncement(currentEntity);

  if (!canPublish) {
    return null;
  }

  return (
    <div className="absolute bottom-20 right-5 z-40">
      <button
        role="button"
        aria-label="Opprett ny kunngjøring"
        onClick={() => setNewAnnouncementModalOpen(true)}
        className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-extrabold text-xs px-4.5 py-3 min-h-[44px] min-w-[44px] rounded-full shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20 cursor-pointer"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>Ny kunngjøring</span>
      </button>
    </div>
  );
};


