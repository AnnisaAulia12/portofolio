import React, { useEffect, useMemo, useState } from "react";
import PixelIcon from "./pixels.jsx";
import Girl from "./Girl.jsx";
import { SPRITES } from "./sprites.js";

const TINTS = [{}, { p: "y", y: "o" }, { p: "L" }, { p: "w", y: "y" }, { p: "P", y: "y" }];

// papan petunjuk = navigasi. x = posisi (%) di layar
const POSTS = [
  ["about", "About", 10],
  ["skills", "Skills", 28],
  ["projects", "Works", 46],
  ["experience", "Journey", 64],
  ["contact", "Hello", 82],
];
const WALK_X = { home: 3, about: 10, skills: 28, projects: 46, experience: 64, contact: 82 };
const SAY = {
  home: "Welcome to my garden!",
  about: "That's me!",
  skills: "My toolbox",
  projects: "Take a look!",
  experience: "My journey so far",
  contact: "Let's talk!",
};

export default function Ground({ active }) {
  const [walking, setWalking] = useState(false);

  // kaki bergerak hanya saat karakter berpindah
  useEffect(() => {
    setWalking(true);
    const t = setTimeout(() => setWalking(false), 1100);
    return () => clearTimeout(t);
  }, [active]);

  // bunga sedikit saja, diletakkan di sela-sela papan petunjuk supaya tidak ramai
  const flowers = useMemo(
    () => [19, 37, 55, 73, 92].map((x, i) => ({
      x,
      size: 3 + (i % 2),
      tint: TINTS[(i * 2) % TINTS.length],
      delay: -(i * 0.7),
    })),
    []
  );

  const x = WALK_X[active] ?? 3;
  const home = active === "home";

  return (
    <div className="ground">
      <div className="flowers" aria-hidden="true">
        {flowers.map((f, i) => (
          <PixelIcon key={i} rows={SPRITES.flower} size={f.size} tint={f.tint} className="gflower"
            style={{ left: `${f.x}%`, "--d": `${f.delay}s`, "--grow": `${i * 0.1}s` }} />
        ))}
      </div>

      <nav className="posts" aria-label="Sections">
        {POSTS.map(([id, label, px]) => (
          <a key={id} href={`#${id}`} className={`post ${active === id ? "on" : ""}`} style={{ left: `${px}%` }}>
            <PixelIcon rows={SPRITES.sign} size={4} />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <div className="walker" style={{ left: home ? `${x}%` : `calc(${x}% + 22px)` }} aria-hidden="true">
        <div className={`bubble ${x > 55 ? "to-left" : ""}`} key={active}>{SAY[active]}</div>
        <Girl scale={3} walking={walking} />
      </div>
    </div>
  );
}