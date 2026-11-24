import React, { useRef } from "react";
import PixelIcon from "./PixelIcon.jsx";
import { FRAME, BAR } from "./constants.js";

export default function Window({ id, meta, state, isTop, mobile, onFocus, onClose, onMin, onMove, children }) {
  const ref = useRef(null);

  // geser jendela lewat title bar (dinonaktifkan di layar kecil)
  const onDown = (e) => {
    if (mobile || e.button !== 0 || e.target.closest("button")) return;
    onFocus(id);
    const sx = e.clientX, sy = e.clientY, ox = state.x, oy = state.y;
    const w = ref.current.offsetWidth;
    const move = (ev) => {
      const vw = window.innerWidth - FRAME * 2;
      const vh = window.innerHeight - FRAME * 2 - BAR;
      onMove(
        id,
        Math.min(vw - 100, Math.max(-(w - 100), ox + ev.clientX - sx)),
        Math.min(vh - 40, Math.max(0, oy + ev.clientY - sy))
      );
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <section
      ref={ref}
      className={`win ${isTop ? "top" : ""} ${state.min ? "min" : ""}`}
      style={{ left: state.x, top: state.y, zIndex: state.z, width: meta.w, maxHeight: `calc(100% - ${state.y}px - 10px)` }}
      aria-label={meta.title}
      onPointerDown={() => onFocus(id)}
    >
      <div className="titlebar" onPointerDown={onDown}>
        <PixelIcon name={meta.icon} size={2} />
        <span className="tb-title">{meta.title}</span>
        <button className="tb-btn" onClick={() => onMin(id)} aria-label={`Minimize ${meta.title}`}>_</button>
        <button className="tb-btn x" onClick={() => onClose(id)} aria-label={`Close ${meta.title}`}>×</button>
      </div>
      <div className="holes" aria-hidden="true" />
      <div className="win-body">{children}</div>
    </section>
  );
}
