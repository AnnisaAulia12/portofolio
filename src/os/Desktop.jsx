import React, { useRef, useState } from "react";
import PixelIcon from "./PixelIcon.jsx";
import Scene from "./Scene.jsx";
import { APPS, LINKS } from "./apps.jsx";

const ICONS = ["about", "skills", "projects", "experience", "contact"];
const SPARKLES = [[14, 10], [38, 26], [52, 8], [66, 30], [80, 14], [92, 36], [8, 34], [72, 6]];
const CLOUDS = [
  { top: "7%", size: 5, dur: 140, delay: -30 },
  { top: "19%", size: 4, dur: 190, delay: -120 },
  { top: "12%", size: 6, dur: 230, delay: -70 },
];
const BUTTERFLIES = [
  { left: "46%", bottom: "24%", dur: 9, delay: 0 },
  { left: "62%", bottom: "17%", dur: 12, delay: -4 },
  { left: "30%", bottom: "30%", dur: 14, delay: -8 },
];

export default function Desktop({ open, children }) {
  const [hi, setHi] = useState(false);
  const timer = useRef(null);
  const greet = () => {
    setHi(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setHi(false), 3200);
  };

  return (
    <div className="desktop">
      <Scene />

      {/* dekorasi: awan, burung, kupu-kupu, kilau, bunga depan, dan si gadis */}
      <div className="decor" aria-hidden="true">
        {CLOUDS.map((c, i) => (
          <div key={i} className="cloud" style={{ top: c.top, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}>
            <PixelIcon name="cloud" size={c.size} />
          </div>
        ))}
        <div className="bird b1"><PixelIcon name="bird" size={3} /></div>
        <div className="bird b2"><PixelIcon name="bird" size={2} /></div>

        {SPARKLES.map(([x, y], i) => (
          <PixelIcon key={i} name="sparkle" size={3} className="deco sparkle"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.37}s` }} />
        ))}

        {BUTTERFLIES.map((b, i) => (
          <div key={i} className="fly" style={{ left: b.left, bottom: b.bottom, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}>
            <PixelIcon name="butterfly" size={3} className="wing" />
          </div>
        ))}

        <PixelIcon name="flower" size={5} className="deco flower f1" />
        <PixelIcon name="flowerV" size={4} className="deco flower f2" />
        <PixelIcon name="flowerW" size={5} className="deco flower f4" />
        <PixelIcon name="flowerY" size={4} className="deco flower f5" />
        <PixelIcon name="flower" size={6} className="deco flower f3" />
        <PixelIcon name="cursor" size={4} className="deco cursor" />
      </div>

      <div className="girl-wrap">
        <div className="girl-walk">
          {hi && (
            <div className="bubble" role="status">
              Hi! I'm Annisa <PixelIcon name="heart" size={2} className="inl" /><br />Click the icons to explore!
            </div>
          )}
          <button className="girl" onClick={greet} aria-label="Say hi to Annisa">
            <span className="girl-flip">
              <span className="bob">
                <PixelIcon name="girlA" size={6} className="gf gf1" />
                <PixelIcon name="girlB" size={6} className="gf gf2" />
              </span>
            </span>
          </button>
          <span className="gshadow" />
        </div>
      </div>

      <nav className="icons" aria-label="Programs">
        {ICONS.map((id) => (
          <button key={id} className="dicon" onClick={() => open(id)}>
            <PixelIcon name={APPS[id].icon} size={5} />
            <span>{APPS[id].label}</span>
          </button>
        ))}
        <a className="dicon" href={LINKS.cv} target="_blank" rel="noreferrer">
          <PixelIcon name="doc" size={5} />
          <span>CV.pdf</span>
        </a>
      </nav>

      {children}
    </div>
  );
}
