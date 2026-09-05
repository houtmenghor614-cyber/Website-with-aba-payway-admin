import React from "react";

export default function Footer() {
  return (
    <footer className="px-6 py-4 text-center text-xs text-ink-400 border-t border-ink-200 bg-white/60">
      &copy; {new Date().getFullYear()} T-Shirt Cambodia Admin - Built with FastAPI + React
    </footer>
  );
}
