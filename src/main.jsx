import React from "react";
import { createRoot } from "react-dom/client";

import App from "./app.jsx";

import "./style/global.css";
import "./style/hero.css";
import "./style/animation.css";
import "./style/about.css";

const root = createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);