import React from "react";

// Judul section = papan kayu.
export default function Section({ id, title, hint, children }) {
  return (
    <section className="section reveal" id={id}>
      <div className="wrap">
        <header className="plank-row">
          <h2 className="plank"><span>{title}</span></h2>
          {hint && <p className="plank-hint">{hint}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
