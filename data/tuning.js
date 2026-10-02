window.TUNING = {
  marquee: {
    speed: 0.6,       // px per frame the ticker moves
  },
  deck: {
    shrink: 0.08,     // how much a card shrinks once fully covered (0.08 = 8%)
    dim: 0.3,         // how much a card darkens once fully covered (0.3 = 30%)
  },
  lanes: {
    parallax: 0.35,   // how fast the side texture moves relative to the content
    pointRadius: 14,  // px: how close the cursor must be to a grid point to show its Vector2
    origin: { x: -6, y: 6 },  // Vector2 reading at the top-left corner of the page, instead of (0, 0)
  },
};
