function explodeBrick(i, j, brickColor) {
  const x = i * 250;
  const y = j * 80;
  const w = 250;
  const h = 80;
  const pieces = [
    { dx: -20, dy: -18, delay: 0 },
    { dx:  15, dy: -22, delay: 3 },
    { dx: -18, dy:  20, delay: 5 },
    { dx:  22, dy:  16, delay: 2 },
    { dx:   0, dy: -26, delay: 4 },
  ];
  const pW = w / pieces.length;
  effects.push({
    col: brickColor,
    pieces: pieces.map((p, k) => ({
      px: x + k * pW, py: y,
      pw: pW, ph: h,
      dx: p.dx, dy: p.dy,
      delay: p.delay, t: 0
    })),
    active: true
  });
}

function drawEffects() {
  const DURATION = 35;
  noStroke();
  for (let ef of effects) {
    let allDone = true;
    for (let pc of ef.pieces) {
      pc.t++;
      let t = max(0, pc.t - pc.delay);
      if (t < DURATION) {
        allDone = false;
        let progress = t / DURATION;
        let eased = 1 - pow(1 - progress, 2);
        let alpha = progress < 0.5 ? 255 : map(progress, 0.5, 1.0, 255, 0);
        let c = color(red(ef.col), green(ef.col), blue(ef.col), alpha);
        fill(c);
        rect(
          pc.px + pc.dx * eased,
          pc.py + pc.dy * eased,
          pc.pw, pc.ph
        );
      }
    }
    if (allDone) ef.active = false;
  }
  effects = effects.filter(e => e.active);
}