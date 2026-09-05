import React from "react";

const toneMap = {
  primary: { bg: "bg-primary-50 text-primary-600", ring: "ring-primary-100" },
  emerald: { bg: "bg-emerald-50 text-emerald-600", ring: "ring-emerald-100" },
  amber: { bg: "bg-amber-50 text-amber-600", ring: "ring-amber-100" },
  sky: { bg: "bg-sky-50 text-sky-600", ring: "ring-sky-100" },
  rose: { bg: "bg-rose-50 text-rose-600", ring: "ring-rose-100" },
  violet: { bg: "bg-violet-50 text-violet-600", ring: "ring-violet-100" },
};

export default function StatsCard({ icon: Icon, label, value, hint, tone = "primary" }) {
  const t = toneMap[tone] || toneMap.primary;
  return (
    <div className="bg-white rounded-2xl border border-ink-100 shadow-card p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold text-ink-400 uppercase tracking-wide">{label}</p>
          <p className="mt-2 font-display text-2xl font-extrabold text-ink-900 truncate">{value}</p>
        </div>
        <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${t.bg}`}>
          <Icon className="w-5 h-5" />
        </span>
      </div>
      {hint && <p className="mt-2 text-xs text-ink-400">{hint}</p>}
    </div>
  );
}
