import React from "react";
import { PROFILE } from "../data/profile.js";
import { SKILLS } from "../data/skills.js";

// Kartu "profile.ts" — isinya diambil dari src/data (tidak ditulis ganda).
const Str = ({ children }) => <span className="tk-s">"{children}"</span>;

export default function CodeCard() {
  const stack = SKILLS[0].items.slice(0, 4);
  const rows = [
    [0, <><span className="tk-k">const</span> <span className="tk-v">profile</span> = {"{"}</>],
    [1, <><span className="tk-p">name</span>: <Str>{PROFILE.name}</Str>,</>],
    [1, <><span className="tk-p">role</span>: <Str>{PROFILE.role}</Str>,</>],
    [1, <><span className="tk-p">school</span>: <Str>{PROFILE.school}</Str>,</>],
    [1, <><span className="tk-p">focus</span>: <Str>{PROFILE.focus}</Str>,</>],
    [1, <><span className="tk-p">stack</span>: [{stack.map((s, i) => <React.Fragment key={s}>{i > 0 && ", "}<Str>{s}</Str></React.Fragment>)}],</>],
    [0, <>{"};"}</>],
  ];

  return (
    <div className="code" aria-hidden="true">
      <div className="code-bar">
        <i /><i /><i />
        <span>profile.ts</span>
      </div>
      <div className="code-body">
        {rows.map(([indent, content], i) => (
          <div className="ln" key={i} style={{ paddingLeft: `${indent * 2}ch` }}>
            <span className="ln-no">{i + 1}</span>
            <span>{content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
