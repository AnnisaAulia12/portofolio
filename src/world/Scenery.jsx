import React from "react";
import PixelIcon, { Hill, PixelCircle } from "./pixels.jsx";
import { SPRITES } from "./sprites.js";

const CLOUDS = [
  { top: "7%", size: 8, dur: 140, delay: -30 },
  { top: "17%", size: 5, dur: 190, delay: -120 },
  { top: "29%", size: 10, dur: 110, delay: -70 },
  { top: "11%", size: 6, dur: 230, delay: -10 },
];
const PETALS = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 8.3 + (i % 3) * 3) % 100}%`, dur: 13 + (i * 3) % 9, delay: -((i * 2.7) % 14), size: 6 + (i % 3) * 2,
}));
const BUTTERFLIES = [
  { cls: "bf1", tint: {}, size: 4 },
  { cls: "bf2", tint: { p: "y" }, size: 3 },
  { cls: "bf3", tint: { p: "L" }, size: 4 },
];

// Latar tetap: langit, matahari, awan, bukit (paralaks), kelopak jatuh, kupu-kupu.
export default function Scenery() {
  return (
    <div className="scenery" aria-hidden="true">
      <div className="sun"><PixelCircle r={7} size={9} /></div>

      {CLOUDS.map((c, i) => (
        <div key={i} className="cloud" style={{ top: c.top, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}>
          <PixelIcon rows={SPRITES.cloud} size={c.size} />
        </div>
      ))}

      <div className="hills far"><Hill color="#bfe8b0" base={9} amp={4} freq={0.07} phase={1} /></div>
      <div className="hills mid"><Hill color="#9bdc95" base={6} amp={3.5} freq={0.1} phase={3} /></div>
      <div className="hills near"><Hill color="#79cc7e" base={4} amp={2.5} freq={0.13} phase={5} /></div>

      {BUTTERFLIES.map((b) => (
        <div key={b.cls} className={`butterfly ${b.cls}`}>
          <PixelIcon rows={SPRITES.butterfly} size={b.size} tint={b.tint} className="flap" />
        </div>
      ))}

      {PETALS.map((p, i) => (
        <span key={i} className="petal" style={{ left: p.left, width: p.size, height: p.size, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  );
}
