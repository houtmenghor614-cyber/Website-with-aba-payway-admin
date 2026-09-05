import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { imageOrDefault } from "../../utils/constants";

export default function LowStockAlert({ products = [] }) {
  const low = (products || []).filter((p) => Number(p.stock) <= Number(p.low_stock_threshold || 0));
  if (low.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
        <AlertTriangle className="w-4 h-4" />
        No products below their low stock threshold.
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="px-4 py-3 bg-rose-50 border-b border-rose-100 flex items-center gap-2 text-sm font-bold text-rose-700">
        <AlertTriangle className="w-4 h-4" />
        {low.length} product(s) need restocking
      </div>
      <div className="divide-y divide-ink-50">
        {low.map((p) => (
          <Link key={p.id} to="/admin/stock" className="flex items-center gap-3 px-4 py-3 hover:bg-ink-50">
            <img src={imageOrDefault(p.main_image)} alt="" className="w-9 h-9 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-ink-800 truncate">{p.name}</p>
              <p className="text-xs text-ink-400">{p.sku || "No SKU"}</p>
            </div>
            <span className="text-xs font-bold text-rose-600">{p.stock} left</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
