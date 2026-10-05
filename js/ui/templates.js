/* Small HTML builders shared by every page: title splitter, chips, media, footer. */
(() => {
  'use strict';
  const { esc } = App.util;
  const { YEAR } = App.env;
  const { SITE, UI: T } = window;
  const C = T.cursor;

  // Split text into words of rising letters
  function splitTitle(text) {
    let k = 0;
    return text.split(' ').map(w =>
      `<span class="word">${[...w].map(ch => `<span class="ch" style="--i:${k++}">${esc(ch)}</span>`).join('')}</span>`
    ).join(' ');
  }

  const chips = tags => `<ul class="chips">${tags.filter(Boolean).map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;

  /* Contact marks. Single-path glyphs on a 24-grid, drawn in currentColor so they take the row's text colour.
     Simplified silhouettes, not the brands' official logo files. */
  const ICONS = {
    gmail: '<path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5zM4 7.2v11h16v-11l-8 5.3z"/><path d="M4.6 5.8 12 10.7l7.4-4.9z"/>',
    discord: '<path d="M19.3 6.6A16 16 0 0 0 15.4 5.4l-.4.9a12 12 0 0 1 2 .9 12.7 12.7 0 0 0-10 0 12 12 0 0 1 2-.9l-.4-.9a16 16 0 0 0-3.9 1.2C1.9 11.2 1.3 15.4 1.7 19a16 16 0 0 0 4.8 2.4l.8-1.4a12 12 0 0 1-1.9-.9l.4-.3a11.4 11.4 0 0 0 9.8 0l.4.3a12 12 0 0 1-1.9.9l.8 1.4A16 16 0 0 0 20 19c.5-4.2-.5-8.3-2.5-12.4zM8.9 16.2c-.9 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9zm6.2 0c-.9 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9z"/>',
    github: '<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.300000000000001-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/>',
    linkedin: '<path d="M4.3 3a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6zM2.4 9.2h3.8V21H2.4zM9.1 9.2h3.6v1.6a4 4 0 0 1 3.6-1.8c2.7 0 4.4 1.7 4.4 5V21h-3.8v-6.3c0-1.6-.6-2.5-1.9-2.5-1.1 0-1.9.8-1.9 2.5V21H9.1z"/>',
    // itch.io: the flat-topped shape with a notched base, simplified
    'itch.io': '<path d="M3.4 4.3C2.5 5.2 1 7.7 1 8.6v1.5c0 1.8 1.7 3.4 3.3 3.4 1.9 0 3.4-1.6 3.4-3.4 0 1.8 1.4 3.4 3.3 3.4s3.3-1.6 3.3-3.4c0 1.8 1.6 3.4 3.4 3.4 1.6 0 3.3-1.6 3.3-3.4V8.6c0-.9-1.5-3.4-2.4-4.3zM3.3 14.8v3.9C3.3 19.5 4.6 21 6 21h12c1.4 0 2.7-1.5 2.7-2.3v-3.9a4.9 4.9 0 0 1-3.5 1.5 4.8 4.8 0 0 1-3.3-1.4A4.8 4.8 0 0 1 10.5 16a4.8 4.8 0 0 1-3.3-1.4 4.8 4.8 0 0 1-3.4 1.4 4.9 4.9 0 0 1-.5 0zm5.6 1.4h6.2c.6 0 1 .6 1 1.3s-.4 1.3-1 1.3H8.9c-.6 0-1-.6-1-1.3s.4-1.3 1-1.3z"/>',
  };
  const icon = name => {
    const d = ICONS[String(name).toLowerCase()] || ICONS[name];
    return d ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${d}</svg>` : '';
  };

  function placeholder(kind, label, ratio) {
    const icon = { video: '▶', youtube: '▶', diagram: '◇', image: '◩' }[kind] || '◩';
    return `<div class="ph" style="aspect-ratio:${ratio}">
      <i class="bk tl"></i><i class="bk tr"></i><i class="bk bl"></i><i class="bk br"></i>
      <span class="ph-icon">${icon}</span>
      <span class="ph-label">${esc(label)}</span>
    </div>`;
  }

  // The bare media element (no <figure>)
  function mediaInner(m = {}, fallback = '') {
    const kind = m.kind || 'image';
    const ratio = m.ratio || '16 / 9';
    const label = m.label || fallback || kind;
    if (!m.src) return placeholder(kind, label, ratio);
    const style = `style="aspect-ratio:${ratio}"`;
    switch (kind) {
      case 'video':
        // controls = click-to-play with sound behind a dimmed cover; otherwise a silent looping preview driven by the videos behavior
        if (!m.controls) return `<video src="${esc(m.src)}" ${m.poster ? `poster="${esc(m.poster)}"` : ''} muted loop playsinline preload="metadata" ${style}></video>`;
        return `<div class="vid" ${style}>
          <video src="${esc(m.src)}${m.poster ? '' : '#t=0.1'}" ${m.poster ? `poster="${esc(m.poster)}"` : ''} playsinline preload="metadata"></video>
          <button class="vid-cover" type="button" data-vid-play data-cursor="${esc(C.play)}" aria-label="${esc(C.play)}: ${esc(label)}">
            <i class="bk tl"></i><i class="bk tr"></i><i class="bk bl"></i><i class="bk br"></i>
            <span class="vid-tag"><i class="vid-dot"></i>${esc(label)}</span>
            <span class="vid-btn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span>
            <span class="vid-time"></span>
          </button>
        </div>`;
      case 'youtube':
        return `<iframe src="https://www.youtube-nocookie.com/embed/${esc(m.src)}" title="${esc(label)}" loading="lazy" allowfullscreen ${style}></iframe>`;
      default:
        return `<img src="${esc(m.src)}" alt="${esc(m.alt || label)}" loading="lazy" data-lightbox ${style}>`;
    }
  }

  function media(m = {}, fallback = '', extra = '') {
    const cls = ['media', extra, m.kind === 'diagram' ? 'media--contain' : ''].filter(Boolean).join(' ');
    return `<figure class="${cls}" data-reveal="clip">${mediaInner(m, fallback)}${m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : ''}</figure>`;
  }

  function footer() {
    return `<footer class="foot">
      <span>© ${YEAR} ${esc(SITE.name)}</span>
      <span>${esc(SITE.role)}</span>
      <button class="to-top" data-top data-cursor="${esc(C.up)}">${esc(T.footer.backToTop)}</button>
    </footer>`;
  }

  App.tpl = { splitTitle, chips, icon, placeholder, mediaInner, media, footer };
})();
