import {
  ADULT_ALLOCATION_WEIGHT,
  ADULT_COUNT,
  BABY_COUNT,
  CHILD_ALLOCATION_WEIGHT,
  CHILD_COUNT,
  FAMILY_COSTS,
  RAP_PER_PERSON,
  RAP_TOTAL,
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
  const rapTotal = RAP_TOTAL
  const total = bungalowCost + vpTotal + rapTotal

  const familyRows = FAMILY_COSTS.map((family) => {
    const overnightUnits =
      family.adults * adultWeight +
      (family.children + family.babies) * childWeight

    const familyVp =
      family.adults * VP_ADULT +
      family.children * VP_CHILD +
      family.babies * VP_BABY

    const familyPersons = family.adults + family.children + family.babies
    const familyRap = familyPersons * RAP_PER_PERSON

    const familyLodging = overnightUnits * overnightSharePerUnit
    const familyTotal = familyLodging + familyVp + familyRap

    return {
      ...family,
      vp: familyVp,
      rap: familyRap,
      lodging: familyLodging,
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
    rapPerPerson: RAP_PER_PERSON,
    rapTotal,
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
