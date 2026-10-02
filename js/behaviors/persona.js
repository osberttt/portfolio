/* "personality": hover it and it turns into a generated pair (weird systems, goofy characters, …; see phrases.js);
   leave and it goes back. On touch, a tap swaps it and the next tap brings "personality" back.
   The swap: the text changes instantly, and the box stretches to the new width with a little overshoot, tips the
   other way and takes a pastel fill.
   The hover target is an unrotated wrapper; the tilted box inside ignores the pointer. Otherwise the box's
   tilt change on swap moves its edge under/away from the cursor and hover flickers on and off. */
(() => {
  'use strict';
  const { $, esc } = App.util;
  const { REDUCED } = App.env;
  const { el } = App;

  // Pastel fills for the swapped pairs. Hues run blue → purple → pink (OKLCH 215–345), well away from the
  // mint the box has at rest (about 175), so a swap always reads as a change of colour.
  let seed = Math.random();
  function nextFill() {
    seed = (seed + 0.618034) % 1;
    return `oklch(0.88 0.08 ${(215 + seed * 130).toFixed(1)})`;
  }

  const build = text => `<span class="persona-w" aria-hidden="true">${esc(text)}</span>`;

  App.behaviors.persona = () => {
    const host = $('[data-persona]', el.view);
    if (!host) return;
    const box = $('.persona', host);
    const home = box.textContent;
    host.setAttribute('aria-label', home);
    box.innerHTML = build(home);
    let current = home;
    let widthAnim = null;

    function show(text, swapped) {
      if (current === text) return;
      current = text;
      const old = $('.persona-w', box);
      const from = box.offsetWidth;   // includes any width animation still running
      if (widthAnim) { widthAnim.cancel(); widthAnim = null; }
      box.classList.remove('is-stretching');

      old.outerHTML = build(text);
      box.style.setProperty('--tilt', swapped ? '1.5deg' : '');
      box.style.setProperty('--pbg', swapped ? nextFill() : 'var(--accent)');
      if (REDUCED) return;

      const word = $('.persona-w', box);
      // Stretch to the new width, unless the new pair wraps onto two lines (narrow screens): then just let it land
      const to = box.offsetWidth;
      const oneLine = word.offsetHeight < parseFloat(getComputedStyle(box).fontSize) * 1.6;
      if (oneLine && Math.abs(to - from) > 1) {
        box.classList.add('is-stretching');   // keeps the text on one line while the box is narrower than it
        const anim = box.animate([{ width: `${from}px` }, { width: `${to}px` }],
          { duration: 480, easing: 'cubic-bezier(.34,1.45,.64,1)' });
        widthAnim = anim;
        // Only the stretch that's still current may clean up. A cancelled one settles a moment later, and it
        // must not strip the one-line rule from the stretch that replaced it (that showed as a two-line flash).
        const done = () => { if (widthAnim === anim) { widthAnim = null; box.classList.remove('is-stretching'); } };
        anim.finished.then(done, done);
      }
    }
    function pick() {
      return App.phrases.pair(current);
    }

    host.addEventListener('pointerenter', e => {
      if (e.pointerType === 'touch') return;
      // Keep the hit area at least as wide as the home word, so a shorter pair can't pull the edge out from under the cursor
      host.style.minWidth = `${host.offsetWidth}px`;
      show(pick(), true);
    });
    host.addEventListener('pointerleave', e => {
      if (e.pointerType === 'touch') return;
      host.style.minWidth = '';
      show(home, false);
    });
    host.addEventListener('pointerup', e => {
      if (e.pointerType !== 'touch') return;
      if (current === home) show(pick(), true);
      else show(home, false);
    });
  };
})();
