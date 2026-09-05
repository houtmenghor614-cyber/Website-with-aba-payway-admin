export const ORDER_STATUS = {
  pending: {
    label: "Pending payment",
    badge: "bg-amber-100 text-amber-700",
    icon: "clock",
    next: ["paid", "cancelled"],
  },
  paid: {
    label: "Paid",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "checkCircle",
    next: ["processing", "refunded", "cancelled"],
  },
  processing: {
    label: "Processing",
    badge: "bg-sky-100 text-sky-700",
    icon: "package",
    next: ["shipped", "cancelled", "refunded"],
  },
  shipped: {
    label: "Shipped",
    badge: "bg-indigo-100 text-indigo-700",
    icon: "truck",
    next: ["delivered", "cancelled", "refunded"],
  },
  delivered: {
    label: "Delivered",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "home",
    next: ["refunded"],
  },
  cancelled: {
    label: "Cancelled",
    badge: "bg-rose-100 text-rose-700",
    icon: "xCircle",
    next: [],
  },
  refunded: {
    label: "Refunded",
    badge: "bg-slate-200 text-slate-600",
    icon: "rotateCcw",
    next: [],
  },
};

export function orderStatusList() {
  return Object.entries(ORDER_STATUS).map(([value, meta]) => ({
    value,
    label: meta.label,
  }));
}
