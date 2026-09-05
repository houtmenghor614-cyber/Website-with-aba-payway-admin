import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

export default function CouponTable({ coupons = [], onEdit, onDelete, loading }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Used</th>
              <th>Expires</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="py-12 text-center text-ink-400">Loading coupons...</td></tr>
            ) : coupons.length === 0 ? (
              <tr><td colSpan={7} className="py-12 text-center text-ink-400">No coupons yet</td></tr>
            ) : (
              coupons.map((c) => {
                const active =
                  c.is_active &&
                  (!c.expires_at || new Date(c.expires_at) > new Date()) &&
                  (!c.usage_limit || c.used_count < c.usage_limit);
                return (
                  <tr key={c.id}>
                    <td><span className="font-mono font-extrabold text-ink-900">{c.code}</span></td>
                    <td className="capitalize text-ink-600">{c.discount_type}</td>
                    <td className="font-bold text-ink-800">
                      {c.discount_type === "fixed" ? formatCurrency(c.discount_value) : `${c.discount_value}%`}
                    </td>
                    <td className="text-ink-600">{c.used_count}{c.usage_limit ? ` / ${c.usage_limit}` : ""}</td>
                    <td className="text-ink-500">{c.expires_at ? formatDate(c.expires_at) : "Never"}</td>
                    <td>
                      <StatusBadge label={active ? "Active" : "Inactive"} badge={active ? "bg-emerald-100 text-emerald-700" : "bg-ink-100 text-ink-500"} />
                    </td>
                    <td>
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="xs" onClick={() => onEdit?.(c)} aria-label="Edit"><Pencil className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="xs" onClick={() => onDelete?.(c)} className="text-rose-500" aria-label="Delete"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
