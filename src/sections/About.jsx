import Typing from "../components/Typing.jsx";
import React from "react";

export default function About({ photo, flower }) {
  return (
    <section className="section" id="about">
      <div className="container about reveal">
        <div className="about-photo">
          <img src={flower} alt="" className="about-flower" aria-hidden="true" />
          <img src={photo} alt="Annisa" />
        </div>
        <div className="card about-card">
          <h2 className="display h2"><Typing text="About Me" speed={75} /></h2>
          <p className="about-intro">
            Hi! I'm Annisa Aulia Rahmah, a Computer Science student at BINUS University.
          </p>
          <p>
            On the design side, I map user flows, design interfaces, and craft the components a product needs. 
            On the engineering side, I turn those designs into clean, functional code. 
            In my university and group projects I take part in both, so the final result stays true to the original idea.
          </p>
          <p>
            I'm drawn to product development, where design thinking and technical skills meet. 
            I'm continuously learning through real-world projects to build products that are well-structured, 
            intuitive, and enjoyable to use.
          </p>
        </div>
      </div>
    </section>
  );
}
