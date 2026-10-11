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
      <p>The jam came with a rule that every game had to last <strong>20 seconds</strong> or less.</p>
      <p>I wanted to make the most of those 20 seconds with a fast-paced game and a high density of micro-decisions.</p>` },

    { type: 'section', title: 'Concept' },
    { type: 'text', html: `
      <p>The first thing I tried to figure out was how to make a 20-second timer interesting.</p>
      <p>I imagined a vampire king, possibly Dracula, on a battlefield just as the sun was about to rise. He'd be using all his strength to run back to his castle, dashing through enemies and obstacles along the way. Occasionally, he could stop to drink blood from enemies or heal his followers, recovering strength or morale at the cost of precious time.</p>
      <p>He had only 20 seconds before sunrise. This was my pitch to the jam team.</p>
      <p><a href="https://paperclovers.carrd.co/" target="_blank" rel="noopener" data-cursor="Visit">Our artist</a> came up with an even better concept. Instead of a vampire king on a battlefield, we had a teenage vampire girl who partied so hard that she forgot to return home before sunrise. Now she's almost passed out from drinking, and she's rushing home through a festive street full of dancing people.</p>
      <p>I liked this direction a lot more. It kept the timer and resource management from my original idea but gave the game a much more playful premise.</p>` },

    { type: 'section', title: 'Movement' },
    { type: 'text', html: `
      <p>I wanted players to run really fast and be expressive while doing so. Some of my favorite examples of skill expression are in <a href="https://store.steampowered.com/app/1145360/Hades/" target="_blank" rel="noopener" data-cursor="Visit">Hades</a>, <a href="https://store.steampowered.com/app/504230/Celeste/" target="_blank" rel="noopener" data-cursor="Visit">Celeste</a>, and <a href="https://store.steampowered.com/app/1229490/ULTRAKILL/" target="_blank" rel="noopener" data-cursor="Visit">ULTRAKILL</a>, so it's no surprise that dash was the first core verb I reached for.</p>
      <p>I also went with 8-directional movement to give players more freedom, unlike games such as <a href="https://subwaysurfers.com/" target="_blank" rel="noopener" data-cursor="Visit">Subway Surfers</a> and <a href="https://www.crossyroad.com/" target="_blank" rel="noopener" data-cursor="Visit">Crossy Road</a>, where movement is more constrained by lanes or paths.</p>
      <p>For the perspective, we chose a <a href="https://store.steampowered.com/app/219150/Hotline_Miami/" target="_blank" rel="noopener" data-cursor="Visit">Hotline Miami</a>-style 2D top-down view. It worked well with the fast movement and helped us keep the art workload manageable.</p>
      <p>I programmed the dash myself, and found that allowing directional inputs during a dash lets players curve their trajectories. This worked better for navigating our map than locking dashes to a straight line.</p>` },
    { type: 'media', kind: 'image', src: 'assets/screenshots/bloody-wasted/01.gif', label: 'Curved dashing' },

    { type: 'section', title: 'Resources' },
    { type: 'text', html: `
      <p>I wanted players to make lots of quick, imperfect decisions. Their choices should have some impact on the run, but they shouldn't be too punishing. My approach was to build a small resource management system with three resources.</p>` },
    { type: 'stats', items: [
      { value: '20', label: 'Seconds of Time to get home' },
      { value: '400', label: 'Metres of Distance to cover' },
      { value: '30', label: 'Units of HP, her strength' },
    ] },
    { type: 'text', html: `<p>And two core verbs:</p>` },
    { type: 'keys', items: [
      { key: 'Run', cap: 'Arrows', html: '8 directions.' },
      { key: 'Dash', cap: 'Space', html: 'Costs HP, covers distance quickly.' },
      { key: 'Drink blood', cap: 'L-Mouse', html: 'Restores HP, costs time. Hits everyone nearby.' },
    ] },
    { type: 'text', html: `
      <p>Since she's almost passed out from drinking, her HP gradually drains throughout the run. This means players have to drink blood occasionally. There's no pacifist route.</p>
      <p>The interesting part is how these resources interact. Dashing trades HP for distance, while drinking blood trades time for HP. Players have to keep both in mind while trying to get home before sunrise.</p>` },

    { type: 'section', title: 'Decisions' },
    { type: 'text', html: `
      <p>At any given moment, players have to think about what to do next.</p>
      <p><strong>Should I dash?</strong> That depends on how much HP I have left and how open the road ahead is. If my HP is too low, I might not have enough strength to reach someone and drink their blood to recover. If there are obstacles ahead, I might dash straight into them and waste the HP.</p>
      <p><strong>Should I drink blood?</strong> If my HP is low, probably. But if I still have enough, it might be better to dash first, hopefully ending up near someone so I can recover HP and dash again. Drinking blood also works in an area around the player, so the number of people nearby matters.</p>
      <p>The ideal play would be to keep dashing until HP gets really low, then end up near a person or two, refill HP, and dash again.</p>
      <p>Of course, things don't always go as planned. She might not end a dash near anyone, or there might not be enough open space to dash safely. Finding the right spaces and positioning yourself near people are also important parts of the game.</p>` },

    { type: 'section', title: 'Progression' },
    { type: 'text', html: `
      <p>Although a run lasts only 20 seconds, we wanted to give players some sense of progression.</p>
      <p><a href="https://www.josepromera.com/" target="_blank" rel="noopener" data-cursor="Visit">Our programmer</a> came up with collectibles that increase movement speed and dash distance. I liked the idea because the upgrades came with a trade-off: moving faster and dashing farther helps cover more distance, but it also makes steering harder and increases the chance of bumping into obstacles.</p>
      <p>Since they're collectibles, players have to earn the upgrades and can choose how much they want to pursue them. The prototype worked well, so we went with it.</p>
      <p>I initially wanted to increase the number of obstacles in each segment as the player got closer to home, making the later parts of the route harder. But once we introduced the collectibles, adding more obstacles risked making things too difficult. Faster movement was already harder to control, so I decided to keep obstacle density uniform throughout the route.</p>
      <p>To do this, I wrote a spawner that divides the map into segments and distributes a consistent number of objects within each one, with their positions randomized. For example, each 50-metre segment could have the same number of a particular type of obstacle, but in different places.</p>` },

    { type: 'section', title: 'Pacing' },
    { type: 'text', html: `
      <p>Pacing was something I thought about from the beginning.</p>
      <p>Since it's a fast-paced game, I wanted our vampire to feel almost inhumanly fast. She drinks blood from people and opens and drinks soda cans without even stopping.</p>
      <p>I discussed this with <a href="https://paperclovers.carrd.co/" target="_blank" rel="noopener" data-cursor="Visit">our artist</a>, and we worked on very short animations with just a few frames that play for less than a second. We ended up with two animations that I really liked.</p>
      <p>I also tuned the object spawner to make sure obstacles wouldn't overwhelm players, while keeping downtime to a minimum throughout the run.</p>` },

    { type: 'section', title: 'Feedback' },
    { type: 'text', html: `
      <p>In games like <a href="https://subwaysurfers.com/" target="_blank" rel="noopener" data-cursor="Visit">Subway Surfers</a> and <a href="https://www.crossyroad.com/" target="_blank" rel="noopener" data-cursor="Visit">Crossy Road</a>, players can lose after making a mistake or two. Since mistakes happen in discrete steps, these games can give players warnings, like the cop showing up behind them after a small mistake.</p>
      <p>In our game, mistakes accumulate more gradually. Bumping into an obstacle doesn't immediately end the run, but it can make getting home before sunrise harder. I wanted players to have some warning that they were approaching failure.</p>
      <p><a href="https://www.josepromera.com/" target="_blank" rel="noopener" data-cursor="Visit">Our programmer</a> came up with a solution I really liked: an in-game 2D light that gradually grows towards the vampire girl's home. As the sun gets closer, the world gets brighter. When the light reaches her, she dies.</p>
      <p>I also worked on a simple shadow system using SpriteRenderer and made a dissolve effect for the vampire's death using Shader Graph.</p>` },
    { type: 'media', kind: 'image', src: 'assets/screenshots/bloody-wasted/02.gif', label: 'The approaching sun and death sequence' },

    { type: 'section', title: 'Result' },
    { type: 'text', html: `<p>The jam didn't have a ranking system, and we didn't get many players. Still, it was a game we enjoyed playing ourselves, and I learnt a lot about pacing, feedback, and making fast movement feel good.</p>` },
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
