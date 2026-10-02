/* Scroll: progress bar, side-lane parallax, custom scrollbar, wheel forwarding. */
(() => {
  'use strict';
  const { clamp } = App.util;
  const { REDUCED, root } = App.env;
  const { el, state } = App;
  const { TUNING, UI: T } = window;

  const scrollState = state.scroll;
  const TILE = parseFloat(getComputedStyle(root).getPropertyValue('--tile')) || 64;

  function applyParallax() {
    el.lanes.style.backgroundPosition = `0 ${scrollState.parallax.toFixed(2)}px`;
    el.layer.style.transform = `translate3d(0, ${scrollState.parallax.toFixed(2)}px, 0)`;
  }

  function onScroll() {
    const st = el.scroller.scrollTop;
    const d = st - scrollState.last;
    scrollState.last = st;
    if (d) { scrollState.parallax -= d * TUNING.lanes.parallax; applyParallax(); }
    const max = el.scroller.scrollHeight - el.scroller.clientHeight;
    const p = max > 0 ? clamp(st / max, 0, 1) : 0;
    el.progress.style.transform = `scaleX(${p.toFixed(4)})`;
    el.hudR.textContent = `${T.scrollReadout} ${String(Math.round(p * 100)).padStart(3, '0')}%`;
    updateScrollbar();
    state.scrollFns.forEach(f => f());
  }
  el.scroller.addEventListener('scroll', onScroll, { passive: true });

  function scrollToEl(target, offset = 0) {
    if (!target) return;
    const top = target.getBoundingClientRect().top - el.scroller.getBoundingClientRect().top + el.scroller.scrollTop - offset;
    el.scroller.scrollTo({ top, behavior: REDUCED ? 'auto' : 'smooth' });
  }

  /* ---------- Custom scrollbar ----------
     The native one is hidden (Chrome on Windows draws arrow buttons on it and
     ignores styling once scrollbar-color is set). This track stops short of the
     frame's rounded corner; see --sbar-top / --sbar-bottom in css/stage.css. */

  const SBAR_MIN = 40;   // shortest the thumb gets, px
  const sbar = { h: 0, track: 0, drag: null };

  function updateScrollbar() {
    const { scrollTop: st, scrollHeight: sh, clientHeight: ch } = el.scroller;
    const off = sh <= ch + 1;
    el.sbar.classList.toggle('is-off', off);
    if (off) return;
    sbar.track = el.sbar.clientHeight;
    sbar.h = Math.max(SBAR_MIN, sbar.track * ch / sh);
    const y = (sbar.track - sbar.h) * (st / (sh - ch));
    el.sbarThumb.style.height = `${sbar.h.toFixed(1)}px`;
    el.sbarThumb.style.transform = `translateY(${y.toFixed(1)}px)`;
  }

  // Drag the thumb
  el.sbarThumb.addEventListener('pointerdown', e => {
    e.preventDefault();
    e.stopPropagation();
    el.sbarThumb.setPointerCapture(e.pointerId);
    el.sbar.classList.add('is-drag');
    sbar.drag = { y: e.clientY, top: el.scroller.scrollTop };
  });
  el.sbarThumb.addEventListener('pointermove', e => {
    if (!sbar.drag) return;
    const { scrollHeight: sh, clientHeight: ch } = el.scroller;
    const ratio = (sh - ch) / Math.max(1, sbar.track - sbar.h);
    el.scroller.scrollTop = sbar.drag.top + (e.clientY - sbar.drag.y) * ratio;
  });
  const endDrag = () => { sbar.drag = null; el.sbar.classList.remove('is-drag'); };
  el.sbarThumb.addEventListener('pointerup', endDrag);
  el.sbarThumb.addEventListener('pointercancel', endDrag);

  // Click the empty track to jump there
  el.sbar.addEventListener('pointerdown', e => {
    if (e.target === el.sbarThumb) return;
    const { scrollHeight: sh, clientHeight: ch } = el.scroller;
    const y = e.clientY - el.sbar.getBoundingClientRect().top - sbar.h / 2;
    const top = clamp(y / Math.max(1, sbar.track - sbar.h), 0, 1) * (sh - ch);
    el.scroller.scrollTo({ top, behavior: REDUCED ? 'auto' : 'smooth' });
  });

  // Content height changes (accordion rows, images loading) resize the thumb
  new ResizeObserver(updateScrollbar).observe(el.view);

  // Wheel over the side lanes or nav still scrolls the content
  addEventListener('wheel', e => {
    if (el.scroller.contains(e.target) || !el.lightbox.hidden) return;
    el.scroller.scrollBy({ top: e.deltaY * (e.deltaMode === 1 ? 40 : 1) });
  }, { passive: true });

  App.shell.scroll = { onScroll, scrollToEl, TILE };
})();
