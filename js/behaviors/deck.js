/* Sticky cards shrink and dim as the next one slides over them.
   The last card folds against .deck-end (the "All projects" block), which
   is a plain flow element with enough top padding to give it room to fold. */
(() => {
  'use strict';
  const { $, $$, clamp } = App.util;
  const { REDUCED } = App.env;
  const { el, state } = App;
  const { TUNING } = window;

  App.behaviors.deck = () => {
    if (REDUCED) return;
    const cards = $$('.gcard', el.view);
    const next = cards.slice(1).concat($('.deck-end', el.view));
    const fn = () => {
      const flat = innerWidth <= 720;
      for (let i = 0; i < cards.length; i++) {
        const c = cards[i], n = next[i];
        if (flat || !n) { c.style.transform = ''; c.style.filter = ''; continue; }
        const top = c.getBoundingClientRect().top;
        const o = clamp((top + c.offsetHeight - n.getBoundingClientRect().top) / c.offsetHeight, 0, 1);
        c.style.transform = o ? `scale(${(1 - o * TUNING.deck.shrink).toFixed(4)})` : '';
        c.style.filter = o ? `brightness(${(1 - o * TUNING.deck.dim).toFixed(3)})` : '';
      }
    };
    state.scrollFns.add(fn);
    fn();
  };
})();
