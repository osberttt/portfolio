/* Global clicks and keys: click-to-play videos, back-to-top, the "spin" easter egg, resize handling.
   (The screenshot viewer is in lightbox.js.) */
(() => {
  'use strict';
  const { $, movePill } = App.util;
  const { REDUCED } = App.env;
  const { el } = App;

  let spinning = false;
  function spinFrame() {
    if (spinning || REDUCED) return;
    spinning = true;
    el.frame.animate(
      [{ transform: 'rotate(0)' }, { transform: 'rotate(-8deg) scale(.96)', offset: 0.2 }, { transform: 'rotate(360deg)' }],
      { duration: 1200, easing: 'cubic-bezier(.65,0,.35,1)' }
    ).finished.then(() => { spinning = false; });
  }

  // Click-to-play videos (.vid): the cover hides and native controls take over; pausing or ending brings it back
  function playVid(box) {
    const v = $('video', box);
    document.querySelectorAll('.vid.is-playing video').forEach(o => o !== v && o.pause());
    box.classList.add('is-playing');
    v.controls = true;
    v.play().catch(() => box.classList.remove('is-playing'));
  }
  const fmtTime = s => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
  // Media events don't bubble, so listen in the capture phase
  document.addEventListener('loadedmetadata', e => {
    const time = e.target.closest?.('.vid') && $('.vid-time', e.target.closest('.vid'));
    if (time && isFinite(e.target.duration)) time.textContent = fmtTime(e.target.duration);
  }, true);
  ['pause', 'ended'].forEach(type => document.addEventListener(type, e => {
    const box = e.target.closest?.('.vid');
    if (!box || e.target.seeking) return;
    box.classList.remove('is-playing');
    e.target.controls = false;
  }, true));

  document.addEventListener('click', e => {
    const t = e.target;
    const cover = t.closest('[data-vid-play]');
    if (cover) { playVid(cover.closest('.vid')); return; }
    if (t.closest('[data-top]')) { el.scroller.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); return; }
    if (t.closest('[data-spin]')) spinFrame();
  });

  addEventListener('resize', () => {
    movePill($('.pill-ind', el.tabs), $('.tab.active', el.tabs));
    App.shell.scroll.onScroll();
  });
})();
