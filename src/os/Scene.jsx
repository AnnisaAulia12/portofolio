import React, { useEffect, useRef } from "react";

// Pemandangan pixel-art digambar sekali ke kanvas kecil (320×180),
// lalu diperbesar tanpa anti-alias lewat CSS.
const W = 320, H = 180, HORIZON = 112;

const rng = (seed) => { let s = seed; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; };

function paint(ctx) {
  const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), w, h); };
  const circle = (cx, cy, r, c) => {
    ctx.fillStyle = c;
    for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + r * 0.6) ctx.fillRect(Math.round(cx + x), Math.round(cy + y), 1, 1);
  };
  const rand = rng(11);

  // ---- langit: pita pastel + dither di batas ----
  const sky = [
    [0, "#a98bff"], [14, "#bf9cff"], [28, "#d6a8ff"], [42, "#eeb0f0"],
    [56, "#ffb9de"], [68, "#ffc9d0"], [80, "#ffdcc4"], [92, "#ffeebf"],
  ];
  sky.forEach(([y, c], i) => {
    const end = i + 1 < sky.length ? sky[i + 1][0] : HORIZON + 4;
    R(0, y, W, end - y, c);
  });
  sky.slice(1).forEach(([y, c]) => {
    for (let x = 0; x < W; x++) {
      if ((x + 1) % 2 === 0) R(x, y - 1, 1, 1, c);
      if (x % 4 === 0) R(x, y - 2, 1, 1, c);
    }
  });
  // bintang kecil di langit atas
  for (let i = 0; i < 26; i++) R(rand() * W, rand() * 40, 1, 1, "#fff6ff");

  // ---- matahari lembut ----
  circle(256, 46, 21, "#ffe3ec");
  circle(256, 46, 17, "#ffeab0");
  circle(256, 46, 13, "#fff6c9");

  // ---- gunung jauh (ungu) dengan puncak salju pink ----
  const peaks = [[28, 38], [88, 30], [160, 46], [232, 33], [300, 41]];
  for (let x = 0; x < W; x++) {
    let top = HORIZON, best = 0;
    peaks.forEach(([px, ph], i) => {
      const y = HORIZON - (ph - Math.abs(x - px) * 0.82);
      if (y < top) { top = y; best = i; }
    });
    top = Math.round(top);
    const right = x > peaks[best][0];
    R(x, top, 1, HORIZON - top + 4, right ? "#8f74d8" : "#a68ae9");
    const apex = HORIZON - peaks[best][1];
    const cap = 8 + ((x * 7) % 3);
    if (top < apex + cap && peaks[best][1] > 30) R(x, top, 1, Math.min(cap - (top - apex), 6), right ? "#f6d6ef" : "#fff0fa");
  }

  // ---- bukit tengah (mint) ----
  for (let x = 0; x < W; x++) {
    const y = Math.round(100 + 6 * Math.sin(x / 23) + 4 * Math.sin(x / 9 + 1));
    R(x, y, 1, HORIZON + 8 - y, "#97e7bb");
    R(x, y, 1, 1, "#c6f6d8");
  }
  // ---- bukit depan ----
  for (let x = 0; x < W; x++) {
    const y = Math.round(108 + 5 * Math.sin(x / 31 + 2) + 2 * Math.sin(x / 11));
    R(x, y, 1, HORIZON + 8 - y, "#7fdba5");
    R(x, y, 1, 1, "#a8f0c4");
  }

  // ---- rumah mungil (atap pink) ----
  const hx = 268, hb = 117;
  R(hx - 28, hb - 2, 70, 3, "#69c68a"); // semak di bawah
  R(hx - 14, hb - 20, 28, 20, "#fff3dc");
  R(hx + 6, hb - 20, 8, 20, "#f1dcc0");
  R(hx - 14, hb - 1, 28, 1, "#3a1f55");
  for (let i = 0; i < 13; i++) {
    const half = 4 + i * 1.3;
    R(hx - half, hb - 34 + i, half * 2, 1, i % 4 === 3 ? "#d6407f" : "#ff7fb3");
  }
  R(hx - 18, hb - 21, 36, 2, "#d6407f");
  R(hx + 7, hb - 38, 4, 8, "#c98f77"); R(hx + 6, hb - 39, 6, 2, "#8a4b2b"); // cerobong
  R(hx - 3, hb - 11, 6, 11, "#b07a5a"); R(hx - 3, hb - 11, 6, 1, "#8a4b2b"); R(hx + 1, hb - 6, 1, 1, "#ffd23f");
  R(hx - 11, hb - 15, 6, 6, "#c4b0ff"); R(hx - 11, hb - 12, 6, 1, "#fff"); R(hx - 9, hb - 15, 1, 6, "#fff");
  R(hx + 6, hb - 15, 6, 6, "#c4b0ff"); R(hx + 6, hb - 12, 6, 1, "#fff"); R(hx + 8, hb - 15, 1, 6, "#fff");
  R(hx - 1, hb - 30, 3, 1, "#fff"); R(hx - 2, hb - 29, 5, 1, "#fff"); R(hx - 1, hb - 28, 3, 1, "#fff"); // hati kecil di atap

  // ---- pohon ----
  const trunk = (x, base, h) => { R(x - 2, base - h, 4, h, "#8a5a3c"); R(x + 1, base - h, 1, h, "#6f452c"); };
  const sakura = (x, base, s = 1) => {
    trunk(x, base, 14 * s);
    const top = base - 14 * s;
    [[-8, -2, 9], [8, -2, 9], [0, -10, 11], [-4, -4, 10], [5, -5, 10]].forEach(([dx, dy, r]) => circle(x + dx * s, top + dy * s, Math.round(r * s), "#ff9ec9"));
    [[3, 2, 6], [-5, 3, 5], [9, 1, 4]].forEach(([dx, dy, r]) => circle(x + dx * s, top + dy * s, Math.round(r * s), "#ff7fb3"));
    [[-6, -8], [2, -14], [8, -6], [-10, -2]].forEach(([dx, dy]) => R(x + dx * s, top + dy * s, 3, 2, "#ffd9ea"));
  };
  const leafy = (x, base, s = 1) => {
    trunk(x, base, 10 * s);
    const top = base - 10 * s;
    [[-6, -2, 8], [6, -2, 8], [0, -9, 9]].forEach(([dx, dy, r]) => circle(x + dx * s, top + dy * s, Math.round(r * s), "#56c982"));
    [[3, 2, 5], [-4, 3, 4]].forEach(([dx, dy, r]) => circle(x + dx * s, top + dy * s, Math.round(r * s), "#3fae6c"));
    [[-5, -10], [3, -13], [7, -5]].forEach(([dx, dy]) => R(x + dx * s, top + dy * s, 3, 2, "#9af0b0"));
  };
  sakura(24, 121, 1);
  leafy(58, 117, 0.7);
  leafy(185, 117, 0.7);
  sakura(214, 122, 1.1);
  leafy(312, 118, 0.8);

  // ---- rumput depan: pita bergaris dengan perspektif ----
  R(0, HORIZON, W, H - HORIZON, "#66cf86");
  let y = HORIZON, h = 4, k = 0;
  while (y < H) {
    R(0, y, W, h, k % 2 ? "#6bd48a" : "#5fc87f");
    y += h; h += 1.2; k++;
    h = Math.round(h);
  }
  R(0, HORIZON, W, 1, "#a8f0c4");

  // jalan setapak menuju rumah
  for (let yy = HORIZON + 1; yy < H; yy++) {
    const t = yy - HORIZON;
    const cx = 268 - t * 0.62 + 4 * Math.sin(t / 9);
    const half = 2 + t * 0.2;
    R(cx - half - 1, yy, half * 2 + 2, 1, "#e6c28a");
    R(cx - half, yy, half * 2, 1, "#f7e0b0");
    if (yy % 7 === 0) R(cx - half + 2, yy, 2, 1, "#e6c28a");
  }

  // pagar putih (dua sisi jalan)
  const fence = (x0, x1, base) => {
    R(x0, base - 3, x1 - x0, 1, "#f3dcec"); R(x0, base - 6, x1 - x0, 1, "#f3dcec");
    for (let x = x0; x < x1; x += 5) { R(x, base - 9, 3, 10, "#fff"); R(x + 2, base - 9, 1, 10, "#e9c7de"); R(x, base - 10, 3, 1, "#ff9ec9"); }
  };
  fence(226, 252, 126); fence(284, 320, 126);

  // rumput liar & bunga (makin dekat makin besar)
  for (let i = 0; i < 260; i++) {
    const fx = Math.round(rand() * W), fy = Math.round(HORIZON + 4 + rand() * (H - HORIZON - 6));
    const t = (fy - HORIZON) / (H - HORIZON);
    const kind = rand();
    if (kind < 0.45) { // jumput rumput
      const c = "#4eb96f";
      R(fx, fy, 1, 2 + (t > 0.5 ? 1 : 0), c); R(fx + 2, fy + 1, 1, 2, c);
      if (t > 0.3) R(fx + 1, fy - 1, 1, 2, "#8de8a8");
    } else if (kind < 0.55) {
      R(fx, fy, 1, 1, "#b9f6cc");
    } else { // bunga
      const col = ["#ff6fa5", "#ffffff", "#ffd23f", "#c4b0ff", "#ff9ec9"][Math.floor(rand() * 5)];
      if (t < 0.25) R(fx, fy, 1, 1, col);
      else if (t < 0.6) { R(fx, fy - 1, 1, 1, col); R(fx - 1, fy, 3, 1, col); R(fx, fy + 1, 1, 1, col); R(fx, fy, 1, 1, "#ffd23f"); }
      else { R(fx - 1, fy - 2, 3, 1, col); R(fx - 2, fy - 1, 5, 2, col); R(fx - 1, fy + 1, 3, 1, col); R(fx, fy - 1, 1, 1, "#ffd23f"); R(fx, fy + 2, 1, 3, "#3fae6c"); }
    }
  }
}

export default function Scene() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = ref.current.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    paint(ctx);
  }, []);
  return <canvas ref={ref} className="scene" width={W} height={H} aria-hidden="true" />;
}
