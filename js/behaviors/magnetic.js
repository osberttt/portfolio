/* Buttons marked [data-magnetic] lean toward the cursor (pointer devices only). */
(() => {
  'use strict';
  const { $$ } = App.util;
  const { FINE } = App.env;
  const { el } = App;

  App.behaviors.magnetic = () => {
    if (!FINE) return;
    $$('[data-magnetic]', el.view).forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        b.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * 0.3}px`);
        b.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * 0.4}px`);
      });
      b.addEventListener('pointerleave', () => { b.style.removeProperty('--mx'); b.style.removeProperty('--my'); });
    });
  };
})();
