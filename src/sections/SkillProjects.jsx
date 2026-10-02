import Decor from "../components/Decor.jsx";
import Typing from "../components/Typing.jsx";
import React, { useState } from "react";

const IMG = {
  reading: new URL(
    "../assets/images/project-reading.png",
    import.meta.url
  ).href,

  housing: new URL(
    "../assets/images/project-housing.png",
    import.meta.url
  ).href,

  pomodoro: new URL(
    "../assets/images/project-pomodoro.png",
    import.meta.url
  ).href,

  eltrack: new URL(
    "../assets/images/project-eltrack.png",
    import.meta.url
  ).href,

  shop: new URL(
    "../assets/images/project-shop.png",
    import.meta.url
  ).href,
};

const SKILL_LOGOS = {
  JavaScript: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript logo" },
  TypeScript: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript logo" },
  C: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", alt: "C logo" },
  Dart: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", alt: "Dart logo" },
  Java: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", alt: "Java logo" },
  Python: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python logo" },
  MySQL: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL logo" },
  Supabase: { src: "https://cdn.simpleicons.org/supabase/3ECF8E", alt: "Supabase logo" },
  "Git & Github": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", alt: "GitHub logo" },
  Vercel: { src: "https://cdn.simpleicons.org/vercel/000000", alt: "Vercel logo" },
  "Android Studio": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", alt: "Android Studio logo" },
  "Thunder Client": { fallback: "TC", alt: "Thunder Client mark" },
  Canva: { src: "https://cdn.simpleicons.org/canva/00C4CC", alt: "Canva logo" },
  Figma: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma logo" },
  IbisPaint: { fallback: "IP", alt: "IbisPaint mark" },
  CSS: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS logo" },
  HTML: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML logo" },
  React: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React logo" },
  Flutter: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", alt: "Flutter logo" },
  "Rest API": { fallback: "API", alt: "REST API mark" },
  "Node.js": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js logo" },
  Express: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", alt: "Express logo" },
};

const SKILLS = [
  {
    id: "language",
    title: "Language",
    rows: [
      ["JavaScript", "TypeScript", "C"],
      ["Dart", "Java", "Python"],
    ],
  },

  {
    id: "database",
    title: "Database",
    rows: [
      ["MySQL", "Supabase"],
    ],
  },

  {
    id: "tools",
    title: "Tools & Editing",
    rows: [
      ["Git & Github", "Vercel"],
      ["Android Studio"],
      ["Thunder Client"],
      ["Canva", "Figma", "IbisPaint"],
    ],
  },

  {
    id: "frontend",
    title: "Frontend",
    rows: [
      ["CSS", "HTML", "React"],
      ["Flutter"],
    ],
  },

  {
    id: "backend",
    title: "Backend",
    rows: [
      ["Rest API", "Node.js"],
      ["Express"],
    ],
  },
];

const PROJECTS = [
  {
    title: "Nalleta",

    image: IMG.reading,

    description:
      "An all-in-one reading app to track books, save notes and quotes, and stay focused while reading.",

    github:
      "https://github.com/Shal1964/ReadingLog.git",
  },

  {
    title: "Housing Platform",

    image: IMG.housing,

    description:
      "A housing platform that helps users find, compare, and save rental properties based on their preferences.",

    github:
      "https://github.com/YOUR-USERNAME/Housing-Platform",
  },

  {
    title: "Focus Timer",

    image: IMG.pomodoro,

    description:
      "A gamified focus timer with themes, EXP rewards, music, and a to-do list to make studying more engaging.",

    github:
      "https://github.com/AnnisaAulia12/PomodoroTimer.git",
  },

  {
    title: "eltrack",

    image: IMG.eltrack,

    description:
      "A waste management app that helps users understand waste categories and manage disposal more easily.",

    github:
      "https://github.com/AnnisaAulia12/Eltrack.git",
  },

  {
    title: "Shopping App",

    image: IMG.shop,

    description:
      "A simple shopping app for managing products, with Google authentication and light/dark mode.",

    github:
      "https://github.com/silmiz/HonkaiStarRetail.git",
  },
];


const hasLink = (u) => u && !u.includes("YOUR-USERNAME");

export default function SkillProjects() {
  const [tab, setTab] = useState("skill");

  return (
    <section className="section" id="skills">
      <Decor set="skills" />
      <div className="container reveal">
        <h2 className="display h2 center"><Typing text="Skill & Projects" speed={75} /></h2>

        <div className="tabs" role="tablist">
          {[["skill", "Skill"], ["projects", "Projects"]].map(([id, label]) => (
            <button key={id} role="tab" aria-selected={tab === id}
              className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
        </div>

        {tab === "skill" && (
          <div className="skill-grid">
            {SKILLS.map((g) => (
              <div className="card skill-card" key={g.id}>
                <h3 className="chip">{g.title}</h3>
                <ul className="skill-list">
                  {g.rows.flat().map((item) => (
                    <li key={item}>
                      {SKILL_LOGOS[item]?.src ? (
                        <img src={SKILL_LOGOS[item].src} alt="" loading="lazy" />
                      ) : (
                        <span className="logo-fb">{SKILL_LOGOS[item]?.fallback || item.slice(0, 2)}</span>
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === "projects" && (
          <div className="project-grid">
            {PROJECTS.map((p) => (
              <article className="card project" key={p.title}>
                <div className="thumb"><img src={p.image} alt={p.title} loading="lazy" /></div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {hasLink(p.github) && (
                  <a className="btn btn-ghost sm" href={p.github} target="_blank" rel="noreferrer"
                    aria-label={`View ${p.title} on GitHub`}>GitHub ↗</a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
