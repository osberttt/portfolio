(window.GAMES = window.GAMES || []).push(
{
  slug: 'amy-died-of-700-tacos',
  title: 'Amy Died of 700 Tacos',
  pitch: "Change numbers to save your daughter.",
  tags: ['Solo', '3-day jam', 'Text-based narrative', 'Design, Programming, Writing'],
  accent: '#dcf5a6',
  lane: '#172111',
  texture: { src: 'assets/textures/amy-died-of-700-tacos.svg', size: 56 },   // pattern on the Home card's colored panel
  jam: 'GMTK Game Jam 2024',
  play: 'https://osbert.itch.io/amy-died-of-700-tacos-jam',
  sticker: 'working on steam release now',
  cover: { kind: 'image', src: 'assets/covers/amy-died-of-700-tacos.svg', label: 'title card' },  hero: { kind: 'video', src: 'assets/videos/amy.mp4', label: 'Gameplay footage' },
  blocks: [
    { type: 'section', title: 'Design goal' },
    { type: 'text', html: `
      <p>In most branching dialogues, players are given a set of options to choose from. In my game, I wanted players to feel like they're given an infinite number of options at every branching point.</p>
      <p>My approach is to let them change the numbers in the meta layer of the story. For example, you go back in time to save your daughter. You can go back to any day in October.</p>` },
    { type: 'widget', name: 'tacos' },

    { type: 'section', title: 'Scalability' },
    { type: 'text', html: `
      <p>One problem with infinite options is that someone has to write infinite branches. My approach to solving this is to only have a few branches at each branching point, and connect the numbers to them.</p>
      <p>In the sketch above, October 0 has a branch, October 1 to 9 share a branch, October 10 has a branch, October 11 to 31 share a branch, and October 32 to infinity share a branch. So I only needed 5 to cover all of infinity, sort of.</p>
      <p>It's a kind of illusion of choice. But one difference is that players don't know which numbers go to which branch, or how many branches there are. So they have to try lots of numbers, or a few they have a feeling about. They have to connect the dots and solve it, which ultimately makes it feel like a puzzle game.</p>` },

    { type: 'section', title: 'Process' },
    { type: 'text', html: `
      <p>Although it was a 3-day jam, I made the jam version in 1 day as I was busy at the time. I did the game design, programming and writing myself, used a free font, and had no art assets or sounds.</p>` },
    { type: 'gallery', cols: 3, items: [
      { kind: 'image', src: 'assets/screenshots/amy-died-of-700-tacos/01.png', label: 'Jam version' },
      { kind: 'image', src: 'assets/screenshots/amy-died-of-700-tacos/02.png', label: 'Jam version' },
      { kind: 'image', src: 'assets/screenshots/amy-died-of-700-tacos/03.png', label: 'Jam version' },
    ] },

    { type: 'section', title: 'Result' },
    { type: 'text', html: `
      <p>It placed #1,348 out of 7,430 entries in creativity, which is about the top 18%. The other criteria didn't place as high.</p>` },

    { type: 'section', title: 'Feedback' },
    { type: 'text', html: `
      <p>I got 28 ratings and 11 comments in the jam. People said it was "funny", "creative" and "esoteric", but most of them didn't like having to restart all the way from the beginning when they chose a bad ending. I went with that because I didn't have much content in the jam build, and I wanted to limit the number of branches players would try. I didn't think they'd be curious enough to try this many numbers.</p>
      <p>After the jam, I added more content and made a build that lets players go back to the previous point before they reach an ending. When I watched my brother play it, I found out he was trying every single number! That's when I realized how curious people really are, and that I need a lot more content.</p>` },

    { type: 'section', title: 'Steam release' },
    { type: 'text', html: `
      <p>I'm a solo developer so far (feel free to reach out to collaborate!), and I've been pursuing a bachelor's degree. So I didn't really have the budget or time to commit to a full game release, and it's been on my backlog for a long time.</p>
      <p>But it's a cool project and I think it has potential, especially since it's my girlfriend's favorite of all the games I've made so far. So I've been working on it in my free time, and it's progressing really well. Now that I have no more classes left for my degree (I only need to do a 4-month internship, starting this December, to graduate), I have a lot more free time and I'm hoping to finish the game next year.</p>
      <p>Below is a screenshot from the build I have so far. I'm working on the art side of the project for now, so this isn't final.</p>` },
    { type: 'media', kind: 'image', src: 'assets/screenshots/amy wip.png', ratio: '16 / 10', label: 'Work in progress: the full version' },
  ],
}
);
