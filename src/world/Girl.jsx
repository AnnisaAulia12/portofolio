import React from "react";
import { pixelRects } from "./pixels.jsx";
import { PAL, GIRL_BODY, GIRL_FEET_A, GIRL_FEET_B } from "./sprites.js";

// Karakter berkerudung. walking = kaki bergantian; crop="head" = hanya potret kepala.
export default function Girl({ scale = 4, walking = false, crop = "full", className = "" }) {
  const h = crop === "head" ? 12 : 24;
  return (
    <svg className={`girl ${walking ? "walking" : ""} ${className}`} width={16 * scale} height={h * scale}
      viewBox={`0 0 16 ${h}`} shapeRendering="crispEdges" role="img" aria-label="Pixel avatar of Annisa wearing a hijab">
      <g>{pixelRects(GIRL_BODY)}</g>
      {crop === "full" && (
        <>
          <g className="feet fa">{pixelRects(GIRL_FEET_A, 22)}</g>
          <g className="feet fb">{pixelRects(GIRL_FEET_B, 22)}</g>
        </>
      )}
      <g className="blink">
        <rect x="6" y="7" width="1" height="1" fill={PAL.s} />
        <rect x="9" y="7" width="1" height="1" fill={PAL.s} />
      </g>
    </svg>
  );
}
