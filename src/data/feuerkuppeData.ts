export type RoomPlan = {
  room: string
  type: string
  beds: number
  occupiedBeds: number
  bathroom: string
  occupancy: string
}

export type VariantPlan = {
  id: string
  title: string
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
export const ADULT_ALLOCATION_WEIGHT = 1
export const CHILD_ALLOCATION_WEIGHT = 1
export const OVERNIGHT_ALLOCATION_UNITS =
  ADULT_COUNT * ADULT_ALLOCATION_WEIGHT +
  (CHILD_COUNT + BABY_COUNT) * CHILD_ALLOCATION_WEIGHT

export const VP_ADULT = 85.5
export const VP_CHILD = 67.5
export const VP_BABY = 34.5

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

export const FEUERKUPPE_VARIANTS: VariantPlan[] = [
  {
    id: '1',
    title: 'Variante 1',
    housingSetup: '1 x Kategorie III',
    categoryLabel: 'Kat. III',
    accessibility: 'Teilweise barrierefrei (eigener Bereich vorhanden)',
    bungalowCost: 1428,
    rooms: [
      { room: 'Zimmer 1', type: '5-Bett-Zimmer', beds: 5, occupiedBeds: 4, bathroom: 'Gemeinschaftlich (DU/WC)', occupancy: 'Senior ElectricalResistance K und K, Junior ElectricalResistance S und E, 1 Bett frei' },
      { room: 'Zimmer 2', type: '3-Bett-Zimmer', beds: 3, occupiedBeds: 3, bathroom: 'Gemeinschaftlich (DU/WC)', occupancy: 'Senior Windymillymill B und K, Junior Windymillymill L' },
      { room: 'Zimmer 3', type: '3-Bett-Zimmer', beds: 3, occupiedBeds: 3, bathroom: 'Gemeinschaftlich (DU/WC)', occupancy: 'Junior Windymillymill M, Junior Molinero L und S' },
      { room: 'Zimmer 4', type: '3-Bett-Zimmer', beds: 3, occupiedBeds: 2, bathroom: 'Gemeinschaftlich (DU/WC)', occupancy: 'Senior Molinero L und K, 1 Bett frei' },
      { room: 'Zimmer 5', type: '3-Bett-Zimmer', beds: 3, occupiedBeds: 3, bathroom: 'Gemeinschaftlich (DU/WC)', occupancy: 'Senior Sullivan W und S, Junior Sullivan C' },
      { room: 'Zimmer 6', type: '3-Bett-Zimmer', beds: 3, occupiedBeds: 2, bathroom: 'Gemeinschaftlich (DU/WC)', occupancy: 'Senior Sonntagskind T und P, 1 Bett frei' },
      { room: 'Zimmer 7', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 2, bathroom: 'Gemeinschaftlich (DU/WC)', occupancy: 'Senior Blizzard J und U' },
      { room: 'Zimmer 8', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 2, bathroom: 'Gemeinschaftlich (DU/WC)', occupancy: 'Junior Blizzard J und N' },
      { room: 'Zimmer 9', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 0, bathroom: 'Gemeinschaftlich (DU/WC)', occupancy: 'frei' },
      { room: 'Zimmer 10', type: 'Einzelzimmer', beds: 1, occupiedBeds: 0, bathroom: 'Gemeinschaftlich (DU/WC)', occupancy: 'frei' },
      { room: 'Zimmer 11', type: '2-Bett-Zimmer (barrierefreier Bereich)', beds: 2, occupiedBeds: 1, bathroom: 'Sanitaer im barrierefreien Bereich (DU/WC)', occupancy: 'Senior Molinero E, 1 Bett frei' },
      { room: 'Zimmer 12', type: 'Einzelzimmer (barrierefreier Bereich)', beds: 1, occupiedBeds: 1, bathroom: 'Sanitaer im barrierefreien Bereich (DU/WC)', occupancy: 'Senior Molinero J' },
    ],
  },
  {
    id: '2',
    title: 'Variante 2',
    housingSetup: '2 x Kategorie I + 1 x Kategorie II',
    categoryLabel: 'Kat. I/II',
    accessibility: 'Nicht barrierefrei (protokolliert)',
    bungalowCost: 2115,
    rooms: [
      { room: 'Haus A (Kat. I) - Zimmer 1', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 4, bathroom: 'Eigenes DU/WC', occupancy: 'Senior ElectricalResistance K und K, Junior ElectricalResistance S und E' },
      { room: 'Haus A (Kat. I) - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 4, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Molinero L und K, Junior Molinero L und S' },
      { room: 'Haus A (Kat. I) - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Blizzard J und U' },
      { room: 'Haus B (Kat. II) - Zimmer 1', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 4, bathroom: 'Gemeinsames DU/WC mit Zimmer 2', occupancy: 'Senior Windymillymill B und K, Junior Windymillymill M und L' },
      { room: 'Haus B (Kat. II) - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 3, bathroom: 'Gemeinsames DU/WC mit Zimmer 1', occupancy: 'Senior Sullivan W und S, Junior Sullivan C, 1 Bett frei' },
      { room: 'Haus B (Kat. II) - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Junior Blizzard J und N' },
      { room: 'Haus C (Kat. I) - Zimmer 1', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Sonntagskind T und P, 2 Betten frei' },
      { room: 'Haus C (Kat. I) - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 0, bathroom: 'Eigenes DU/WC', occupancy: 'frei' },
      { room: 'Haus C (Kat. I) - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Molinero E und J' },
    ],
  },
  {
    id: '3',
    title: 'Variante 3',
    housingSetup: '1 x Kategorie Ia (12) + 1 x Kategorie I + 1 x Kategorie II',
    categoryLabel: 'Kat. Ia + I/II',
    accessibility: 'Teilweise barrierefrei (Ia-Anteil vorhanden)',
    bungalowCost: 2328,
    rooms: [
      { room: 'Ia-Haus - Zimmer 1', type: '6-Bett-Zimmer', beds: 6, occupiedBeds: 4, bathroom: 'Eigenes DU/WC', occupancy: 'Senior ElectricalResistance K und K, Junior ElectricalResistance S und E, 2 Betten frei' },
      { room: 'Ia-Haus - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 4, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Windymillymill B und K, Junior Windymillymill M und L' },
      { room: 'Ia-Haus - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Molinero E und J' },
      { room: 'Haus A (Kat. II) - Zimmer 1', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 4, bathroom: 'Gemeinsames DU/WC mit Zimmer 2', occupancy: 'Senior Molinero L und K, Junior Molinero L und S' },
      { room: 'Haus A (Kat. II) - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 2, bathroom: 'Gemeinsames DU/WC mit Zimmer 1', occupancy: 'Senior Sonntagskind T und P, 2 Betten frei' },
      { room: 'Haus A (Kat. II) - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Blizzard J und U' },
      { room: 'Haus B (Kat. I) - Zimmer 1', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Junior Blizzard J und N, 2 Betten frei' },
      { room: 'Haus B (Kat. I) - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 3, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Sullivan W und S, Junior Sullivan C, 1 Bett frei' },
      { room: 'Haus B (Kat. I) - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 0, bathroom: 'Eigenes DU/WC', occupancy: 'frei' },
    ],
  },
  {
    id: '4',
    title: 'Variante 4',
    housingSetup: '3 x Kategorie Ia (12)',
    categoryLabel: 'Kat. Ia',
    accessibility: 'Barrierefrei orientiert (nur Ia-Haeuser)',
    bungalowCost: 2754,
    rooms: [
      { room: 'Ia-Haus 1 - Zimmer 1', type: '6-Bett-Zimmer', beds: 6, occupiedBeds: 4, bathroom: 'Eigenes DU/WC', occupancy: 'Senior ElectricalResistance K und K, Junior ElectricalResistance S und E, 2 Betten frei' },
      { room: 'Ia-Haus 1 - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 4, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Molinero L und K, Junior Molinero L und S' },
      { room: 'Ia-Haus 1 - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Molinero E und J' },
      { room: 'Ia-Haus 2 - Zimmer 1', type: '6-Bett-Zimmer', beds: 6, occupiedBeds: 4, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Windymillymill B und K, Junior Windymillymill M und L, 2 Betten frei' },
      { room: 'Ia-Haus 2 - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Blizzard J und U, 2 Betten frei' },
      { room: 'Ia-Haus 2 - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Junior Blizzard J und N' },
      { room: 'Ia-Haus 3 - Zimmer 1', type: '6-Bett-Zimmer', beds: 6, occupiedBeds: 0, bathroom: 'Eigenes DU/WC', occupancy: 'frei' },
      { room: 'Ia-Haus 3 - Zimmer 2', type: '4-Bett-Zimmer', beds: 4, occupiedBeds: 3, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Sullivan W und S, Junior Sullivan C, 1 Bett frei' },
      { room: 'Ia-Haus 3 - Zimmer 3', type: '2-Bett-Zimmer', beds: 2, occupiedBeds: 2, bathroom: 'Eigenes DU/WC', occupancy: 'Senior Sonntagskind T und P' },
    ],
  },
]
