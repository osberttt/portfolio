/* About: bio, toolbox, what I'm looking for, contact rows. */
(() => {
  'use strict';
  const { esc } = App.util;
  const { splitTitle, chips, footer } = App.tpl;
  const { SITE, UI: T } = window;
  const C = T.cursor;
  // Same ramp as the Projects rows (js/pages/projects.js)
  const ROW_COLORS = ['#e6c4f5', '#f5c2e7', '#f7bfd0', '#f8bfb5', '#f7cba6', '#f6d9a0', '#f3e598', '#e6f099'];

  function render() {
    const a = SITE.about;
    const A = T.about;
    const rows = [
      // Opens a Gmail compose window addressed to me (the address is a Gmail one)
      SITE.email && { label: A.email, value: SITE.email, url: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}` },
      // Discord profile links need the numeric user ID (discord.com/users/<id>), not the handle
      SITE.discord && SITE.discordId && { label: 'Discord', value: SITE.discord, url: `https://discord.com/users/${SITE.discordId}` },
      ...SITE.links,
    ].filter(Boolean);
    // Same ramp as the Projects rows: each row fills (and tints the cursor) with its own colour on hover
    const contacts = rows.map((l, i) => {
      const c = ROW_COLORS[i % ROW_COLORS.length];
      return `<li style="--c:${c}"><a class="contact-row wipe" href="${esc(l.url)}" target="_blank" rel="noopener" data-cursor="${esc(C.visit)}" data-color="${c}">
        <strong>${esc(l.label)}</strong><span class="contact-val"><span class="mono">${esc(l.value || '')}</span><span class="arr">→</span></span>
      </a></li>`;
    }).join('');

    return `<div class="page page--about">
      <header class="page-head">
        <p class="eyebrow">${esc(A.eyebrow)}</p>
        <h1 class="page-title page-title--sm">${splitTitle(a.heading)}</h1>
      </header>

      <div class="about-text">
        <div class="blk-text" data-reveal>${a.bio.map(p => `<p>${p}</p>`).join('')}</div>
        <h3 class="mini-h" data-reveal>${esc(A.toolbox)}</h3>
        <div data-reveal>${chips(a.tools)}</div>
        <h3 class="mini-h" data-reveal>${esc(A.lookingFor)}</h3>
        <div class="blk-text" data-reveal><p>${a.lookingFor}</p></div>
      </div>

      <section class="contact" aria-label="${esc(A.contactLabel)}">
        <ul class="contact-list" data-reveal>${contacts}</ul>
      </section>

      ${footer()}
    </div>`;
  }

  App.pages.about = render;
})();
