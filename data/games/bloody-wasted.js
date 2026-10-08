(window.GAMES = window.GAMES || []).push(
{
  slug: 'bloody-wasted',
  title: 'Bloody Wasted',
  pitch: 'A partyhead vampire runs home before sunrise.',
  tags: ['Team of 5', '2-week jam', '2D top-down', 'Team Lead, Game Design, Programming', 'Game feel'],
  accent: '#abc8ff',
  lane: '#0f1a34',
  texture: { src: 'assets/textures/bloody-wasted.svg', size: [44, 32] },   // pattern on the Home card's colored panel
  jam: '20 Second Game Jam 2025',
  play: 'https://osbert.itch.io/bloodywasted',
  playNote: 'Free browser game of about 5 minutes of playtime',
  sticker: 'team-up',
  cover: { kind: 'image', src: 'assets/covers/bloody-wasted.png', label: 'gameplay gif' },    // card image on Home
  hero: { kind: 'video', src: 'assets/videos/bloody wasted.mp4', label: 'Gameplay footage' },
  blocks: [
    { type: 'section', title: 'Design goal' },
    { type: 'text', html: `
      <p>The jam had one rule: every session lasts <strong>20 seconds</strong>.</p>
      <p>To use all 20 of them, I wanted a fast 2D runner with high decision density &mdash; a lot of small choices every second, and room to get good at making them.</p>` },

    { type: 'section', title: 'Mechanics' },
    { type: 'text', html: `
      <p>You're a vampire running home before the sun reaches you, so time and distance are the currencies. Blood is what you convert between them.</p>` },
    { type: 'keys', items: [
      { key: 'Run', cap: 'Arrows', html: '8 directions.' },
      { key: 'Dash', cap: 'Space', html: '8 directions. Costs blood, buys distance.' },
      { key: 'Eat', cap: 'R-Mouse', html: '8 directions. Refills blood, costs time. Hits everyone nearby.' },
    ] },
    { type: 'text', html: `
      <p>Blood also drains on its own, from the drinking. Dash and eat are on space and left mouse button because that's where <a href="https://store.steampowered.com/app/1145360/Hades/" target="_blank" rel="noopener" data-cursor="Visit">Hades</a> puts them.</p>
      <p>There are soda cans on the map too. You run over one and she drinks it without breaking stride &mdash; the animation is fast enough that it costs no time at all. Every can raises your speed and your dash power for the rest of the run.</p>` },
    { type: 'media', kind: 'image', src: 'assets/screenshots/bloody-wasted/01.gif', label: 'Dashing and eating' },

    { type: 'section', title: 'The loop' },
    { type: 'steps', items: [
      { title: 'Dash', html: 'Keep dashing while the blood lasts.' },
      { title: 'Land near people', html: 'Pick a path with space to dash through and a group at the end of it.' },
      { title: 'Eat', html: 'Refill, then dash again.' },
    ] },
    { type: 'text', html: `
      <p>It doesn't always come out clean. Some paths have the space but leave you standing alone, so you walk for a while. Dash until the blood is nearly gone and land near nobody and you lose.</p>` },

    { type: 'section', title: 'Discrete and continuous' },
    { type: 'text', html: `
      <p>Runners like <strong>Subway Surfers</strong> and <strong>Crossy Road</strong> are discrete twice over: you move in steps, and you fail in steps. One or two mistakes and the run is done.</p>
      <p>Bloody Wasted is continuous in both. You run and dash freely in 8 directions, and nothing kills you on its own &mdash; a mistake costs a few milliseconds. Make enough of them and the sun catches up.</p>` },

    { type: 'section', title: 'Soda and progression' },
    { type: 'text', html: `
      <p>Soda is the one thing in the run that compounds. Blood is spent and refilled over and over, but a can you drink in the first few seconds is still making you faster at the end &mdash; so the longer you survive, the faster you are, provided you kept collecting.</p>
      <p>Drinking one is free. Eating is the only action that stops you, and I deliberately didn't give soda the same cost: she drinks it mid-run, so picking one up never breaks the pace. The only thing a can costs is the detour to reach it.</p>
      <p>The cost arrives later, in handling. Speed is the stat you'd ask for and also the one that makes the vampire harder to steer &mdash; by the late run she's quick enough to slide off a line you meant to take and wedge between bushes, which is dead time with the sun coming up. Buying speed early is buying a twitchier character for the rest of the run, and the reward for playing well is a game that's harder to play.</p>
      <p>I didn't have to script any of that. Because the map generator spreads objects evenly across intervals, cans keep arriving at a steady rate, so a player who takes every detour gets steadily stronger while the sun closes in at its own fixed pace. The difficulty curve falls out of the uniform generation and the timer running against each other &mdash; no scaling, no difficulty tiers.</p>` },

    { type: 'section', title: 'Pacing' },
    { type: 'text', html: `
      <p>Eating is the only action that stops you, so I asked our artist to keep the animation short and snappy.</p>
      <p>I also programmed the map generation, which places obstacles randomly but spreads them evenly across intervals. Every run is different and there's always something to work with &mdash; space to dash, bushes to avoid, people to eat.</p>` },

    { type: 'section', title: 'Feedback' },
    { type: 'text', html: `
      <p>In Subway Surfers a small mistake puts a cop behind you. We couldn't warn the player in one moment like that, so the warning builds the same way the failure does: as time runs out the sun rises, the world gets brighter, and shadows appear and shorten.</p>
      <p>I programmed the dash feedback too &mdash; a ghost trail, a bit of chromatic aberration and lens distortion.</p>` },
    { type: 'media', kind: 'image', src: 'assets/screenshots/bloody-wasted/02.gif', label: 'The sun catching up' },

    { type: 'section', title: 'Result' },
    { type: 'text', html: `<p>It came together well, and it's the most polished jam game I've worked on. A lot of that is thanks to the people below.</p>` },
    { type: 'media', kind: 'image', src: 'assets/screenshots/bloody-wasted/03.gif', label: 'Gameplay gif' },

    { type: 'section', title: 'Team' },
    { type: 'credits', items: [
      { role: 'Team lead, game design, programming', name: 'Osbert', color: '#d5bfff' },
      { role: 'Programming', name: 'Josep Romera', url: 'https://www.josepromera.com', color: '#b5d3f8' },
      { role: 'Art', name: 'Blossom', url: 'https://paperclovers.carrd.co/', color: '#ddcbee' },
      { role: 'Music', name: 'JuanMaP', url: 'https://www.youtube.com/@juanmanuelparraramirez', color: '#bba9ee' },
      { role: 'Sound design', name: 'Dangalletti', color: '#f5cfa4' },
    ] },
  ],
}
);
