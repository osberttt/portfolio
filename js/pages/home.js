/* Home: hero, sticky deck of the featured games, "How I work", AI disclosure. */
(() => {
  'use strict';
  const { esc, pad, fmt, br, onColor } = App.util;
  const { YEAR } = App.env;
  const { splitTitle, chips, footer } = App.tpl;
  const { SITE, UI: T, GAMES, JAMS } = window;
  const C = T.cursor;

  // Per-game panel pattern (data: texture: { src, size: n | [w, h] }). Falls back to the CSS default.
  function textureStyle(t) {
    if (!t || !t.src) return '';
    const [w, h] = Array.isArray(t.size) ? t.size : [t.size || 24, t.size || 24];
    return ` style="background-image:url('${esc(t.src)}');background-size:${w}px ${h}px"`;
  }

  function gameCard(g, i) {
    const n = pad(i + 1);
    const m = g.cover && g.cover.src ? g.cover : (g.hero && g.hero.src && g.hero.kind !== 'youtube' ? g.hero : null);
    // Cover shown whole at itch.io's 630:500 ratio, like a photo pasted on the panel.
    // (No data-lightbox here: clicking the card should open the case study, not zoom the image.)
    const art = !m
      ? `<span class="gcard-cover-ph mono">▶ ${esc((g.cover && g.cover.label) || T.home.cardMediaFallback)}</span>`
      : m.kind === 'video'
        ? `<video src="${esc(m.src)}" muted loop playsinline preload="metadata"></video>`
        : `<img src="${esc(m.src)}" alt="${esc(g.title)}" loading="lazy">`;
    const visual = `
      <div class="gcard-side">
        <span class="gcard-bignum" data-n="${n}">${n}</span>
        <span class="gcard-of mono">/ ${pad(GAMES.length)}</span>
      </div>
      <figure class="gcard-cover" style="--tilt:${i % 2 ? 2 : -2}deg">
        <span class="gcard-tape" aria-hidden="true"></span>${art}
      </figure>`;
    return `<li class="gcard" style="--i:${i};--c:${g.accent};--on-c:${onColor(g.accent)}" data-slug="${g.slug}">
      ${g.sticker ? `<span class="sticker" style="--r:${i % 2 ? -5 : 6}deg">${esc(g.sticker)}</span>` : ''}
      <a class="gcard-a" href="#/projects/${g.slug}" data-cursor="${esc(C.open)}" data-color="${g.accent}">
        <div class="gcard-media"${textureStyle(g.texture)}>${visual}</div>
        <div class="gcard-body">
          <div class="gcard-top mono"><span>${esc(g.jam || '')}</span></div>
          <h3 class="gcard-title">${esc(g.title)}</h3>
          <p class="gcard-pitch">${esc(g.pitch)}</p>
          ${chips(g.tags.slice(0, 3))}
          ${g.tags.length > 3 ? `<p class="gcard-meta">${esc(g.tags.slice(3).join(' · '))}</p>` : ''}
          <span class="gcard-cta">${esc(T.home.cardCta)} <span class="arr">→</span></span>
        </div>
      </a>
    </li>`;
  }

  function render() {
    const { cap, set } = App.phrases;
    const marquee = set(window.WORDS.marqueeCount).map(t => `<span class="marquee-item">${esc(cap(t))}</span>`).join('');
    const how = SITE.howIWork;
    const ai = SITE.aiDisclosure;
    const H = T.home;
    return `<div class="page page--home">
      <section class="hero">
        <p class="eyebrow">${esc(fmt(H.eyebrow, { year: YEAR }))}</p>
        <h1 class="hero-title" aria-label="${esc(SITE.role)}">${splitTitle(SITE.role)}</h1>
        <p class="hero-sub">${esc(SITE.tagline)} <span class="precise">${esc(SITE.taglinePrecise)}</span><br>${esc(SITE.taglineAnd)} <span class="persona-hit" data-persona><span class="persona">${esc(SITE.taglineWord)}</span></span></p>
        <p class="hero-intro" data-reveal>${esc(SITE.intro)}</p>
      </section>

      <div class="marquee" aria-hidden="true"><div class="marquee-track">${marquee}${marquee}${marquee}</div></div>

      <section class="games" id="games">
        <header class="section-head" data-reveal>
          <h2>${br(H.gamesHeading)}</h2>
        </header>
        <ol class="deck">
          ${GAMES.map(gameCard).join('')}
          <li class="deck-end" style="--i:${GAMES.length}">
            <a class="btn btn--big" href="#/projects" data-magnetic data-cursor="${esc(C.open)}">${esc(H.allProjects)} <span class="arr">→</span></a>
            <span class="mono">${esc(fmt(H.allProjectsCount, { jams: JAMS.length }))}</span>
          </li>
        </ol>
      </section>

      <section class="how">
        <header class="section-head" data-reveal>
          <h2>${br(how.heading)}</h2>
        </header>
        <p class="how-lede" data-reveal>${esc(how.lede)}</p>
        <ol class="loop">
          ${how.steps.map((s, i) => {
            const g = s.eg && GAMES.find(x => x.slug === s.eg.game);
            const eg = g ? `<a class="loop-eg" href="#/projects/${g.slug}" style="--c:${g.accent};--on-c:${onColor(g.accent)}" data-cursor="${esc(C.caseStudy)}" data-color="${g.accent}">
                <span class="loop-eg-tag mono">${esc(g.title)} <span class="arr">→</span></span>
                <span class="loop-eg-text">${esc(s.eg.text)}</span>
              </a>` : '';
            return `<li class="loop-step${s.loops ? ' is-last' : ''}" data-reveal>
              <span class="loop-n mono">${pad(i + 1)}</span>
              <div class="loop-card">
                <h3>${esc(s.name)}</h3>
                <p>${esc(s.body)}</p>
                ${eg}
                ${s.loops ? `<span class="loop-back mono">${esc(H.loopBack)}</span>` : ''}
              </div>
            </li>`;
          }).join('')}
        </ol>

        <div class="ai-note" data-reveal>
          <span class="ai-stamp mono">${esc(H.aiStamp)}</span>
          <h3>${esc(ai.heading)}</h3>
          <div class="ai-note-body">${ai.body.map(p => `<p>${esc(p).replace(/\[\[([gr])\|(.+?)\]\]/g, '<mark class="hl hl--$1">$2</mark>')}</p>`).join('')}</div>
        </div>
      </section>
      ${footer()}
    </div>`;
  }

  App.pages.home = render;
})();
