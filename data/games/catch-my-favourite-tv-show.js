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
  // Two Play buttons: the small one in the header, and the big one at the end.
  blocks: [
    { type: 'text', html: `<p>I couldn't find a way to talk about this game without spoiling anything. I don't wanna spoil it, and it only takes about 5 minutes to finish the game. So, I'll just beg you to play it xdd</p>` },
    { type: 'media', kind: 'image', src: 'assets/screenshots/cmfts.png', ratio: '16 / 10', label: 'Screenshot' },
    { type: 'play', label: 'Play on itch.io' },
  ],
}
);
