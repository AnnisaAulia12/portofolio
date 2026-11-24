import React, { useEffect, useState } from "react";
import PixelIcon from "./PixelIcon.jsx";
import { useClock } from "./hooks.js";
import { APPS, LINKS, QUEST } from "./apps.jsx";

export default function Taskbar({ wins, topId, seenCount, onOpen, onToggle }) {
  const [menu, setMenu] = useState(false);
  const time = useClock();
  const openIds = Object.keys(wins).filter((id) => wins[id].open);

  useEffect(() => {
    if (!menu) return;
    const esc = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);

  return (
    <>
      {menu && <div className="scrim" onClick={() => setMenu(false)} />}
      {menu && (
        <div className="start-menu" role="menu">
          <p className="sm-head">ANNISA OS</p>
          {QUEST.map((id) => (
            <button key={id} role="menuitem" onClick={() => { onOpen(id); setMenu(false); }}>
              <PixelIcon name={APPS[id].icon} size={2} />{APPS[id].title}
            </button>
          ))}
          <hr />
          <a role="menuitem" href={LINKS.cv} target="_blank" rel="noreferrer"><PixelIcon name="doc" size={2} />CV.pdf</a>
          <a role="menuitem" href={LINKS.portfolio} target="_blank" rel="noreferrer"><PixelIcon name="doc" size={2} />Portfolio.pdf</a>
          <a role="menuitem" href={LINKS.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a role="menuitem" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      )}

      <footer className="taskbar">
        <button className="start" onClick={() => setMenu((m) => !m)} aria-expanded={menu}>
          <PixelIcon name="bloom" size={2} /> START
        </button>

        <div className="tabs">
          {openIds.map((id) => (
            <button key={id} className={`tab ${id === topId ? "on" : ""}`} onClick={() => onToggle(id)}>
              <PixelIcon name={APPS[id].icon} size={2} />
              <span>{APPS[id].title}</span>
            </button>
          ))}
        </div>

        <div className="hud" title="Open every program to complete the quest">
          <span className="lv">LV {1 + seenCount}</span>
          <span className="xp" aria-label={`${seenCount} of ${QUEST.length} programs explored`}>
            {QUEST.map((id, i) => <i key={id} className={i < seenCount ? "on" : ""} />)}
          </span>
        </div>
        <span className="clock">{time}</span>
      </footer>
    </>
  );
}
