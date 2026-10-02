import React, { useEffect, useState } from "react";
import Typing from "./components/Typing.jsx";
import About from "./sections/about.jsx";
import SkillProjects from "./sections/skillProjects.jsx";
import Experience from "./sections/Experience.jsx";
import Contact from "./sections/Contact.jsx";

const IMG = {
  bunga1: new URL("./assets/images/bunga1.png", import.meta.url).href,
  bunga3: new URL("./assets/images/bunga3.png", import.meta.url).href,
  bunga5: new URL("./assets/images/bunga5.png", import.meta.url).href,
  kupu4: new URL("./assets/images/kupu4.png", import.meta.url).href,
  photo: new URL("./assets/images/photo.png", import.meta.url).href,
};
const BUBBLES = [
  [6, 38, 14, 0], [16, 22, 18, -5], [28, 54, 22, -9], [41, 30, 16, -3], [55, 46, 20, -12],
  [66, 26, 15, -7], [77, 60, 24, -2], [88, 34, 17, -10], [94, 20, 19, -6], [49, 18, 21, -14],
];
const NAV = [
  ["about", "About"],
  ["skills", "Skill & Projects"],
  ["experience", "Experience"],
  ["contact", "Contact"],
];

export default function App() {
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);

  // animasi diputar ulang setiap section masuk layar (dan reset saat keluar)
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".reveal, .section").forEach((el) => io.observe(el));

    // menu aktif mengikuti section yang sedang dilihat
    const spy = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((el) => spy.observe(el));

    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); spy.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <div className="bubbles" aria-hidden="true">
        {BUBBLES.map(([x, s, d, delay], i) => (
          <span key={i} className="bub"
            style={{ left: `${x}%`, width: s, height: s, animationDuration: `${d + 8}s`, animationDelay: `${delay}s` }} />
        ))}
      </div>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className="nav">
        <a className="nav-logo" href="#home">Annisa</a>
        <nav>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>{label}</a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-text">
            <p className="eyebrow">Hello, welcome to my portfolio</p>
            <h1 className="display">
              <Typing text="I'm Annisa" speed={70} delay={200} />
              <br />
              <Typing text="Aulia Rahmah" speed={70} delay={1000} />
            </h1>
            <p className="role">
              <Typing text="Computer Science Student @ BINUS University" speed={28} delay={1900} />
            </p>
            <p className="lead">
              <Typing text="UI/UX design & front-end development — turning ideas into intuitive designs and functional digital experiences." speed={14} delay={3300} />
            </p>
            <div className="btn-row">
              <a className="btn btn-primary" href="#skills">View Projects</a>
              <a className="btn btn-ghost" href="#contact">Contact Me</a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <img className="art-main" src={IMG.bunga1} alt="" />
            <img className="art-sm" src={IMG.bunga3} alt="" />
            <img className="art-butterfly" src={IMG.kupu4} alt="" />
          </div>
        </section>

        <About photo={IMG.photo} flower={IMG.bunga5} />
        <SkillProjects />
        <Experience />
        <Contact />
      </main>

      <footer className="footer">© 2026 Annisa Aulia Rahmah</footer>
    </>
  );
}
