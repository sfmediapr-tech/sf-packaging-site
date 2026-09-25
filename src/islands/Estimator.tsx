import { useMemo, useState } from 'react'
import { TIERS, ADD_ONS, COMPLIANCE_PRODUCTS, gbp } from '../data/pricing'

/**
 * The project configurator, phase one.
 *
 * Its job is not to take payment. It is to produce a specification we can price,
 * and to collect the things that stall projects at the moment the client is most
 * willing to give them.
 *
 * Question order is deliberate and market comes first, because market decides the
 * panel format, the mandatory statements, the claim rules and whether the job is
 * one artwork or two. Asking it last is what cost a live project three months of
 * rework.
 *
 * What it does not do yet: validate a quantity against the format's MOQ, or hide
 * options incompatible with the chosen format. Both need the die line and format
 * rule library, and both belong with the quote feed into The Hive.
 */

const TERRITORIES = ['UK', 'EU', 'USA', 'Canada', 'Other'] as const
const PRODUCTS = ['Capsule', 'Tablet', 'Powder', 'Gummy', 'Softgel', 'Liquid or gel'] as const

const PACKS = [
  { id: 'bottle', label: 'Bottle', tier: 'tier-1' },
  { id: 'jar', label: 'Jar', tier: 'tier-1' },
  { id: 'tub', label: 'Tub', tier: 'tier-1' },
  { id: 'pot', label: 'Pot', tier: 'tier-1' },
  { id: 'pouch', label: 'Pouch', tier: 'tier-2' },
  { id: 'stick', label: 'Stick', tier: 'quote' },
  { id: 'sachet', label: 'Sachet', tier: 'quote' },
  { id: 'carton', label: 'Carton', tier: 'quote' },
  { id: 'blister', label: 'Blister', tier: 'quote' },
] as const

const territoryAddOn = ADD_ONS.find((a) => a.id === 'territory')!
const ltr = ADD_ONS.find((a) => a.id === 'language-ltr')!
const rtl = ADD_ONS.find((a) => a.id === 'language-rtl')!

type Answers = {
  territories: string[]
  extraLtr: number
  extraRtl: number
  product: string
  pack: string
  packCount: 'one' | 'dual' | 'more'
  cutterGuide: '' | 'yes' | 'no' | 'supplier'
  nutrition: '' | 'confirmed' | 'provisional' | 'with-you'
  barcode: '' | 'yes' | 'applying' | 'no'
  brand: '' | 'vector' | 'partial' | 'none'
  existingDesign: '' | 'yes' | 'no'
}

const BLANK: Answers = {
  territories: [],
  extraLtr: 0,
  extraRtl: 0,
  product: '',
  pack: '',
  packCount: 'one',
  cutterGuide: '',
  nutrition: '',
  barcode: '',
  brand: '',
  existingDesign: '',
}

export default function Estimator({ presetFormat = '' }: { presetFormat?: string }) {
  const [a, setA] = useState<Answers>({ ...BLANK, pack: presetFormat })
  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((p) => ({ ...p, [k]: v }))

  const toggleTerritory = (t: string) =>
    setA((p) => ({
      ...p,
      territories: p.territories.includes(t)
        ? p.territories.filter((x) => x !== t)
        : [...p.territories, t],
    }))

  const estimate = useMemo(() => {
    const lines: { label: string; amount: number | null }[] = []

    const pack = PACKS.find((p) => p.id === a.pack)
    const tierId = a.packCount === 'dual' ? 'tier-3' : pack?.tier
    const tier = TIERS.find((t) => t.id === tierId)

    if (a.packCount === 'dual') {
      lines.push({ label: 'Tier 3 — dual type packaging', amount: 1500 })
    } else if (tier) {
      lines.push({ label: `${tier.name} — ${tier.covers.toLowerCase()}`, amount: tier.price })
    } else if (pack) {
      lines.push({ label: `${pack.label} — quoted per project`, amount: null })
    }

    // Each territory beyond the first is a separate artwork.
    const extraTerritories = Math.max(0, a.territories.length - 1)
    if (extraTerritories > 0) {
      lines.push({
        label: `${extraTerritories} × territory variation`,
        amount: extraTerritories * territoryAddOn.price,
      })
    }
    if (a.extraLtr > 0) {
      lines.push({ label: `${a.extraLtr} × additional language`, amount: a.extraLtr * ltr.price })
    }
    if (a.extraRtl > 0) {
      lines.push({
        label: `${a.extraRtl} × additional right-to-left language`,
        amount: a.extraRtl * rtl.price,
      })
    }

    const known = lines.every((l) => l.amount !== null)
    const total = lines.reduce((n, l) => n + (l.amount ?? 0), 0)
    return { lines, total, known, hasPack: Boolean(pack) }
  }, [a])

  // The things that actually delay a project, surfaced before submission rather
  // than discovered three weeks in.
  const flags = useMemo(() => {
    const f: { level: 'stop' | 'warn'; text: string }[] = []

    if (a.existingDesign === 'yes')
      f.push({
        level: 'stop',
        text: 'You already have a design. The Compliance Check is probably what you want — it is cheaper than a redesign, and if the artwork needs changing, Check Plus includes the amendment.',
      })
    if (a.territories.length > 1)
      f.push({
        level: 'warn',
        text: `${a.territories.length} territories means ${a.territories.length} artworks. Each one beyond the first is a ${gbp(territoryAddOn.price)} variation, and they are separate designs rather than translations.`,
      })
    if (a.cutterGuide === 'no')
      f.push({
        level: 'warn',
        text: 'No cutter guide adds a sourcing step before layout can start, and your supplier’s turnaround sits on the critical path. Tell us the supplier and we will chase it with you.',
      })
    if (a.nutrition === 'provisional')
      f.push({
        level: 'warn',
        text: 'Provisional nutrition figures mean the panels stay placeholder until formulation issues them. This is the single most common cause of delay on a design project.',
      })
    if (a.barcode === 'no')
      f.push({
        level: 'warn',
        text: 'No GTIN yet. We can position and check the barcode, but the allocation has to come from you — start it now rather than at artwork sign-off.',
      })
    if (a.brand === 'none')
      f.push({
        level: 'warn',
        text: 'No brand assets yet. That is a brand identity job before it is a packaging job, and it is quoted separately.',
      })
    return f
  }, [a])

  const weeks = a.cutterGuide === 'no' ? '5 to 7 weeks, including die line sourcing' : '4 to 6 weeks'
  const complete = a.territories.length > 0 && a.pack !== '' && a.product !== ''

  return (
    <div className="cfg">
      <div className="cfg__questions">
        <Q n={1} label="Where are you selling?" hint="This comes first because it decides the panel format, the mandatory statements and the claim rules.">
          <div className="cfg__chips">
            {TERRITORIES.map((t) => (
              <button
                key={t}
                type="button"
                className={a.territories.includes(t) ? 'stage__tab is-on' : 'stage__tab'}
                aria-pressed={a.territories.includes(t)}
                onClick={() => toggleTerritory(t)}
              >
                {t}
              </button>
            ))}
          </div>
          {a.territories.length > 1 && (
            <p className="cfg__inline">
              {a.territories.length - 1} extra {a.territories.length === 2 ? 'territory' : 'territories'}
              {' '}· {gbp((a.territories.length - 1) * territoryAddOn.price)}
            </p>
          )}
        </Q>

        <Q n={2} label="What languages does the pack need?" hint="The first is included in the tier price.">
          <div className="cfg__pair">
            <label>
              Additional left-to-right
              <input type="number" min={0} max={9} value={a.extraLtr}
                     onChange={(e) => set('extraLtr', Math.max(0, +e.target.value))} />
              <span className="micro">{gbp(ltr.price)} each</span>
            </label>
            <label>
              Additional right-to-left
              <input type="number" min={0} max={9} value={a.extraRtl}
                     onChange={(e) => set('extraRtl', Math.max(0, +e.target.value))} />
              <span className="micro">{gbp(rtl.price)} each</span>
            </label>
          </div>
        </Q>

        <Q n={3} label="What is the product?">
          <div className="cfg__chips">
            {PRODUCTS.map((p) => (
              <button key={p} type="button"
                      className={a.product === p ? 'stage__tab is-on' : 'stage__tab'}
                      aria-pressed={a.product === p}
                      onClick={() => set('product', p)}>{p}</button>
            ))}
          </div>
        </Q>

        <Q n={4} label="What pack?" hint="This sets the tier.">
          <div className="cfg__chips">
            {PACKS.map((p) => (
              <button key={p.id} type="button"
                      className={a.pack === p.id ? 'stage__tab is-on' : 'stage__tab'}
                      aria-pressed={a.pack === p.id}
                      onClick={() => set('pack', p.id)}>{p.label}</button>
            ))}
          </div>
        </Q>

        <Q n={5} label="How many packs?">
          <Choice value={a.packCount} onChange={(v) => set('packCount', v as Answers['packCount'])}
                  options={[
                    { v: 'one', l: 'One' },
                    { v: 'dual', l: 'Dual type — two components, one product' },
                    { v: 'more', l: 'More than two' },
                  ]} />
        </Q>

        <Q n={6} label="Do you have a cutter guide or die line?">
          <Choice value={a.cutterGuide} onChange={(v) => set('cutterGuide', v as Answers['cutterGuide'])}
                  options={[
                    { v: 'yes', l: 'Yes, I have it' },
                    { v: 'supplier', l: 'My supplier has one' },
                    { v: 'no', l: 'No' },
                  ]} />
        </Q>

        <Q n={7} label="Do you have confirmed nutrition figures?">
          <Choice value={a.nutrition} onChange={(v) => set('nutrition', v as Answers['nutrition'])}
                  options={[
                    { v: 'confirmed', l: 'Confirmed' },
                    { v: 'provisional', l: 'Provisional' },
                    { v: 'with-you', l: 'Manufacturing with you' },
                  ]} />
        </Q>

        <Q n={8} label="Do you have a GTIN and barcode?">
          <Choice value={a.barcode} onChange={(v) => set('barcode', v as Answers['barcode'])}
                  options={[
                    { v: 'yes', l: 'Yes' },
                    { v: 'applying', l: 'Applying now' },
                    { v: 'no', l: 'Not started' },
                  ]} />
        </Q>

        <Q n={9} label="Do you have brand assets?">
          <Choice value={a.brand} onChange={(v) => set('brand', v as Answers['brand'])}
                  options={[
                    { v: 'vector', l: 'Logo in vector, colours and fonts' },
                    { v: 'partial', l: 'Some of it' },
                    { v: 'none', l: 'None yet' },
                  ]} />
        </Q>

        <Q n={10} label="Do you already have a design?">
          <Choice value={a.existingDesign} onChange={(v) => set('existingDesign', v as Answers['existingDesign'])}
                  options={[{ v: 'no', l: 'No' }, { v: 'yes', l: 'Yes, it needs checking' }]} />
        </Q>
      </div>

      <aside className="cfg__panel">
        <div className="cfg__sticky">
          <h2 className="micro">Your estimate</h2>

          {a.existingDesign === 'yes' ? (
            <div className="cfg__redirect">
              <p className="price price--gold">{gbp(COMPLIANCE_PRODUCTS[0].price)}</p>
              <p className="small">
                Compliance Check, or {gbp(COMPLIANCE_PRODUCTS[1].price)} with the amendment included.
              </p>
              <a href="/services/compliance-check" className="btn btn--primary">Check my artwork</a>
            </div>
          ) : !estimate.hasPack ? (
            <p className="small cfg__empty">
              Pick your pack at question four and the estimate builds itself from the published rate
              card — including any territory variations you have already chosen.
            </p>
          ) : (
            <>
              <ul className="cfg__lines">
                {estimate.lines.map((l, i) => (
                  <li key={i}>
                    <span>{l.label}</span>
                    <strong>{l.amount === null ? 'Quoted' : gbp(l.amount)}</strong>
                  </li>
                ))}
              </ul>
              <p className="price price--gold cfg__total">
                {estimate.known ? gbp(estimate.total) : `From ${gbp(estimate.total)}`}
                <sup>+VAT</sup>
              </p>
              {!estimate.known && (
                <p className="micro">
                  This format is not on the published tier list. We design it regularly — the price
                  depends on the structure and the die line, and we quote it before any work starts.
                </p>
              )}
              <p className="cfg__weeks spec">{weeks}</p>
            </>
          )}

          {flags.length > 0 && (
            <ul className="cfg__flags">
              {flags.map((f, i) => (
                <li key={i} className={f.level === 'stop' ? 'is-stop' : ''}>{f.text}</li>
              ))}
            </ul>
          )}

          <a href="/contact" className={complete ? 'btn btn--ink cfg__send' : 'btn btn--ghost cfg__send'}>
            {complete ? 'Send this specification' : 'Or book a discovery call'}
          </a>
          <p className="micro cfg__vat">VAT applies to UK-based clients.</p>
        </div>
      </aside>
    </div>
  )
}

function Q({ n, label, hint, children }: {
  n: number; label: string; hint?: string; children: React.ReactNode
}) {
  return (
    <fieldset className="cfg__q">
      <legend>
        <span className="cfg__n spec">{String(n).padStart(2, '0')}</span>
        {label}
      </legend>
      {hint && <p className="cfg__hint small">{hint}</p>}
      {children}
    </fieldset>
  )
}

function Choice({ value, onChange, options }: {
  value: string
  onChange: (v: string) => void
  options: { v: string; l: string }[]
}) {
  return (
    <div className="cfg__chips">
      {options.map((o) => (
        <button key={o.v} type="button"
                className={value === o.v ? 'stage__tab is-on' : 'stage__tab'}
                aria-pressed={value === o.v}
                onClick={() => onChange(o.v)}>{o.l}</button>
      ))}
    </div>
  )
}
