import React, { useEffect, useState } from "react";
import { getCustomersReport } from "../../api/reportApi";
import { initials } from "../../utils/constants";
import Loader from "../common/Loader";
import formatDate from "../../utils/formatDate";

export default function CustomerReport() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    getCustomersReport({ page_size: 50 })
      .then((d) => setUsers(d.items || []))
      .catch(() => setUsers([]));
  }, []);

  if (users === null) return <Loader text="Loading customer report..." />;

  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-ink-100">
        <p className="font-display font-bold text-ink-800">New customers</p>
        <p className="text-xs text-ink-400">{users.length} latest registrations</p>
      </div>
      <div className="divide-y divide-ink-50 max-h-80 overflow-y-auto">
        {users.length === 0 && <p className="text-sm text-ink-400 py-8 text-center">No customers yet.</p>}
        {users.map((u) => (
          <div key={u.id} className="flex items-center gap-3 px-5 py-2.5">
            <span className="w-8 h-8 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center text-xs font-extrabold">
              {initials(u.full_name || u.email)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-ink-800 truncate">{u.full_name || u.email}</p>
              <p className="text-xs text-ink-400 truncate">{u.email}</p>
            </div>
            <span className="text-xs text-ink-400">{formatDate(u.created_at)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
