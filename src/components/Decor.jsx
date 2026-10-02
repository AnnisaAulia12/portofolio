import React from "react";

// path harus statis supaya terbaca Parcel
const F = {
  b1: new URL("../assets/images/bunga1.png", import.meta.url).href,
  b2: new URL("../assets/images/bunga2.png", import.meta.url).href,
  b3: new URL("../assets/images/bunga3.png", import.meta.url).href,
  b5: new URL("../assets/images/bunga5.png", import.meta.url).href,
  k4: new URL("../assets/images/kupu4.png", import.meta.url).href,
};
const SETS = {
  skills: [["b2", "tl"], ["k4", "br"], ["b3", "tr"]],
  experience: [["b3", "tr"], ["b5", "bl"], ["k4", "br"]],
  contact: [["b1", "tl"], ["b5", "br"], ["k4", "tr"]],
};

export default function Decor({ set }) {
  return SETS[set].map(([k, pos], i) => (
    <img key={i} className={`deco deco-${pos} ${k === "k4" ? "flutter" : ""}`} src={F[k]} alt=""
      aria-hidden="true" style={{ animationDelay: `${-i * 2.3}s` }} />
  ));
}
