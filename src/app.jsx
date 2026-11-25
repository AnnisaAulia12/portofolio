import React, { useCallback, useEffect, useState } from "react";
import Scenery from "./world/Scenery.jsx";
import Ground from "./world/Ground.jsx";
import PixelIcon from "./world/pixels.jsx";
import { SPRITES } from "./world/sprites.js";
import Lightbox from "./components/Lightbox.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Skills from "./sections/Skills.jsx";
import Projects from "./sections/Projects.jsx";
import Experience from "./sections/Experience.jsx";
import Contact from "./sections/Contact.jsx";

export default function App() {
  const [active, setActive] = useState("home");
  const [zoom, setZoom] = useState(null);
  const [intro, setIntro] = useState(true);
  const closeZoom = useCallback(() => setZoom(null), []);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 1600);

    // section muncul sekali saat terlihat
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // karakter & papan petunjuk mengikuti section yang sedang dilihat
    const spy = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((el) => spy.observe(el));

    // paralaks bukit mengikuti progres scroll
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty("--p", max > 0 ? (window.scrollY / max).toFixed(3) : "0");
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(t); io.disconnect(); spy.disconnect();
      window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {intro && (
        <div className="curtain" aria-hidden="true">
          <PixelIcon rows={SPRITES.bloom} size={8} className="curtain-bloom" />
          <p>growing the garden…</p>
        </div>
      )}

      <Scenery />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onZoom={(project, idx) => setZoom({ project, idx })} />
        <Experience />
        <Contact />
      </main>

      <Ground active={active} />
      {zoom && <Lightbox project={zoom.project} startIdx={zoom.idx} onClose={closeZoom} />}
    </>
  );
}
