(window.GAMES = window.GAMES || []).push(
{
  slug: 'catch-my-favourite-tv-show',
  title: 'Catch My Favourite TV Show',
  pitch: 'A white-collar guy returns home to watch TV.',
  tags: ['Solo', '1-week jam', 'Narrative', 'Game Design, Programming, Art, Writing'],
  accent: '#d2b8fa',
  lane: '#1a1433',
  texture: { src: 'assets/textures/catch-my-favourite-tv-show.svg', size: [44, 38] },   // pattern on the Home card's colored panel
  jam: 'The Very Serious Juniper Dev Game Jam',
  play: 'https://osbert.itch.io/catch-my-favorite-tv-show',
  sticker: 'finished game',
  cover: { kind: 'image', src: 'assets/covers/catch-my-fav-tv-show.png', label: 'title card' },
  // No hero and no sections on purpose: this page skips the usual case study so it doesn't spoil the game.
  // The `play` block at the end replaces the header's Play button.
  blocks: [
    { type: 'struck', items: ['Design goal', 'Process', 'Result'] },
    { type: 'text', size: 'lg', html: `<p>I tried to write this page like the other ones, but I couldn't find a way to talk about this game without spoiling it.</p>` },
    { type: 'text', html: `
      <p>It's not a crazy concept or a super unique mechanic. It's just a guy going home after work to watch TV. But it's the game where I feel like I found my own voice in writing and art.</p>
      <p>So please just go play it. It takes about 5 minutes.</p>` },
    { type: 'media', kind: 'image', src: 'assets/screenshots/cmfts.png', ratio: '16 / 10', label: 'Screenshot', caption: "One screenshot. That's all you get." },
    { type: 'play', label: 'Go play it', note: 'About 5 minutes · on itch.io' },
  ],
}
);
