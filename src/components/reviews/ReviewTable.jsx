import React from "react";
import { Eye, Star, Trash2 } from "lucide-react";
import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";
import formatDate from "../../utils/formatDate";

export default function ReviewTable({ reviews = [], loading, onView, onDelete, onToggle }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="py-12 text-center text-ink-400">Loading reviews...</td></tr>
            ) : reviews.length === 0 ? (
              <tr><td colSpan={7} className="py-12 text-center text-ink-400">No reviews found</td></tr>
            ) : (
              reviews.map((r) => (
                <tr key={r.id}>
                  <td className="text-ink-700">{r.user_name || `User #${r.user_id}`}</td>
                  <td className="text-ink-600 max-w-[200px] truncate">{r.product_name || `#${r.product_id}`}</td>
                  <td>
                    <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {r.rating}
                    </span>
                  </td>
                  <td className="text-ink-500 max-w-[240px] truncate">{r.comment || "—"}</td>
                  <td className="text-ink-500">{formatDate(r.created_at)}</td>
                  <td>
                    <StatusBadge
                      label={r.is_approved ? "Approved" : "Pending"}
                      badge={r.is_approved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}
                    />
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="xs" onClick={() => onView?.(r)}><Eye className="w-4 h-4" /></Button>
                      {!r.is_approved && (
                        <Button variant="ghost" size="xs" className="text-emerald-600" onClick={() => onToggle?.(r, true)}>
                          Approve
                        </Button>
                      )}
                      <Button variant="ghost" size="xs" className="text-rose-500" onClick={() => onDelete?.(r)}><Trash2 className="w-4 h-4" /></Button>
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
