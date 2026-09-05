import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Box } from "lucide-react";
import { getProducts } from "../../api/productApi";
import { imageOrDefault } from "../../utils/constants";

export default function LowStockProducts({ limit = 5 }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getProducts({ page_size: 100, include_inactive: true, sort: "-created_at" })
      .then((d) => {
        const rows = (d.items || []).filter((p) => Number(p.stock) <= Number(p.low_stock_threshold || 0));
        setItems(rows.slice(0, limit));
      })
      .catch(() => setItems([]));
  }, [limit]);

  if (!items.length) return null;

  return (
    <div className="bg-white rounded-2xl border border-amber-200 shadow-card overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-amber-100 bg-amber-50">
        <AlertTriangle className="w-4 h-4 text-amber-600" />
        <p className="font-display font-bold text-ink-800">Low stock alert</p>
      </div>
      <div className="divide-y divide-ink-50">
        {items.map((product) => (
          <Link key={product.id} to={`/admin/stock`} className="flex items-center gap-3 px-5 py-3 hover:bg-ink-50">
            <img src={imageOrDefault(product.main_image)} alt="" className="w-9 h-9 rounded-lg object-cover bg-ink-100" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-ink-800 truncate">{product.name}</p>
              <p className="text-xs text-ink-400">SKU {product.sku || "-"}</p>
            </div>
            <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
              <Box className="w-3.5 h-3.5" />
              {product.stock} left
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
