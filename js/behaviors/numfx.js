/* Home card numbers: a small hover effect per game, echoing its mechanic.
   Amy: the number flicks through 2 to 9 and lands back on itself.
   Bloody Wasted: the number dissolves like a vampire in sunlight, then pops back.
   (Ghost's shadow and Catch's spin are CSS-only, in home.css.) */
(() => {
  'use strict';
  const { $, $$, pad } = App.util;
  const { REDUCED } = App.env;
  const { el } = App;

  // Amy: count 2 to 9 quickly, then land back on 1
  const STEPS = [2, 3, 4, 5, 6, 7, 8, 9];
  function count(num) {
    const orig = num.textContent, dur = 400;
    return new Promise(done => {
      STEPS.forEach((k, i) => setTimeout(() => { num.textContent = pad(k); }, i * dur / (STEPS.length + 1)));
      setTimeout(() => { num.textContent = orig; done(); }, dur);
    });
  }
  // Digits differ in width: reserve room for the widest one up front, so the cover (flex: 1)
  // neither resizes nor gets overlapped while the number counts
  count.reserve = num => {
    const orig = num.textContent;
    let w = 0;
    for (const t of [orig, ...STEPS.map(pad)]) { num.textContent = t; w = Math.max(w, num.offsetWidth); }
    num.textContent = orig;
    num.style.minWidth = (w + 1) + 'px';
  };

  // Bloody Wasted: SVG noise mask whose threshold sweeps up, then a springy pop back in
  let filterEl = null;
  function dissolveFilter() {
    if (filterEl && filterEl.isConnected) return filterEl;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.position = 'absolute';
    svg.innerHTML = `<filter id="numfx-dissolve" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" seed="7" result="noise"/>
        <feComponentTransfer in="noise" result="mask"><feFuncA type="linear" slope="20" intercept="0"/></feComponentTransfer>
        <feComposite in="SourceGraphic" in2="mask" operator="in"/>
      </filter>`;
    document.body.appendChild(svg);
    filterEl = svg;
    return svg;
  }
  function dissolve(num) {
    const func = $('feFuncA', dissolveFilter());
    const out = 350, gap = 90;
    const t0 = performance.now();
    num.style.filter = 'url(#numfx-dissolve)';
    return new Promise(done => {
      const frame = () => {
        const p = Math.min((performance.now() - t0) / out, 1);
        // Most of the noise's alpha sits in about 0.3–0.7: sweeping the cut-off across that eats the digits away
        const t = 0.3 + 0.4 * p;
        func.setAttribute('intercept', (-20 * t).toFixed(3));
        if (p < 1) return requestAnimationFrame(frame);
        num.style.opacity = '0';
        setTimeout(() => {
          num.style.filter = '';
          num.style.opacity = '';
          num.animate(
            [{ scale: 0 }, { scale: 1.25, offset: 0.6 }, { scale: 1 }],
            { duration: 225, easing: 'cubic-bezier(.3,1.4,.5,1)' }
          ).finished.then(done, done);
        }, gap);
      };
      requestAnimationFrame(frame);
    });
  }

  const FX = { 'amy-died-of-700-tacos': count, 'bloody-wasted': dissolve };

  App.behaviors.numfx = () => {
    if (REDUCED) return;
    $$('.gcard', el.view).forEach(card => {
      const fx = FX[card.dataset.slug];
      if (!fx) return;
      const num = $('.gcard-bignum', card);
      // Measure once the webfont is in, or the widths are the fallback font's
      if (fx.reserve) document.fonts.ready.then(() => fx.reserve(num));
      let busy = false;
      card.addEventListener('mouseenter', () => {
        if (busy) return;
        busy = true;
        fx(num).then(() => { busy = false; });
      });
    });
  };
})();
