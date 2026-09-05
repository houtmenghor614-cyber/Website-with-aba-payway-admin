import React from "react";
import UserStatusBadge from "./UserStatus";
import Button from "../common/Button";
import formatDate from "../../utils/formatDate";
import { Mail, Phone, Send } from "lucide-react";

export default function UserDetails({ user, onToggle, busy = false }) {
  if (!user) return null;
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <div className="lg:col-span-1 bg-white rounded-2xl border border-ink-100 p-6 text-center">
        <span className="mx-auto w-20 h-20 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center text-xl font-extrabold">
          {(user.full_name || user.email || "U").slice(0, 1).toUpperCase()}
        </span>
        <h2 className="font-display font-extrabold text-lg text-ink-900 mt-3">{user.full_name || "Customer"}</h2>
        <p className="text-sm text-ink-400">@{user.email?.split("@")[0]}</p>
        <div className="mt-4">
          <UserStatusBadge active={user.is_active} />
        </div>
      </div>
      <div className="lg:col-span-2 bg-white rounded-2xl border border-ink-100 p-6">
        <h3 className="font-display font-bold text-ink-900 mb-4">Contact information</h3>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-ink-400" />
            <dt className="text-ink-500 w-24">Email</dt>
            <dd className="font-bold text-ink-800">{user.email}</dd>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-ink-400" />
            <dt className="text-ink-500 w-24">Phone</dt>
            <dd className="font-bold text-ink-800">{user.phone || "—"}</dd>
          </div>
          <div className="flex items-center gap-3">
            <Send className="w-4 h-4 text-ink-400" />
            <dt className="text-ink-500 w-24">Telegram</dt>
            <dd className="font-bold text-ink-800">{user.telegram_chat_id || "Not linked"}</dd>
          </div>
        </dl>
        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-ink-50 rounded-xl p-3">
            <p className="text-xs text-ink-400">Role</p>
            <p className="font-bold text-ink-800 capitalize">{user.role}</p>
          </div>
          <div className="bg-ink-50 rounded-xl p-3">
            <p className="text-xs text-ink-400">Member since</p>
            <p className="font-bold text-ink-800">{formatDate(user.created_at)}</p>
          </div>
        </div>
        <div className="mt-6">
          <Button variant={user.is_active ? "danger" : "success"} onClick={onToggle} loading={busy}>
            {user.is_active ? "Disable account" : "Enable account"}
          </Button>
        </div>
      </div>
    </div>
  );
}
