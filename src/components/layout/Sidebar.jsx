import React from "react";
import { NavLink } from "react-router-dom";
import {
  BadgePercent,
  BarChart3,
  Bell,
  Box,
  CreditCard,
  ExternalLink,
  FolderTree,
  Image as ImageIcon,
  LayoutDashboard,
  Package,
  Receipt,
  Send,
  Settings,
  Shirt,
  Star,
  Users,
} from "lucide-react";
import { SIDEBAR_MENU } from "../../data/sidebarMenu";
import { LOGO_URL } from "../../utils/constants";

const icons = {
  layoutDashboard: LayoutDashboard,
  barChart3: BarChart3,
  shirt: Shirt,
  folderTree: FolderTree,
  badgePercent: BadgePercent,
  image: ImageIcon,
  box: Box,
  package: Package,
  creditCard: CreditCard,
  receipt: Receipt,
  users: Users,
  star: Star,
  bell: Bell,
  send: Send,
  settings: Settings,
};

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-ink-900 text-ink-300 z-40">
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        <img src={LOGO_URL} alt="Admin" className="h-8 w-auto" />
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {SIDEBAR_MENU.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-ink-500">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = icons[item.icon] || LayoutDashboard;
                return (
                  <li key={item.label + item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                          isActive
                            ? "bg-primary-600 text-white shadow-pop"
                            : "text-ink-300 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white py-2.5 transition"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View storefront
        </a>
      </div>
    </aside>
  );
}
