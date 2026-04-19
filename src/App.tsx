import {
  ADULT_ALLOCATION_WEIGHT,
  ADULT_COUNT,
  BABY_COUNT,
  CHILD_ALLOCATION_WEIGHT,
  CHILD_COUNT,
  FEUERKUPPE_VARIANTS,
  OVERNIGHT_ALLOCATION_UNITS,
  VP_ADULT,
  VP_BABY,
  VP_CHILD,
} from './data/feuerkuppeData'
import { eur, getVariantCosts } from './utils/costs'

function App() {
  const visibleVariants = FEUERKUPPE_VARIANTS.filter((variant) => variant.id === '4')

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
              <li>Umlageeinheiten gesamt: {OVERNIGHT_ALLOCATION_UNITS}</li>
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

      {visibleVariants.map((variant) => {
        const costs = getVariantCosts(variant.bungalowCost)

        return (
          <section key={variant.id} className="variant-card">
            <header className="variant-header">
              <div>
                <h2>{variant.title}</h2>
                <p className="muted">
                  {variant.housingSetup} · {variant.categoryLabel}
                </p>
                <p className="muted">{variant.accessibility}</p>
              </div>
              <div className="variant-totals">
                <p>Bungalows: {eur(variant.bungalowCost)}</p>
                <p>VP gesamt: {eur(costs.vpTotal)}</p>
                <p className="sum">Gesamt: {eur(costs.total)}</p>
              </div>
            </header>

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
                    <td>{ADULT_ALLOCATION_WEIGHT.toLocaleString('de-DE')}</td>
                  </tr>
                  <tr>
                    <td>Gewichtung Kinder (3+ und 0-3)</td>
                    <td>Fixwert je Kind</td>
                    <td>{CHILD_ALLOCATION_WEIGHT.toLocaleString('de-DE')}</td>
                  </tr>
                  <tr>
                    <td>Umlageeinheiten gesamt</td>
                    <td>
                      ({ADULT_COUNT} × {ADULT_ALLOCATION_WEIGHT}) + ({CHILD_COUNT} + {BABY_COUNT}) ×{' '}
                      {CHILD_ALLOCATION_WEIGHT}
                    </td>
                    <td>{OVERNIGHT_ALLOCATION_UNITS.toLocaleString('de-DE')}</td>
                  </tr>
                  <tr>
                    <td>Bungalow-Umlage je Einheit</td>
                    <td>{eur(variant.bungalowCost)} / {OVERNIGHT_ALLOCATION_UNITS}</td>
                    <td>{eur(costs.overnightSharePerUnit)}</td>
                  </tr>
                  <tr>
                    <td>Uebernachtungsanteil Erwachsene</td>
                    <td>{eur(costs.overnightSharePerUnit)} × {ADULT_ALLOCATION_WEIGHT}</td>
                    <td>{eur(costs.adultOvernight)}</td>
                  </tr>
                  <tr>
                    <td>Uebernachtungsanteil Kind</td>
                    <td>{eur(costs.overnightSharePerUnit)} × {CHILD_ALLOCATION_WEIGHT}</td>
                    <td>{eur(costs.childOvernight)}</td>
                  </tr>
                  <tr>
                    <td>Preis pro Erwachsener</td>
                    <td>{eur(costs.adultOvernight)} + {eur(VP_ADULT)}</td>
                    <td>{eur(costs.adultPrice)}</td>
                  </tr>
                  <tr>
                    <td>Preis pro Kind (3+)</td>
                    <td>{eur(costs.childOvernight)} + {eur(VP_CHILD)}</td>
                    <td>{eur(costs.childPrice)}</td>
                  </tr>
                  <tr>
                    <td>Preis pro Kind (0-3)</td>
                    <td>{eur(costs.childOvernight)} + {eur(VP_BABY)}</td>
                    <td>{eur(costs.child03Price)}</td>
                  </tr>
                  <tr>
                    <td>VP gesamt</td>
                    <td>
                      ({ADULT_COUNT} × {eur(VP_ADULT)}) + ({CHILD_COUNT} × {eur(VP_CHILD)}) + ({BABY_COUNT} ×{' '}
                      {eur(VP_BABY)})
                    </td>
                    <td>{eur(costs.vpTotal)}</td>
                  </tr>
                  <tr>
                    <td>Gesamtkosten Variante</td>
                    <td>{eur(variant.bungalowCost)} + {eur(costs.vpTotal)}</td>
                    <td>{eur(costs.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
                  {costs.familyRows.map((family) => (
                    <tr key={family.family}>
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
          </section>
        )
      })}
    </main>
  )
}

export default App
