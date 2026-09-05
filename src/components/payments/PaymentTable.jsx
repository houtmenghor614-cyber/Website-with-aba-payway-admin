import React from "react";
import { Eye, RefreshCw } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import Button from "../common/Button";
import PaymentStatusBadge from "./PaymentStatus";
import formatCurrency from "../../utils/formatCurrency";
import formatDateTime from "../../utils/formatDate";
import { PAYMENT_PROVIDERS } from "../../data/paymentStatus";

export default function PaymentTable({ payments = [], loading, onView, onSync, syncingId }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Provider</th>
              <th>Order</th>
              <th>Amount</th>
              <th>Created</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="py-12 text-center text-ink-400">Loading payments...</td></tr>
            ) : payments.length === 0 ? (
              <tr><td colSpan={7} className="py-12 text-center text-ink-400">No payments found</td></tr>
            ) : (
              payments.map((p) => {
                const provider = PAYMENT_PROVIDERS[p.provider];
                return (
                  <tr key={p.id}>
                    <td><span className="font-mono text-xs font-bold text-ink-800">{p.transaction_id}</span></td>
                    <td>
                      {provider ? (
                        <StatusBadge label={provider.label} badge={provider.badge} />
                      ) : (
                        <span className="text-ink-500">{p.provider}</span>
                      )}
                    </td>
                    <td className="text-ink-600">{p.order_id}</td>
                    <td className="font-bold text-ink-800">{formatCurrency(p.amount)}</td>
                    <td className="text-ink-500">{formatDateTime(p.created_at)}</td>
                    <td><PaymentStatusBadge status={p.status} /></td>
                    <td>
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="xs" onClick={() => onSync?.(p.id)} disabled={syncingId === p.id} title="Sync with gateway">
                          <RefreshCw className={`w-4 h-4 ${syncingId === p.id ? "animate-spin" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="xs" onClick={() => onView?.(p)} aria-label="View">
                          <Eye className="w-4 h-4" />
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
