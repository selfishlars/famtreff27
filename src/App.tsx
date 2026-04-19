import {
  ADULT_COUNT,
  BABY_COUNT,
  CHILD_COUNT,
  FEUERKUPPE_VARIANTS,
  VP_ADULT,
  VP_BABY,
  VP_CHILD,
} from './data/feuerkuppeData'
import {
  eur,
  getRoomBedShareByHouseCosts,
  getRoomLinearCosts,
  getVariantCosts,
  getWeightedVariantCosts,
} from './utils/costs'

type Scenario = {
  id: string
  title: string
  description: string
  mode: 'person-weighted' | 'room-linear' | 'room-beds-house'
  adultWeight?: number
  childWeight?: number
}

function App() {
  const variant = FEUERKUPPE_VARIANTS.find((item) => item.id === '4')

  if (!variant) {
    return (
      <main className="page-wrap">
        <section className="hero-card" aria-live="polite">
          <p className="offline-kicker">Familientreffen 2027</p>
          <h1>Variante 4 nicht gefunden</h1>
        </section>
      </main>
    )
  }

  const vpReference = getVariantCosts(variant.bungalowCost)

  const scenarios: Scenario[] = [
    {
      id: '4',
      title: 'Variante 4',
      description: 'Standardmodell: Erwachsene und Kinder mit gleicher Gewichtung (1.0).',
      mode: 'person-weighted',
      adultWeight: 1,
      childWeight: 1,
    },
    {
      id: '4_2',
      title: 'Variante 4_2',
      description: 'Bungalowkosten werden nur auf Erwachsene umgelegt (Kindergewichtung 0).',
      mode: 'person-weighted',
      adultWeight: 1,
      childWeight: 0,
    },
    {
      id: '4_3',
      title: 'Variante 4_3',
      description: 'Kinder (3+ und 0-3) erhalten Gewichtung 0.5 bei der Bungalow-Umlage.',
      mode: 'person-weighted',
      adultWeight: 1,
      childWeight: 0.5,
    },
    {
      id: '5_0',
      title: 'Variante 5_0',
      description: 'Lineare Zimmer-Umlage: jedes Zimmer traegt den gleichen Anteil der Bungalowkosten.',
      mode: 'room-linear',
    },
    {
      id: '5_1',
      title: 'Variante 5_1',
      description:
        'Zimmeranteil je Haus nach Schlafplaetzen: Zimmerkosten = Hausanteil × (Zimmerbetten / Hausbetten).',
      mode: 'room-beds-house',
    },
  ]

  return (
    <main className="page-wrap">
      <section className="hero-card" aria-live="polite">
        <p className="offline-kicker">Familientreffen 2027</p>
        <h1>Feuerkuppe Varianten & Kostenuebersicht</h1>
        <p>Die Uebersicht zeigt die Belegung und Kostenschaetzung je Unterkunftsvariante.</p>
      </section>

      <section className="meta-card" aria-labelledby="grundlagen-heading">
        <h2 id="grundlagen-heading">Planungsgrundlage</h2>
        <div className="meta-grid">
          <article>
            <h3>Personen</h3>
            <ul>
              <li>Erwachsene: {ADULT_COUNT}</li>
              <li>Kinder (3+): {CHILD_COUNT}</li>
              <li>Kinder (0-3): {BABY_COUNT}</li>
            </ul>
          </article>
          <article>
            <h3>VP-Kosten pro Person</h3>
            <ul>
              <li>Erwachsene: {eur(VP_ADULT)}</li>
              <li>Kinder (3+): {eur(VP_CHILD)}</li>
              <li>Kinder (0-3): {eur(VP_BABY)}</li>
            </ul>
          </article>
        </div>
      </section>

      {scenarios.map((scenario) => {
        const personCosts =
          scenario.mode === 'person-weighted'
            ? getWeightedVariantCosts(variant.bungalowCost, {
                adultWeight: scenario.adultWeight ?? 1,
                childWeight: scenario.childWeight ?? 1,
              })
            : null

        const roomLinear =
          scenario.mode === 'room-linear' ? getRoomLinearCosts(variant) : null

        const roomByHouseBeds =
          scenario.mode === 'room-beds-house'
            ? getRoomBedShareByHouseCosts(variant)
            : null

        return (
          <section key={scenario.id} className="variant-card">
            <header className="variant-header">
              <div>
                <h2>{scenario.title}</h2>
                <p className="muted">
                  {variant.housingSetup} · {variant.categoryLabel}
                </p>
                <p className="muted">{variant.accessibility}</p>
                <p className="muted">{scenario.description}</p>
              </div>
              <div className="variant-totals">
                <p>Bungalows: {eur(variant.bungalowCost)}</p>
                <p>VP gesamt: {eur(vpReference.vpTotal)}</p>
                <p className="sum">Gesamt: {eur(variant.bungalowCost + vpReference.vpTotal)}</p>
              </div>
            </header>

            {personCosts && (
              <>
                <div className="table-wrap">
                  <table>
                    <caption>Kostenkalkulation (Herleitung)</caption>
                    <thead>
                      <tr>
                        <th>Baustein</th>
                        <th>Berechnung</th>
                        <th>Wert</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Gewichtung Erwachsene</td>
                        <td>Fixwert je erwachsene Person</td>
                        <td>{personCosts.adultWeight.toLocaleString('de-DE')}</td>
                      </tr>
                      <tr>
                        <td>Gewichtung Kinder (3+ und 0-3)</td>
                        <td>Fixwert je Kind</td>
                        <td>{personCosts.childWeight.toLocaleString('de-DE')}</td>
                      </tr>
                      <tr>
                        <td>Umlageeinheiten gesamt</td>
                        <td>
                          ({ADULT_COUNT} × {personCosts.adultWeight}) + ({CHILD_COUNT} + {BABY_COUNT}) ×{' '}
                          {personCosts.childWeight}
                        </td>
                        <td>{personCosts.overnightAllocationUnits.toLocaleString('de-DE')}</td>
                      </tr>
                      <tr>
                        <td>Bungalow-Umlage je Einheit</td>
                        <td>{eur(variant.bungalowCost)} / {personCosts.overnightAllocationUnits.toLocaleString('de-DE')}</td>
                        <td>{eur(personCosts.overnightSharePerUnit)}</td>
                      </tr>
                      <tr>
                        <td>Uebernachtungsanteil Erwachsene</td>
                        <td>{eur(personCosts.overnightSharePerUnit)} × {personCosts.adultWeight}</td>
                        <td>{eur(personCosts.adultOvernight)}</td>
                      </tr>
                      <tr>
                        <td>Uebernachtungsanteil Kind</td>
                        <td>{eur(personCosts.overnightSharePerUnit)} × {personCosts.childWeight}</td>
                        <td>{eur(personCosts.childOvernight)}</td>
                      </tr>
                      <tr>
                        <td>Preis pro Erwachsener</td>
                        <td>{eur(personCosts.adultOvernight)} + {eur(VP_ADULT)}</td>
                        <td>{eur(personCosts.adultPrice)}</td>
                      </tr>
                      <tr>
                        <td>Preis pro Kind (3+)</td>
                        <td>{eur(personCosts.childOvernight)} + {eur(VP_CHILD)}</td>
                        <td>{eur(personCosts.childPrice)}</td>
                      </tr>
                      <tr>
                        <td>Preis pro Kind (0-3)</td>
                        <td>{eur(personCosts.childOvernight)} + {eur(VP_BABY)}</td>
                        <td>{eur(personCosts.child03Price)}</td>
                      </tr>
                      <tr>
                        <td>VP gesamt</td>
                        <td>
                          ({ADULT_COUNT} × {eur(VP_ADULT)}) + ({CHILD_COUNT} × {eur(VP_CHILD)}) + ({BABY_COUNT} ×{' '}
                          {eur(VP_BABY)})
                        </td>
                        <td>{eur(personCosts.vpTotal)}</td>
                      </tr>
                      <tr>
                        <td>Gesamtkosten Variante</td>
                        <td>{eur(variant.bungalowCost)} + {eur(personCosts.vpTotal)}</td>
                        <td>{eur(personCosts.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-wrap">
                  <table>
                    <caption>Kosten je Familie</caption>
                    <thead>
                      <tr>
                        <th>Familie</th>
                        <th>Erw.</th>
                        <th>Kind 3+</th>
                        <th>Kind 0-3</th>
                        <th>VP-Anteil</th>
                        <th>Gesamt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {personCosts.familyRows.map((family) => (
                        <tr key={`${scenario.id}-${family.family}`}>
                          <td>{family.family}</td>
                          <td>{family.adults}</td>
                          <td>{family.children}</td>
                          <td>{family.babies}</td>
                          <td>{eur(family.vp)}</td>
                          <td>{eur(family.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {roomLinear && (
              <>
                <div className="table-wrap">
                  <table>
                    <caption>Kostenkalkulation (Herleitung)</caption>
                    <thead>
                      <tr>
                        <th>Baustein</th>
                        <th>Berechnung</th>
                        <th>Wert</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Zimmeranzahl</td>
                        <td>Anzahl aller Zimmer in Variante 4</td>
                        <td>{roomLinear.roomCount}</td>
                      </tr>
                      <tr>
                        <td>Kosten je Zimmer</td>
                        <td>{eur(variant.bungalowCost)} / {roomLinear.roomCount}</td>
                        <td>{eur(roomLinear.roomCost)}</td>
                      </tr>
                      <tr>
                        <td>Gesamtkosten Variante</td>
                        <td>{eur(variant.bungalowCost)} + {eur(vpReference.vpTotal)}</td>
                        <td>{eur(variant.bungalowCost + vpReference.vpTotal)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-wrap">
                  <table>
                    <caption>Zimmerkosten je Raum (lineare Zimmer-Umlage)</caption>
                    <thead>
                      <tr>
                        <th>Raum</th>
                        <th>Betten</th>
                        <th>Belegt</th>
                        <th>Zimmerkosten</th>
                        <th>Kosten je belegtem Bett</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomLinear.roomRows.map((room) => (
                        <tr key={`${scenario.id}-${room.room}`}>
                          <td>{room.room}</td>
                          <td>{room.beds}</td>
                          <td>{room.occupiedBeds}</td>
                          <td>{eur(room.roomCost)}</td>
                          <td>{room.occupiedBeds > 0 ? eur(room.perOccupiedBed) : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {roomByHouseBeds && (
              <>
                <div className="table-wrap">
                  <table>
                    <caption>Kostenkalkulation (Herleitung)</caption>
                    <thead>
                      <tr>
                        <th>Baustein</th>
                        <th>Berechnung</th>
                        <th>Wert</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Anzahl Haeuser</td>
                        <td>Ermittelt aus Zimmergruppen</td>
                        <td>{roomByHouseBeds.houseCount}</td>
                      </tr>
                      <tr>
                        <td>Kostenanteil je Haus</td>
                        <td>{eur(variant.bungalowCost)} / {roomByHouseBeds.houseCount}</td>
                        <td>{eur(roomByHouseBeds.houseShare)}</td>
                      </tr>
                      <tr>
                        <td>Zimmerkosten je Haus</td>
                        <td>Hausanteil × (Zimmerbetten / Hausbetten)</td>
                        <td>Nach Bettanteil verteilt</td>
                      </tr>
                      <tr>
                        <td>Gesamtkosten Variante</td>
                        <td>{eur(variant.bungalowCost)} + {eur(vpReference.vpTotal)}</td>
                        <td>{eur(variant.bungalowCost + vpReference.vpTotal)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-wrap">
                  <table>
                    <caption>Zimmerkosten je Raum (Bettanteil im Haus)</caption>
                    <thead>
                      <tr>
                        <th>Haus</th>
                        <th>Raum</th>
                        <th>Betten</th>
                        <th>Hausbetten</th>
                        <th>Bettanteil</th>
                        <th>Zimmerkosten</th>
                        <th>Kosten je belegtem Bett</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomByHouseBeds.roomRows.map((room) => (
                        <tr key={`${scenario.id}-${room.room}`}>
                          <td>{room.house}</td>
                          <td>{room.room}</td>
                          <td>{room.beds}</td>
                          <td>{room.totalHouseBeds}</td>
                          <td>{(room.roomShare * 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %</td>
                          <td>{eur(room.roomCost)}</td>
                          <td>{room.occupiedBeds > 0 ? eur(room.perOccupiedBed) : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <div className="table-wrap">
              <table>
                <caption>Zimmerbelegung</caption>
                <thead>
                  <tr>
                    <th>Raum</th>
                    <th>Typ</th>
                    <th>Betten</th>
                    <th>Belegt</th>
                    <th>Sanitaer</th>
                    <th>Belegung</th>
                  </tr>
                </thead>
                <tbody>
                  {variant.rooms.map((room) => (
                    <tr key={room.room}>
                      <td>{room.room}</td>
                      <td>{room.type}</td>
                      <td>{room.beds}</td>
                      <td>{room.occupiedBeds}</td>
                      <td>{room.bathroom}</td>
                      <td>{room.occupancy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )
      })}
    </main>
  )
}

export default App
