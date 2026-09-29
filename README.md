# Supplement Factory — Packaging Design site

The [Packaging Design Website Brief](../../Downloads/Packaging%20Design%20Website%20Brief.pdf) built
as a site. Phases one and two: the brochure, the five format pages and the eight case studies,
plus a working configurator front half.

It replaces a PDF that one person currently sends by hand.

```bash
npm install && npm run dev     # http://localhost:4330
npm run build                  # 27 static pages into dist/
```

## What it is

Astro with React islands. Every page ships as real HTML, because the format pages and case
studies are what carry the search traffic the brief is counting on. React runs in exactly two
places — the pack stage and the configurator — and nothing else on the site needs JavaScript to
be readable.

## Layout

```
src/
├── data/          ← every price, spec and piece of copy. One source of truth.
│   ├── pricing.ts     the rate card, exactly as the proposal states it
│   ├── formats.ts     five pack families + the 22 die lines we actually hold
│   ├── work.ts        eight case studies, testimonials gated (see below)
│   ├── compliance.ts  twelve checks, the market table, what we caught
│   ├── process.ts     five stages, timings, what we need from you
│   ├── faqs.ts        six from the proposal + six from live projects
│   ├── copy.ts        lines lifted verbatim, and the words this site does not use
│   └── site.ts        nav, contact, the three entry points
├── islands/
│   ├── PackStage.tsx  parametric 3D pack, doubling as the format navigator
│   └── Estimator.tsx  the configurator: ten questions, live estimate, delay flags
├── components/    header, footer, tier cards, format and case study cards
├── layouts/       the page shell
├── pages/         27 pages, five of them generated from formats.ts
└── styles/        the whole design system, black and gold, one stylesheet
```

**Nothing hard-codes a price.** `data/pricing.ts` is read by the tier cards, the format pages,
the pricing table, the worked examples and the configurator. Change a number there and it
changes everywhere, which is the failure mode a published rate card across twenty pages
otherwise invites.

## The configurator

`/start`. Ten questions in the brief's order, and **market comes first** — it decides the panel
format, the mandatory statements, the claim rules and whether the job is one artwork or two.
Asking it last is what cost a live project three months of rework.

It builds an itemised estimate from the published rate card as you answer, and flags the things
that actually delay projects before submission rather than three weeks in: extra territories
mean extra artworks, no cutter guide adds a sourcing step to the displayed timeline, provisional
nutrition figures mean placeholder panels. Answering "I already have a design" routes to the
Compliance Check instead of quoting a redesign.

Pouch, UK and US, no cutter guide → **£1,750, 5 to 7 weeks**. That matches the brief's own
worked example, and the extra week is the die line sourcing.

**Not built yet**, and both need the format rule library first: validating a quantity against the
format's MOQ, and hiding options incompatible with the chosen format. The quote feed into The
Hive is phase three — the site should end at that quote rather than duplicate it, since The Hive
already generates, signs and invoices.

## The die lines

`data/formats.ts` lists 22 die lines read from
`~/Digital Packaging_Project 1/SF Design Library (from Dieter Outlook cache)/04 Die lines and
artwork guides/`, keyed by format and dimensions: Doy-Seal pouches from 250 g to 1 kg, K-Seal,
the 60-capsule patch, stick packs at 160 × 80 / 160 × 120 / 142 mm, five Unette sachet
references and a 77 × 40 × 130 carton.

The brief says the die line library "does not exist, and the configurator cannot validate a
format without it". It partly does. That folder is also the most likely home of the case study
pack photography — `02 Design service proposals/Packaging Design Case Studies.pdf`.

## Testimonials are gated

`TESTIMONIALS_CLEARED` in `data/work.ts`, currently `false`.

The quotes were collected for a private proposal sent to one person, and every one as originally
given names Dieter, who has left. The lines in the data file are already reframed around the team
and the work — no personal byline — but they still need re-permissioning before they are public.

Every case study page renders fully without them: the pack, the format, the brief, what was
designed and any compliance issue caught are all real and all ours to show. Flip that one
constant when Lee confirms, and the client words appear on the case studies, the format pages and
the homepage at once.

## Enquiries

The contact form posts to `/api/enquiry`. Every enquiry is written to `.data/enquiries.jsonl`
first and forwarded second, so a mail failure never loses a lead; if it cannot be stored at all,
the visitor is told rather than thanked. Forwarding needs `RESEND_API_KEY` and
`ENQUIRY_FORWARD_TO` — **until those are set, that file is the inbox.** A hidden honeypot field
catches bots.

This is why the site now carries `@astrojs/node`. Pages are still static — the build emits 28
HTML pages, so the format pages and case studies keep their search traffic — and only
`/api/enquiry` and `/contact` run on a server. `/contact` has to, because a prerendered page is
built once with no query string and could never show the error the endpoint redirects back with.

## Ten decisions still blocking launch

From the brief's backlog. Each one has an owner, and several of them are one constant in a data
file away from being applied.

| # | Decision | Owner | Where it lands |
|---|---|---|---|
| 1 | SF Media & PR, or Supplement Factory? | Lee | `site.ts` → `SITE` — built as Supplement Factory, because compliance credibility is what the site sells |
| 2 | Can the eight testimonials be used publicly? | Lee / Greg | `work.ts` → `TESTIMONIALS_CLEARED` |
| 3 | Do sticks, sachets, cartons and blisters get tier prices? | Greg / Ryan | `formats.ts` → `tier: 'quote'` on two families |
| 4 | Is brand identity on the rate card, and at what price? | Greg | `pricing.ts` → `BRAND_IDENTITY.priceLabel` |
| 5 | Reconcile the £250 Dual Type line against the £1,500 Tier 3 | Greg | `pricing.ts` → `TIERS` |
| 6 | Do we supply physical packaging to a design-only client? | Greg | Whether the configurator sells components at all |
| 7 | BRC or BRCGS? | James Wilson | `compliance.ts` → `ACCREDITATIONS` — set to BRCGS, matching the white label shop |
| 8 | Label design revisions — three or six? | Greg | Service pages and terms |
| 9 | Which MOQ set is correct? | Greg | `formats.ts` → `moq` per family |
| 10 | Who replaces dieter@mysupplementfactory.com? | Lee | `site.ts` → `CONTACT.namedPerson`, currently `null` |

## Still to gather

- **Pack photography** at web resolution for all eight case studies, with usage rights
  confirmed. Every case study and `CaseStudyCard` has the slot; `study.image` is `null`.
- **Before-and-after compliance examples**, anonymised. The brief is right that this is the most
  compelling thing we could publish and it sells the £750 check better than any description of
  it. `BEFORE_AFTER_PENDING` in `work.ts`.
- **Somebody to read the enquiries.** They are stored and, once `RESEND_API_KEY` is set,
  forwarded. The configurator's "send this specification" still routes to the contact page rather
  than carrying the spec with it.

## Deployed

| | |
|---|---|
| Shop | https://sf-shop-red.vercel.app |
| Packaging design site | https://sf-packaging-site.vercel.app |

Deploy with `../deploy.sh <site>` from the parent folder. It stages a copy without `.git`,
because when the CLI can see a repository it sends commit metadata and Vercel blocks the build
until the commit author matches a connected GitHub account.

**Indexing is off by default.** Every page carries `noindex, nofollow` and `robots.txt`
disallows everything, unless `PUBLIC_ALLOW_INDEXING=true` is set. That default is deliberate:
these pages carry real client names nobody has been asked about yet, so a review deployment
should be shareable but not discoverable. Switch it on when the permissions are actually in.

**The enquiry form does not accept submissions on Vercel**, by design. A serverless filesystem is
throwaway — a write to `/tmp` succeeds and then vanishes with the container — so storing an
enquiry there and showing the thank-you page would tell a customer we have their details when
nothing does. Without `RESEND_API_KEY` and `ENQUIRY_FORWARD_TO`, the form says so and points at
the email address instead. Set those two and it starts working.

**Astro's built-in CSRF check had to be replaced.** `security.checkOrigin` compares the Origin
header against the request URL, and behind Vercel's proxy the request URL carries an internal
host — so every genuinely same-origin form POST came back `403 Cross-site POST form submissions
are forbidden`. The endpoint now runs the same check itself against `x-forwarded-host`, which is
the header that survives the hop. Protection was moved, not removed: a cross-site Origin and a
missing Origin are both still refused.

## Phase three and four

Three: the configurator's die line library, MOQ validation and format rules, feeding a quote into
The Hive. Much of that logic already exists headless in `../sf-pack-ai/src/core` — compliance
rules, die line maths, GTIN check digits, market profiles — and is worth importing rather than
rewriting.

Four: card payment on the three design tiers and the compliance check. They are fixed price,
fixed scope and already sold that way. **Not** on packaging components, until a component rate
card exists — no per-unit price, cutter cost, origination or print price exists anywhere today.

## One housekeeping note

Astro resolves to 5.x here. 7.x is current. Worth upgrading while the codebase is this small,
but it was left alone rather than churned mid-build.
