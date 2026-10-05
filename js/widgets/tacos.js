/* Amy Died of 700 Tacos: tune the number, the sentence reacts. */
(() => {
  'use strict';
  const { esc, $ } = App.util;
  const { UI: T } = window;
  const C = T.cursor;

  App.widgets.tacos = {
    html: () => {
      const W = T.widgets.tacos;
      return `<div class="widget taco">
      <div class="widget-bar mono"><span>${esc(W.barLeft)}</span><span>${esc(W.barRight)}</span></div>
      <div class="taco-row">
        <input type="range" min="0" max="${W.max}" aria-label="${esc(W.sliderLabel)}">
      </div>
      <div class="taco-scale mono"><span>0</span><span>${W.max}</span></div>
      <p class="taco-line">${esc(W.ate)} <b class="taco-n">${W.start}</b><span class="taco-word"></span> ${esc(W.goal)}. <span class="taco-out"></span></p>
      <p class="taco-note mono">${esc(W.note)}</p>
    </div>`;
    },
    mount(host) {
      const W = T.widgets.tacos;
      const range = $('input', host), n = $('.taco-n', host);
      const word = $('.taco-word', host), out = $('.taco-out', host);
      const ordinal = k => (k % 100 >= 11 && k % 100 <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[k % 10] || 'th');
      const pick = k => W.lines.find(l => k <= l.upTo) || W.lines[W.lines.length - 1];
      const max = W.max;
      let shown = W.start, target = W.start, raf = 0;
      const render = v => {
        shown = v;
        const k = Math.round(v);
        n.textContent = k;
        word.textContent = ordinal(k);
        out.textContent = pick(k).text;
      };
      // Past the slider's end the number keeps growing; coming back, it drops fast to the slider.
      const tick = () => {
        raf = 0;
        const d = target - shown;
        if (Math.abs(d) < 1) return render(target);
        render(shown + d * 0.3);
        raf = requestAnimationFrame(tick);
      };
      const setTarget = t => {
        target = t;
        if (shown > max && t < shown) { if (!raf) raf = requestAnimationFrame(tick); return; }
        cancelAnimationFrame(raf); raf = 0;
        render(t);
      };
      const onMove = e => {
        const r = range.getBoundingClientRect();
        const over = e.clientX - (r.right - 15);   // 15 = half the thumb
        const perStep = (r.width - 30) / max;
        setTarget(+range.value >= max && over > 0 ? max + over / perStep : +range.value);
      };
      range.value = W.start;
      range.addEventListener('input', () => setTarget(+range.value));
      range.addEventListener('pointerdown', () => {
        const up = () => { removeEventListener('pointermove', onMove); removeEventListener('pointerup', up); removeEventListener('pointercancel', up); };
        addEventListener('pointermove', onMove);
        addEventListener('pointerup', up);
        addEventListener('pointercancel', up);
      });
      render(W.start);
    },
  };
})();
