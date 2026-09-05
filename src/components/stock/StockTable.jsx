import React from "react";
import { History, SlidersHorizontal } from "lucide-react";
import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";
import formatCurrency from "../../utils/formatCurrency";
import { imageOrDefault } from "../../utils/constants";

export default function StockTable({ products = [], loading, onAdjust, onHistory }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Threshold</th>
              <th>Sold</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="py-12 text-center text-ink-400">Loading stock...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={7} className="py-12 text-center text-ink-400">No products</td></tr>
            ) : (
              products.map((p) => {
                const low = Number(p.stock) <= Number(p.low_stock_threshold || 0);
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-3 min-w-[220px]">
                        <img src={imageOrDefault(p.main_image)} alt="" className="w-10 h-10 rounded-lg object-cover bg-ink-50" />
                        <span className="font-bold text-ink-800 line-clamp-1">{p.name}</span>
                      </div>
                    </td>
                    <td className="text-ink-500">{p.sku || "—"}</td>
                    <td className="font-bold text-ink-800">{formatCurrency(p.price)}</td>
                    <td>
                      <StatusBadge label={`${p.stock} units`} badge={low ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"} />
                    </td>
                    <td className="text-ink-500">{p.low_stock_threshold || 0}</td>
                    <td className="text-ink-600">{p.sold || 0}</td>
                    <td>
                      <div className="flex justify-end gap-1">
                        {onHistory && (
                          <Button variant="ghost" size="xs" onClick={() => onHistory?.(p)} aria-label="History">
                            <History className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="xs" onClick={() => onAdjust?.(p)} icon={SlidersHorizontal}>
                          Adjust
                        </Button>
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

