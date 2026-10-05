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
  sticker: 'team-up',
  cover: { kind: 'image', src: 'assets/covers/bloody-wasted.png', label: 'gameplay gif' },    // card image on Home
  hero: { kind: 'video', src: 'assets/videos/bloody wasted.mp4', label: 'Gameplay footage' },
  blocks: [
    { type: 'section', title: 'Design goal' },
    { type: 'text', html: `
      <p>The jam had one rule: every session lasts <strong>20 seconds</strong>.</p>
      <p>I wanted a fast game where you make a lot of decisions every second. At that speed they have to be quick, small choices. Nothing very strategic or risky, just lots of little ones, one after another.</p>` },

    { type: 'section', title: 'Process' },
    { type: 'text', html: `
      <p>You're a vampire running home before sunrise after a night of drinking. Your blood drains all the time, and dashing uses more of it. The only way to get it back is to eat people, but that stops you in place and costs time. Dancers and bushes slow you down too.</p>
      <p>So every second you're choosing: eat now, dash through the gap, or go for a group of people, since eating hits everyone nearby.</p>
      <p>I looked at <strong>Hotline Miami</strong> and <strong>Mr. Shifty</strong> for the camera and pacing, and at <strong>Subway Surfers</strong> and <strong>Crossy Road</strong> for running down a road full of obstacles. In those runners, one or two mistakes and you're out. In ours, nothing kills you on its own. Every slip just slows you down, and they add up.</p>
      <p>That made warning the player tricky. Subway Surfers can warn you in one moment, when the policeman shows up behind you. We didn't have a moment like that, so the warning had to build up slowly too. As time runs out, the sun rises. Everything gets brighter, and the shadows of people and houses get shorter.</p>` },
    { type: 'text', html: `
      <p>With this many decisions, the pacing matters a lot, so I tried to keep anything that stops the player as short as possible. Eating is the only action that stops you, so I asked our artist to keep the eating animation short and snappy.</p>
      <p>I also programmed the dash effects: a ghost trail, a bit of lens distortion, and some chromatic aberration.</p>` },
    { type: 'media', kind: 'video', src: 'assets/videos/bloody wasted dine and dash.mp4', label: 'Clip: eating, then dashing' },

    { type: 'section', title: 'Result' },
    { type: 'text', html: `<p>It came together well, and it's the most polished jam game I've worked on. A lot of that is thanks to the people below.</p>` },

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
