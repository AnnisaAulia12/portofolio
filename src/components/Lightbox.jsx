import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Lightbox({ project: projectProp, startIdx = 0, onClose }) {
  const project = projectProp || {};
  const btn = useRef(null);
  const [idx, setIdx] = useState(startIdx);

  const imgs = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : [];
  const tech = project.tech || [];

  useEffect(() => {
    btn.current?.focus();
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div className="pd-card" onClick={(e) => e.stopPropagation()}>
        <button
          ref={btn}
          className="lb-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* kiri: gambar */}
        <div className="pd-media">
          <div className="pd-shot">
            {imgs[idx] && (
              <img src={imgs[idx]} alt={`${project.title} screenshot`} />
            )}
          </div>

          {imgs.length > 1 && (
            <div className="thumbs">
              {imgs.map((src, n) => (
                <button
                  key={n}
                  type="button"
                  className={n === idx ? "on" : ""}
                  onClick={() => setIdx(n)}
                  aria-label={`Show image ${n + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* kanan: detail */}
        <div className="pd-info">
          <div className="pd-head">
            <h3>{project.title}</h3>
            {project.type && <span className="pd-badge">{project.type}</span>}
          </div>

          <p className="pd-desc">{project.description}</p>

          {tech.length > 0 && (
            <>
              <h4 className="pd-label">Tech Stack</h4>
              <ul className="pd-tech">
                {tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </>
          )}

          <div className="pd-links">
            {project.github && (
              <a
                className="pbtn pink"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub ↗
              </a>
            )}
            {project.website && (
              <a
                className="pbtn yellow"
                href={project.website}
                target="_blank"
                rel="noreferrer"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}