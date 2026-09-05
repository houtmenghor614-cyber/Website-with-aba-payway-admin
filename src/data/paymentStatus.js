export const PAYMENT_STATUS = {
  created: {
    label: "Created",
    badge: "bg-slate-100 text-slate-600",
    icon: "clock",
  },
  pending: {
    label: "Waiting",
    badge: "bg-amber-100 text-amber-700",
    icon: "clock",
  },
  success: {
    label: "Success",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "checkCircle",
  },
  failed: {
    label: "Failed",
    badge: "bg-rose-100 text-rose-700",
    icon: "xCircle",
  },
  expired: {
    label: "Expired",
    badge: "bg-slate-200 text-slate-600",
    icon: "alertCircle",
  },
};

export const PAYMENT_PROVIDERS = {
  khqr: { label: "KHQR / ABA QR", badge: "bg-primary-50 text-primary-700" },
  aba_payway: { label: "ABA PayWay", badge: "bg-sky-50 text-sky-700" },
  stripe: { label: "Stripe", badge: "bg-violet-50 text-violet-700" },
};

export function paymentStatusList() {
  return Object.keys(PAYMENT_STATUS).map((value) => ({ value, label: value }));
}
