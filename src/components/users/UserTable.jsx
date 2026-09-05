import React from "react";
import { Link } from "react-router-dom";
import { Eye, ToggleLeft, ToggleRight } from "lucide-react";
import Button from "../common/Button";
import UserStatusBadge from "./UserStatus";
import formatDate from "../../utils/formatDate";
import { initials } from "../../utils/constants";

export default function UserTable({ users = [], loading, onToggle, busyId }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Telegram</th>
              <th>Joined</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="py-12 text-center text-ink-400">Loading customers...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={7} className="py-12 text-center text-ink-400">No customers found</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center text-xs font-extrabold shrink-0">
                        {initials(user.full_name || user.email)}
                      </span>
                      <span className="font-bold text-ink-800">{user.full_name || "—"}</span>
                    </div>
                  </td>
                  <td>
                    <span className="block text-ink-600">{user.email}</span>
                    {user.phone && <span className="text-xs text-ink-400">{user.phone}</span>}
                  </td>
                  <td>
                    <span className="capitalize text-ink-600">{user.role}</span>
                  </td>
                  <td className="text-ink-500">{user.telegram_chat_id ? "Linked" : "—"}</td>
                  <td className="text-ink-500">{formatDate(user.created_at)}</td>
                  <td><UserStatusBadge active={user.is_active} /></td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <Link to={`/admin/users/${user.id}`} className="p-1.5 text-ink-400 hover:text-primary-600" aria-label="View">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => onToggle?.(user)}
                        disabled={busyId === user.id}
                        title={user.is_active ? "Disable account" : "Enable account"}
                      >
                        {user.is_active ? (
                          <ToggleRight className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-ink-400" />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
