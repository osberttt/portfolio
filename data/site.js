window.SITE = {
  name: 'Osbert',
  fullName: 'Min Htet Naing',
  role: 'Game Designer',
  // Hero subline: "I make games with <taglinePrecise> and <taglineWord>". Precise letters get painted on hover; the word swaps to a generated pair on hover (data/words.js).
  tagline: 'I make games with',
  taglinePrecise: 'specificity',
  taglineAnd: 'and',
  taglineWord: 'personality',
  intro: `In pursuit of "something new" in games, I've been through 14 game jams, a handful of prototypes and countless scrapped notes on my phone. Below are some of my favorites.`,

  // Default colors (Home / Projects / About). Each game overrides these on its page.
  accent: '#a8efdc',
  lane: '#141c24',

  email: 'minhtetnaing25mhn@gmail.com',
  discord: 'osbertttt',
  discordId: '689135186453200910', // numeric user ID; Discord profile links need it, not the handle
  links: [
    { label: 'itch.io', value: 'osbert.itch.io', url: 'https://osbert.itch.io/' },
    { label: 'GitHub', value: 'github.com/osberttt', url: 'https://github.com/osberttt' },
    { label: 'LinkedIn', value: 'in/min-htet-naing-gamedev', url: 'https://www.linkedin.com/in/min-htet-naing-gamedev' },
  ],

  projectsIntro: "Fourteen jams. Four of them have their own page. The rest have a few notes and a link to play them. Videos for those are still on my to-do list.",

  // "How I Work" section on Home, shown after the featured games. \n = line break.
  howIWork: {
    heading: 'How I work',
    lede: "Every project I take on starts with a specific idea of what I want the players to experience, with more or less unique mechanics. I explore the design space, look for the gaps, build the prototypes, and solve the problems that come with them.",
    // Steps of the loop. `eg` is optional: a real example from a featured game (`game` = its slug).
    steps: [
      {
        name: 'Aim',
        body: "I define a specific experience I want the players to have. I try to use mechanics with some originality and stories with some personality. Then I use this as a guiding light for every decision I go on to make in the project.",
        eg: {
          game: 'amy-died-of-700-tacos',
          text: "I wanted players to feel like they have endless options at the branching points of the story. One way to do that is letting them choose any number instead of choosing from A, B, C.",
        },
      },
      {
        name: 'Explore',
        body: "I study games that have a similar experience or similar systems, and analyse what works and what doesn't. I try to understand how they solve certain problems, and how I can use those solutions in my games, in the same way or in the opposite way.",
        eg: {
          game: 'bloody-wasted',
          text: "I looked at Hotline Miami and Mr. Shifty for fast-paced movement in a top-down angle. Then I looked at Subway Surfers and Crossy Road for running down a road full of obstacles. In those games it only takes 1 or 2 mistakes to fail, and in my game the mistakes just slowly build up. So I needed to work on difficulty, pacing and feedback using these differences.",
        },
      },
      {
        name: 'Test',
        body: 'I build the smallest playable version of the idea as early as I can, and stress-test it with real play to see where it breaks. On solo projects I write the code myself, or use AI tools like Claude Code. On team projects I usually work with other programmers.',
        eg: {
          game: 'ghost-with-shadow',
          text: 'Platformers usually make you fall faster in the air so jumps feel snappy. When I did that in the prototype, the ghost fell too fast to pull off the moves the puzzles needed.',
        },
      },
      {
        name: 'Solve',
        body: "I identify the cause of each problem, make the smallest change that addresses it, and then re-test against the design goal to make sure the fix didn't create a new problem somewhere else.",
        eg: {
          game: 'ghost-with-shadow',
          text: "I turned the air gravity down from 3 to 2 and the fall multiplier from 1.5 to 1. It's floatier than Celeste, but it gives you enough time for the moves.",
        },
      },
      {
        name: 'Iterate',
        body: "If it still doesn't hold up, I run the loop again with what I learned. Sometimes a stronger idea than the one I started with emerges from the prototype, and I go back to the first step and redefine the goal.",
        loops: true,
      },
    ],
  },

  // AI disclosure, shown on Home right after "How I work".
  aiDisclosure: {
    heading: 'On using AI',
    body: [
      // [[g|text]] and [[r|text]] = highlighted words (the page's accent colour; g = AI used, r = no AI, kept for reference)
      "Since this year, I usually use Claude Code or other AI tools to help write [[g|code]], with me only working on the system design: making sure it isn't prone to bugs, it's easy to extend and maintain, and it isn't overengineered.",
      "But I don't let AI be involved in the [[r|writing]] and [[r|art]] assets in all the games I make.",
    ],
  },

  about: {
    // The heading is split so the name can be a sticker that swaps on hover (persona.js): "Hi, I'm <Osbert>."
    headingBefore: "Hi, I'm",
    name: 'Osbert',
    nameFull: 'Min Htet Naing',
    bio: [
      "I'm a Myanmar student studying in Thailand, in the final year of my bachelor's degree in ICT.",
      'I make games in Unity with C#, mostly in game jams, either on my own or with small teams.',
    ],
    tools: ['Unity', 'C#', 'Git', 'Prototyping', 'Agentic coding', 'Procreate'],
    lookingFor: "I'm looking for a 4-month internship in a game designer role, starting December 2026, for university credits. I'm open to remote work or relocation, and to any kind of opportunity really, so feel free to say hi.",
  },
};
