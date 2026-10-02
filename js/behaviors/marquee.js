/* Marquee: a steady endless scroll. The track holds three copies; it wraps by one third. */
(() => {
  'use strict';
  const { $ } = App.util;
  const { REDUCED } = App.env;
  const { el, state } = App;
  const { TUNING } = window;

  App.behaviors.marquee = () => {
    const track = $('.marquee-track', el.view);
    if (!track || REDUCED) return;
    let x = 0;
    state.tickers.add(() => {
      const third = track.scrollWidth / 3;
      x -= TUNING.marquee.speed;
      if (x <= -third) x += third;
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    });
  };
})();
