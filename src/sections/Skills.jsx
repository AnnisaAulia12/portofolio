import React from "react";
import Section from "./Section.jsx";
import PixelIcon from "../world/pixels.jsx";
import { SPRITES } from "../world/sprites.js";
import { SKILLS } from "../data/skills.js";

const TINTS = [{}, { p: "y", y: "o" }, { p: "L" }, { p: "w", y: "y" }, { p: "P", y: "y" }];

export default function Skills() {
  return (
    <Section id="skills" title="Tech Garden" hint="every skill is a flower">
      <div className="skill-grid">
        {SKILLS.map((g, i) => (
          <article className="paper clip skill" key={g.title}>
            <PixelIcon rows={SPRITES.flower} size={3} tint={TINTS[i % TINTS.length]} className="skill-flower" />
            <h3>{g.title}</h3>
            <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
