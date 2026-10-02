/* DOM references and the small pieces of mutable state shared across modules. */
(() => {
  'use strict';
  const { $, $$ } = App.util;

  App.el = {
    frame: $('#frame'),
    lanes: $('#lanes'),
    layer: $('#lane-layer'),
    brush: $('#brush'),
    scroller: $('#scroller'),
    view: $('#view'),
    shutter: $('#shutter'),
    shutterLabel: $('#shutter-label'),
    bars: $$('#shutter .bar'),
    progress: $('#progress'),
    tabs: $('#tabs'),
    hudL: $('#hud-l'),
    hudR: $('#hud-r'),
    tabText: $('#frame-tab-text'),
    frameTab: $('.frame-tab'),
    preview: $('#preview'),
    lightbox: $('#lightbox'),
    navBack: $('#nav-back'),
    sbar: $('#sbar'),
    sbarThumb: $('#sbar-thumb'),
  };

  App.state = {
    mouse: { x: innerWidth / 2, y: innerHeight / 2, active: false },
    scroll: { last: 0, parallax: 0 },
    basePath: '~/home',       // what the folder tab shows when nothing is hovered
    // Per-page registries. The router empties them on every route change.
    cleanups: [],             // functions run on teardown
    tickers: new Set(),       // run every animation frame
    scrollFns: new Set(),     // run on every scroll event
  };

  App.widgets = {};           // filled by js/widgets/*.js
  App.pages = {};             // filled by js/pages/*.js
  App.behaviors = {};         // filled by js/behaviors/*.js
  App.shell = {};             // filled by js/shell/*.js
})();
