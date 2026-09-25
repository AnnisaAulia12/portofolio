import React, { useEffect, useRef, useState } from "react";
import "../style/contact.css";

const portfolioPdf = new URL(
  "../assets/files/AnnisaPorto.pdf",
  import.meta.url
).href;

function Contact() {
  const [phase, setPhase] = useState("closed");
  const [inView, setInView] = useState(false);

  const sectionRef = useRef(null);

  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);


  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.15
        ) {
          setInView(true);
        } else if (!entry.isIntersecting) {
          setInView(false);
        }
      },
      {
        threshold: [0, 0.15],
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleOpen = () => {
    if (phase !== "closed") return;

    setPhase("opening");

    clearTimeout(openTimerRef.current);

    openTimerRef.current = setTimeout(() => {
      setPhase("open");
    }, 1500);
  };

  const handleClose = () => {
    if (phase !== "open") return;

    setPhase("closing");

    clearTimeout(closeTimerRef.current);

    closeTimerRef.current = setTimeout(() => {
      setPhase("closed");
    }, 1600);
  };

  const handleCopyEmail = async () => {
    const email = "nisaauliarmh@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.prompt("Copy email:", email);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`contact-section ${
        inView ? "is-inview" : ""
      }`}
      id="contact"
    >
      {}

      <span
        className="contact-decor contact-flower-1"
        aria-hidden="true"
      ></span>

      <span
        className="contact-decor contact-flower-2"
        aria-hidden="true"
      ></span>

      <span
        className="contact-bubble contact-bubble-1"
        aria-hidden="true"
      ></span>

      <span
        className="contact-bubble contact-bubble-2"
        aria-hidden="true"
      ></span>

      {}

      <div
        className={`envelope-scene ${phase}`}
      >
        <div className="envelope">
          {/* ENVELOPE BACK */}

          <div
            className="envelope-back"
            aria-hidden="true"
          ></div>


          <div className="contact-letter">
            <h2 className="contact-title">
              Contact
            </h2>

            {/* EMAIL */}

            <div className="contact-email-row">
              <a
                href="mailto:nisaauliarmh@gmail.com"
                className="contact-email"
              >
                nisaauliarmh@gmail.com
              </a>

              <button
                type="button"
                className="contact-small-button"
                onClick={handleCopyEmail}
              >
                Copy
              </button>
            </div>

            {/* SOCIAL */}

            <div className="contact-action-row">
              <a
                href="https://github.com/AnnisaAulia12"
                target="_blank"
                rel="noreferrer"
                className="contact-small-button"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/YOUR-USERNAME"
                target="_blank"
                rel="noreferrer"
                className="contact-small-button"
              >
                LinkedIn
              </a>
            </div>

            {/* DIVIDER */}

            <div className="contact-divider">
              • • •
            </div>

            {/* PORTFOLIO */}

            <div className="contact-action-row">
              <a
                href={portfolioPdf}
                target="_blank"
                rel="noreferrer"
                className="contact-view-button"
              >
                View Portfolio
              </a>

              <a
                href={portfolioPdf}
                download="Annisa-Portofolio.pdf"
                className="contact-download-button"
              >
                Download PDF
              </a>
            </div>

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="contact-close-button"
              onClick={handleClose}
              disabled={phase !== "open"}
            >
              Close
            </button>
          </div>

          <div
            className="envelope-top-flap"
            aria-hidden="true"
          ></div>

          <div
            className="envelope-left-fold"
            aria-hidden="true"
          ></div>

          <div
            className="envelope-right-fold"
            aria-hidden="true"
          ></div>

          <div
            className="envelope-bottom-fold"
            aria-hidden="true"
          ></div>

          {phase === "closed" && (
            <button
              type="button"
              className="envelope-open-button"
              onClick={handleOpen}
            >
              Open
            </button>
          )}
        </div>
      </div>

      

      <div
        className="contact-bottom-bar"
        aria-hidden="true"
      ></div>
    </section>
  );
}

export default Contact;