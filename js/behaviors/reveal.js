/* Scroll-triggered reveal ([data-reveal]) and the number count-up that rides along with it. */
(() => {
  'use strict';
  const { $$, clamp } = App.util;
  const { REDUCED } = App.env;
  const { el, state } = App;

  function countUp(target) {
    const els = target.matches('[data-count]') ? [target] : $$('[data-count]', target);
    els.forEach(e => {
      const to = +e.dataset.count;
      const start = performance.now();
      const step = now => {
        const t = clamp((now - start) / 1100, 0, 1);
        e.textContent = Math.round(to * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  App.behaviors.reveal = () => {
    const els = $$('[data-reveal]', el.view);
    if (REDUCED) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      countUp(e.target);
      io.unobserve(e.target);
    }), { root: el.scroller, threshold: 0, rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => io.observe(e));
    state.cleanups.push(() => io.disconnect());
  };
})();
