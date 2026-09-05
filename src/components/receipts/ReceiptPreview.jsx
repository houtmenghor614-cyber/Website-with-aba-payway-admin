import React from "react";
import { Receipt } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";
import formatDateTime from "../../utils/formatDate";

/** Simple receipt visual used inside the detail modal. */
export default function ReceiptPreview({ receipt }) {
  if (!receipt) return null;
  return (
    <div className="border border-dashed border-ink-300 rounded-xl p-5 text-center max-w-sm mx-auto">
      <Receipt className="w-8 h-8 text-primary-600 mx-auto mb-2" />
      <p className="font-display font-extrabold text-ink-900">{receipt.receipt_number}</p>
      <p className="text-xs text-ink-400 mt-1">T-Shirt Cambodia</p>
      <div className="mt-4 space-y-1 text-sm">
        <p className="flex justify-between"><span className="text-ink-400">Order</span><span className="font-bold">#{receipt.order_number || receipt.order_id}</span></p>
        <p className="flex justify-between"><span className="text-ink-400">Customer</span><span className="font-bold">{receipt.user_name || `#${receipt.user_id}`}</span></p>
        <p className="flex justify-between"><span className="text-ink-400">Amount</span><span className="font-extrabold text-primary-700">{formatCurrency(receipt.amount)}</span></p>
        <p className="flex justify-between text-xs"><span className="text-ink-400">Issued</span><span>{formatDateTime(receipt.issued_at)}</span></p>
      </div>
    </div>
  );
}
