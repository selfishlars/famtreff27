# Projekt-Memory: famtreff27

Stand: 2026-08-01

> **WICHTIG: Diese Datei muss bei jeder relevanten Aenderung am Projekt aktuell gehalten werden.**
> Sobald sich Produktzustand, Datenmodell, Kostenlogik oder UI-Umfang aendern, ist dieser Stand
> im selben Arbeitsschritt zu aktualisieren (nicht erst bei der naechsten Nachfrage). Eine veraltete
> Memory.md ist schlimmer als keine, weil sie falsche Annahmen ueber den Projektzustand erzeugt.

## Kurzstatus

- Die Web-App ist aktiv und zeigt **ein** verbindliches Pricing-Modell "Vereinbarte
  Kostenaufteilung" fuer die eine gebuchte Unterkunft ("Familientreffen 2027", Feuerkuppe), inkl.
  RAP je Familie.
- Verlauf 2026-08-01: RAP erfasst + alte Varianten 1-3 entfernt (Commit `88b4fae`), auf das
  vereinbarte Gewichtungsmodell (Erw. 1 / Kinder 0,5) konsolidiert, dann die "Varianten"-
  Terminologie komplett entfernt (nur noch ein Plan `FEUERKUPPE_PLAN`, kein Szenario-Konzept mehr).
  VP-Werte durch korrigierten Vertrag 2027 bestaetigt. GitHub-Pages-Deploy laeuft automatisch bei
  Push auf `main`.

## Kostenaufteilungs-Festlegung (Familie, verbindlich – Planungsabsprache)

- **Unterkunfts-Umlage (Bungalow):** Erwachsene Gewicht **1,0**, **alle Kinder 0,5** – unabhaengig
  vom Alter (auch Kinder 0-3). Kinder sind alle unter 10 Jahren, es wird nicht feiner aufgeteilt.
  -> Umlageeinheiten = 15×1 + 7×0,5 = **18,5**; Bungalow-Umlage je Einheit = 2754/18,5 = 148,86 €.
- **VP-Kosten:** **jede Person exakt** ihren Tarif (Erw. 85,50 / Kind 3+ 67,50 / Kind 0-3 34,50 €),
  **kein** Split, keine Gewichtung.
- **RAP:** exakt pro Kopf, **voll** auch fuer Kinder 0-3 (9 EUR/Person), kein Split.
- **Bettwaesche:** optional, **7,50 EUR/Person** (Vertrag 2027), nur fuer Familien die sie wuenschen.
  Feld `linen` je Familie in `FAMILY_COSTS` (= Anzahl Personen mit Wunsch). Aktuell: ElectricalResistance 4,
  Sonntagskind 2, Molinero E/J 2 -> 8 Personen = **60 EUR**. Als eigene Spalte + Summenzeile gefuehrt,
  im jeweiligen Gesamt enthalten.
- Technisch: Gewichtung betrifft **nur** die Bungalow-Umlage (`ADULT_ALLOCATION_WEIGHT=1`,
  `CHILD_ALLOCATION_WEIGHT=0.5` in `feuerkuppeData.ts`, verwendet in `getWeightedPlanCosts`);
  VP, RAP und Bettwaesche werden immer personengenau addiert.
- **Gesamtkosten** dieses Modells: Bungalow 2754 + VP 1689 + RAP 198 + Bettwaesche 60 (optional)
  = **4.701,00 €**. (15 Erwachsene / 5 Kinder 3+ / 2 Kinder 0-3 = 22 Personen; Bungalowpreis fix.)

## Aktueller Produktzustand

- Startseite (`src/App.tsx`) zeigt **ein** verbindliches Pricing-Modell "Vereinbarte
  Kostenaufteilung" (kein Szenario-Vergleich mehr). Die frueheren 5 Szenarien (4_1/4_2/4_3 sowie
  room-linear 5_0 und room-beds-house 5_1) wurden am 2026-08-01 konsolidiert, nachdem die Familie
  sich auf die Gewichtung Erw. 1 / Kinder 0,5 geeinigt hat.
- Sektionen: Planungsgrundlage (Personen, VP-Tarife, Gewichtungs-Uebersicht), Dokumente,
  Reiseausfallpauschale (Originaltext + Kosten-/Berechnungstabelle), und die Kostenaufteilung mit
  Herleitungstabelle, Familien-Kostentabelle (Spalten "VP-Anteil", "Unterkunftskosten",
  "RAP-Anteil", "Bettwäsche", "Gesamt") und Zimmerbelegungstabelle.
- RAP: 3 EUR/Person/Nacht × 3 Naechte = 9 EUR/Person; 22 Personen = 198 EUR gesamt.
- Keine Navigation/Routing sichtbar, obwohl `react-router-dom` als Dependency vorhanden ist (derzeit
  ungenutzt bzw. fuer spaetere Erweiterung).
- Styling: `src/index.css`, reduziertes/eigenes Farb-/Typografie-Setup.

## Technischer Stand

- Stack: React 18 + TypeScript + Vite 6, `react-router-dom` als Dependency (aktuell ungenutzt).
- Scripts (`package.json`): `dev`, `build` (`tsc -b && vite build`), `preview`, `lint` (eslint).
- Entry: `src/main.tsx` → `src/App.tsx`.

## Fachlogik / Datenmodell

- `src/data/feuerkuppeData.ts`:
  - Personenzahlen: `ADULT_COUNT=15`, `CHILD_COUNT=5`, `BABY_COUNT=2` (22 gesamt; Junior Blizzard N
    hat abgesagt, 2026-08-01). `BABY_COUNT=2`: ein zweites Kind faellt beim VP-Tarif in die Gruppe
    0-3 (naehere personenbezogene Angaben bewusst NICHT dokumentiert).
  - Umlage-Gewichte: `ADULT_ALLOCATION_WEIGHT=1`, `CHILD_ALLOCATION_WEIGHT=0.5` (nur Bungalow-Umlage).
  - VP-Kosten pro Person: Erwachsene 85,50 €, Kinder 3+ 67,50 €, Kinder 0-3 34,50 €.
    BESTAETIGT durch korrigierten Vertrag `Vertrag_Familien_2027.pdf` (01.08.2026): Vollpension
    als Pauschale pro Person (Einzelpreis p. Pers., NICHT pro Nacht). Werte stimmen exakt.
    (Der alte Vertrag vom 15.07. war Halbpension 57/45/21 € pro Nacht -> ueberholt.)
  - RAP-Konstanten: `NIGHTS=3`, `RAP_PER_PERSON_PER_NIGHT=3`, `RAP_PER_PERSON=9`,
    `TOTAL_PERSONS=22`, `RAP_TOTAL=198`.
  - Bettwaesche: `LINEN_PER_PERSON=7.5`; optionales Feld `linen?` je `FamilyCost` (Personen mit Wunsch).
    `getWeightedPlanCosts` liefert je Familie zusaetzlich `linen` (EUR) und gesamt `linenTotal`.
  - `FEUERKUPPE_PLAN` (Typ `AccommodationPlan`): **ein** Objekt fuer die gebuchte Unterkunft
    (Bungalowkosten 2754 €, 3× Kat. Ia, 9 Zimmer). Kein `id`/`title`, kein "Varianten"-Konzept mehr.
    Frueher `FEUERKUPPE_VARIANTS`-Array (Varianten 1-3 am 2026-08-01 entfernt, dann auf Einzelobjekt
    reduziert).
  - `FAMILY_COSTS`: 8 Familien mit Erwachsenen-/Kinder-/Baby-Anzahl (anonymisierte Namen).
- `src/utils/costs.ts`: personengewichtete Kostenberechnung `getWeightedPlanCosts`
  (liefert je Familie `lodging`/`vp`/`rap`/`total`) + `getPlanCosts` (nutzt die vereinbarten
  Gewichte 1 / 0,5) + `eur`-Formatierung. Die room-linear/room-beds-house-Funktionen wurden am
  2026-08-01 mit den Vergleichs-Szenarien entfernt.

## Hinweis zur Projektlinie

- Eigenstaendige, neu aufgesetzte Codebasis; es werden nur anonymisierte Inhalte verwendet
  (Familiennamen sind Platzhalter/Codenamen, keine echten Namen).
- Der Klarname "Feuerkuppe" (Unterkunft/Ferienpark) ist bereits auf der oeffentlichen Webseite
  sichtbar (`src/App.tsx`, Hauptueberschrift) und darf dort sowie in weiteren Inhalten verwendet
  werden. Echte Personendaten (Namen, Adressen von Buchungspartnern etc.) bleiben weiterhin tabu.

## Lokale private Dokumente (gitignored)

- Lokaler Ordner mit 7 PDF-Dokumenten zur Unterkunft/Reise, **gitignored** (nicht im Repo, nur lokal
  vorhanden). Enthaltene Dateien:
  - Formblatt 11 Pauschalreiserecht.pdf
  - Grillliste 2026.pdf
  - Hausordnung.pdf
  - Programmliste 2026 Wochenende.pdf
  - Reiseausfallpauschale (RAP).pdf
  - Reisebedingungen BAG KiEZ Stand 04.03.2022.pdf
  - Vertrag_Familien.pdf

## Vertragsstand / Dokumente

- Massgeblich ist **`Vertrag_Familien_2027.pdf`** (Stand 01.08.2026, Zeichen UH). Ersetzt das alte
  `Vertrag_Familien.pdf` (15.07., Zeichen Hi.). Aenderungen: Name Christina -> **Kristina Müller**,
  Verpflegung HP/Nacht -> **VP-Pauschale pro Person** (85,50/67,50/34,50 €), Bettwaesche 6 -> 7,50 €.
- RAP (Reiseausfallpauschale) ist laut Rezeption ein offizielles Angebot ab 2026.
- Frist: Unterlagen inkl. Programmwuensche innerhalb 4 Wochen (ab 01.08.2026) zuruecksenden.
- **Revidiertes Angebot/Vertrag fuer 22 Personen angefordert:** Junior Blizzard N sagt bereits vor
  Vertragsabschluss ab. Da noch kein Vertrag geschlossen ist, wird direkt ein Vertrag ueber 22
  Personen verlangt (statt 23) -> keine nachtraegliche Teilnehmerreduzierung/Storno noetig. Website
  rechnet bereits mit 22; Doku-Kachel "Vertrag Familien" entsprechend angepasst.

## Offene Punkte

- `react-router-dom`-Dependency ist ungenutzt — entweder fuer geplante Navigation vorsehen oder
  entfernen, falls dauerhaft nicht gebraucht.
