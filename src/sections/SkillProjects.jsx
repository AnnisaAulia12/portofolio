import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import "../style/SkillProject.css";
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

const bunga1 = new URL(
  "../assets/images/bunga1.png",
  import.meta.url
).href;

const bunga2 = new URL(
  "../assets/images/bunga2.png",
  import.meta.url
).href;

const bunga5 = new URL(
  "../assets/images/bunga5.png",
  import.meta.url
).href;

const kupu4 = new URL(
  "../assets/images/kupu4.png",
  import.meta.url
).href;

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


const TABS = [
  {
    id: "skill",
    label: "SKILL",
  },

  {
    id: "projects",
    label: "PROJECTS",
  },
];

function SkillProjects() {
  const [activeTab, setActiveTab] =
    useState("skill");

  const sectionRef =
    useRef(null);

  const [inView, setInView] =
    useState(false);

  const sliderRef =
    useRef(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const drag =
    useRef({
      active: false,
      startX: 0,
      startScroll: 0,
      moved: false,
    });


  const onTabKeyDown = (
    event,
    index
  ) => {
    const keys = {
      ArrowRight: 1,
      ArrowLeft: -1,
    };

    if (!(event.key in keys)) {
      return;
    }

    event.preventDefault();

    const next =
      TABS[
        (
          index +
          keys[event.key] +
          TABS.length
        ) %
        TABS.length
      ];

    setActiveTab(
      next.id
    );

    document
      .getElementById(
        `sp-tab-${next.id}`
      )
      ?.focus();
  };


  const getStep =
    useCallback(() => {
      const slider =
        sliderRef.current;

      const card =
        slider?.querySelector(
          ".sp-card"
        );

      if (
        !slider ||
        !card
      ) {
        return 0;
      }

      const gap =
        parseFloat(
          getComputedStyle(
            slider
          ).columnGap
        ) || 0;

      return (
        card.offsetWidth +
        gap
      );
    }, []);


  const swipeNext = () => {
    const slider =
      sliderRef.current;

    if (!slider) {
      return;
    }

    const atEnd =
      slider.scrollLeft +
        slider.clientWidth >=
      slider.scrollWidth - 4;

    slider.scrollTo({
      left:
        atEnd
          ? 0
          : slider.scrollLeft +
            getStep(),

      behavior:
        "smooth",
    });
  };


  const onSliderKeyDown =
    (event) => {
      if (
        event.key ===
        "ArrowRight"
      ) {
        event.preventDefault();

        sliderRef.current
          ?.scrollBy({
            left: getStep(),
            behavior: "smooth",
          });
      }

      if (
        event.key ===
        "ArrowLeft"
      ) {
        event.preventDefault();

        sliderRef.current
          ?.scrollBy({
            left: -getStep(),
            behavior: "smooth",
          });
      }
    };

  const onPointerDown =
    (event) => {
      if (
        event.pointerType !==
        "mouse"
      ) {
        return;
      }

      const slider =
        sliderRef.current;

      if (!slider) {
        return;
      }

      drag.current = {
        active: true,

        startX:
          event.clientX,

        startScroll:
          slider.scrollLeft,

        moved: false,
      };
    };


  const onPointerMove =
    (event) => {
      const d =
        drag.current;

      if (!d.active) {
        return;
      }

      const slider =
        sliderRef.current;

      if (!slider) {
        return;
      }

      const distance =
        event.clientX -
        d.startX;

      if (
        !d.moved &&
        Math.abs(distance) <
          5
      ) {
        return;
      }

      if (!d.moved) {
        d.moved =
          true;

        setIsDragging(
          true
        );
      }

      slider.scrollLeft =
        d.startScroll -
        distance;
    };


  const endDrag = () => {
    const d =
      drag.current;

    if (!d.active) {
      return;
    }

    d.active =
      false;

    const slider =
      sliderRef.current;

    if (!slider) {
      setIsDragging(false);
      return;
    }

    if (!d.moved) {
      setIsDragging(false);
      return;
    }

    setIsDragging(false);

    const step =
      getStep() || 1;

    slider.scrollTo({
      left:
        Math.round(
          slider.scrollLeft /
            step
        ) * step,

      behavior:
        "smooth",
    });
  };

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    if (
      !(
        "IntersectionObserver" in
        window
      )
    ) {
      setInView(true);
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >=
              0.18
          ) {
            setInView(true);
          } else if (
            !entry.isIntersecting
          ) {
            setInView(false);
          }
        },

        {
          threshold:
            [0, 0.18],
        }
      );

    observer.observe(
      section
    );

    return () =>
      observer.disconnect();
  }, []);


  useEffect(() => {
    if (
      activeTab ===
        "projects" &&
      sliderRef.current
    ) {
      sliderRef.current.scrollLeft =
        0;
    }
  }, [activeTab]);


  return (
    <section
      ref={sectionRef}
      className={`sp-section ${
        inView
          ? "is-inview"
          : ""
      }`}
      id="skill-projects"
    >

      <h2 className="sp-sr-only">
        Skill and Projects
      </h2>


      <div className="sp-stage">

        <div
          className={`sp-folder sp-folder--${activeTab}`}
        >

          <span
            className="sp-bubble sp-bubble-1"
            style={{
              "--pd": 150,
            }}
            aria-hidden="true"
          />

          <span
            className="sp-bubble sp-bubble-2"
            style={{
              "--pd": 220,
            }}
            aria-hidden="true"
          />

          <span
            className="sp-bubble sp-bubble-3"
            style={{
              "--pd": 300,
            }}
            aria-hidden="true"
          />

          <span
            className="sp-bubble sp-bubble-4"
            style={{
              "--pd": 380,
            }}
            aria-hidden="true"
          />

          <span
            className="sp-bubble sp-bubble-5"
            style={{
              "--pd": 460,
            }}
            aria-hidden="true"
          />


          <svg
            className="sp-tabs-svg sp-rise"
            viewBox="0 0 916 140"
            aria-hidden="true"
            focusable="false"
          >

            <path
              className="sp-fill-skill-outer"
              d="M0 120 L0 40 A40 40 0 0 1 40 0 L254 0 Q274 0 290 12 L346 54 L352 120 Z"
            />

            <path
              className="sp-fill-skill-inner"
              d="M12 120 L12 64 A42 42 0 0 1 54 22 L262 22 Q274 22 290 35 L346 74 L352 120 Z"
            />

            <path
              className="sp-fill-projects-outer"
              d="M346 120 L346 44 A44 44 0 0 1 390 0 L606 0 Q619.3 0 644 18.5 L684 48.5 Q703.3 63 726 63 L866 63 A48 48 0 0 1 914 111 L914 120 Z"
            />

            <path
              className="sp-fill-projects-inner"
              d="M357 140 L357 66 A44 44 0 0 1 401 22 L596 22 Q616 22 634 35 L676 65.3 Q693.6 78 712 78 L852 78 A50 50 0 0 1 902 128 L902 140 Z"
            />

          </svg>


          <div
            className="sp-tabs"
            role="tablist"
            aria-label="Skill and Projects"
          >

            {TABS.map(
              (
                tab,
                index
              ) => (
                <button
                  key={
                    tab.id
                  }
                  id={`sp-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={
                    activeTab ===
                    tab.id
                  }
                  aria-controls={`sp-panel-${tab.id}`}
                  tabIndex={
                    activeTab ===
                    tab.id
                      ? 0
                      : -1
                  }
                  className={`sp-tab sp-tab--${tab.id} ${
                    activeTab ===
                    tab.id
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTab(
                      tab.id
                    )
                  }
                  onKeyDown={(
                    event
                  ) =>
                    onTabKeyDown(
                      event,
                      index
                    )
                  }
                >

                  <span
                    className="sp-tab-label sp-pop"
                    style={{
                      "--pd":
                        200 +
                        index *
                          120,
                    }}
                  >
                    {
                      tab.label
                    }
                  </span>

                </button>
              )
            )}

          </div>

          <div className="sp-body sp-rise">

            {/* SKILL */}

            {activeTab ===
              "skill" && (
              <div
                id="sp-panel-skill"
                role="tabpanel"
                aria-labelledby="sp-tab-skill"
                className="sp-panel sp-skill"
              >

                {SKILLS.map(
                  (
                    group,
                    groupIndex
                  ) => (
                    <div
                      key={
                        group.id
                      }
                      className={`sp-group sp-group--${group.id}`}
                    >

                      <h3
                        className="sp-chip sp-pop"
                        style={{
                          "--pd":
                            300 +
                            groupIndex *
                              100,
                        }}
                      >
                        {
                          group.title
                        }
                      </h3>


                      <div className="sp-rows">

                        {group.rows.map(
                          (
                            row,
                            rowIndex
                          ) => (
                            <ul
                              className="sp-row"
                              key={
                                rowIndex
                              }
                            >

                              {row.map(
                                (
                                  item,
                                  itemIndex
                                ) => (
                                  <li
                                    key={
                                      item
                                    }
                                    className="sp-pop"
                                    style={{
                                      "--pd":
                                        410 +
                                        groupIndex *
                                          90 +
                                        (
                                          rowIndex *
                                            3 +
                                          itemIndex
                                        ) *
                                          35,
                                    }}
                                  >
                                    {
                                      item
                                    }
                                  </li>
                                )
                              )}

                            </ul>
                          )
                        )}

                      </div>

                    </div>
                  )
                )}

              </div>
            )}


            {/* PROJECTS */}

            {activeTab ===
              "projects" && (
              <div
                id="sp-panel-projects"
                role="tabpanel"
                aria-labelledby="sp-tab-projects"
                className="sp-panel sp-projects"
              >

                <div
                  ref={sliderRef}
                  className={`sp-cards ${
                    isDragging
                      ? "is-dragging"
                      : ""
                  }`}
                  tabIndex={0}
                  role="region"
                  aria-label="Project list"
                  onKeyDown={
                    onSliderKeyDown
                  }
                  onPointerDown={
                    onPointerDown
                  }
                  onPointerMove={
                    onPointerMove
                  }
                  onPointerUp={
                    endDrag
                  }
                  onPointerLeave={
                    endDrag
                  }
                  onPointerCancel={
                    endDrag
                  }
                >

                  {PROJECTS.map(
                    (
                      project,
                      index
                    ) => (
                      <article
                        className="sp-card sp-pop"
                        key={
                          project.title
                        }
                        style={{
                          "--pd":
                            Math.min(
                              index,
                              3
                            ) *
                            120,
                        }}
                      >

                        <div className="sp-card-thumb">

                          <img
                            src={
                              project.image
                            }
                            alt={
                              project.title
                            }
                            loading="lazy"
                            draggable="false"
                          />

                        </div>


                        <p className="sp-card-desc">
                          {
                            project.description
                          }
                        </p>


                        {/* GITHUB BUTTON */}

                        <a
                          href={
                            project.github
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="sp-github-link"
                          aria-label={`View ${project.title} on GitHub`}
                          title={`View ${project.title} on GitHub`}
                        >

                          <svg
                            className="sp-github-icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.92c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.93c.85 0 1.7.12 2.5.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.06.36.32.68.94.68 1.89v2.81c0 .27.18.59.69.49A10.22 10.22 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
                            />
                          </svg>

                        </a>

                      </article>
                    )
                  )}

                </div>


                <button
                  type="button"
                  className="sp-swipe sp-pop"
                  style={{
                    "--pd": 500,
                  }}
                  onClick={
                    swipeNext
                  }
                >
                  Swipe →
                </button>

              </div>
            )}

          </div>

          <img
            src={kupu4}
            alt=""
            aria-hidden="true"
            className="sp-sticker sp-butterfly"
            style={{
              "--pd": 250,
            }}
          />


          <img
            src={bunga1}
            alt=""
            aria-hidden="true"
            className="sp-sticker sp-flower sp-flower-1"
            style={{
              "--pd": 330,
            }}
          />


          <img
            src={bunga2}
            alt=""
            aria-hidden="true"
            className="sp-sticker sp-flower sp-flower-2"
            style={{
              "--pd": 420,
            }}
          />


          <img
            src={bunga5}
            alt=""
            aria-hidden="true"
            className="sp-sticker sp-flower sp-flower-3"
            style={{
              "--pd": 510,
            }}
          />

        </div>

      </div>

    </section>
  );
}


export default SkillProjects;