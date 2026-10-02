import React, { useEffect, useRef, useState } from "react";

// Teks diketik huruf demi huruf tiap kali masuk layar (diputar ulang saat di-scroll lagi)
export default function Typing({ text, speed = 55, delay = 0 }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(text.length); return; }
    let start, timer;
    const run = () => {
      setN(0);
      start = setTimeout(() => {
        let i = 0;
        timer = setInterval(() => {
          i += 1; setN(i);
          if (i >= text.length) clearInterval(timer);
        }, speed);
      }, delay);
    };
    const stop = () => { clearTimeout(start); clearInterval(timer); setN(0); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? run() : stop()), { threshold: 0.5 });
    io.observe(ref.current);
    return () => { io.disconnect(); clearTimeout(start); clearInterval(timer); };
  }, [text, speed, delay]);

  const typing = n > 0 && n < text.length;
  return (
    <span className="tw" ref={ref} aria-label={text}>
      <span className="tw-ghost" aria-hidden="true">{text}</span>
      <span className="tw-live" aria-hidden="true">
        {text.slice(0, n)}<i className={`caret ${typing ? "on" : ""}`} />
      </span>
    </span>
  );
}
