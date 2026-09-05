import React from "react";

export default function OrdersChart({ series = [], title = "Orders (7 days)" }) {
  const max = Math.max(1, ...series.map((s) => Number(s.orders) || 0));
  return (
    <div className="bg-white rounded-2xl border border-ink-100 shadow-card p-5">
      <p className="font-display font-bold text-ink-800">{title}</p>
      {series.length === 0 ? (
        <p className="py-10 text-center text-sm text-ink-400">No orders yet</p>
      ) : (
        <div className="mt-6 flex items-end gap-2 h-44">
          {series.map((point) => (
            <div key={point.label} className="flex-1 flex flex-col items-center gap-1 group">
              <span className="text-[10px] text-ink-500 font-bold">{point.orders}</span>
              <div
                className="w-full max-w-[42px] rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:from-emerald-700 transition-all"
                style={{ height: `${Math.max(4, (Number(point.orders) / max) * 120)}px` }}
              />
              <span className="text-[10px] text-ink-400">{point.label.slice(5)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
