/**
 * The rate card, exactly as the proposal states it. Every price on the site is
 * read from here — a tier card, a format page, the estimator and the worked
 * examples all quote the same object, so a price cannot be changed on one page
 * and left stale on another.
 *
 * VAT applies to UK-based clients. All figures CONFIRMED from the proposal.
 */

export type Money = number

export interface Tier {
  id: 'tier-1' | 'tier-2' | 'tier-3'
  name: string
  covers: string
  price: Money
  /** Why this tier costs what it costs. A client will ask. */
  rationale: string
  formats: string[]
}

/** Identical on all three tiers. The only variable is the format and the price. */
export const TIER_INCLUSIONS = [
  'One packaging design for one product — a design proposal, then up to three rounds of revisions',
  'An internal compliance check against the rules of your area of sale, before anything goes to print',
  'Final artwork handover files, with full ownership transferring to you',
] as const

export const TIERS: Tier[] = [
  {
    id: 'tier-1',
    name: 'Tier 1',
    covers: 'One product in a bottle, jar or tub',
    price: 1000,
    rationale:
      'A label wraps a cylinder. The join matters and the curve eats more of the label area than people expect, but it is one flat panel laid out once.',
    formats: ['bottle', 'tub-pot-jar'],
  },
  {
    id: 'tier-2',
    name: 'Tier 2',
    covers: 'One product in a pouch',
    price: 1250,
    rationale:
      'A pouch is a single continuous printed surface with a gusset and a zip band, so front, back, sides and seal all have to be laid out as one artwork against a cutter guide. That is why it costs more than a tub.',
    formats: ['pouch'],
  },
  {
    id: 'tier-3',
    name: 'Tier 3',
    covers: 'One product with dual type packaging',
    price: 1500,
    rationale:
      'Two packs that have to work as one product — a tub and its matching carton, say. Two artworks, one design system, one compliance check across both.',
    formats: ['dual-type'],
  },
]

export interface ComplianceProduct {
  id: 'check' | 'check-plus'
  name: string
  forWhom: string
  price: Money
}

export const COMPLIANCE_PRODUCTS: ComplianceProduct[] = [
  {
    id: 'check',
    name: 'Compliance Check Service',
    forWhom:
      'You already have a design and you are not sure it is compliant. Our technical and quality team review it and give you feedback.',
    price: 750,
  },
  {
    id: 'check-plus',
    name: 'Compliance Check Plus',
    forWhom: 'The same review, plus one design amendment to make the artwork fully compliant.',
    price: 1000,
  },
]

export interface AddOn {
  id: string
  name: string
  covers: string
  price: Money
  unit: string
  /** Shown on the add-ons page where the price needs defending. */
  note?: string
}

export const ADD_ONS: AddOn[] = [
  {
    id: 'language-ltr',
    name: 'Additional language, left-to-right',
    covers: 'Each extra language on one artwork',
    price: 200,
    unit: 'per language, per artwork',
  },
  {
    id: 'language-rtl',
    name: 'Additional language, right-to-left',
    covers: 'Each extra right-to-left language on one artwork',
    price: 400,
    unit: 'per language, per artwork',
    note:
      'Double the left-to-right price, and it should be: a right-to-left pack is a mirrored layout with different typesetting, and the whole composition is rebuilt rather than translated.',
  },
  {
    id: 'revision',
    name: 'Additional revision',
    covers: 'Each round beyond the three included, on one artwork',
    price: 200,
    unit: 'per round, per artwork',
  },
  {
    id: 'territory',
    name: 'Artwork territory variation',
    covers: 'A variation of your primary artwork, compliant with a new territory of sale',
    price: 500,
    unit: 'per territory',
    note:
      'A Canadian pack is not a US pack with the French removed. It is a second artwork.',
  },
]

export interface WorkedExample {
  scenario: string
  buildUp: string
  total: Money
}

/** A price table is abstract. These convert. */
export const WORKED_EXAMPLES: WorkedExample[] = [
  { scenario: 'One pouch, UK only', buildUp: 'Tier 2', total: 1250 },
  { scenario: 'One pouch, UK and US', buildUp: 'Tier 2 + 1 territory variation', total: 1750 },
  {
    scenario: 'One pouch, UK and Canada, bilingual',
    buildUp: 'Tier 2 + 1 territory + 1 left-to-right language',
    total: 1950,
  },
  { scenario: 'Tub and matching carton, UK', buildUp: 'Tier 3, dual type', total: 1500 },
  { scenario: 'Existing artwork, needs fixing', buildUp: 'Compliance Check Plus', total: 1000 },
]

/**
 * Not on the rate card, and the brief flags that as a decision still open
 * (decision 4, owner Greg). Stated honestly rather than invented.
 */
export const BRAND_IDENTITY = {
  name: 'Brand identity',
  includes: [
    'Moodboard and creative direction',
    'Logo suite',
    'Colour and typography',
    'Branding sheet',
    'Handover pack',
  ],
  priceLabel: 'Quoted per project',
  note:
    'Brand identity sits outside the packaging rate card. Tell us what you need and we will price it before any work starts.',
} as const

export const gbp = (n: Money) => '£' + n.toLocaleString('en-GB')
