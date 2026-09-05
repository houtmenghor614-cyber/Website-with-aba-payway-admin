import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import formatDateTime from "../../utils/formatDate";

export default function ReceiptDetails({ receipt }) {
  if (!receipt) return null;
  return (
    <dl className="grid grid-cols-2 gap-3 text-sm">
      <div><dt className="text-xs text-ink-400">Receipt</dt><dd className="font-mono font-bold text-ink-800">{receipt.receipt_number}</dd></div>
      <div><dt className="text-xs text-ink-400">Type</dt><dd className="capitalize text-ink-600">{receipt.receipt_type}</dd></div>
      <div><dt className="text-xs text-ink-400">Order</dt><dd className="text-ink-600">#{receipt.order_number || receipt.order_id}</dd></div>
      <div><dt className="text-xs text-ink-400">Customer</dt><dd className="text-ink-600">{receipt.user_name || `#${receipt.user_id}`}</dd></div>
      <div><dt className="text-xs text-ink-400">Amount</dt><dd className="font-extrabold text-ink-900">{formatCurrency(receipt.amount)}</dd></div>
      <div><dt className="text-xs text-ink-400">Issued</dt><dd>{formatDateTime(receipt.issued_at)}</dd></div>
    </dl>
  );
}
