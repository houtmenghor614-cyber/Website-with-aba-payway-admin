import React, { useEffect, useState } from "react";
import { getPaymentsReport } from "../../api/reportApi";
import PaymentStatusBadge from "../payments/PaymentStatus";
import formatCurrency from "../../utils/formatCurrency";
import Loader from "../common/Loader";

export default function PaymentReport() {
  const [payments, setPayments] = useState(null);
  useEffect(() => {
    getPaymentsReport().then(setPayments).catch(() => setPayments([]));
  }, []);

  if (payments === null) return <Loader text="Loading payment report..." />;

  const counts = {};
  let total = 0;
  payments.forEach((p) => {
    counts[p.status] = (counts[p.status] || 0) + 1;
    if (p.status === "success") total += Number(p.amount) || 0;
  });

  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-5">
      <p className="font-display font-bold text-ink-800">Payments</p>
      <p className="text-2xl font-extrabold text-emerald-600 mt-1">{formatCurrency(total)}</p>
      <p className="text-xs text-ink-400 mb-3">collected from successful payments</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Object.entries(counts).map(([status, count]) => (
          <div key={status} className="flex flex-col items-center rounded-xl bg-ink-50 py-3">
            <PaymentStatusBadge status={status} />
            <span className="mt-1 font-extrabold text-ink-800">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
