import React, { useEffect, useRef } from "react";

export default function Lightbox({ src, title, onClose }) {
  const btn = useRef(null);
  useEffect(() => {
    btn.current?.focus();
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <figure className="lb-card" onClick={(e) => e.stopPropagation()}>
        <button ref={btn} className="lb-close" onClick={onClose} aria-label="Close image">×</button>
        <img src={src} alt={`${title} screenshot`} />
        <figcaption>{title}</figcaption>
      </figure>
    </div>
  );
}
