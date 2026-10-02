/* "specificity": black letters. Hover one to paint it a freshly generated colour; hover a painted one to
   turn it back to black. 0.8s after the last hover, all letters return to black together.
   Painting fires a burst of tiny squares and "+" marks in the new colour, like a particle explosion; unpainting
   pulls a few ink specks back into the letter.
   Colours come from a small generator (green → purple, dark enough for the paper). */
(() => {
  'use strict';
  const { $, $$, esc } = App.util;
  const { REDUCED } = App.env;
  const { el, state } = App;
  const { UI: T } = window;

  // Hue range in OKLCH: 145 = green, 200 = teal, 260 = blue, 305 = purple.
  const HUE_FROM = 145, HUE_TO = 305;
  let seed = Math.random();
  function nextColour() {
    seed = (seed + 0.618034) % 1;   // golden-ratio steps: consecutive colours never land close together
    const h = HUE_FROM + seed * (HUE_TO - HUE_FROM);
    const l = 0.5 + Math.random() * 0.08;
    const c = 0.15 + Math.random() * 0.05;
    return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
  }

  const RESET_MS = 1400;  // after this long with no new hover, every letter goes back to black at once

  function pop(ch, on) {
    if (REDUCED) return;
    const tilt = (Math.random() * 2 - 1) * 14;
    ch.animate(on
      ? [{ transform: `translateY(-.18em) scale(1.35) rotate(${tilt}deg)` }, { transform: 'none' }]
      : [{ transform: 'scale(1.15, .7)' }, { transform: 'none' }],
    { duration: on ? 520 : 380, easing: 'cubic-bezier(.34,1.56,.64,1)' });
  }

  // Sparks: a tiny particle system, like a Unity burst. Each particle gets a random direction, speed, size, spin
  // and lifetime, slows with drag, sinks with a little gravity, and shrinks and fades out over the end of its life.
  // One requestAnimationFrame loop moves every live particle; it stops itself when none are left.
  const rand = (a, b) => a + Math.random() * (b - a);
  const live = [];
  let raf = 0, last = 0;

  function step(now) {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    for (let i = live.length - 1; i >= 0; i--) {
      const p = live[i];
      p.age += dt;
      const t = p.age / p.life;
      if (t >= 1 || !p.el.isConnected) { p.el.remove(); live.splice(i, 1); continue; }
      const drag = Math.exp(-p.drag * dt);
      p.vx *= drag; p.vy = p.vy * drag + p.gravity * dt; p.spin *= drag;
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.spin * dt;
      const alpha = p.fadeIn ? Math.min(t / 0.25, 1) * (1 - Math.max(0, (t - 0.6) / 0.4)) : 1 - Math.max(0, (t - 0.35) / 0.65) ** 1.4;
      const scale = 1 - 0.55 * t;
      p.el.style.opacity = alpha.toFixed(3);
      p.el.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) translate(-50%, -50%) rotate(${p.rot.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
    }
    raf = live.length ? requestAnimationFrame(step) : 0;
  }

  function emit(host, p) {
    const e = document.createElement('span');
    e.className = p.plus ? 'pc-spark pc-spark--plus' : 'pc-spark';
    e.setAttribute('aria-hidden', 'true');
    e.style.color = p.colour;
    e.style.setProperty('--s', `${p.size}px`);
    host.appendChild(e);
    live.push({ ...p, el: e, age: 0 });
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); }
  }

  // Paint: an explosion out of the letter. Unpaint: a few ink specks get sucked into it.
  function burst(host, ch, colour, inward) {
    const cx = ch.offsetLeft + ch.offsetWidth / 2;
    const cy = ch.offsetTop + ch.offsetHeight / 2;
    const h = ch.offsetHeight;
    if (!inward) {
      const n = Math.round(rand(15, 21));
      for (let i = 0; i < n; i++) {
        const a = rand(0, Math.PI * 2), v = rand(3, 11) * h;   // speed in px/s, scaled to the type size
        const plus = Math.random() < 0.35;
        emit(host, {
          x: cx + rand(-0.2, 0.2) * ch.offsetWidth, y: cy + rand(-0.2, 0.2) * h,
          vx: Math.cos(a) * v, vy: Math.sin(a) * v - rand(0, 1.5) * h,
          drag: rand(3.5, 6), gravity: rand(2, 6) * h,
          rot: rand(0, 360), spin: rand(-540, 540),
          life: rand(0.45, 0.95), size: plus ? rand(9, 14) : rand(4, 8), plus, colour,
        });
      }
    } else {
      for (let i = 0; i < 6; i++) {
        const a = rand(0, Math.PI * 2), r = rand(0.55, 0.95) * h, life = rand(0.28, 0.4);
        emit(host, {
          x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r,
          vx: -Math.cos(a) * r * 4.2, vy: -Math.sin(a) * r * 4.2,
          drag: 3, gravity: 0, rot: rand(0, 360), spin: rand(-300, 300),
          life, size: rand(3, 5), plus: false, colour, fadeIn: true,
        });
      }
    }
  }

  App.behaviors.precise = () => {
    const host = $('.precise', el.view);
    if (!host) return;
    const word = host.textContent;
    host.setAttribute('aria-label', word);
    host.dataset.cursor = T.cursor.paint;
    host.innerHTML = [...word].map(c => `<span class="pc" aria-hidden="true">${esc(c)}</span>`).join('');
    const letters = $$('.pc', host);

    function paint(ch, on, quiet) {
      if (on) {
        const colour = nextColour();
        ch.style.color = colour;
        host.dataset.color = colour;   // tints the cursor and the frame shadow to the newest colour
        if (!REDUCED) burst(host, ch, colour, false);
      } else {
        ch.style.removeProperty('color');
        if (!REDUCED && !quiet) burst(host, ch, 'var(--ink)', true);
      }
      ch.classList.toggle('on', on);
      pop(ch, on);
    }

    let timer = 0;
    function resetAll() {
      letters.filter(ch => ch.classList.contains('on')).forEach(ch => paint(ch, false, true));
      delete host.dataset.color;
      App.shell.cursor.refreshCursor();
    }
    state.cleanups.push(() => clearTimeout(timer));

    letters.forEach(ch => ch.addEventListener('pointerenter', () => {
      paint(ch, !ch.classList.contains('on'));
      App.shell.cursor.refreshCursor();
      clearTimeout(timer);
      timer = setTimeout(resetAll, RESET_MS);
    }));
  };
})();
