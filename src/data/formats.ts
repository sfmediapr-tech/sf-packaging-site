/**
 * The five pack families, one page each, all built from the same template.
 *
 * The die lines listed under each family are ones we actually hold, read from
 * the design library. That matters: the brief's whole argument for a format hub
 * is that the main site organises by dose format — capsules, powders, gummies —
 * which is how we manufacture, not how a client thinks about their pack. A
 * client thinks "I have a 300 g pouch".
 */

export interface DieLine {
  /** As the file is named in the library, so it can be found again. */
  file: string
  label: string
  /** Flat artwork size. */
  widthMm: number
  heightMm: number
  gussetMm?: number
  held: true
}

export interface FormatSize {
  size: string
  note: string
}

export interface PackFormat {
  slug: string
  name: string
  /** Plural, for the hub cards. */
  shortName: string
  /** What the format is and who it suits. */
  intro: string
  suits: string
  /** Sub-formats this page covers. */
  covers: string[]
  tier: 'tier-1' | 'tier-2' | 'tier-3' | 'quote'
  sizes: FormatSize[]
  /** What the design has to carry, and respect, on this format. */
  designNotes: string[]
  materials: string[]
  finishes: string[]
  /** Where the cutter guide comes from and who holds it. */
  cutterGuide: string
  moq: string
  leadTime: string
  dieLines: DieLine[]
  heroCaseStudies: string[]
}

export const FORMATS: PackFormat[] = [
  {
    slug: 'pouches',
    name: 'Pouch packaging design',
    shortName: 'Pouches',
    intro:
      'A pouch is one continuous printed surface. Front, back, both gussets and the seal area are a single artwork laid out against the supplier’s cutter guide — which is why it sits a tier above a tub, and why the die line has to be in hand before the layout starts.',
    suits:
      'Powders sold by the tub elsewhere, capsule packs that want a lighter format, refills, and anything where shipping weight matters.',
    covers: ['Stand-up pouches', 'Powder pouches', 'Capsule pouches', 'Compostable pouches'],
    tier: 'tier-2',
    sizes: [
      { size: '250 g', note: 'Doy-Seal, 159 × 230 mm with a 45 mm gusset' },
      { size: '500 g', note: 'Doy-Seal, 188 × 260 mm with a 55 mm gusset — a live pack size' },
      { size: '750 g', note: 'Doy-Seal, 213 × 280 mm with a 55 mm gusset' },
      { size: '1 kg', note: 'Doy-Seal, 240 × 300 mm with a 55 mm gusset' },
      { size: '300 g powder', note: 'Quoted routinely' },
      { size: '60 capsules', note: 'Capsule patch pouch, 140 × 200 mm with a 40 mm gusset' },
    ],
    designNotes: [
      'Copy is held clear of the zip band. Anything that crosses it is unreadable once the pack is filled.',
      'The gusset is a printed surface, not a margin. It shows on shelf when the pack stands.',
      'Front, back and sides are one artwork, so the design has to resolve as a wrap rather than as separate panels.',
      'Roughly 2 cm × 3 cm is kept clear for the batch number and best-before date, overprinted at production.',
    ],
    materials: ['PET/PE laminate', 'Metalized PET', 'Compostable pouch film'],
    finishes: ['Matte', 'Gloss', 'Varnish', 'Laminate', 'Metallic', 'Premium foil'],
    cutterGuide:
      'From your pouch supplier. We hold Doy-Seal and K-Seal guides across the common sizes, so if your pack matches one of them we can start immediately.',
    moq: 'Varies by film and size — confirmed at quote',
    leadTime: '4 to 6 weeks for the design',
    dieLines: [
      { file: '250g_Pouch_-_Doy-Seal_SC_159_x_230__45_mm.pdf', label: 'Doy-Seal 250 g', widthMm: 159, heightMm: 230, gussetMm: 45, held: true },
      { file: '500g_Pouch_-_Doy-Seal_SC_188_x_260__55_mm.pdf', label: 'Doy-Seal 500 g', widthMm: 188, heightMm: 260, gussetMm: 55, held: true },
      { file: '750g_Pouch_-_Doy-Seal_SC_213_x_280__55_mm.pdf', label: 'Doy-Seal 750 g', widthMm: 213, heightMm: 280, gussetMm: 55, held: true },
      { file: '1KG_Pouch_-_Doy-Seal_SC_240_x_300__55_mm.pdf', label: 'Doy-Seal 1 kg', widthMm: 240, heightMm: 300, gussetMm: 55, held: true },
      { file: 'Doy-Seal_SC_170_x_240__45_mm.pdf', label: 'Doy-Seal 170 × 240', widthMm: 170, heightMm: 240, gussetMm: 45, held: true },
      { file: 'Doy-Seal_SC_240_x_170__55_mm.pdf', label: 'Doy-Seal 240 × 170, landscape', widthMm: 240, heightMm: 170, gussetMm: 55, held: true },
      { file: 'K-Seal_SC_190_x_260__50_mm.pdf', label: 'K-Seal 190 × 260', widthMm: 190, heightMm: 260, gussetMm: 50, held: true },
      { file: 'K_SEAL_SC_180_x_261_45MM.pdf', label: 'K-Seal 180 × 261', widthMm: 180, heightMm: 261, gussetMm: 45, held: true },
      { file: '60_Capsule_Patch_-_Doy-Seal_SC_140_x_200__40_mm.pdf', label: '60-capsule patch pouch', widthMm: 140, heightMm: 200, gussetMm: 40, held: true },
      { file: '3_Side_Seal_SC_85_x_120_mm.pdf', label: '3-side seal sachet pouch', widthMm: 85, heightMm: 120, held: true },
    ],
    heroCaseStudies: ['sero-labs', 'io-nutrition', 'uniq'],
  },
  {
    slug: 'tubs-pots-and-jars',
    name: 'Tub, pot and jar packaging design',
    shortName: 'Tubs, pots and jars',
    intro:
      'The format most powder brands start on, and the one where the design decisions are least obvious: the label wraps a cylinder, so the join matters, and the lid is a separate decision from the label.',
    suits: 'Powders, capsule counts above 60, anything sold on a shelf where the lid reads first.',
    covers: ['Powder tubs', 'Capsule pots', 'Glass jars', 'RPET pots'],
    tier: 'tier-1',
    sizes: [{ size: 'Powders', note: '200-unit minimum' }],
    designNotes: [
      'The label wraps a cylinder, so the join has to be designed rather than discovered — nothing critical crosses it.',
      'Lid colour and embossing are separate decisions from the label and are quoted separately.',
      'The visible label area is narrower than the flat artwork, because the curve takes the edges out of view.',
      'Roughly 2 cm × 3 cm is kept clear for the batch number and best-before date.',
    ],
    materials: ['Virgin PET', 'RPET, 15–100% recycled', 'HDPE', 'PE', 'Glass'],
    finishes: ['Matte', 'Gloss', 'Varnish', 'Metallic', 'Premium foil', 'Coloured pots'],
    cutterGuide:
      'Usually a simple wrap rectangle, which we can set from your tub dimensions without waiting on a supplier guide.',
    moq: '200 units on powders',
    leadTime: '4 to 6 weeks for the design',
    dieLines: [],
    heroCaseStudies: ['gut-axis'],
  },
  {
    slug: 'sticks-and-sachets',
    name: 'Stick pack and sachet design',
    shortName: 'Sticks and sachets',
    intro:
      'The hardest format to design well, because there is almost no width. The panel hierarchy has to survive at 30 mm, and everything mandatory still has to fit at a legal size.',
    suits: 'Single-serve powders, liquid gels, sample runs and travel formats.',
    covers: ['Stick packs', 'Sachets', 'Gel sticks'],
    tier: 'quote',
    sizes: [
      { size: '10–12 g powder', note: 'Stick pack' },
      { size: '2–70 ml liquid', note: 'Gel stick' },
      { size: 'Up to 50 g', note: 'Sachet' },
      { size: '92 × 150.28 mm', note: 'A live Unette sachet die line' },
    ],
    designNotes: [
      'Very little width. The panel hierarchy has to survive at 30 mm, which usually means one idea on the front and nothing else.',
      'Built on the supplier’s own cutter guide — Unette guides differ between references, so the exact one matters.',
      'Mandatory particulars still have to meet the minimum legal type size. On this format that is the binding constraint, not a preference.',
    ],
    materials: ['Custom laminated stick film', 'PET/PE laminate', 'Metalized PET'],
    finishes: ['Matte', 'Gloss', 'Metallic'],
    cutterGuide:
      'From your sachet supplier. We hold several Unette guides and the common stick pack templates.',
    moq: 'Quoted per project',
    leadTime: '4 to 6 weeks for the design',
    dieLines: [
      { file: '160mm_x_80mm_Stick_Pack.ai', label: 'Stick pack 160 × 80', widthMm: 160, heightMm: 80, held: true },
      { file: '160mm_x_120mm_StickPack.pdf', label: 'Stick pack 160 × 120', widthMm: 160, heightMm: 120, held: true },
      { file: 'Stick_Pack-142mm_Template_.pdf', label: 'Stick pack 142 mm template', widthMm: 142, heightMm: 0, held: true },
      { file: 'Unette_U03_92mm_x_150.28mm.pdf', label: 'Unette U03', widthMm: 92, heightMm: 150.28, held: true },
      { file: 'Unette_U048_92mm_x_150.28mm.pdf', label: 'Unette U048', widthMm: 92, heightMm: 150.28, held: true },
      { file: 'Unette_U14_92mm_x_150.28mm.pdf', label: 'Unette U14', widthMm: 92, heightMm: 150.28, held: true },
      { file: 'Unette_U016_92mm_x_156.633mm.pdf', label: 'Unette U016', widthMm: 92, heightMm: 156.633, held: true },
      { file: 'Unette_U41_70mm_x_141.81mm.pdf', label: 'Unette U41', widthMm: 70, heightMm: 141.81, held: true },
    ],
    heroCaseStudies: ['sigrid'],
  },
  {
    slug: 'bottles',
    name: 'Bottle packaging design',
    shortName: 'Bottles',
    intro:
      'Tinctures, sprays and capsule bottles. The label area is smaller than people expect once the curve is accounted for, which is the single most common surprise on this format.',
    suits: 'Liquids, tinctures, sprays, tablets and capsules — and complete bottle lines where one design has to scale across sizes.',
    covers: ['Tincture bottles', 'Spray bottles', 'Tablet bottles', 'Capsule bottles', 'Complete bottle lines'],
    tier: 'tier-1',
    sizes: [{ size: 'Tincture and spray', note: '10,000-unit minimum' }],
    designNotes: [
      'The label area is smaller than people expect once the curve is accounted for. Type set to the edge of the flat artwork disappears on the bottle.',
      'A dropper or spray neck takes height off the label, and the neck size is a decision that has to be made before layout.',
      'Across a bottle line, the design has to hold at more than one size without being redrawn.',
      'Roughly 2 cm × 3 cm is kept clear for the batch number and best-before date.',
    ],
    materials: ['Virgin PET', 'RPET, 15–100% recycled', 'HDPE', 'PE', 'Glass'],
    finishes: ['Matte', 'Gloss', 'Varnish', 'Laminate', 'Metallic', 'Premium foil'],
    cutterGuide: 'Set from your bottle dimensions and neck size, or supplied by your bottle supplier.',
    moq: '10,000 units on tincture and spray bottles',
    leadTime: '4 to 6 weeks for the design',
    dieLines: [],
    heroCaseStudies: ['the-sozial-club'],
  },
  {
    slug: 'cartons-and-blisters',
    name: 'Carton and blister packaging design',
    shortName: 'Cartons and blisters',
    intro:
      'The format with the most surface and the most structure. A carton is a folded object before it is a design, so the die line has to be drawn for your product rather than pulled off a shelf.',
    suits:
      'Blister products, premium presentation, anything with a leaflet, and sticks that ship inside a carton.',
    covers: ['Cartons', 'Blister packs', 'Sticks in carton', 'Leaflets'],
    tier: 'quote',
    sizes: [
      { size: '77 × 40 × 130 mm', note: 'A held carton die line' },
      { size: 'Up to 30 sheets', note: 'Blister cartons, at 15 capsules per sheet' },
      { size: '15 capsules per sheet', note: 'Blister sheet' },
    ],
    designNotes: [
      'Front and back print CMYK, the outer is white and the inner is creamy. That changes what a colour does on the reverse.',
      'The die line must be drawn for this client — a borrowed carton guide is the single most expensive mistake on this format.',
      'Foil designs are available on blister sheets.',
      'Child-resistant and senior-friendly options change the structure, so they are decided before the design, not after.',
    ],
    materials: ['Folding boxboard', 'Blister foil', 'Leaflet stock'],
    finishes: ['Matte', 'Gloss', 'Varnish', 'Laminate', 'Metallic', 'Premium foil', 'Die-cut shapes'],
    cutterGuide:
      'Drawn for your product. This is the format where we most often have to source the guide first, and that sourcing sits on the critical path.',
    moq: 'Quoted per project',
    leadTime: '4 to 6 weeks for the design, plus die line sourcing',
    dieLines: [
      { file: '77x40x130mm_Carton.pdf', label: 'Carton 77 × 40 × 130', widthMm: 77, heightMm: 130, held: true },
    ],
    heroCaseStudies: ['genesyx', 'bower-botanicals'],
  },
]

export const formatBySlug = (slug: string) => FORMATS.find((f) => f.slug === slug)

/**
 * Stick packs, sachets, cartons and blisters are formats we actively design but
 * do not carry a published tier price. The brief is explicit that leaving them
 * silently absent is the worst option, because it reads as though we cannot do
 * them. So they say this instead, until decision 3 lands.
 */
export const QUOTED_FORMAT_NOTE =
  'We design this format regularly — it is not on the published tier list because the price depends on the structure and the die line. Tell us the pack and we will quote it before any work starts.'
