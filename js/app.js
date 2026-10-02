/* Entry point. Fills the static nav text from data/, then starts the router. */
(() => {
  'use strict';
  const { $, $$, esc } = App.util;
  const { el } = App;
  const { SITE, UI: T } = window;
  const C = T.cursor;

  $('#brand-name').textContent = SITE.name;
  $('.brand').dataset.cursor = C.home;
  el.navBack.dataset.cursor = C.back;
  el.navBack.innerHTML = `<span class="nav-back-arr" aria-hidden="true">←</span><span class="nav-back-t">${esc(T.navBack)}</span>`;
  el.navBack.setAttribute('aria-label', T.navBack);
  el.navBack.addEventListener('click', App.shell.router.back);
  el.sbar.dataset.cursor = C.scroll;
  $$('.tab', el.tabs).forEach(t => {
    const label = T.pages[t.dataset.tab];
    t.dataset.cursor = C.open;
    t.innerHTML = `<span class="roll"><i data-t="${esc(label)}">${esc(label)}</i></span>`;
  });

  addEventListener('hashchange', App.shell.router.go);
  App.shell.router.go();
})();
