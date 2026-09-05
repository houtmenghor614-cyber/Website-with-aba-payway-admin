import React from "react";
import { CheckCircle2, Clock, Home, Package, RotateCcw, Truck, XCircle, AlertCircle } from "lucide-react";

const iconMap = {
  clock: Clock,
  checkCircle: CheckCircle2,
  package: Package,
  truck: Truck,
  home: Home,
  xCircle: XCircle,
  rotateCcw: RotateCcw,
  alertCircle: AlertCircle,
};

/** Render a pill badge from a label + optional icon name. */
export default function StatusBadge({ label = "Unknown", badge = "bg-ink-100 text-ink-600", icon, className = "" }) {
  const Icon = iconMap[icon] || null;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${badge} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label}
    </span>
  );
}

/** Convenience: badge from a lookup map value (label/badge/icon). */
export function statusBadgeFor(meta) {
  return meta ? (
    <StatusBadge label={meta.label} badge={meta.badge} icon={meta.icon} />
  ) : null;
}
