import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";
import { assetUrl } from "../../utils/constants";

export default function BannerTable({ banners = [], onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Banner</th>
              <th>Position</th>
              <th>Link</th>
              <th>Order</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.length === 0 ? (
              <tr><td colSpan={6} className="py-12 text-center text-ink-400">No banners yet</td></tr>
            ) : (
              banners.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div className="flex items-center gap-3 min-w-[220px]">
                      <img src={assetUrl(b.image)} alt="" className="w-24 h-12 rounded-lg object-cover bg-ink-50 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-ink-800 line-clamp-1">{b.title || "Untitled"}</p>
                        {b.subtitle && <p className="text-xs text-ink-400 line-clamp-1">{b.subtitle}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="text-ink-600">{b.position}</td>
                  <td className="text-ink-500 max-w-[160px] truncate">{b.link || "—"}</td>
                  <td className="text-ink-500">{b.sort_order}</td>
                  <td>
                    <StatusBadge label={b.is_active ? "Active" : "Hidden"} badge={b.is_active ? "bg-emerald-100 text-emerald-700" : "bg-ink-100 text-ink-500"} />
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="xs" onClick={() => onEdit?.(b)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="xs" onClick={() => onDelete?.(b)} className="text-rose-500"><Trash2 className="w-4 h-4" /></Button>
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
