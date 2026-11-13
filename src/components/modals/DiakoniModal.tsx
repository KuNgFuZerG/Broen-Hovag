import React, { useState } from 'react';
import {
  X,
  HeartHandshake,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  HelpCircle,
  Truck,
  Flame,
  ShoppingBag,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { DiakoniNeedCategory } from '../../types';
import { permissions } from '../../utils/permissions';

export const DiakoniModal: React.FC = () => {
  const { activeExploreModal, setActiveExploreModal, diakoniRequests, addDiakoniRequest, user, canManageDiakoni } = useAppStore();

  const [activeSubTab, setActiveSubTab] = useState<'form' | 'contact' | 'history'>('form');
  const [selectedCategory, setSelectedCategory] = useState<DiakoniNeedCategory>('samtale');
  const [name, setName] = useState(user.name || '');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [contactInfo, setContactInfo] = useState(user.phone || user.email || '');
  const [message, setMessage] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (activeExploreModal !== 'diakoni') return null;

  const isStaffOrDiakon = canManageDiakoni();

  // Privacy protection: Regular members only see their own requests or an empty list if none
  const visibleRequests = isStaffOrDiakon
    ? diakoniRequests
    : diakoniRequests.filter((r) => r.name === user.name || (r.contact && (r.contact === user.phone || r.contact === user.email)));

  const categories: { id: DiakoniNeedCategory; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    {
      id: 'samtale',
      label: 'Sjelesorg & Samtale',
      icon: MessageSquare,
      desc: 'En fortrolig prat med prest eller diakon ved sorg, ensomhet eller livskriser.'
    },
    {
      id: 'matpose',
      label: 'Matkasse / Nødhjelp',
      icon: ShoppingBag,
      desc: 'Diskré og ubyråkratisk mathjelp til familier eller enkeltpersoner i en vanskelig situasjon.'
    },
    {
      id: 'ved',
      label: 'Ved til oppvarming',
      icon: Flame,
      desc: 'En sekk tørr ved kjørt hjem og båret inn for eldre eller trengende i bygda.'
    },
    {
      id: 'besok',
      label: 'Besøksvenn',
      icon: HeartHandshake,
      desc: 'Få en hyggelig besøksvenn hjem på kaffe, eller bli med på en gåtur.'
    },
    {
      id: 'skyss',
      label: 'Skyss / Transport',
      icon: Truck,
      desc: 'Hjelp med skyss til gudstjeneste, eldretreff eller arrangement.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.trim() && !isAnonymous) return;

    const currentCatObj = categories.find((c) => c.id === selectedCategory);

    addDiakoniRequest({
      category: selectedCategory,
      categoryLabel: currentCatObj ? currentCatObj.label : 'Omsorgsbehov',
      name: isAnonymous ? 'Anonym henvendelse' : (name.trim() || 'Innbygger i Høvåg'),
      contact: contactInfo.trim() || 'Ikke oppgitt (anonym)',
      message: message.trim() || undefined,
      isConfidential: true
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setMessage('');
      setActiveSubTab('history');
    }, 2200);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="diakoni-modal-title"
        className="bg-[#f8fafc] w-full max-w-lg rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl border border-gray-200/80 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 id="diakoni-modal-title" className="text-lg font-black text-gray-900 tracking-tight">
                Omsorg & Diakoni
              </h2>
              <p className="text-xs text-gray-700 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                Lovpålagt taushetsplikt & omtanke
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveExploreModal(null)}
            aria-label="Lukk omsorgspanel"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tab Navigation */}
        <div className="p-3 bg-white border-b border-gray-200 flex gap-2 shrink-0">
          <button
            onClick={() => setActiveSubTab('form')}
            className={`flex-1 py-2 px-3 rounded-xl min-h-[40px] text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSubTab === 'form'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Be om hjelp / samtale
          </button>
          <button
            onClick={() => setActiveSubTab('contact')}
            className={`flex-1 py-2 px-3 rounded-xl min-h-[40px] text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSubTab === 'contact'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            Ring oss direkte
          </button>
          <button
            onClick={() => setActiveSubTab('history')}
            className={`py-2 px-3 rounded-xl min-h-[40px] text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeSubTab === 'history'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isStaffOrDiakon ? 'Omsorgsliste' : 'Mine henvendelser'} ({visibleRequests.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 bg-white">
          {submittedSuccess ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Henvendelsen er mottatt</h3>
              <p className="text-xs text-gray-700 font-semibold max-w-sm mx-auto leading-relaxed">
                Din henvendelse er trygt overlevert til diakoniansvarlig Nine Justvik og soknepresten i full fortrolighet.
                Vi tar kontakt så snart vi kan.
              </p>
            </div>
          ) : activeSubTab === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Dignity & Privacy banner */}
              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                <div className="text-xs text-rose-950 leading-relaxed font-medium">
                  <span className="font-extrabold block text-rose-900 mb-0.5">Lavterskel og helt uforpliktende</span>
                  I Høvåg menighet ønsker vi at ingen skal stå alene. Enten du trenger en vedsekk, en matpose eller en god prat, er dette et trygt rom.
                </div>
              </div>

              {/* Category Picker */}
              <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Hva gjelder henvendelsen?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-rose-50 border-rose-600 shadow-sm ring-1 ring-rose-600'
                            : 'bg-gray-50/80 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-extrabold text-gray-900">{cat.label}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-snug font-medium">{cat.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Ditt navn
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                      />
                      <span>Ønsker å være anonym</span>
                    </label>
                  </div>
                  {!isAnonymous && (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ditt fulle navn"
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-gray-50 border border-gray-300 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                    Telefonnummer eller e-post for oppfølging
                  </label>
                  <input
                    type="text"
                    required={!isAnonymous}
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="F.eks. 912 34 567 eller e-post"
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-gray-50 border border-gray-300 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                    Kort melding eller kommentar (valgfritt)
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Beskriv gjerne kort hva du har behov for eller om det haster..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 min-h-[48px] rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-rose-900/15 transition-transform active:scale-[0.98] cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Send henvendelse i fortrolighet</span>
              </button>
            </form>
          ) : activeSubTab === 'contact' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200">
                <div className="flex items-center gap-2 text-sky-950 font-extrabold text-sm mb-1">
                  <Phone className="w-4 h-4 text-sky-700" />
                  Direkte telefonkontakt i Høvåg
                </div>
                <p className="text-xs text-sky-900 font-medium leading-relaxed">
                  For eldre eller de som foretrekker å snakke direkte med et menneske uten å bruke skjema, er det alltid åpent å ringe eller sende SMS.
                </p>
              </div>

              {/* Contact Card 1: Diakoni / Besøkstjeneste */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-800">
                      Besøkstjeneste på Høvågheimen & Omsorg
                    </span>
                    <h3 className="text-base font-extrabold text-gray-900 mt-1">Nine Justvik</h3>
                    <p className="text-xs text-gray-600 font-medium">Koordinator for besøksvenn & diakoni</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-sm">
                    NJ
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="tel:+4741685988"
                    className="flex-1 py-2.5 px-3 min-h-[44px] rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-rose-700 transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Ring 416 85 988
                  </a>
                  <a
                    href="sms:+4741685988"
                    className="py-2.5 px-4 min-h-[44px] rounded-xl bg-gray-100 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-200 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-gray-600" />
                    SMS
                  </a>
                </div>
              </div>

              {/* Contact Card 2: Forbønn på Bedehuset */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900">
                      Forbønnsgruppe på Bedehuset
                    </span>
                    <h3 className="text-base font-extrabold text-gray-900 mt-1">Johan Berglihn</h3>
                    <p className="text-xs text-gray-600 font-medium">Bønneleder (tirsdager 06:00 / lørdager 08:00)</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                    JB
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="tel:+4791729352"
                    className="flex-1 py-2.5 px-3 min-h-[44px] rounded-xl bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-800 transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Ring 917 29 352
                  </a>
                  <a
                    href="sms:+4791729352"
                    className="py-2.5 px-4 min-h-[44px] rounded-xl bg-gray-100 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-200 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-gray-600" />
                    SMS
                  </a>
                </div>
              </div>

              {/* Contact Card 3: Menighetskontor & Prestetjeneste */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-sky-100 text-sky-800">
                      Prestevikarer & Menighetskontor
                    </span>
                    <h3 className="text-base font-extrabold text-gray-900 mt-1">Høvåg menighetskontor</h3>
                    <p className="text-xs text-gray-600 font-medium">Charlotte Meszaros & Andreas Mollestad Nilsen (vikarer)</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">
                    HM
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="tel:+4737268000"
                    className="flex-1 py-2.5 px-3 min-h-[44px] rounded-xl bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-sky-800 transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Ring 37 26 80 00
                  </a>
                  <a
                    href="mailto:hovag-menighet@lillesand.kommune.no"
                    className="py-2.5 px-4 min-h-[44px] rounded-xl bg-gray-100 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-200 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-gray-600" />
                    E-post
                  </a>
                </div>
              </div>

              {/* Note on Crisis Support */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-2.5 text-xs text-gray-600 font-medium leading-relaxed">
                <HelpCircle className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <span>
                  Ved akutt krise eller nød utenom kontortid kan du også kontakte Kirkens SOS på tlf. <strong>22 40 00 40</strong> (døgnåpen krisetelefon).
                </span>
              </div>
            </div>
          ) : (
            /* History / Status View */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  {isStaffOrDiakon ? 'Omsorgs- og henvendelseslogg (Diakoni & Stab)' : 'Dine innsendte henvendelser'}
                </div>
                {isStaffOrDiakon && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800">
                    Taushetsbelagt innsyn
                  </span>
                )}
              </div>

              {visibleRequests.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                  <UserCheck className="w-8 h-8 text-gray-400 mx-auto" />
                  <h4 className="text-sm font-bold text-gray-700">Ingen aktive henvendelser</h4>
                  <p className="text-xs text-gray-500">
                    {isStaffOrDiakon ? 'Det er ingen ubehandlede henvendelser i loggen.' : 'Du har ingen registrerte henvendelser i historikken.'}
                  </p>
                </div>
              ) : (
                visibleRequests.map((req) => (
                  <div key={req.id} className="p-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-sm space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-gray-500">{req.createdAt}</span>
                        <h4 className="text-sm font-extrabold text-gray-900">{req.categoryLabel}</h4>
                        <p className="text-xs text-gray-600 font-medium">Mottaker: {req.name}</p>
                        {isStaffOrDiakon && req.contact && (
                          <p className="text-[11px] text-gray-500 font-semibold mt-0.5">Kontakt: {req.contact}</p>
                        )}
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          req.status === 'utført'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'under_behandling'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {req.status === 'utført'
                          ? 'Utført'
                          : req.status === 'under_behandling'
                          ? 'Under oppfølging'
                          : 'Mottatt'}
                      </span>
                    </div>

                    {req.message && (
                      <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-xl italic">
                        "{req.message}"
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
