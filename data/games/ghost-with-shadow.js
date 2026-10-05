(window.GAMES = window.GAMES || []).push(
{
  slug: 'ghost-with-shadow',
  title: 'Ghost with Shadow',
  pitch: "A ghost who can't pass through walls, and a shadow that mimics him.",
  tags: ['Solo', '1-week jam', 'Precision puzzle platformer', 'Game Design, Programming, Art', 'Mechanic design', 'Level Design'],
  accent: '#a9e9bd',
  lane: '#0c2119',
  texture: { src: 'assets/textures/ghost-with-shadow.svg', size: 32 },   // pattern on the Home card's colored panel
  jam: 'Game Makers Game Jam 2025',
  play: 'https://osbert.itch.io/ghost-with-shadow',
  sticker: 'top 10 selection',
  cover: { kind: 'image', src: 'assets/covers/ghost-with-shadow.png', label: 'gameplay gif' },
  hero: { kind: 'video', src: 'assets/videos/ghost1.mp4', label: 'Gameplay footage: bind, unbind, swap' },
  blocks: [
    { type: 'section', title: 'Design goal' },
    { type: 'text', html: `
      <p>The jam's theme was <strong>Shadow Play</strong>, and I wanted to make a precision platformer where you use your shadow to get through levels. I wanted players to take some time to think about how to pass a level, then take some more time to actually pull it off. It'd be a mix of puzzles and precise movement, like in <a href="https://store.steampowered.com/app/504230/Celeste/" target="_blank" rel="noopener" data-cursor="Visit">Celeste</a>.</p>
      <p>When I was coming up with the mechanics, <a href="https://twice-twice.itch.io/mobias-trip" target="_blank" rel="noopener" data-cursor="Visit">Mobia's Trip</a> was also a big inspiration.</p>` },

    { type: 'section', title: 'Mechanic design' },
    { type: 'text', html: `<p>The game uses 3 buttons: jump, bind/unbind, and swap.</p>` },
    { type: 'keys', items: [
      { key: 'Jump', html: 'A simple jump, like in most platformers.' },
      { key: 'Bind / Unbind', html: 'Makes the shadow mimic you, or stop mimicking you.' },
      { key: 'Swap', html: 'Swaps your position with the shadow.' },
    ] },
    { type: 'text', html: `<p>To get through a wall, you unbind, step back so your shadow is in front of you, bind again, and walk forward. Your shadow ends up on the other side of the wall, and then you swap places with it. Floors work the same way, with a jump.</p>` },

    { type: 'section', title: 'Platformer physics' },
    { type: 'text', html: `
      <p>Every time I work on a platformer, I like to spend a while on the programming side to get smooth and satisfying movement, with things like jump buffering, coyote time and a fall multiplier. But this time, the ghost was jumping and falling too fast to pull off the moves the levels needed.</p>
      <p>So I changed the gravity scale from 3 (my usual setting) to 2, and the fall multiplier from 1.5 to 1, essentially turning it off. The ghost feels a little floaty, but it still moves nicely and has enough time to pull off the moves.</p>` },

    { type: 'section', title: 'Level design' },
    { type: 'text', html: `
      <p>My approach to level design is to explore what the mechanic can do. In this case, it comes with a set of combos to go through a wall, through a floor, or travel diagonally. Each combo needs a certain amount of space and time to pull off, so I tried to come up with ways to challenge that space.</p>
      <p>But after a couple of levels around these, I ran out of ideas for puzzles. The main problem was that as long as the ghost can jump or move back and forth, even a little, it can reach any place regardless of the obstacles along the way. So I either had to twist the mechanic, or do something to limit its jumping and movement.</p>
      <p>I was close to the jam deadline by then, so I decided against changing the mechanic. To limit the movement, I added curses. When you touch one, you can't use certain buttons until you find another curse of the same type. That helped me make a couple more levels, and I ended up with 8 levels in the jam.</p>` },

    { type: 'section', title: 'Result' },
    { type: 'text', html: `
      <p>It was a small local game jam with around 30 entries, and Ghost with Shadow made the top 10 selection.</p>
      <p>One judge said it was his personal favourite. The jam organizer, who made the top 10 video, said it was "very fun", that the "level design and mechanic design work together well", and that there were "different ways to solve the levels each time".</p>
      <p>It also scored #1 in the gameplay criteria on the itch.io page, though that didn't count toward the award.</p>` },

    { type: 'section', title: "What's next" },
    { type: 'text', html: `
      <p>It's a nice game jam project, but I don't think I can really make a Steam game out of it. The mechanic was fun for a jam, but I don't think it's very expandable. So I took it as an experiment, like most of the jam projects I've done.</p>` },
  ],
}
);
