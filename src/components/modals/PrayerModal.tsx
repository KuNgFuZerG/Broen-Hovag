import React, { useState } from 'react';
import { X, HandHeart, Heart, Send } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const PrayerModal: React.FC = () => {
  const { activeExploreModal, setActiveExploreModal, prayers, togglePrayFor, addPrayer } = useAppStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showForm, setShowForm] = useState(false);

  if (activeExploreModal !== 'bonn') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addPrayer({ title: title.trim(), content: content.trim(), isAnonymous });
    setTitle('');
    setContent('');
    setShowForm(false);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="prayer-modal-title"
        className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-orange-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <HandHeart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="prayer-modal-title" role="heading" aria-level={2} className="text-xl font-extrabold tracking-tight">Bønnevegg</h2>
              <p className="text-xs text-orange-100 font-semibold">Bær hverandres bører i bønn</p>
            </div>
          </div>
          <button
            onClick={() => setActiveExploreModal(null)}
            aria-label="Lukk bønnevegg"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action button */}
        <div className="p-4 border-b border-gray-100 bg-orange-50/70 flex items-center justify-between gap-2">
          <p className="text-xs text-gray-800 font-semibold">
            Legg gjerne inn et bønneemne eller be for andre
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            aria-label={showForm ? 'Vis bønneliste' : 'Legg til nytt bønneemne'}
            className="px-4 py-2.5 min-h-[44px] rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer active:scale-95 shrink-0 flex items-center justify-center"
          >
            {showForm ? 'Se bønner' : '+ Nytt bønneemne'}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-3.5 bg-gray-50 p-4 rounded-2xl border border-gray-300">
              <h3 role="heading" aria-level={3} className="text-sm font-extrabold text-gray-900">Send inn bønneemne</h3>
              <div>
                <label htmlFor="prayer-title" className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                  Overskrift
                </label>
                <input
                  id="prayer-title"
                  type="text"
                  required
                  placeholder="f.eks. Bønn for helse og krefter"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-3 min-h-[44px] rounded-xl bg-white border border-gray-300 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>

              <div>
                <label htmlFor="prayer-content" className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">
                  Beskrivelse
                </label>
                <textarea
                  id="prayer-content"
                  required
                  rows={3}
                  placeholder="Skriv din bønnebegjæring her..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 min-h-[44px]">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer"
                />
                <label htmlFor="anonymous" className="text-xs font-extrabold text-gray-800 cursor-pointer select-none">
                  Send inn anonymt
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 min-h-[44px] rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Legg ut bønneemne</span>
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              {prayers.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-extrabold text-gray-900 leading-tight">
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-gray-600 font-bold shrink-0">
                      {item.timeAgo}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed font-normal">
                    {item.content}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs flex-wrap gap-2">
                    <span className="text-gray-700 font-bold text-[11px]">
                      Fra: {item.author}
                    </span>

                    <button
                      role="button"
                      aria-pressed={item.hasPrayed}
                      aria-label={`Be for ${item.title}`}
                      onClick={() => togglePrayFor(item.id)}
                      className={`px-3.5 py-2 min-h-[44px] rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                        item.hasPrayed
                          ? 'bg-rose-100 text-rose-900 border border-rose-300'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${item.hasPrayed ? 'fill-rose-600 text-rose-600' : ''}`} />
                      <span>{item.hasPrayed ? 'Jeg ber' : 'Jeg ber for dette'} ({item.prayersCount})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
