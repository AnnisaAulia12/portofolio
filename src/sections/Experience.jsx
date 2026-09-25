import React, { useEffect, useRef, useState } from "react";
import "../style/experience.css";

const experienceTitle = new URL(
  "../assets/images/experience.png",
  import.meta.url
).href;

function Experience() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.18) {
          setInView(true);
        } else if (!entry.isIntersecting) {
          setInView(false);
        }
      },
      {
        threshold: [0, 0.18],
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`experience-section ${inView ? "is-inview" : ""}`}
      id="experience"
    >
      {/* ORNAMENTS */}

      <span className="experience-decor experience-flower-a"></span>
      <span className="experience-decor experience-flower-b"></span>
      <span className="experience-decor experience-flower-c"></span>
      <span className="experience-decor experience-flower-d"></span>

      <span className="experience-decor experience-butterfly-a"></span>
      <span className="experience-decor experience-butterfly-b"></span>

      <span className="experience-bubble experience-bubble-a"></span>
      <span className="experience-bubble experience-bubble-b"></span>
      <span className="experience-bubble experience-bubble-c"></span>
      <span className="experience-bubble experience-bubble-d"></span>
      <span className="experience-bubble experience-bubble-e"></span>

      <div className="experience-container">
        {/* TITLE */}

        <div className="experience-title-wrapper">
          <img
            src={experienceTitle}
            alt="Experience"
            className="experience-title-image"
          />
        </div>

        {/* SCROLL AREA */}

        <div className="experience-scroll-area">
          {/* ORGANIZATION */}

          <div className="experience-group experience-group-1">
            <div className="experience-label">Organization</div>

            <div className="experience-list">
              <div className="experience-card">
                <p>
                  Handled all graphic design needs for PMR organization
                  activities, including posters, banners, and digital feeds.
                </p>
              </div>

              <div className="experience-card">
                <p>
                  Prepared publication materials and media partnership
                  requirements, including posters and other promotional assets
                  for the BINUS Ramadhan Festival.
                </p>
              </div>

              <div className="experience-card">
                <p>
                  Managed publications and coordinated with various media
                  partners to ensure the success of the BINUS Ramadhan Festival.
                </p>
              </div>
            </div>
          </div>

          {/* VOLUNTEERS */}

          <div className="experience-group volunteer-group experience-group-2">
            <div className="experience-label">Volunteers</div>

            <div className="experience-list">
              <div className="experience-card">
                <p>
                  Volunteered as a teacher at a local kindergarten, designing
                  and delivering sensory education activities for children.
                </p>
              </div>

              <div className="experience-card">
                <p>
                  Educated elementary school students about the importance of
                  personal hygiene and healthy daily habits.
                </p>
              </div>

              <div className="experience-card">
                <p>
                  Contributed to environmental conservation efforts and
                  sustainability awareness initiatives.
                </p>
              </div>
            </div>
          </div>

          {/* ACHIEVEMENT */}

          <div className="experience-group achievement-group experience-group-3">
            <div className="experience-label">Achievement</div>

            <div className="experience-list">
              <div className="experience-card">
                <p>
                  Secured second place in a scientific article writing
                  competition organized by the Character Building Development
                  Center (CBDC) at BINUS University.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="experience-scroll-hint">
          Scroll to see more
        </p>
      </div>
    </section>
  );
}

export default Experience;