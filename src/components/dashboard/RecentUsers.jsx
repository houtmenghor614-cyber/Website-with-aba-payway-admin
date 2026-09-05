import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Users } from "lucide-react";
import { getAdminUsers } from "../../api/adminApi";
import { initials } from "../../utils/constants";
import formatDate from "../../utils/formatDate";

export default function RecentUsers({ limit = 5 }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAdminUsers({ page: 1, page_size: limit })
      .then((d) => setUsers(d.items || []))
      .catch(() => setUsers([]));
  }, [limit]);

  return (
    <div className="bg-white rounded-2xl border border-ink-100 shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
        <p className="font-display font-bold text-ink-800 flex items-center gap-2">
          <Users className="w-4 h-4 text-primary-600" />
          New customers
        </p>
        <Link to="/admin/users" className="text-xs font-bold text-primary-600 hover:text-primary-700 inline-flex items-center">
          View all <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="divide-y divide-ink-50">
        {users.length === 0 && <p className="px-5 py-8 text-center text-sm text-ink-400">No customers yet</p>}
        {users.map((user) => (
          <Link key={user.id} to={`/admin/users/${user.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-ink-50 transition">
            <span className="w-9 h-9 rounded-full bg-ink-100 text-ink-600 flex items-center justify-center text-xs font-extrabold shrink-0">
              {initials(user.full_name || user.email)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink-800 truncate">{user.full_name || "Customer"}</p>
              <p className="text-xs text-ink-400 truncate">{user.email}</p>
            </div>
            <span className="text-xs text-ink-400">{formatDate(user.created_at)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
