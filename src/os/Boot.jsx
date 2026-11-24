import React, { useEffect, useState } from "react";
import PixelIcon from "./PixelIcon.jsx";

const LINES = [
  "Checking memory ........ OK",
  "Loading skills ......... OK",
  "Loading projects ....... OK",
  "Loading experience ..... OK",
  "Welcome, visitor!",
];

export default function Boot({ onDone }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setN((v) => v + 1), 380);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (n > LINES.length + 1) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
  }, [n, onDone]);

  useEffect(() => {
    const skip = () => onDone();
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [onDone]);

  const filled = Math.min(10, n * 2);

  return (
    <div className="boot" onClick={onDone} role="presentation">
      <div className="boot-inner">
        <PixelIcon name="flower" size={6} className="boot-flower" />
        <h1 className="boot-title">ANNISA OS</h1>
        <p className="boot-ver">version 1.0 · portfolio edition</p>
        <div className="boot-bar" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => <i key={i} className={i < filled ? "on" : ""} />)}
        </div>
        <ul className="boot-log">
          {LINES.slice(0, n).map((l) => <li key={l}>&gt; {l}</li>)}
        </ul>
        <p className="boot-skip">click or press any key to skip</p>
      </div>
    </div>
  );
}
