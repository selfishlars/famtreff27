# Projekt-Memory: famtreff27

Stand: 2026-07-29

> **WICHTIG: Diese Datei muss bei jeder relevanten Aenderung am Projekt aktuell gehalten werden.**
> Sobald sich Produktzustand, Datenmodell, Kostenlogik oder UI-Umfang aendern, ist dieser Stand
> im selben Arbeitsschritt zu aktualisieren (nicht erst bei der naechsten Nachfrage). Eine veraltete
> Memory.md ist schlimmer als keine, weil sie falsche Annahmen ueber den Projektzustand erzeugt.

## Kurzstatus

- Die Web-App ist aktiv und zeigt die volle Planungs- und Kostenuebersicht fuer **Variante 4**
  ("Familientreffen 2027", Feuerkuppe).
- Der zuletzt eingecheckte Stand ist auf `main` identisch mit `origin/main`, Arbeitsverzeichnis clean.

## Aktueller Produktzustand

- Startseite (`src/App.tsx`) zeigt ausschliesslich Variante 4 mit fuenf Kostenszenarien:
  - `4_1`: personengewichtet, Erwachsene/Kinder gleich gewichtet (1.0/1.0)
  - `4_2`: personengewichtet, Bungalowkosten nur auf Erwachsene umgelegt (Kindergewicht 0)
  - `4_3`: personengewichtet, Kinder mit Gewicht 0.5
  - `5_0`: lineare Zimmer-Umlage (jedes Zimmer gleicher Kostenanteil)
  - `5_1`: Zimmeranteil je Haus nach Schlafplaetzen (Hausanteil × Zimmerbetten/Hausbetten)
- Pro Szenario werden Herleitungstabelle, Familien-Kostentabelle (inkl. Spalte
  "Unterkunftskosten", seit Commit `b22a8e5`) und Zimmerbelegungstabelle gerendert.
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
  - `FEUERKUPPE_VARIANTS`: vier Varianten (1-4) mit Haeusern/Zimmern/Belegung/Bungalowkosten.
    Nur Variante 4 (Bungalowkosten 2754 €, 3× Kat. Ia, 9 Zimmer) wird aktuell in der UI verwendet.
  - `FAMILY_COSTS`: 8 Familien mit Erwachsenen-/Kinder-/Baby-Anzahl (anonymisierte Namen).
- `src/utils/costs.ts`: Kostenberechnungen fuer alle drei Modi (person-weighted, room-linear,
  room-beds-house), inkl. `getVariantCosts`, `getWeightedVariantCosts`, `getRoomLinearCosts`,
  `getRoomBedShareByHouseCosts`, `eur`-Formatierung.

## Hinweis zur Projektlinie

- Eigenstaendige, neu aufgesetzte Codebasis; es werden nur anonymisierte Inhalte verwendet
  (Familiennamen sind Platzhalter/Codenamen, keine echten Namen).

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

## Offene Punkte

- Klaeren, ob/wann weitere Varianten (1-3) oder eine Navigation zwischen ihnen wieder eingebunden
  werden sollen.
- `react-router-dom`-Dependency ist ungenutzt — entweder fuer geplante Navigation vorsehen oder
  entfernen, falls dauerhaft nicht gebraucht.
