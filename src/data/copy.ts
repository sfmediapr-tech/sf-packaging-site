/**
 * The copy bank.
 *
 * The proposal's voice is warm, direct and slightly informal — it uses
 * contractions, asks the reader questions, and admits uncertainty. That is a
 * real differentiator against agency copy, and clients have responded to it.
 *
 * The lines below are lifted verbatim and should stay that way. Block three on
 * the homepage in particular: almost no agency site can say "no false claims, no
 * text being smaller than the legal limit, no headaches", because it names a
 * specific failure the buyer can picture.
 */

export const VERBATIM = {
  threeReasons:
    '9 times out of 10 you have probably bought something due to 3 common reasons',
  complianceHook:
    'is your product’s packaging design compliant? This is a costly hiccup you won’t want to suffer from before you are ready to launch',
  onePlace:
    'why venture elsewhere when you can keep the creation of your product all in one place?',
  relationship:
    'Unlike a design agency or a freelancer, we don’t view your project as a one-time sale, we want to work with you long term',
  access:
    'full access to our experienced in-house design team, from the very start of the process right to the finish line',
  peaceOfMind:
    'no costly surprises along the way once you are ready to launch, no false claims, no text being smaller than the legal limit, no headaches',
  outcome:
    'a packaging design for your product that not only looks great, but is kept in line with your brand’s identity and mission',
  processCaveat:
    'because every project is different, it means we can’t always predict the same process for each of our clients',
  trust:
    'you’ve put your trust in us to create your formulation, now it is time to bring your product to life',
} as const

export const THREE_REASONS = [
  'A product you were searching for',
  'A brand whose story you connected with',
  'Packaging that grabbed you in a split second',
] as const

/**
 * Words this site does not use. "Bespoke" is doing too much work across the
 * existing sites and has stopped meaning anything. And the current creative page
 * carries "Internationally complaint labels" where it means compliant — on a
 * compliance-led site that is the worst possible word to get wrong.
 */
export const BANNED = ['bespoke', 'solutions', 'cutting-edge', 'industry-leading', 'complaint'] as const
