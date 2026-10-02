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

  App.tpl = { splitTitle, chips, placeholder, mediaInner, media, footer };
})();
