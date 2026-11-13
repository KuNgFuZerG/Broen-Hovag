import React, { useState } from 'react';
import { X, Mic, Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const PodcastModal: React.FC = () => {
  const { activeExploreModal, setActiveExploreModal, podcasts } = useAppStore();
  const [activePodcastId, setActivePodcastId] = useState(podcasts[0]?.id || '');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  if (activeExploreModal !== 'podkast') return null;

  const activePodcast = podcasts.find((p) => p.id === activePodcastId) || podcasts[0];

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="podcast-modal-title"
        className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-purple-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="podcast-modal-title" role="heading" aria-level={2} className="text-xl font-extrabold tracking-tight">Høvåg Podkast</h2>
              <p className="text-xs text-purple-100 font-semibold">Prekener og samtaler om tro</p>
            </div>
          </div>
          <button
            onClick={() => setActiveExploreModal(null)}
            aria-label="Lukk podkast"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Card */}
        {activePodcast && (
          <div className="p-5 bg-purple-50/80 border-b border-purple-200">
            <div className="text-center space-y-1 mb-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-900">
                {activePodcast.date}
              </span>
              <h3 role="heading" aria-level={3} className="text-lg font-black text-gray-900 tracking-tight">
                {activePodcast.title}
              </h3>
              <p className="text-xs font-bold text-purple-900">
                Taler: {activePodcast.speaker}
              </p>
            </div>

            {/* Audio waveform / progress bar slider */}
            <div className="space-y-1.5 mb-4">
              <input
                type="range"
                min="0"
                max="100"
                aria-label="Fremdrift for lydavspilling"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full accent-purple-700 cursor-pointer h-2 bg-purple-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-700 font-bold">
                <span>08:15</span>
                <span>{activePodcast.duration}</span>
              </div>
            </div>

            {/* Play controls */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                aria-label="Spol 10 sekunder tilbake"
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-purple-900 hover:text-purple-950 transition-colors cursor-pointer"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Paus lyd' : 'Spill av lyd'}
                className="w-12 h-12 min-h-[44px] min-w-[44px] rounded-full bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center shadow-lg shadow-purple-950/20 transition-transform active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
              </button>

              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                aria-label="Spol 10 sekunder frem"
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-purple-900 hover:text-purple-950 transition-colors cursor-pointer"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Episode List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <h3 role="heading" aria-level={3} className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Siste episoder
          </h3>

          {podcasts.map((pod) => (
            <div
              key={pod.id}
              role="button"
              tabIndex={0}
              aria-label={`Spill episode: ${pod.title}`}
              onClick={() => {
                setActivePodcastId(pod.id);
                setIsPlaying(true);
              }}
              className={`p-3.5 min-h-[44px] rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                pod.id === activePodcastId
                  ? 'bg-purple-50/90 border-purple-300 shadow-sm'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold text-gray-900">{pod.title}</h4>
                <p className="text-[11px] text-gray-700 font-semibold">
                  {pod.speaker} · {pod.duration}
                </p>
              </div>

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  pod.id === activePodcastId ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {pod.id === activePodcastId && isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
