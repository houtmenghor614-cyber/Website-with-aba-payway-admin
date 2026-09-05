import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import Button from "../common/Button";
import { imageOrDefault } from "../../utils/constants";

export default function CategoryTable({ categories = [], onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Slug</th>
              <th>Products</th>
              <th>Order</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr><td colSpan={6} className="text-center py-10 text-ink-400">No categories</td></tr>
            )}
            {categories.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={imageOrDefault(c.image)} alt="" className="w-10 h-10 rounded-lg object-cover bg-ink-50" />
                    <span className="font-bold text-ink-800">{c.name}</span>
                  </div>
                </td>
                <td className="text-ink-500">{c.slug}</td>
                <td>{c.product_count ?? 0}</td>
                <td className="text-ink-500">{c.sort_order ?? 0}</td>
                <td>
                  <StatusBadge label={c.is_active ? "Active" : "Hidden"} badge={c.is_active ? "bg-emerald-100 text-emerald-700" : "bg-ink-100 text-ink-500"} />
                </td>
                <td>
                  <div className="flex justify-end gap-1">
                    <Link to={`/admin/categories/${c.id}/edit`} className="p-1.5 text-ink-400 hover:text-sky-600" aria-label="Edit">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <Button variant="ghost" size="xs" onClick={() => onDelete?.(c)} className="text-rose-500" aria-label="Delete">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
