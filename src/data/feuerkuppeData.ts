export type RoomPlan = {
  room: string
  type: string
  beds: number
  occupiedBeds: number
  bathroom: string
  occupancy: string
}

export type AccommodationPlan = {
  housingSetup: string
  categoryLabel: string
  accessibility: string
  bungalowCost: number
  rooms: RoomPlan[]
}

export type FamilyCost = {
  family: string
  adults: number
  children: number
  babies: number
}

export const ADULT_COUNT = 16
export const CHILD_COUNT = 6
export const BABY_COUNT = 1
// Vereinbarte Kostenaufteilung (Familien-Planungsabsprache): Erwachsene tragen die
// Unterkunfts-Umlage mit Gewicht 1, Kinder (unabhaengig vom Alter, auch 0-3) mit 0,5.
// Betrifft NUR die Bungalow-Umlage; VP und RAP werden immer personengenau abgerechnet.
export const ADULT_ALLOCATION_WEIGHT = 1
export const CHILD_ALLOCATION_WEIGHT = 0.5
export const OVERNIGHT_ALLOCATION_UNITS =
  ADULT_COUNT * ADULT_ALLOCATION_WEIGHT +
  (CHILD_COUNT + BABY_COUNT) * CHILD_ALLOCATION_WEIGHT

export const VP_ADULT = 85.5
export const VP_CHILD = 67.5
export const VP_BABY = 34.5

// Reiseausfallpauschale (RAP): 3,00 EUR pro Person und pro Uebernachtung,
// gilt fuer die gesamte Gruppe inkl. Begleitpersonen (auch Kinder/Babys).
export const NIGHTS = 3
export const TOTAL_PERSONS = ADULT_COUNT + CHILD_COUNT + BABY_COUNT
export const RAP_PER_PERSON_PER_NIGHT = 3
export const RAP_PER_PERSON = RAP_PER_PERSON_PER_NIGHT * NIGHTS
export const RAP_TOTAL = TOTAL_PERSONS * RAP_PER_PERSON

export const FAMILY_COSTS: FamilyCost[] = [
  { family: 'Senior Molinero E/J', adults: 2, children: 0, babies: 0 },
  { family: 'Senior Blizzard J/U', adults: 2, children: 0, babies: 0 },
  { family: 'Junior Blizzard J/N', adults: 2, children: 0, babies: 0 },
  { family: 'Familie Molinero L/K + Kinder', adults: 2, children: 2, babies: 0 },
  { family: 'Familie Windymillymill B/K + Kinder', adults: 2, children: 2, babies: 0 },
  { family: 'Senior Sonntagskind T/P', adults: 2, children: 0, babies: 0 },
  { family: 'Familie ElectricalResistance K/K + Kinder', adults: 2, children: 2, babies: 0 },
  { family: 'Familie Sullivan W/S + Kind 0-3', adults: 2, children: 0, babies: 1 },
]

// Gebuchte Unterkunft (Realstand laut Vertrag 2027): 3x Bungalow Kat. Ia, 9 Zimmer.
export const FEUERKUPPE_PLAN: AccommodationPlan = {
  housingSetup: '3 x Kategorie Ia (12)',
  categoryLabel: 'Kat. Ia',
  accessibility: 'Barrierefrei orientiert (nur Ia-Haeuser)',
  bungalowCost: 2754,
  rooms: [
      { room: 'Ia-Haus 1 - Zimmer 1', type: '6-Bett-Zimmer', beds: 6, occupiedBeds: 4, bathroom: 'Eigenes DU/WC', occupancy: 'Senior ElectricalResistance K und K, Junior ElectricalResistance S und E, 2 Betten frei' },
      { room: 'Ia-Haus 1 - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Sonntagskind T und P, 2 Betten frei' },
      { room: 'Ia-Haus 1 - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 1, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Molinero J, 1 Bett frei' },
      { room: 'Ia-Haus 2 - Zimmer 1', type: '6-Bett-Zimmer', beds: 6, occupiedBeds: 4, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Windymillymill B und K, Junior Windymillymill M und L, 2 Betten frei' },
      { room: 'Ia-Haus 2 - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 3, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Sullivan W und S, Junior Sullivan C, 1 Bett frei' },
      { room: 'Ia-Haus 2 - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 1, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Molinero E, 1 Bett frei' },
      { room: 'Ia-Haus 3 - Zimmer 1', type: '6-Bett-Zimmer', beds: 6, occupiedBeds: 4, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Molinero L und K, Junior Molinero L und S, 2 Betten frei' },
      { room: 'Ia-Haus 3 - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Blizzard J und U, 2 Betten frei' },
      { room: 'Ia-Haus 3 - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Junior Blizzard J und N' },
  ],
}
