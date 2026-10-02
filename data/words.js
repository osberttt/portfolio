// Word lists for the phrase generator (js/core/phrases.js): "adjective noun" pairs that feed the Home marquee
// and the hover word on "personality". Each adjective lists the kinds of noun it fits, so nothing like
// "tricky songs" comes out. Add a word and it is picked up automatically.
window.WORDS = {
  nouns: {
    thing: ['ideas', 'mechanics', 'rules', 'systems', 'loops', 'twists', 'premises', 'puzzles'],
    being: ['characters', 'creatures', 'misfits'],
    tone:  ['humor', 'stories', 'jokes'],
  },
  adjectives: {
    strange:     ['thing', 'being', 'tone'],
    odd:         ['thing', 'being', 'tone'],
    goofy:       ['thing', 'being', 'tone'],
    weird:       ['thing', 'being', 'tone'],
    unusual:     ['thing', 'being', 'tone'],
    whimsical:   ['thing', 'being', 'tone'],
    interesting: ['thing', 'being', 'tone'],
    fun:         ['thing', 'being', 'tone'],
    clever:      ['thing', 'being', 'tone'],
    quirky:      ['thing', 'being', 'tone'],
    silly:       ['thing', 'being', 'tone'],
    funny:       ['thing', 'being'],
    tricky:      ['thing'],
    lovable:     ['being'],
    adorable:    ['being'],
    nerdy:       ['being'],
  },
  marqueeCount: 8,   // pairs in the Home marquee (new random set on each visit to Home)
};
