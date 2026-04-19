import {
  ADULT_ALLOCATION_WEIGHT,
  ADULT_COUNT,
  BABY_COUNT,
  CHILD_ALLOCATION_WEIGHT,
  CHILD_COUNT,
  FAMILY_COSTS,
  type RoomPlan,
  type VariantPlan,
  VP_ADULT,
  VP_BABY,
  VP_CHILD,
} from '../data/feuerkuppeData'

export const eur = (value: number): string =>
  `${value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR`

type WeightedCostOptions = {
  adultWeight: number
  childWeight: number
}

const getHouseKey = (roomName: string): string => {
  const marker = ' - '
  const splitIndex = roomName.indexOf(marker)
  return splitIndex > 0 ? roomName.slice(0, splitIndex).trim() : 'Gesamtobjekt'
}

export function getWeightedVariantCosts(
  bungalowCost: number,
  { adultWeight, childWeight }: WeightedCostOptions,
) {
  const overnightAllocationUnits =
    ADULT_COUNT * adultWeight +
    (CHILD_COUNT + BABY_COUNT) * childWeight

  const vpAdults = ADULT_COUNT * VP_ADULT
  const vpChildren = CHILD_COUNT * VP_CHILD
  const vpBabies = BABY_COUNT * VP_BABY
  const vpTotal = vpAdults + vpChildren + vpBabies

  const overnightSharePerUnit =
    overnightAllocationUnits > 0
      ? bungalowCost / overnightAllocationUnits
      : 0

  const adultOvernight = overnightSharePerUnit * adultWeight
  const childOvernight = overnightSharePerUnit * childWeight
  const adultPrice = adultOvernight + VP_ADULT
  const childPrice = childOvernight + VP_CHILD
  const child03Price = childOvernight + VP_BABY
  const total = bungalowCost + vpTotal

  const familyRows = FAMILY_COSTS.map((family) => {
    const overnightUnits =
      family.adults * adultWeight +
      (family.children + family.babies) * childWeight

    const familyVp =
      family.adults * VP_ADULT +
      family.children * VP_CHILD +
      family.babies * VP_BABY

    const familyTotal =
      overnightUnits * overnightSharePerUnit +
      familyVp

    return {
      ...family,
      vp: familyVp,
      total: familyTotal,
    }
  })

  return {
      vpAdults,
      vpChildren,
      vpBabies,
      vpTotal,
      overnightAllocationUnits,
      adultWeight,
      childWeight,
      overnightSharePerUnit,
      adultOvernight,
      childOvernight,
      adultPrice,
      childPrice,
    child03Price,
    total,
      familyRows,
    }
}

export function getVariantCosts(bungalowCost: number) {
  return getWeightedVariantCosts(bungalowCost, {
    adultWeight: ADULT_ALLOCATION_WEIGHT,
    childWeight: CHILD_ALLOCATION_WEIGHT,
  })
}

export function getRoomLinearCosts(variant: VariantPlan) {
  const roomCount = variant.rooms.length
  const roomCost = roomCount > 0 ? variant.bungalowCost / roomCount : 0

  const roomRows = variant.rooms.map((room) => {
    const occupied = room.occupiedBeds
    const perOccupiedBed = occupied > 0 ? roomCost / occupied : 0

    return {
      ...room,
      roomCost,
      perOccupiedBed,
    }
  })

  return {
    roomCount,
    roomCost,
    roomRows,
  }
}

export function getRoomBedShareByHouseCosts(variant: VariantPlan) {
  const houseBeds = new Map<string, number>()

  variant.rooms.forEach((room) => {
    const house = getHouseKey(room.room)
    houseBeds.set(house, (houseBeds.get(house) ?? 0) + room.beds)
  })

  const houses = Array.from(houseBeds.keys())
  const houseCount = houses.length
  const houseShare = houseCount > 0 ? variant.bungalowCost / houseCount : 0

  const roomRows = variant.rooms.map((room: RoomPlan) => {
    const house = getHouseKey(room.room)
    const totalHouseBeds = houseBeds.get(house) ?? 0
    const roomShare = totalHouseBeds > 0
      ? room.beds / totalHouseBeds
      : 0
    const roomCost = houseShare * roomShare
    const perOccupiedBed = room.occupiedBeds > 0
      ? roomCost / room.occupiedBeds
      : 0

    return {
      ...room,
      house,
      totalHouseBeds,
      roomShare,
      roomCost,
      perOccupiedBed,
    }
  })

  return {
    houseCount,
    houseShare,
    roomRows,
  }
}
