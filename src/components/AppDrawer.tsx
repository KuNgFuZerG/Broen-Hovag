import React from 'react';
import {
  X,
  Sparkles,
  HeartHandshake,
  UserCheck,
  Heart,
  HandHeart,
  Mic,
  Calendar,
  Users,
  MessageSquare,
  Sliders,
  Bell,
  Shield,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Info,
  MapPin,
  Clock,
  Radio
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const AppDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setDrawerOpen,
    setActiveExploreModal,
    setActiveTab,
    setNotificationsModalOpen,
    user
  } = useAppStore();

  if (!isDrawerOpen) return null;

  const handleOpenExplore = (modalId: 'bonn' | 'diakoni' | 'podkast' | 'gi' | 'tjenester' | 'trosopplaering') => {
    setDrawerOpen(false);
    setTimeout(() => {
      setActiveExploreModal(modalId);
    }, 150);
  };

  const handleNavigate = (tab: 'hjem' | 'kalender' | 'grupper' | 'meldinger' | 'profil') => {
    setActiveTab(tab);
    setDrawerOpen(false);
  };

  const tools = [
    {
      id: 'trosopplaering' as const,
      label: 'Tro 0–18 år',
      desc: 'Plan, årshjul og dåpsengler',
      icon: Sparkles,
      color: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    {
      id: 'diakoni' as const,
      label: 'Omsorg & Diakoni',
      desc: 'Besøkstjeneste og samtale',
      icon: HeartHandshake,
      color: 'bg-rose-100 text-rose-800 border-rose-200'
    },
    {
      id: 'tjenester' as const,
      label: 'Frivillige Vakter & Rota',
      desc: 'Kirkeverter, kirkekaffe, lyd/bilde',
      icon: UserCheck,
      color: 'bg-sky-100 text-sky-800 border-sky-200'
    },
    {
      id: 'gi' as const,
      label: 'Gi et offer (Vipps)',
      desc: 'Vipps #12 12 18 til menighetsarbeid',
      icon: Heart,
      color: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    {
      id: 'bonn' as const,
      label: 'Bønnevegg & Forbønn',
      desc: 'Be om forbønn eller tenn et lys',
      icon: HandHeart,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    {
      id: 'podkast' as const,
      label: 'Presten & montøren',
      desc: 'Lokal podkast fra Høvåg',
      icon: Mic,
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Hovedmeny og snarveier">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel Sliding from Left */}
      <div className="absolute inset-y-0 left-0 max-w-[85%] w-80 bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250 ease-out border-r border-gray-100">
        {/* Drawer Header */}
        <div className="px-5 pt-6 pb-4 bg-gradient-to-br from-amber-700 via-orange-700 to-amber-900 text-white relative flex flex-col gap-2">
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Lukk meny"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/35 text-white active:scale-95 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-200">
              Høvåg Menighet & Bedehus
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-lg font-black text-white shrink-0 shadow-inner overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                user.name.split(' ').map((n) => n[0]).join('')
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-extrabold text-white tracking-tight truncate leading-tight">
                {user.name}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/20 text-white tracking-wide border border-white/25">
                  {user.role}
                </span>
                <span className="text-[11px] text-amber-100 truncate">
                  {user.roleTitle || 'Medlem'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 no-scrollbar">
          {/* Section: Hovedsider */}
          <div>
            <div className="text-[10.5px] font-extrabold text-gray-600 uppercase tracking-widest px-2 mb-1.5">
              Hovedsider
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleNavigate('hjem')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-orange-50/70 text-gray-800 text-xs font-bold transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>Hjem & Aktuelt</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </button>

              <button
                onClick={() => handleNavigate('kalender')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-orange-50/70 text-gray-800 text-xs font-bold transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span>Kalender & Gudstjenester</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </button>

              <button
                onClick={() => handleNavigate('grupper')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-orange-50/70 text-gray-800 text-xs font-bold transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>Grupper & Fellesskap</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </button>

              <button
                onClick={() => handleNavigate('meldinger')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-orange-50/70 text-gray-800 text-xs font-bold transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span>Meldinger & Kanaler</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Section: Verktøy & Ressurser (Alle 6 tilgjengelig med detaljer) */}
          <div>
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10.5px] font-extrabold text-gray-600 uppercase tracking-widest">
                Verktøy & Ressurser
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                6 verktøy
              </span>
            </div>

            <div className="space-y-1.5">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleOpenExplore(tool.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 hover:bg-gray-100/90 border border-gray-200/70 text-left transition-all group cursor-pointer active:scale-98"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tool.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-extrabold text-gray-900 block truncate group-hover:text-orange-700 transition-colors">
                          {tool.label}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium block truncate">
                          {tool.desc}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 shrink-0 ml-1" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Menighetsinfo & Lokasjoner */}
          <div>
            <div className="text-[10.5px] font-extrabold text-gray-600 uppercase tracking-widest px-2 mb-1.5">
              Lokalt i Høvåg
            </div>
            <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-gray-900 block">Høvåg Kirke & Bedehus</span>
                  <span className="text-[11px] text-gray-600">Kirkebygda & Blindleia, 4770 Høvåg</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-amber-200/60 text-[11px] text-gray-700">
                <Clock className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>Gudstjenester søndager kl. 11:00</span>
              </div>
            </div>
          </div>

          {/* Section: Innstillinger & Snarveier */}
          <div>
            <div className="text-[10.5px] font-extrabold text-gray-600 uppercase tracking-widest px-2 mb-1.5">
              Innstillinger & Info
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  setTimeout(() => setNotificationsModalOpen(true), 150);
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 text-gray-800 text-xs font-bold transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-gray-600" />
                  <span>Varslingssenter</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => handleNavigate('profil')}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 text-gray-800 text-xs font-bold transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-4 h-4 text-gray-600" />
                  <span>Innholdsfilter & Interessestyring</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => {
                  setDrawerOpen(false);
                  alert('Personvern og samtykke: Høvåg menighet følger Den norske kirkes retningslinjer for personvern (GDPR). Ingen persondata deles utenfor menighetsregisteret.');
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 text-gray-800 text-xs font-bold transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span>Personvern & Retningslinjer</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3.5 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-[11px] text-gray-500">
          <span className="font-semibold">Broen v2.4 · Høvåg</span>
          <span className="text-[10px] text-gray-600 font-medium">«Hele bygda, hele livet»</span>
        </div>
      </div>
    </div>
  );
};
