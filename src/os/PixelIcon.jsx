import React from "react";
import { PAL, SPRITES } from "./sprites.js";

// Merender sprite menjadi SVG tajam (tanpa anti-alias).
export default function PixelIcon({ name, size = 4, className = "", style }) {
  const rows = SPRITES[name];
  const h = rows.length;
  const w = rows[0].length;
  const rects = [];
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== ".") rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={PAL[ch]} />);
    })
  );
  return (
    <svg className={`pxi ${className}`} width={w * size} height={h * size} viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges" style={style} aria-hidden="true">
      {rects}
    </svg>
  );
}
