/**
 * The eight case studies.
 *
 * Two things gate this file, and both are in the brief's decision list:
 *
 *  1. The testimonials were collected for a private proposal sent to one person.
 *     Public use on a website is a different thing and has to be asked for
 *     explicitly, along with the right to use the pack photography.
 *  2. Every quote as originally given names Dieter personally, and he has left.
 *     Published as-is, the site's entire proof rests on someone who is no longer
 *     here. The lines below are reframed around the team and the work — no
 *     personal byline — but they still need re-permissioning before they are
 *     public.
 *
 * So TESTIMONIALS_CLEARED gates the quotes, and only the quotes. Every case
 * study page renders without them: the pack, the format, the brief, what was
 * designed and any compliance issue caught are all real and all ours to show.
 * The moment Lee confirms permission, flip this one constant and the client
 * words appear on the case study pages, the format pages and the homepage.
 */
export const TESTIMONIALS_CLEARED = false

export interface CaseStudy {
  slug: string
  client: string
  /** The person who gave the testimonial. Shown only when cleared. */
  contact: string
  product: string
  format: string
  /** Slug of the format family page this belongs to. */
  formatSlug: string
  tier: 'tier-1' | 'tier-2' | 'tier-3' | 'quote'
  /** The brief, in two sentences. */
  brief: string
  designed: string[]
  /** Any compliance issue caught before print. Empty where there was none to report. */
  complianceCaught?: string
  /** Reframed around the work, not a person. Shown only when cleared. */
  quote: string
  /** Pack photography. Sourced, rights confirmed, then dropped in. */
  image: string | null
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'sero-labs',
    client: 'Sero Labs',
    contact: 'Maduka Tuduwage',
    product: 'Hydration + Performance electrolyte blend',
    format: 'Stand-up pouch',
    formatSlug: 'pouches',
    tier: 'tier-2',
    brief:
      'An electrolyte blend that had to read as performance nutrition without tipping into the shouty end of the category. The pack needed to hold a long ingredient declaration and still look premium on a shelf.',
    designed: [
      'Stand-up pouch artwork across front, back and both gussets as one layout',
      'Nutrition declaration and ingredient panel set to the UK regime',
      'Multiple rounds of amendments through to sign-off',
    ],
    quote: 'Artwork that looks genuinely premium, with patience through multiple rounds of amendments.',
    image: null,
  },
  {
    slug: 'sigrid',
    client: 'SIGRID',
    contact: 'Ghislaine Robert-Nicoud',
    product: 'Carb Fence',
    format: 'Carton with liquid dosing sticks',
    formatSlug: 'cartons-and-blisters',
    tier: 'quote',
    brief:
      'A liquid dosing stick inside a carton, for a brand with existing products the new pack had to sit beside. The design had to take influence from what already existed without simply repeating it.',
    designed: [
      'Carton artwork drawn to the product’s own die line',
      'Liquid dosing stick artwork, with the panel hierarchy resolved at stick width',
      'A design system that reads as part of the existing range',
    ],
    quote:
      'Took influence from the existing products and created a premium design that exceeded expectations.',
    image: null,
  },
  {
    slug: 'io-nutrition',
    client: 'IO Nutrition',
    contact: 'Helen Ttofa',
    product: 'Muscle Momentum',
    format: 'Pouch',
    formatSlug: 'pouches',
    tier: 'tier-2',
    brief:
      'A brand identity already existed and was not up for redesign. The pack had to use it rather than replace it, and still arrive somewhere bold.',
    designed: [
      'Pouch artwork built on the client’s existing brand identity',
      'Front-of-pack hierarchy that holds at shelf distance',
      'Full compliance check against the UK regime before print',
    ],
    quote:
      'Used the existing brand identity and helped create a bold and unique design that fully aligned with the brand.',
    image: null,
  },
  {
    slug: 'gut-axis',
    client: 'Gut Axis',
    contact: 'Faizel Patel',
    product: 'Gut X Axis',
    format: 'Tub',
    formatSlug: 'tubs-pots-and-jars',
    tier: 'tier-1',
    brief:
      'A gut health powder in a tub, from a founder who had been told by others to use a cheap freelance marketplace instead. The pack had to justify the difference.',
    designed: [
      'Tub label artwork, with the wrap join designed rather than discovered',
      'Nutrition and ingredient panel set to the UK regime',
      'Compliance check before print',
    ],
    quote:
      'Weighed against a cheap freelance marketplace, and judged worth every penny once the work landed.',
    image: null,
  },
  {
    slug: 'genesyx',
    client: 'Genesyx',
    contact: 'Mihai Manea',
    product: 'Carton range',
    format: 'Carton',
    formatSlug: 'cartons-and-blisters',
    tier: 'quote',
    brief:
      'A carton range where the client had a clear product vision but no artwork. The design had to be trusted to carry it without the client art-directing every step.',
    designed: [
      'Carton artwork drawn to a die line for this product',
      'Front and back CMYK, with the inner and outer board colours accounted for',
      'Compliance check before print',
    ],
    quote: 'Full trust that the team would fulfil the product’s vision.',
    image: null,
  },
  {
    slug: 'bower-botanicals',
    client: 'Bower Botanicals',
    contact: 'Jess and Samuel Hayden-Smith',
    product: 'Daily Greens',
    format: 'Carton plus amber jar',
    formatSlug: 'cartons-and-blisters',
    tier: 'tier-3',
    brief:
      'A wellness brand with a clear positioning and no pack to match it. Two components — a carton and an amber jar — that had to work as one product.',
    designed: [
      'Carton artwork and amber jar label as a single design system',
      'A palette and type treatment carried across both components',
      'Compliance check across both artworks',
    ],
    quote:
      'Translated the positioning into a design direction that feels elevated, cohesive and aligned with the brand.',
    image: null,
  },
  {
    slug: 'uniq',
    client: 'UNIQ',
    contact: 'David Kukelka',
    product: 'VIGOR',
    format: 'Pouch',
    formatSlug: 'pouches',
    tier: 'tier-2',
    brief:
      'A founder who was not sure the idea in their head could be built at all. The first job was showing that it could.',
    designed: [
      'Pouch artwork across front, back and gussets',
      'Concept direction developed from a loose starting brief',
      'Compliance check before print',
    ],
    quote:
      'Started unsure the vision could be made real, and ended thrilled with the result.',
    image: null,
  },
  {
    slug: 'the-sozial-club',
    client: 'The Sozial Club',
    contact: 'Adrian Rodriguez',
    product: 'AURA capsules',
    format: 'Bottle',
    formatSlug: 'bottles',
    tier: 'tier-1',
    brief:
      'A capsule bottle for a brand with strong ideas and no visual language yet. The work was translation more than decoration.',
    designed: [
      'Bottle label artwork, with the curve accounted for in the layout',
      'Visual concepts developed from the brand’s own ideas',
      'Compliance check before print',
    ],
    quote: 'Instantly grasped the ideas and translated them into strong visual concepts.',
    image: null,
  },
]

export const caseStudyBySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug)
export const caseStudiesForFormat = (formatSlug: string) =>
  CASE_STUDIES.filter((c) => c.formatSlug === formatSlug)

/**
 * The proof the site is missing, and the brief is right that it is the most
 * compelling thing we could publish: the artwork a client brought us, what would
 * have failed, and what shipped. The material exists on at least two live
 * projects. It sells the compliance check better than any description of it.
 */
export const BEFORE_AFTER_PENDING = true
