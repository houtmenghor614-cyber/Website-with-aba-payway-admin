import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";

const TABS = [
  { to: "/admin/settings", label: "Store", end: true },
  { to: "/admin/settings/about", label: "About" },
  { to: "/admin/settings/contact", label: "Contact" },
  { to: "/admin/settings/payments", label: "Payments" },
  { to: "/admin/settings/telegram", label: "Telegram" },
  { to: "/admin/settings/profile", label: "Profile" },
  { to: "/admin/settings/security", label: "Security" },
];

export default function Settings() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Configure the store, payments, bot and your account" />
      <div className="flex flex-wrap gap-1.5 mb-5 bg-white rounded-xl border border-ink-100 p-1.5 w-fit">
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-lg text-sm font-bold transition ${
                isActive ? "bg-primary-600 text-white" : "text-ink-600 hover:bg-ink-100"
              }`
            }
          >
            {t.label}
          </NavLink>
        ))}
      </div>
      <div className="max-w-3xl">
        <Outlet />
      </div>
    </div>
  );
}
