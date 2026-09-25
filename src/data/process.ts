/**
 * Five stages, published as the proposal already states them, with the honest
 * caveat kept and one honest addition the proposal does not make.
 */

export interface Stage {
  n: number
  name: string
  what: string
  needs: string
}

export const STAGES: Stage[] = [
  {
    n: 1,
    name: 'Discovery call',
    what: 'A video call to understand the project and requirements, discuss early ideas and answer your questions.',
    needs: 'An hour, and your product idea',
  },
  {
    n: 2,
    name: 'Questionnaire',
    what: 'If we are the right fit, we send an invoice and a detailed questionnaire tailored to your product. The completed questionnaire becomes the brief.',
    needs: 'Payment, and the questionnaire completed properly',
  },
  {
    n: 3,
    name: 'Design process',
    what: 'The design team works from your brief to create the design proposal.',
    needs: 'Nothing — this is our time',
  },
  {
    n: 4,
    name: 'Design proposal and revisions',
    what: 'A print-ready design is presented. Up to three rounds of revisions are included.',
    needs: 'Consolidated feedback per round',
  },
  {
    n: 5,
    name: 'Final sign off',
    what: 'An internal compliance check against the rules of your area of sale, then the artwork files with full ownership.',
    needs: 'Written approval',
  },
]

export const CAVEAT =
  'Because every project is different, it means we can’t always predict the same process for each of our clients. However the process below is what we always work towards.'

export const TIMINGS = [
  { figure: '4 to 6 weeks', detail: 'To finalise a packaging design. This is the headline figure.' },
  { figure: '7 working days', detail: 'For a label design with no revisions.' },
  { figure: '3 rounds', detail: 'Revisions included. Each additional round is £200.' },
  { figure: 'Rush work', detail: 'Tell us the deadline and the complexity and we will say whether we can hit it.' },
] as const

/**
 * The honest addition. On live projects the design work itself has rarely been
 * the delay — a missing cutter guide, unconfirmed nutrition figures and an
 * unanswered question about which market the pack sells into have each cost
 * weeks. Saying so converts better than a promise the process cannot keep.
 */
export const TIMELINE_CAVEAT =
  'The timeline runs from when we have what we need, not from the invoice.'

/** What we need from you. Every one of these has stalled a live project. */
export const WE_NEED = [
  { item: 'The cutter guide or die line', from: 'Your packaging supplier', why: 'Nothing can be laid out until the shape is known. Sourcing sits on the critical path.' },
  { item: 'Your GTIN and barcode image', from: 'GS1, or your own allocation', why: 'A placeholder barcode that reaches print is a reprint.' },
  { item: 'Confirmed formulation and nutrition figures', from: 'Your formulator, or us if you manufacture here', why: 'Panels stay placeholder until these are issued. The single most common cause of delay.' },
  { item: 'Branded-ingredient licences', from: 'The ingredient owner — Peptan and similar', why: 'The mark cannot go on pack without the licence in place.' },
  { item: 'Your brand assets', from: 'You, in vector', why: 'A logo supplied as a screenshot cannot be printed.' },
] as const

/** Not included, and the website has to say so. Every one has caused a stall. */
export const NOT_INCLUDED = [
  'The cutter guide or die line from your packaging supplier',
  'Your GTIN and barcode image',
  'Confirmed formulation and nutrition figures',
  'Branded-ingredient licences such as Peptan',
  'Print, origination and reprographics',
  'Physical packaging components',
] as const
