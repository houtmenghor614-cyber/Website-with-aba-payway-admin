import React from "react";
import StatusBadge from "../common/StatusBadge";
import { ORDER_STATUS } from "../../data/orderStatus";

export default function OrderStatusBadge({ status, compact }) {
  const meta = ORDER_STATUS[status] || { label: status, badge: "bg-ink-100 text-ink-600", icon: "clock" };
  return (
    <StatusBadge
      label={meta.label}
      badge={compact ? meta.badge : meta.badge}
      icon={meta.icon}
    />
  );
}
