import React from "react";
import StatusBadge from "../common/StatusBadge";
import PaymentStatusBadge from "./PaymentStatus";
import formatCurrency from "../../utils/formatCurrency";
import formatDateTime from "../../utils/formatDate";
import { PAYMENT_PROVIDERS } from "../../data/paymentStatus";

export default function PaymentDetails({ payment }) {
  if (!payment) return null;
  const provider = PAYMENT_PROVIDERS[payment.provider];
  return (
    <div className="space-y-3 text-sm">
      <div className="flex items-center gap-3">
        <span className="font-bold text-ink-800">Status</span>
        <PaymentStatusBadge status={payment.status} />
      </div>
      <dl className="grid grid-cols-2 gap-3">
        <div><dt className="text-xs text-ink-400">Payment ID</dt><dd className="font-bold text-ink-800">{payment.id}</dd></div>
        <div><dt className="text-xs text-ink-400">Order ID</dt><dd className="font-bold text-ink-800">{payment.order_id}</dd></div>
        <div className="col-span-2"><dt className="text-xs text-ink-400">Transaction</dt><dd className="font-mono text-xs">{payment.transaction_id}</dd></div>
        {payment.provider_transaction_id && (
          <div className="col-span-2"><dt className="text-xs text-ink-400">Gateway reference</dt><dd className="font-mono text-xs">{payment.provider_transaction_id}</dd></div>
        )}
        <div><dt className="text-xs text-ink-400">Provider</dt><dd>{provider ? <StatusBadge label={provider.label} badge={provider.badge} /> : payment.provider}</dd></div>
        <div><dt className="text-xs text-ink-400">Amount</dt><dd className="font-extrabold text-ink-900">{formatCurrency(payment.amount)}</dd></div>
        <div><dt className="text-xs text-ink-400">Created</dt><dd>{formatDateTime(payment.created_at)}</dd></div>
        <div><dt className="text-xs text-ink-400">Paid at</dt><dd>{payment.paid_at ? formatDateTime(payment.paid_at) : "—"}</dd></div>
        <div><dt className="text-xs text-ink-400">Checks</dt><dd>{payment.check_count || 0}</dd></div>
        <div className="col-span-2"><dt className="text-xs text-ink-400">Remark</dt><dd>{payment.remark || "—"}</dd></div>
      </dl>
      {payment.checkout_url && (
        <a href={payment.checkout_url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary-600 underline">
          Open checkout URL
        </a>
      )}
    </div>
  );
}
