# Kommende arrangementer — Høyde og toppjustering av topprad-piller

Denne planen tar for seg justering av den øverste raden i arrangementskortene under «Kommende arrangementer», slik at datopillen, stedspillen og handlingsknappen («Meld på» / «Kalender») får lik vertikal høyde, todelt datovisning og presis toppjustering langs samme linje.

## User Review & Critical Decisions

> [!IMPORTANT] Alle avklarende designvalg er bekreftet av brukeren og låst for gjennomføring. Ingen andre deler av grensesnittet (som Hero-kortet eller Fullskjerm-topplinjen) endres i denne runden.

- **Confirmed Decision 1 (Datopillens format):** Todelt pille (`LØR` over `12`) med full høyde gjeninnføres i stedet for den komprimerte enlinjes-pillen.
- **Confirmed Decision 2 (Høyde og justering):** Alle tre pillene i toppraden — Datopille, Stedspille og handlingsknapp («Meld på» / «Påmeldt» / «Kalender» / «I kalender») — får lik vertikal høyde og toppjusteres (`items-start`) på samme horisontale linje.
- **Confirmed Decision 3 (Avgrensning):** Endringen begrenses utelukkende til kortene i «Kommende arrangementer».

## 1. Overview & Core Concept

- **What It Does:** Gjør den øverste handlings- og metadata-raden i hvert arrangementskort visuelt balansert og berøringsvennlig. Datomerket viser ukedag og dagnummer stablet vertikalt, stedspillen matcher samme høyde med tydelig ikon og stedsetikett, og primærknappen på høyre side matcher høyden eksakt.
- **Target Audience / Persona:** Menighetsmedlemmer og frivillige på mobil (375px–430px bredde) som skanner kommende arrangementer raskt med én hånd.
- **Key Value:** Forhindrer at datopillen og «Meld på»-knappen krympes i y-aksen, fjerner ujevn vertikal forskyvning langs overkanten, og bevarer full bredde for arrangementstittel og tid/sted-informasjon under.

## 2. User Experience & Visual Design

- **Key User Flows:**
  1. Brukeren ser «Kommende arrangementer» på hjemskjermen.
  2. Hvert kort har én ryddig topprad hvor overkanten og underkanten til Datopille, Stedspille og «Meld på»-/«Kalender»-knapp flukter eksakt langs en felles horisontal akse.
  3. Trykk på handlingsknappen registrerer eller fjerner påmelding (eller legger til/fjerner i kalender) uten at hele kortet utløses; trykk ellers på kortet åpner detaljvisning.
- **Visual Identity & Theme:**
  - *Aesthetic Direction:* Ren, taktil og kontraststerk mobilkort-estetikk tilpasset utendørs lesbarhet.
  - *Color Palette & Mood:* Hvit kortflate (`bg-white`) med subtil hårlinjekant på lys grå bakgrunn (`#f4f5f8`), enhetsfargede overflater for datopille og stedspille (himmelblå for kirke, smaragdgrønn for bedehus, lilla for PUSH), og mettet oransje (`bg-orange-600`) for aktiv «Meld på»-handling samt smaragdgrønn bekreftelsestilstand når brukeren er påmeldt.
  - *Typography & Hierarchy:* Tydelig tallvekt (`font-black`, `tabular-nums` for dagnummer) i den todelte datopillen (`text-[10px]` ukedag over `text-sm` tall), konsis enkeltlinjet tekst (`whitespace-nowrap`) i stedspille og handlingsknapp, og fullbreddes tittel + tid/sted under med god linjeavstand.
  - *Component Styling & Layout (Touch & Spatial Math):*
    - Felles fast/minimum høyde på `44px` (`h-11` / `min-h-[44px]`) for alle tre elementene i toppraden, noe som både gjenoppretter opprinnelig vertikal størrelse og oppfyller mobilstandarden for 44px berøringsmål.
    - Toppraden bruker `items-start justify-between` slik at overkantene alltid starter på samme y-koordinat selv under trange skjermforhold.
    - Todelt datopille (`w-11 h-11`) med avrundede hjørner (`rounded-xl`) og sentrert stabling (`flex-col items-center justify-center`), stedspille med `h-11` og balansert horisontal padding (`px-3`), og handlingsknapp med `h-11 px-3.5 rounded-xl`.
    - Kortets ytre padding (`14px`–`16px`) og vertikale mellomrom (`gap-2.5`) mellom topprad og tekstblokk sikrer luftig rytme uten avkutting.
- **Interactive Feedback & Motion:**
  - Taktil skalering (`active:scale-95`) på handlingsknapper og subtil kortrespons (`active:scale-[0.99]`) med overgang under 150ms.

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Felles 44px høyde (`h-11`) på alle tre pillene i toppraden**
  - *Chosen Approach:* Sette eksplisitt `h-11` (44px) på Datopille, Stedspille og «Meld på»-/«Kalender»-knapp innenfor en `items-start`-justert rad.
  - *Why:* 44px tilsvarer nøyaktig høyden til den opprinnelige todelte datobadgen (`w-11 h-11`), gir en behagelig berøringsflate på mobil, og garanterer at både topp- og bunnlinjen på alle tre elementene flukter uten millimeteravvik.
  - *Alternatives Considered:* Å strekke en énlinjes datopille til 38px–40px ble forkastet fordi todelt visning (`LØR` over `12`) utnytter den vertikale høyden langt bedre og er lettere å lese raskt.
- **Decision 2: Skille mellom kompakt og fullhøyde stedspille via prop**
  - *Chosen Approach:* La stedspille-komponenten beholde sin kompakte standardstørrelse der den brukes inni tette overskrifter (som på Hero-kortet), men støtte en høyde-tilpasset variant for toppraden i «Kommende arrangementer».
  - *Why:* Unngår utilsiktede endringer i Hero-kortet eller andre visninger samtidig som toppraden i arrangementslisten får identisk høyde på alle tre elementer.

## 4. Technical Architecture & Data Strategy

- **Architecture & Component Diagram:**

```text
┌────────────────────────────────────────────────────────────────┐
│                  Kommende arrangementer-seksjon                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Arrangementskort (flex-col, gap-2.5)                     │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │ Topprad (flex items-start justify-between, h-11)   │  │  │
│  │  │                                                    │  │  │
│  │  │  ┌────────┐  ┌─────────────────┐     ┌──────────┐  │  │  │
│  │  │  │  LØR   │  │  [Ikon] Sted    │     │  Meld på │  │  │  │
│  │  │  │   12   │  │     (h-11)      │     │  (h-11)  │  │  │  │
│  │  │  └────────┘  └─────────────────┘     └──────────┘  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                          │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │ Fullbreddes tekstinnhold                           │  │  │
│  │  │  Tittel (fet, uavkortet)                           │  │  │
│  │  │  Tidspunkt · Sted (sekundær tekst)                 │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
            ▲                             │
            │ filtrert liste & RSVP-status│ klikk -> setRsvp / detaljmodal
            └─────────────────────────────▼
               Global applikasjonstilstand (Zustand)
```

- **Data Model & State:** Bruker eksisterende hendelsesliste, aktivt enhetsfilter, brukerens preferanser og RSVP-kart (`user.rsvps`) fra global tilstand uten endringer i datamodellen.
- **Interactive Component & State Mapping:**
  - *Datopille (statisk visning i kortet):* Viser `dayShort` over `dayNumber` med enhetsmatchet fargepalett i `44×44px` todelt boks.
  - *Stedspille (statisk enhetsmerke):* Viser enhetsikon og stedsnavn med `h-11` høyde på samme toppjusterte linje, uten å endre utseendet i andre komponenter.
  - *Handlingsknapp («Meld på» / «Påmeldt» / «Kalender» / «I kalender»):* Har `h-11` høyde, stopper klikk-bobling til kortet, og kaller `setRsvp` for påmeldingsarrangementer eller veksler lokal kalenderstatus for åpne arrangementer.
  - *Kortflate:* Klikk på resten av kortet åpner arrangementsdetaljer i modal via `setSelectedEventModal`.
