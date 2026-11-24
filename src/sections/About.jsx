import React from "react";
import Section from "./Section.jsx";
import Girl from "../world/Girl.jsx";
import { PROFILE } from "../data/profile.js";

export default function About() {
  return (
    <Section id="about" title="About Me" hint="the person behind the pixels">
      <div className="about">
        <article className="paper clip story">
          {PROFILE.about.map((p) => <p key={p}>{p}</p>)}
        </article>
        <aside className="paper clip clip-y player">
          <div className="avatar"><Girl scale={9} crop="head" /></div>
          <dl>
            <div><dt>PLAYER</dt><dd>{PROFILE.name}</dd></div>
            <div><dt>CLASS</dt><dd>{PROFILE.role}</dd></div>
            <div><dt>GUILD</dt><dd>{PROFILE.school}</dd></div>
            <div><dt>MAIN QUEST</dt><dd>{PROFILE.focus}</dd></div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
