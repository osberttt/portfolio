/* Hash router + page transitions. Routes: #/ · #/projects · #/projects/<slug> · #/about
   On every route change: apply the page theme, close the shutter, swap the HTML, run the
   page's behaviours (see MOUNTS), open the shutter. Behaviours register cleanups that
   teardown() runs before the next page. */
(() => {
  'use strict';
  const { $, $$, wait, movePill } = App.util;
  const { REDUCED, root } = App.env;
  const { el, state } = App;
  const { SITE, UI: T, GAMES } = window;

  const DEFAULT_THEME = { accent: SITE.accent, lane: SITE.lane };
  const PAGE_NUM = { home: '01', projects: '02', about: '03' };

  // Which behaviours (js/behaviors/*.js) run on which page
  const MOUNTS = {
    home: ['reveal', 'magnetic', 'videos', 'persona', 'precise', 'marquee', 'deck', 'numfx'],
    game: ['reveal', 'magnetic', 'toc', 'widgets'],   // no 'videos': case-study clips are click-to-play
    projects: ['reveal', 'magnetic', 'videos', 'rows'],
    about: ['reveal', 'magnetic', 'videos'],
  };

  let busy = false, queued = false, first = true, currentKey = null, current = null;
  // Routes visited in this tab, so the nav's Back button can use the browser history when there is some
  // Kept in sessionStorage so a reload doesn't forget where you came from (the browser keeps its history too)
  const KEEP = 'router-trail';
  let trail = [], scrollMem = new Map();   // scrollMem: scroll position of each page when you left it
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEEP));
    if (saved) { trail = saved.trail; scrollMem = new Map(saved.scroll); }
  } catch (e) { /* storage blocked: start fresh */ }
  function keep() {
    try { sessionStorage.setItem(KEEP, JSON.stringify({ trail, scroll: [...scrollMem] })); } catch (e) { /* ignore */ }
  }

  // Back: the previous page if we came from one, otherwise one level up (case study → Projects → Home)
  function back() {
    if (trail.length > 1) history.back();
    else location.hash = current && current.name === 'game' ? '#/projects' : '#/';
  }

  function parse() {
    const [a, b] = location.hash.replace(/^#\/?/, '').split('/');
    if (a === 'projects' && b) {
      const game = GAMES.find(g => g.slug === b);
      if (game) return { name: 'game', game, key: `projects/${b}` };
    }
    if (a === 'projects' || a === 'about') return { name: a, key: a };
    return { name: 'home', key: 'home' };
  }

  function applyTheme(t) {
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--lane', t.lane);
    root.style.setProperty('--on-accent', App.util.onColor(t.accent));
    App.shell.cursor.setCursorColor();
  }

  function setTabs(r) {
    const key = r.name === 'game' ? 'projects' : r.name;
    $$('.tab', el.tabs).forEach(t => {
      const on = t.dataset.tab === key;
      t.classList.toggle('active', on);
      if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });
    movePill($('.pill-ind', el.tabs), $('.tab.active', el.tabs));
  }

  function setChrome(r) {
    if (r.name === 'game') {
      const i = GAMES.indexOf(r.game) + 1;
      el.hudL.textContent = `02.${i} — ${r.game.title}`;
      state.basePath = `~/projects/${r.game.slug}`;
      document.title = `${r.game.title} — ${SITE.name}`;
    } else {
      el.hudL.textContent = `${PAGE_NUM[r.name]} — ${T.pages[r.name]}`;
      state.basePath = `~/${r.name}`;
      document.title = r.name === 'home' ? `${SITE.name} | ${SITE.role}` : `${T.pages[r.name]} — ${SITE.name}`;
    }
    App.shell.cursor.setStatus(null);
  }

  function runShutter(close) {
    const kf = close
      ? [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }]
      : [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }];
    el.shutter.style.pointerEvents = close ? 'auto' : 'none';
    const done = el.bars.map((b, i) => {
      b.getAnimations().forEach(a => a.cancel());
      b.style.transformOrigin = close ? '50% 100%' : '50% 0%';
      return b.animate(kf, { duration: 340, delay: i * 40, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'both' }).finished;
    });
    el.shutterLabel.getAnimations().forEach(a => a.cancel());
    el.shutterLabel.animate(
      close
        ? [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }]
        : [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-30px)' }],
      { duration: close ? 260 : 200, delay: close ? 120 : 0, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' }
    );
    return Promise.all(done);
  }

  function teardown() {
    state.cleanups.forEach(f => f());
    state.cleanups = [];
    state.tickers.clear();
    state.scrollFns.clear();
  }

  // Jump back to a saved position. Anything above it was already seen, so skip its reveal animation.
  function restoreScroll(top) {
    el.scroller.scrollTop = top;
    const viewTop = el.scroller.getBoundingClientRect().top;
    $$('[data-reveal]', el.view).forEach(e => { if (e.getBoundingClientRect().bottom < viewTop) e.classList.add('in'); });
    App.shell.scroll.onScroll();
  }

  function mount(r) {
    MOUNTS[r.name].forEach(name => App.behaviors[name]());
  }

  async function go() {
    if (busy) { queued = true; return; }
    const r = parse();
    if (r.key === currentKey) return;
    busy = true;
    const isBack = trail[trail.length - 2] === r.key;   // nav Back and the browser's Back both land here
    if (first && trail[trail.length - 1] === r.key) { /* reload: same page, keep the trail */ }
    else if (isBack) trail.pop();
    else if (first) trail = [r.key];   // fresh visit
    else trail.push(r.key);
    if (currentKey) scrollMem.set(currentKey, el.scroller.scrollTop);
    keep();
    current = r;
    el.navBack.hidden = r.name === 'home' && trail.length < 2;

    applyTheme(r.game || DEFAULT_THEME);
    root.style.removeProperty('--shadow-c');
    setTabs(r);
    setChrome(r);
    App.shell.cursor.hidePreview();
    el.shutterLabel.textContent = r.game ? r.game.title : T.pages[r.name];

    if (!first && !REDUCED) await runShutter(true);

    teardown();
    el.view.classList.remove('play');
    el.view.innerHTML = App.pages[r.name](r);
    el.scroller.scrollTop = 0;
    state.scroll.last = 0;
    App.shell.scroll.onScroll();
    mount(r);
    if (isBack && scrollMem.get(r.key)) restoreScroll(scrollMem.get(r.key));
    el.scroller.focus({ preventScroll: true });
    currentKey = r.key;

    if (first) await Promise.race([document.fonts ? document.fonts.ready : null, wait(900)]);

    if (REDUCED) {
      el.shutter.classList.remove('is-initial');
      el.view.classList.add('play');
    } else {
      const opening = runShutter(false);
      el.shutter.classList.remove('is-initial');
      requestAnimationFrame(() => el.view.classList.add('play'));
      await opening;
    }

    first = false;
    busy = false;
    App.shell.cursor.refreshCursor();
    if (queued) { queued = false; go(); }
  }

  App.shell.router = { go, back };
})();
