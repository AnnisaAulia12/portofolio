import React, { useState } from "react";
import Section from "./Section.jsx";
import PixelIcon from "../world/pixels.jsx";
import { SPRITES } from "../world/sprites.js";
import { PROJECTS } from "../data/project.js";
import Lightbox from "../components/Lightbox.jsx";

const CLIPS = ["", "clip-y", "clip-m", "clip-l"];

function ProjectCard({ p, i, onZoom }) {
  const imgs = p.images?.length
    ? p.images
    : p.image
      ? [p.image]
      : [];

  const [idx, setIdx] = useState(0);
  const [broken, setBroken] = useState({});

  const cur = imgs[idx];
  const ok = Boolean(cur) && !broken[cur];

  return (
    <article
      className={`paper clip ${CLIPS[i % CLIPS.length]} polaroid`}
      style={{
        "--tilt": `${[-1.2, 0.8, -0.6, 1.1][i % 4]}deg`,
      }}
    >
      <span className="p-no">
        {String(i + 1).padStart(2, "0")}
      </span>

      {ok ? (
        <button
          type="button"
          className="shot"
          onClick={() => onZoom?.(p, idx)}
          aria-label={`Enlarge ${p.title} image`}
        >
          <img
            src={cur}
            alt={`${p.title} screenshot`}
            onError={() =>
              setBroken((b) => ({
                ...b,
                [cur]: true,
              }))
            }
          />

          <span className="zoom" aria-hidden="true">
            ⌕
          </span>
        </button>
      ) : (
        <div
          className="shot empty"
          role="img"
          aria-label="Image slot"
        >
          <PixelIcon rows={SPRITES.flower} size={3} />
          <span>
            {cur ? "IMAGE NOT FOUND" : "ADD IMAGE"}
          </span>
        </div>
      )}

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

      <h3>{p.title}</h3>

      <p>{p.description}</p>

      <div className="links">
        {p.github && (
          <a
            className="pbtn sm"
            href={p.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        )}

        {p.website && (
          <a
            className="pbtn sm yellow"
            href={p.website}
            target="_blank"
            rel="noreferrer"
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [zoom, setZoom] = useState(null);

  return (
    <Section
      id="projects"
      title="My Works"
      hint="click a project to see its details"
    >
      <div className="gallery">
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.title}
            p={p}
            i={i}
            onZoom={(project, idx) => setZoom({ project, idx })}
          />
        ))}
      </div>

      {zoom?.project && (
        <Lightbox
          project={zoom.project}
          startIdx={zoom.idx}
          onClose={() => setZoom(null)}
        />
      )}
    </Section>
  );
}