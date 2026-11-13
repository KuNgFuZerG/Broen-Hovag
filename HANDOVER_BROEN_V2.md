# BROEN v2 — Master Handover & Context Document
**Dato:** 30. august 2026  
**Status:** Produksjonsklar prototype / Community MVP (Høvåg menighet & Høvåg Bedehus)  
**Kildegrunnlag:** Destillert fra 5 års menighetsblader, regnskap, møtepapirer og Obsidian-wikien.

---

## 1. Hva er Broen v2?

Broen v2 er en fellesskaps- og koordineringsapp skreddersydd for lokale menigheter. Første målgruppe og pilot er **Høvåg menighet** og **Høvåg bedehus** i Lillesand kommune.

### Kjerneformål:
1. **Erstatte fragmenterte kanaler**: Samle det som i dag er spredt på Spond (ungdom/PUSH), Facebook (algoritmestyrt), SMS-kjeder (påskespillet med 67 aktører) og fysiske oppslagstavler.
2. **Likeverdighet mellom Kirke og Bedehus**: Høvåg kirke (Den norske kirke, soknekirke) og Høvåg bedehus (selvstendig stiftelse *Høvåg Bedehus Sti*, org.nr. `984 841 620`) er to juridisk separate enheter med egne organisasjonsnumre og egne Vipps-avtaler. Appen må likevel oppleves som ett felles hjem med tydelig sted-filtrering.
3. **Frivilligkoordinering (Floke A)**: Enkel vaktfordeling og påmelding for store dugnader (Høvåg-basaren med ~100 frivillige, Påskespillet, kirkeverter, kirkekaffe).
4. **Lavterskel sjelesorg & åndelig innhold**:
   - «Anonym tanke til presten» (bønneboks før søndagens gudstjeneste — anonym for alle, presten svarer fra talerstolen).
   - Innebygd avspiller for den lokale podkasten **«Presten og montøren»** (Odd Anders & Kathrine / Stephan / Terje).
   - Direkte diakonikontakt (Nine Justvik for besøkstjeneste, Johan Berglihn for forbønn).

---

## 2. Nøkkelpersoner i Høvåg (Ekte aktører)

| Navn | Rolle i Høvåg | Relevans i appen |
|---|---|---|
| **Odd Anders Kjøstvedt** | Menighetsrådsmedlem (2023–27), podkastvert (*Presten og montøren*), prosjektets konsulent | Standard innlogget testbruker (`USER`), testperson på Android Pixel |
| **Monica Gislefoss** | Ungdomsleder (30 % stilling) siden aug. 2021 | Leder for **PUSH** (lørdager kl. 19:30, 30–40 ungdommer). Har bekreftet ønske om å forlate Spond |
| **Harald Avtjern** | Daglig leder for Høvåg bedehus (fra mai 2025, 40 % stilling), IT-bakgrunn | Forvalter bedehusets drift, basarer og bønnesamlinger |
| **Stephan Kokai** | Leder for menighetsrådet (2022–2027) | Formell portvokter for rådet, godkjenner kunngjøringer (`ADMIN`) |
| **Nine Justvik** | Menighetsrådsmedlem, koordinator for Besøksvenntjenesten på Høvågheimen | Diakonikontakt (tlf. `416 85 988`), visjonen «Norges beste sted å bli gammel» |
| **Kathrine Tallaksen Skjerdal** | Sokneprest (feiret 20 år i 2024), i permisjon hele 2026 med Olavstipendet | Vikarer i 2026: **Charlotte Hansen Meszaros** og **Andreas Mollestad Nilsen** |
| **Raimond Bruseland** | Trosopplærer & kirketjener | Koordinerer Guttegruppa, Tårnagenter og dåpsopplæring |
| **Maren Hamre** | Korleder / dirigent | Dirigent for Miniklang barnekor (1.–7. trinn, 32 barn) |
| **Johan Berglihn** | Redaksjonsmedlem, bønneleder på bedehuset | Leder forbønnsgruppen (tlf. `917 29 352`, tirsdager 06:00 / lørdager 08:00) |
| **Terje Skjerdal** | Redaktør av menighetsbladet (opplag ca. 1 050) | Forfatter av jubileumsboken (*Høvåg kirke – de første 800 årene*) |

---

## 3. Arkitektur & Teknologistack

- **Framework**: React 18+ med Vite & TypeScript.
- **Styling**: Tailwind CSS (mobil-først, testet i et iOS-inspirert mock-vindu og responsivt).
- **Ikoner**: `lucide-react`.
- **Farge- og tilgjengelighetskrav (WCAG AA)**:
  - Bakgrunner: Lys ren layout (`#f9fafb` / `#ffffff`).
  - Aksent: `#e8650a` (brukes på knapper og bakgrunner med hvit tekst for å bestå 3:1 for store elementer).
  - Normaltekst: Mørk kontrast (`#111827`, `#374151`) for å garantere 4,5:1 kontrastforhold.
- **Lagringsstrategi**:
  - Lokal klient-state med instant respons.
  - Forberedt for direkte binding mot Supabase / Firestore for sanntidsfunksjoner og RSVP.

---

## 4. De 5 Funksjonelle Pilarene (Community MVP Scope)

1. **Kalender & Stedfiltrering**:
   - Filter-knapper øverst: *Alle*, *Høvåg kirke*, *Høvåg bedehus*, *PUSH Ungdom*.
   - Kategoritags: `Gudstjeneste`, `Ungdom`, `Senior`, `Familie`, `Kultur`, `Bønn`, `Dugnad`, `Misjon`.
   - Én-klikks «Legg til i telefonens kalender» (.ics export / kalender-kobling).

2. **RSVP & Spond-erstatter**:
   - Enkel påmelding (*Ja / Kanskje / Nei*) med oppmøteteller.
   - Sanntidsvarsel og arrangementsdialog for deltakere.

3. **Frivilligkoordinering & Vaktlister (Floke A)**:
   - Skiftlister for gudstjenester (*kirkevert, tekstleser, kirkekaffe*), PUSH (*kiosk, lyd/lys*) og Høvåg-basaren (*åresalg, kafévert, opprydding*).
   - «Ta denne tjenesten» og «Be om bytte» rett i brukergrensesnittet.

4. **Kunngjøringer & Informasjonsflyt**:
   - Ekte nyheter fra staben (flygel-gave på 190k til kirken, råteskader i kirketaket, basarforberedelser).
   - Modal for publisering av nye kunngjøringer med tag-valg for kirke/bedehus/push.

5. **Åndelig innhold, Diakoni & Givertjeneste**:
   - Innebygd podcast-spiller for *«Presten og montøren»*.
   - «Anonym tanke til presten» med 500-tegns grense.
   - Bønnevegg med diskret «Jeg ber for dette»-teller.
   - Diakoni-modul med telefonknapper direkte til Nine Justvik og Johan Berglihn.
   - Vipps-modul med riktig oppsett: Vipps `#12 12 18` (med underkategorier for Kirkeoffer, Bedehus, PUSH, Misjon Madagaskar/Egypt) og gavekonto `3000.50.50169` for menighetsbladet.

---

## 5. Filstruktur i Prosjektet

```
├── src/
│   ├── components/
│   │   ├── AnnouncementsFeed.tsx    # Kunngjøringsstrøm med forfattere og filter
│   │   ├── BottomTabBar.tsx         # 5 faner: Hjem, Kalender, Grupper, Meldinger, Profil
│   │   ├── EntityBadge.tsx          # Visuelle piller for Kirke, Bedehus, PUSH
│   │   ├── EntityFilterBar.tsx      # Sted- og organisasjonsfiltrering
│   │   ├── ExploreGrid.tsx          # Raske snarveier (Bønn, Diakoni, Podcast, Gi, Vaktlister)
│   │   ├── FAB.tsx                  # Hurtigknapp for ny kunngjøring / bønn / idé
│   │   ├── Header.tsx               # Hovedheader med dato, profil og varselsbjelle
│   │   ├── HeroEventCard.tsx        # Fremhevet neste gudstjeneste / storsamling
│   │   ├── MobileFrame.tsx          # Ramme med enhets- og desktop-veksling
│   │   ├── UpcomingEventsList.tsx   # Liste over arrangementer med RSVP
│   │   └── modals/
│   │       ├── DiakoniModal.tsx     # Sjelesorg, besøksvenn og direkte kontakt
│   │       ├── DonateModal.tsx      # Vipps- og konto-overføringer
│   │       ├── EventDetailModal.tsx # Detaljvisning, kart, RSVP og «Tanke til presten»
│   │       ├── NewAnnouncementModal.tsx # Opprettelse av kunngjøringer
│   │       ├── NotificationsModal.tsx   # Varslingssenter
│   │       ├── PodcastModal.tsx     # «Presten og montøren»-avspiller
│   │       ├── PrayerModal.tsx      # Bønnevegg og forbønnsinnsending
│   │       ├── PreferencesModal.tsx # Innholds- og varslingsvalg
│   │       └── ServiceRotaModal.tsx # Frivillige tjenester og vaktlister
│   ├── data/
│   │   └── mockData.ts              # Ekte, kuratert datasett for Høvåg
│   ├── types.ts                     # TypeScript-definisjoner for hele domenet
│   ├── App.tsx                      # Hovedapplikasjon med tilstandshåndtering
│   ├── main.tsx                     # React DOM entry point
│   └── index.css                    # Tailwind CSS styling
```

---

## 6. Neste steg for V2 Videreutvikling

1. **Backend-kobling**: Koble `RSVP`, `prayer_requests`, `announcements` og `gudstjeneste_messages` til en persistent database (f.eks. Supabase eller Firestore).
2. **Push-varsler**: Knytte opp Expo / Web Push Notifications for påminnelse om vakter og nye kunngjøringer.
3. **V2.1 Donasjonsmotor (Fremtidig backlog)**: Automatisk avstemming av Vipps-transaksjoner mot 500-kronersgrensen for skattefradrag til Skatteetaten (rettet mot Fellesrådet).
