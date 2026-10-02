/* Projects page: accordion rows. */
(() => {
  'use strict';
  const { $$ } = App.util;
  const { el } = App;
  const C = window.UI.cursor;

  App.behaviors.rows = () => {
    $$('.row > button.row-head', el.view).forEach(b => b.addEventListener('click', () => {
      const row = b.parentElement;
      const open = !row.classList.contains('open');
      row.classList.toggle('open', open);
      b.setAttribute('aria-expanded', String(open));
      b.dataset.cursor = open ? C.close : C.expand;
      if (open) { $$('[data-reveal]', row).forEach(e => e.classList.add('in')); App.shell.cursor.hidePreview(); }
      $$('video', row).forEach(v => open ? v.play().catch(() => {}) : v.pause());
      App.shell.cursor.refreshCursor();
    }));
  };
})();
