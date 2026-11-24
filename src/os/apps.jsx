import React, { useState } from "react";
import PixelIcon from "./PixelIcon.jsx";
import { PROFILE } from "../data/profile.js";
import { SKILLS } from "../data/skills.js";
import { PROJECTS } from "../data/project.js";
import { EXPERIENCE } from "../data/experience.js";

export const LINKS = {
  cv: new URL("../assets/files/AnnisaCV.pdf", import.meta.url).href,
  portfolio: new URL("../assets/files/AnnisaPorto.pdf", import.meta.url).href,
  github: PROFILE.github,
  linkedin: PROFILE.linkedin,
};

// w = lebar jendela (px). Program di QUEST memberi XP saat pertama dibuka.
export const APPS = {
  welcome: { title: "Welcome.exe", icon: "bloom", w: 600 },
  about: { title: "About.txt", icon: "user", w: 640, label: "About" },
  skills: { title: "TechStack.exe", icon: "code", w: 660, label: "Tech Stack" },
  projects: { title: "Projects/", icon: "folder", w: 700, label: "Projects" },
  experience: { title: "Experience.log", icon: "case", w: 660, label: "Experience" },
  contact: { title: "Contact.mail", icon: "mail", w: 560, label: "Contact" },
};
export const QUEST = ["about", "skills", "projects", "experience", "contact"];
const COLORS = ["var(--pink)", "var(--yellow)", "var(--mint)", "var(--lavender)", "var(--sky)"];

const Wave = ({ text, from = 0 }) => (
  <span className="wave">
    {[...text].map((ch, i) => <span key={i} style={{ "--i": from + i }}>{ch}</span>)}
  </span>
);

export function Welcome({ seen, open }) {
  const techCount = SKILLS.reduce((n, g) => n + g.items.length, 0);
  const done = seen.length === QUEST.length;
  return (
    <div className="welcome">
      <div className="title-wrap">
        <div className="big-title" role="img" aria-label="Portfolio 2026">
          <div><Wave text="PORT" /></div>
          <div><Wave text="FOLIO" from={4} /></div>
        </div>
        <span className="year">2026</span>
      </div>

      <h1 className="name">{PROFILE.name}</h1>
      <p className="role">{PROFILE.role} · {PROFILE.school}</p>
      <p className="summary">{PROFILE.summary}</p>

      <div className="tags">
        <span style={{ "--c": "var(--mint)" }}>{PROJECTS.length} stages</span>
        <span style={{ "--c": "var(--lavender)" }}>{techCount} technologies</span>
        <span style={{ "--c": "var(--yellow)" }}>{PROFILE.focus}</span>
      </div>

      <div className="quest">
        <p className="quest-title">QUEST · explore all programs <b>{seen.length}/{QUEST.length}</b></p>
        <ul>
          {QUEST.map((id) => (
            <li key={id} className={seen.includes(id) ? "done" : ""}>
              <button onClick={() => open(id)}>
                <span className="box">{seen.includes(id) ? "✓" : ""}</span>{APPS[id].title}
              </button>
            </li>
          ))}
        </ul>
        {done && <p className="complete">★ ACHIEVEMENT UNLOCKED · Full Explorer</p>}
      </div>

      <div className="btn-row">
        <button className="pbtn pink" onClick={() => open("projects")}>▶ Start</button>
        <button className="pbtn" onClick={() => open("contact")}>Contact</button>
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="about">
      <div className="player">
        <div className="avatar"><PixelIcon name="girlA" size={7} className="avatar-girl" /></div>
        <dl>
          <div><dt>PLAYER</dt><dd>{PROFILE.name}</dd></div>
          <div><dt>CLASS</dt><dd>{PROFILE.role}</dd></div>
          <div><dt>GUILD</dt><dd>{PROFILE.school}</dd></div>
          <div><dt>MAIN QUEST</dt><dd>{PROFILE.focus}</dd></div>
        </dl>
      </div>
      <div className="story">
        {PROFILE.about.map((p) => <p key={p}>{p}</p>)}
      </div>
    </div>
  );
}

export function Skills() {
  const total = SKILLS.reduce((n, g) => n + g.items.length, 0);
  return (
    <div>
      <p className="hint">INVENTORY · {total} items</p>
      <div className="inv">
        {SKILLS.map((g, i) => (
          <section className="slot-group" key={g.title} style={{ "--c": COLORS[i % 5] }}>
            <h3>{g.title}</h3>
            <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <div>
      <p className="hint">{PROJECTS.length} STAGES · pick one to play</p>
      <div className="stages">
        {PROJECTS.map((p, i) => (
          <article className="stage" key={p.title} style={{ "--c": COLORS[i % 5] }}>
            <span className="stage-no">STAGE {String(i + 1).padStart(2, "0")}</span>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="links">
              {p.github && <a className="pbtn sm" href={p.github} target="_blank" rel="noreferrer">▶ GitHub</a>}
              {p.website && <a className="pbtn sm yellow" href={p.website} target="_blank" rel="noreferrer">▶ Live Demo</a>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <div>
      <p className="hint">QUEST LOG · all completed</p>
      <div className="log">
        {EXPERIENCE.map((g, i) => (
          <section className="log-group" key={g.title} style={{ "--c": COLORS[(i + 2) % 5] }}>
            <h3>{g.title}</h3>
            <ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); }
    catch { window.prompt("Copy email:", PROFILE.email); return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="contact">
      <p className="hint">NEW MESSAGE · to: {PROFILE.name}</p>
      <p>Thank you for visiting — feel free to reach out!</p>
      <div className="mail-row">
        <a className="mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        <button className="pbtn sm" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>
      </div>
      <div className="btn-row">
        <a className="pbtn" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a className="pbtn" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </div>
      <div className="btn-row">
        <a className="pbtn pink" href={LINKS.cv} target="_blank" rel="noreferrer">View CV</a>
        <a className="pbtn" href={LINKS.cv} download="Annisa-Aulia-Rahmah-CV.pdf">Download CV</a>
        <a className="pbtn yellow" href={LINKS.portfolio} target="_blank" rel="noreferrer">Portfolio PDF</a>
      </div>
    </div>
  );
}
