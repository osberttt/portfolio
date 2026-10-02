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
  cover: { kind: 'image', src: 'assets/covers/amy-died-of-700-tacos.svg', label: 'title card' },
  hero: { kind: 'image', src: 'assets/screenshots/amy.png', label: 'Jam build screenshot', caption: 'The jam build. All text, and the number is the part you change.' },
  blocks: [
    { type: 'section', title: 'Design goal' },
    { type: 'text', html: `
      <p>I wanted players to feel like they have endless options. Most branching stories give you a choice of A, B or C, and you can see where the story ends as soon as you see the list.</p>
      <p>So instead of picking an option, you change a parameter. The story has a meta layer, and you can set any number in it to anything you want. The story then plays out with your numbers. If Amy eats 2 tacos, she's full. If she eats 700, she dies. You save her by finding the numbers that work.</p>` },
    { type: 'widget', name: 'tacos' },

    { type: 'section', title: 'Process' },
    { type: 'text', html: `
      <p>The catch with endless options is that someone has to write them. Every branch needs its own lines, and every branch after that needs more, so the writing grows exponentially. People usually call this a combinatorial explosion, and it's a lot for one person.</p>
      <p>So it's an illusion of choice. You can pick any number, which feels like infinite branches, but most numbers lead to the same few storylines. In the sketch above, every day from the 11th to the 31st ends the same way. That keeps the writing manageable.</p>
      <p>There's one difference from the usual illusion of choice, though. Players don't know which numbers make a difference. They have to try lots of them, or work out which ones might matter. So the story became a puzzle, and finding the number that changes things is the gameplay. Every number that does matter needed a funny or dark answer, because that's what makes you want to try the next one.</p>
      <p>I made the jam version on my own in about a day. That's not much time to write, so there weren't many storylines. If players tried every number, they'd run out of new content fast.</p>
      <p>So when Amy dies, you start again from the very beginning. Each run takes a while, so you only get a few tries, and the content I had was enough for those. It was also part of the joke, like falling all the way down in a climbing game. I only meant it to last a few minutes.</p>` },

    { type: 'section', title: 'Result' },
    { type: 'text', html: `
      <p>About 28 people rated it, and it placed #1,348 of 7,430 for creativity. Some said they liked the humor and how dark it got.</p>
      <p>The restart is where it fell apart. The players who wanted to try every number were the ones it hit hardest, and they said it was frustrating. They were right. The trick that hid how little content there was also punished the curiosity the whole game is built on.</p>` },

    { type: 'section', title: "What's next" },
    { type: 'text', html: `
      <p>I couldn't let it go. I've been making the full version for more than two years now, in the time left over from university, other projects and learning. It's going to Steam.</p>
      <p>The full game fixes the restart. Dying doesn't send you back to the beginning, and trying lots of numbers is much quicker. That means players will try a lot more numbers, so it needs a lot more content and storylines too.</p>
      <p>It's a set of storylines that are connected like cogs in a machine. Change a number in one, and it can change how another one ends. I'm keeping the rest quiet for now.</p>` },
    { type: 'media', kind: 'image', src: 'assets/screenshots/amy wip.png', ratio: '16 / 10', label: 'Work in progress: the full version', caption: "Work in progress. The art will change. I can't really draw, so that part is taking a while." },
  ],
}
);
