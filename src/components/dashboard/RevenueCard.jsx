import React from "react";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";

export default function RevenueCard({ total, today, series = [] }) {
  const delta = series.length >= 2 ? series[series.length - 1].revenue - series[series.length - 2].revenue : 0;
  const up = delta >= 0;
  return (
    <div className="bg-gradient-to-br from-primary-600 to-indigo-800 rounded-2xl shadow-pop text-white p-5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-white/70 uppercase tracking-wide">Total revenue</p>
          <p className="mt-2 font-display text-3xl font-extrabold">{formatCurrency(total)}</p>
        </div>
        <span className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
          <Wallet className="w-6 h-6" />
        </span>
      </div>
      <div className="mt-4 flex items-center gap-3 text-xs">
        <span className="inline-flex items-center gap-1 font-bold text-white/90">
          {up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {up ? "+" : ""}{formatCurrency(delta)} vs yesterday
        </span>
        <span className="text-white/70">Today: {formatCurrency(today)}</span>
      </div>
    </div>
  );
}
