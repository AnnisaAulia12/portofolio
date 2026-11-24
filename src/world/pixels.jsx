import React from "react";
import { PAL } from "./sprites.js";

// Menggabungkan piksel sewarna yang berdampingan menjadi satu <rect> (lebih ringan).
export function pixelRects(rows, y0 = 0, tint = {}) {
  const out = [];
  rows.forEach((row, ry) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === ".") { x++; continue; }
      let e = x;
      while (e + 1 < row.length && row[e + 1] === ch) e++;
      const key = tint[ch] ?? ch;
      out.push(<rect key={`${x}-${ry}`} x={x} y={y0 + ry} width={e - x + 1} height="1" fill={PAL[key]} />);
      x = e + 1;
    }
  });
  return out;
}

// tint: tukar warna, mis. { p: "y", y: "o" } mengubah bunga pink menjadi kuning.
export default function PixelIcon({ rows, size = 4, tint, className = "", style }) {
  const w = rows[0].length;
  const h = rows.length;
  return (
    <svg className={`pxi ${className}`} style={style} width={w * size} height={h * size}
      viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges" aria-hidden="true">
      {pixelRects(rows, 0, tint)}
    </svg>
  );
}

// Bukit bergerigi piksel dari kolom-kolom persegi.
export function Hill({ color, cols = 110, step = 16, base = 8, amp = 4, freq = 0.09, phase = 0, height = 320, className = "" }) {
  const rects = [];
  for (let i = 0; i < cols; i++) {
    const hh = Math.max(2, Math.round(base + amp * Math.sin(i * freq + phase) + amp * 0.4 * Math.sin(i * freq * 2.3 + phase * 1.7)));
    rects.push(<rect key={i} x={i * step} y={height - hh * step} width={step} height={hh * step} fill={color} />);
  }
  return (
    <svg className={`hill ${className}`} viewBox={`0 0 ${cols * step} ${height}`} preserveAspectRatio="xMidYMax slice"
      shapeRendering="crispEdges" aria-hidden="true">{rects}</svg>
  );
}

// Lingkaran piksel (matahari).
export function PixelCircle({ r = 7, size = 8, color = "#ffd23f" }) {
  const rows = [];
  for (let y = -r; y <= r; y++) {
    let s = "";
    for (let x = -r; x <= r; x++) s += x * x + y * y <= r * r + r * 0.6 ? "y" : ".";
    rows.push(s);
  }
  return <PixelIcon rows={rows} size={size} tint={{ y: "y" }} className="sun-px" style={{ filter: "none" }} />;
}
