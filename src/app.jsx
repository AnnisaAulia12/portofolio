import React from "react";

import About from "./sections/About.jsx";
import SkillProjects from "./sections/SkillProjects.jsx";
import Experience from "./sections/Experience.jsx";
import Contact from "./sections/Contact.jsx";

/* =========================================
   ASSETS
========================================= */

const Bg = new URL(
  "./assets/images/Bg.png",
  import.meta.url
).href;

const bunga1 = new URL(
  "./assets/images/bunga1.png",
  import.meta.url
).href;

const bunga2 = new URL(
  "./assets/images/bunga2.png",
  import.meta.url
).href;

const bunga3 = new URL(
  "./assets/images/bunga3.png",
  import.meta.url
).href;

const bunga5 = new URL(
  "./assets/images/bunga5.png",
  import.meta.url
).href;

const HeroName = new URL(
  "./assets/images/HeroName.png",
  import.meta.url
).href;

const kupu4 = new URL(
  "./assets/images/kupu4.png",
  import.meta.url
).href;


/* =========================================
   APP
========================================= */

function App() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  return (
    <>

      {/* =====================================
          HERO
      ====================================== */}

      <section
        className="hero"
        id="home"
      >

        {/* BACKGROUND */}

        <img
          src={Bg}
          alt=""
          className="hero-bg"
        />


        {/* HEADER SCALLOP */}

        <div className="top-header"></div>


        {/* =====================================
            NAVIGATION
        ====================================== */}

        <nav className="hero-nav">

          <button
            type="button"
            onClick={() =>
              scrollToSection("about")
            }
          >
            ABOUT ME
          </button>


          <button
            type="button"
            onClick={() =>
              scrollToSection("skills")
            }
          >
            SKILL & PROJECTS
          </button>


          <button
            type="button"
            onClick={() =>
              scrollToSection("experience")
            }
          >
            EXPERIENCE
          </button>


          <button
            type="button"
            onClick={() =>
              scrollToSection("contact")
            }
          >
            CONTACT
          </button>

        </nav>


        {/* =====================================
            BUBBLES
        ====================================== */}

        <span className="bubble bubble-1"></span>
        <span className="bubble bubble-2"></span>
        <span className="bubble bubble-3"></span>
        <span className="bubble bubble-4"></span>
        <span className="bubble bubble-5"></span>
        <span className="bubble bubble-6"></span>
        <span className="bubble bubble-7"></span>


        {/* =====================================
            BUNGA 2
        ====================================== */}

        <img
          src={bunga2}
          alt=""
          className="decor bunga2 bunga2-a"
        />

        <img
          src={bunga2}
          alt=""
          className="decor bunga2 bunga2-b"
        />

        <img
          src={bunga2}
          alt=""
          className="decor bunga2 bunga2-c"
        />

        <img
          src={bunga2}
          alt=""
          className="decor bunga2 bunga2-d"
        />


        {/* =====================================
            HERO CENTER
        ====================================== */}

        <div className="hero-center">

          {/* HERO NAME FRAME */}

          <img
            src={HeroName}
            alt=""
            className="hero-name-frame"
          />


          {/* HERO TEXT */}

          <div className="hero-copy">

            <h1>
              <span>
                Hello
              </span>

              <span>
                I'm Annisa Aulia R
              </span>
            </h1>


            <div className="student-row">

              <span className="line"></span>

              <p>
                Computer Science Student @BinusUniversity
              </p>

              <span className="line"></span>

            </div>

          </div>


          {/* =====================================
              LEFT DECORATION
          ====================================== */}

          <img
            src={bunga1}
            alt=""
            className="decor bunga1 bunga1-left"
          />

          <img
            src={bunga3}
            alt=""
            className="decor bunga3 bunga3-left"
          />

          <img
            src={kupu4}
            alt=""
            className="decor kupu kupu-left"
          />


          {/* =====================================
              RIGHT DECORATION
          ====================================== */}

          <img
            src={bunga1}
            alt=""
            className="decor bunga1 bunga1-right"
          />

          <img
            src={bunga5}
            alt=""
            className="decor bunga5 bunga5-right"
          />

        </div>

      </section>


      {/* =====================================
          ABOUT
      ====================================== */}

      <About
        bunga1={bunga1}
        bunga5={bunga5}
        kupu4={kupu4}
      />


      {/* =====================================
          SKILL & PROJECTS
      ====================================== */}

      <div id="skills">
        <SkillProjects />
      </div>


      {/* =====================================
          EXPERIENCE
      ====================================== */}

      <Experience />


      {/* =====================================
          CONTACT / THANK YOU
      ====================================== */}

      <Contact />

    </>
  );
}


export default App;