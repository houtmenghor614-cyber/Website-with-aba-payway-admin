import React from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";
import formatCurrency from "../../utils/formatCurrency";
import { imageOrDefault } from "../../utils/constants";

export default function ProductTable({ products = [], loading, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-ink-400">Loading...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-ink-400">No products found</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-3 min-w-[220px]">
                      <img src={imageOrDefault(p.main_image)} alt="" className="w-11 h-11 rounded-lg object-cover bg-ink-50 shrink-0" />
                      <Link to={`/admin/products/${p.id}`} className="font-bold text-ink-800 hover:text-primary-600 line-clamp-1">
                        {p.name}
                      </Link>
                    </div>
                  </td>
                  <td className="text-ink-500">{p.sku || "—"}</td>
                  <td className="text-ink-500">{p.category?.name || "—"}</td>
                  <td className="font-bold text-ink-800">
                    {formatCurrency(p.price)}
                    {p.old_price && <span className="ml-1 text-xs text-ink-400 line-through">{formatCurrency(p.old_price)}</span>}
                  </td>
                  <td>
                    <StatusBadge
                      label={String(p.stock)}
                      badge={p.stock <= (p.low_stock_threshold || 0) ? "bg-rose-100 text-rose-700" : "bg-ink-100 text-ink-600"}
                    />
                  </td>
                  <td className="text-ink-500">{p.sold || 0}</td>
                  <td>
                    <StatusBadge label={p.is_active ? "Active" : "Hidden"} badge={p.is_active ? "bg-emerald-100 text-emerald-700" : "bg-ink-100 text-ink-500"} />
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <Link to={`/admin/products/${p.id}`} className="p-1.5 text-ink-400 hover:text-primary-600" aria-label="View">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link to={`/admin/products/${p.id}/edit`} className="p-1.5 text-ink-400 hover:text-sky-600" aria-label="Edit">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <Button variant="ghost" size="xs" onClick={() => onDelete?.(p)} aria-label="Delete" className="text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
