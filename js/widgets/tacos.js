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
      <p class="taco-line">${esc(W.ate)} <b class="taco-n">${W.start}</b><span class="taco-word"></span> ${esc(W.goal)}. <span class="taco-out"></span></p>
      <div class="taco-row">
        <input type="range" min="0" max="${W.max}" aria-label="${esc(W.sliderLabel)}">
        <button class="btn btn--sm taco-reset" data-cursor="${esc(C.restart)}">${esc(W.reset)}</button>
      </div>
      <div class="taco-scale mono"><span>0</span><span>${W.max}</span></div>
      <p class="taco-note mono">${esc(W.note)}</p>
    </div>`;
    },
    mount(host) {
      const W = T.widgets.tacos;
      const w = $('.widget', host), range = $('input', host), n = $('.taco-n', host);
      const word = $('.taco-word', host), out = $('.taco-out', host), reset = $('.taco-reset', host);
      const ordinal = k => (k % 100 >= 11 && k % 100 <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[k % 10] || 'th');
      const pick = k => W.lines.find(l => k <= l.upTo) || W.lines[W.lines.length - 1];
      let wasDead = false;
      const update = () => {
        const k = +range.value;
        const l = pick(k);
        n.textContent = k;
        word.textContent = ordinal(k);
        out.textContent = l.text;
        const dead = !!l.dead;
        if (dead !== wasDead) { w.classList.toggle('dead', dead); wasDead = dead; }
      };
      range.value = W.start;
      range.addEventListener('input', update);
      reset.addEventListener('click', () => { range.value = W.start; update(); });
      update();
    },
  };
})();
