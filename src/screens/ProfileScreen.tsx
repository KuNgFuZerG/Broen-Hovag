import React, { useState } from 'react';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight, Calendar, Check, UserCheck, ArrowRight, Sliders, Sparkles, UserCog, CheckCircle, ShieldCheck, ShieldAlert, Menu } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { PreferencesModal } from '../components/modals/PreferencesModal';
import { ProfileAvatarUploader } from '../components/ProfileAvatarUploader';
import { DEMO_PRESET_USERS } from '../data/mockData';
import { UserRole, StandardUserRole, USER_ROLES } from '../types';

export const ProfileScreen: React.FC = () => {
  const { user, updateUserProfile, setUserRole, getUserRole, events, serviceRotas, setActiveExploreModal, canPublishAnnouncement, canCreateGroup, setDrawerOpen } = useAppStore();
  const [notifications, setNotifications] = useState(user.notificationsEnabled);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const fullName = user.name || 'Odd Eriksen';
  const email = user.email || 'odd.eriksen@example.no';
  const roleTitle = user.roleTitle || 'Menighetsmedlem';
  const currentRole = getUserRole();

  const rsvpEvents = events.filter((e) => user.rsvps[e.id] === 'Ja');

  // Extract user's volunteer shifts
  const myShifts = serviceRotas.flatMap((rota) =>
    rota.shifts
      .filter((s) => s.isCurrentUser)
      .map((s) => ({
        rotaId: rota.id,
        eventTitle: rota.title,
        dayShort: rota.dayShort,
        dayNumber: rota.dayNumber,
        time: rota.time,
        roleName: s.roleName,
        swapRequested: s.swapRequested,
        entityTag: rota.entityTag
      }))
  );

  const handleToggleNotifications = () => {
    const next = !notifications;
    setNotifications(next);
    updateUserProfile({ notificationsEnabled: next });
  };

  const handleSelectDemoUser = (presetUser: (typeof DEMO_PRESET_USERS)[0]) => {
    updateUserProfile(presetUser);
    setShowRoleSwitcher(false);
  };

  const handleQuickRoleChange = (role: StandardUserRole) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    if (confirm('Er du sikker på at du vil logge ut av Høvåg menighet?')) {
      alert('Du er nå logget ut.');
    }
  };

  const rolesList: { id: StandardUserRole; label: string; desc: string; badge: string }[] = [
    { id: 'USER', label: 'USER (Medlem)', desc: 'Standardleser. Kan ikke publisere eller opprette grupper.', badge: 'Leserett' },
    { id: 'VOLUNTEER', label: 'VOLUNTEER (Frivillig)', desc: 'Kan ta vakter og delta i tjenester.', badge: 'Tjeneste' },
    { id: 'LEADER', label: 'LEADER (Gruppeleder/Diakon)', desc: 'Kan publisere kunngjøringer og opprette grupper.', badge: 'Publisering' },
    { id: 'ADMIN', label: 'ADMIN (Sokneprest/Admin)', desc: 'Full menighetsadministrasjon og publiseringsrett.', badge: 'Full tilgang' }
  ];

  return (
    <div className="bg-[#f4f5f8] min-h-full pb-28 pt-4 px-5 space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-widest text-gray-600 uppercase">
            HØVÅG MENIGHET
          </p>
          <h1 role="heading" aria-level={1} className="text-2xl font-black text-gray-900 tracking-tight">
            Min Profil & Innstillinger
          </h1>
        </div>

        {/* Quick Role-Switcher Toggle */}
        <button
          onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
          aria-label="Bytt test-rolle"
          className="px-3 py-2 min-h-[44px] rounded-2xl bg-white border border-gray-300 text-xs font-bold text-gray-800 hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
        >
          <UserCog className="w-4 h-4 text-orange-600" />
          <span>Rolle: {currentRole}</span>
        </button>
      </div>

      {/* Role Switcher Drawer / Card */}
      {showRoleSwitcher && (
        <div className="bg-amber-50/90 border border-amber-300/80 p-4 rounded-3xl space-y-3 shadow-sm animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
              <UserCog className="w-4 h-4 text-amber-700" />
              Rollebehandling (RoleManager)
            </span>
            <span className="text-[10px] font-bold text-amber-800">
              Aktiv: {currentRole}
            </span>
          </div>

          {/* Quick Role Switch Buttons */}
          <div className="grid grid-cols-2 gap-1.5">
            {rolesList.map((r) => {
              const active = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => handleQuickRoleChange(r.id)}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-700 text-white border-amber-800 font-black shadow-xs'
                      : 'bg-white text-gray-800 border-amber-200 hover:bg-amber-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black">{r.id}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${active ? 'bg-amber-900 text-amber-100' : 'bg-gray-100 text-gray-600'}`}>
                      {r.badge}
                    </span>
                  </div>
                  <p className={`text-[10px] truncate mt-0.5 ${active ? 'text-amber-100' : 'text-gray-500'}`}>
                    {r.desc}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="border-t border-amber-200/80 pt-2.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
              <span>Eller velg en forhåndsdefinert profil:</span>
            </div>
            <div className="space-y-1.5">
              {DEMO_PRESET_USERS.map((preset, idx) => {
                const isCurrent = user.email === preset.email;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectDemoUser(preset)}
                    className={`w-full p-2 rounded-2xl text-left border flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-600 text-white border-amber-600 font-extrabold shadow-xs'
                        : 'bg-white text-gray-800 border-amber-200 hover:bg-amber-100/60'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black truncate ${isCurrent ? 'text-white' : 'text-gray-900'}`}>
                          {preset.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                            isCurrent
                              ? 'bg-amber-800 text-amber-100'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {preset.role}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${isCurrent ? 'text-amber-100' : 'text-gray-600'}`}>
                        {preset.roleTitle}
                      </p>
                    </div>
                    {isCurrent && <CheckCircle className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Role Rights Summary Box */}
      <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${currentRole === 'ADMIN' || currentRole === 'LEADER' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-gray-900 flex items-center gap-1.5">
              <span>Publiseringsstatus:</span>
              <span className={canPublishAnnouncement() ? 'text-emerald-700 font-extrabold' : 'text-gray-500 font-semibold'}>
                {canPublishAnnouncement() ? 'Aktiv (LEADER / ADMIN)' : 'Skjult for bruker'}
              </span>
            </div>
            <p className="text-[11px] text-gray-600 font-medium">
              {canPublishAnnouncement() ? '«Ny kunngjøring» & «Ny gruppe» er synlige.' : '«Ny kunngjøring» og «Ny gruppe» er skjult i grensesnittet.'}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Card Header */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-sm flex items-center gap-4">
        <ProfileAvatarUploader
          name={fullName}
          avatar={user.avatar}
          onAvatarChange={(newAvatar) => updateUserProfile({ avatar: newAvatar })}
        />
        <div className="min-w-0 flex-1">
          <h2 role="heading" aria-level={2} className="text-lg font-black text-gray-900 tracking-tight truncate">
            {fullName}
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-950 text-[10px] font-extrabold uppercase tracking-wider border border-orange-200 truncate">
              {roleTitle}
            </span>
          </div>
          <p className="text-xs text-gray-600 font-semibold mt-1 truncate">
            {email}
          </p>
        </div>
      </div>

      {/* Volunteer Shifts Summary Card */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-sky-600" />
            <h3 role="heading" aria-level={3} className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
              Mine Frivillige Vakter ({myShifts.length})
            </h3>
          </div>
          <button
            onClick={() => setActiveExploreModal('tjenester')}
            className="text-[11px] font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
          >
            Se alle vakter
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {myShifts.length === 0 ? (
          <p className="text-xs text-gray-500 italic py-1">
            Du er ikke satt opp på noen vakter for øyeblikket.
          </p>
        ) : (
          <div className="space-y-2">
            {myShifts.map((s, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-sky-50/60 rounded-xl border border-sky-200/70 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-gray-900">{s.roleName}</span>
                    <span className="text-[11px] text-gray-600 font-medium">({s.eventTitle})</span>
                  </div>
                  <span className="text-gray-600 font-semibold block text-[11px] mt-0.5">
                    {s.dayShort} {s.dayNumber} · {s.time}
                  </span>
                </div>
                {s.swapRequested ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                    Bytte søkt
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-sky-100 text-sky-950 border border-sky-300">
                    Bekreftet
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RSVPs Summary Card */}
      {rsvpEvents.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-sm space-y-2.5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-600" />
            <h3 role="heading" aria-level={3} className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
              Mine påmeldinger ({rsvpEvents.length})
            </h3>
          </div>

          <div className="space-y-2">
            {rsvpEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-2.5 bg-gray-50 rounded-xl border border-gray-200/60 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-extrabold text-gray-900">{evt.title}</span>
                  <span className="text-gray-600 font-semibold block text-[11px]">
                    {evt.dayShort} {evt.dayNumber} · {evt.time} ({evt.location})
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-950 font-extrabold text-[10px] border border-emerald-300">
                  Kommer
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings List Items */}
      <div className="space-y-2">
        <h3 role="heading" aria-level={3} className="text-xs font-extrabold text-gray-700 uppercase tracking-wider px-1">
          KONTO OG INNSTILLINGER
        </h3>

        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden divide-y divide-gray-100">
          {/* 0. Hovedmeny & Verktøyskuff (Drawer) */}
          <button
            role="button"
            aria-label="Åpne Hovedmeny og verktøyskuff"
            onClick={() => setDrawerOpen(true)}
            className="w-full p-4 min-h-[52px] flex items-center justify-between gap-3 hover:bg-amber-50/50 transition-colors cursor-pointer text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Menu className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-gray-900 block">
                    Hovedmeny & Verktøyskuff
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
                    Drawer
                  </span>
                </div>
                <span className="text-xs text-gray-600 font-semibold">
                  Sidepanel med alle 6 verktøy, lenker og info
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-800 transition-colors" />
          </button>

          {/* 1. Mine interesser & Innhold (Skreddersy aldersgrupper og kategorier) */}
          <button
            role="button"
            aria-label="Mine interesser og innhold (Skreddersy aldersgrupper og varsler)"
            onClick={() => setIsPreferencesOpen(true)}
            className="w-full p-4 min-h-[52px] flex items-center justify-between gap-3 hover:bg-orange-50/50 transition-colors cursor-pointer text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-gray-900 block">
                    Mine interesser & innhold
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-black">
                    Filter
                  </span>
                </div>
                <span className="text-xs text-gray-600 font-semibold">
                  Velg vekk eldre-, ungdoms- eller tema-varsler
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
          </button>

          {/* 2. Varsler (Admin push-varsler) */}
          <div className="p-4 min-h-[52px] flex items-center justify-between gap-3 hover:bg-gray-50/80 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-gray-900 block">Varsler</span>
                <span className="text-xs text-gray-600 font-semibold">Push-varsler på mobil</span>
              </div>
            </div>

            <button
              role="switch"
              aria-checked={notifications}
              aria-label="Aktiver eller deaktiver push-varsler"
              onClick={handleToggleNotifications}
              className={`w-12 h-7 rounded-full transition-colors p-1 flex items-center cursor-pointer ${
                notifications ? 'bg-orange-600 justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* 2. Min konto (Navn, e-post, passord) */}
          <button
            role="button"
            aria-label="Min konto (Navn, e-post, passord)"
            onClick={() => alert('Min konto: Endre navn, e-post og passord.')}
            className="w-full p-4 min-h-[52px] flex items-center justify-between gap-3 hover:bg-gray-50/80 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-gray-900 block">Min konto</span>
                <span className="text-xs text-gray-600 font-semibold">Navn, e-post, passord</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* 3. Personvern (Datahåndtering) */}
          <button
            role="button"
            aria-label="Personvern (Datahåndtering)"
            onClick={() => alert('Personvern: Informasjon om datahåndtering og samtykker i Høvåg menighet.')}
            className="w-full p-4 min-h-[52px] flex items-center justify-between gap-3 hover:bg-gray-50/80 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-gray-900 block">Personvern</span>
                <span className="text-xs text-gray-600 font-semibold">Datahåndtering & samtykke</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* 4. Hjelp og støtte (FAQ og kontakt) */}
          <button
            role="button"
            aria-label="Hjelp og støtte (FAQ og kontakt)"
            onClick={() => alert('Hjelp og støtte: FAQ, hjelpesenter og kontaktinformasjon for Høvåg menighet.')}
            className="w-full p-4 min-h-[52px] flex items-center justify-between gap-3 hover:bg-gray-50/80 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-gray-900 block">Hjelp og støtte</span>
                <span className="text-xs text-gray-600 font-semibold">FAQ og kontakt</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* 5. Red-themed Logg ut row */}
          <button
            role="button"
            aria-label="Logg ut av appen"
            onClick={handleLogout}
            className="w-full p-4 min-h-[52px] flex items-center justify-between gap-3 bg-rose-50/60 hover:bg-rose-100/70 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-rose-700 block">Logg ut</span>
                <span className="text-xs text-rose-600 font-medium">Avslutt gjeldende økt</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-rose-400" />
          </button>
        </div>
      </div>

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />
    </div>
  );
};

