import React from "react";
import StatusBadge from "../common/StatusBadge";
import { PAYMENT_STATUS } from "../../data/paymentStatus";

export default function PaymentStatusBadge({ status }) {
  const meta = PAYMENT_STATUS[status] || {
    label: status || "unknown",
    badge: "bg-ink-100 text-ink-600",
    icon: "clock",
  };
  return <StatusBadge label={meta.label} badge={meta.badge} icon={meta.icon} />;
}
