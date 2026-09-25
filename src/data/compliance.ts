/**
 * The page that justifies the price.
 *
 * Every other differentiator — communication, long-term relationship, in-house
 * team — is claimed by every agency. Compliance is the one we can evidence.
 */

/** Twelve checks, from the existing Supplement Label Check. */
export const CHECKS = [
  { name: 'Nutritional information', detail: 'The declaration is present, in the right format for the market, and matches the formulation.' },
  { name: 'Health and nutrition claims', detail: 'Every claim on pack is one the market actually permits, in wording it permits.' },
  { name: 'Allergen declaration', detail: 'Allergens declared and emphasised as the regime requires.' },
  { name: 'Batch and date coding', detail: 'Space reserved and clear for the code applied at production.' },
  { name: 'Mandatory statements', detail: 'The statements the market requires on pack, present and correctly worded.' },
  { name: 'Ingredient verification', detail: 'The ingredient list matches the formulation, in descending order, correctly named.' },
  { name: 'Serving size and instructions', detail: 'Directions for use, serving size and servings per pack, consistent with the panel.' },
  { name: 'Additional information', detail: 'Storage, contact details, country of origin and anything else the regime requires.' },
  { name: 'Additive identification', detail: 'Additives named and categorised as the regime requires.' },
  { name: 'Sizing requirements', detail: 'No text below the legal minimum type size, measured rather than eyeballed.' },
  { name: 'Storage instructions', detail: 'Present, and consistent with the product’s stability data.' },
  { name: 'Vitamin and mineral NRVs', detail: '%NRV calculated and declared against the right reference values for the market.' },
] as const

/** The binding promise, quoted as it is given. */
export const PROMISE =
  'Supplement Factory’s technical and quality team will check all label artwork for compliance within the UK, EU and rest of the world before approving a label to print.'

export interface MarketRule {
  market: string
  regime: string
  carries: string[]
}

export const MARKETS: MarketRule[] = [
  {
    market: 'UK and EU',
    regime: 'Food supplement labelling',
    carries: [
      'Nutrition declaration',
      'Ingredients and allergens',
      'Net weight',
      'Storage',
      'Directions for use',
      'Mandatory statements',
    ],
  },
  {
    market: 'USA',
    regime: 'FDA dietary supplement',
    carries: [
      'Supplement Facts panel in FDA format',
      'US allergen and ingredient declarations',
      '“Dietary Supplement” on the front of pack',
      'Dual net weight, oz and g',
    ],
  },
  {
    market: 'USA — claims',
    regime: 'FDA structure/function',
    carries: [
      'The FDA disclaimer on pack',
      'Notification to the FDA within 30 days of first sale',
    ],
  },
  {
    market: 'Canada',
    regime: 'Health Canada NHP',
    carries: [
      'NPN on pack',
      'Mandatory bilingual English and French panels',
      'Wording that matches the licence exactly',
    ],
  },
  {
    market: 'Herbals',
    regime: 'Traditional Herbal Registration',
    carries: ['Applies to products such as Saw Palmetto'],
  },
]

/** Two real ones, anonymised. More persuasive than any claim. */
export const CAUGHT = [
  {
    headline: 'A word that was legal in one market and not the other',
    detail:
      'A pack described itself as “Unsweetened”. In the US it could not: 6 g of fructose per stick counts as added sugar to the FDA. “Unflavoured” was fine. Caught before proof stage.',
  },
  {
    headline: 'A declaration that was right, and arithmetic that was not',
    detail:
      'A collagen pouch declared 250 mg of vitamin C, while the formulation delivered it as 277.01 mg of sodium ascorbate. The declaration was correct and nothing on pack had to change — but only because someone checked.',
  },
] as const

/**
 * BRC rebranded to BRCGS in 2019. The white label shop already shows BRCGS and
 * the main site still says BRC. Decision 7 in the brief, owner James Wilson.
 * Until it is settled, this is the one label used everywhere on the site, so
 * there is a single place to change it.
 */
export const ACCREDITATIONS = [
  { mark: 'BRCGS', detail: 'AA grade' },
  { mark: 'GMP', detail: 'NSF certified' },
  { mark: 'Halal', detail: 'Certified' },
] as const

/** Three facts that save a week of back-and-forth each. */
export const ARTWORK_SPEC = {
  accepted: 'Adobe Illustrator preferred, plus PSD, PDF, EPS and TIFF, at 300 DPI or higher',
  logos: 'Vector — AI, EPS or SVG',
  keepClear:
    'Roughly 2 cm × 3 cm must be kept clear on every pack for the batch number and best-before date, overprinted at production',
} as const
