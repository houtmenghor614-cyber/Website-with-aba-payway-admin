import React from "react";
import StatusBadge from "../common/StatusBadge";
import formatDate from "../../utils/formatDate";

const movementBadge = {
  in: { label: "In", badge: "bg-emerald-100 text-emerald-700" },
  out: { label: "Out", badge: "bg-rose-100 text-rose-700" },
  adjust: { label: "Adjust", badge: "bg-sky-100 text-sky-700" },
  sale: { label: "Sale", badge: "bg-violet-100 text-violet-700" },
};

export default function StockMovement({ movements = [], loading }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Reference</th>
              <th>Note</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="py-10 text-center text-ink-400">Loading movements...</td></tr>
            ) : movements.length === 0 ? (
              <tr><td colSpan={6} className="py-10 text-center text-ink-400">No stock movements recorded</td></tr>
            ) : (
              movements.map((m) => {
                const meta = movementBadge[m.movement_type] || { label: m.movement_type, badge: "bg-ink-100 text-ink-600" };
                return (
                  <tr key={m.id}>
                    <td className="font-bold text-ink-800">{m.product_name || `#${m.product_id}`}</td>
                    <td><StatusBadge label={meta.label} badge={meta.badge} /></td>
                    <td className={`font-extrabold ${m.quantity < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                      {m.quantity > 0 ? `+${m.quantity}` : m.quantity}
                    </td>
                    <td className="text-ink-500">{m.reference || "—"}</td>
                    <td className="text-ink-500 max-w-[220px] truncate">{m.note || "—"}</td>
                    <td className="text-ink-500">{formatDate(m.created_at)}</td>
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
