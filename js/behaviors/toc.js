/* Case study sidebar: jump links + active section marker. Also mounts the page's widgets. */
(() => {
  'use strict';
  const { $, $$ } = App.util;
  const { el, state } = App;

  App.behaviors.toc = () => {
    const heads = $$('.blk-h', el.view);
    const btns = $$('.toc button', el.view);
    const ind = $('.toc-ind', el.view);
    if (!heads.length) return;
    btns.forEach(b => b.addEventListener('click', () => App.shell.scroll.scrollToEl($(`#${b.dataset.target}`, el.view), 24)));
    let active = -1;
    const fn = () => {
      const limit = el.scroller.getBoundingClientRect().top + el.scroller.clientHeight * 0.35;
      let idx = 0;
      heads.forEach((h, i) => { if (h.getBoundingClientRect().top < limit) idx = i; });
      if (idx === active) return;
      active = idx;
      btns.forEach((b, i) => b.classList.toggle('active', i === idx));
      const b = btns[idx];
      if (b && ind) { ind.style.height = `${b.offsetHeight}px`; ind.style.transform = `translateY(${b.offsetTop}px)`; }
    };
    state.scrollFns.add(fn);
    requestAnimationFrame(fn);
  };

  App.behaviors.widgets = () => {
    $$('[data-widget]', el.view).forEach(h => App.widgets[h.dataset.widget].mount(h));
  };
})();
