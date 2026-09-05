import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  ExternalLink,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNotifications } from "../../context/NotificationContext";
import { initials } from "../../utils/constants";
import { STORE_URL } from "../../data/navigation";

export default function TopNavbar() {
  const { admin, logout } = useAuth();
  const { unread, notifications, load, markAllRead } = useNotifications();
  const navigate = useNavigate();
  const [openNotif, setOpenNotif] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setOpenNotif(false);
      if (userRef.current && !userRef.current.contains(e.target)) setOpenUser(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const signOut = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex items-center gap-1.5">
      {/* notifications */}
      <div className="relative" ref={notifRef}>
        <button
          type="button"
          onClick={() => {
            if (!openNotif) load().catch(() => {});
            setOpenNotif((v) => !v);
          }}
          aria-label="Notifications"
          className="relative p-2 rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-800"
        >
          <Bell className="w-5 h-5" />
          {unread > 0 && (
            <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
        {openNotif && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-ink-100 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-ink-100">
              <p className="text-sm font-bold text-ink-800">Notifications</p>
              {unread > 0 && (
                <button type="button" onClick={markAllRead} className="text-xs font-bold text-primary-600">
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-ink-50">
              {notifications.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-ink-400">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="px-4 py-2.5">
                    <p className="text-xs font-bold text-ink-800">{n.title}</p>
                    <p className="text-xs text-ink-500 line-clamp-2">{n.body}</p>
                  </div>
                ))
              )}
            </div>
            <Link to="/admin/notifications" onClick={() => setOpenNotif(false)} className="block text-center text-xs font-bold text-primary-600 py-3 border-t border-ink-100 hover:bg-ink-50">
              View all
            </Link>
          </div>
        )}
      </div>

      {/* admin menu */}
      <div className="relative" ref={userRef}>
        <button
          type="button"
          onClick={() => setOpenUser((v) => !v)}
          className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-ink-100"
        >
          <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-extrabold">
            {initials(admin?.full_name || admin?.email || "A")}
          </span>
          <span className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-ink-800 leading-tight">
              {admin?.full_name || "Admin"}
            </span>
            <span className="block text-[10px] text-ink-400">Administrator</span>
          </span>
          <ChevronDown className="w-4 h-4 text-ink-400" />
        </button>
        {openUser && (
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-ink-100 py-1.5">
            {[
              { icon: User, label: "Profile", to: "/admin/settings/profile" },
              { icon: Settings, label: "Settings", to: "/admin/settings" },
            ].map(({ icon: Icon, label, to }) => (
              <Link key={label} to={to} onClick={() => setOpenUser(false)} className="flex items-center gap-2.5 px-3.5 py-2 text-sm font-semibold text-ink-600 hover:bg-ink-50">
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <button type="button" onClick={signOut} className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
      </div>

      <a
        href={STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open storefront"
        className="hidden md:inline-flex p-2 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-100"
      >
        <ExternalLink className="w-4.5 h-4.5 w-[18px] h-[18px]" />
      </a>
    </div>
  );
}
