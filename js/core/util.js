/* Shared namespace + pure helpers. Loaded first; every other script hangs off `App`. */
window.App = window.App || {};

(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const pad = n => String(n).padStart(2, '0');
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slugify = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  // UI text helpers: fill {name} slots, and turn \n into <br> (after escaping)
  const fmt = (s, vars = {}) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  const br = s => esc(s).replace(/\n/g, '<br>');

  // Slides a pill indicator (nav tabs, projects filter) under the active button
  function movePill(ind, target) {
    if (!ind || !target) return;
    ind.style.width = `${target.offsetWidth}px`;
    ind.style.transform = `translateX(${target.offsetLeft}px)`;
  }

  // Text colour for a flat background: ink on light accents, paper on dark ones (e.g. Catch's purple)
  function onColor(hex) {
    const n = parseInt(hex.replace('#', ''), 16);
    const lin = v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
    const L = .2126 * lin(n >> 16) + .7152 * lin((n >> 8) & 255) + .0722 * lin(n & 255);
    return L < .3 ? 'var(--paper)' : 'var(--ink)';
  }

  App.util = { $, $$, clamp, lerp, pad, wait, esc, slugify, fmt, br, movePill, onColor };

  App.env = {
    root: document.documentElement,
    REDUCED: matchMedia('(prefers-reduced-motion: reduce)').matches,
    FINE: matchMedia('(hover: hover) and (pointer: fine)').matches,
    YEAR: new Date().getFullYear(),
  };
})();
