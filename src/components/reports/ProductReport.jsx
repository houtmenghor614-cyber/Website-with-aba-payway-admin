import React, { useEffect, useState } from "react";
import { getTopProducts } from "../../api/reportApi";
import formatCurrency from "../../utils/formatCurrency";
import Loader from "../common/Loader";
import { imageOrDefault } from "../../utils/constants";

export default function ProductReport() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    getTopProducts(15).then(setItems).catch(() => setItems([]));
  }, []);

  if (items === null) return <Loader text="Loading product report..." />;
  const max = Math.max(1, ...items.map((p) => p.sold || 0));

  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-5">
      <p className="font-display font-bold text-ink-800 mb-3">Top sellers</p>
      <div className="space-y-2">
        {items.length === 0 && <p className="text-sm text-ink-400 py-6 text-center">No sales yet.</p>}
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-3">
            <img src={imageOrDefault(p.main_image)} alt="" className="w-9 h-9 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-ink-800 truncate">{p.name}</p>
              <p className="text-xs text-ink-400">{formatCurrency(p.price)}</p>
            </div>
            <div className="w-24 h-2 rounded-full bg-ink-100 overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(p.sold / max) * 100}%` }} />
            </div>
            <span className="text-sm font-extrabold text-ink-800 w-12 text-right">{p.sold}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
