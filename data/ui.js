window.UI = {
  // Nav tabs, page-transition label, side readout and browser tab title
  pages: { home: 'Home', projects: 'Projects', about: 'About' },
  scrollReadout: 'Scroll',           // vertical readout on the right of the frame
  navBack: 'Back',                   // nav button, left of the name: previous page, or one level up

  // Full-screen screenshot viewer
  lightbox: { back: 'Back', prev: 'Previous screenshot', next: 'Next screenshot' },

  home: {
    eyebrow: '[ Portfolio {year} ]',
    gamesHeading: 'Featured projects',
    cardCta: 'Read the case study',
    cardMediaFallback: 'gameplay',  // shown on a card with no image yet
    allProjects: 'All projects',
    allProjectsCount: '{jams} game jams',
    aiStamp: 'Disclosure',
    loopBack: '↺ Back to Test, or all the way to Aim',
  },

  caseStudy: {
    play: 'Play on itch.io',
    playSoon: 'Play link coming soon',
    heroFallback: 'Gameplay footage',
    contents: 'Contents',
    next: 'Next project — {n}',
  },

  projects: {
    eyebrow: '[ Archive ]',
    title: 'Projects',
    jamsHeading: 'Game jams',
    entries: '{n} entries',
    featured: 'Featured',
    videoFallback: 'Gameplay video',
    play: 'Play on itch.io ↗',
    preview: '▶ Preview',
  },

  about: {
    eyebrow: '[ About ]',
    bio: 'Who I am',
    toolbox: 'Toolbox',
    lookingFor: 'Looking for',
    contactLabel: 'Contact',   // not shown: read out by screen readers for the contact list
    email: 'Email',
  },

  footer: { backToTop: 'Back to top ↑' },

  // Hover labels shown in the folder tab at the top left ("open → ~/projects")
  cursor: {
    home: 'Home', open: 'Open', back: 'Back', next: 'Next', play: 'Play',
    caseStudy: 'Case study', expand: 'Expand', close: 'Close', visit: 'Visit',
    up: 'Up', restart: 'Restart', scroll: 'Scroll', paint: 'Paint',
  },

  // Interactive bits on the case study pages
  widgets: {
    tacos: {
      barLeft: 'Meta layer',
      barRight: 'Drag the number',
      ate: 'You go back to October',
      goal: 'to save Amy',
      sliderLabel: 'Day of October',
      note: 'A sketch made for this portfolio. It is not in the jam build or the full game.',
      max: 45,
      start: 3,
      // The first line whose `upTo` is at least the day is shown.
      lines: [
        { upTo: 0, text: "There's no October, the world's in chaos. Amy will die too." },
        { upTo: 9, text: "You arrived too early. You can warn her about the danger, but it won't do much." },
        { upTo: 10, text: 'Save her.' },
        { upTo: 31, text: "You arrived late. Amy's already dead." },
        { upTo: Infinity, text: "October has too many days. Nobody's got their salary yet. Amy's dead too." },
      ],
    },
  },
};
