/* Cursor (coloured arrow + hand), hover status in the folder tab, level-editor lane brush,
   floating project preview, light-source frame shadow, and the per-frame render loop. */
(() => {
  'use strict';
  const { esc, lerp, clamp } = App.util;
  const { FINE, root } = App.env;
  const { el, state } = App;
  const { TUNING, UI: T } = window;
  const { mouse } = state;
  const { TILE } = App.shell.scroll;

  const shadow = { x: 6, y: 6, lx: 0, ly: 0 };
  const pv = { x: 0, y: 0, s: 0, show: false, target: null };
  let lastCell = '';
  let inLane = false;

  /* ---------- Cursor ---------- */

  // The system arrow and hand, redrawn as SVG and filled with the page accent
  const INK = '#12161f';
  const cursorCache = new Map();
  function cursorUrl(kind, fill) {
    const key = kind + fill;
    if (!cursorCache.has(key)) {
      const svg = kind === 'arrow'
        ? `<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'><path d='M4 3v19l5-4.5 3.5 7.5 3.5-1.5-3.4-7.5H19z' fill='${fill}' stroke='${INK}' stroke-width='2' stroke-linejoin='round'/></svg>`
        : `<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'>` +
          `<g fill='${INK}' stroke='${INK}' stroke-width='3.2' stroke-linejoin='round'>` +
          `<rect x='9' y='2' width='4' height='14' rx='2'/><rect x='13' y='9' width='4' height='9' rx='2'/><rect x='17' y='10' width='4' height='9' rx='2'/><rect x='21' y='11.5' width='3.5' height='8' rx='1.75'/>` +
          `<rect x='3.5' y='14' width='4' height='8' rx='2' transform='rotate(-38 5.5 18)'/><rect x='7' y='14' width='17.5' height='11' rx='4.5'/></g>` +
          `<g fill='${fill}'>` +
          `<rect x='9' y='2' width='4' height='14' rx='2'/><rect x='13' y='9' width='4' height='9' rx='2'/><rect x='17' y='10' width='4' height='9' rx='2'/><rect x='21' y='11.5' width='3.5' height='8' rx='1.75'/>` +
          `<rect x='3.5' y='14' width='4' height='8' rx='2' transform='rotate(-38 5.5 18)'/><rect x='7' y='14' width='17.5' height='11' rx='4.5'/></g>` +
          `<path d='M13 11.5v4M17 12v4M21 13v3.5' stroke='${INK}' stroke-width='1.3' stroke-linecap='round'/></svg>`;
      const hot = kind === 'arrow' ? '4 3' : '11 2';
      cursorCache.set(key, `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hot}, ${kind === 'arrow' ? 'auto' : 'pointer'}`);
    }
    return cursorCache.get(key);
  }

  let handColor = '';
  function setCursorColor(handFill) {
    const accent = getComputedStyle(root).getPropertyValue('--accent').trim();
    const fill = handFill || accent;
    root.style.setProperty('--cur-arrow', cursorUrl('arrow', accent));
    if (fill !== handColor) { handColor = fill; root.style.setProperty('--cur-hand', cursorUrl('hand', fill)); }
  }

  /* ---------- Folder-tab status ---------- */

  // Hover labels show up in the folder tab, like a browser status bar
  function setStatus(target) {
    if (!target) {
      el.tabText.textContent = state.basePath;
      el.frameTab.classList.remove('is-status');
      return;
    }
    let dest = '';
    const href = target.getAttribute('href');
    if (href && href.startsWith('#/')) dest = `~/${href.slice(2) || 'home'}`;
    else if (href && href !== '#') { try { const u = new URL(href, location.href); dest = u.host + u.pathname.replace(/\/$/, ''); } catch { /* ignore */ } }
    el.tabText.textContent = `${target.dataset.cursor.toLowerCase()}${dest ? ` → ${dest}` : ''}`;
    el.frameTab.classList.add('is-status');
  }

  /* ---------- Hover state ---------- */

  function cursorState(t) {
    if (!t || !t.closest) return;
    inLane = !el.frame.contains(t) && el.lightbox.hidden;
    if (!inLane) el.brush.classList.remove('on');   // shown by the loop only when near a point

    const lab = inLane ? null : t.closest('[data-cursor]');
    setStatus(lab);

    // Hovering a colored thing re-tints the hand and the frame's shadow
    const colored = inLane ? null : t.closest('[data-color]');
    if (colored) root.style.setProperty('--shadow-c', colored.dataset.color);
    else root.style.removeProperty('--shadow-c');
    setCursorColor(colored ? colored.dataset.color : '');

    // Floating preview for project rows
    const p = FINE ? t.closest('[data-preview]') : null;
    if (p && !p.closest('.row.open')) showPreview(p); else hidePreview();
  }

  function refreshCursor() {
    if (mouse.active) cursorState(document.elementFromPoint(mouse.x, mouse.y));
  }

  addEventListener('pointermove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });
  document.addEventListener('mouseleave', () => { mouse.active = false; inLane = false; el.brush.classList.remove('on'); });
  document.addEventListener('mouseenter', () => { mouse.active = true; });
  document.addEventListener('pointerover', e => { if (e.pointerType === 'mouse') cursorState(e.target); });

  /* ---------- Lane brush ---------- */

  addEventListener('pointerdown', e => {
    if (!el.frame.contains(e.target) && el.lightbox.hidden) {
      placeTile(e.clientX, e.clientY);
      el.scroller.focus({ preventScroll: true });
    }
  });

  // Click the side lanes to drop a tile, level-editor style
  function placeTile(x, y) {
    const cx = Math.floor(x / TILE);
    const cy = Math.floor((y - state.scroll.parallax) / TILE);
    const t = document.createElement('i');
    t.className = 'tile';
    t.style.left = `${cx * TILE}px`;
    t.style.top = `${cy * TILE}px`;
    t.style.background = getComputedStyle(root).getPropertyValue('--accent');
    t.addEventListener('animationend', () => t.remove());
    el.layer.appendChild(t);
  }

  /* ---------- Hover preview ---------- */

  function showPreview(p) {
    pv.show = true;
    if (pv.target === p) return;
    pv.target = p;
    if (pv.s < 0.05) { pv.x = mouse.x; pv.y = mouse.y; }
    el.preview.style.setProperty('--c', p.dataset.color || 'var(--accent)');
    const src = p.dataset.previewSrc;
    el.preview.innerHTML = src
      ? `<img src="${esc(src)}" alt="">`
      : `<span class="preview-k">${esc(T.projects.preview)}</span><span class="preview-t">${esc(p.dataset.preview)}</span>`;
  }

  function hidePreview() {
    pv.show = false;
    pv.target = null;
  }

  /* ---------- Frame loop ---------- */

  function loop() {
    // Lane brush snaps to the nearest grid intersection (where the lines cross, like Unity's grid)
    if (FINE && inLane) {
      const parallax = state.scroll.parallax;
      const px = Math.round(mouse.x / TILE);
      const py = Math.round((mouse.y - parallax) / TILE);
      // Only show the point (and its Vector2 label) when the cursor is actually near it
      const dist = Math.hypot(mouse.x - px * TILE, mouse.y - parallax - py * TILE);
      el.brush.classList.toggle('on', dist <= TUNING.lanes.pointRadius);
      const cell = `${px}:${py}`;
      if (cell !== lastCell) {
        lastCell = cell;
        el.brush.style.transform = `translate(${px * TILE + 0.5}px, ${py * TILE + 0.5}px)`;
        const { x: ox, y: oy } = TUNING.lanes.origin;
        el.brush.dataset.xy = `Vector2(${px + ox}, ${-py + oy})`;
      }
    }

    // Light-source shadow: the frame's hard shadow falls away from the cursor
    const base = innerWidth <= 720 ? 4 : 6;
    const tx = mouse.active && FINE ? base - ((mouse.x / innerWidth) * 2 - 1) * 10 : base;
    const ty = mouse.active && FINE ? base - ((mouse.y / innerHeight) * 2 - 1) * 10 : base;
    shadow.x = lerp(shadow.x, tx, 0.08);
    shadow.y = lerp(shadow.y, ty, 0.08);
    if (Math.abs(shadow.x - shadow.lx) > 0.04 || Math.abs(shadow.y - shadow.ly) > 0.04) {
      shadow.lx = shadow.x; shadow.ly = shadow.y;
      root.style.setProperty('--sx', shadow.x.toFixed(2));
      root.style.setProperty('--sy', shadow.y.toFixed(2));
    }

    // Hover preview
    if (pv.show || pv.s > 0.01) {
      const px = pv.x;
      pv.x = lerp(pv.x, mouse.x, 0.16);
      pv.y = lerp(pv.y, mouse.y, 0.16);
      pv.s = lerp(pv.s, pv.show ? 1 : 0, 0.2);
      const rot = clamp((pv.x - px) * 1.2, -14, 14);
      el.preview.style.opacity = pv.s.toFixed(3);
      el.preview.style.transform = `translate3d(${pv.x.toFixed(1)}px, ${pv.y.toFixed(1)}px, 0) translate(36px, -50%) rotate(${rot.toFixed(2)}deg) scale(${(0.6 + pv.s * 0.4).toFixed(3)})`;
    }

    state.tickers.forEach(f => f());
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  App.shell.cursor = { setCursorColor, setStatus, refreshCursor, hidePreview };
})();
