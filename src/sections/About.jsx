import React, { useEffect, useRef, useState } from "react";
import "../style/about.css";

const aboutMeTitle = new URL(
  "../assets/images/aboutMe.png",
  import.meta.url
).href;

function About() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.25
        ) {
          setInView(true);
        } else if (!entry.isIntersecting) {
          setInView(false);
        }
      },
      {
        threshold: [0, 0.25],
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about-section ${
        inView ? "is-inview" : ""
      }`}
      id="about"
    >
      <div className="about-content">

        <div className="about-left">


          <img
            src={aboutMeTitle}
            alt="Turning ideas into intuitive designs and functional digital experiences"
            className="about-heading-image"
          />


          <div className="about-description">

            <p className="about-intro">
              Hi! I’m Annisa Aulia Rahmah, a Computer Science student at BINUS
              University.
            </p>

            <p>
              I’m interested in UI/UX Design and Front-end Development. During
              university and group projects, I usually take part in creating
              user flows, interface designs, and the necessary design
              components, then implementing them into code to produce the final
              result.
            </p>

            <p>
              My journey led me to Product Development, where I can blend design
              understanding with technical skills. I hope to continue learning
              and growing through real-world projects.
            </p>

          </div>

        </div>


        <div className="about-right">

          <div className="about-photo-composition">

            <span className="about-sticker about-flower-top"></span>

            <span className="about-sticker about-flower-middle"></span>

            <span className="about-sticker about-flower-bottom"></span>

            <span className="about-sticker about-butterfly-right"></span>

            <span className="about-bubble about-bubble-1"></span>

            <span className="about-bubble about-bubble-2"></span>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;