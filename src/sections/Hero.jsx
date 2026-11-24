import React from "react";
import PixelIcon, { Hill } from "../world/pixels.jsx";
import Girl from "../world/Girl.jsx";
import { SPRITES } from "../world/sprites.js";
import { PROFILE } from "../data/profile.js";
import { PROJECTS } from "../data/project.js";
import { SKILLS } from "../data/skills.js";

const Wave = ({ text, from = 0 }) => (
  <span className="wave" aria-hidden="true">
    {[...text].map((ch, i) => <span key={i} style={{ "--i": from + i }}>{ch === " " ? "\u00a0" : ch}</span>)}
  </span>
);

export default function Hero() {
  const [first, ...rest] = PROFILE.name.split(" ");
  const tech = SKILLS.reduce((n, g) => n + g.items.length, 0);
  return (
    <section className="hero wrap" id="home">
      <div className="hero-text">
        <p className="sticker">PORTFOLIO 2026</p>
        <h1 aria-label={PROFILE.name}>
          <span className="h-first"><Wave text={first.toUpperCase()} /></span>
          <span className="h-rest">{rest.join(" ")}</span>
        </h1>
        <p className="role">{PROFILE.role} · {PROFILE.school}</p>
        <p className="summary">{PROFILE.summary}</p>
        <div className="tags">
          <span style={{ "--c": "var(--mint)" }}>{PROJECTS.length} projects</span>
          <span style={{ "--c": "var(--lavender)" }}>{tech} technologies</span>
          <span style={{ "--c": "var(--yellow)" }}>{PROFILE.focus}</span>
        </div>
        <div className="btn-row">
          <a className="pbtn pink" href="#projects">▶ View Projects</a>
          <a className="pbtn" href="#contact">Contact</a>
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="hero-bubble">Hi, I'm {first}!</div>
        <PixelIcon rows={SPRITES.sparkle} size={4} className="hs s1" />
        <PixelIcon rows={SPRITES.sparkle} size={3} className="hs s2" />
        <div className="mound"><Hill color="#79cc7e" cols={30} step={16} height={160} base={4} amp={1.6} freq={0.35} phase={1} /></div>
        <Girl scale={11} className="hero-girl" />
        <PixelIcon rows={SPRITES.flower} size={5} className="hf f1" />
        <PixelIcon rows={SPRITES.flower} size={4} tint={{ p: "y", y: "o" }} className="hf f2" />
        <PixelIcon rows={SPRITES.flower} size={6} tint={{ p: "L" }} className="hf f3" />
        <PixelIcon rows={SPRITES.flower} size={4} tint={{ p: "w", y: "y" }} className="hf f4" />
      </div>
    </section>
  );
}
