/* Case study page: hero, sticky contents, and the block renderer that turns
   data/games/*.js `blocks` into HTML. Block types are documented in data/README.md. */
(() => {
  'use strict';
  const { esc, pad, fmt, slugify, onColor } = App.util;
  const { splitTitle, media, footer } = App.tpl;
  const { UI: T, GAMES } = window;
  const C = T.cursor;

  // Facts box: a 6-column grid; each entry is how many columns that tag spans.
  // 6 tags = 3 + 3; 5 = 3 + 2 with the 4th (the long role list) wide and the 5th narrow; 4 = 2 + 2.
  function tagSpans(n) {
    if (n === 4) return [3, 3, 3, 3];
    if (n === 5) return [2, 2, 2, 4, 2];
    if (n <= 3) return Array(n).fill(6 / n);
    const spans = Array(n).fill(2);   // 6+ tags: rows of 3, last row stretched to fill
    const rest = n % 3;
    if (rest) for (let k = n - rest; k < n; k++) spans[k] = 6 / rest;
    return spans;
  }

  function block(b, g) {
    switch (b.type) {
      case 'section':
        return `<h2 class="blk-h" id="${b.id}" data-reveal>${esc(b.title)}</h2>`;
      case 'text':
        return `<div class="blk-text${b.size === 'lg' ? ' blk-text--lg' : ''}" data-reveal>${b.html}</div>`;
      case 'struck':
        return `<p class="struck" data-reveal>${b.items.map(i => `<s>${esc(i)}</s>`).join('')}</p>`;
      case 'play':
        // A big call to action in the body. Set `only: true` to drop the header's small Play button.
        return g.play ? `<div class="play-big" data-reveal>
          <a class="btn btn--big" href="${esc(g.play)}" target="_blank" rel="noopener" data-magnetic data-cursor="${esc(C.play)}">${esc(b.label || T.caseStudy.play)} <span aria-hidden="true">↗</span></a>
          ${b.note ? `<p class="play-note">${esc(b.note)}</p>` : ''}
        </div>` : '';
      case 'list':
        return `<ul class="blk-list" data-reveal>${b.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
      case 'callout':
        return `<div class="callout callout--${b.tone || 'problem'}" data-reveal><span class="callout-label">${esc(b.label)}</span>${b.html}</div>`;
      case 'quote':
        return `<blockquote class="pull" data-reveal><p>${b.html}</p>${b.cite ? `<cite>${esc(b.cite)}</cite>` : ''}</blockquote>`;
      case 'media':
        return media({ ...b, controls: true }, b.label);
      case 'gallery':
        return `<div class="gallery" style="--cols:${b.cols || 3}">${b.items.map(m => media({ ...m, controls: true })).join('')}</div>`;
      case 'steps':
        return `<ol class="steps" data-reveal>${b.items.map((s, k) => `<li style="--k:${k}"><div><h4>${esc(s.title)}</h4><p>${s.html}</p></div></li>`).join('')}</ol>`;
      case 'keys':
        return `<div class="keys" data-reveal>${b.items.map(k => `<div class="key"><span class="keycap">${esc(k.key)}</span><p>${k.html}</p></div>`).join('')}</div>`;
      case 'stats':
        return `<div class="stats" data-reveal>${b.items.map(s => `<div class="stat"><b ${/^\d+$/.test(s.value) ? `data-count="${s.value}"` : ''}>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>`;
      case 'credits':
        // Whole row is the link (when there is a url) and fills with the person's colour on hover
        return `<ul class="credits" data-reveal>${b.items.map(p => {
          const inner = `<span class="credit-role mono">${esc(p.role)}</span><span class="credit-name">${esc(p.name)}${p.url ? ' <span class="arr">↗</span>' : ''}</span>`;
          const row = p.url
            ? `<a class="credit" href="${esc(p.url)}" target="_blank" rel="noopener" data-cursor="${esc(C.visit)}" data-color="${esc(p.color)}">${inner}</a>`
            : `<div class="credit" data-color="${esc(p.color)}">${inner}</div>`;   // not clickable: only the cursor takes the colour
          return `<li style="--c:${esc(p.color || 'var(--accent)')}">${row}</li>`;
        }).join('')}</ul>`;
      case 'widget': {
        const w = App.widgets[b.name];
        return w ? `<div data-widget="${b.name}" data-reveal>${w.html(g)}</div>` : '';
      }
      default:
        return '';
    }
  }

  function render({ game: g }) {
    const i = GAMES.indexOf(g);
    const next = GAMES[(i + 1) % GAMES.length];
    const sections = [];
    g.blocks.forEach((b, k) => {
      if (b.type === 'section') { b.id = `s-${k}-${slugify(b.title)}`; sections.push(b); }
    });
    const CS = T.caseStudy;
    const bigPlay = g.blocks.some(b => b.type === 'play' && b.only);
    const playBtn = bigPlay ? '' : g.play
      ? `<a class="btn" href="${esc(g.play)}" target="_blank" rel="noopener" data-magnetic data-cursor="${esc(C.play)}">${esc(CS.play)} <span aria-hidden="true">↗</span></a>`
      : `<span class="btn btn--off">${esc(CS.playSoon)}</span>`;

    return `<div class="page page--case" style="--c:${g.accent}">
      <header class="case-hero">
        <p class="case-num mono">${pad(i + 1)} / ${pad(GAMES.length)} — ${esc(g.jam || g.tags[2])}</p>
        <h1 class="case-title">${splitTitle(g.title)}</h1>
        <p class="case-pitch" data-reveal>${esc(g.pitch)}</p>
        <dl class="spec" data-reveal style="--d:1">
          ${g.tags.map((t, k) => `<div style="grid-column: span ${tagSpans(g.tags.length)[k]}"><dt>${pad(k + 1)}</dt><dd>${esc(t)}</dd></div>`).join('')}
        </dl>
        ${playBtn ? `<div class="case-actions" data-reveal style="--d:2">${playBtn}${g.playNote ? `<p class="play-note">${esc(g.playNote)}</p>` : ''}</div>` : ''}
        ${g.sticker ? `<span class="sticker" style="--r:7deg">${esc(g.sticker)}</span>` : ''}
      </header>

      ${g.hero ? media({ ...g.hero, controls: true }, CS.heroFallback, 'media--hero') : ''}

      <div class="case-body${sections.length ? '' : ' case-body--single'}">
        ${sections.length ? `<nav class="toc" aria-label="${esc(CS.contents)}">
          <span class="toc-label">${esc(CS.contents)}</span>
          ${sections.map(s => `<button data-target="${s.id}">${esc(s.title)}</button>`).join('')}
          <span class="toc-ind"></span>
        </nav>` : ''}
        <div class="blocks">${g.blocks.map(b => block(b, g)).join('')}</div>
      </div>

      <a class="next" href="#/projects/${next.slug}" style="--c:${next.accent};--on-c:${onColor(next.accent)}" data-cursor="${esc(C.next)}" data-color="${next.accent}">
        <small class="mono">${esc(fmt(CS.next, { n: pad(GAMES.indexOf(next) + 1) }))}</small>
        <strong>${esc(next.title)}</strong>
        <span class="arrow" aria-hidden="true">→</span>
      </a>
      ${footer()}
    </div>`;
  }

  App.pages.game = render;
})();
