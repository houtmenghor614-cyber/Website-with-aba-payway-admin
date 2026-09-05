import React from "react";
import { Link } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { SIDEBAR_MENU } from "../../data/sidebarMenu";
import { LOGO_URL } from "../../utils/constants";
import useAuth from "../../hooks/useAuth";
import { iconFor } from "../../data/sidebarMenu";

export default function MobileSidebar({ open, onClose }) {
  const { logout } = useAuth();
  if (!open) return null;

  const signOut = () => {
    onClose();
    logout();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" aria-label="Close menu" onClick={onClose} className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" />
      <aside className="absolute left-0 top-0 h-full w-72 bg-ink-900 text-ink-300 flex flex-col shadow-2xl">
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <img src={LOGO_URL} alt="Admin" className="h-8 w-auto" />
          <button type="button" onClick={onClose} aria-label="Close" className="p-2 text-ink-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
          {SIDEBAR_MENU.map((group) => (
            <div key={group.label}>
              <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-ink-500">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = iconFor(item.icon);
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-white/5 hover:text-white"
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            type="button"
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-sm font-bold py-2.5"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
    </div>
  );
}
