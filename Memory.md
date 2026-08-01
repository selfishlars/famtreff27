# Projekt-Memory: famtreff27

Stand: 2026-08-01

> **WICHTIG: Diese Datei muss bei jeder relevanten Aenderung am Projekt aktuell gehalten werden.**
> Sobald sich Produktzustand, Datenmodell, Kostenlogik oder UI-Umfang aendern, ist dieser Stand
> im selben Arbeitsschritt zu aktualisieren (nicht erst bei der naechsten Nachfrage). Eine veraltete
> Memory.md ist schlimmer als keine, weil sie falsche Annahmen ueber den Projektzustand erzeugt.

## Kurzstatus

- Die Web-App ist aktiv und zeigt die volle Planungs- und Kostenuebersicht fuer **Variante 4**
  ("Familientreffen 2027", Feuerkuppe).
- Der zuletzt eingecheckte Stand ist auf `main` identisch mit `origin/main`, Arbeitsverzeichnis clean.

## Kostenaufteilungs-Festlegung (Familie, verbindlich)

- **Innerhalb der Familie vereinbart:** Bei der **Unterkunfts-Umlage** zahlen **Kinder weniger**
  als Erwachsene (reduzierte Umlage-Gewichtung). Das ist bewusst so festgelegt.
- **VP/HP-Kosten** dagegen zahlt **jede Person exakt ihre tatsaechlichen Kosten** – hier gibt es
  **keinen** familieninternen Kostensplit / keine Gewichtung.
- **RAP** (Reiseausfallpauschale) wird ebenfalls exakt pro Kopf getragen (3 EUR/Person/Nacht,
  auch Kinder/Babys), kein Split.
- Technisch: Die Gewichtung betrifft nur die Bungalow-Umlage (`adultWeight`/`childWeight` in
  `getWeightedVariantCosts`); VP und RAP werden immer personengenau addiert.

## Aktueller Produktzustand

- Startseite (`src/App.tsx`) zeigt ausschliesslich Variante 4 mit fuenf Kostenszenarien:
  - `4_1`: personengewichtet, Erwachsene/Kinder gleich gewichtet (1.0/1.0)
  - `4_2`: personengewichtet, Bungalowkosten nur auf Erwachsene umgelegt (Kindergewicht 0)
  - `4_3`: personengewichtet, Kinder mit Gewicht 0.5
  - `5_0`: lineare Zimmer-Umlage (jedes Zimmer gleicher Kostenanteil)
  - `5_1`: Zimmeranteil je Haus nach Schlafplaetzen (Hausanteil × Zimmerbetten/Hausbetten)
- Pro Szenario werden Herleitungstabelle, Familien-Kostentabelle (Spalten "VP-Anteil",
  "Unterkunftskosten", "RAP-Anteil", "Gesamt") und Zimmerbelegungstabelle gerendert.
- Eigener Abschnitt "Reiseausfallpauschale (RAP)" zeigt Originaltext + Kosten-/Berechnungstabelle
  (3 EUR/Person/Nacht × 3 Naechte = 9 EUR/Person; 23 Personen = 207 EUR gesamt).
- Keine Navigation/Routing sichtbar, obwohl `react-router-dom` als Dependency vorhanden ist (derzeit
  ungenutzt bzw. fuer spaetere Erweiterung).
- Styling: `src/index.css`, reduziertes/eigenes Farb-/Typografie-Setup.

## Technischer Stand

- Stack: React 18 + TypeScript + Vite 6, `react-router-dom` als Dependency (aktuell ungenutzt).
- Scripts (`package.json`): `dev`, `build` (`tsc -b && vite build`), `preview`, `lint` (eslint).
- Entry: `src/main.tsx` → `src/App.tsx`.

## Fachlogik / Datenmodell

- `src/data/feuerkuppeData.ts`:
  - Personenzahlen: `ADULT_COUNT=16`, `CHILD_COUNT=6`, `BABY_COUNT=1`.
  - VP-Kosten pro Person: Erwachsene 85,50 €, Kinder 3+ 67,50 €, Kinder 0-3 34,50 €.
    BESTAETIGT durch korrigierten Vertrag `Vertrag_Familien_2027.pdf` (01.08.2026): Vollpension
    als Pauschale pro Person (Einzelpreis p. Pers., NICHT pro Nacht). Werte stimmen exakt.
    (Der alte Vertrag vom 15.07. war Halbpension 57/45/21 € pro Nacht -> ueberholt.)
  - RAP-Konstanten: `NIGHTS=3`, `RAP_PER_PERSON_PER_NIGHT=3`, `RAP_PER_PERSON=9`,
    `TOTAL_PERSONS=23`, `RAP_TOTAL=207`.
  - `FEUERKUPPE_VARIANTS`: enthaelt **nur noch Variante 4** (Bungalowkosten 2754 €, 3× Kat. Ia,
    9 Zimmer). Varianten 1-3 wurden am 2026-08-01 entfernt (nicht gebucht, wurden nie gerendert).
  - `FAMILY_COSTS`: 8 Familien mit Erwachsenen-/Kinder-/Baby-Anzahl (anonymisierte Namen).
- `src/utils/costs.ts`: Kostenberechnungen fuer alle drei Modi (person-weighted, room-linear,
  room-beds-house), inkl. `getVariantCosts`, `getWeightedVariantCosts`, `getRoomLinearCosts`,
  `getRoomBedShareByHouseCosts`, `eur`-Formatierung.

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

## Offene Punkte

- `react-router-dom`-Dependency ist ungenutzt — entweder fuer geplante Navigation vorsehen oder
  entfernen, falls dauerhaft nicht gebraucht.
