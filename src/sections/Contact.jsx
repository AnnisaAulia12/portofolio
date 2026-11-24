import React, { useState } from "react";
import Section from "./Section.jsx";
import PixelIcon from "../world/pixels.jsx";
import { SPRITES } from "../world/sprites.js";
import { PROFILE } from "../data/profile.js";

const portfolioPdf = new URL("../assets/files/AnnisaPorto.pdf", import.meta.url).href;
const cvPdf = new URL("../assets/files/AnnisaCV.pdf", import.meta.url).href;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); }
    catch { window.prompt("Copy email:", PROFILE.email); return; }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Section id="contact" title="Say Hello" hint="the mailbox is open">
      <article className="paper clip clip-m letter">
        <PixelIcon rows={SPRITES.mail} size={8} className="letter-icon" />
        <p>Thank you for visiting — feel free to reach out!</p>
        <div className="mail-row">
          <a className="mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <button className="pbtn sm" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>
        </div>
        <div className="btn-row center">
          <a className="pbtn" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="pbtn" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
        <div className="btn-row center">
          <a className="pbtn pink" href={cvPdf} target="_blank" rel="noreferrer">View CV</a>
          <a className="pbtn" href={cvPdf} download="Annisa-Aulia-Rahmah-CV.pdf">Download CV</a>
          <a className="pbtn yellow" href={portfolioPdf} target="_blank" rel="noreferrer">Portfolio PDF</a>
        </div>
        <p className="made">© 2026 {PROFILE.name} · made with pixels &amp; flowers</p>
      </article>
    </Section>
  );
}
