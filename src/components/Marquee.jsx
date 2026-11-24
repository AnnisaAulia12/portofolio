import React from "react";
import { SKILLS } from "../data/skills.js";

// Pita berjalan berisi semua teknologi dari src/data/skills.js
export default function Marquee() {
  const items = SKILLS.flatMap((g) => g.items);
  const loop = [...items, ...items];
  return (
    <div className="band" aria-hidden="true">
      <div className="marquee">
        <div className="marquee-track">
          {loop.map((s, i) => (
            <span key={i}>{s}<b>✦</b></span>
          ))}
        </div>
      </div>
    </div>
  );
}
