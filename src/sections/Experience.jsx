import React from "react";
import Section from "./Section.jsx";
import PixelIcon from "../world/pixels.jsx";
import { SPRITES } from "../world/sprites.js";
import { EXPERIENCE } from "../data/experience.js";

const TINTS = [{}, { p: "y", y: "o" }, { p: "L" }];

export default function Experience() {
  return (
    <Section id="experience" title="My Journey" hint="steps along the path">
      <div className="trail">
        {EXPERIENCE.map((g, i) => (
          <div className="stop" key={g.title}>
            <PixelIcon rows={SPRITES.bloom} size={4} tint={TINTS[i % TINTS.length]} className="stop-flower" />
            <article className="paper clip">
              <h3>{g.title}</h3>
              <ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </article>
          </div>
        ))}
      </div>
    </Section>
  );
}
