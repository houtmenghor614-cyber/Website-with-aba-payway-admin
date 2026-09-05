import React, { useEffect, useState } from "react";
import { getSalesReport } from "../../api/reportApi";
import formatCurrency from "../../utils/formatCurrency";
import Loader from "../common/Loader";

export default function SalesReport() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getSalesReport().then(setData).catch(() => setData(null));
  }, []);

  if (!data) return <Loader text="Loading sales..." />;
  const series = data.sales_last_7_days || [];
  const total = series.reduce((sum, p) => sum + Number(p.revenue || 0), 0);
  const max = Math.max(1, ...series.map((s) => Number(s.revenue) || 0));

  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-5">
      <p className="font-display font-bold text-ink-800">Sales (last 7 days)</p>
      <p className="text-2xl font-extrabold text-primary-700 mt-1">{formatCurrency(total)}</p>
      <div className="mt-4 flex items-end gap-2 h-40">
        {series.map((p) => (
          <div key={p.label} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-ink-500">{formatCurrency(p.revenue)}</span>
            <div className="w-full rounded bg-primary-200" style={{ height: `${Math.max(3, (Number(p.revenue) / max) * 100)}px` }} />
            <span className="text-[10px] text-ink-400">{p.label.slice(5)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
