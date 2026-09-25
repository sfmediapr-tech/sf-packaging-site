/**
 * Navigation, contact and the things still awaiting a decision.
 */

export const SITE = {
  name: 'Supplement Factory',
  section: 'Packaging Design',
  tagline: 'Packaging design for supplement brands, built compliant from the start.',
  /**
   * Decision 1, owner Lee: whose brand is this — SF Media & PR, or Supplement
   * Factory? The proposal is the former; the compliance credibility is the
   * latter, and compliance is what this site sells. Built as Supplement Factory
   * for that reason. One constant to change if Lee decides otherwise.
   */
  brandNote: 'Built under the Supplement Factory name, because the compliance credibility is what the site sells.',
  manufacturingUrl: 'https://www.mysupplementfactory.com',
} as const

/**
 * Decision 10, owner Lee: who replaces dieter@mysupplementfactory.com as the
 * named contact? Every form and the contact page depend on it. A named person,
 * not an inbox — the brief is explicit about that.
 */
export const CONTACT = {
  namedPerson: null as string | null,
  fallbackEmail: 'design@mysupplementfactory.com',
  phone: null as string | null,
  responseTime: 'One working day',
} as const

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export const NAV: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Packaging design', href: '/services/packaging-design' },
      { label: 'Compliance check', href: '/services/compliance-check' },
      { label: 'Brand identity', href: '/services/brand-identity' },
      { label: 'Add-ons and extras', href: '/services/add-ons' },
    ],
  },
  {
    label: 'Formats',
    href: '/formats',
    children: [
      { label: 'Pouches', href: '/formats/pouches' },
      { label: 'Tubs, pots and jars', href: '/formats/tubs-pots-and-jars' },
      { label: 'Sticks and sachets', href: '/formats/sticks-and-sachets' },
      { label: 'Bottles', href: '/formats/bottles' },
      { label: 'Cartons and blisters', href: '/formats/cartons-and-blisters' },
    ],
  },
  { label: 'Our work', href: '/work' },
  {
    label: 'About',
    href: '/how-it-works',
    children: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Compliance and quality', href: '/compliance' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
]

/** Three entry points, because three different people arrive with three different problems. */
export const ENTRY_POINTS = [
  {
    label: 'Book a discovery call',
    href: '/contact',
    forWhom: 'You are at the idea stage and want to talk it through.',
    leadsTo: 'Stage one of the process, unchanged.',
  },
  {
    label: 'Start your project',
    href: '/start',
    forWhom: 'You know your format and you want a price.',
    leadsTo: 'A specification and an itemised estimate, then a quote.',
  },
  {
    label: 'Check my artwork',
    href: '/services/compliance-check',
    forWhom: 'You already have a design and you are worried about it.',
    leadsTo: 'The Compliance Check, £750 or £1,000.',
  },
] as const
