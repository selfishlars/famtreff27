import {
  ADULT_ALLOCATION_WEIGHT,
  ADULT_COUNT,
  BABY_COUNT,
  CHILD_ALLOCATION_WEIGHT,
  CHILD_COUNT,
  FAMILY_COSTS,
  OVERNIGHT_ALLOCATION_UNITS,
  VP_ADULT,
  VP_BABY,
  VP_CHILD,
} from '../data/feuerkuppeData'

export const eur = (value: number): string =>
  `${value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR`

export function getVariantCosts(bungalowCost: number) {
  const vpAdults = ADULT_COUNT * VP_ADULT
  const vpChildren = CHILD_COUNT * VP_CHILD
  const vpBabies = BABY_COUNT * VP_BABY
  const vpTotal = vpAdults + vpChildren + vpBabies
  const overnightSharePerUnit = bungalowCost / OVERNIGHT_ALLOCATION_UNITS
  const adultOvernight = overnightSharePerUnit * ADULT_ALLOCATION_WEIGHT
  const childOvernight = overnightSharePerUnit * CHILD_ALLOCATION_WEIGHT
  const adultPrice = adultOvernight + VP_ADULT
  const childPrice = childOvernight + VP_CHILD
  const child03Price = childOvernight + VP_BABY
  const total = bungalowCost + vpTotal

  const familyRows = FAMILY_COSTS.map((family) => {
    const overnightUnits =
      family.adults * ADULT_ALLOCATION_WEIGHT +
      (family.children + family.babies) * CHILD_ALLOCATION_WEIGHT

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
