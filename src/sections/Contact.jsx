import Decor from "../components/Decor.jsx";
import Typing from "../components/Typing.jsx";
import React, { useState } from "react";

const portfolioPdf = new URL("../assets/files/AnnisaPorto.pdf", import.meta.url).href;
const cvPdf = new URL("../assets/files/AnnisaCV.pdf", import.meta.url).href;
const EMAIL = "nisaauliarmh@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); }
    catch { window.prompt("Copy email:", EMAIL); return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="section" id="contact">
      <Decor set="contact" />
      <div className="container reveal">
        <div className="card contact-card">
          <h2 className="display h2 center"><Typing text="Let's Connect" speed={75} /></h2>
          <p className="center muted">Thank you for visiting — feel free to reach out!</p>

          <div className="contact-email">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button className="btn btn-ghost sm" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>
          </div>

          <div className="btn-row center-row">
            <a className="btn btn-ghost" href="https://github.com/AnnisaAulia12" target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/annisa-aulia-rahmah-3308582b7/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>

          <hr />

          <div className="doc-grid">
            {[["Portfolio", portfolioPdf, "Annisa-Portofolio.pdf"], ["CV", cvPdf, "Annisa-Aulia-Rahmah-CV.pdf"]].map(
              ([label, href, file]) => (
                <div className="doc" key={label}>
                  <a className="btn btn-primary" href={href} target="_blank" rel="noreferrer">View {label}</a>
                  <a className="btn btn-ghost sm" href={href} download={file} aria-label={`Download ${label}`}>↓</a>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
