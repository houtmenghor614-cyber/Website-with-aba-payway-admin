import React from "react";
import { Star } from "lucide-react";

export default function ReviewDetails({ review }) {
  if (!review) return null;
  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className={`w-4 h-4 ${i <= review.rating ? "fill-amber-400 text-amber-400" : "text-ink-200"}`} />
        ))}
      </div>
      <p className="text-ink-700 leading-6">{review.comment || "No comment."}</p>
      <dl className="grid grid-cols-2 gap-2 text-xs">
        <div><dt className="text-ink-400">Customer</dt><dd className="font-bold text-ink-800">{review.user_name || `#${review.user_id}`}</dd></div>
        <div><dt className="text-ink-400">Product</dt><dd className="font-bold text-ink-800">{review.product_name || `#${review.product_id}`}</dd></div>
        <div><dt className="text-ink-400">Order</dt><dd className="text-ink-600">{review.order_id || "—"}</dd></div>
        <div><dt className="text-ink-400">Approved</dt><dd className="text-ink-600">{review.is_approved ? "Yes" : "No"}</dd></div>
      </dl>
    </div>
  );
}
