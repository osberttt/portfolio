/* About: bio, toolbox, what I'm looking for, contact rows. */
(() => {
  'use strict';
  const { esc } = App.util;
  const { splitTitle, chips, footer, icon } = App.tpl;
  const { SITE, UI: T } = window;
  const C = T.cursor;
  // Same ramp as the Projects rows (js/pages/projects.js)
  const ROW_COLORS = ['#e6c4f5', '#f5c2e7', '#f7bfd0', '#f8bfb5', '#f7cba6', '#f6d9a0', '#f3e598', '#e6f099'];

  function render() {
    const a = SITE.about;
    const A = T.about;
    const rows = [
      // Opens a Gmail compose window addressed to me (the address is a Gmail one)
      SITE.email && { label: A.email, value: SITE.email, icon: 'gmail', url: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}` },
      // Discord profile links need the numeric user ID (discord.com/users/<id>), not the handle
      SITE.discord && SITE.discordId && { label: 'Discord', value: SITE.discord, icon: 'discord', url: `https://discord.com/users/${SITE.discordId}` },
      ...SITE.links,
    ].filter(Boolean);
    // A vertical list: mark, label, then the handle under it. Each row fills with its own colour on hover.
    const contacts = rows.map((l, i) => {
      const c = ROW_COLORS[i % ROW_COLORS.length];
      return `<li style="--c:${c}"><a class="contact-row wipe" href="${esc(l.url)}" target="_blank" rel="noopener" data-cursor="${esc(C.visit)}" data-color="${c}">
        <i class="contact-i" aria-hidden="true">${icon(l.icon || l.label)}</i>
        <span class="contact-k">
          <strong>${esc(l.label)}</strong>
          ${l.value ? `<span class="contact-val mono">${esc(l.value)}</span>` : ''}
        </span>
        <span class="arr" aria-hidden="true">→</span>
      </a></li>`;
    }).join('');

    // Two columns: the heading (and contacts under it) on the left, the writing on the right.
    // The heading alone left a lot of empty space beside it.
    return `<div class="page page--about">
      <div class="about-top">
        <div class="about-left">
          <header class="page-head">
            <p class="eyebrow">${esc(A.eyebrow)}</p>
            <h1 class="page-title page-title--sm"><span class="about-head">${splitTitle(a.headingBefore)}</span><span
              class="persona-hit about-name" data-persona="${esc(a.nameFull)}" data-persona-cycle data-persona-fit><span class="persona">${esc(a.name)}</span></span></h1>
          </header>
          <section class="contact" aria-label="${esc(A.contactLabel)}">
            <ul class="contact-list" data-reveal>${contacts}</ul>
          </section>
        </div>

        <div class="about-text">
          <h3 class="mini-h" data-reveal>${esc(A.bio)}</h3>
          <div class="blk-text" data-reveal>${a.bio.map(p => `<p>${p}</p>`).join('')}</div>
          <h3 class="mini-h" data-reveal>${esc(A.lookingFor)}</h3>
          <div class="blk-text" data-reveal><p>${a.lookingFor}</p></div>
          <h3 class="mini-h" data-reveal>${esc(A.toolbox)}</h3>
          <div data-reveal>${chips(a.tools)}</div>
        </div>
      </div>

      ${footer()}
    </div>`;
  }

  App.pages.about = render;
})();
