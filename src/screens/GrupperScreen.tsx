import React, { useState } from 'react';
import { Users, Clock, Check, Plus, Search, ChevronRight, ShieldAlert } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { EntityBadge } from '../components/EntityBadge';
import { EntityFilterBar } from '../components/EntityFilterBar';

export const GrupperScreen: React.FC = () => {
  const { groups, activeEntityFilter, toggleGroupJoin, canCreateGroup } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  const isAllowedToCreate = canCreateGroup();

  const entityFiltered =
    activeEntityFilter === 'alle'
      ? groups
      : groups.filter((g) => g.entityTag === activeEntityFilter);

  const filteredGroups = entityFiltered.filter(
    (g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const joinedGroups = filteredGroups.filter((g) => g.isJoined);
  const availableGroups = filteredGroups.filter((g) => !g.isJoined);

  const handleCreateGroup = () => {
    if (!isAllowedToCreate) {
      alert('Kun brukere med LEADER eller ADMIN rolle har mandat til å opprette offisielle grupper.');
      return;
    }
    alert('Opprett ny gruppe: Skjema åpnes for registrering av gruppe i Høvåg menighet.');
  };

  return (
    <div className="bg-[#f4f5f8] min-h-full pb-28 pt-4 px-5 space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-widest text-gray-600 uppercase">
            HØVÅG MENIGHET
          </p>
          <h1 role="heading" aria-level={1} className="text-2xl font-black text-gray-900 tracking-tight">
            Grupper & Fellesskap
          </h1>
        </div>

        {/* + Ny gruppe Button: ONLY VISIBLE for authorized roles (LEADER or ADMIN) */}
        {isAllowedToCreate && (
          <button
            onClick={handleCreateGroup}
            aria-label="Opprett ny gruppe"
            className="px-3.5 py-2.5 min-h-[44px] rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-orange-950/15 transition-all cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Ny gruppe</span>
          </button>
        )}
      </div>

      {/* Multi-Entity Filter Bar */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200/80 shadow-2xs">
        <EntityFilterBar />
      </div>

      {/* Trosopplæring & Årshjul Quick Card */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => useAppStore.getState().setActiveExploreModal('trosopplaering')}
        className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-200/90 shadow-2xs flex items-center justify-between gap-3 cursor-pointer hover:border-amber-400 hover:shadow-xs transition-all active:scale-[0.99] group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-amber-800" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
              0–18 år i Høvåg
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 truncate group-hover:text-amber-900 transition-colors">
              Trosopplæringsplan & Årshjul
            </h3>
            <p className="text-[11px] text-gray-600 truncate">
              Fra Babysang til Tårnagenter og Konfirmasjonstid
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5 pointer-events-none" />
        <input
          type="text"
          placeholder="Søk i grupper..."
          aria-label="Søk i grupper og fellesskap"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 min-h-[44px] rounded-2xl bg-white border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm"
        />
      </div>

      {/* SECTION 1: MINE GRUPPER */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <h2 role="heading" aria-level={2} className="text-xs font-extrabold uppercase tracking-wider text-gray-700">
            MINE GRUPPER ({joinedGroups.length})
          </h2>
        </div>

        {joinedGroups.length === 0 ? (
          <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center text-gray-600 text-xs font-medium">
            Du er ikke medlem i noen grupper ennå. Utforsk gruppene under og bli med!
          </div>
        ) : (
          <div className="space-y-2.5">
            {joinedGroups.map((group) => (
              <div
                key={group.id}
                role="button"
                tabIndex={0}
                aria-label={`Gruppe: ${group.name}, ${group.memberCount} medlemmer`}
                onClick={() => alert(`Åpner gruppeside for ${group.name}`)}
                className="bg-white p-3.5 min-h-[44px] rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={group.image}
                    alt=""
                    aria-hidden="true"
                    className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-gray-100"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                      <EntityBadge tag={group.entityTag} size="sm" />
                    </div>
                    <h3 className="text-sm font-extrabold text-gray-900 tracking-tight truncate">
                      {group.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-gray-600 font-semibold mt-0.5">
                      <span>{group.memberCount} medlemmer</span>
                      <span>·</span>
                      <span className="text-orange-700 font-bold">{group.meetingTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleGroupJoin(group.id);
                    }}
                    aria-label={`Meld deg ut av ${group.name}`}
                    className="px-2.5 py-1 text-[11px] font-bold text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Meld ut
                  </button>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: OPPDAGER / UTFORSK GRUPPER */}
      <div className="space-y-2.5 pt-3">
        <div className="flex items-center justify-between">
          <h2 role="heading" aria-level={2} className="text-xs font-extrabold uppercase tracking-wider text-gray-700">
            OPPDAGER ({availableGroups.length})
          </h2>
        </div>

        {availableGroups.length === 0 ? (
          <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center text-gray-600 text-xs font-medium">
            Ingen flere grupper tilgjengelig for gjeldende filter.
          </div>
        ) : (
          <div className="space-y-3">
            {availableGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={group.image}
                    alt=""
                    aria-hidden="true"
                    className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <EntityBadge tag={group.entityTag} size="sm" />
                      <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-950 text-[10px] font-extrabold uppercase tracking-wider">
                        {group.category}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-gray-900 tracking-tight truncate">
                      {group.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-700 font-semibold mt-1">
                      <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>{group.meetingTime}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed font-normal">
                  {group.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs font-bold text-gray-800">
                    {group.memberCount} medlemmer
                  </span>

                  <button
                    role="button"
                    aria-label={`Bli med i ${group.name}`}
                    onClick={() => toggleGroupJoin(group.id)}
                    className="px-5 py-2.5 min-h-[44px] rounded-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-950/15 transition-all cursor-pointer active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Bli med</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

