/* Phrase generator: "adjective noun" pairs from data/words.js, only combining words that fit.
   Adjectives and nouns each come out of a shuffle bag: every word is used once before any repeats, and after a
   refill the most recently used words go to the back, so you don't see the same word again soon. The bags are
   shared by the marquee and the "personality" hover, and last for the whole visit. */
(() => {
  'use strict';
  const { WORDS } = window;
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

  // Tolerant of edits to data/words.js: unknown noun kinds are ignored (with a console warning), and an
  // adjective with no usable nouns is dropped, so a typo can't produce "undefined" on the page.
  const kindsOf = adj => WORDS.adjectives[adj].filter(kind => {
    if (!(kind in WORDS.nouns)) console.warn(`words.js: adjective "${adj}" lists unknown noun kind "${kind}"`);
    return kind in WORDS.nouns;
  });
  const fitCache = new Map(Object.keys(WORDS.adjectives).map(adj => [adj, [...new Set(kindsOf(adj).flatMap(kind => WORDS.nouns[kind]))]]));
  const nounsFor = adj => fitCache.get(adj);
  const adjectives = Object.keys(WORDS.adjectives).filter(adj => nounsFor(adj).length);
  const allNouns = [...new Set(Object.values(WORDS.nouns).flat())];

  // A shuffle bag over `items`. `draw(ok, pool)` returns the next item of `pool` that passes `ok` (exclusions),
  // or undefined if none can. If nothing left in the bag qualifies, it takes the qualifying item used longest
  // ago instead, so a narrow adjective (only three nouns fit "lovable") never forces a same-word repeat.
  function makeBag(items) {
    let bag = [];
    let tick = 0;
    const lastUsed = new Map(items.map(x => [x, -Infinity]));
    const gap = Math.floor(items.length / 2);   // on a refill, this many of the latest draws go to the back
    return function draw(ok = () => true, pool = items) {
      let x = bag.find(w => pool.includes(w) && ok(w));
      if (x === undefined) {
        const cands = pool.filter(ok);
        if (!cands.length) return undefined;
        x = cands.reduce((a, b) => (lastUsed.get(b) < lastUsed.get(a) ? b : a));
      }
      lastUsed.set(x, tick++);
      bag = bag.filter(w => w !== x);
      if (!bag.length) {
        const recent = w => lastUsed.get(w) >= tick - gap;
        const fresh = shuffle(items);
        bag = [...fresh.filter(w => !recent(w)), ...fresh.filter(recent)];
      }
      return x;
    };
  }

  const drawAdj = makeBag(adjectives);
  const drawNoun = makeBag(allNouns);

  // One pair, e.g. "nerdy systems". `skipAdj` / `skipNoun` are sets of words not to use; `avoid` is a phrase not to repeat.
  function parts(avoid, skipAdj = new Set(), skipNoun = new Set()) {
    let r;
    for (let tries = 0; tries < 5; tries++) {
      const adj = drawAdj(a => !skipAdj.has(a) && nounsFor(a).some(n => !skipNoun.has(n))) || pick(adjectives);
      const fits = nounsFor(adj);
      const noun = drawNoun(n => !skipNoun.has(n), fits) || pick(fits);
      r = [adj, noun];
      if (r.join(' ') !== avoid) break;
    }
    return r;
  }
  const pair = avoid => parts(avoid).join(' ');

  // n pairs that share no adjective and no noun, so the marquee never reads "odd ideas, weird ideas".
  function set(n) {
    const adjs = new Set(), nouns = new Set();
    const out = [];
    while (out.length < n) {
      const [adj, noun] = parts('', adjs, nouns);
      if (adjs.has(adj) || nouns.has(noun)) break;   // word lists too small to keep going without repeats
      adjs.add(adj); nouns.add(noun);
      out.push(`${adj} ${noun}`);
    }
    return out;
  }

  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  App.phrases = { pair, set, cap };
})();
