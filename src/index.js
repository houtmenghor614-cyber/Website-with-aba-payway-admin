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

// Deter casual DevTools access: hide the right-click context menu (so the
// browser's "Inspect" entry is not shown) and block common DevTools keyboard
// shortcuts (F12, Ctrl/Cmd+Shift+I/J/C, Ctrl/Cmd+U). This is only a casual
// deterrent - it cannot stop someone who knows how to use browser menus.
window.addEventListener("contextmenu", (event) => event.preventDefault());
window.addEventListener("keydown", (event) => {
  const k = (event.key || "").toUpperCase();
  const isDevShortcut =
    k === "F12" ||
    (event.ctrlKey && event.shiftKey && ["I", "J", "C", "K"].includes(k)) ||
    (event.metaKey && event.altKey && ["I", "J", "C", "U"].includes(k)) ||
    ((event.ctrlKey || event.metaKey) && k === "U");
  if (isDevShortcut) {
    event.preventDefault();
    return false;
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
