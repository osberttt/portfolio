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

  // Text colour for a flat background: ink on light accents, paper on dark ones
  function onColor(hex) {
    const n = parseInt(hex.replace('#', ''), 16);
    const lin = v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
    const L = .2126 * lin(n >> 16) + .7152 * lin((n >> 8) & 255) + .0722 * lin(n & 255);
    return L < .3 ? 'var(--paper)' : 'var(--ink)';
  }

  // Row colour ramp: picks up after the featured accents (lime → mint → blue) and carries on
  // round the wheel, purple → pink → peach → yellow, back toward lime
  const RAMP = ['#e6c4f5', '#f5c2e7', '#f7bfd0', '#f8bfb5', '#f7cba6', '#f6d9a0', '#f3e598', '#e6f099'];

  // n colours spread evenly along RAMP, so the list runs end to end whatever its length or order
  function ramp(n) {
    const rgb = h => [16, 8, 0].map(s => (parseInt(h.slice(1), 16) >> s) & 255);
    return Array.from({ length: n }, (_, i) => {
      const t = n < 2 ? 0 : (i / (n - 1)) * (RAMP.length - 1);
      const k = Math.min(Math.floor(t), RAMP.length - 2);
      const a = rgb(RAMP[k]), b = rgb(RAMP[k + 1]);
      return '#' + a.map((v, j) => Math.round(lerp(v, b[j], t - k)).toString(16).padStart(2, '0')).join('');
    });
  }

  App.util = { $, $$, clamp, lerp, pad, wait, esc, slugify, fmt, br, movePill, onColor, RAMP, ramp };

  App.env = {
    root: document.documentElement,
    REDUCED: matchMedia('(prefers-reduced-motion: reduce)').matches,
    FINE: matchMedia('(hover: hover) and (pointer: fine)').matches,
    YEAR: new Date().getFullYear(),
  };
})();
