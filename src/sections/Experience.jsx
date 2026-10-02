import Decor from "../components/Decor.jsx";
import Typing from "../components/Typing.jsx";
import React from "react";

const GROUPS = [
  { title: "Organization", items: [
    "Handled all graphic design needs for PMR organization activities, including posters, banners, and digital feeds.",
    "Prepared publication materials and media partnership requirements, including posters and other promotional assets for the BINUS Ramadhan Festival.",
    "Managed publications and coordinated with various media partners to ensure the success of the BINUS Ramadhan Festival.",
  ]},
  { title: "Volunteers", items: [
    "Volunteered as a teacher at a local kindergarten, designing and delivering sensory education activities for children.",
    "Educated elementary school students about the importance of personal hygiene and healthy daily habits.",
    "Contributed to environmental conservation efforts and sustainability awareness initiatives.",
  ]},
  { title: "Achievement", items: [
    "Secured second place in a scientific article writing competition organized by the Character Building Development Center (CBDC) at BINUS University.",
  ]},
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <Decor set="experience" />
      <div className="container reveal">
        <h2 className="display h2 center"><Typing text="Experience" speed={75} /></h2>
        <div className="exp-grid">
          {GROUPS.map((g) => (
            <div className="card exp-card" key={g.title}>
              <h3 className="chip">{g.title}</h3>
              <ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
