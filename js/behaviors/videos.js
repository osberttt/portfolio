/* Videos play only while at least a quarter of them is on screen. */
(() => {
  'use strict';
  const { $$ } = App.util;
  const { el, state } = App;

  App.behaviors.videos = () => {
    const vids = $$('video', el.view);
    if (!vids.length) return;
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.play().catch(() => {}); else e.target.pause();
    }), { root: el.scroller, threshold: 0.25 });
    vids.forEach(v => io.observe(v));
    state.cleanups.push(() => io.disconnect());
  };
})();
