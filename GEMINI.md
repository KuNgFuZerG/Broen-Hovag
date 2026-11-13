# Broen v2 — Prosjektdokumentasjon (GEMINI.md)

Dette dokumentet gir en helhetlig oversikt over applikasjonen **Broen v2** (Høvåg Menighet & Bedehus), inkludert teknologistack, mappestruktur og hvordan applikasjonens moduler og dataflyt henger sammen.

---

## 1. Oversikt og Formål

**Broen v2** er en fellesskaps- og koordineringsapplikasjon skreddersydd for lokale menigheter, med pilotering i **Høvåg menighet** og **Høvåg bedehus** i Lillesand kommune.

### Kjerneformål:
- **Samle fragmenterte kanaler:** Erstatte Spond (ungdom/PUSH), spredte Facebook-grupper, SMS-lister og fysiske oppslagstavler med én samlende flate.
- **Likeverdighet mellom Kirke og Bedehus:** Høvåg kirke (soknekirke i Den norske kirke) og Høvåg bedehus (selvstendig stiftelse *Høvåg Bedehus Sti*) samles i et felles økosystem med tydelig filtrering og identitet (`kirke`, `bedehus`, `push`).
- **Frivilligkoordinering (Floke A):** Selvhjulpen vaktfordeling og vaktbytte for gudstjenester (kirkevert, kirkekaffe, tekstleser), PUSH og store dugnader (Høvåg-basaren).
- **Diakoni & Åndelig innhold:** Lavterskel bønnevegg, «Anonym tanke til presten», integrert podkast-avspiller for *Presten og montøren*, trosopplæringsplan (0–18 år) og direkte diakonikontakt.

---

## 2. Teknologistack

Applikasjonen er bygget på en moderne web- og TypeScript-stack med fokus på rask ytelse, god typetrygghet og mobil-først brukeropplevelse:

| Område | Teknologi / Bibliotek | Versjon / Merknad |
|---|---|---|
| **Kjerne-rammeverk** | [React](https://react.dev/) | `^19.0.1` |
| **Programmeringsspråk** | [TypeScript](https://www.typescriptlang.org/) | `~5.8.2` |
| **Byggverktøy & Dev-server** | [Vite](https://vitejs.dev/) | `^6.2.3` med `@vitejs/plugin-react` (`^5.0.4`) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | `@tailwindcss/vite` (`^4.1.14`), konfigurert via `@import "tailwindcss";` |
| **Tilstandshåndtering (State)** | [Zustand](https://github.com/pmndrs/zustand) | `^5.0.14` (sentralisert klient-store i `useAppStore.ts`) |
| **Ikoner** | [Lucide React](https://lucide.dev/) | `^0.546.0` |
| **Animasjoner** | [Motion](https://motion.dev/) | `^12.23.24` |
| **AI / Gemini Integrasjon** | [@google/genai](https://www.npmjs.com/package/@google/genai) | `^2.4.0` |
| **Pakkehåndterer & Kjøremiljø** | Bun / Node.js | `bun.lock` foreligger, støtter både `bun` og `npm` |
| **Backend & Verktøy (Dev/Preview)** | Express / TSX | `express: ^4.21.2`, `tsx: ^4.21.0`, `dotenv: ^17.2.3` |

---

## 3. Mappestruktur

Prosjektet er organisert med en tydelig separasjon mellom skjermer, gjenbrukbare komponenter, modaler, datamodeller og global tilstand:

```
"d:/Antigravity Prosjekt - Høvåg Broen"
├── .aistudio/                     # AI Studio metadata og konfigurasjon
├── assets/                        # Statiske ressurser og interne eiendeler
├── public/
│   └── assets/aistudio/           # Skjermbilder og forhåndsvisningsbilder
├── src/
│   ├── components/                # Gjenbrukbare UI-komponenter
│   │   ├── modals/                # Overlegg / modaler for spesialfunksjoner
│   │   │   ├── DiakoniModal.tsx        # Diakoni, forbønn, samtale og praktisk bistand
│   │   │   ├── DonateModal.tsx         # Vipps- og kontoinformasjon for givertjeneste
│   │   │   ├── EventDetailModal.tsx    # Detaljvisning, kart, RSVP og «Tanke til presten»
│   │   │   ├── NewAnnouncementModal.tsx # Skjema for ny kunngjøring (tilgangsstyrt)
│   │   │   ├── NotificationsModal.tsx  # Varslingssenter
│   │   │   ├── PodcastModal.tsx        # Avspiller for "Presten og montøren"
│   │   │   ├── PrayerModal.tsx         # Bønnevegg med diskret bønn-teller
│   │   │   ├── PreferencesModal.tsx    # Tilpassing av varsler, kategorier og enheter
│   │   │   ├── ServiceRotaModal.tsx    # Vaktlister, vaktbytte og «ta denne tjenesten»
│   │   │   └── TrosopplaeringModal.tsx # Trosopplæringsplan & årshjul (0–18 år)
│   │   ├── AnnouncementsFeed.tsx  # Kunngjøringsstrøm med entitetsbrikker
│   │   ├── AppDrawer.tsx          # Sidemeny / drawer med rask tilgang til verktøy
│   │   ├── BottomTabBar.tsx       # 5 faste navigasjonsfaner i bunn
│   │   ├── EntityBadge.tsx        # Fargekodede merkelapper (Kirke, Bedehus, PUSH)
│   │   ├── EntityFilterBar.tsx    # Horisontal filterlinje for entiteter
│   │   ├── ExploreGrid.tsx        # Rutenett av snarveier på Hjem-skjermen
│   │   ├── FAB.tsx                # Floating Action Button for hurtigpublisering
│   │   ├── Header.tsx             # Topplinje med dato, profilbilde og varsler
│   │   ├── HeroEventCard.tsx      # Fremhevet hovedarrangement (f.eks. neste søndag)
│   │   ├── MobileFrame.tsx        # Rammekomponent som simulerer mobil / desktop
│   │   ├── ProfileAvatarUploader.tsx # Opplasting og forhåndsvisning av profilbilde
│   │   └── UpcomingEventsList.tsx # Horisontal eller vertikal liste over kommende hendelser
│   ├── data/
│   │   └── mockData.ts            # Kuraterte, realistiske data for Høvåg menighet
│   ├── screens/                   # Hovedskjermer knyttet til bunnfanene
│   │   ├── CalendarScreen.tsx     # Kalenderfane med månedsnavigasjon og dagvisning
│   │   ├── GrupperScreen.tsx      # Gruppefane for fellesskap, kor og bibelgrupper
│   │   ├── HomeScreen.tsx         # Hjemfane som orkestrerer hovedvisningen
│   │   ├── MessagesScreen.tsx     # Chatfane med kanaler og meldinger
│   │   └── ProfileScreen.tsx      # Profilfane med rollebytte, mine vakter og valg
│   ├── store/
│   │   └── useAppStore.ts         # Zustand state store for hele applikasjonen
│   ├── utils/
│   │   ├── permissions.ts         # Tilgangsregler og rettighetssjekker
│   │   └── roleManager.ts         # Normalisering av roller (USER, VOLUNTEER, LEADER, ADMIN)
│   ├── types.ts                   # Globale TypeScript-grensesnitt og typer
│   ├── App.tsx                    # Hovedkomponent: skall, ruter og globale modaler
│   ├── main.tsx                   # React DOM-startpunkt
│   └── index.css                  # Tailwind CSS v4 stylingimport
├── .env.example                   # Eksempel på miljøvariabler (GEMINI_API_KEY, APP_URL)
├── .gitignore                     # Git ignore-regler
├── bun.lock                       # Låsfil for Bun-avhengigheter
├── HANDOVER_BROEN_V2.md           # Bakgrunnsdokument og opprinnelig kravspesifikasjon
├── index.html                     # HTML-skall med viewport-meta for mobil
├── metadata.json                  # Prosjektmetadata
├── package.json                   # Prosjektavhengigheter og npm-skript
├── tsconfig.json                  # TypeScript-kompilatorkonfigurasjon
└── vite.config.ts                 # Vite-oppsett med Tailwind og React-plugins
```

---

## 4. Hvordan applikasjonen henger sammen

Applikasjonen er strukturert rundt en helhetlig arkitektur hvor visning, tilstand og tilgangsstyring er tett integrert:

### 4.1. Sentralisert Tilstandshåndtering (`useAppStore.ts`)
Alt av aktiv tilstand oppbevares i en felles Zustand-store (`src/store/useAppStore.ts`). Dette eliminerer "prop drilling" og sørger for umiddelbar respons på tvers av skjermer og modaler:
- **Aktiv navigasjon:** `activeTab` styrer hvilken skjerm (`HomeScreen`, `CalendarScreen`, `GrupperScreen`, `MessagesScreen`, `ProfileScreen`) som vises i `App.tsx`.
- **Entitetsfiltrering:** `activeEntityFilter` (`'alle' | 'kirke' | 'bedehus' | 'push'`) filtrerer arrangementer, kunngjøringer og grupper synkront.
- **Brukerprofil & Preferanser:** Lagrer innlogget bruker, følgte kategorier, RSVP-svar og tildelte vakter.
- **Arrangementer & RSVP:** Når en bruker endrer status på et arrangement (Ja / Kanskje / Nei), oppdateres deltakerantallet og brukerens personlige liste umiddelbart.
- **Tjenestelister & Vaktbytte (ServiceRotas):** Brukere kan ta ledige vakter (`claimShift`), be om bytte (`requestSwapShift`), overta vakter fra andre (`takeOverSwapShift`) eller frigi vakter.
- **Modaler:** Åpning og lukking av modaler (Diakoni, Podkast, Bønn, Trosopplæring, osv.) styres sentralt via `setActiveExploreModal`, `setSelectedEventModal`, m.fl.

### 4.2. Rammekonsept og Responsivitet (`MobileFrame.tsx`)
- Appen er designet "mobil-først". `MobileFrame` pakker grensesnittet inn i en interaktiv ramme med tre visningsmoduser: **iPhone**, **Android** og **Fullskjerm / Responsiv desktop**.
- I mobilrammen simuleres ekte statuslinjer, dynamiske hjørner og bunnområder for optimal testing av touch-interaksjon.

### 4.3. Navigasjon & Informasjonsarkitektur
1. **Topplinje (`Header.tsx`):**
   - Viser dagens dato og stedsidentifikator ("Høvåg menighet").
   - Gir tilgang til sidemenyen (`AppDrawer`), varslingssenteret (`NotificationsModal`) og snarvei til profil.
2. **Hovedskjermer (`src/screens/`):**
   - **Hjem (`HomeScreen`):** Neste gudstjeneste (`HeroEventCard`), kommende hendelser (`UpcomingEventsList`), snarveier (`ExploreGrid`) og nyhetsstrøm (`AnnouncementsFeed`).
   - **Kalender (`CalendarScreen`):** Månedsoversikt med dagsvelger og filtrering på både entitet og personlige kategoripreferanser.
   - **Grupper (`GrupperScreen`):** Fellesskap og aktiviteter med søk, inn-/utmelding og mulighet for ledere til å opprette nye grupper.
   - **Meldinger (`MessagesScreen`):** Lokale kanaler og samtaletråder for stab, frivillige og ungdomsledere.
   - **Profil (`ProfileScreen`):** Oversikt over egne påmeldte arrangementer, bekreftede dugnadsvakter, demo-brukerbytte og varslingsinnstillinger.
3. **Bunnmeny (`BottomTabBar.tsx`):**
   - Alltid tilgjengelig navigasjon mellom de fem hovedfanene med aktive indikatorer.
4. **Hurtighandling (`FAB.tsx`):**
   - Flytende handlingsknapp for rask opprettelse av kunngjøringer, bønneemner eller nye ideer.

### 4.4. Rolle- og Tilgangsstyring (`roleManager.ts` & `permissions.ts`)
Appen har et fleksibelt rettighetssystem som skiller mellom ulike ansvarsnivåer i menigheten:
- **`ADMIN` (Prest / Daglig leder):** Full rettighet til å publisere kunngjøringer for alle entiteter, opprette offisielle grupper og administrere diakonale henvendelser.
- **`LEADER` (Gruppeleder / Diakon / Ungdomsleder):** Kan publisere for sine tildelte entiteter (f.eks. PUSH eller Bedehus), administrere grupper og vakter.
- **`VOLUNTEER` (Frivillig):** Kan melde seg på vakter, be om vaktbytte og administrere egne tjenester.
- **`USER` (Menighetsmedlem / Gjest):** Lesetilgang, RSVP-påmelding, innsending av bønneemner og diakonale henvendelser.
- **Demo-brukerbytte:** I `ProfileScreen` kan utviklere og testere med ett klikk bytte mellom forhåndsdefinerte profiler (sokneprest, ungdomsleder, diakon, frivillig) for å teste ulike rettigheter.

### 4.5. Diakoni, Åndelig Liv & Trosopplæring
- **Diakoni (`DiakoniModal.tsx`):** Skjema for praktisk hjelp (matpose, ved, skyss, besøksvenn) og direkte kontaktmulighet med menighetens diakonipersoner.
- **Bønneboks & Presten:** Lavterskel bønnevegg med anonymitetsvalg og diskret «Jeg ber»-støtte, samt direkte spørsmål til søndagens preken.
- **Trosopplæring (`TrosopplaeringModal.tsx`):** Viser menighetens pedagogiske løp fra 0 til 18 år fordelt på alderstrinn (Babysamling, Krøllebok, 4-årsbok, Tårnagenter, Lys Våken, Konfirmasjon og Lederkurs).

---

## 5. Kjøring og Bygging

Prosjektet kan kjøres lokalt med standard npm- eller bun-skript:

```bash
# 1. Installer avhengigheter
npm install
# eller med bun:
bun install

# 2. Start utviklingsserver (kjører på port 3000)
npm run dev

# 3. Bygg for produksjon
npm run build

# 4. Typekontroll uten emitting
npm run lint
```
