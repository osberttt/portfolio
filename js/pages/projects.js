/* Projects archive: featured rows (link to case study) and accordion rows. */
(() => {
  'use strict';
  const { esc, pad, fmt, onColor, ramp } = App.util;
  const { splitTitle, media, footer } = App.tpl;
  const { SITE, UI: T, GAMES, JAMS } = window;
  const C = T.cursor;

  function featuredRow(j, n) {
    const g = GAMES.find(x => x.slug === j.featured);
    if (!g) return '';
    return `<li class="row is-featured" style="--c:${g.accent};--on-c:${onColor(g.accent)};--d:${n % 4}" data-reveal>
      <a class="row-head wipe" href="#/projects/${g.slug}" data-cursor="${esc(C.caseStudy)}" data-color="${g.accent}">
        <span class="row-num">${pad(n + 1)}</span>
        <span class="row-main">
          <span class="row-title">${esc(g.title)}<em>${esc(T.projects.featured)}</em></span>
          <span class="row-sub">${esc([g.jam, g.tags[0]].filter(Boolean).join(' · '))}</span>
        </span>
        <span class="row-tag">${esc(g.tags[2] || '')}</span>
        <span class="row-icon row-icon--arrow" aria-hidden="true">↗</span>
      </a>
    </li>`;
  }

  function projectRow(p, n, shade) {
    const c = p.color || shade;
    return `<li class="row" style="--c:${c};--d:${n % 4}" data-reveal>
      <button class="row-head wipe" aria-expanded="false" data-cursor="${esc(C.expand)}" data-color="${c}">
        <span class="row-num">${pad(n + 1)}</span>
        <span class="row-main">
          <span class="row-title">${esc(p.title)}</span>
          <span class="row-sub">${esc([p.event, p.length, p.team, p.role].filter(Boolean).join(' · '))}</span>
        </span>
        <span class="row-tag">${esc(p.genre || '')}</span>
        <span class="row-icon row-icon--plus" aria-hidden="true"></span>
      </button>
      <div class="row-panel"><div class="row-inner"><div class="row-body" data-lb-group>
        ${p.video && p.video.src ? media(p.video, T.projects.videoFallback) : ''}
        ${p.shots && p.shots.length ? `<div class="gallery row-shots" style="--cols:${p.shots.length === 4 ? 4 : 3}">${p.shots.map(m => media({ kind: 'image', ...m })).join('')}</div>` : ''}
        <div class="row-text">${(p.paragraphs || []).map(t => `<p>${t}</p>`).join('')}</div>
        ${p.link ? `<div><a class="btn btn--sm" href="${esc(p.link)}" target="_blank" rel="noopener" data-cursor="${esc(C.play)}">${esc(T.projects.play)}</a></div>` : ''}
      </div></div></div>
    </li>`;
  }

  function render() {
    const P = T.projects;
    const total = JAMS.length;
    const featuredCount = JAMS.filter(j => j.featured).length;
    // Featured rows wear their game accents (lime → mint → blue); the rest share one ramp that
    // carries on round the wheel, stretched to however many rows there are
    const shades = ramp(total - featuredCount);
    return `<div class="page page--projects">
      <header class="page-head">
        <h1 class="page-title">${splitTitle(P.title)}</h1>
        <p class="page-lede" data-reveal>${esc(SITE.projectsIntro)}</p>
      </header>

      <section class="group" data-group="jam">
        <h2 class="group-title" data-reveal>${esc(P.jamsHeading)} <span class="mono">${esc(fmt(P.entries, { n: JAMS.length }))}</span></h2>
        <ol class="rows">${JAMS.map((j, n) => j.featured ? featuredRow(j, n) : projectRow(j, n, shades[n - featuredCount])).join('')}</ol>
      </section>

      ${footer()}
    </div>`;
  }

  App.pages.projects = render;
})();
