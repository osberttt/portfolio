/* Screenshot viewer. Any img[data-lightbox] opens it full screen on the page's backdrop.
   Closes with the Back button, Esc, a click outside the image, or the browser's own Back
   (opening pushes a history entry, so Back closes the viewer instead of leaving the page).
   Arrows / ← → step through the other screenshots on the same page. */
(() => {
  'use strict';
  const { $, $$, esc, pad } = App.util;
  const { REDUCED } = App.env;
  const { el } = App;
  const { UI: T } = window;
  const L = T.lightbox, C = T.cursor;

  const box = el.lightbox;
  box.tabIndex = -1;
  box.innerHTML = `
    <div class="lb-bar">
      <button class="lb-back" type="button" data-lb="close" data-cursor="${esc(C.back)}"><span aria-hidden="true">←</span> ${esc(L.back)}</button>
      <span class="lb-count"></span>
      <span class="lb-hint">${esc(L.hint)}</span>
    </div>
    <figure class="lb-fig">
      <img alt="">
      <figcaption class="lb-cap"></figcaption>
    </figure>
    <button class="lb-nav lb-prev" type="button" data-lb="prev" aria-label="${esc(L.prev)}" data-cursor="${esc(C.back)}">←</button>
    <button class="lb-nav lb-next" type="button" data-lb="next" aria-label="${esc(L.next)}" data-cursor="${esc(C.next)}">→</button>`;
  const img = $('img', box), cap = $('.lb-cap', box), count = $('.lb-count', box);

  let list = [], idx = 0, pushed = false;

  function show(k) {
    idx = (k + list.length) % list.length;
    const src = list[idx];
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    const text = src.closest('figure')?.querySelector('figcaption')?.textContent || '';
    cap.textContent = text;
    cap.hidden = !text;
    count.textContent = list.length > 1 ? `${pad(idx + 1)} / ${pad(list.length)}` : '';
    box.classList.toggle('is-multi', list.length > 1);
  }

  function open(src) {
    list = $$('img[data-lightbox]', el.view);
    show(Math.max(0, list.indexOf(src)));
    box.hidden = false;
    history.pushState({ lightbox: true }, '');
    pushed = true;
    if (!REDUCED) {
      box.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' });
      $('.lb-fig', box).animate([{ transform: 'translateY(16px) scale(.97)' }, { transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.34,1.56,.64,1)' });
    }
    box.focus({ preventScroll: true });   // keys work at once; Tab reaches Back
  }

  function hide() {
    box.hidden = true;
    App.shell.cursor.refreshCursor();
  }

  // Always leave through history, so the entry open() pushed is used up
  function close() {
    if (pushed) { pushed = false; history.back(); }
    hide();
  }

  addEventListener('popstate', () => { if (!box.hidden) { pushed = false; hide(); } });

  document.addEventListener('click', e => {
    const t = e.target;
    if (box.hidden) {
      const src = t.closest('img[data-lightbox]');
      if (src) open(src);
      return;
    }
    const act = t.closest('[data-lb]');
    if (act) {
      const a = act.dataset.lb;
      if (a === 'close') close(); else show(idx + (a === 'next' ? 1 : -1));
      return;
    }
    if (t !== img) close();   // anywhere outside the image
  });

  addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (list.length > 1 && e.key === 'ArrowRight') show(idx + 1);
    else if (list.length > 1 && e.key === 'ArrowLeft') show(idx - 1);
  });
})();
