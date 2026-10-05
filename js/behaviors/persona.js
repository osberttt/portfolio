/* "personality": hover it and it turns into a generated pair (weird systems, goofy characters, …; see phrases.js);
   leave and it goes back. On touch, a tap swaps it and the next tap brings "personality" back.
   `data-persona="<text>"` swaps for that one text instead of a generated pair (the About page's name).
   `data-persona-cycle` also gives the resting word a fresh colour each time it comes back, instead of the
   page accent (the About page's name again), so repeated hovering keeps changing both states.
   `data-persona-fit` shrinks the type for a longer swap so it stays on one line in the space the home
   word had (the About page's name: "Min Htet Naing" is far wider than "Osbert").
   The swap: the text changes instantly, and the box stretches to the new width with a little overshoot, tips the
   other way and takes a pastel fill.
   The hover target is an unrotated wrapper; the tilted box inside ignores the pointer. Otherwise the box's
   tilt change on swap moves its edge under/away from the cursor and hover flickers on and off. */
(() => {
  'use strict';
  const { $, $$, esc } = App.util;
  const { REDUCED } = App.env;
  const { el } = App;

  // Pastel fills for the swapped pairs. Hues run blue → purple → pink (OKLCH 215–345), well away from the
  // mint the box has at rest (about 175), so a swap always reads as a change of colour.
  let seed = Math.random();
  function nextFill() {
    seed = (seed + 0.618034) % 1;
    return `oklch(0.88 0.08 ${(215 + seed * 130).toFixed(1)})`;
  }
  // Resting fills for a cycling box: the full wheel, kept pale so the ink stays readable on it.
  let restSeed = Math.random();
  function nextRest() {
    restSeed = (restSeed + 0.618034) % 1;
    return `oklch(0.9 0.075 ${(restSeed * 360).toFixed(1)})`;
  }

  const build = text => `<span class="persona-w" aria-hidden="true">${esc(text)}</span>`;

  App.behaviors.persona = () => $$('[data-persona]', el.view).forEach(setup);

  function setup(host) {
    const box = $('.persona', host);
    if (!box) return;
    const fixed = host.dataset.persona;   // empty = a generated pair each time
    const cycle = 'personaCycle' in host.dataset;   // also recolour the resting word
    const fit = 'personaFit' in host.dataset;       // scale the type down so a longer swap stays on one line
    const home = box.textContent;
    host.setAttribute('aria-label', home);
    box.innerHTML = build(home);
    let current = home;
    let widthAnim = null;
    // How much width a swap may use before it is scaled down: what the column gives the heading.
    // Measured once at rest, so it is the same whether the swap comes from hover or a tap.
    // A few px of slack: the box is tilted, so its rotated corners reach past its layout width.
    const measureRoom = () => Math.max(0, host.parentElement.clientWidth - 14);
    let room = fit ? measureRoom() : 0;
    // Scale the type down when the word is wider than the column. The word has to be measured with
    // wrapping off, or a name that is already wrapping reports the column's width and never shrinks.
    // The sticker keeps the word on one line (white-space: nowrap), so it can overflow the column.
    // Measure it at full size and scale the heading down by however much it overhangs.
    function refit() {
      host.style.setProperty('--pscale', '1');
      const full = box.offsetWidth;
      host.style.setProperty('--pscale', full > room ? Math.max(0.5, room / full).toFixed(3) : '1');
    }
    // With a fixed swap, the hit area is locked to whichever of the two words is wider, once, up front.
    // A target that changes size on hover drags an edge out from under the pointer, which fires leave,
    // which swaps back, which fires enter: at the edges the two bounce against each other many times a second.
    function lockSize() {
      host.style.width = '';
      refit();
      const a = box.offsetWidth;                       // whichever word is showing
      const other = current === home ? fixed : home;
      const w = $('.persona-w', box);
      const prev = w.textContent;
      w.textContent = other;
      refit();
      const bWidth = box.offsetWidth;
      w.textContent = prev;
      refit();
      host.style.width = `${Math.ceil(Math.max(a, bWidth))}px`;
    }
    if (fit) {
      lockSize();
      addEventListener('resize', () => { room = measureRoom(); lockSize(); }, { passive: true });
    }

    function show(text, swapped) {
      if (current === text) return;
      current = text;
      const old = $('.persona-w', box);
      const from = box.offsetWidth;   // includes any width animation still running
      if (widthAnim) { widthAnim.cancel(); widthAnim = null; }
      box.classList.remove('is-stretching');

      old.outerHTML = build(text);
      box.style.setProperty('--tilt', swapped ? '1.5deg' : '');
      box.style.setProperty('--pbg', swapped ? nextFill() : (cycle ? nextRest() : 'var(--accent)'));
      // Shrink the type for a swap that is wider than the room the home word has, so it stays on one line.
      if (fit) refit();
      if (REDUCED) return;

      const word = $('.persona-w', box);
      // Stretch to the new width, unless the new pair wraps onto two lines (narrow screens): then just let it land
      const to = box.offsetWidth;
      const oneLine = word.offsetHeight < parseFloat(getComputedStyle(box).fontSize) * 1.6;
      if (oneLine && Math.abs(to - from) > 1) {
        box.classList.add('is-stretching');   // keeps the text on one line while the box is narrower than it
        // The text is already at its new size, so during the stretch it would hang out of the frame
        // (growing) or leave it half empty (shrinking). Scaling the word with the box keeps the two together.
        const anim = box.animate([{ width: `${from}px` }, { width: `${to}px` }],
          { duration: 480, easing: 'cubic-bezier(.34,1.45,.64,1)' });
        word.animate([{ transform: `scaleX(${(from / to).toFixed(4)})` }, { transform: 'none' }],
          { duration: 480, easing: 'cubic-bezier(.34,1.45,.64,1)' });
        widthAnim = anim;
        // Only the stretch that's still current may clean up. A cancelled one settles a moment later, and it
        // must not strip the one-line rule from the stretch that replaced it (that showed as a two-line flash).
        const done = () => { if (widthAnim === anim) { widthAnim = null; box.classList.remove('is-stretching'); } };
        anim.finished.then(done, done);
      }
    }
    function pick() {
      return fixed || App.phrases.pair(current);
    }

    host.addEventListener('pointerenter', e => {
      if (e.pointerType === 'touch') return;
      // Keep the hit area at least as wide as the home word, so a shorter pair can't pull the edge out
      // from under the cursor. With data-persona-fit the size is already fixed (see lockSize).
      if (!fit) host.style.minWidth = `${host.offsetWidth}px`;
      show(pick(), true);
    });
    host.addEventListener('pointerleave', e => {
      if (e.pointerType === 'touch') return;
      if (!fit) host.style.minWidth = '';
      show(home, false);
    });
    host.addEventListener('pointerup', e => {
      if (e.pointerType !== 'touch') return;
      if (current === home) show(pick(), true);
      else show(home, false);
    });
  }
})();
