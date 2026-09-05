import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import { imageOrDefault } from "../../utils/constants";

export default function OrderItems({ items = [] }) {
  return (
    <div className="divide-y divide-ink-50">
      {items.length === 0 && (
        <p className="text-sm text-ink-400 py-6 text-center">No items on this order.</p>
      )}
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 py-3">
          <img
            src={imageOrDefault(item.product_image)}
            alt=""
            className="w-12 h-12 rounded-lg object-cover bg-ink-50 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-ink-800 line-clamp-1">{item.product_name}</p>
            {item.options_text && (
              <p className="text-xs font-semibold text-primary-600">{item.options_text}</p>
            )}
            <p className="text-xs text-ink-400">
              {formatCurrency(item.unit_price)} x {item.quantity} · SKU {item.sku || "-"}
            </p>
          </div>
          <span className="text-sm font-extrabold text-ink-800">
            {formatCurrency(item.subtotal)}
          </span>
        </div>
      ))}
    </div>
  );
}

