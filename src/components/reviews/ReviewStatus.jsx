import React from "react";
import StatusBadge from "../common/StatusBadge";

export default function ReviewStatus({ approved }) {
  return (
    <StatusBadge
      label={approved ? "Approved" : "Pending"}
      badge={approved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}
      icon={approved ? "checkCircle" : "clock"}
    />
  );
}
