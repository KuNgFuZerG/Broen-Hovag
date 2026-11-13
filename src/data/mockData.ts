import {
  EventItem,
  AnnouncementItem,
  PrayerRequest,
  IdeaItem,
  PodcastEpisode,
  GroupItem,
  ChatChannel,
  UserProfile,
  ServiceRotaItem,
  DiakoniRequestItem,
  TrosopplaeringStage
} from '../types';

export const TROSOPPLAERING_STAGES: TrosopplaeringStage[] = [
  {
    id: 'stage-0',
    ageRange: '0–2 år',
    title: 'Tro i hjemmet & Babysamling',
    responsible: 'Prest / Trosopplærer',
    scope: '4 samlinger (8 timer)',
    category: 'Småbarn',
    location: 'Bedehuset & Kirka',
    goal: 'Fokus på foreldre–barn, nettverksbygging, førstehjelp, babymassasje og aftenbønn i hjemmet.',
    highlights: [
      'Dåpssamtale og dåpsliturgi med dåpslys',
      'Babysamling med tema (førstehjelp, ernæring, babymassasje)',
      'Innføring av aftenbønn: «Kjære Gud, jeg har det godt»'
    ]
  },
  {
    id: 'stage-1',
    ageRange: '1 år',
    title: 'Dåpsenglesamling & Posthilsen',
    responsible: 'Prest / Trosopplærer',
    scope: '1 samling + hilsen',
    category: 'Småbarn',
    location: 'Høvåg kirke',
    goal: 'Oppmuntre til tro i hjemmet som en naturlig del av hverdagen.',
    highlights: [
      '1-års dåpsdagsplakat sendes i posten',
      'Dåpsenglesamling i kirka hvor barna får dåpsengelen med hjem',
      'Samtale om hvordan formidle kjærlighet, omsorg og bibelfortellinger'
    ]
  },
  {
    id: 'stage-2',
    ageRange: '2–3 år',
    title: 'Familiesamling m/ Fakkeltog & Krøllebok',
    responsible: 'Trosopplærer / Dåpsutvalg',
    scope: '2 samlinger (3 timer)',
    category: 'Småbarn',
    location: 'Bedehuset ➜ Fakkeltog til Kirka',
    goal: 'Sosialt måltidsfellesskap og trygghet i kirkerommet.',
    highlights: [
      'Måltid på Bedehuset etterfulgt av fakkeltog til kirka',
      'Presten står på trappa og tar imot barna',
      'Krøllesamling m/ Krøllebok om våren, Skapelsen og Jesus & barna om høsten'
    ]
  },
  {
    id: 'stage-4',
    ageRange: '4 år',
    title: 'Utdeling av 4-årsbok & Sprell Levende',
    responsible: 'Trosopplærer, prest og søndagsskoleleder',
    scope: '1 familiegudstjeneste + søndagsskole',
    category: 'Småbarn',
    location: 'Høvåg kirke',
    goal: 'Møtepunkt for barnet og familien. Sanger, bønner og fortellinger til bruk i hjemmet.',
    highlights: [
      'Utdeling av 4-årsbok i høytidelig familiegudstjeneste',
      'Søndagsskolepose fra leder for «Sprell Levende»',
      'Bibelhistorier: Filip og hoffmannen, Jesus stiller stormen, Brødunderet'
    ]
  },
  {
    id: 'stage-5',
    ageRange: '5 år',
    title: 'Julevandring i kirka',
    responsible: 'Dåpsutvalget & Trosopplærer',
    scope: '1 samling (2 timer)',
    category: 'Småbarn',
    location: 'Høvåg kirke',
    goal: 'Erfare juleevangeliet ved å vandre i fortellingen i middelalderkirken.',
    highlights: [
      'Skrive seg inn i manntallet i store våpenhus',
      'Barna kler seg som engler, gjeter eller vismann med keiser Augustus',
      'Ekte Maria & Josef med Jesusbarn (rekruttert fra Babysang) i stallen'
    ]
  },
  {
    id: 'stage-barnetimen',
    ageRange: '5–7 år',
    title: 'Barnetimen m/ Tore Thomassen',
    responsible: 'Tore Thomassen & Menighetsstaben',
    scope: '6 samlinger i året',
    category: 'Skolebarn',
    location: 'Høvåg kirke & Lillesand',
    goal: 'Glede, humor, musikk og trygghet på at barna hører til i kirka.',
    highlights: [
      'Film, dagens vits, bit-for-bit bildelek i kirkebenkene',
      'Bursdagsfeiring for alle med gave, boller og saft',
      'Tore Thomassens trosbekjennelse: «Gud er alles far... Starter livets fest!»'
    ]
  },
  {
    id: 'stage-6',
    ageRange: '6 år (Førskole)',
    title: 'Skolestart-samling & Påskeskolen',
    responsible: 'Prest og Trosopplærer',
    scope: 'Familiemøte + 4 påskesamlinger',
    category: 'Skolebarn',
    location: 'Bedehuset & Kirka',
    goal: 'Forbønn for den kommende skoletilværelsen og forståelse av påsken.',
    highlights: [
      'Barna får skolestartpose med kristent viskelær, tidslinje-linjal og bibelhefte',
      'Påskeskole med tegning, påskeverksted og forming av påskebukett',
      'Innføring i nattverden og palmesøndag'
    ]
  },
  {
    id: 'stage-superhelt',
    ageRange: '1.–2. klasse',
    title: 'Superhelt-samling & Veiviserne',
    responsible: 'Kateket, trosopplærer og foreldre',
    scope: 'Lørdagssamling + søndagsgudstjeneste',
    category: 'Skolebarn',
    location: 'Høvåg bedehus',
    goal: 'Diakoni, misjon og Korsveis 4 veivisere: Jesus som superhelt og inspirator.',
    highlights: [
      'Den barmhjertige samaritan: Hvordan være en superhelt i hverdagen?',
      'Bli kjent med menighetens misjonsprosjekt i Ecuador',
      'Gruppeoppgaver: «I dag har jeg skjønt/lært...»'
    ]
  },
  {
    id: 'stage-tarnagent',
    ageRange: '3.–4. klasse',
    title: 'Tårnagenthelg: Mysterieløsning i kirka',
    responsible: 'Trosopplærer, prest og foreldre',
    scope: 'Helgesamling (4 timer + gudstjeneste)',
    category: 'Skolebarn',
    location: 'Høvåg kirke',
    goal: 'Utforske kirkehuset og den verdensvide kirke bygd av levende steiner.',
    highlights: [
      'Mysterium 1: «Det stjålne kirkesølvet» – Rebusløp og Sakkeus',
      'Mysterium 2: «Jesu grav» – Åstedsgransking: Hvorfor ligger linkledet pent foldet?',
      'Sanseløyper (lytte, lukte, føle, smake) og agentgudstjeneste'
    ]
  },
  {
    id: 'stage-lysvaken',
    ageRange: '5.–6. klasse',
    title: 'Lys Våken & Kristuskransen',
    responsible: 'Trosopplærer, prest og foreldre',
    scope: 'Lørdagskveld/overnatting + 1. søndag i advent',
    category: 'Skolebarn',
    location: 'Høvåg kirke',
    goal: 'Feire kirkens nyttår, lære kirkeåret, reflekser og være verdens lys.',
    highlights: [
      'Refleksløype i mørket med bibelspørsmål – alle får refleksengel',
      'Lage eget Kristuskrans-armbånd ved Kristuskransalteret i kirka',
      'Andakt med tenning av 1. adventslys og overnatting/kveldsmåltid'
    ]
  },
  {
    id: 'stage-skattejakt',
    ageRange: '7. klasse',
    title: 'Skattejakt: Holmetur i skjærgården',
    responsible: 'Trosopplærer, ungdomsleder og frivillige',
    scope: 'Lørdagstur (6 timer) + søndag',
    category: 'Skolebarn',
    location: 'Skjærgården i Høvåg (Blindleia) & Kirka',
    goal: '«Den største skatten som finnes på jord, ligger gjemt i Herrens eget ord».',
    highlights: [
      'Båttur ut til holme i Blindleia med bibelposter og fellesskap',
      'Fortellingen om Martin Luthers tårnopplevelse: Nåden som Guds frie gave',
      'Bønnevandring og forberedelse til ungdomstrinnet'
    ]
  },
  {
    id: 'stage-minikonfirmant',
    ageRange: '8. klasse',
    title: 'Minikonfirmantleir i Kirkeparken',
    responsible: 'Ungdomsleder Monica, trosopplærer og fjorårskonfirmanter',
    scope: 'Helgeleir m/ overnatting i telt (10 timer)',
    category: 'Konfirmant',
    location: 'Kirkeparken i Høvåg',
    goal: 'Møte Gud som Skaper, grønn diakoni, treenigheten og smak på konfirmanttiden.',
    highlights: [
      'Sette opp teltleir i kirkeparken, grilling og bålpanne med andakt',
      'Fjorårets konfirmanter deler erfaringer med de nye',
      'Første innføring i Passord (bibelvers) og PUSH-miljøet'
    ]
  },
  {
    id: 'stage-konfirmasjon',
    ageRange: '9. klasse',
    title: 'Konfirmasjonstid: Tro & Liv',
    responsible: 'Prest, kateket og ungdomsleder',
    scope: 'Hele skoleåret (60 timer undervisning & leir)',
    category: 'Konfirmant',
    location: 'Bedehuset, Kirka & Leirstedet Evjetun',
    goal: 'Vekke, styrke og modne troen. Gjøre konfirmantene trygge på gudstjenesten og kristent liv.',
    highlights: [
      'Tirsdagssamlinger m/ Passord (si bibelvers utenat) og pizzaboller',
      'Leir på Evjetun m/ Radio Evjetun, bønnevandring og kiosk',
      'Hjemmegrupper i private hjem hos voksenlederne (4 samlinger)',
      'Påskespill (67 aktører) og bøssebærere for Fasteaksjonen',
      'Catwalk med trommerytme på presentasjonsgudstjenesten'
    ]
  },
  {
    id: 'stage-ledertrening',
    ageRange: '10. klasse / 15–18 år',
    title: 'Ledertrening (Lederkurs & CV-bevis)',
    responsible: 'Ungdomsleder Monica Gislefoss',
    scope: '4 moduler (8 timer) + praksis',
    category: 'Leder',
    location: 'Bedehuset',
    goal: 'Bygge og motivere unge ledere til PUSH-styret, leirlederroller og trosopplæring.',
    highlights: [
      'Opplæring i ledelse, relasjonsbygging og trygg frivillighet',
      'Formelt kursbevis som deltakerne kan legge ved sin private CV',
      'Praksis som ledere på Evjetun-leir, Tårnagenthelg og Lys Våken'
    ]
  },
  {
    id: 'stage-push',
    ageRange: '8. klasse – 18 år',
    title: 'PUSH Ungdomsarbeid & Turer',
    responsible: 'Monica Gislefoss & PUSH-ungdomsstyret',
    scope: 'Hver lørdag kl. 19:30 + reiser',
    category: 'Ungdom',
    location: 'Høvåg bedehus',
    goal: 'Eget kristent ungdomsfellesskap i nærmiljøet med trygg tilhørighet.',
    highlights: [
      'Lørdagsklubb med toastkiosk, lovsang, temakvelder og leker',
      'Reball-fredag én gang i måneden (særlig lavterskeltilbud)',
      'Hovdentur (vinter/alpint) og IMPULS-tur for dypere tro'
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Odd Anders Kjøstvedt',
  greeting: 'Hei Odd Anders',
  email: 'odd.anders@hovag-menighet.no',
  phone: '+47 912 34 567',
  role: 'USER',
  roleTitle: 'Menighetsmedlem & Konsulent',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  notificationsEnabled: true,
  theme: 'light',
  rsvps: {
    'event-1': 'Ja'
  },
  preferences: {
    followedEntities: {
      kirke: true,
      bedehus: true,
      push: true
    },
    followedCategories: {
      Gudstjeneste: true,
      Ungdom: true,
      Senior: true,
      Familie: true,
      Kultur: true,
      Bønn: true,
      Dugnad: true,
      Misjon: true,
      Konfirmant: true,
      Trosopplæring: true
    },
    hideSeniorContent: false,
    hideYouthContent: false
  }
};

export const DEMO_PRESET_USERS: UserProfile[] = [
  {
    name: 'Odd Anders Kjøstvedt',
    greeting: 'Hei Odd Anders',
    email: 'odd.anders@hovag-menighet.no',
    phone: '+47 912 34 567',
    role: 'USER',
    roleTitle: 'Menighetsmedlem & Innsider (Lesetilgang)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    notificationsEnabled: true,
    theme: 'light',
    rsvps: { 'event-1': 'Ja' },
    preferences: INITIAL_USER.preferences
  },
  {
    name: 'Lars Skoland',
    greeting: 'Hei Lars',
    email: 'lars.skoland@outlook.com',
    phone: '+47 911 22 334',
    role: 'VOLUNTEER',
    roleTitle: 'Frivillig (Basar, påskespill & kirkevert)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    notificationsEnabled: true,
    theme: 'light',
    rsvps: { 'event-1': 'Ja' },
    preferences: INITIAL_USER.preferences
  },
  {
    name: 'Monica Gislefoss',
    greeting: 'Hei Monica',
    email: 'monica@push-ungdom.no',
    phone: '+47 955 44 332',
    role: 'LEADER',
    roleTitle: 'Leder for PUSH Ungdomsarbeid',
    managedEntities: ['push'],
    managedGroups: ['g-1', 'g-5'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    notificationsEnabled: true,
    theme: 'light',
    rsvps: { 'event-2': 'Ja' },
    preferences: INITIAL_USER.preferences
  },
  {
    name: 'Harald Avtjern',
    greeting: 'Hei Harald',
    email: 'harald.avtjern@hovag-bedehus.no',
    phone: '+47 901 33 445',
    role: 'LEADER',
    roleTitle: 'Daglig leder for Høvåg Bedehus',
    managedEntities: ['bedehus'],
    managedGroups: ['g-2', 'g-4'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    notificationsEnabled: true,
    theme: 'light',
    rsvps: { 'event-3': 'Ja' },
    preferences: INITIAL_USER.preferences
  },
  {
    name: 'Nine Justvik',
    greeting: 'Hei Nine',
    email: 'nine.justvik@hovag-kirke.no',
    phone: '+47 915 44 321',
    role: 'LEADER',
    roleTitle: 'Diakoni- & Besøkstjenesteansvarlig',
    managedEntities: ['kirke', 'bedehus'],
    managedGroups: ['g-6'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    notificationsEnabled: true,
    theme: 'light',
    rsvps: {},
    preferences: INITIAL_USER.preferences
  },
  {
    name: 'Stephan Kokai',
    greeting: 'Hei Stephan',
    email: 'menighetsrad@hovag-kirke.no',
    phone: '+47 908 12 345',
    role: 'ADMIN',
    roleTitle: 'Menighetsrådsleder (Full publiseringsrett)',
    managedEntities: ['kirke', 'bedehus', 'push'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    notificationsEnabled: true,
    theme: 'light',
    rsvps: { 'event-1': 'Ja' },
    preferences: INITIAL_USER.preferences
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    title: 'Høymesse med dåp & nattverd',
    entityTag: 'kirke',
    eventType: 'GUDSTJENESTE',
    requiresRSVP: false,
    canAddToCalendar: true,
    dayShort: 'SØN',
    dayNumber: '6',
    time: 'kl. 11:00',
    location: 'Høvåg kirke',
    attendeesCount: 52,
    categoryTag: 'Gudstjeneste',
    isHero: true,
    isFeaturedByChurch: true,
    featuredReason: 'Presentasjonsgudstjeneste for nye konfirmanter',
    description: 'Høymesse i vår 800 år gamle steinkirke. Vikarprest Charlotte Hansen Meszaros leder gudstjenesten. Presentasjon av konfirmantkullet med trommerytme og catwalk, utdeling av dåpslys og kirkekaffe i våpenhuset.',
    speaker: 'Charlotte Hansen Meszaros',
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'event-tarnagent',
    title: 'Tårnagenthelg (3.–4. trinn)',
    entityTag: 'kirke',
    eventType: 'REGISTRATION_EVENT',
    requiresRSVP: true,
    canAddToCalendar: true,
    dayShort: 'LØR',
    dayNumber: '12',
    time: 'kl. 11:00 – 15:00',
    location: 'Høvåg kirke',
    attendeesCount: 24,
    categoryTag: 'Familie',
    description: 'Lørdagssamling for tårnagenter! Mysteriet om «Det stjålne kirkesølvet» og Sakkeus, rebusløp i kirketårnet, sanseløyper og agentoppdrag før søndagens gudstjeneste.',
    speaker: 'Raimond Bruseland & Trosopplæringsteamet'
  },
  {
    id: 'event-2',
    title: 'PUSH Ungdomskveld: Taco & Lovsang',
    entityTag: 'push',
    eventType: 'REGISTRATION_EVENT',
    requiresRSVP: true,
    canAddToCalendar: true,
    dayShort: 'LØR',
    dayNumber: '12',
    time: 'kl. 19:30 – 23:00',
    location: 'Høvåg bedehus',
    attendeesCount: 38,
    categoryTag: 'Ungdom',
    description: 'Lørdagsklubb for alle fra 8. klasse og oppover. Toastkiosk, brettspill, lovsang, temakveld og andakt ved Monica Gislefoss.',
    speaker: 'Monica Gislefoss & PUSH-styret'
  },
  {
    id: 'event-skattejakt',
    title: 'Skattejakt: Holmetur for 7. trinn',
    entityTag: 'kirke',
    eventType: 'REGISTRATION_EVENT',
    requiresRSVP: true,
    canAddToCalendar: true,
    dayShort: 'LØR',
    dayNumber: '19',
    time: 'kl. 10:30 – 16:00',
    location: 'Skjærgården i Høvåg (Blindleia)',
    attendeesCount: 19,
    categoryTag: 'Ungdom',
    description: 'Båttur i Blindleia ut til holme. Bibelposter, grilling, «Martin Luthers tårnopplevelse og nåden», bønnevandring og forberedelse til ungdomsskolen.',
    speaker: 'Trosopplærer & Monica Gislefoss'
  },
  {
    id: 'event-4',
    title: 'Høvåg-basaren 2026 (Floke A)',
    entityTag: 'bedehus',
    eventType: 'REGISTRATION_EVENT',
    requiresRSVP: true,
    canAddToCalendar: true,
    dayShort: 'LØR',
    dayNumber: '19',
    time: 'kl. 13:00 – 17:30',
    location: 'Høvåg bedehus',
    attendeesCount: 110,
    categoryTag: 'Dugnad',
    description: 'Årets store menighetsbasar! Åresalg, kransekakelotteri, lapskaus, kaker og fellesskap til inntekt for menighetsarbeidet og bedehuset. Over 100 frivillige i sving!',
    speaker: 'Harald Avtjern & Basarkomiteen'
  },
  {
    id: 'event-minikonfirmant',
    title: 'Minikonfirmantleir i Kirkeparken (8. trinn)',
    entityTag: 'kirke',
    eventType: 'REGISTRATION_EVENT',
    requiresRSVP: true,
    canAddToCalendar: true,
    dayShort: 'FRE',
    dayNumber: '25',
    time: 'kl. 17:00 – LØR 12:00',
    location: 'Kirkeparken v/ Høvåg kirke',
    attendeesCount: 22,
    categoryTag: 'Konfirmant',
    description: 'Teltleir i kirkeparken for 8. klassinger! Grønn diakoni, grilling, bålpanne med andakt, fjorårskonfirmanter forteller, og innføring i Passord-tradisjonen.',
    speaker: 'Monica Gislefoss & Trosopplæringsteamet'
  },
  {
    id: 'event-barnetimen',
    title: 'Barnetimen m/ Tore Thomassen',
    entityTag: 'kirke',
    eventType: 'REGISTRATION_EVENT',
    requiresRSVP: false,
    canAddToCalendar: true,
    dayShort: 'LØR',
    dayNumber: '26',
    time: 'kl. 11:30 – 13:00',
    location: 'Høvåg kirke',
    attendeesCount: 45,
    categoryTag: 'Familie',
    description: 'Glad samling for 5–7 åringer med Tore Thomassen! Sanger, vitser, konkurranse i kirkebenkene, bursdagsgave og boller og saft etterpå.',
    speaker: 'Tore Thomassen'
  },
  {
    id: 'event-3',
    title: 'Formiddagstreff 70+',
    entityTag: 'bedehus',
    eventType: 'REGISTRATION_EVENT',
    requiresRSVP: true,
    canAddToCalendar: true,
    dayShort: 'FRE',
    dayNumber: '2',
    time: 'kl. 11:30 – 13:30',
    location: 'Høvåg bedehus',
    attendeesCount: 36,
    categoryTag: 'Senior',
    description: 'Hyggelig fellesskap for eldre med kaffe, smørbrød, allsang og kåseri. Harald Avtjern og Nine Justvik ønsker velkommen.',
    speaker: 'Harald Avtjern & Nine Justvik'
  },
  {
    id: 'event-haplop',
    title: 'HÅP-løpet for Ecuador (IL Høvdingen)',
    entityTag: 'kirke',
    eventType: 'REGISTRATION_EVENT',
    requiresRSVP: true,
    canAddToCalendar: true,
    dayShort: 'LØR',
    dayNumber: '10',
    time: 'kl. 12:00 – 15:00',
    location: 'Høvåghallen & Idrettsplassen',
    attendeesCount: 165,
    categoryTag: 'Misjon',
    description: 'Sponsorløp i samarbeid med IL Høvdingen til inntekt for Misjonsalliansens prosjekt i Ecuador (hvor misjonærfamilien har base i Høvåg). Runder for både små og store!',
    speaker: 'IL Høvdingen & Menighetsrådet'
  },
  {
    id: 'event-lysvaken',
    title: 'Lys Våken & Kristuskransen (5.–6. trinn)',
    entityTag: 'kirke',
    eventType: 'REGISTRATION_EVENT',
    requiresRSVP: true,
    canAddToCalendar: true,
    dayShort: 'LØR',
    dayNumber: '28',
    time: 'kl. 17:00 – SØN 12:30',
    location: 'Høvåg kirke',
    attendeesCount: 26,
    categoryTag: 'Familie',
    description: 'Overnatting i kirka! Refleksløype i mørket med refleksengler, lage egne Kristuskrans-armbånd, tenning av 1. adventslys og feiring av kirkens nyttår.',
    speaker: 'Raimond Bruseland & Trosopplæringsteamet'
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-motto',
    title: 'Vår visjon: «Hele mennesket, hele menigheten, hele bygda»',
    entityTag: 'kirke',
    content: 'Korsveis 4 veivisere er lagt til grunn for trosopplæringen og menighetsarbeidet i Høvåg: 1. Søke Jesus Kristus. 2. Bygge fellesskap. 3. Leve enklere. 4. Fremme rettferdighet.',
    authorName: 'Stephan Kokai',
    authorRole: 'Menighetsrådsleder',
    timeAgo: '1t siden',
    createdAt: new Date().toISOString(),
    isUnread: true
  },
  {
    id: 'ann-1',
    title: 'Velkommen til presentasjonsgudstjeneste',
    entityTag: 'kirke',
    content: 'Søndag kl. 11:00 ønsker vi årets konfirmanter velkommen i Høvåg kirke. Vikarprest Charlotte Hansen Meszaros forretter. Kirkekaffe og mingling i våpenhuset etterpå.',
    authorName: 'Charlotte Hansen Meszaros',
    authorRole: 'Vikarprest',
    timeAgo: '3t siden',
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    isUnread: true
  },
  {
    id: 'ann-trosopplaering',
    title: 'Trosopplæringsplanen for 0–18 år er oppdatert',
    entityTag: 'kirke',
    content: 'Fra Babysamling og Krøllekvelder via Tårnagenter og Skattejakt i Blindleia, til Konfirmanttid på Evjetun og Ledertrening. Sjekk ut årshjulet under Hurtigvalg!',
    authorName: 'Raimond Bruseland',
    authorRole: 'Trosopplærer & Kirketjener',
    timeAgo: '1d siden',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isUnread: false
  },
  {
    id: 'ann-2',
    title: 'Dugnad og forberedelser til Høvåg-basaren',
    entityTag: 'bedehus',
    content: 'Basaren på bedehuset nærmer seg med stormskritt! Vi trenger hjelp til rigging, kaféservering og åresalg. Meld deg gjerne på vaktlisten under tjenester.',
    authorName: 'Harald Avtjern',
    authorRole: 'Daglig leder Bedehus',
    timeAgo: '1d siden',
    createdAt: new Date(Date.now() - 90000000).toISOString(),
    isUnread: false
  },
  {
    id: 'ann-3',
    title: 'PUSH Ungdom: Lørdagssamlinger på Bedehuset!',
    entityTag: 'push',
    content: 'PUSH møtes hver lørdag kl. 19:30–23:00 på Høvåg bedehus. Toast i kiosken, leker, lovsang og fellesskap. Reball-fredager arrangeres månedlig for alle fra 8. trinn!',
    authorName: 'Monica Gislefoss',
    authorRole: 'Ungdomsleder PUSH',
    timeAgo: '2d siden',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    isUnread: false
  },
  {
    id: 'ann-4',
    title: 'Høvåg kirke har fått sitt første flygel!',
    entityTag: 'kirke',
    content: 'En stor takk til Arbeidsstua på Høvågheimen v/ Anne Grete Stangeland for gaven på 190.000 kr som sikret et flott Yamaha-flygel til kirkerommet. Organist Helge Hodøl gleder seg til å ta det i bruk.',
    authorName: 'Stephan Kokai',
    authorRole: 'Menighetsrådsleder',
    timeAgo: '3d siden',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    isUnread: false
  }
];

export const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: 'p-1',
    title: 'Forbønn for årets konfirmanter og Evjetun-leiren',
    content: 'Be for konfirmantene i Høvåg, deres hjemmegrupper, leir på Evjetun og lederne som følger dem opp.',
    author: 'Raimond Bruseland',
    isAnonymous: false,
    prayersCount: 34,
    hasPrayed: false,
    timeAgo: '2t siden'
  },
  {
    id: 'p-2',
    title: 'Stille forbønn i en vanskelig livssituasjon',
    content: 'Ber om fred, styrke og trøst i en krevende tid med sykdom i familien.',
    author: 'Anonym',
    isAnonymous: true,
    prayersCount: 25,
    hasPrayed: true,
    timeAgo: '1d siden'
  },
  {
    id: 'p-3',
    title: 'For misjonærfamilien vår i Ecuador (Misjonsalliansen)',
    content: 'Be for arbeidet blant barn og unge i Ecuador, og for årets HÅP-løp i Høvåg.',
    author: 'Johan Berglihn',
    isAnonymous: false,
    prayersCount: 19,
    hasPrayed: false,
    timeAgo: '2d siden'
  }
];

export const INITIAL_IDEAS: IdeaItem[] = [
  {
    id: 'i-1',
    title: 'Utendørs familiekveld på kirkebakken',
    description: 'Hva med en felles grilling og filmkveld for alle generasjoner på kirkebakken i august?',
    author: 'Odd Anders Kjøstvedt',
    category: 'Arrangement',
    votesCount: 28,
    hasVoted: false,
    timeAgo: '2d siden'
  },
  {
    id: 'i-2',
    title: 'Innsamling til diakonale vedsekker',
    description: 'Organisere en felles vedkappedugnad for å fylle opp lageret med tørr fyringsved til trengende eldre i bygda.',
    author: 'Nine Justvik',
    category: 'Diakoni',
    votesCount: 35,
    hasVoted: true,
    timeAgo: '3d siden'
  }
];

export const INITIAL_PODCASTS: PodcastEpisode[] = [
  {
    id: 'pod-1',
    title: 'Presten og montøren: Å finne fotfeste i en urolig tid',
    speaker: 'Odd Anders & Kathrine',
    date: '20. juli 2026',
    duration: '28 min',
    description: 'En ærlig og jordnær samtale om tro, tvil og hvordan finne ro og fellesskap i lokalmiljøet.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 'pod-2',
    title: 'Presten og montøren: Hva er menighetens oppdrag?',
    speaker: 'Odd Anders & Stephan Kokai',
    date: '10. juli 2026',
    duration: '34 min',
    description: 'Om frivillighet, menighetsrådets arbeid og kirke–bedehus-samarbeidet i Høvåg.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 'pod-3',
    title: 'Presten og montøren: Fra Nidaros til Høvåg kirke',
    speaker: 'Odd Anders & Terje Skjerdal',
    date: '28. juni 2026',
    duration: '31 min',
    description: 'Kirkehistorie, jubileumsboken og 800 år med kristent fellesskap i bygda.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

export const INITIAL_GROUPS: GroupItem[] = [
  {
    id: 'g-1',
    name: 'PUSH Ungdomsmiljø (8. klasse+)',
    entityTag: 'push',
    category: 'Ungdom',
    description: 'Ungdomsfellesskapet i Høvåg ledet av Monica Gislefoss. Sosiale kvelder, lovsang, mat og fellesskap på bedehuset hver lørdag.',
    memberCount: 48,
    isJoined: true,
    meetingTime: 'Lørdager kl. 19:30 – 23:00',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g-tarnagenter',
    name: 'Tårnagentene (3.–4. trinn)',
    entityTag: 'kirke',
    category: 'Trosopplæring',
    description: 'For 3. og 4. klassinger. Mysterieløsning i kirka, sanseløyper og utforsking av kirketårnet.',
    memberCount: 24,
    isJoined: false,
    meetingTime: 'Helgesamlinger & Tårnagenthelg',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g-konfirmanter',
    name: 'Konfirmantene 2026/27',
    entityTag: 'kirke',
    category: 'Konfirmant',
    description: 'Årets konfirmantkull. Tirsdagssamlinger med Passord og pizzaboller, leir på Evjetun og hjemmegrupper.',
    memberCount: 26,
    isJoined: false,
    meetingTime: 'Tirsdager etter skoletid',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g-miniklang',
    name: 'Miniklang Barnekor (1.–7. trinn)',
    entityTag: 'kirke',
    category: 'Musikk',
    description: 'Glad sang og musikkglede for barn i Høvåg under dirigent Maren Hamre. Deltar på familiegudstjenester og julespill.',
    memberCount: 32,
    isJoined: false,
    meetingTime: 'Annenhver mandag kl. 17:00 på bedehuset',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g-etterskoletid',
    name: 'Etter Skoletid (5.–7. trinn)',
    entityTag: 'bedehus',
    category: 'Trosopplæring',
    description: 'Annenhver uke på bedehuset med lekser, varmt måltid, andakt og aktiviteter.',
    memberCount: 28,
    isJoined: false,
    meetingTime: 'Annenhver torsdag kl. 14:00 – 16:30',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g-jenteforening',
    name: 'Jenteforeningen (1.–4. trinn)',
    entityTag: 'bedehus',
    category: 'Trosopplæring',
    description: 'Møte annenhver uke på bedehuset med måltid, andakt og hobbyaktiviteter.',
    memberCount: 18,
    isJoined: false,
    meetingTime: 'Annenhver onsdag kl. 17:00',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g-ledertrening',
    name: 'Ledertrening for Ungdom (10. trinn+)',
    entityTag: 'push',
    category: 'Ungdom',
    description: '4 kursmoduler med ledelse og trygg frivillighet. Gir formelt kursbevis til CV og lederpraksis i PUSH og leir.',
    memberCount: 14,
    isJoined: false,
    meetingTime: 'Månedlige samlinger',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g-krik',
    name: 'KRIK Høvåg (16 år+)',
    entityTag: 'kirke',
    category: 'Sport',
    description: 'Idrettsglede og kristent fellesskap annenhver søndag kveld i Høvåghallen.',
    memberCount: 22,
    isJoined: false,
    meetingTime: 'Annenhver søndag kl. 20:00 i Høvåghallen',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g-2',
    name: 'Bedehusfellesskapet & Bønnegruppa',
    entityTag: 'bedehus',
    category: 'Bønn',
    description: 'Felles bønn, sang og åpent fellesskap på Høvåg bedehus ledet av Harald Avtjern og Johan Berglihn.',
    memberCount: 22,
    isJoined: true,
    meetingTime: 'Tirsdager kl. 19:30 & lørdager 08:00',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g-3',
    name: 'Påskespill-ensemblet (67 aktører)',
    entityTag: 'kirke',
    category: 'Kultur',
    description: 'Skuespillere, musikere, sangere og scenearbeidere som formidler påskens budskap i Høvåg kirke.',
    memberCount: 67,
    isJoined: false,
    meetingTime: 'Torsdager kl. 18:00',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'g-6',
    name: 'Besøksvenntjenesten i Høvåg (Høvågheimen)',
    entityTag: 'kirke',
    category: 'Diakoni',
    description: 'Frivillige som besøker eldre og hjemmebundne. Koordineres av Nine Justvik mot visjonen «Norges beste sted å bli gammel».',
    memberCount: 14,
    isJoined: false,
    meetingTime: 'Månedlig samling',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=300'
  }
];

export const INITIAL_CHANNELS: ChatChannel[] = [
  {
    id: 'ch-1',
    name: 'Hovedkanalen',
    description: 'Felles samtalekanal for hele Høvåg Menighet.',
    unreadCount: 1,
    lastMessage: 'Gleder meg til søndagens gudstjeneste!',
    lastMessageTime: '10:42',
    messages: [
      {
        id: 'm-1',
        senderName: 'Harald Avtjern',
        senderAvatar: 'H',
        senderRole: 'Leder Bedehus',
        text: 'Minner om at kirkekaffen og basarforberedelsene trenger et par ekstra kakebakere til helgen!',
        timestamp: 'I går 16:30',
        isMe: false
      },
      {
        id: 'm-2',
        senderName: 'Odd Anders',
        senderAvatar: 'O',
        senderRole: 'Medlem',
        text: 'Takk Harald, jeg kan ta med en eplekake.',
        timestamp: 'I går 17:15',
        isMe: true
      },
      {
        id: 'm-3',
        senderName: 'Monica Gislefoss',
        senderAvatar: 'M',
        senderRole: 'Leder PUSH',
        text: 'Gleder meg til søndagens gudstjeneste!',
        timestamp: '10:42',
        isMe: false
      }
    ]
  },
  {
    id: 'ch-2',
    name: 'Frivillige & Medhjelpere',
    description: 'Koordinering av frivilligoppgaver.',
    unreadCount: 0,
    lastMessage: 'Vaktlisten for august er klar.',
    lastMessageTime: 'I går',
    messages: [
      {
        id: 'm-201',
        senderName: 'Stephan Kokai',
        senderAvatar: 'S',
        senderRole: 'Menighetsrådsleder',
        text: 'Vaktlisten for gudstjenester og arrangementer er oppdatert. Sjekk gjerne at tidspunktene passer for deg.',
        timestamp: 'I går 14:20',
        isMe: false
      }
    ]
  }
];

export const INITIAL_DIAKONI_REQUESTS: DiakoniRequestItem[] = [
  {
    id: 'dia-1',
    category: 'ved',
    categoryLabel: 'Vedlevering / Hjelp til oppvarming',
    name: 'Berit (82)',
    contact: 'Tlf: 901 22 334',
    message: 'Trenger en sekk tørr bjørkeved båret opp til verandaen før vinteren setter inn.',
    isConfidential: true,
    createdAt: 'I går kl. 14:15',
    status: 'under_behandling'
  },
  {
    id: 'dia-2',
    category: 'samtale',
    categoryLabel: 'Fortrolig samtale / Sjelesorg',
    name: 'Anonym henvendelse',
    contact: 'E-post: kontakt@privat.no',
    message: 'Går gjennom et vanskelig tap i familien, ønsker en rolig samtale med prest eller diakon.',
    isConfidential: true,
    createdAt: '2 dager siden',
    status: 'mottatt'
  }
];

export const INITIAL_SERVICE_ROTAS: ServiceRotaItem[] = [
  {
    id: 'rota-1',
    title: 'Gudstjeneste m/ Nattverd',
    entityTag: 'kirke',
    dayShort: 'SØN',
    dayNumber: '15',
    monthShort: 'JUN',
    time: 'kl. 11:00 – 12:30',
    location: 'Høvåg kirke',
    shifts: [
      {
        id: 'shift-1-1',
        roleName: 'Kirkevert',
        roleDescription: 'Møt 30 min før. Del ut salmebøker, ønsk kirkegjengerne velkommen og tell oppmøte.',
        assignedToName: 'Lars Skoland',
        assignedToAvatar: 'L',
        isCurrentUser: false,
        swapRequested: true // Active swap in pool!
      },
      {
        id: 'shift-1-2',
        roleName: 'Klokker',
        roleDescription: 'Bistå prest under dåp og nattverd, samt ringe med kirkeklokkene ved inngang og utgang.',
        assignedToName: null,
        isCurrentUser: false
      },
      {
        id: 'shift-1-3',
        roleName: 'Tekstleser',
        roleDescription: 'Lese dagens epistel- eller evangelietekst fra lesepulten under gudstjenesten.',
        assignedToName: 'Odd Anders',
        assignedToAvatar: 'O',
        isCurrentUser: true,
        swapRequested: false
      },
      {
        id: 'shift-1-4',
        roleName: 'Kirkekaffe & Servering',
        roleDescription: 'Trakte kaffe og sette frem kjeks/kake i våpenhuset etter gudstjenesten.',
        assignedToName: null,
        isCurrentUser: false
      }
    ]
  },
  {
    id: 'rota-2',
    title: 'PUSH Ungdomskveld & Kafé',
    entityTag: 'push',
    dayShort: 'ONS',
    dayNumber: '18',
    monthShort: 'JUN',
    time: 'kl. 18:30 – 21:00',
    location: 'Høvåg kirkesenter',
    shifts: [
      {
        id: 'shift-2-1',
        roleName: 'Kiosk & Kjøkkenansvarlig',
        roleDescription: 'Stå i kiosken, steke toast og passe på at lokalet holdes ryddig og trivelig.',
        assignedToName: 'Monica Gislefoss',
        assignedToAvatar: 'M',
        isCurrentUser: false
      },
      {
        id: 'shift-2-2',
        roleName: 'Lyd & Lys / Musikk',
        roleDescription: 'Styre mikrofoner, projektor og musikkavspilling under samlingen.',
        assignedToName: null,
        isCurrentUser: false
      },
      {
        id: 'shift-2-3',
        roleName: 'Aktivitetsleder / Spill',
        roleDescription: 'Igangsette enkle sosiale leker, brettspill eller turnering for ungdommene.',
        assignedToName: null,
        isCurrentUser: false
      }
    ]
  },
  {
    id: 'rota-3',
    title: 'Bedehuset: Bønnemøte & Fellesskap',
    entityTag: 'bedehus',
    dayShort: 'FRE',
    dayNumber: '20',
    monthShort: 'JUN',
    time: 'kl. 19:00 – 20:30',
    location: 'Høvåg bedehus',
    shifts: [
      {
        id: 'shift-3-1',
        roleName: 'Møteleder',
        roleDescription: 'Ønske velkommen, lede sangene og fordele bønneemnene i fellesskapet.',
        assignedToName: 'Harald Avtjern',
        assignedToAvatar: 'H',
        isCurrentUser: false
      },
      {
        id: 'shift-3-2',
        roleName: 'Kaffevert / Kakebaker',
        roleDescription: 'Koke kaffe/te og sette frem litt kaffemat til den sosiale delen etter møtet.',
        assignedToName: null,
        isCurrentUser: false
      }
    ]
  },
  {
    id: 'rota-4',
    title: 'Høvåg-basaren Rigging & Kafé',
    entityTag: 'bedehus',
    dayShort: 'LØR',
    dayNumber: '21',
    monthShort: 'JUN',
    time: 'kl. 13:00 – 17:00',
    location: 'Høvåg bedehus',
    shifts: [
      {
        id: 'shift-4-1',
        roleName: 'Åresalg & Loddsalg',
        roleDescription: 'Selge årer og lodd til inntekt for menighetsarbeidet.',
        assignedToName: null,
        isCurrentUser: false
      },
      {
        id: 'shift-4-2',
        roleName: 'Kafévert & Servering',
        roleDescription: 'Servere kaffe, kaker og lapskaus under basaren.',
        assignedToName: null,
        isCurrentUser: false
      },
      {
        id: 'shift-4-3',
        roleName: 'Opprydding & Rigging',
        roleDescription: 'Hjelpe til med å rydde bord, stoler og feie lokalet etter basaren.',
        assignedToName: null,
        isCurrentUser: false
      }
    ]
  }
];
