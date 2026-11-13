import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { EntityTag } from '../../types';

export const NewAnnouncementModal: React.FC = () => {
  const { isNewAnnouncementModalOpen, setNewAnnouncementModalOpen, addAnnouncement, activeEntityFilter, user, canPublishAnnouncement } = useAppStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [entityTag, setEntityTag] = useState<EntityTag>(
    activeEntityFilter === 'alle' ? 'kirke' : activeEntityFilter
  );
  const [authorRole, setAuthorRole] = useState(user.roleTitle || user.role || 'Leder');

  if (!isNewAnnouncementModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (!canPublishAnnouncement(entityTag)) {
      alert('Du må ha rollen LEADER eller ADMIN for å publisere kunngjøringer.');
      return;
    }

    addAnnouncement({
      title: title.trim(),
      entityTag,
      content: content.trim(),
      authorName: user.name,
      authorRole
    });

    setTitle('');
    setContent('');
    setNewAnnouncementModalOpen(false);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-announcement-title"
        className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] p-6 shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h2 id="new-announcement-title" role="heading" aria-level={2} className="text-xl font-extrabold text-gray-900 tracking-tight">
              Ny kunngjøring
            </h2>
            <p className="text-xs font-medium text-gray-600 mt-0.5">
              Publiser en kunngjøring til menigheten
            </p>
          </div>
          <button
            type="button"
            onClick={() => setNewAnnouncementModalOpen(false)}
            aria-label="Lukk kunngjøringsdialog"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 overflow-y-auto pr-1">
          <div>
            <label htmlFor="announcement-title" className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
              Tittel
            </label>
            <input
              id="announcement-title"
              type="text"
              required
              placeholder="f.eks. Gudstjeneste neste søndag – kom og del!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-3 min-h-[44px] rounded-xl bg-gray-50 border border-gray-300 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label htmlFor="announcement-content" className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
              Innhold
            </label>
            <textarea
              id="announcement-content"
              required
              rows={4}
              placeholder="Skriv din melding til Høvåg menighet her..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-300 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white transition-all resize-none"
            />
          </div>

          <div>
            <label htmlFor="announcement-entity" className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
              Enhet / Kilde
            </label>
            <select
              id="announcement-entity"
              value={entityTag}
              onChange={(e) => setEntityTag(e.target.value as EntityTag)}
              className="w-full px-3.5 py-3 min-h-[44px] rounded-xl bg-gray-50 border border-gray-300 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white transition-all"
            >
              <option value="kirke">Høvåg kirke</option>
              <option value="bedehus">Høvåg bedehus</option>
              <option value="push">PUSH Ungdom</option>
            </select>
          </div>

          <div>
            <label htmlFor="announcement-role" className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
              Rolle / Tittel
            </label>
            <select
              id="announcement-role"
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              className="w-full px-3.5 py-3 min-h-[44px] rounded-xl bg-gray-50 border border-gray-300 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white transition-all"
            >
              <option value="Prest">Prest</option>
              <option value="Leder">Menighetsleder</option>
              <option value="Ungdomsleder">Ungdomsleder</option>
              <option value="Diakon">Diakon</option>
              <option value="Frivillig">Frivillig</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setNewAnnouncementModalOpen(false)}
              className="px-4.5 py-3 min-h-[44px] rounded-xl text-xs font-extrabold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="px-5 py-3 min-h-[44px] rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-md shadow-orange-950/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publiser</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
