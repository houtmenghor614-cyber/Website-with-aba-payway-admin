import React from "react";
import { Eye } from "lucide-react";
import Button from "../common/Button";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

export default function ReceiptTable({ receipts = [], loading, onView }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Receipt</th>
              <th>Order</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Issued</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="py-12 text-center text-ink-400">Loading receipts...</td></tr>
            ) : receipts.length === 0 ? (
              <tr><td colSpan={6} className="py-12 text-center text-ink-400">No receipts yet</td></tr>
            ) : (
              receipts.map((r) => (
                <tr key={r.id}>
                  <td><span className="font-mono font-bold text-ink-800">{r.receipt_number}</span></td>
                  <td className="text-ink-600">#{r.order_number || r.order_id}</td>
                  <td className="text-ink-600">{r.user_name || `#${r.user_id}`}</td>
                  <td className="font-bold text-ink-800">{formatCurrency(r.amount)}</td>
                  <td className="text-ink-500">{formatDate(r.issued_at)}</td>
                  <td>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="xs" onClick={() => onView?.(r)}><Eye className="w-4 h-4" /></Button>
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
