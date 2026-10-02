(window.GAMES = window.GAMES || []).push(
{
  slug: 'ghost-with-shadow',
  title: 'Ghost with Shadow',
  pitch: "A ghost who can't pass through walls, and a shadow that mimics him.",
  tags: ['Solo', '1-week jam', 'Precision puzzle platformer', 'Game Design, Programming, Art', 'Mechanic', 'Level Design'],
  accent: '#a9e9bd',
  lane: '#0c2119',
  texture: { src: 'assets/textures/ghost-with-shadow.svg', size: 32 },   // pattern on the Home card's colored panel
  jam: 'Game Makers Game Jam 2025',
  play: 'https://osbert.itch.io/ghost-with-shadow',
  sticker: "top 5 Judges' Choice",
  cover: { kind: 'image', src: 'assets/covers/ghost-with-shadow.png', label: 'gameplay gif' },
  hero: { kind: 'video', src: 'assets/videos/ghost1.mp4', label: 'Gameplay footage: bind, unbind, swap' },
  blocks: [
    { type: 'section', title: 'Design goal' },
    { type: 'text', html: `
      <p>The jam's theme was <strong>Shadow Play</strong>. I wanted to make a precision platformer where your shadow is the thing you use to get through the level, rather than an enemy or just decoration.</p>
      <p>I had <strong>Celeste</strong> in mind for how the platforming should feel. <strong>Mobia's Trip</strong>, a game from an earlier GMTK jam, was a big inspiration too.</p>` },

    { type: 'section', title: 'Process' },
    { type: 'text', html: `<p>The game uses three buttons: jump, bind/unbind, and swap.</p>` },
    { type: 'keys', items: [
      { key: 'Unbind', html: 'The shadow stays where it is while you move.' },
      { key: 'Bind', html: 'The shadow copies your movement again.' },
      { key: 'Swap', html: 'You trade places with it.' },
    ] },
    { type: 'text', html: `<p>To get through a wall, you unbind, step back so your shadow is in front of you, bind again, and walk forward. Your shadow ends up on the other side of the wall, and then you swap places with it. Floors work the same way, with a jump.</p>` },
    { type: 'text', html: `
      <p>In the first prototype I used the usual platformer setup, with extra gravity and a fall multiplier in the air so jumps feel snappy. But the ghost fell too fast to pull off the moves the puzzles needed. I lowered the air gravity from 3 to 2 and the fall multiplier from 1.5 to 1. It ended up floatier than Celeste, but it gives you enough time.</p>
      <p>Once you get used to the mechanic, you can reach almost anywhere, and the levels stop being puzzles. So I added curses. Each one takes away an ability, like moving backward, moving forward, or jumping. That gave each level clear limits again, and it gave me a lot more puzzle ideas than I had before.</p>` },

    { type: 'section', title: 'Result' },
    { type: 'text', html: `<p>I made 10 levels in the 7 days of the jam, on my own. It ended up in the judges' top 5, which was a really nice surprise.</p>` },
  ],
}
);
