import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./assets/styles/custom.css";
import App from "./App";

// Global image fallback: any <img> that fails to load swaps to a local asset.
window.__FALLBACK_IMG = `${process.env.PUBLIC_URL || ""}/assets/images/placeholder.png`;
window.addEventListener(
  "error",
  (event) => {
    const target = event.target;
    if (target && target.tagName === "IMG" && !target.dataset.fb) {
      target.dataset.fb = "1";
      if (window.__FALLBACK_IMG) target.src = window.__FALLBACK_IMG;
    }
  },
  true
);

// Deter casual DevTools access is intentionally DISABLED during development
// so the owner can inspect the page. Re-enable later for production if wanted.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
