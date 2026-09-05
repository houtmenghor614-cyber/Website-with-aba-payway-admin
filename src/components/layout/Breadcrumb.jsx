import React from "react";
import { useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { NAVIGATION } from "../../data/navigation";

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  // strip "admin"
  const parts = segments[0] === "admin" ? segments.slice(1) : segments;

  const links = parts.map((segment, index) => {
    const full = `/${segments.slice(0, segments.length - parts.length + index + 1).join("/")}`;
    const match = NAVIGATION.find((n) => n.to === full) || {
      label: decodeURIComponent(segment).replace(/-/g, " "),
    };
    const label = /^\d+$/.test(segment)
      ? `#${segment}`
      : match.label;
    return { to: full, label };
  });

  return (
    <nav className="flex items-center gap-1 text-xs font-semibold text-ink-500 min-w-0">
      <Home className="w-3.5 h-3.5 text-ink-400 shrink-0" />
      <span className="text-ink-400">Admin</span>
      {links.map((link, i) => (
        <React.Fragment key={i}>
          <ChevronRight className="w-3.5 h-3.5 text-ink-300" />
          {i === links.length - 1 ? (
            <span className="text-ink-700 font-bold capitalize truncate max-w-[160px]">
              {link.label}
            </span>
          ) : (
            <span className="capitalize truncate max-w-[100px]">{link.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
