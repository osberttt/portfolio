(window.GAMES = window.GAMES || []).push(
{
  slug: 'catch-my-favourite-tv-show',
  title: 'Catch My Favourite TV Show',
  pitch: 'A white-collar guy returns home to watch TV.',
  tags: ['Solo', '1-week jam', 'Narrative', 'Game Design, Programming, Writing, Art'],
  accent: '#d2b8fa',
  lane: '#1a1433',
  texture: { src: 'assets/textures/catch-my-favourite-tv-show.svg', size: [44, 38] },   // pattern on the Home card's colored panel
  jam: 'The Very Serious Juniper Dev Game Jam',
  play: 'https://osbert.itch.io/catch-my-favorite-tv-show',
  playNote: 'It only takes about 5 minutes.',
  sticker: 'finished game',
  cover: { kind: 'image', src: 'assets/covers/catch-my-fav-tv-show.png', label: 'title card' },
  // No hero video.
  blocks: [
    { type: 'section', title: 'Design goal' },
    { type: 'text', html: `
      <p>I wanted to make a finished game with a complete story for this jam.</p>
      <p>The jam's theme was <strong>Spin to Win</strong>, so I wrote a funny little story where you spin to win.</p>` },

    { type: 'section', title: 'Process' },
    { type: 'text', html: `
      <p>I did the game design, writing and art myself. For the programming, I did the system design with ScriptableObjects and used Claude Code to write the implementation. Here's the <a href="https://github.com/osberttt/catch-my-favourite-tv-show" target="_blank" rel="noopener" data-cursor="Visit">GitHub repo</a> if you're interested.</p>` },
    { type: 'gallery', cols: 2, items: [
      { kind: 'image', src: 'assets/screenshots/cmfts.png', ratio: '16 / 10', label: 'Screenshot' },
      { kind: 'image', src: 'assets/screenshots/catch-my-favourite-tv-show/02.jpg', ratio: '16 / 10', label: 'Screenshot' },
      { kind: 'image', src: 'assets/screenshots/catch-my-favourite-tv-show/03.jpg', ratio: '16 / 10', label: 'Screenshot' },
      { kind: 'image', src: 'assets/screenshots/catch-my-favourite-tv-show/04.jpg', ratio: '16 / 10', label: 'Screenshot' },
    ] },

    { type: 'section', title: 'Result' },
    { type: 'text', html: `
      <p>It placed #1,856 out of 3,498 entries overall. It didn't place very high, but people said it was "clever", "silly" and had "good pacing", and that it "doesn't outstay its welcome in terms of jokes".</p>` },  ],
}
);
