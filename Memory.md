# Projekt-Memory: famtreff27

Stand: 2026-04-19

## Kurzstatus

- Die Web-App ist aktuell absichtlich im Offline-Modus.
- Die Live-Inhalte zur Familienplanung sind aus der sichtbaren UI entfernt.
- Der zuletzt eingecheckte Stand ist auf `main` identisch mit `origin/main`.

## Aktueller Produktzustand

- Startseite zeigt nur eine Offline-Karte mit Hinweistext.
- Keine sichtbare Navigation, keine Variantenanzeige, keine Kostenansicht.
- Styling ist reduziert, aber weiterhin mit bestehendem Farb-/Typografie-Setup aktiv.

## Technischer Stand

- Stack: React 18 + TypeScript + Vite 6.
- Wichtige Scripts in `package.json`: `dev`, `build`, `preview`, `lint`.
- Entry/UI: `src/App.tsx` zeigt nur den Offline-Hinweis.
- Basis-Styles: `src/index.css`.

## Vorhandene (derzeit nicht eingebundene) Fachlogik

- Planungs- und Belegungsdaten liegen weiterhin in `src/data/feuerkuppeData.ts`.
- Kostenlogik liegt weiterhin in `src/utils/costs.ts`.
- Damit ist eine spaetere Reaktivierung der Planungsansicht moeglich, ohne Daten neu aufzubauen.

## Hinweis zur Projektlinie

- Dieses Projekt wird als eigenstaendige, neu aufgesetzte Codebasis gefuehrt.
- Es werden nur anonymisierte Inhalte verwendet.

## Offene Punkte fuer naechste Aktivierung

- Entscheidung, wann der private Modus aufgehoben wird.
- Festlegen, welche Daten wieder sichtbar werden duerfen (Datenschutz/Privatsphaere).
- Optional: Reaktivierung der alten UI-Komponenten auf Basis der bestehenden Daten- und Kostenmodule.
