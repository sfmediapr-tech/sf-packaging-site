/** Six from the proposal, verbatim-ready, plus the ones we answer weekly. */

export interface Faq {
  q: string
  a: string
  group: 'proposal' | 'live'
}

export const FAQS: Faq[] = [
  { group: 'proposal', q: 'What file formats will you provide?', a: 'Adobe Illustrator as standard, and PDFs too. If you need something else, ask — we can usually provide it.' },
  { group: 'proposal', q: 'Can I provide you with a design?', a: 'Yes, at any stage. It is a great starting point, and it often makes the brief sharper than a description would.' },
  { group: 'proposal', q: 'What is the overall timeline?', a: 'Four to six weeks to finalise a packaging design. That runs from when we have what we need, not from the invoice.' },
  { group: 'proposal', q: 'Can my design be made faster?', a: 'Possibly. Tell us the deadline and the complexity and we will tell you honestly whether we can hit it.' },
  { group: 'proposal', q: 'How do we communicate?', a: 'Email, phone or video — whatever works for you. You get access to the in-house design team from the very start of the process right to the finish line.' },
  { group: 'proposal', q: 'What if I’m not design minded?', a: 'Leave it to us. We will determine the strongest execution for your product and walk you through why.' },

  { group: 'live', q: 'Do I need a cutter guide, and where do I get one?', a: 'Yes, for anything with a structure — pouches, sachets, cartons. It comes from your packaging supplier. We hold guides for the common pouch, stick and sachet sizes, so if your pack matches one we can start immediately. If not, sourcing it is the first thing we do, and it sits on the critical path.' },
  { group: 'live', q: 'What happens if my nutrition figures change after design starts?', a: 'The panel is rebuilt and rechecked. Small changes are absorbed; a reformulation is a new declaration and may use a revision round. This is why we ask whether your figures are confirmed or provisional before we start.' },
  { group: 'live', q: 'Do you design for markets outside the UK?', a: 'Yes — EU, USA and Canada routinely. Each additional territory is a separate artwork at £500, because the rules differ enough that it is not a translation job.' },
  { group: 'live', q: 'Who owns the artwork?', a: 'You do. Full ownership transfers to you at handover, with the working files.' },
  { group: 'live', q: 'Can you handle the printing?', a: 'We hand you print-ready artwork and work with your printer on their specification. Print, origination and reprographics are not included in the design price.' },
  { group: 'live', q: 'Do I need a barcode, and how do I get one?', a: 'If you are selling through retail, yes. You need a GTIN from GS1 and a barcode image generated from it. We can position and check it, but the allocation has to be yours.' },
]
